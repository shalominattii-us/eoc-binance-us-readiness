# EOC Tokenomics Reconciliation Model Outline

**Project:** Eagle Overwatch Command (EOC)  
**Network:** XRP Ledger  
**Purpose:** Reconcile on-chain obligations, reported circulating supply, wallet allocations, liquidity, vesting, and market-quality evidence before any exchange-listing packet is prepared.  
**Status:** Model design and evidence request; not a completed tokenomics certification.  
**Prepared:** 2026-09-28

> This model is a diligence and control framework, not investment advice, a valuation, an audit opinion, or legal/regulatory advice. Unknown inputs remain blank or scenario-labeled; they must not be replaced with estimates presented as facts.

## 1. Current verified anchors

| Metric | Current value | Basis | Model treatment |
|---|---:|---|---|
| EOC issuer | `rB2fKokBsnHCoFWLqZ89dqp2VCbVkKoY2k` | XRPL snapshot, ledger 107139925 | Fixed identifier; re-verify before use |
| On-chain obligations | 99,861,010,912.97273 EOC | XRPL `gateway_balances` | Primary total-obligations anchor |
| XPMarket total supply | ~99.8B EOC | XPMarket display | Cross-check only; not primary ledger evidence |
| XPMarket circulating supply | ~26.1B EOC | XPMarket display | Provisional reported-circulating input |
| Implied unexplained difference | ~73,761,010,912.97273 EOC | `on-chain obligations - reported circulating` using 26.1B as displayed | Exception requiring wallet-level classification |
| Implied difference as % of obligations | ~73.8637% | Calculated | Exception metric, not a supply conclusion |
| Trustlines | 47 | XRPL `account_lines` | Holder/trustline population anchor |
| Top-5 obligation concentration | 83.98% | XRPL snapshot | Requires AMM and related-wallet classification |
| Largest wallet concentration | 43.86% | XRPL snapshot | Requires identity and control analysis |
| Identified AMM pool account | `r4jLfSSKK1GG7b3ZUKQ8ha4swvEftpFN26` | XPMarket + XRPL snapshot | Separate liquidity inventory from economic holder concentration |
| XPMarket market cap at capture | $30 | XPMarket snapshot dated 2026-09-21 | Historical market-quality anchor; refresh before use |
| XPMarket liquidity at capture | Tens of USD | XPMarket snapshot dated 2026-09-21 | Historical liquidity anchor; refresh before use |

### Anchor calculation

```text
Unexplained difference
= on-chain obligations - reported circulating supply
= 99,861,010,912.97273 - 26,100,000,000
= 73,761,010,912.97273 EOC
```

The 26.1B figure is displayed approximately by XPMarket. The model must retain the source precision and label the result **provisional** until a project-controlled circulating-supply definition and wallet classification are supplied.

## 2. Reconciliation objective

The model must explain every EOC unit in the on-chain obligations population as of a stated ledger index, using mutually exclusive wallet categories:

```text
Total obligations
= circulating / freely transferable
+ treasury / reserve
+ team / contributor
+ investor / sale
+ ecosystem / grants
+ liquidity inventory
+ locked / vesting
+ custodial / operational
+ burned or permanently inaccessible (if represented in trust-line data)
+ other identified category
+ unresolved / exception balance
```

The target acceptance condition is:

```text
Absolute reconciliation difference = 0 EOC
```

A small residual caused only by rounding may be permitted, but it must be separately disclosed, bounded, and never used to conceal an unidentified wallet balance.

## 3. Recommended workbook / data-model structure

### Tab A — `Control_Panel`

- Model version and preparer.
- As-of timestamp and XRPL validated ledger index.
- Currency code and issuer address.
- Base-case definition of “circulating supply.”
- Scenario selector: **reported**, **economic**, **fully diluted**, **stress**.
- Review status: prepared / management-reviewed / independently reviewed.
- Change log and source-document index.

### Tab B — `Source_Register`

One row per source with:

- Source ID.
- URL, file path, or ledger endpoint.
- Capture date/time.
- Ledger index or market timestamp.
- Data owner.
- Primary / secondary / management-provided classification.
- Hash or immutable export reference where available.
- Notes on limitations.

