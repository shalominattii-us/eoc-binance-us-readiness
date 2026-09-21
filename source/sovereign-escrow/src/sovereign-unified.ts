
// ============================================================================
// SOVEREIGN UNIFIED ENTRY POINT
// TSL Master Minter + ESC Agentic Ops + WebSocket Dashboard + AI Inference
// ============================================================================
// File: sovereign-unified.ts
// Version: 1.0.0
// Date: 2026-05-06
// ============================================================================

import { createTSLMinter, SecurityPolicy } from './tsl-master-minter';
import { ALL_CHAIN_TIERS, getAllEnabledChains } from './tsl-chain-registry';
import { ESCAgenticOperations } from './esc-agentic-operations';
import { SovereignDashboardServer } from './dashboard-websocket-server';
import { AgenticInferenceEngine, AgenticTaskOrchestrator } from './agentic-ai-inference';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// ============================================================================
// SOVEREIGN SYSTEM CLASS
// ============================================================================

export class SovereignSystem {
  public minter: ReturnType<typeof createTSLMinter>;
  public agentic: ESCAgenticOperations;
  public dashboard: SovereignDashboardServer;
  public inference: AgenticInferenceEngine;
  public orchestrator: AgenticTaskOrchestrator;

  private startTime: number;
  private isRunning: boolean;

  constructor() {
    this.startTime = Date.now();
    this.isRunning = false;
  }

