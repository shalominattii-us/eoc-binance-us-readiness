# Roadmap — Status-Separated Template

List every claimed feature/module under exactly one status. Do not list the same item in two places.

## Live and verified

| Item | Evidence | Verified date |
|---|---|---|
| Read-only XRPL verifier (`verifier/`) | This repo, run `npm start` | 2026-09-21 |
| Issuer blackholed | `docs/XRPL_VERIFICATION_SNAPSHOT.md` | 2026-09-21 |
| EOC/XRP AMM pool exists on XPMarket | `docs/MARKET_DATA_SNAPSHOT.md` | 2026-09-21 |

## In development (code exists, not production-ready)

| Item | Evidence | Known gaps |
|---|---|---|
| Treasury ledger interface | `tsl-ledger-interface/index.js`, `tsl-chain-registry.ts` | Hard-coded balances, placeholder addresses per `docs/EVIDENCE_MAP.md` |
| Escrow | `sovereign-escrow` | Needs deployment config, tests, audit |
| Security hardening dashboard | `sovereign-eagleshield` | Needs reproducible execution and test evidence |

## Documented but not implemented

| Item | Evidence | Gap |
|---|---|---|
| Custody vault/signer | `sovereign-custody/README.md` | Documentation only — no executable vault/signer found |
| Governance authority | `sovereign-governance/README.md` | Policy artifacts only — no deployed enforcement mechanism found |

## Planned / aspirational

| Item | Target date | Notes |
|---|---|---|
| `[REQUIRED]` | | |

## Update policy

- Re-review this file whenever any underlying repository changes: `[REQUIRED — who owns this]`
- Last full review date: `2026-09-21`
