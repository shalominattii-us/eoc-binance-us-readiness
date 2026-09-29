# EOC Multi-Chain Registry and Native-Token Certification Gate

**Prepared:** 2026-09-29  
**Current scope:** XRPL and Solana  
**Status:** XRPL verified from prior evidence; Solana deployment reported by project owner but not independently verified in this repository.

## Important terminology

- **XRPL:** EOC is currently documented as a trust-line token identified by issuer `rB2fKokBsnHCoFWLqZ89dqp2VCbVkKoY2k` and currency code `EOC`.
- **Solana:** If deployed, EOC should be identified by a Solana **SPL mint address**. Solana is the network; Raydium is a trading venue/AMM, not the token’s native chain.
- **Native token:** EOC cannot be one blockchain-native coin in the same sense as XRP and simultaneously be an XRPL trust-line token plus a Solana SPL token. The correct description is a **multi-chain representation** unless a documented bridge or migration establishes a canonical supply model.

## Current chain registry

| Network | Asset identifier | Standard | Trade venue | Status | Required evidence |
|---|---|---|---|---|---|
| XRP Ledger | Issuer `rB2fKokBsnHCoFWLqZ89dqp2VCbVkKoY2k`, currency `EOC` | XRPL trust-line token | XPMarket / XRPL DEX evidence in historical snapshot | **Verified as of ledger snapshot 2026-09-21** | Fresh ledger verification before external use |
| Solana | `[REQUIRED: SPL mint address]` | SPL token | Raydium, if current | **Project-reported; unverified** | Mint account, decimals, authorities, supply, holders, Raydium pool, transaction history |
| Celo | Not in current scope | ERC-20 or other | Not established | **Not confirmed** | Do not include in public chain claims unless addresses are supplied and verified |

## Required Solana evidence

Provide and independently verify:

1. SPL mint address.
2. Token symbol, name, and decimals.
3. Current mint authority and freeze authority.
4. Total mint supply and token-account balances.
5. Top-holder concentration and wallet identities where available.
6. Raydium pool address and pair.
7. Pool token balances, liquidity, volume, and trade history.
8. Deploying authority and legal/operator relationship to EOC/Aegentix Cybernetics.
9. Whether the Solana supply is minted independently, bridged from XRPL, or part of a fixed global supply.
10. Burn-and-mint, lock-and-mint, or escrow evidence for any cross-chain movement.
11. Contract/program verification and security review.
12. Any migration, redemption, or holder-swap terms.

## Canonical supply decision

Choose exactly one model and publish it consistently.

### Model A — Fixed global supply with controlled bridge

```text
Global EOC supply
= XRPL circulating/held supply
+ Solana circulating/held supply
+ locked bridge inventory
+ other authorized chain representations
```

Requirements:

- One canonical supply cap.
- Verifiable lock-and-mint or burn-and-release controls.
- Bridge operator, signers, limits, monitoring, and incident response.
- No double-counting of locked backing and minted representation.
- Independent bridge security review.

### Model B — Separate chain supplies

Each chain has a separate issuance and separate supply. Requirements:

- Separate token identifiers and supply disclosures.
- Clear statement that XRPL EOC and Solana EOC are not automatically redeemable 1:1.
- Separate holder, liquidity, and risk disclosures.
- No claim of one unified circulating supply.

### Model C — Migration or replacement

A new Solana or other token replaces an existing representation. Requirements:

- Snapshot and eligibility rules.
- Holder conversion ratio.
- Redemption or swap mechanism.
- Treatment of lost, locked, and exchange-held balances.
- Old-token trading halt or deprecation plan, if applicable.
- Exchange and liquidity-provider coordination.
- Public notice and dispute process.

## Native-token claim gate

EOC should not be described as “native on XRPL and Solana” without qualification. A defensible public statement would be one of the following:

- **If fixed global supply is proven:** “EOC is represented on XRPL and Solana under a documented cross-chain supply and custody model.”
- **If separate supplies exist:** “EOC has separate XRPL and Solana token representations with separately disclosed supplies.”
- **If only XRPL is verified:** “EOC is an XRPL trust-line token; a Solana deployment is reported but pending independent verification.”

## Cross-chain reconciliation controls

For each as-of timestamp:

```text
XRPL obligations
+ Solana mint supply
- locked bridge backing
- burned/unissued inventory
= disclosed global outstanding supply
```

The model must also reconcile:

- Chain-level total supply.
- Chain-level circulating supply.
- Bridge escrow balances.
- DEX/AMM inventory.
- Treasury and team wallets.
- Locked and vested balances.
- Cross-chain transfers and transaction hashes.
- Holders counted once at the economic-owner level where identity is known.

## Certification consequences

A listing or certification reviewer will likely need to know whether it is reviewing:

- One asset with one global supply;
- Several chain-specific representations; or
- A migration in progress.

Until the Solana mint address and supply model are verified, the repository must not combine XRPL obligations with a Solana balance or present a unified market cap, circulating supply, or holder count.

## Aegentix Cybernetics relationship

If Aegentix Cybernetics is the operating or legal entity for EOC, the entity package must identify:

- Legal name and jurisdiction.
- Ownership and control.
- Role in XRPL issuance, Solana deployment, bridge operation, and liquidity.
- Authorized signers and custody controls.
- Related-party and market-maker relationships.
- Responsibility for disclosures, incident response, and token migration.

The name “Aegentix Cybernetics” alone does not establish legal ownership, control, or certification.
