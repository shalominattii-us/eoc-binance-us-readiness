
// ============================================================================
// TSL TOP 250 BLOCKCHAIN REGISTRY
// ESC Agentic Security Operations — Multi-Chain Deployment Targets
// ============================================================================
// File: tsl-chain-registry.ts
// Version: 1.0.0
// Date: 2026-05-06
// ============================================================================

import { ChainConfig, Blockchain } from './tsl-master-minter';

// ============================================================================
// TIER 1: SOVEREIGN FOUNDATION CHAINS (Priority Deployment)
// ============================================================================

export const TIER_1_CHAINS: ChainConfig[] = [
  {
    chain: 'xrpl',
    endpoint: 'wss://s1.ripple.com',
    treasuryAddress: 'rTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 6,
    enabled: true
  },
  {
    chain: 'solana',
    endpoint: 'https://api.mainnet-beta.solana.com',
    treasuryAddress: 'xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: 'ESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 9,
    enabled: true
  },
  {
    chain: 'hedera',
    endpoint: 'https://mainnet-public.mirrornode.hedera.com',
    treasuryAddress: '0.0.TSL',
    contractAddress: '0.0.ESC',
    decimals: 8,
    enabled: true
  },
  {
    chain: 'dag',
    endpoint: 'https://mainnet.constellationnetwork.io',
    treasuryAddress: 'DAGTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: '0xESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 18,
    enabled: true
  }
];

// ============================================================================
// TIER 2: MAJOR L1 ECOSYSTEMS (High Liquidity)
// ============================================================================

export const TIER_2_CHAINS: ChainConfig[] = [
  {
    chain: 'ethereum' as Blockchain,
    endpoint: 'https://eth-mainnet.g.alchemy.com/v2/KEY',
    treasuryAddress: '0xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: '0xESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 18,
    enabled: true
  },
  {
    chain: 'bitcoin' as Blockchain,
    endpoint: 'https://blockstream.info/api',
    treasuryAddress: 'bc1qtslxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 8,
    enabled: false  // BTC requires RGB/LN layer for tokens
  },
  {
    chain: 'cardano' as Blockchain,
    endpoint: 'https://cardano-mainnet.blockfrost.io/api/v0',
    treasuryAddress: 'addr1tslxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: 'ESC_POLICY_ID',
    decimals: 6,
    enabled: true
  },
  {
    chain: 'avalanche' as Blockchain,
    endpoint: 'https://api.avax.network/ext/bc/C/rpc',
    treasuryAddress: '0xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: '0xESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 18,
    enabled: true
  },
  {
    chain: 'polygon' as Blockchain,
    endpoint: 'https://polygon-rpc.com',
    treasuryAddress: '0xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: '0xESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 18,
    enabled: true
  },
  {
    chain: 'binance' as Blockchain,
    endpoint: 'https://bsc-dataseed.binance.org',
    treasuryAddress: '0xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: '0xESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 18,
    enabled: true
  },
  {
    chain: 'arbitrum' as Blockchain,
    endpoint: 'https://arb1.arbitrum.io/rpc',
    treasuryAddress: '0xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: '0xESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 18,
    enabled: true
  },
  {
    chain: 'optimism' as Blockchain,
    endpoint: 'https://mainnet.optimism.io',
    treasuryAddress: '0xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: '0xESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 18,
    enabled: true
  },
  {
    chain: 'base' as Blockchain,
    endpoint: 'https://mainnet.base.org',
    treasuryAddress: '0xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: '0xESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 18,
    enabled: true
  },
  {
    chain: 'tron' as Blockchain,
    endpoint: 'https://api.trongrid.io',
    treasuryAddress: 'TSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: 'ESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 6,
    enabled: true
  }
];

// ============================================================================
// TIER 3: SPECIALIZED / EMERGING CHAINS
// ============================================================================

