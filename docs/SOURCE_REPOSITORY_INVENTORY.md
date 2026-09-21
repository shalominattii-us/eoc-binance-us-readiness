# Source Repository Inventory

This inventory records the source repositories reviewed for the EOC Binance.US-grade readiness package. Repository names are evidence sources, not proof that every described feature is deployed or production-ready.

| Repository | Role in review | Observed evidence | Open verification need |
|---|---|---|---|
| `sovereign-eoc` | EOC identity and node metadata | `identity.json`, PowerShell kernel/portal/world files | Reconcile software identity with the legal token issuer |
| `tsl-ledger-interface` | Treasury ledger interface | Express health/balance shell; TypeScript chain registry and minter design | Replace hard-coded balances and placeholder addresses; add tests and real configuration |
| `sovereign-custody` | Custody documentation | README and encoded policy artifacts | Implement and independently audit actual custody controls |
| `sovereign-escrow` | Escrow and arbitration | README, TypeScript source, SQL initialization | Reproducible deployment, tests, access controls, and audit |
| `sovereign-governance` | Governance policy | README and encoded policy artifacts | Define deployed authority, voting rules, emergency controls, and evidence |
| `sovereign-eagleshield` | Security and monitoring | Dashboard, monitoring, and hardening scripts | Reproducible execution, monitoring records, and independent security review |
| `SOVEREIGN-CONSOLIDATED-INGEST` | Private consolidated archive | Snapshot of the broader repository set | Define authoritative versions and avoid treating an archive as deployment evidence |

## Review rule

The readiness package distinguishes between **documented**, **implemented**, **tested**, **deployed**, and **independently assured**. A README or encoded policy artifact is documented evidence only. It becomes stronger evidence only when tied to reproducible code, test output, deployment records, ledger data, and independent review.
