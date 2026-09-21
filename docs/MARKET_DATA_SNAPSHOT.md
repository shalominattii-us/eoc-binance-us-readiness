# Market Data Snapshot — EOC on XPMarket

**Captured:** 2026-09-21
**Source:** [XPMarket EOC token page](https://xpmarket.com/token/EOC-rB2fKokBsnHCoFWLqZ89dqp2VCbVkKoY2k) (public page, screen-scraped manually; no API key or private data used).
**Methodology note:** XPMarket is a third-party XRPL DEX aggregator/analytics site, not an official Binance.US or XRPL data source. Figures below are as displayed on the page at capture time and are not independently audited.

## Snapshot

| Metric | Value |
|---|---|
| Token | EOC — Eagle Overwatch Command |
| Issuer | `rB2fKokBsnHCoFWLqZ89dqp2VCbVkKoY2k` |
| Token type | IOU |
| Price | $0.0811 |
| Market cap | **$30** |
| Fully diluted valuation (FDV) | **$115.10** |
| Circulating supply | 26.1B EOC |
| Total supply | 99.8B EOC |
| Holders (XPMarket count) | 43 |
| Trustlines | 47 (matches on-chain figure in `XRPL_VERIFICATION_SNAPSHOT.md`) |
| X (Twitter) followers | 66 |
| Issuer fee | 0% |
| Blackholed | **Yes** (independently confirms on-chain finding) |
| Token created | 2025-03-13 |
| All-time high | $0.0818 (2025-03-13) |
| All-time low | $0.01028 (2025-03-13) |

## Liquidity and trading activity

- **Trading venue:** a single AMM pool, pair `EOC/XRP`, pool account `r4jLfSSKK1GG7b3ZUKQ8ha4swvEftpFN26`.
- **Pool liquidity:** in the tens of US dollars at capture time (displayed as fractional XRP amounts consistent with the ~$30 market cap).
- **24-hour volume:** displayed as effectively $0 at capture time.
- **Recent trades panel:** the most recent visible trades were timestamped "7 months ago" — i.e., there is no evidence of active recent trading as of this snapshot.
- **Total on-chain transactions on the pool:** single digits (displayed as 3 txs / 0 swaps / 3 contributors in the AMM pools table at capture time — labels are XPMarket's own and may be interpreted differently on a repeat check).

## Plain-language read

At the time of this snapshot, EOC has **negligible market capitalization ($30) and negligible liquidity**, with no observable recent trading activity. Holder count is small (43) and concentrated (see `XRPL_VERIFICATION_SNAPSHOT.md` — top 5 wallets hold ~84% of supply).

This does not meet the market-quality or sustainability bar implied by Binance.US's public listing criteria (security, regulatory compliance, business standards, project transparency, market potential, long-term sustainability). Any Binance.US submission prepared from this repository should either:

1. Be deferred until there is a materially larger, more distributed, and more active market, or
2. Proceed only with full, honest disclosure of these current figures — never omitted or misrepresented.

## Re-verification

This is a manual, one-time capture. Before any external use:

1. Revisit the XPMarket token page directly and re-record all figures with a fresh timestamp.
2. Cross-check circulating vs. total supply against the on-chain trust-line data in `XRPL_VERIFICATION_SNAPSHOT.md`.
3. If possible, corroborate against a second independent XRPL data source (e.g., Bithomp, XRPSCAN) before citing externally.