export const TIER_3_CHAINS: ChainConfig[] = [
  {
    chain: 'algorand' as Blockchain,
    endpoint: 'https://mainnet-api.algonode.cloud',
    treasuryAddress: 'TSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: 'ESC_ASSET_ID',
    decimals: 6,
    enabled: true
  },
  {
    chain: 'tezos' as Blockchain,
    endpoint: 'https://mainnet.api.tez.ie',
    treasuryAddress: 'tz1TSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: 'KT1ESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 6,
    enabled: true
  },
  {
    chain: 'cosmos' as Blockchain,
    endpoint: 'https://cosmos-rest.publicnode.com',
    treasuryAddress: 'cosmosTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: 'ESC_IBC_DENOM',
    decimals: 6,
    enabled: true
  },
  {
    chain: 'polkadot' as Blockchain,
    endpoint: 'wss://rpc.polkadot.io',
    treasuryAddress: '5TSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: 'ESC_ASSET_ID',
    decimals: 10,
    enabled: true
  },
  {
    chain: 'near' as Blockchain,
    endpoint: 'https://rpc.mainnet.near.org',
    treasuryAddress: 'tsl.near',
    contractAddress: 'esc.tsl.near',
    decimals: 24,
    enabled: true
  },
  {
    chain: 'aptos' as Blockchain,
    endpoint: 'https://fullnode.mainnet.aptoslabs.com/v1',
    treasuryAddress: '0xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: '0xESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 8,
    enabled: true
  },
  {
    chain: 'sui' as Blockchain,
    endpoint: 'https://fullnode.mainnet.sui.io',
    treasuryAddress: '0xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: '0xESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 9,
    enabled: true
  },
  {
    chain: 'stellar' as Blockchain,
    endpoint: 'https://horizon.stellar.org',
    treasuryAddress: 'GTSLSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: 'ESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 7,
    enabled: true
  },
  {
    chain: 'iota' as Blockchain,
    endpoint: 'https://api.iota.org',
    treasuryAddress: 'iotaTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: 'ESC_ASSET_ID',
    decimals: 6,
    enabled: true
  },
  {
    chain: 'vechain' as Blockchain,
    endpoint: 'https://mainnet.veblocks.net',
    treasuryAddress: '0xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: '0xESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 18,
    enabled: true
  }
];

// ============================================================================
// TIER 4: LAYER 2 & ROLLUPS
// ============================================================================

export const TIER_4_CHAINS: ChainConfig[] = [
  {
    chain: 'starknet' as Blockchain,
    endpoint: 'https://starknet-mainnet.public.blastapi.io',
    treasuryAddress: '0xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: '0xESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 18,
    enabled: true
  },
  {
    chain: 'zksync' as Blockchain,
    endpoint: 'https://mainnet.era.zksync.io',
    treasuryAddress: '0xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: '0xESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 18,
    enabled: true
  },
  {
    chain: 'linea' as Blockchain,
    endpoint: 'https://rpc.linea.build',
    treasuryAddress: '0xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: '0xESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 18,
    enabled: true
  },
  {
    chain: 'scroll' as Blockchain,
    endpoint: 'https://rpc.scroll.io',
    treasuryAddress: '0xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: '0xESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 18,
    enabled: true
  },
  {
    chain: 'mantle' as Blockchain,
    endpoint: 'https://rpc.mantle.xyz',
    treasuryAddress: '0xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: '0xESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 18,
    enabled: true
  },
  {
    chain: 'blast' as Blockchain,
    endpoint: 'https://rpc.blast.io',
    treasuryAddress: '0xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: '0xESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 18,
    enabled: true
  },
  {
    chain: 'mode' as Blockchain,
    endpoint: 'https://mainnet.mode.network',
    treasuryAddress: '0xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: '0xESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 18,
    enabled: true
  },
  {
    chain: 'metis' as Blockchain,
    endpoint: 'https://andromeda.metis.io/?owner=1088',
    treasuryAddress: '0xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: '0xESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 18,
    enabled: true
  }
];

// ============================================================================
// TIER 5: ENTERPRISE & PERMISSIONED CHAINS
// ============================================================================

export const TIER_5_CHAINS: ChainConfig[] = [
  {
    chain: 'hyperledger' as Blockchain,
    endpoint: 'https://enterprise.hyperledger.local',
    treasuryAddress: 'TSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: 'ESC_CHANNEL',
    decimals: 6,
    enabled: false  // Requires enterprise onboarding
  },
  {
    chain: 'corda' as Blockchain,
    endpoint: 'https://enterprise.corda.local',
    treasuryAddress: 'TSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: 'ESC_STATE',
    decimals: 6,
    enabled: false
  },
  {
    chain: 'quorum' as Blockchain,
    endpoint: 'https://enterprise.quorum.local',
    treasuryAddress: '0xTSLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    contractAddress: '0xESCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    decimals: 18,
    enabled: false
  }
];

// ============================================================================
// FULL REGISTRY AGGREGATION (Top 250 Structure)
// ============================================================================

export const ALL_CHAIN_TIERS = {
  tier1: TIER_1_CHAINS,    // 4 chains — Sovereign Foundation
  tier2: TIER_2_CHAINS,    // 10 chains — Major L1 Ecosystems
  tier3: TIER_3_CHAINS,    // 10 chains — Specialized/Emerging
  tier4: TIER_4_CHAINS,    // 8 chains — L2/Rollups
  tier5: TIER_5_CHAINS     // 3 chains — Enterprise/Permissioned
};

export function getAllEnabledChains(): ChainConfig[] {
  return Object.values(ALL_CHAIN_TIERS)
    .flat()
    .filter(c => c.enabled);
}

export function getTotalChainCount(): number {
  return Object.values(ALL_CHAIN_TIERS).flat().length;
}

export function getEnabledChainCount(): number {
  return getAllEnabledChains().length;
}

// ============================================================================
// AGENTIC AI SECURITY OPERATIONS MODULE
// ============================================================================
// File: esc-agentic-operations.ts
// ============================================================================

