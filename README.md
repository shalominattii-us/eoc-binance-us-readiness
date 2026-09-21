# EOC Binance.US Readiness

This repository contains the documentation, evidence map, and read-only XRPL verifier assembled for Eagle Overwatch Command (EOC) Binance.US-grade listing preparation.

## Scope

The repository is intentionally preparation-only. It does not submit listing applications, execute trades, change liquidity, sign XRPL transactions, mint, transfer, freeze, or custody assets. The verifier is limited to validated-ledger reads and explicitly reports that signing and transaction submission are disabled.

## Contents

- `docs/BINANCE_US_GAP_CHECKLIST.md` — prioritized readiness and remediation checklist.
- `docs/EOC_ENTITY_CARD.md` — current token entity card and benchmark record.
- `docs/EVIDENCE_MAP.md` — repository audit and custody evidence map.
- `verifier/` — read-only XRPL issuer and account verification service.

## Run the verifier

```bash
cd verifier
npm run check
npm start
```

The default port is `8090`. The service supports `GET /health`, `GET /config`, `GET /xrpl/issuer`, and `GET /xrpl/account/:address`. Configure `XRPL_RPC`, `EOC_ISSUER`, and `EOC_CURRENCY` only through environment variables; never commit secrets.

## Current limitation

The reviewed custody repositories contain documentation and encoded policy artifacts, but not a production custody signer or vault implementation. The existing TSL interface contains hard-coded balance output and placeholder addresses. This repository does not represent those components as production custody infrastructure; it records the gap and provides a safe evidence-collection layer.

## Review boundary

Any production custody implementation, public claim of reserves, or Binance.US submission requires separate legal, security, operational, and user approval review.