  async initialize(): Promise<void> {
    console.log('');
    console.log('╔══════════════════════════════════════════════════════════════════╗');
    console.log('║                                                                  ║');
    console.log('║     ███████╗ ██████╗ ██╗   ██╗███████╗██████╗  ██████╗ ██╗ ██████╗ ███╗   ██╗    ║');
    console.log('║     ██╔════╝██╔═══██╗██║   ██║██╔════╝██╔══██╗██╔═══██╗██║██╔═══██╗████╗  ██║    ║');
    console.log('║     ███████╗██║   ██║██║   ██║█████╗  ██████╔╝██║   ██║██║██║   ██║██╔██╗ ██║    ║');
    console.log('║     ╚════██║██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗██║   ██║██║██║   ██║██║╚██╗██║    ║');
    console.log('║     ███████║╚██████╔╝ ╚████╔╝ ███████╗██║  ██║╚██████╔╝██║╚██████╔╝██║ ╚████║    ║');
    console.log('║     ╚══════╝ ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝ ╚═════╝ ╚═╝  ╚═══╝    ║');
    console.log('║                                                                  ║');
    console.log('║           TREASURY SOVEREIGN LEDGER + ESC AGENTIC SECURITY        ║');
    console.log('║              Multi-Chain Minting | AI-Powered Operations           ║');
    console.log('║                                                                  ║');
    console.log('╚══════════════════════════════════════════════════════════════════╝');
    console.log('');

    // 1. LOAD SOVEREIGN KEY
    console.log('[PHASE 1] Loading Sovereign Ed25519 Keypair...');
    const keyPath = process.env.TSL_KEY_PATH || './keys/tsl-sovereign.pem';

    if (!fs.existsSync(keyPath)) {
      console.error(`[!] Sovereign key not found: ${keyPath}`);
      console.error('    Run: openssl genpkey -algorithm Ed25519 -out ./keys/tsl-sovereign.pem');
      process.exit(1);
    }

    const sovereignKey = fs.readFileSync(keyPath);
    console.log(`[✓] Sovereign key loaded: ${keyPath}`);

    // 2. SECURITY POLICY
    console.log('[PHASE 2] Configuring Security Policy...');
    const policy: SecurityPolicy = {
      hsmEnabled: process.env.TSL_HSM_ENABLED === 'true',
      thresholdSignatures: parseInt(process.env.TSL_THRESHOLD_M || '2'),
      totalSigners: parseInt(process.env.TSL_THRESHOLD_N || '3'),
      replayProtection: true,
      atomicRollback: true,
      finalityOracles: (process.env.TSL_ORACLES || '').split(',').filter(Boolean),
      quantumResistant: process.env.TSL_QUANTUM === 'true'
    };
    console.log(`[✓] Policy: ${policy.thresholdSignatures}-of-${policy.totalSigners} threshold | HSM: ${policy.hsmEnabled} | Quantum: ${policy.quantumResistant}`);

    // 3. INITIALIZE TSL MASTER MINTER
    console.log('[PHASE 3] Initializing TSL Master Minter...');
    const globalCap = BigInt(process.env.TSL_GLOBAL_CAP || '1000000000000000000');
    this.minter = createTSLMinter(sovereignKey, policy, globalCap);
    console.log(`[✓] TSL Minter initialized | Global Cap: ${globalCap.toString()}`);

    // 4. REGISTER ALL ENABLED CHAINS
    console.log('[PHASE 4] Registering Blockchain Targets...');
    const enabledChains = getAllEnabledChains();
    console.log(`[i] Found ${enabledChains.length} enabled chains across ${Object.keys(ALL_CHAIN_TIERS).length} tiers`);

    for (const chain of enabledChains) {
      this.minter.registerChain(chain);
    }
    console.log(`[✓] All chains registered`);

    // 5. INITIALIZE AGENTIC OPERATIONS
    console.log('[PHASE 5] Initializing ESC Agentic Security Operations...');
    this.agentic = new ESCAgenticOperations(this.minter);
    console.log(`[✓] Agentic layer ready`);

    // 6. INITIALIZE AI INFERENCE ENGINE
    console.log('[PHASE 6] Initializing Agentic AI Inference Engine...');
    this.inference = new AgenticInferenceEngine();

    // Register default providers from env
    const providers = [
      {
        name: 'huggingface' as const,
        endpoint: 'https://api-inference.huggingface.co',
        apiKey: process.env.HF_API_KEY || '',
        model: process.env.HF_MODEL || 'meta-llama/Llama-2-70b-chat-hf',
        maxTokens: 2048,
        temperature: 0.7,
        priority: 8,
        costPerToken: 0.001,
        enabled: !!process.env.HF_API_KEY
      },
      {
        name: 'openrouter' as const,
        endpoint: 'https://openrouter.ai/api/v1',
        apiKey: process.env.OR_API_KEY || '',
        model: process.env.OR_MODEL || 'anthropic/claude-3-opus',
        maxTokens: 4096,
        temperature: 0.7,
        priority: 10,
        costPerToken: 0.003,
        enabled: !!process.env.OR_API_KEY
      },
      {
        name: 'local' as const,
        endpoint: process.env.LOCAL_AI_URL || 'http://localhost:11434',
        apiKey: '',
        model: process.env.LOCAL_MODEL || 'llama3:70b',
        maxTokens: 4096,
        temperature: 0.7,
        priority: 5,
        costPerToken: 0.0001,
        enabled: !!process.env.LOCAL_AI_URL
      }
    ];

    for (const provider of providers) {
      if (provider.enabled) {
        this.inference.registerProvider(provider);
      }
    }
    console.log(`[✓] ${providers.filter(p => p.enabled).length} AI providers registered`);

    // 7. INITIALIZE TASK ORCHESTRATOR
    console.log('[PHASE 7] Initializing Agentic Task Orchestrator...');
    this.orchestrator = new AgenticTaskOrchestrator(this.inference);
    console.log(`[✓] Task orchestrator ready`);

    // 8. INITIALIZE WEBSOCKET DASHBOARD
    console.log('[PHASE 8] Starting WebSocket Dashboard Server...');
    const dashboardPort = parseInt(process.env.DASHBOARD_PORT || '8443');
    this.dashboard = new SovereignDashboardServer(dashboardPort, this.minter, this.agentic);
    console.log(`[✓] Dashboard live on port ${dashboardPort}`);

    // 9. WIRE EVENT LISTENERS
    console.log('[PHASE 9] Wiring Cross-Layer Event Listeners...');
    this.wireEvents();
    console.log(`[✓] All layers interconnected`);

    // 10. FINAL STATUS
    console.log('');
    console.log('╔══════════════════════════════════════════════════════════════════╗');
    console.log('║                    SOVEREIGN SYSTEM ONLINE                       ║');
    console.log('╠══════════════════════════════════════════════════════════════════╣');
    console.log(`║  TSL Minter:        ACTIVE                                      ║`);
    console.log(`║  ESC Agentic:       ACTIVE                                      ║`);
    console.log(`║  AI Inference:      ${providers.filter(p => p.enabled).length} providers ready                    ║`);
    console.log(`║  Dashboard:         ws://localhost:${dashboardPort}                          ║`);
    console.log(`║  Chains:            ${enabledChains.length} enabled / ${Object.values(ALL_CHAIN_TIERS).flat().length} total                    ║`);
    console.log(`║  Supply Cap:        ${globalCap.toString().padStart(20, ' ')}                      ║`);
    console.log('╚══════════════════════════════════════════════════════════════════╝');
    console.log('');

    this.isRunning = true;

    // Graceful shutdown
    process.on('SIGINT', () => this.shutdown());
    process.on('SIGTERM', () => this.shutdown());
  }

