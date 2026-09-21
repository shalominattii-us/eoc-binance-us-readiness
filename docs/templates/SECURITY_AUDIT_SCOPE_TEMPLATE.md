# Independent Security Review — Scope Request TEMPLATE

Use this to brief an independent security firm. This repository's read-only verifier is small enough to review quickly; the larger risk surface is the custody/treasury/escrow/governance repositories referenced below, which per `docs/EVIDENCE_MAP.md` currently contain documentation and encoded artifacts rather than deployed production code.

## In-scope systems

- [ ] This repository's `verifier/server.js` (read-only XRPL client; confirm it truly cannot sign or submit transactions)
- [ ] `sovereign-custody` — vault/custody design and any executable code
- [ ] `tsl-ledger-interface` — treasury ledger HTTP service and chain registry (`tsl-chain-registry.ts`, `tsl-master-minter.ts`)
- [ ] `sovereign-escrow` — escrow contracts/services (`src/sovereign-unified.ts`, SQL init scripts)
- [ ] `sovereign-governance` — governance policy artifacts and any executable authority
- [ ] `sovereign-eagleshield` — hardening/monitoring scripts and dashboard
- [ ] Any deployment pipeline, CI/CD, and secrets-management configuration for the above

## Explicitly out of scope (until built)

- Any production custody signer, HSM integration, or vault — **does not yet exist** per `docs/EVIDENCE_MAP.md`. Do not review or attest to something not yet implemented.

## Required deliverables from the review

- [ ] Written scope and methodology
- [ ] Findings with severity ratings
- [ ] Confirmation (or refutation) that the read-only verifier cannot sign, mint, transfer, freeze, or otherwise mutate on-chain state
- [ ] Confirmation of the current implementation gap already documented internally (placeholder addresses, hard-coded balances) — auditors should independently verify rather than take the internal finding at face value
- [ ] Remediation recommendations
- [ ] Retest / sign-off letter once remediations are applied

## Status

- Firm engaged: `[REQUIRED]`
- Scope agreed: `[REQUIRED — date]`
- Report received: `[REQUIRED — date]`
- Findings closed/retested: `[REQUIRED]`

---
No production custody claim should be made publicly or to Binance.US until this review is complete and its findings are remediated and retested.
