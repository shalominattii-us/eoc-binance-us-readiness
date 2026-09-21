# Production Custody Controls — Design Template

> Fill this in only as real controls are actually implemented. Do not describe planned controls as if they are live. Mark each row's status honestly: `Not started / In design / Implemented, untested / Implemented, tested / Implemented, audited`.

## Wallet segregation

| Purpose | Wallet/account | Segregated from other purposes? | Status |
|---|---|---|---|
| Issuer (blackholed) | `rB2fKokBsnHCoFWLqZ89dqp2VCbVkKoY2k` | N/A — no longer controllable by anyone | Confirmed blackholed |
| Treasury | `[REQUIRED]` | | |
| Team allocation | `[REQUIRED]` | | |
| Liquidity | `[REQUIRED]` | | |
| Operations/hot wallet, if any | `[REQUIRED]` | | |

## Key generation and recovery

- Key generation method (ceremony, HSM-generated, other): `[REQUIRED]`
- Number of parties required to reconstruct a key (if multi-party): `[REQUIRED]`
- Recovery procedure if a signer is unavailable: `[REQUIRED]`
- Key rotation policy and last rotation date: `[REQUIRED]`

## Signing authority

- Multi-signature or multi-party approval scheme in use: `[REQUIRED — describe threshold, e.g., 3-of-5]`
- List of signers (roles, not necessarily names, if sensitive): `[REQUIRED]`
- Withdrawal limits and approval tiers: `[REQUIRED]`
- Emergency suspension procedure: `[REQUIRED]`

## Hardware-backed protection

- HSM or equivalent vendor/product: `[REQUIRED]`
- Architecture diagram location: `[REQUIRED]`
- Disaster-recovery test date and result: `[REQUIRED]`

## Audit trail

- Logging system used: `[REQUIRED]`
- What is logged (every proposal, approval, execution, reconciliation event): `[REQUIRED]`
- Retention period: `[REQUIRED]`
- Tamper-evidence mechanism (e.g., hash chaining, external notarization): `[REQUIRED]`

## Reconciliation

- Reconciliation frequency: `[REQUIRED]`
- Reconciliation method (on-chain balance vs. internal ledger vs. `verifier` output): `[REQUIRED]`
- Exception-handling workflow: `[REQUIRED]`
- Most recent signed reconciliation report location: `[REQUIRED]`

## Explicit boundary while this template is incomplete

Until every `[REQUIRED]` field above is filled with a real, implemented, and — for the higher-risk items — independently reviewed control, this repository's public materials must continue to state plainly that **no production custody system exists** and that the verifier is read-only, per `SECURITY.md` and `verifier/README.md`.
