"""
SOVEREIGN LLM BRIDGE v1.2 - LOCAL-FIRST
2026-09-18: Tier 0 moved to local Ollama (localhost:11434). Zero cost, zero egress,
sovereign-confidential stays on-device. Groq = optional remote fallback. Pareto = locked.
"""
import os, json, time, requests

OLLAMA_URL = os.environ.get("SOVEREIGN_OLLAMA_URL", "http://localhost:11434")
GROQ_KEY = os.environ.get("GROQ_API_KEY", "")
OPENROUTER_KEY = os.environ.get("OPENROUTER_API_KEY", "")

PARETO_ID = "unbiased/pareto"
PARETO_ENABLED = os.environ.get("SOVEREIGN_PARETO_ENABLE", "0") == "1"
PARETO_BUDGET_USD = float(os.environ.get("SOVEREIGN_PARETO_MONTHLY_CAP", "5.00"))
PARETO_SPENT_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".pareto_spend.json")
PRICE_IN, PRICE_OUT = 2.50, 7.50

MODEL_PRIORITY = ["llama3.3", "qwen3", "llama3.2", "llama3.1", "mistral",
                  "phi4", "gemma3", "deepseek-r1", "devstral"]


def repair_json(raw):
    raw = raw.strip()
    if raw.startswith("```"):
        raw = raw.split("\n", 1)[1].rsplit("```", 1)[0]
    start, depth, in_str, esc = -1, 0, False, False
    for i, ch in enumerate(raw):
        if in_str:
            if esc: esc = False
            elif ch == "\\": esc = True
            elif ch == '"': in_str = False
        else:
            if ch == '"': in_str, start = True, start if start >= 0 else i - 1
            elif ch == "{": depth += 1; start = start if start >= 0 else i
            elif ch == "}":
                depth -= 1
                if depth == 0 and start >= 0:
                    try: return json.loads(raw[start:i + 1])
                    except Exception: pass
    try: return json.loads(raw)
    except Exception: return {"_repair_failed": True, "_raw": raw[:2000]}


class OllamaBridge:
    """Tier 0 - local sovereign brain."""
    def __init__(self, base=OLLAMA_URL, timeout=300):
        self.base = base.rstrip("/")
        self.timeout = timeout
        self.model = self._pick_model()

    def _pick_model(self):
        try:
            r = requests.get(f"{self.base}/api/tags", timeout=5)
            names = [m.get("name", "") for m in r.json().get("models", [])]
            for want in MODEL_PRIORITY:
                for n in names:
                    if want in n:
                        return n
            return names[0] if names else None
        except Exception:
            return None

    def available(self):
        return bool(self.model)

    def chat(self, messages, max_tokens=4096, temperature=0.3, retries=1):
        if not self.model:
            raise RuntimeError("OLLAMA_DOWN: no model available on localhost:11434")
        payload = {"model": self.model, "messages": messages, "stream": False,
                   "options": {"num_predict": max_tokens, "temperature": temperature}}
        last = None
        for attempt in range(retries + 1):
            try:
                r = requests.post(f"{self.base}/api/chat", json=payload, timeout=self.timeout)
                r.raise_for_status()
                data = r.json()
                return data["message"]["content"], data.get("eval_count", 0)
            except Exception as e:
                last = e
                if attempt < retries: time.sleep(1)
        raise RuntimeError(f"OLLAMA_FAIL: {last}")

    def chat_json(self, messages, schema_hint, max_tokens=4096):
        msgs = [{"role": "system", "content":
                 f"Respond with ONLY valid JSON matching this shape: {schema_hint}"}] + messages
        raw, tok = self.chat(msgs, max_tokens)
        return repair_json(raw), tok


def _load_spend():
    try:
        with open(PARETO_SPENT_FILE) as f:
            d = json.load(f)
            if d.get("month") == time.strftime("%Y-%m"):
                return d.get("usd", 0.0)
    except Exception:
        pass
    return 0.0


def _record_spend(usd):
    with open(PARETO_SPENT_FILE, "w") as f:
        json.dump({"month": time.strftime("%Y-%m"), "usd": _load_spend() + usd}, f)


