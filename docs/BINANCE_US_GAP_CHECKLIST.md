# EOC Binance.US-Grade Readiness Gap Checklist

**Prepared:** 2026-09-21  
**Current gate:** Preparation only. No listing application, trade, liquidity change, or public submission has been executed.

**Live status tracker:** see `docs/PROGRESS.md` for a one-line status against every item below. **Fillable templates** for the legal/compliance/business items are in `docs/templates/` — they are structured intake forms with `[REQUIRED]` placeholders, not filled-in facts, because no legal or entity information has been provided yet.

## How to read this checklist

Binance.US publicly states that assets undergo a multi-stage evaluation covering **security, regulatory compliance, business standards, project transparency, market potential, and long-term sustainability**. The items below translate those public categories into evidence requests for EOC. Items marked **Required evidence** are not claims about undisclosed Binance.US internal thresholds; they are the documents and controls needed to support a credible due-diligence submission.

## Priority 0 — Stop-ship identity and legal gaps

- [ ] **Identify the legal issuer.** Provide the legal name, entity type, formation jurisdiction, registration number, principal address, and authorized representative.
  - **Acceptance evidence:** Current formation and good-standing records, official contact domain, and an ownership/control chart.

- [ ] **Document U.S. regulatory analysis.** Obtain written advice from qualified counsel covering the EOC token, distribution history, treasury activities, marketing, custody, and intended U.S. exchange listing.
  - **Acceptance evidence:** Counsel memorandum identifying assumptions, jurisdictions, unresolved issues, and required disclosures. This is not a substitute for regulatory approval.

- [ ] **Complete beneficial-ownership and sanctions screening.** Identify controlling persons, treasury signers, service providers, and relevant counterparties.
  - **Acceptance evidence:** Signed disclosure pack and screening process/results retained for diligence.

- [x] **Verify the token issuer account.** Reconcile the XRPL issuer address `rB2fKokBsnHCoFWLqZ89dqp2VCbVkKoY2k` against the official EOC listing, issuer documentation, and project-controlled records.
  - **Acceptance evidence:** XRPL explorer/ledger evidence, signed project statement, and an explanation of any issuer settings.
  - **Status (2026-09-21):** On-chain evidence gathered directly from `xrplcluster.com` — see `docs/XRPL_VERIFICATION_SNAPSHOT.md`. Confirmed `disableMasterKey: true` with `RegularKey` set to the standard XRPL burn address (issuer is blackholed), `globalFreeze: false`, `allowTrustLineClawback: false`. Still missing: a **signed project statement** tying this address to the legal issuer — that requires the Priority 0 legal-identity item above.

## Priority 1 — Token and project facts

- [ ] **Produce a definitive token fact sheet.** State currency code, issuer, decimal behavior, total supply, circulating supply, authorized issuance/burn process, freeze/clawback settings if applicable, trust-line policy, and current holders.
  - **Acceptance evidence:** Dated fact sheet reconciled to validated XRPL data.

- [x] **Reconcile supply and obligations.** Explain the verified gateway obligation balance of approximately 99.861 billion EOC and reconcile it to the project's stated supply and distribution records.
  - **Acceptance evidence:** Calculation workbook or signed reconciliation with ledger references and as-of timestamp.
  - **Status (2026-09-21):** Gateway obligations confirmed on-chain at 99,861,010,912.97273 EOC across 47 trustlines as of ledger index 107139925–107139928 — see `docs/XRPL_VERIFICATION_SNAPSHOT.md`. Holder-level breakdown captured, but this is raw ledger data only; it is **not yet reconciled** to the project's own stated supply figures, allocation records, or a signed statement (that reconciliation still needs Priority 1 tokenomics work and issuer input). Note: XPMarket reports circulating supply as ~26.1B against total supply ~99.8B — the gap between "circulating" and the full obligations figure was unexplained.
  - **Update (2026-09-23):** Total obligations minus the top-4 non-AMM holder wallets = 26,180,178,449.16 EOC, within ~0.3% of XPMarket's reported 26.1B circulating figure — see the arithmetic in `docs/XRPL_VERIFICATION_SNAPSHOT.md`. This is a **plausible, reproducible hypothesis for how "circulating" is calculated (excluding those 4 wallets), not a confirmed reconciliation.** It still needs the project or XPMarket to confirm the methodology and disclose what those 4 wallets actually are (treasury, team, escrow, etc.) before this item can be marked fully reconciled.

- [ ] **Document token distribution and vesting.** Identify treasury, team, ecosystem, liquidity, grants, and other allocations, including lockups and release schedules.
  - **Acceptance evidence:** Allocation table, wallet list, vesting contracts or operational controls, and change-approval policy.

