# Eagle Overwatch Command — Treasury, Custody, and Readiness Project

This public repository brings together the working documentation and source components reviewed for Eagle Overwatch Command (EOC), an XRP Ledger token project listed on XPMarket. It is organized as a transparent readiness and engineering workspace rather than a marketing-only landing page.

## What is here

The repository contains the EOC node identity and operational shell, the Treasury Sovereign Ledger interface and TypeScript design, custody and escrow modules, governance policy artifacts, EagleShield monitoring and hardening scripts, a read-only XRPL evidence verifier, and the Binance.US-grade readiness documentation.

The `source/` directory contains snapshots of the six reviewed project repositories. Each snapshot is retained under its original repository name so that technical reviewers can inspect the code and distinguish implemented files from design or policy artifacts.

## Current implementation status

| Area | Status | What the repository demonstrates |
|---|---|---|
| EOC node shell | Prototype / operational shell | Identity metadata, kernel, portal, worlds, and launcher files |
| Treasury ledger interface | Prototype | Express health and balance routes; TypeScript registry and minting design |
| XRPL evidence | Working read-only verifier | Validated issuer, obligations, account, and trust-line reads |
| Custody | Documentation and policy stage | Custody architecture description and encoded policy artifacts; no production signer |
| Escrow | Early implementation stage | TypeScript and SQL artifacts requiring deployment and security testing |
| Governance | Policy stage | Governance descriptions and encoded policy artifacts |
| EagleShield | Monitoring and hardening stage | Dashboard, monitoring, and Windows hardening scripts |
| Listing readiness | Active workstream | Entity card, evidence map, gap checklist, templates, and progress tracker |

## Important honesty boundary

A source file, README, or policy artifact is not by itself proof of deployment, reserves, legal status, security, or operational custody. The repository marks those distinctions explicitly. Placeholder addresses and hard-coded balance behavior remain identified as gaps. No private keys, seed phrases, or signing credentials belong in this repository.

## Navigation

- [Binance.US readiness checklist](docs/BINANCE_US_GAP_CHECKLIST.md)
- [Current progress tracker](docs/PROGRESS.md)
- [Architecture map](docs/ARCHITECTURE_MAP.md)
- [Source repository inventory](docs/SOURCE_REPOSITORY_INVENTORY.md)
- [Custody evidence map](docs/EVIDENCE_MAP.md)
- [XRPL verification snapshot](docs/XRPL_VERIFICATION_SNAPSHOT.md)
- [Market data snapshot](docs/MARKET_DATA_SNAPSHOT.md)
- [Read-only verifier](verifier/README.md)
- [Source snapshots](source/)
