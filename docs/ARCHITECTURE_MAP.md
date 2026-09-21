# EOC Treasury and Custody Architecture Map

```text
EOC token on XRPL
        |
        v
Issuer account and trust-line obligations
        |
        v
Read-only evidence verifier  --->  Validated XRPL ledger
        |
        +--> Token facts and supply reconciliation
        +--> Holder and trust-line analysis
        +--> Issuer account evidence

Proposed operational layers requiring completion:

Treasury ledger -> approval policy -> segregated custody wallets
       |                 |                    |
       v                 v                    v
  reconciliation     multi-party sign-off   audit log / recovery

Escrow and governance modules must be connected to the same identity, authority, deployment, and audit model before they are represented as operational.
```

## Current boundary

The implemented verifier is read-only. It does not connect to private keys, sign transactions, mint, transfer, freeze, alter trust lines, or change custody. The operational layers shown below the boundary are design targets and remediation work, not claims of completed production deployment.