- [ ] **Explain holder rights and token utility.** Define what EOC does, what it does not represent, and whether holders receive governance, redemption, reserve, revenue, or other rights.
  - **Acceptance evidence:** Consistent whitepaper, terms, and legal disclosures.

- [ ] **Document conflicts and related-party arrangements.** Disclose market makers, treasury operators, affiliates, service providers, and compensation arrangements.
  - **Acceptance evidence:** Related-party register and signed management certification.

## Priority 1 — Public documentation and transparency

- [ ] **Publish a complete official website.** Include issuer identity, token facts, official links, risk warnings, contact method, and version/date controls.
  - **Acceptance evidence:** Public HTTPS site with a change log and domain-controlled email.

- [ ] **Publish a substantive whitepaper or technical paper.** Explain architecture, issuance, custody, treasury, escrow, governance, security model, and limitations without unsupported claims such as “government-grade” unless independently substantiated.
  - **Acceptance evidence:** Versioned document with named authors, dates, references, and a clear distinction between deployed and planned features.

- [ ] **Publish a roadmap with delivery status.** Separate live, tested, in-development, and aspirational components.
  - **Acceptance evidence:** Dated roadmap tied to releases, test evidence, and issue tracking.

- [ ] **Create an incident and disclosure policy.** Define how security incidents, material changes, supply events, and custody failures will be communicated.
  - **Acceptance evidence:** Public policy, escalation contacts, and response-time commitments.

- [ ] **Reconcile GitHub claims with implementation.** Replace or qualify repository statements that describe components as confirmed or deployed when the checkout contains documentation, encoded scripts, placeholders, or incomplete code.
  - **Acceptance evidence:** Repository audit report and corrected READMEs.

## Priority 1 — Security and operational custody

- [ ] **Obtain an independent security review.** Cover EOC token controls, treasury ledger, custody, escrow, governance, deployment scripts, and the read-only verifier.
  - **Acceptance evidence:** Independent report, scope, findings, remediation status, and retest letter.

- [ ] **Replace placeholder custody and treasury configuration.** The reviewed TSL registry contains placeholder addresses, and the previous HTTP balance route returned hard-coded zeros.
  - **Acceptance evidence:** Production configuration with real, verified addresses, tests, and ledger reconciliation.

- [ ] **Implement real custody controls.** Define segregated wallets, key generation, signing authority, multi-party approval, withdrawal limits, recovery, rotation, and emergency suspension.
  - **Acceptance evidence:** Approved control design, test logs, signer roster, and operational runbook. Private keys must never be placed in GitHub or this package.

- [ ] **Use hardware-backed or equivalent key protection.** Select and document an HSM or equivalent control appropriate for the legal custodian and risk profile.
  - **Acceptance evidence:** Architecture diagram, vendor/control documentation, key ceremony record, and disaster-recovery test.

- [ ] **Create immutable audit trails.** Log every authorization, policy decision, transaction proposal, approval, execution result, and reconciliation event.
  - **Acceptance evidence:** Tamper-evident log design, retention policy, monitoring, and sample redacted records.

- [ ] **Add independent reconciliation.** Reconcile XRPL balances, trust lines, obligations, custody records, and internal ledgers on a scheduled basis.
  - **Acceptance evidence:** Reconciliation procedure, exception workflow, and signed sample reports.

- [ ] **Test escrow and governance reproducibly.** The current repositories need deployment instructions, automated tests, test vectors, and clear network/environment configuration.
  - **Acceptance evidence:** Clean-environment build, test output, deployment manifest, and rollback procedure.

- [ ] **Limit the verifier's scope explicitly.** Keep the current verifier read-only unless a separately approved production custody architecture is implemented and audited.
  - **Acceptance evidence:** Health output showing `can_sign: false` and `can_submit_transactions: false`, plus documented production boundary.

## Priority 2 — Market quality and sustainability

- [x] **Assemble current XPMarket market data.** Capture price, pair, volume, spread, depth, order-book concentration, uptime, and as-of timestamp.
  - **Acceptance evidence:** Dated export or screenshots plus methodology and source links.
  - **Status (2026-09-21):** Captured live from `xpmarket.com` — see `docs/MARKET_DATA_SNAPSHOT.md`. Price **$0.0811**, **market cap $30**, FDV $115.10, single EOC/XRP AMM pool with liquidity in the tens of USD, most visible trades dated ~7 months prior to capture, 43 holders, 47 trustlines, blackholed status independently confirmed by XPMarket (matches on-chain finding). **This market cap and liquidity level is far below what a credible Binance.US submission would need — this is a substantive project-sustainability gap, separate from the legal/compliance gaps, and should be flagged to the user directly rather than only noted here.**

