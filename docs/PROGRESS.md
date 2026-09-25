# EOC Binance.US Readiness — Progress Tracker

**Last updated:** 2026-09-25
**Purpose:** One-line status for every item in `docs/BINANCE_US_GAP_CHECKLIST.md`, so anyone opening this repo can see at a glance what is evidenced, what has a template ready to fill, and what has not been started. This file does not itself contain legal, business, or entity facts — see the "No fabricated facts" note below.

## Legend

- ✅ **Evidenced** — independently verified with a live tool call (on-chain query, live site check, script execution). Linked to the snapshot doc that contains the raw evidence.
- 📝 **Template ready** — a structured intake form exists in `docs/templates/`, but it is unfilled (`[REQUIRED]` placeholders). No progress has been made on the underlying fact; only the structure to capture it is ready.
- ⬜ **Not started** — no evidence and no template yet.

## Priority 0 — Stop-ship identity and legal gaps

| Item | Status | Evidence / template |
|---|---|---|
| Identify the legal issuer | 📝 Template ready | `docs/templates/LEGAL_ISSUER_TEMPLATE.md` — all fields `[REQUIRED]` |
| Document U.S. regulatory analysis | 📝 Template ready | `docs/templates/COUNSEL_MEMO_REQUEST_TEMPLATE.md` — intake for instructing counsel, no legal advice contained |
| Complete beneficial-ownership and sanctions screening | 📝 Template ready | `docs/templates/SANCTIONS_SCREENING_TEMPLATE.md` — all fields `[REQUIRED]` |
| Verify the token issuer account | ✅ Evidenced | `docs/XRPL_VERIFICATION_SNAPSHOT.md` — issuer blackholed, flags confirmed on-chain. Still missing: signed project statement tying address to a legal entity (blocked on legal-issuer item above) |

## Priority 1 — Token and project facts

| Item | Status | Evidence / template |
|---|---|---|
| Produce a definitive token fact sheet | 📝 Partially evidenced | `docs/templates/TOKENOMICS_FACT_SHEET_TEMPLATE.md` — verified on-chain fields pre-filled (issuer flags, obligations, holder table); allocation/vesting/utility fields `[REQUIRED]` |
| Reconcile supply and obligations | ✅ Evidenced (raw), not reconciled | `docs/XRPL_VERIFICATION_SNAPSHOT.md` — 99,861,010,912.97273 EOC obligations confirmed on-chain. Not yet reconciled to project's own stated supply/allocation records (circulating supply per XPMarket is ~26.1B vs. ~99.8B total — gap unexplained) |
| Document token distribution and vesting | ⬜ Not started | No allocation table or wallet list obtained yet; use `docs/templates/TOKENOMICS_FACT_SHEET_TEMPLATE.md` |
| Explain holder rights and token utility | ⬜ Not started | No template yet distinct from whitepaper/website templates below |
| Document conflicts and related-party arrangements | 📝 Template ready | `docs/templates/RELATED_PARTY_REGISTER_TEMPLATE.md` — all fields `[REQUIRED]` |

## Priority 1 — Public documentation and transparency

| Item | Status | Evidence / template |
|---|---|---|
| Publish a complete official website | 📝 Template ready | `docs/templates/WEBSITE_CONTENT_TEMPLATE.md` — content checklist, all facts `[REQUIRED]` |
| Publish a substantive whitepaper or technical paper | 📝 Template ready | `docs/templates/WHITEPAPER_TEMPLATE.md` — section skeleton, all facts `[REQUIRED]` |
| Publish a roadmap with delivery status | 📝 Template ready | `docs/templates/ROADMAP_TEMPLATE.md` — status categories defined, no milestones filled |
| Create an incident and disclosure policy | 📝 Template ready | `docs/templates/INCIDENT_DISCLOSURE_POLICY_TEMPLATE.md` — policy skeleton, contacts/SLAs `[REQUIRED]` |
| Reconcile GitHub claims with implementation | ⬜ Not started | Requires a repo-by-repo audit of `sovereign-eoc`, `tsl-ledger-interface`, `sovereign-custody`, `sovereign-escrow`, `sovereign-governance` — not yet performed in this session |

## Priority 1 — Security and operational custody

