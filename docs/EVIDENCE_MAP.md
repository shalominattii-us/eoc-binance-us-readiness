# EOC Documentation and Custody Evidence Map

## Executive finding

The source set demonstrates a named treasury architecture and several operational concepts. It does not yet demonstrate a production custody system suitable for Binance.US due diligence. The present implementation gap is explicit: custody repositories contain README files and encoded PowerShell artifacts, while the TSL HTTP service exposes placeholder balances and the chain registry uses placeholder addresses.

## Evidence by component

| Component | Evidence located | Current readiness |
|---|---|---|
| EOC identity | `sovereign-eoc/identity.json` identifies an EOC sovereign node and operational metadata | Project identity only; not token issuer proof |
| Treasury ledger interface | `tsl-ledger-interface/index.js` exposes health and balance routes | Functional HTTP shell, but balance is hard-coded to zero |
| XRPL registry | `tsl-ledger-interface/src/tsl-chain-registry.ts` defines XRPL endpoint and treasury configuration | Not production-ready; treasury address is a placeholder |
| Minting engine | `tsl-ledger-interface/src/tsl-master-minter.ts` contains multi-chain minting types and signing design | Not production-ready; requires dependencies, real addresses, key custody, and audited controls |
| Custody | `sovereign-custody/README.md` describes a cross-chain custody vault | Documentation only in the reviewed checkout; no executable vault or signer found |
| Escrow | `sovereign-escrow/README.md`, `src/sovereign-unified.ts`, and SQL initialization exist | Requires code review, deployment configuration, tests, and security audit |
| Governance | `sovereign-governance/README.md` and encoded policy artifacts exist | Policy artifacts are not evidence of deployed governance authority |
| Security hardening | `sovereign-eagleshield` contains a dashboard, monitoring script, and hardening scripts | Requires reproducible execution, logs, test evidence, and scope definition |

## Implemented verification layer

`server.js` provides read-only validated-ledger checks for the configured EOC issuer and any explicitly supplied XRPL account. It reports issuer account metadata, gateway obligations, and EOC trust-line data. It deliberately omits all private-key handling and all transaction submission.

## Controls still required before claiming operational custody

A production claim would require a defined legal custodian, segregated wallets, key-generation and recovery procedures, multi-party approval, hardware-security-module or equivalent controls, transaction policy enforcement, independent reconciliation, immutable audit logs, incident response, withdrawal controls, and an external security review. Those controls must be evidenced rather than inferred from repository names or policy text.

## Verification actually performed (2026-09-21)

The verifier was run against live XRPL data and the public XPMarket page was checked directly. Full detail is in `docs/XRPL_VERIFICATION_SNAPSHOT.md` and `docs/MARKET_DATA_SNAPSHOT.md`. Summary of new findings:

- **Issuer is blackholed** (master key disabled, regular key set to the XRPL standard burn address `rrrrrrrrrrrrrrrrrrrrrhoLvTp`). Confirmed both on-chain and independently by XPMarket's `Blackholed: YES` flag. This means the token's supply and issuer settings are now permanently fixed — a genuine, citable positive fact, but it also means no one can ever fix, migrate, or upgrade the issuer account.
- **Total obligations**: 99,861,010,912.97273 EOC across 47 trustlines — reconciles with the figure the checklist already referenced.
- **Holder concentration**: top 5 wallets hold ~84% of supply (top 1 alone holds ~44%). This was previously undocumented anywhere in the repository set and is a required disclosure item (`docs/templates/RELATED_PARTY_REGISTER_TEMPLATE.md`, `docs/templates/TOKENOMICS_FACT_SHEET_TEMPLATE.md`).
- **Market data**: current market cap is **$30**, FDV **$115**, liquidity in the tens of USD, with no recent trading activity observed at capture time. This is a material, honest finding that materially undercuts any near-term Binance.US market-potential case in the token's current state.

## New templates added for items requiring real (non-fabricated) input

See `docs/templates/` and `docs/PROGRESS.md` for the full list and status against `docs/BINANCE_US_GAP_CHECKLIST.md`.
