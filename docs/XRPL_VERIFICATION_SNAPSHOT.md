# XRPL Verification Snapshot — EOC Issuer

**Captured:** 2026-09-21 (validated ledger index `107139928`)
**Method:** Direct read-only JSON-RPC calls to `https://xrplcluster.com/` (`account_info`, `account_lines`, `gateway_balances`) via this repository's `verifier/server.js`, cross-checked against the public XPMarket token page. No signing, submission, or mutation was performed or is possible with this tooling.

This snapshot is a point-in-time fact record. It will drift as the ledger advances; re-run `verifier` before relying on any number here for a submission.

## Issuer account facts

| Field | Value | Source |
|---|---|---|
| Account | `rB2fKokBsnHCoFWLqZ89dqp2VCbVkKoY2k` | on-chain |
| Sequence | 94732569 | `account_info` |
| Owner count | 3 | `account_info` |
| XRP reserve balance | 3.999942 XRP | `account_info` |
| Master key | **Disabled** (`disableMasterKey: true`) | `account_info.account_flags` |
| Regular key | `rrrrrrrrrrrrrrrrrrrrrhoLvTp` | `account_info.account_data` |
| Default ripple | true | `account_info.account_flags` |
| Global freeze | false | `account_info.account_flags` |
| No-freeze permanently disabled | false | `account_info.account_flags` |
| Require auth | false | `account_info.account_flags` |
| Trustline clawback enabled | false | `account_info.account_flags` |

### Interpretation — blackholed issuer

`rrrrrrrrrrrrrrrrrrrrrhoLvTp` is the XRPL community-standard address used to permanently disable an account: it is not a real, controllable key. Combined with `disableMasterKey: true`, this means **no one can currently sign a transaction from this issuer account** — not the original creator, not EOC/Eagle Overwatch Command operators, not anyone. Practical consequences:

- Total EOC supply is fixed and cannot be increased through further issuance from this account.
- The issuer can never freeze trust lines, enable clawback, or change these settings going forward, because doing so requires a signed transaction from an account that no longer has a usable key.
- This is independently confirmed by XPMarket, which flags the token `Blackholed: YES`.

This is a genuinely positive, verifiable fact for a "no ongoing issuer risk" narrative. It should be stated plainly and cited with this evidence — not overstated as "audited" or "government-grade."

## Supply and obligations

| Field | Value | Source |
|---|---|---|
| Currency code | `EOC` | `gateway_balances` |
| Total obligations (sum of all trust line balances) | `99,861,010,912.97273 EOC` | `gateway_balances.obligations.EOC` |
| Trustlines held against issuer | 47 (1 unrelated zero-balance line for a different currency also exists) | `account_lines` |

This reconciles with the ~99.861 billion EOC figure referenced in `BINANCE_US_GAP_CHECKLIST.md` Priority 1. That checklist item is now **evidenced**, not just claimed — see the raw figures above.

## Holder concentration (from the 47 trust lines against the issuer)

| Rank | Account | Balance (EOC) | % of total supply |
|---|---|---|---|
| 1 | `rwB7JKKc5gJ47pPnWCFvQuhVW85mejYF1M` | 43,802,031,550.23 | 43.86% |
| 2 | `rJ3YA6iFaVXtQgEgnmFGLJ8RZP3NJJtyPQ` | 13,329,665,467.58 | 13.35% |
| 3 | `r4jLfSSKK1GG7b3ZUKQ8ha4swvEftpFN26` | 10,180,845,598.02 | 10.19% |
| 4 | `rp96cRjU8g8PcrURbZGgByy5TK2VhTYcbN` | 10,000,000,000.00 | 10.01% |
| 5 | `rKHT6j1mewHb9iy5Dpk34nRygu69YbKVPB` | 6,549,135,446.00 | 6.56% |

- **Top 1 holder: 43.86% of supply.**
- **Top 5 holders combined: 83.98% of supply.**
- 42 remaining trustlines share the remaining ~16%.

### Update (2026-09-23) — AMM pool account confirmed

Directly queried `account_info` and `amm_info` for `r4jLfSSKK1GG7b3ZUKQ8ha4swvEftpFN26` at validated ledger index `107169789`:

- `account_info` returns `"pseudo_account": {"type": "AMM"}` and an `AMMID`, which XRPL only sets on AMM pool accounts — this is **not** a private holder wallet.
- `amm_info` confirms it is the EOC/XRP AMM pool: pool holds `7.639367 XRP` and `10,180,845,598.01736 EOC`, LP token issued by the pool itself, trading fee 0.5%, voting/auction slot controlled by `rXPMxDRxMM6JLk8AMVh569iap3TtnjaF3` (the XPMarket protocol account).
- The ~7.64 XRP pool balance (≈ $12 at $1.57/XRP observed on XPMarket at capture time) matches the "tens of dollars of liquidity" finding in `MARKET_DATA_SNAPSHOT.md`.

So of the top-5 trustline holders, **one (rank 3, 10.19%) is the AMM pool itself**, not an individual or entity holding tokens off-market. Excluding it, the top-4 *actual* holder wallets are:

| Rank (excl. AMM) | Account | Balance (EOC) | % of total supply |
|---|---|---|---|
| 1 | `rwB7JKKc5gJ47pPnWCFvQuhVW85mejYF1M` | 43,802,031,550.23 | 43.86% |
| 2 | `rJ3YA6iFaVXtQgEgnmFGLJ8RZP3NJJtyPQ` | 13,329,665,467.58 | 13.35% |
| 3 | `rp96cRjU8g8PcrURbZGgByy5TK2VhTYcbN` | 10,000,000,000.00 | 10.01% |
| 4 | `rKHT6j1mewHb9iy5Dpk34nRygu69YbKVPB` | 6,549,135,446.00 | 6.56% |

Combined: **73.78%** of total obligations sit in these four wallets alone. No public identity, tag, or disclosure exists yet for any of the four — that is required Priority 0/1 work (beneficial-ownership screening and the related-party register), not something this on-chain read can establish.

### Update (2026-09-23) — likely explanation for the circulating-vs-total supply gap

XPMarket reports circulating supply as **~26.1B EOC** against total obligations of **~99.86B EOC** (see `MARKET_DATA_SNAPSHOT.md`), a gap this document previously flagged as unreconciled. Arithmetic check against the four non-AMM top holders above:

```
99,861,010,912.97 (total obligations)
− 43,802,031,550.23 (holder 1)
− 13,329,665,467.58 (holder 2)
− 10,000,000,000.00 (holder 3)
−  6,549,135,446.00 (holder 4)
= 26,180,178,449.16 EOC remaining
```

`26,180,178,449.16` is within ~0.3% of XPMarket's reported `26.1B` circulating figure. This strongly suggests XPMarket's circulating-supply calculation **excludes exactly these four wallets** (and counts the AMM pool's holdings and all smaller holders as "circulating"). This is a plausible, well-supported hypothesis based on independently reproducible ledger arithmetic — **it is not a confirmed fact** until the project or XPMarket states its actual methodology and the identity/purpose of the four wallets (e.g., treasury, team, escrow) is disclosed. Do not present this as a confirmed reconciliation in any external submission without that confirmation.

This level of concentration is a material fact for the checklist's "Document holder and transaction distribution" and "Document liquidity ownership and funding" items. It has not previously been documented anywhere in this repository set.

## Raw verifier output (for reproducibility)

```json
GET /xrpl/issuer
{
  "issuer": "rB2fKokBsnHCoFWLqZ89dqp2VCbVkKoY2k",
  "currency": "EOC",
  "ledger_index": 107139925,
  "sequence": 94732569,
  "owner_count": 3,
  "xrp_drops": "3999942",
  "obligations": "99861010912.97273",
  "obligations_all": { "EOC": "99861010912.97273" },
  "validated": true
}
```

## What this snapshot does not establish

- Legal ownership or control of the issuer account by any named legal entity.
- That the wallets above are unrelated / non-affiliated with each other or with the project team (a related-wallet analysis has not been performed).
- Anything about off-chain reserves, treasury operations, or custody of assets backing EOC, if any are claimed elsewhere.

Re-verify by running:

```bash
cd verifier
npm run check
npm start
curl localhost:8090/xrpl/issuer
curl localhost:8090/xrpl/account/<address>
```