- [ ] **Document holder and transaction distribution.** Analyze holder concentration, related wallets, dormant balances, issuer-controlled accounts, and unusual activity.
  - **Acceptance evidence:** Ledger-based holder analysis with methodology and limitations.
  - **Status (2026-09-21):** Top-5 holder balances pulled directly from `account_lines` — see `docs/XRPL_VERIFICATION_SNAPSHOT.md`. Top 5 addresses hold **83.98%** of all obligations; the single largest wallet holds **43.86%**.
  - **Update (2026-09-23):** Confirmed on-chain that rank-3 holder `r4jLfSSKK1GG7b3ZUKQ8ha4swvEftpFN26` is the EOC/XRP AMM pool account itself (`pseudo_account.type: AMM`, confirmed via `amm_info`), not an individual holder. Excluding it, the **real top-4 holder wallets hold 73.78% combined**, with the top single wallet still at 43.86%. No wallet-identity, related-party, or dormancy analysis has been done for those 4 wallets yet; use `docs/templates/RELATED_PARTY_REGISTER_TEMPLATE.md` and `docs/templates/TOKENOMICS_FACT_SHEET_TEMPLATE.md` to capture it. **This concentration level is a real red flag for exchange due diligence and should be disclosed proactively, not discovered by the reviewer.**

- [ ] **Document liquidity ownership and funding.** Identify liquidity-provider wallets, source of liquidity, lockups, withdrawal rights, and any market-making agreement.
  - **Acceptance evidence:** Signed agreements or treasury records and independently reconciled wallet balances.
  - **Status (2026-09-23):** Confirmed on-chain via `amm_info` that the single EOC/XRP AMM pool holds only 7.639367 XRP and 10,180,845,598.02 EOC (LP token issued by the pool account itself; trading fee 0.5%; voting/auction slot controlled by `rXPMxDRxMM6JLk8AMVh569iap3TtnjaF3`, which appears to be an XPMarket protocol account, not a project wallet). No liquidity-provider identity, lockup terms, or market-making agreement has been documented — this item is still **not started** beyond confirming the pool's own on-chain state.

- [ ] **Prepare a market-integrity policy.** Prohibit wash trading, spoofing, undisclosed coordination, artificial volume, and misleading performance claims.
  - **Acceptance evidence:** Approved policy, monitoring rules, escalation path, and attestations from relevant operators.

- [ ] **Prepare sustainability evidence.** Explain treasury funding, operating budget, development capacity, customer/user activity, and how the project remains viable without relying on token price appreciation.
  - **Acceptance evidence:** Dated operating plan and supporting financial records appropriate for diligence.

## Priority 2 — Binance.US submission packet

- [ ] **Build the Listing Questionnaire draft offline.** Use only verified facts and mark unknowns rather than guessing.
  - **Acceptance evidence:** Completed draft with source references, document index, and a discrepancy log.

- [ ] **Perform a consistency review.** Check that the questionnaire, website, whitepaper, GitHub repositories, XRPL data, tokenomics, and legal disclosures use the same issuer, supply, dates, and claims.
  - **Acceptance evidence:** Two-person or independent review sign-off and resolved discrepancy log.

- [ ] **Prepare anti-impersonation controls.** Use only official Binance.US listing channels and verify communications through the official domain and application PIN process described by Binance.US.
  - **Acceptance evidence:** Internal communication protocol; never pay an unofficial intermediary or send credentials to an unverified contact.

- [ ] **Obtain explicit submission approval.** Present the exact questionnaire payload and attached documents for user review before submission.
  - **Acceptance evidence:** Written approval tied to the final version and submission destination.

## Current status summary

The project has a functioning **read-only evidence collector** and a documented technical architecture. It does **not** yet have verified legal issuer documentation, a complete public disclosure package, production custody controls, independent security assurance, reconciled tokenomics, or a completed Binance.US submission packet. These are the material gaps to close before seeking Binance.US review.

## References

[1]: https://www.binance.us/listing "Binance.US listing process"
[2]: https://support.binance.us/en/articles/9843852-digital-asset-listing-questionnaire-for-project-developers "Binance.US digital-asset listing questionnaire information"
[3]: https://support.binance.us/en/articles/9842915-listings-on-binance-us-supported-crypto-networks-and-trading-pairs "Binance.US supported crypto, networks, and trading pairs"
[4]: https://github.com/shalominattii-us/sovereign-eoc "EOC project repository"
[5]: https://github.com/shalominattii-us/tsl-ledger-interface "Treasury Sovereign Ledger interface repository"
[6]: https://github.com/shalominattii-us/sovereign-custody "Sovereign custody repository"
[7]: https://github.com/shalominattii-us/sovereign-escrow "Sovereign escrow repository"
[8]: https://github.com/shalominattii-us/sovereign-governance "Sovereign governance repository"
