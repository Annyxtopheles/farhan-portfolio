import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Code2, 
  Terminal
} from 'lucide-react';

type Scenario = 'nominal' | 'failover' | 'idempotency' | 'tampered_webhook';

interface StepLog {
  title: string;
  detail: string;
  badge: string;
  status: 'pending' | 'running' | 'success' | 'warning' | 'error';
  latencyMs: number;
}

export const PaymentWorkbench: React.FC = () => {
  const [scenario, setScenario] = useState<Scenario>('nominal');
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'BDT'>('USD');
  const amount = 150;
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasExecuted, setHasExecuted] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [logs, setLogs] = useState<StepLog[]>([]);

  const currencySymbols = { USD: '$', EUR: '€', GBP: '£', BDT: '৳' };

  const handleRun = async () => {
    setIsRunning(true);
    setHasExecuted(true);

    const idempKey = scenario === 'idempotency' 
      ? 'idemp_live_DUPLICATE_REPLAY_TEST' 
      : `idemp_${Math.random().toString(36).substring(2, 10)}`;

    const initialSteps: StepLog[] = [
      {
        title: 'Ingress & Schema Sanitization',
        badge: 'TLS 1.3 / Strict DTO',
        detail: `Validating payload for ${currencySymbols[currency]}${amount}. Schema verified against OpenAPI specs.`,
        status: 'pending',
        latencyMs: 2
      },
      {
        title: 'Distributed Idempotency Mutex',
        badge: 'Redis 7.2 Cluster',
        detail: scenario === 'idempotency'
          ? 'MUTEX ENGAGED: Identical idempotency key found in cache. Replaying cached transaction. 0 duplicate charge.'
          : `Acquired 15s atomic lock for key [${idempKey}]. Double-billing protected.`,
        status: 'pending',
        latencyMs: 4
      },
      {
        title: 'Dynamic Acquirer Route Solver',
        badge: 'Routing Engine',
        detail: `Resolved optimal route for ${currency}: Primary -> [Stripe Direct Acquirer]. Est. fee: 1.35% + $0.15.`,
        status: 'pending',
        latencyMs: 12
      },
      {
        title: scenario === 'failover' ? 'Gateway Outage & Cascade Failover' : 'Gateway Dispatch & Settlement',
        badge: scenario === 'failover' ? 'Circuit Breaker' : 'Acquirer Driver',
        detail: scenario === 'failover'
          ? '[504 TIMEOUT] Stripe dropped connection -> Circuit breaker hot-swapped to [Adyen EU Fallback] in 14ms. User saved.'
          : 'Dispatched to Stripe Direct Acquirer. 200 OK authorization received.',
        status: 'pending',
        latencyMs: scenario === 'failover' ? 32 : 18
      },
      {
        title: 'HMAC Webhook Verification & Ledger State',
        badge: 'HMAC-SHA256',
        detail: scenario === 'tampered_webhook'
          ? 'SECURITY REJECTION: Webhook signature hash_equals() failed. Forged event rejected and logged.'
          : 'Webhook signature verified in constant time. Atomic ledger state transitioned to SETTLED.',
        status: 'pending',
        latencyMs: 6
      }
    ];

    setLogs(initialSteps);

    for (let i = 0; i < initialSteps.length; i++) {
      setLogs(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'running' } : s));
      await new Promise(r => setTimeout(r, 260));

      setLogs(prev => prev.map((s, idx) => {
        if (idx !== i) return s;
        if (i === 1 && scenario === 'idempotency') return { ...s, status: 'warning' };
        if (i === 3 && scenario === 'failover') return { ...s, status: 'warning' };
        if (i === 4 && scenario === 'tampered_webhook') return { ...s, status: 'error' };
        return { ...s, status: 'success' };
      }));

      if (scenario === 'idempotency' && i === 1) {
        setLogs(prev => prev.map((s, idx) => idx > 1 ? { ...s, status: 'success', detail: 'Skipped - safely replayed from atomic cache.' } : s));
        break;
      }
      if (scenario === 'tampered_webhook' && i === 4) break;
    }

    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setHasExecuted(false);
    setLogs([]);
    setScenario('nominal');
  };

  return (
    <section id="workbench" className="py-16 max-w-4xl mx-auto px-6 border-t border-white/[0.08]">
      
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider mb-2">
          <Terminal className="w-4 h-4" />
          <span>Interactive Proof-of-Work</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Anatomy of a Resilient Payment Flow
        </h2>
        <p className="text-slate-400 text-sm mt-2 leading-relaxed">
          I built this interactive sandbox to demonstrate how I solve the core engineering problems in transactional infrastructure: atomic idempotency, zero-downtime PSP cascade failover, and cryptographic webhook verification.
        </p>
      </div>

      {/* Main Interactive Box */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#101319] p-6 sm:p-8 space-y-6">
        
        {/* Scenario Selector */}
        <div>
          <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block mb-3">
            Select Test Scenario
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { id: 'nominal', title: '1. Nominal Happy Path', desc: 'Optimal routing, lowest interchange fee, 200 OK fast path.' },
              { id: 'failover', title: '2. Upstream 504 Timeout', desc: 'Primary gateway times out -> Circuit breaker auto-cascades in 14ms.' },
              { id: 'idempotency', title: '3. Duplicate Mutation Attack', desc: 'Network retries replay identical token -> Redis mutex returns cached result.' },
              { id: 'tampered_webhook', title: '4. Forged Webhook Payload', desc: 'Malformed signature header -> Constant-time verification drops it.' },
            ].map((sc) => (
              <button
                key={sc.id}
                onClick={() => setScenario(sc.id as Scenario)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  scenario === sc.id
                    ? 'bg-white/[0.08] border-white/20 text-white'
                    : 'bg-white/[0.02] border-white/[0.05] text-slate-400 hover:text-slate-200 hover:border-white/10'
                }`}
              >
                <div className="text-xs font-bold text-slate-200">{sc.title}</div>
                <div className="text-[11px] text-slate-400 mt-1 leading-snug">{sc.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Button & Currency Parameters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-slate-400">Parameters:</span>
            <div className="flex rounded-lg border border-white/[0.08] overflow-hidden">
              {(['USD', 'EUR', 'GBP', 'BDT'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2.5 py-1 text-xs transition-colors ${
                    currency === curr ? 'bg-white text-black font-bold' : 'bg-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
            <span className="text-slate-300 font-semibold">{currencySymbols[currency]}{amount}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRun}
              disabled={isRunning}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                isRunning
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-white hover:bg-slate-200 text-black shadow-md'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>{isRunning ? 'Tracing Execution...' : 'Run Pipeline Simulation'}</span>
            </button>

            {hasExecuted && (
              <button
                onClick={handleReset}
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-white transition-colors"
                title="Reset simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Live Execution Output Trace */}
        {hasExecuted && (
          <div className="pt-6 border-t border-white/[0.06] space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Pipeline Execution Log</span>
              <span className="text-emerald-400 font-normal">State Machine Active</span>
            </div>

            <div className="space-y-2">
              {logs.map((step, idx) => {
                const isRunningStep = step.status === 'running';
                const isSuccess = step.status === 'success';
                const isWarning = step.status === 'warning';
                const isError = step.status === 'error';

                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border text-xs transition-all ${
                      isRunningStep
                        ? 'bg-blue-950/20 border-blue-500/40'
                        : isWarning
                        ? 'bg-amber-950/20 border-amber-500/30'
                        : isError
                        ? 'bg-rose-950/20 border-rose-500/30'
                        : isSuccess
                        ? 'bg-white/[0.03] border-white/[0.08]'
                        : 'bg-transparent border-white/[0.03] opacity-40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5">
                          {isRunningStep && <div className="w-3.5 h-3.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />}
                          {isSuccess && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                          {isWarning && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                          {isError && <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 font-mono">
                            <span className="font-bold text-slate-200">{step.title}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/[0.06] text-slate-400">
                              {step.badge}
                            </span>
                          </div>
                          <p className="text-slate-300 mt-1 leading-relaxed font-sans">{step.detail}</p>
                        </div>
                      </div>

                      <span className="font-mono text-[10px] text-slate-500 shrink-0">
                        +{step.latencyMs}ms
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Code Snippet Drawer Toggle */}
        <div className="pt-2">
          <button
            onClick={() => setShowCode(!showCode)}
            className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{showCode ? 'Hide Production Architecture Pattern' : 'Inspect Production Architecture Pattern (Laravel 11)'}</span>
          </button>

          {showCode && (
            <div className="mt-3 p-4 rounded-xl bg-[#090b0e] border border-white/[0.08] font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed">
              <div className="text-slate-500 text-[11px] mb-2">// Atomic Idempotency & Strategy Cascade Pattern</div>
              <pre>{`$mutex = Cache::lock("idemp:lock:{$idempotencyKey}", 15);

if (!$mutex->get()) {
    throw new ConcurrentTransactionException("Transaction in flight");
}

try {
    if ($cached = Transaction::findByReplayKey($idempotencyKey)) {
        return response()->json($cached->payload, 200);
    }

    foreach ($this->router->resolveChain($request) as $gateway) {
        if ($this->circuitBreaker->isOpen($gateway)) continue;

        try {
            $result = $gateway->charge($request);
            if ($result->isSuccessful()) {
                return $this->commitToLedger($result, $idempotencyKey);
            }
        } catch (GatewayTimeoutException $e) {
            $this->circuitBreaker->recordFailure($gateway);
        }
    }
} finally {
    $mutex->release();
}`}</pre>
            </div>
          )}
        </div>

      </div>

    </section>
  );
};
