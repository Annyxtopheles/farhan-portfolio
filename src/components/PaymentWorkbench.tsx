import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Code2, 
  Terminal,
  Activity
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
        badge: 'TLS 1.3 / DTO',
        detail: `Validating payload for ${currencySymbols[currency]}${amount}. Schema verified against OpenAPI specs.`,
        status: 'pending',
        latencyMs: 2
      },
      {
        title: 'Distributed Idempotency Mutex',
        badge: 'Redis 7.2 Cluster',
        detail: scenario === 'idempotency'
          ? 'MUTEX ENGAGED: Identical idempotency key in cache. Replaying cached transaction. 0 duplicate charges.'
          : `Acquired 15s atomic lock for key [${idempKey}]. Double-billing protected.`,
        status: 'pending',
        latencyMs: 4
      },
      {
        title: 'Dynamic Acquirer Route Solver',
        badge: 'Smart Router',
        detail: `Resolved optimal route for ${currency}: Primary -> [Stripe Direct Acquirer]. Est. fee: 1.35% + $0.15.`,
        status: 'pending',
        latencyMs: 12
      },
      {
        title: scenario === 'failover' ? 'Gateway Outage & Cascade Failover' : 'Gateway Dispatch & Settlement',
        badge: scenario === 'failover' ? 'Circuit Breaker' : 'Acquirer Driver',
        detail: scenario === 'failover'
          ? '[504 TIMEOUT] Stripe dropped connection -> Circuit breaker hot-swapped to [Adyen Fallback] in 14ms. User saved.'
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
      await new Promise(r => setTimeout(r, 240));

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
    <section id="workbench" className="py-20 max-w-6xl mx-auto px-6 lg:px-8 border-t border-blue-950/40">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider mb-2">
            <Terminal className="w-4 h-4" />
            <span>Interactive Proof-of-Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Anatomy of a Resilient Payment Flow
          </h2>
        </div>
        <p className="text-slate-400 text-xs sm:text-sm max-w-md font-normal md:text-right">
          Interactive simulation demonstrating atomic idempotency, automated failover cascades, and HMAC signature security.
        </p>
      </div>

      {/* Main 2-Column Workbench Grid (Cuts vertical scrolling in half!) */}
      <div className="rounded-3xl border border-blue-500/15 bg-[#0e1422] p-6 sm:p-8 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Scenario Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 font-bold uppercase tracking-wider">
                1. Select Test Scenario
              </span>
              <span className="text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-500/20">
                Interactive
              </span>
            </div>

            <div className="space-y-2">
              {[
                { id: 'nominal', title: '1. Nominal Fast Path', desc: 'Optimal routing, lowest interchange, 200 OK authorization.' },
                { id: 'failover', title: '2. Upstream 504 Timeout', desc: 'Primary gateway drops -> Circuit breaker auto-cascades in 14ms.' },
                { id: 'idempotency', title: '3. Duplicate Mutation Attack', desc: 'Network retry replays token -> Redis mutex returns cached result with 0 double-charges.' },
                { id: 'tampered_webhook', title: '4. Forged Webhook Payload', desc: 'Malformed signature -> Constant-time verification drops it with audit log.' },
              ].map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => setScenario(sc.id as Scenario)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                    scenario === sc.id
                      ? 'bg-blue-600/15 border-blue-500/50 text-white shadow-sm'
                      : 'bg-[#080c14] border-white/[0.06] text-slate-400 hover:text-slate-200 hover:border-blue-500/20'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-100">{sc.title}</div>
                  <div className="text-[11px] text-slate-400 mt-1 leading-relaxed">{sc.desc}</div>
                </button>
              ))}
            </div>

            {/* Parameter Bar & Trigger */}
            <div className="pt-4 border-t border-white/[0.06] space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Currency:</span>
                <div className="flex rounded-lg border border-white/[0.08] overflow-hidden bg-[#080c14]">
                  {(['USD', 'EUR', 'GBP', 'BDT'] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setCurrency(curr)}
                      className={`px-3 py-1 text-xs font-bold transition-colors ${
                        currency === curr ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
                <span className="text-white font-bold">{currencySymbols[currency]}{amount}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    isRunning
                      ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 active:scale-[0.98]'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{isRunning ? 'Tracing Pipeline...' : 'Run Pipeline Simulation'}</span>
                </button>

                {hasExecuted && (
                  <button
                    onClick={handleReset}
                    className="p-3 rounded-xl bg-[#080c14] hover:bg-[#121824] border border-white/[0.08] text-slate-400 hover:text-white transition-colors"
                    title="Reset simulation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Live Execution Trace & Architecture Code (7 cols) */}
          <div className="lg:col-span-7 bg-[#080c14] rounded-2xl border border-blue-500/15 p-6 flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300">
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                  <span>2. Live State Machine Trace</span>
                </div>
                <button
                  onClick={() => setShowCode(!showCode)}
                  className="text-[11px] font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{showCode ? 'View Trace' : 'View Laravel Code'}</span>
                </button>
              </div>

              {/* View Switcher: Trace vs Code */}
              {showCode ? (
                <div className="p-4 rounded-xl bg-[#05080e] border border-blue-500/15 font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed">
                  <div className="text-slate-500 text-[11px] mb-2">// Atomic Idempotency & Strategy Cascade Pattern (PHP 8.3)</div>
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
              ) : (
                <div className="space-y-2.5">
                  {!hasExecuted ? (
                    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-3">
                        <Terminal className="w-6 h-6 text-blue-400" />
                      </div>
                      <h4 className="text-white font-bold text-sm">Pipeline Ready for Ingress</h4>
                      <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4 leading-relaxed">
                        Select a test scenario on the left and click "Run Pipeline Simulation" to view the step-by-step state machine execution.
                      </p>
                      <button
                        onClick={handleRun}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-600/20"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        Run Nominal Test ($150 USD)
                      </button>
                    </div>
                  ) : (
                    logs.map((step, idx) => {
                      const isRunningStep = step.status === 'running';
                      const isSuccess = step.status === 'success';
                      const isWarning = step.status === 'warning';
                      const isError = step.status === 'error';

                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-xl border text-xs transition-all ${
                            isRunningStep
                              ? 'bg-blue-950/30 border-blue-500/50'
                              : isWarning
                              ? 'bg-amber-950/25 border-amber-500/40 text-amber-200'
                              : isError
                              ? 'bg-rose-950/25 border-rose-500/40 text-rose-200'
                              : isSuccess
                              ? 'bg-[#0e1422] border-blue-500/20'
                              : 'bg-transparent border-white/[0.03] opacity-40'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-2.5">
                              <div className="mt-0.5">
                                {isRunningStep && <div className="w-3.5 h-3.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />}
                                {isSuccess && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                                {isWarning && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                                {isError && <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 font-mono">
                                  <span className="font-bold text-slate-100">{step.title}</span>
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-950/60 border border-blue-500/20 text-blue-300">
                                    {step.badge}
                                  </span>
                                </div>
                                <p className="text-slate-300 mt-1 leading-relaxed font-sans">{step.detail}</p>
                              </div>
                            </div>

                            <span className="font-mono text-[10px] text-slate-400 shrink-0">
                              +{step.latencyMs}ms
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Footer Telemetry */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400 mt-4">
              <span>Strategy: Dynamic Failover + Redis Mutex</span>
              <span className="text-blue-400 font-semibold">Zero Double-Charges</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