| Item | Status | Evidence / template |
|---|---|---|
| Obtain an independent security review | 📝 Template ready | `docs/templates/SECURITY_AUDIT_SCOPE_TEMPLATE.md` — scope skeleton for commissioning an auditor, no audit performed |
| Replace placeholder custody and treasury configuration | ⬜ Not started | Not verified in this session whether placeholders still exist in `tsl-ledger-interface`/`sovereign-custody` |
| Implement real custody controls | 📝 Template ready | `docs/templates/CUSTODY_CONTROLS_TEMPLATE.md` — control design skeleton, all fields `[REQUIRED]`. **No private keys or secrets should ever be entered into this template or committed to the repo.** |
| Use hardware-backed or equivalent key protection | ⬜ Not started | Covered partially by `docs/templates/CUSTODY_CONTROLS_TEMPLATE.md`; no HSM/vendor decision recorded |
| Create immutable audit trails | ⬜ Not started | No template yet |
| Add independent reconciliation | ⬜ Not started | No recurring reconciliation procedure defined yet; the one-off on-chain pull in `docs/XRPL_VERIFICATION_SNAPSHOT.md` is a manual snapshot, not a scheduled reconciliation process |
| Test escrow and governance reproducibly | ⬜ Not started | Not attempted in this session |
| Limit the verifier's scope explicitly | ✅ Evidenced | Verified locally: `GET /health` on `verifier/server.js` returns `can_sign: false`, `can_submit_transactions: false`. `node --check server.js` passes |

## Priority 2 — Market quality and sustainability

| Item | Status | Evidence / template |
|---|---|---|
| Assemble current XPMarket market data | ✅ Evidenced | `docs/MARKET_DATA_SNAPSHOT.md` — price, market cap ($30), FDV, holders, trustlines, AMM pool captured live with screenshot |
| Document holder and transaction distribution | 📝 Partially evidenced | `docs/XRPL_VERIFICATION_SNAPSHOT.md` has top-5 holder balances (83.98% combined, top wallet 43.86%); no wallet-identity, dormancy, or related-party mapping yet — use `docs/templates/RELATED_PARTY_REGISTER_TEMPLATE.md` |
| Document liquidity ownership and funding | ⬜ Not started | AMM pool account identified (`r4jLfSSKK1GG7b3ZUKQ8ha4swvEftpFN26`) but no agreement, lockup, or funding-source documentation exists |
| Prepare a market-integrity policy | 📝 Template ready | `docs/templates/MARKET_INTEGRITY_POLICY_TEMPLATE.md` — policy skeleton, no monitoring rules defined |
| Prepare sustainability evidence | ⬜ Not started | No operating plan or financial records obtained; current market cap ($30) and liquidity level are a real, verified obstacle here — see `docs/MARKET_DATA_SNAPSHOT.md` |

## Priority 2 — Binance.US submission packet

| Item | Status | Evidence / template |
|---|---|---|
| Build the Listing Questionnaire draft offline | 📝 Template ready | `docs/templates/LISTING_QUESTIONNAIRE_DRAFT_TEMPLATE.md` — mirrors the public questionnaire categories, all answers `[REQUIRED]` |
| Perform a consistency review | ⬜ Not started | Cannot run until questionnaire and other documents are drafted |
| Prepare anti-impersonation controls | ⬜ Not started | No internal protocol drafted yet |
| Obtain explicit submission approval | 📝 Template ready | `docs/templates/SUBMISSION_APPROVAL_TEMPLATE.md` — sign-off form, to be used only once a real, complete packet exists. **No submission has been made or drafted for actual sending.** |

## No fabricated facts

Every `[REQUIRED]` field in every template in `docs/templates/` is intentionally blank. No legal name, entity type, jurisdiction, address, ownership structure, counsel opinion, sanctions result, audit finding, or custody control has been invented. The only facts in this repository that are marked as confirmed are those independently pulled from a live source in this session (XRPL JSON-RPC responses, the verifier's own `/health` and `/config` output, and the live XPMarket page) — each with its raw evidence retained in `docs/XRPL_VERIFICATION_SNAPSHOT.md` and `docs/MARKET_DATA_SNAPSHOT.md`.

## Known blockers as of 2026-09-21

1. **No legal/entity facts provided.** All Priority 0 legal items are blocked on the user or counsel supplying real information.
2. **Market cap and liquidity are extremely low** ($30 market cap, single AMM pool with tens of USD of liquidity, most visible trades ~7 months old at capture time). This is a genuine sustainability gap, independent of the paperwork gaps, and should be addressed before a submission is credible.
3. **Holder concentration is high**: top 5 wallets hold 83.98% of obligations, top 1 wallet alone holds 43.86%. One of the top 5 is likely the AMM pool itself and needs to be excluded/confirmed before this figure is finalized.
4. **Repository publication is complete.** The readiness repository is public and now includes the reviewed Gmail/Drive source records, multi-account ingestion status, security-ingestion audit, external SkillOpt source note, and the historical stack-engine architecture record. Publication does not resolve the legal, tokenomics, custody, market-quality, or submission gaps above.

## Historical and security records

- `docs/history/EOC_STACK_ENGINE_HISTORY.md` preserves the user-provided multi-agent stack-engine proposal as historical architecture context, not deployment evidence.
- `docs/SECURITY_INGEST_AUDIT.md` records the PAT redaction and repository credential-pattern audit. The token owner still needs to revoke or rotate the exposed token.