class ParetoBridge:
    """Paid frontier tier - DISABLED by default, confidential-refused."""
    def __init__(self, timeout=300):
        self.key = OPENROUTER_KEY
        self.timeout = timeout
        self.url = "https://openrouter.ai/api/v1/chat/completions"

    def available(self):
        return (PARETO_ENABLED and bool(self.key) and _load_spend() < PARETO_BUDGET_USD)

    def chat(self, messages, max_tokens=8192, temperature=0.2, retries=2):
        if not PARETO_ENABLED:
            raise RuntimeError("PARETO_LOCKED: tier disabled (set SOVEREIGN_PARETO_ENABLE=1)")
        payload = {"model": PARETO_ID, "messages": messages,
                   "max_tokens": max_tokens, "temperature": temperature}
        headers = {"Authorization": f"Bearer {self.key}", "Content-Type": "application/json",
                   "HTTP-Referer": "https://sovereign-ae.local", "X-Title": "AEGENTIS Sovereign Agent"}
        last = None
        for attempt in range(retries + 1):
            try:
                r = requests.post(self.url, headers=headers, json=payload, timeout=self.timeout)
                r.raise_for_status()
                data = r.json()
                u = data.get("usage", {})
                _record_spend((u.get("prompt_tokens", 0) * PRICE_IN
                               + u.get("completion_tokens", 0) * PRICE_OUT) / 1e6)
                msg = data["choices"][0]["message"]
                return msg.get("content", ""), u
            except Exception as e:
                last = e
                if attempt < retries: time.sleep(2 ** attempt)
        raise RuntimeError(f"PARETO_FAIL: {last}")


class SovereignLLMRouter:
    """
    Tier 0: Ollama local (default everything - free, on-device, confidential-safe)
    Tier 1: Groq (optional remote fallback if Ollama down AND key present)
    Tier 2: Pareto (opt-in paid, force-flag only, confidential-refused)
    """
    CONFIDENTIAL_MARKERS = ("SOVEREIGN_CONFIDENTIAL", "VAULT", "ESC_KEY", "EOC_KEY",
                            "WALLET_SEED", "PRIVATE_KEY")

    def __init__(self):
        self.ollama = OllamaBridge()
        self.pareto = ParetoBridge()
        self.groq_url = "https://api.groq.com/openai/v1/chat/completions"
        self.groq_model = "llama-3.3-70b-versatile"

    def _is_confidential(self, messages):
        blob = json.dumps(messages).upper()
        return any(m in blob for m in self.CONFIDENTIAL_MARKERS)

    def _groq(self, messages, max_tokens, temperature):
        if not GROQ_KEY:
            raise RuntimeError("NO_TIER_AVAILABLE: Ollama down, GROQ_API_KEY not set")
        r = requests.post(self.groq_url,
            headers={"Authorization": f"Bearer {GROQ_KEY}"},
            json={"model": self.groq_model, "messages": messages,
                  "max_tokens": max_tokens, "temperature": temperature}, timeout=60)
        r.raise_for_status()
        return r.json()["choices"][0]["message"]["content"], {}

    def route(self, messages, max_tokens=4096, temperature=0.3, force=None):
        if force == "pareto":
            if self._is_confidential(messages):
                raise PermissionError("SOVEREIGN POLICY: confidential content refused on paid blended tier")
            return self.pareto.chat(messages, max_tokens, temperature)
        if force == "groq":
            return self._groq(messages, max_tokens, temperature)
        # default: local first, remote only if local brain is down
        if self.ollama.available():
            return self.ollama.chat(messages, max_tokens, temperature)
        return self._groq(messages, max_tokens, temperature)

    def status(self):
        return {"tier0_ollama": self.ollama.available(), "tier0_model": self.ollama.model,
                "tier1_groq_fallback": bool(GROQ_KEY),
                "tier2_pareto": self.pareto.available(),
                "pareto_budget_remaining_usd": round(max(0.0, PARETO_BUDGET_USD - _load_spend()), 2)}
