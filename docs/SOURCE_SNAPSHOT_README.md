# Source Snapshot Guide

The `source/` directory contains a point-in-time working snapshot of project repositories reviewed on 2026-09-21. The snapshots are included to make the public readiness repository inspectable without requiring a reviewer to navigate across multiple repositories.

## Snapshot directories

- `source/sovereign-eoc` — EOC node identity and PowerShell operational shell.
- `source/tsl-ledger-interface` — Treasury Sovereign Ledger interface, chain registry, and master-minter design.
- `source/sovereign-custody` — Custody documentation and encoded policy modules.
- `source/sovereign-escrow` — Escrow documentation, TypeScript source, SQL initialization, and policy modules.
- `source/sovereign-governance` — Governance documentation and policy modules.
- `source/sovereign-eagleshield` — Dashboard, security monitor, hardening, and event-monitor scripts.

These are source snapshots, not claims that every file is deployed. The authoritative upstream locations are listed in `docs/SOURCE_REPOSITORY_INVENTORY.md`. Reviewers should use the commit history of those upstream repositories for provenance and this repository for the consolidated readiness view.
