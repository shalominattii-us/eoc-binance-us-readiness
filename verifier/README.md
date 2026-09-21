# EOC Custody and Documentation Verifier

This package assembles the EOC treasury documentation cluster with a **read-only XRPL verification layer**. It is intentionally limited to validated-ledger reads. It cannot sign, mint, transfer, freeze, alter trust lines, or move custody assets.

## Included source repositories

The review set includes the following GitHub repositories:

- [sovereign-eoc](https://github.com/shalominattii-us/sovereign-eoc)
- [tsl-ledger-interface](https://github.com/shalominattii-us/tsl-ledger-interface)
- [sovereign-custody](https://github.com/shalominattii-us/sovereign-custody)
- [sovereign-escrow](https://github.com/shalominattii-us/sovereign-escrow)
- [sovereign-governance](https://github.com/shalominattii-us/sovereign-governance)
- [sovereign-eagleshield](https://github.com/shalominattii-us/sovereign-eagleshield)

## Important implementation finding

The existing custody repositories contain documentation and encoded PowerShell policy artifacts, but they do not contain an operational custody signer or vault implementation. The existing TSL HTTP interface returns hard-coded zero balances, and the chain registry contains placeholder addresses. This package therefore does not represent those components as production custody infrastructure.

## Run

```bash
npm run check
npm start
```

The default port is `8090`. Optional environment variables are `PORT`, `XRPL_RPC`, `EOC_ISSUER`, and `EOC_CURRENCY`.

## Read-only routes

- `GET /health` — service status and explicit mutation capabilities.
- `GET /config` — non-secret runtime configuration.
- `GET /xrpl/issuer` — validated XRPL issuer account and gateway obligations for EOC.
- `GET /xrpl/account/:address` — validated XRP account data and EOC trust-line information.

The default issuer is the address supplied in the project context: `rB2fKokBsnHCoFWLqZ89dqp2VCbVkKoY2k`. It must be independently reconciled against the official token listing before use in any submission.

## Binance.US preparation boundary

This package supports evidence collection. It does not submit a Binance.US questionnaire or make a market or custody change. A Binance.US-grade package still requires legal issuer information, ownership and beneficial-control disclosures, tokenomics, security evidence, operational custody controls, and documented reserves. Technical endpoints alone cannot establish those facts.