Source hierarchy:

1. Validated XRPL ledger data.
2. Official project-controlled wallet/allocation records.
3. Signed management representation.
4. XPMarket and other third-party market displays.
5. Narrative documents and historical design notes.

### Tab C — `Wallet_Register`

One row per XRPL account or trust-line balance:

- Wallet address.
- Currency and issuer.
- Balance.
- Ledger index.
- Source record ID.
- Wallet role.
- Legal/economic owner.
- Controlled by project? yes / no / unknown.
- Related-party status.
- AMM pool? yes / no / unknown.
- Custodian or service provider.
- Transfer restriction.
- Vesting/lock expiry.
- Evidence link.
- Classification confidence.
- Reviewer notes.

The five largest wallets must be identified before the reconciliation is considered decision-ready. The AMM pool must be separated from individual holder concentration, but its EOC inventory remains part of total obligations.

### Tab D — `Allocation_Ledger`

A transaction- or event-level ledger for the historical distribution:

- Date / ledger index.
- Event type: genesis, distribution, sale, airdrop, liquidity provisioning, transfer, vesting release, burn, recovery, or other.
- From wallet.
- To wallet.
- Quantity.
- Supporting transaction hash.
- Economic category.
- Contract-enforced or policy-only restriction.
- Reconciled to wallet register? yes / no.
- Notes on missing historical records.

### Tab E — `Vesting_and_Locks`

- Allocation category.
- Beneficiary or wallet.
- Initial quantity.
- Cliff date.
- Linear release start/end.
- Released to date.
- Unreleased balance.
- Enforcement mechanism.
- Custodian / administrator.
- Evidence of enforcement.
- Acceleration or modification rights.

A policy statement alone is not equivalent to a contract-enforced lock. The model must distinguish the two.

### Tab F — `Liquidity_Register`

For each pool or venue:

- Venue and pair.
- Pool account / contract identifier.
- EOC balance.
- Counter-asset balance.
- Valuation timestamp and price source.
- Share of total EOC obligations.
- Liquidity-provider ownership.
- Funding source.
- Lock or withdrawal terms.
- Market-making agreement, if any.
- Fees and inventory policy.
- Evidence of current balance.

### Tab G — `Reconciliation`

Core formulas:

```text
Wallet classified total
= SUM(all balances assigned to a valid category)

Unresolved balance
= On-chain obligations - Wallet classified total

Allocation variance
= Wallet classified balance - Project allocation ledger balance

Circulating variance
= Project-defined circulating supply - Sum(wallets classified as freely transferable)

Liquidity variance
= Current AMM EOC balance - Liquidity balance in project records

Identity coverage
= Balance with verified owner / Total obligations

Category coverage
= Balance with approved category / Total obligations
```

Required control checks:

- No wallet appears twice in the same as-of snapshot.
- Currency and issuer match exactly.
- Wallet balances are non-negative and use consistent precision.
- Wallet categories are mutually exclusive.
- AMM inventory is not counted as both liquidity and a personal holder.
- Transfers between wallets are not double-counted as new supply.
- Project allocations reconcile to the wallet register and on-chain total.
- Total obligations reconcile to the validated ledger response.
- All material exceptions have an owner, due date, and evidence request.

### Tab H — `Market_Quality_Bridge`

Connect tokenomics to market-quality blockers without conflating the two:

- Reported circulating supply.
- Freely transferable classified supply.
- AMM inventory.
- Estimated effective float, if supportable.
- Holder concentration excluding and including AMM inventory.
- Liquidity / market capitalization.
- Volume / effective float.
- Spread and depth observations.
- Dormant or inactive wallet balances.
- Related-party or market-maker balances.

Do not manufacture a “healthy float” by excluding large wallets without evidence that they are locked, inaccessible, or non-economic holdings.

## 4. Required project evidence request

### Legal and ownership

- Legal issuer and jurisdiction.
- Signed statement tying the issuer address to the legal issuer.
- Wallet ownership/control chart.
- Related-party and market-maker disclosure.

### Supply and distribution

