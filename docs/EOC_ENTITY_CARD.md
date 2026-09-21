# Eagle Overwatch Command (EOC) — Entity Card and Binance.US Benchmark

**Prepared:** 2026-09-21  
**Purpose:** Listing-readiness assessment; no exchange application, trade, or liquidity action has been executed.

## Entity Card

| Field | Current basis | Status |
|---|---|---|
| Common name | Eagle Overwatch Command | Confirmed by user |
| Token symbol | EOC | Confirmed by user |
| Network | XRP Ledger (XRPL) | Confirmed by prior project context and XPMarket page |
| Issuer/account | XRPL issuer address `rB2fKokBsnHCoFWLqZ89dqp2VCbVkKoY2k` | **Verified on-chain 2026-09-21** — blackholed (master key disabled, unusable regular key). See `docs/XRPL_VERIFICATION_SNAPSHOT.md`. Legal control of this address before blackholing is still unverified. |
| Current listing | XPMarket | Confirmed by user; independently confirmed live 2026-09-21 |
| Current market pair/liquidity | EOC/XRP single AMM pool. Market cap **$30**, FDV **$115**, liquidity in the tens of USD, no recent trading activity observed. See `docs/MARKET_DATA_SNAPSHOT.md`. | **Documented 2026-09-21.** This is a material gap against Binance.US's market-potential/sustainability criteria and should be disclosed honestly, not omitted. |
| Legal issuer/entity | Not identified | Required for U.S. exchange diligence |
| Jurisdiction and regulatory analysis | Not provided | Required; legal counsel should validate |
| Team and beneficial ownership | Not provided | Required |
| Supply, distribution, vesting, and allocations | Not provided | Required |
| Smart-contract / token-control features | XRPL-issued asset; controls require authoritative ledger review | Required |
| Security review / audit | Not verified | Required |
| Official website and whitepaper | Not yet identified | Required |
| GitHub documentation cluster | `sovereign-eoc`, `tsl-ledger-interface`, `sovereign-escrow`, `sovereign-custody`, `sovereign-governance`, `sovereign-eagleshield`, and private `SOVEREIGN-CONSOLIDATED-INGEST` | Partially identified |

## Binance.US Benchmark

Binance.US's official listing page states that applicants submit a Listing Questionnaire and undergo initial assessment, comprehensive due diligence, approval/notification, technical implementation, and post-listing monitoring. Its stated evaluation areas include security, regulatory compliance, business standards, project transparency, and long-term sustainability.

Binance.US's supported-assets page currently shows XRPL support for XRP with memo requirements and XRP/USD and XRP/USDT markets. This demonstrates that Binance.US supports the XRPL network for a native asset, but it is not evidence that EOC, an XRPL-issued token, is supported or approved for listing.

## Readiness Interpretation

The GitHub materials indicate a technically substantial sovereign-treasury architecture, including ledger, escrow, custody, and governance modules. That architecture may support a stronger technical narrative, but repository existence alone does not establish legal issuer identity, ownership of reserves, audited financial controls, token-holder rights, market-quality metrics, or regulatory compliance.

The working objective is therefore **Binance.US-grade readiness**, not a lower-tier exchange substitution. Any application should be deferred until the legal issuer, token economics, authoritative XRPL facts, security evidence, liquidity/market-quality evidence, team disclosures, and public documentation are assembled and internally reconciled.

## Explicit Non-Execution Boundary

No listing questionnaire has been submitted. No trades, liquidity changes, market-making activity, paid promotion, or public claims have been executed. Any external submission or market action requires the user's explicit confirmation after the exact payload and material disclosures are reviewed.

## Primary Sources

- [Binance.US listing page](https://www.binance.us/listing)
- [Binance.US digital-asset listing questionnaire information](https://support.binance.us/en/articles/9843852-digital-asset-listing-questionnaire-for-project-developers)
- [Binance.US supported crypto, networks, and trading pairs](https://support.binance.us/en/articles/9842915-listings-on-binance-us-supported-crypto-networks-and-trading-pairs)
- [EOC token page on XPMarket](https://xpmarket.com/token/EOC-rB2fKokBsnHCoFWLqZ89dqp2VCbVkKoY2k)
- [EOC-related GitHub repository](https://github.com/shalominattii-us/sovereign-eoc)
- [Treasury Sovereign Ledger interface](https://github.com/shalominattii-us/tsl-ledger-interface)
- [Sovereign escrow module](https://github.com/shalominattii-us/sovereign-escrow)
- [Sovereign custody module](https://github.com/shalominattii-us/sovereign-custody)
- [Sovereign governance module](https://github.com/shalominattii-us/sovereign-governance)
- `docs/XRPL_VERIFICATION_SNAPSHOT.md` — on-chain issuer verification, captured 2026-09-21
- `docs/MARKET_DATA_SNAPSHOT.md` — XPMarket data capture, 2026-09-21

## Templates added for outstanding items

The following require real project, legal, and business input that cannot be fabricated. See `docs/templates/`:
`LEGAL_ISSUER_TEMPLATE.md`, `COUNSEL_MEMO_REQUEST_TEMPLATE.md`, `SANCTIONS_SCREENING_TEMPLATE.md`, `TOKENOMICS_FACT_SHEET_TEMPLATE.md`, `SECURITY_AUDIT_SCOPE_TEMPLATE.md`, `CUSTODY_CONTROLS_TEMPLATE.md`, `MARKET_INTEGRITY_POLICY_TEMPLATE.md`, `INCIDENT_DISCLOSURE_POLICY_TEMPLATE.md`, `WEBSITE_CONTENT_TEMPLATE.md`, `WHITEPAPER_TEMPLATE.md`, `ROADMAP_TEMPLATE.md`, `RELATED_PARTY_REGISTER_TEMPLATE.md`, `LISTING_QUESTIONNAIRE_DRAFT_TEMPLATE.md`, `SUBMISSION_APPROVAL_TEMPLATE.md`. See `docs/PROGRESS.md` for overall status against the gap checklist.

> This document is a research and preparation record, not legal, tax, investment, or financial advice. Binance.US makes the final listing decision at its sole discretion.