  private wireEvents(): void {
    // Minter → Dashboard forwarding
    this.minter.on('batch:signed', (batchId: string, merkleRoot: string) => {
      console.log(`[TSL] Batch ${batchId.slice(0, 8)} signed | Merkle: ${merkleRoot.slice(0, 16)}...`);
    });

    this.minter.on('mint:confirmed', (batchId: string, chain: string, txHash: string) => {
      console.log(`[TSL] ✓ Mint confirmed: ${chain} | ${txHash.slice(0, 16)}...`);
    });

    this.minter.on('mint:failed', (batchId: string, chain: string, error: string) => {
      console.log(`[TSL] ✗ Mint failed: ${chain} | ${error}`);
    });

    this.minter.on('batch:finalized', (batchId: string, status: string, auditHash: string) => {
      console.log(`[TSL] Batch ${batchId.slice(0, 8)} finalized: ${status} | Audit: ${auditHash.slice(0, 16)}...`);
    });

    // Agentic → Dashboard forwarding
    this.agentic.on('agent:registered', (agentId: string) => {
      console.log(`[AGENTIC] Agent registered: ${agentId.slice(0, 12)}...`);
    });

    // AI Inference → Agentic linking
    this.inference.on('inference:completed', (requestId: string, result: any) => {
      console.log(`[AI] Inference ${requestId.slice(0, 8)} completed | ${result.provider} | ${result.tokensUsed} tokens | Cost: ${result.cost.toString()} ESC`);
    });

    this.inference.on('inference:failed', (requestId: string, result: any) => {
      console.log(`[AI] Inference ${requestId.slice(0, 8)} failed | ${result.error}`);
    });

    // Task Orchestrator events
    this.orchestrator.on('task:submitted', (taskId: string, type: string, agentId: string) => {
      console.log(`[TASK] ${type} task submitted: ${taskId.slice(0, 8)} → Agent ${agentId.slice(0, 12)}...`);
    });

    this.orchestrator.on('task:completed', (taskId: string, result: any) => {
      console.log(`[TASK] ${taskId.slice(0, 8)} completed | ${result.provider} | ${result.latencyMs}ms`);
    });

    // Dashboard client events
    this.dashboard.on('client:connected', (clientId: string, tier: string) => {
      console.log(`[DASH] Client connected: ${clientId.slice(0, 8)} (${tier}) | Total: ${this.dashboard.getClientCount()}`);
    });
  }

  // Public API methods
  async createMintBatch(allocations: any[]): Promise<any> {
    const batch = await this.minter.createBatch(allocations);
    return batch;
  }

  async dispatchBatch(batchId: string): Promise<any> {
    return await this.minter.dispatchBatch(batchId);
  }

  async registerAgent(agentId: string, publicKey: string, stake: bigint, specs: string[], chains: string[]): Promise<any> {
    return await this.agentic.registerAgent(agentId, publicKey, stake, specs, chains as any);
  }

  async submitAgenticTask(
    type: string,
    description: string,
    input: string,
    expectedOutput: string,
    agentId: string,
    budget: bigint
  ): Promise<any> {
    return await this.orchestrator.submitTask(
      type as any,
      description,
      input,
      expectedOutput,
      agentId,
      budget
    );
  }

  async submitInference(
    agentId: string,
    prompt: string,
    systemPrompt?: string,
    priority?: string
  ): Promise<any> {
    return await this.inference.submitRequest({
      agentId,
      operationId: crypto.randomUUID(),
      prompt,
      systemPrompt,
      priority: (priority || 'medium') as any,
      timeoutMs: 120000
    });
  }

  getSystemStatus() {
    const supply = this.minter.getGlobalSupply();
    return {
      uptime: Date.now() - this.startTime,
      running: this.isRunning,
      supply,
      chains: {
        total: Object.values(ALL_CHAIN_TIERS).flat().length,
        enabled: getAllEnabledChains().length
      },
      dashboard: {
        port: process.env.DASHBOARD_PORT || 8443,
        clients: this.dashboard.getClientCount()
      },
      ai: this.inference.getStats(),
      tasks: this.orchestrator.getStats()
    };
  }

  private async shutdown(): Promise<void> {
    console.log('');
    console.log('[!] Shutdown signal received...');
    this.isRunning = false;

    await this.minter.disconnect();
    this.dashboard.stop();

    console.log('[✓] Sovereign system shutdown complete');
    process.exit(0);
  }
}

// ============================================================================
// MAIN ENTRY
// ============================================================================

async function main() {
  const sovereign = new SovereignSystem();
  await sovereign.initialize();

  // Keep alive
  setInterval(() => {
    const status = sovereign.getSystemStatus();
    if (status.supply.circulating !== '0') {
      console.log(`[PULSE] Supply: ${status.supply.circulating} / ${status.supply.cap} | Clients: ${status.dashboard.clients} | Tasks: ${status.tasks.completed} completed`);
    }
  }, 30000);  // Every 30 seconds
}

main().catch((error) => {
  console.error('[FATAL]', error);
  process.exit(1);
});

export default SovereignSystem;
