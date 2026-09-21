# EOC Token Fact Sheet — TEMPLATE

Fields already verifiable from public/on-chain data are pre-filled and cited. Everything else needs project input.

## Verified (from `docs/XRPL_VERIFICATION_SNAPSHOT.md` and `docs/MARKET_DATA_SNAPSHOT.md`)

| Field | Value | As of |
|---|---|---|
| Currency code | `EOC` | 2026-09-21 |
| Issuer | `rB2fKokBsnHCoFWLqZ89dqp2VCbVkKoY2k` | 2026-09-21 |
| Issuer status | Blackholed (master key disabled, unusable regular key) | 2026-09-21 |
| Total obligations on-chain | 99,861,010,912.97273 EOC | ledger 107139925 |
| Circulating supply (per XPMarket) | 26.1B EOC | 2026-09-21 |
| Total supply (per XPMarket) | 99.8B EOC | 2026-09-21 |
| Decimal precision | XRPL IOU — up to 15 significant digits, no fixed decimals field; confirm intended display precision | — |
| Trustlines / holder wallets | 47 | 2026-09-21 |
| Freeze/clawback capability | Both effectively permanently disabled by blackhole | 2026-09-21 |

## Requires project input

- Authorized total issuance cap, if any (note: since the issuer is blackholed, no further issuance is currently possible — confirm whether this is intentional and permanent, or whether a different account/mechanism is meant to mint more): `[REQUIRED]`
- Burn mechanism/process, if any: `[REQUIRED]`
- Circulating vs. total supply reconciliation — explain the ~73.7B EOC difference between circulating (26.1B) and total (99.8B): is it treasury-held, locked, or something else? `[REQUIRED]`
- Distribution history: initial sale, airdrop, farming rewards, other: `[REQUIRED]`
- Allocation table (treasury, team, ecosystem, liquidity, grants, etc.) with wallet addresses and amounts: `[REQUIRED]`
- Vesting/lockup schedule and enforcement mechanism (contract-enforced vs. policy-only): `[REQUIRED]`
- Token utility / holder rights (governance, redemption, revenue share, none): `[REQUIRED]`
- Any claim of reserves or backing: if none, state explicitly "EOC is not backed or redeemable for any reserve asset" or provide evidence otherwise: `[REQUIRED]`

## Known top holders requiring identification (from on-chain data)

| Address | % of supply | Identity (internal team / treasury / AMM pool / external holder / unknown) |
|---|---|---|
| `rwB7JKKc5gJ47pPnWCFvQuhVW85mejYF1M` | 43.86% | `[REQUIRED]` |
| `rJ3YA6iFaVXtQgEgnmFGLJ8RZP3NJJtyPQ` | 13.35% | `[REQUIRED]` |
| `r4jLfSSKK1GG7b3ZUKQ8ha4swvEftpFN26` | 10.19% | Likely the EOC/XRP AMM pool account per XPMarket — confirm |
| `rp96cRjU8g8PcrURbZGgByy5TK2VhTYcbN` | 10.01% | `[REQUIRED]` |
| `rKHT6j1mewHb9iy5Dpk34nRygu69YbKVPB` | 6.56% | `[REQUIRED]` |

This identification step is required before any market-integrity or related-party disclosure can be considered complete — 84% of supply currently sits in unidentified or unconfirmed wallets.

## Sign-off

- Prepared by: `[REQUIRED]`
- Date: `[REQUIRED]`
- Reconciled against ledger snapshot dated: 2026-09-21