- Original issuance or launch record.
- Allocation table totaling 100% of the intended supply.
- Sale, airdrop, farming, grant, and treasury distribution history.
- Team and contributor allocations.
- Vesting and lock evidence.
- Burn records and definition of permanently inaccessible balances.

### Liquidity

- AMM funding transaction hashes.
- Current liquidity-provider identity.
- Source of XRP and EOC contributed.
- Lockup or withdrawal terms.
- Any market-making agreement.
- Current pool statements or fresh on-chain balances.

### Utility and rights

- EOC utility statement.
- Holder rights and non-rights.
- Redemption, backing, reserve, revenue-share, or governance claims.
- Confirmation whether EOC is unbacked and non-redeemable, if that is the intended position.

## 5. Scenario framework

### Scenario 1 — Reported supply case

Uses XPMarket’s displayed ~26.1B circulating supply as a provisional external reference. The ~73.761B difference remains unresolved and is not treated as non-circulating without wallet evidence.

### Scenario 2 — Wallet-classified economic case

Defines circulating supply as wallets classified as freely transferable and not locked, treasury-restricted, vesting, or otherwise inaccessible. This is the preferred diligence case once ownership and restrictions are evidenced.

### Scenario 3 — Fully diluted obligations case

Uses the validated on-chain obligations balance of 99.861B EOC. This is the conservative denominator for concentration and maximum supply exposure.

### Scenario 4 — Stress / adverse disclosure case

Assumes unresolved wallets are economically transferable and potentially related to the project until proven otherwise. Use this to test concentration, liquidity, and market-integrity disclosures.

## 6. Decision gates

| Gate | Pass condition | Current status |
|---|---|---|
| Ledger anchor | Fresh validated ledger snapshot and exact issuer/currency match | Re-run required before external use |
| Wallet completeness | All non-zero EOC trust-line balances captured | Historical snapshot has 47 trustlines; refresh required |
| Ownership coverage | Every material wallet has an identified owner or documented unknown status | Not complete |
| Supply bridge | On-chain obligations equal classified wallet total plus zero residual | Not complete |
| Circulating definition | Signed, consistent definition used across XPMarket, website, whitepaper, and listing packet | Not complete |
| Allocation bridge | Allocation ledger ties to wallet register and total obligations | Not complete |
| Liquidity bridge | Pool inventory and funding source independently reconciled | Not complete |
| Concentration analysis | AMM and related wallets separately identified | Not complete |
| Independent review | Second reviewer or qualified auditor signs off | Not started |
| Listing readiness | No material unexplained supply, ownership, or liquidity exceptions | Not met |

## 7. Immediate 10-step workplan

1. Re-run the XRPL verifier and record a fresh validated ledger index.
2. Export every non-zero EOC trust line and calculate the exact obligation total.
3. Confirm the XPMarket circulating-supply methodology and timestamp.
4. Populate the wallet register with owner, role, AMM, related-party, and restriction fields.
5. Obtain the allocation and distribution ledger from the project.
6. Match each allocation event to an XRPL transaction hash or signed exception note.
7. Separate locked, treasury, team, liquidity, and freely transferable balances.
8. Reconcile the classified wallet total to on-chain obligations with a zero-residual control.
9. Refresh liquidity, market cap, volume, and holder data; calculate concentration both including and excluding the AMM pool.
10. Produce a signed discrepancy log and defer any listing submission until material exceptions are resolved or explicitly disclosed.

## 8. Current financial blockers this model is designed to resolve

1. **Supply definition gap:** XPMarket circulating supply (~26.1B) does not explain the remaining ~73.761B against on-chain obligations.
2. **Wallet identity gap:** the top five wallets represent ~83.98% of obligations, with identities largely unresolved.
3. **Liquidity ownership gap:** the AMM account is identified, but funding source, ownership, lockup, and withdrawal rights are undocumented.
4. **Market-quality gap:** the historical XPMarket snapshot showed approximately $30 market cap and liquidity in the tens of dollars, with effectively zero recent volume.
5. **Sustainability gap:** no verified operating budget, treasury policy, reserve statement, or market-support plan is included in the evidence set.

A completed reconciliation will improve disclosure quality and diligence readiness, but it cannot by itself create liquidity, establish legal compliance, or guarantee an exchange listing.
