# GitHub Claims vs. Implementation Audit

**Captured:** 2026-09-23
**Method:** Direct read-only calls to the GitHub REST API and raw file fetches (`api.github.com`, `raw.githubusercontent.com`) against the public repositories referenced in `docs/BINANCE_US_GAP_CHECKLIST.md`. No repository was cloned with write access, no code was executed, and nothing was modified. Every quote and line count below is reproducible with the commands in "How to reproduce" at the end of this document.

This document exists to satisfy the checklist item **"Reconcile GitHub claims with implementation."** Its purpose is narrow: compare what each repository's own README claims against what the repository's actual file tree and code contain, as of the capture date. It does not evaluate whether the project's broader vision is achievable — only whether the *current checkout* backs the *current claims*.

## Repositories reviewed

| Repository | Description (GitHub) | Default branch | Last updated |
|---|---|---|---|
| `sovereign-eoc` | (none set) | `main` | 2026-05-16 |
| `tsl-ledger-interface` | Treasury Sovereign Ledger interface | `main` | 2026-09-14 |
| `sovereign-custody` | AEGENTIS National Repository \| CUSTODY Module \| Sovereign Systems | `main` | 2026-05-11 |
| `sovereign-escrow` | AEGENTIS National Repository \| ESCROW Module \| Sovereign Systems | `main` | 2026-09-14 |
| `sovereign-governance` | AEGENTIS National Repository \| GOVERNANCE Module \| Sovereign Systems | `main` | 2026-05-11 |

## Finding 1 — `sovereign-eoc`: kernel and worlds are explicitly labeled stubs

The repository's own files say so directly. Full contents:

```
kernel/kernel.ps1:
param([string]$Mode = "default")
Write-Host "[ Sovereign Kernel Stub ] Mode: $Mode"

worlds/worlds.ps1:
Write-Host "[ Sovereign Worlds Stub ]"
```

Both scripts print the word "Stub" and do nothing else. `portal/portal.ps1` (3,779 bytes) and `sovereign-launcher.ps1` (2,466 bytes) are larger but were not independently executed in this audit — line-by-line review of those two is a remaining task, not yet done. There is no README in this repository (`GET /README.md` returns 404), so there is no explicit external claim to reconcile against here beyond the `identity.json` file, which describes the node as `"tier": "core"`, `"maturity": {"level": 2, "stage": "emergent"}` — a self-assessment, not a verifiable capability claim.

**Conclusion:** the "kernel" and "worlds" components of `sovereign-eoc`, as checked out, are placeholders. Any external document that describes them as implemented or operational would not be supported by this checkout.

## Finding 2 — `tsl-ledger-interface`: every treasury address is an unfilled placeholder

`src/tsl-chain-registry.ts` (510 lines) defines treasury configuration for roughly 30 blockchains. Every single `treasuryAddress` field checked follows the same unfilled-template pattern — a chain-appropriate prefix followed by literal `x` characters, e.g.:

```
rTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx        (XRPL)
0xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx      (EVM chains, repeated ~15 times)
xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx     (Solana)
0.0.TSL                                          (Hedera)
tsl.near                                          (NEAR)
GTSLSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx      (Stellar)
```

