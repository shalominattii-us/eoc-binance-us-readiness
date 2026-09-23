# ==========================================
# AEGENTIX CYBERCORE CONSOLIDATED STACK SETUP
# ==========================================
# Run this script using Python to deploy all files into your directory instantly.

import os

files_to_deploy = {
    "model_file.py": """import os
import torch
import torch.nn as nn
import torch.nn.functional as F

os.environ["PYTORCH_ROCM_ARCH"] = "gfx1103"
os.environ["HIP_VISIBLE_DEVICES"] = "0"

class SovereignGlobalConfig:
    def __init__(self):
        self.d_model = 2048
        self.num_experts = 8
        self.top_k = 2
        self.vocab_size = 64000
        self.max_seq_len = 8192

class UnifiedActionGateway(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.token_embeddings = nn.Embedding(config.vocab_size, config.d_model)
        self.telemetry_projection = nn.Linear(32, config.d_model, bias=False)

    def forward(self, token_ids=None, raw_telemetry=None):
        if token_ids is not None:
            return self.token_embeddings(token_ids)
        elif raw_telemetry is not None:
            return self.telemetry_projection(raw_telemetry).unsqueeze(1)
        raise ValueError("Cybercore Input Error: Matrix streams are empty.")

class SovereignDomainExpert(nn.Module):
    def __init__(self, config, expert_id):
        super().__init__()
        self.expert_id = expert_id
        self.w_gate = nn.Linear(config.d_model, config.d_model * 2, bias=False)
        self.w_down = nn.Linear(config.d_model * 2, config.d_model, bias=False)
        self.w_up = nn.Linear(config.d_model, config.d_model * 2, bias=False)

    def forward(self, x):
        return self.w_down(F.silu(self.w_gate(x)) * self.w_up(x))

class CybercoreMoERouter(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.top_k = config.top_k
        self.gate_weights = nn.Linear(config.d_model, config.num_experts, bias=False)

    def forward(self, x):
        orig_shape = x.shape
        flat_tokens = x.view(-1, orig_shape[-1])
        logits = self.gate_weights(flat_tokens)
        routing_probabilities = F.softmax(logits, dim=-1)
        top_weights, top_indices = torch.topk(routing_probabilities, self.top_k, dim=-1)
        top_weights = top_weights / top_weights.sum(dim=-1, keepdim=True)
        return top_weights, top_indices, orig_shape

class AegentixSovereignCore(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.config = config
        self.gateway = UnifiedActionGateway(config)
        self.router = CybercoreMoERouter(config)
        self.experts = nn.ModuleList([SovereignDomainExpert(config, i) for i in range(config.num_experts)])
        self.lm_head = nn.Linear(config.d_model, config.vocab_size, bias=False)

    def forward(self, token_ids):
        x = self.gateway(token_ids=token_ids)
        weights, indices, orig_shape = self.router(x)
        flat_x = x.view(-1, orig_shape[-1])
        output_tokens = torch.zeros_like(flat_x)

        for i, expert in enumerate(self.experts):
            mask = (indices == i).any(dim=-1)
            if not mask.any():
                continue
            token_positions, expert_channels = (indices == i).nonzero(as_tuple=True)
            scaling_factors = weights[token_positions, expert_channels].unsqueeze(-1)
            expert_outputs = expert(flat_x[mask])
            output_tokens[mask] += expert_outputs * scaling_factors

        unflattened_output = output_tokens.view(orig_shape)
        return self.lm_head(unflattened_output)
""",
    "tokenizer.py": """import torch

class CybercoreByteTokenizer:
    def __init__(self):
        self.vocab_size = 64000
        self.byte_shift = 0
        self.special_tokens = {
            "<PAD>": 256, "<BOS>": 257, "<EOS>": 258,
            "<CALL_XAMAN>": 259, "<XPMARKET_TRADE>": 260,
            "<YIELD_CHECK>": 261, "<MESH_SYNC>": 262,
            "<OS_EXECUTE>": 263
        }
        self.inv_special_tokens = {v: k for k, v in self.special_tokens.items()}

    def encode(self, text: str, device="cuda") -> torch.Tensor:
        tokens = []
        for token_str, token_id in self.special_tokens.items():
            if token_str in text:
                text = text.replace(token_str, f" {token_str} ")
        for word in text.split():
            if word in self.special_tokens:
                tokens.append(self.special_tokens[word])
            else:
                tokens.extend([ord(char) for char in word])
                tokens.append(32)
        return torch.tensor(tokens, dtype=torch.long, device=device)

    def decode(self, token_ids: torch.Tensor) -> str:
        chars = []
        for tid in token_ids.tolist():
            if tid in self.inv_special_tokens:
                chars.append(f" {self.inv_special_tokens[tid]} ")
            elif tid < 256:
                chars.append(chr(tid))
        return "".join(chars).strip()
""",
    "data_ingestion.py": """import os
import numpy as np
import torch
from tokenizer import CybercoreByteTokenizer

class MemoryMappedIngestionPipeline:
    def __init__(self, root_dir: str, cache_file="cybercore_cache.bin"):
        self.root_dir = root_dir
        self.cache_file = cache_file
        self.tokenizer = CybercoreByteTokenizer()

    def process_and_compile(self):
        print("──> [INGESTION]: Scanning repositories for training conversion...")
        all_tokens = []
        valid_extensions = ('.py', '.md', '.json', '.toml', '.txt')
        
        if not os.path.exists(self.root_dir):
            os.makedirs(self.root_dir, exist_ok=True)
            print(f"──> [INGESTION]: Directory '{self.root_dir}' was missing. Created an empty one.")
            # Put a sample file to make sure it runs out-of-the-box
            with open(os.path.join(self.root_dir, "sample_mesh.py"), "w") as f:
                f.write("# Sovereign OS Telemetry Initialization\n<MESH_SYNC>\nprint('Grid Active')")

        for root, _, files in os.walk(self.root_dir):
            for file in files:
                if file.endswith(valid_extensions):
                    file_path = os.path.join(root, file)
                    try:
                        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                            content = f.read()
                            if "xaman" in file.lower():
                                content = "<CALL_XAMAN>\n" + content
                            elif "xpmarket" in file.lower():
                                content = "<XPMARKET_TRADE>\n" + content
                            token_tensor = self.tokenizer.encode(content, device="cpu")
                            all_tokens.extend(token_tensor.tolist())
                    except Exception:
                        continue

        if not all_tokens:
            all_tokens = [257, 262, 258] # Fallback standard tokens
        np_tokens = np.array(all_tokens, dtype=np.uint16)
        np_tokens.tofile(self.cache_file)
        print(f"──> [INGESTION]: Binary cache built successfully: {len(np_tokens)} tokens.")

    def get_loader(self, batch_size=2, seq_len=2048):
        data = np.memmap(self.cache_file, dtype=np.uint16, mode='r')
        def data_generator():
            high = len(data) - seq_len - 1
            while True:
                ix = np.random.randint(0, high, size=(batch_size,))
                x = torch.stack([torch.from_numpy((data[i:i+seq_len]).astype(np.int64)) for i in ix])
                y = torch.stack([torch.from_numpy((data[i+1:i+seq_len+1]).astype(np.int64)) for i in ix])
                yield x.cuda(), y.cuda()
        return data_generator()
""",
    "inference_server.py": """import json
from http.server import BaseHTTPRequestHandler, HTTPServer
import torch
from tokenizer import CybercoreByteTokenizer

MODEL_INSTANCE = None
TOKENIZER_INSTANCE = None

class InferenceServerHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        return

    @torch.inference_mode()
    def do_POST(self):
        if self.path == "/v1/execute":
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            payload = json.loads(post_data.decode('utf-8'))
            
            prompt = payload.get("prompt", "")
            max_tokens = payload.get("max_tokens", 32)
            
            input_ids = TOKENIZER_INSTANCE.encode(prompt, device="cuda").unsqueeze(0)
            
            for _ in range(max_tokens):
                with torch.amp.autocast(device_type='cuda', dtype=torch.bfloat16):
                    logits = MODEL_INSTANCE(input_ids)
                next_token_logits = logits[:, -1, :]
                next_token = torch.argmax(next_token_logits, dim=-1, keepdim=True)
                input_ids = torch.cat([input_ids, next_token], dim=-1)
                if next_token.item() == 258:
                    break
            
            output_text = TOKENIZER_INSTANCE.decode(input_ids)
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            
            response_payload = {"response": output_text}
            self.wfile.write(json.dumps(response_payload).encode('utf-8'))

def launch_api(model, host="127.0.0.1", port=8080):
    global MODEL_INSTANCE, TOKENIZER_INSTANCE
    MODEL_INSTANCE = model
    TOKENIZER_INSTANCE = CybercoreByteTokenizer()
    server = HTTPServer((host, port), InferenceServerHandler)
    print(f"──> [INFRASTRUCTURE ONLINE]: Local API running at http://{host}:{port}/v1/execute")
    server.serve_forever()
""",
    "run_core.py": """import os
import torch
from model_file import AegentixSovereignCore, SovereignGlobalConfig
from data_ingestion import MemoryMappedIngestionPipeline
from inference_server import launch_api

if __name__ == "__main__":
    config = SovereignGlobalConfig()
    print("──> Initializing Aegentix Cybercore Architecture Stack...")
    
    # Check if GPU is present for testing execution safely
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"──> Targeting Hardware Substrate Backend: {device.upper()}")
    
    # Fallback to float32 on machines testing code without standard CUDA backends
    compute_dtype = torch.bfloat16 if device == "cuda" else torch.float32
    
    model = AegentixSovereignCore(config).to(device=device, dtype=compute_dtype)
    
    try:
        model = torch.compile(model)
        print("──> Kernel Fusion Compiler: Optimization successful.")
    except Exception:
        print("──> Kernel Fusion Compiler: Passing static graph optimizations.")
        
    pipeline = MemoryMappedIngestionPipeline(root_dir="./sources")
    if not os.path.exists("cybercore_cache.bin"):
        pipeline.process_and_compile()
        
    launch_api(model, host="127.0.0.1", port=8080)
"""
}

print("🚀 Unpacking Aegentix Unified Cybercore Platform...")
for filename, code in files_to_deploy.items():
    with open(filename, "w", encoding="utf-8") as f:
        f.write(code)
    print(f"  [+] Unified Deployment Created: {filename}")

print("\n✅ All components compiled and available on local disk.")
print("👉 Next Step: Run 'python run_core.py' to bring the local MoE substrate engine online.")