export interface AgenticSecurityOperation {
  operationId: string;
  type: 'threat_response' | 'arbitration' | 'swarm_coordination' | 
        'bounty_distribution' | 'defense_contract' | 'audit_enforcement';
  priority: 'critical' | 'high' | 'medium' | 'low';
  escStakeRequired: bigint;
  aiAgentIds: string[];
  targetChain: Blockchain;
  payload: Record<string, unknown>;
  status: 'pending' | 'funded' | 'executing' | 'completed' | 'disputed';
  timestamp: number;
  settlementTxHash?: string;
}

export interface AIAgentProfile {
  agentId: string;
  publicKey: string;
  reputationScore: number;     // 0-100
  escStaked: bigint;
  operationsCompleted: number;
  operationsFailed: number;
  specialization: string[];    // e.g., ['penetration_testing', 'threat_intelligence']
  chainPreferences: Blockchain[];
  lastActive: number;
}

export class ESCAgenticOperations {
  private agents: Map<string, AIAgentProfile>;
  private operations: Map<string, AgenticSecurityOperation>;
  private minter: any;  // TSLMasterMinter instance

  constructor(minterInstance: any) {
    this.agents = new Map();
    this.operations = new Map();
    this.minter = minterInstance;
  }

  // Register AI Agent with ESC stake
  async registerAgent(
    agentId: string,
    publicKey: string,
    initialStake: bigint,
    specialization: string[],
    chainPreferences: Blockchain[]
  ): Promise<AIAgentProfile> {
    const agent: AIAgentProfile = {
      agentId,
      publicKey,
      reputationScore: 50,  // Starting score
      escStaked: initialStake,
      operationsCompleted: 0,
      operationsFailed: 0,
      specialization,
      chainPreferences,
      lastActive: Date.now()
    };

    this.agents.set(agentId, agent);
    return agent;
  }

  // Fund security operation with ESC
  async fundOperation(
    operation: Omit<AgenticSecurityOperation, 'operationId' | 'timestamp' | 'status'>
  ): Promise<AgenticSecurityOperation> {
    const operationId = crypto.randomUUID();

    const funded: AgenticSecurityOperation = {
      ...operation,
      operationId,
      timestamp: Date.now(),
      status: 'funded'
    };

    this.operations.set(operationId, funded);
    return funded;
  }

  // Execute operation — triggers ESC transfer to agents
  async executeOperation(operationId: string): Promise<void> {
    const op = this.operations.get(operationId);
    if (!op) throw new Error('OPERATION_NOT_FOUND');
    if (op.status !== 'funded') throw new Error('OPERATION_NOT_FUNDED');

    op.status = 'executing';

    // Distribute ESC to participating agents
    const perAgent = op.escStakeRequired / BigInt(op.aiAgentIds.length);

    for (const agentId of op.aiAgentIds) {
      const agent = this.agents.get(agentId);
      if (agent) {
        agent.escStaked += perAgent;
        agent.operationsCompleted++;
        agent.reputationScore = Math.min(100, agent.reputationScore + 1);
        agent.lastActive = Date.now();
      }
    }

    op.status = 'completed';
  }

  // Arbitration settlement — burns or redistributes ESC
  async settleArbitration(
    operationId: string,
    winnerAgentIds: string[],
    loserAgentIds: string[],
    penaltyRate: number = 0.1  // 10% penalty on losers
  ): Promise<void> {
    const op = this.operations.get(operationId);
    if (!op) throw new Error('OPERATION_NOT_FOUND');

    // Winners get bonus, losers get penalized
    const penaltyPerLoser = op.escStakeRequired * BigInt(Math.floor(penaltyRate * 100)) / BigInt(100);
    const bonusPerWinner = (penaltyPerLoser * BigInt(loserAgentIds.length)) / BigInt(winnerAgentIds.length);

    for (const agentId of winnerAgentIds) {
      const agent = this.agents.get(agentId);
      if (agent) {
        agent.escStaked += bonusPerWinner;
        agent.reputationScore = Math.min(100, agent.reputationScore + 5);
      }
    }

    for (const agentId of loserAgentIds) {
      const agent = this.agents.get(agentId);
      if (agent) {
        agent.escStaked -= penaltyPerLoser;
        agent.reputationScore = Math.max(0, agent.reputationScore - 10);
        agent.operationsFailed++;
      }
    }

    op.status = 'completed';
    op.settlementTxHash = crypto.randomUUID();  // In production: actual tx hash
  }

  getAgentProfile(agentId: string): AIAgentProfile | undefined {
    return this.agents.get(agentId);
  }

  getOperation(operationId: string): AgenticSecurityOperation | undefined {
    return this.operations.get(operationId);
  }

  getTopAgents(limit: number = 10): AIAgentProfile[] {
    return Array.from(this.agents.values())
      .sort((a, b) => b.reputationScore - a.reputationScore)
      .slice(0, limit);
  }
}

export default ESCAgenticOperations;
