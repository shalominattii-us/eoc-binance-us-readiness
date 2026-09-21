# Verification Runbook

## Local checks

```bash
cd verifier
npm run check
npm start
```

The default service port is `8090`.

## Endpoints

```bash
curl http://127.0.0.1:8090/health
curl http://127.0.0.1:8090/config
curl http://127.0.0.1:8090/xrpl/issuer
curl http://127.0.0.1:8090/xrpl/account/<XRPL_ACCOUNT>
```

The default issuer is the EOC account recorded in the entity card. Override it only with a verified value:

```bash
EOC_ISSUER=<verified_issuer> EOC_CURRENCY=EOC npm start
```

## Evidence handling

Save dated JSON responses with the ledger timestamp and source endpoint. Do not place secrets, seed phrases, private keys, or personally identifying information in the repository. Reconcile every public token claim to a validated-ledger response or an identified primary record.