None of the ~30 entries checked contain a real address. `index.js` (the interface's actual running service) confirms this at the API level:

```js
app.get('/balance/:address', (req, res) => res.json({ address: req.params.address, esc: 0, xrp: 0, timestamp: Date.now() }));
```

`GET /balance/:anything` returns `esc: 0, xrp: 0` for every address, unconditionally — it is not reading any ledger. This matches, and independently reconfirms, the finding already on record in `docs/EVIDENCE_MAP.md` from the original repository audit.

`src/tsl-master-minter.ts` (610 lines) is more developed: it defines real interfaces for XRPL, Solana, and Hedera minting (`ChainConfig`, `MintAllocation`, `MintBatch`, `SecurityPolicy` with fields like `hsmEnabled`, `thresholdSignatures`, `quantumResistant`) and imports real SDKs (`xrpl`, `@solana/web3.js`, `@solana/spl-token`, `@hashgraph/sdk`). This audit reviewed the type definitions and imports but did not trace every function body to confirm whether minting, signing, and multi-chain dispatch are fully wired end to end, or whether — like the registry above — the implementation is scaffolding around placeholder configuration. **That deeper trace is a remaining task**, not completed here; treat "master minter" as unverified rather than either confirmed-working or confirmed-placeholder until it is.

**Conclusion:** the treasury addressing layer that the minter and balance API depend on is 100% unfilled placeholders in this checkout. Any claim that treasury balances or multi-chain minting are live and operational is not supported by this checkout.

## Finding 3 — `sovereign-custody`, `sovereign-escrow`, `sovereign-governance`: identical generic content behind module-specific claims

Each of these three repositories' README claims a distinct, specific capability:

- `sovereign-custody`: "Cross-chain custody vault"
- `sovereign-escrow`: "Smart escrow & arbitration"
- `sovereign-governance`: "On-chain governance protocol"

Each README also claims, in an identical status table: `Build State: ΩΩΩ POST (Confirmed)`, `Chain Link: XRPL ↔ Solana ↔ EVM`, `Security Level: Golden Dome`.

Checking the actual file trees:

| Repo | Files present |
|---|---|
| `sovereign-custody` | `.gitignore`, `README.md`, `Governance-Policy.b64`, `Universal-Command-Module.b64` |
| `sovereign-escrow` | `.gitignore`, `README.md`, `AGENTS.md`, `LICENSE`, `Governance-Policy.b64`, `Universal-Command-Module.b64`, `docker/init.sql`, `src/sovereign-unified.ts` |
| `sovereign-governance` | `.gitignore`, `README.md`, `Governance-Policy.b64`, `Universal-Command-Module.b64` |

`sovereign-custody` and `sovereign-governance` contain **no source code at all** — only a README and two base64-encoded files. Directly comparing those two `.b64` files byte-for-byte across all three repositories:

```
sovereign-custody/Universal-Command-Module.b64    sha256: 32ff70ee1b42eb055d997464e6cf3339f3d661cdaabf5dd09d6149354f1b8b33
sovereign-escrow/Universal-Command-Module.b64     sha256: 32ff70ee1b42eb055d997464e6cf3339f3d661cdaabf5dd09d6149354f1b8b33
sovereign-governance/Universal-Command-Module.b64 sha256: 32ff70ee1b42eb055d997464e6cf3339f3d661cdaabf5dd09d6149354f1b8b33

sovereign-custody/Governance-Policy.b64           sha256: 59fa30bb35c60b5499ec13dbc2add66d54e9807db6c562ad2ca46cd46bf4e529
sovereign-escrow/Governance-Policy.b64            sha256: 59fa30bb35c60b5499ec13dbc2add66d54e9807db6c562ad2ca46cd46bf4e529
sovereign-governance/Governance-Policy.b64        sha256: 59fa30bb35c60b5499ec13dbc2add66d54e9807db6c562ad2ca46cd46bf4e529
```

All three repositories carry **byte-identical** copies of both files. Decoding `Universal-Command-Module.b64` shows generic PowerShell logging helper functions (`Invoke-OMEGAPre`, `Invoke-OMEGAPost`, `OSec`) with no custody-, escrow-, or governance-specific logic — the same file is reused as a shared utility across all three "modules." `Governance-Policy.b64` decodes to a generic `Governance-Policy` PowerShell function with parameters like `Mode`, `HealthInterval`, `MaxFailures`, `SelfHeal` — again, nothing specific to custody, escrow, or governance individually.

`sovereign-escrow` additionally has `src/sovereign-unified.ts` (14,972 bytes) and `docker/init.sql` (1,970 bytes), which this audit did not fully trace line-by-line — that remains a task if escrow-specific functionality needs to be confirmed.

**Conclusion:** the three README claims of "Confirmed/Tested/Primed" build state and distinct custody/escrow/governance functionality are not supported by `sovereign-custody` or `sovereign-governance` as checked out — those two contain no distinguishing implementation, only a README and two shared, non-module-specific utility files. `sovereign-escrow` has meaningfully more content (a TypeScript source file and a SQL init script) that was not fully audited here and should not be assumed either confirmed or empty until reviewed.

## What this audit does not cover

- `portal/portal.ps1`, `sovereign-launcher.ps1` in `sovereign-eoc` — not reviewed line-by-line.
- `src/sovereign-unified.ts` and `docker/init.sql` in `sovereign-escrow` — not reviewed line-by-line.
- The function bodies (not just type signatures) of `src/tsl-master-minter.ts` — not traced to confirm whether minting logic is complete, partial, or scaffolding.
- The `source/` directory added to *this* repository (`eoc-binance-us-readiness`) on 2026-09-22–23 (`sovereign-eagleshield`, `email-ingest`, `drive-ingest`, etc.) — the user has confirmed these are their own intentional, lawful additions; this audit does not evaluate them, per the user's direction to leave that material alone.
- Whether any of the five repositories above have private/internal counterparts with different, more complete content than the public checkout.

## How to reproduce

```bash
# Repo metadata
curl -s "https://api.github.com/repos/shalominattii-us/<repo>" | python3 -m json.tool

# File tree
curl -s "https://api.github.com/repos/shalominattii-us/<repo>/git/trees/main?recursive=1" | python3 -m json.tool

# Raw file content
curl -s "https://raw.githubusercontent.com/shalominattii-us/<repo>/main/<path>"

# Byte-for-byte comparison
curl -s "https://raw.githubusercontent.com/shalominattii-us/<repoA>/main/<file>" | sha256sum
curl -s "https://raw.githubusercontent.com/shalominattii-us/<repoB>/main/<file>" | sha256sum
```

## Recommendation

Until the remaining unreviewed files above are traced, any public-facing document (website, whitepaper, listing questionnaire) for EOC should either avoid claiming that custody, escrow, governance, or cross-chain treasury minting are "confirmed," "tested," "live," or "production" — or should qualify those claims with the specific, narrow scope that is actually implemented. `docs/EVIDENCE_MAP.md` already established this principle for the TSL placeholder addresses; this audit extends the same finding to `sovereign-custody`, `sovereign-governance`, and `sovereign-eoc`'s kernel/worlds components, and leaves `sovereign-escrow`'s and `tsl-ledger-interface`'s minter function bodies as open, unverified items rather than guessing at their status.
