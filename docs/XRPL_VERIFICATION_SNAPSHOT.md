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
- Account `r4jLfSSKK1GG7b3ZUKQ8ha4swvEftpFN26` (rank 3) is also the EOC/XRP AMM pool account per XPMarket — some of its balance is pooled liquidity, not a single private holder. This should be confirmed and annotated before citing the figure externally.

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
