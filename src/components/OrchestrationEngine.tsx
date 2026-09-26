import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  ShieldAlert, 
  Server, 
  Code2, 
  FileText, 
  Zap, 
  CheckCircle2, 
  AlertTriangle
} from 'lucide-react';

type Currency = 'USD' | 'EUR' | 'GBP' | 'BDT' | 'JPY' | 'USDT';
type PaymentMethod = 'card' | 'applepay' | 'sepa' | 'bkash' | 'crypto';
type FailureMode = 'none' | 'gateway_timeout' | 'double_submit' | 'tampered_webhook';

interface TraceStep {
  id: string;
  name: string;
  latencyMs: number;
  status: 'pending' | 'running' | 'success' | 'warning' | 'error';
  detail: string;
  meta?: Record<string, string>;
}

export const OrchestrationEngine: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [amount, setAmount] = useState<number>(250);
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [failureMode, setFailureMode] = useState<FailureMode>('none');
  const [activeTab, setActiveTab] = useState<'trace' | 'payload' | 'architecture'>('trace');
  
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [hasRun, setHasRun] = useState<boolean>(false);
  const [simulatedIdempKey, setSimulatedIdempKey] = useState<string>('idemp_live_7e8b91c4d0a');
  const [executionLog, setExecutionLog] = useState<TraceStep[]>([]);
  const [stats, setStats] = useState({
    simulatedCount: 1420,
    cascadesResolved: 89,
    avgRouterLatency: '18ms',
    idempDoubleChargesBlocked: 34
  });

  const currencySymbols: Record<Currency, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    BDT: '৳',
    JPY: '¥',
    USDT: '₮'
  };

  const getPrimaryPsp = (curr: Currency, meth: PaymentMethod): { primary: string; fallback: string } => {
    if (meth === 'bkash') return { primary: 'bKash Merchant Rail v2', fallback: 'Nagad Corporate Gateway' };
    if (meth === 'crypto') return { primary: 'Binance Pay / TRON USDT', fallback: 'Coinbase Commerce Rail' };
    if (curr === 'EUR' || meth === 'sepa') return { primary: 'Adyen EU Acquirer', fallback: 'Stripe SEPA Gateway' };
    if (curr === 'GBP') return { primary: 'Checkout.com UK Faster Payments', fallback: 'Barclays E-Commerce' };
    return { primary: 'Stripe US Direct Acquirer', fallback: 'Checkout.com Global Fallback' };
  };

  const handleSimulate = async () => {
    setIsProcessing(true);
    setHasRun(true);

    const { primary, fallback } = getPrimaryPsp(currency, method);
    const idempKey = failureMode === 'double_submit' 
      ? 'idemp_live_DUPLICATE_REPLAY_HASH' 
      : `idemp_live_${Math.random().toString(36).substring(2, 11)}`;
    setSimulatedIdempKey(idempKey);

    const initialSteps: TraceStep[] = [
      {
        id: 'ingress',
        name: 'Ingress & Payload Sanitization',
        latencyMs: 3,
        status: 'pending',
        detail: 'Request validated against strict OpenAPI schema. PCI tokenized format verified.',
        meta: { Protocol: 'HTTPS TLS 1.3', IP: '198.51.100.44', Region: 'EU-Central-1' }
      },
      {
        id: 'idempotency',
        name: 'Distributed Idempotency Lock',
        latencyMs: 4,
        status: 'pending',
        detail: `Acquired Redis cluster mutex for key: ${idempKey.slice(0, 16)}...`,
        meta: { Storage: 'Redis 7.2 Cluster', TTL: '120s', 'Atomic Lock': 'Acquired' }
      },
      {
        id: 'routing',
        name: 'Dynamic PSP Route Resolution',
        latencyMs: 12,
        status: 'pending',
        detail: `Calculated optimal fee & latency route: Primary -> [${primary}].`,
        meta: { Currency: currency, 'Cost Estimate': '1.35% + 0.15', HealthScore: '99.94%' }
      },
      {
        id: 'dispatch',
        name: failureMode === 'gateway_timeout' ? 'Gateway Dispatch & Cascade Failover' : 'Gateway Dispatch',
        latencyMs: failureMode === 'gateway_timeout' ? 34 : 26,
        status: 'pending',
        detail: failureMode === 'gateway_timeout'
          ? `[504 TIMEOUT] ${primary} dropped connection -> Hot-swapped to fallback [${fallback}] in 14ms.`
          : `Dispatched payment request to ${primary} with 200 OK authorized response.`,
        meta: { 
          'Primary PSP': primary, 
          'Status Code': failureMode === 'gateway_timeout' ? '504 -> 200 (Cascaded)' : '200 OK',
          'Auth Code': 'AUTH_9812A' 
        }
      },
      {
        id: 'webhook',
        name: 'HMAC Webhook Ingestion & Verification',
        latencyMs: 7,
        status: 'pending',
        detail: failureMode === 'tampered_webhook'
          ? 'SECURITY REJECTION: HMAC-SHA256 signature does not match secret header. Dropped.'
          : 'Asynchronous webhook event received. Constant-time HMAC-SHA256 signature verified.',
        meta: { 
          Signature: failureMode === 'tampered_webhook' ? 'MISMATCH (REJECTED)' : 'HMAC-SHA256 Valid',
          Algorithm: 'hash_equals()' 
        }
      },
      {
        id: 'settlement',
        name: 'Atomic Ledger State Machine',
        latencyMs: 5,
        status: 'pending',
        detail: failureMode === 'tampered_webhook'
          ? 'State transition aborted. Transaction flagged for manual fraud review.'
          : `Transition: AUTHORIZED -> SETTLED. Double-entry balances updated in MySQL with row-level locks.`,
        meta: { 'Isolation Level': 'SERIALIZABLE', State: failureMode === 'tampered_webhook' ? 'FLAGGED_ABORT' : 'SETTLED' }
      }
    ];

    setExecutionLog(initialSteps);

    // Step-by-step sequential animation
    for (let i = 0; i < initialSteps.length; i++) {
      // Update step to running
      setExecutionLog(prev => prev.map((step, idx) => 
        idx === i ? { ...step, status: 'running' } : step
      ));

      await new Promise(r => setTimeout(r, 260));

      // Mark current step as completed or warning/error
      setExecutionLog(prev => prev.map((step, idx) => {
        if (idx !== i) return step;
        
        let status: 'success' | 'warning' | 'error' = 'success';
        if (i === 1 && failureMode === 'double_submit') {
          status = 'warning';
        } else if (i === 3 && failureMode === 'gateway_timeout') {
          status = 'warning';
        } else if (i === 4 && failureMode === 'tampered_webhook') {
          status = 'error';
        } else if (i === 5 && failureMode === 'tampered_webhook') {
          status = 'error';
        }
        return { ...step, status };
      }));

      // If double submit simulation, we shortcut after idempotency
      if (failureMode === 'double_submit' && i === 1) {
        setExecutionLog(prev => prev.map((step, idx) => {
          if (idx === 1) {
            return {
              ...step,
              status: 'warning',
              detail: 'RACE CONDITION DETECTED: Duplicate idempotency key in cache. Returned cached response. 0 duplicate charge.',
              meta: { Action: 'Cache Replay', 'Double Charge Blocked': 'True' }
            };
          }
          if (idx > 1) {
            return {
              ...step,
              status: 'success',
              detail: 'Skipped - response served safely from atomic replay cache.'
            };
          }
          return step;
        }));
        break;
      }

      // If tampered webhook, stop at webhook
      if (failureMode === 'tampered_webhook' && i === 4) {
        setExecutionLog(prev => prev.map((step, idx) => {
          if (idx === 5) {
            return {
              ...step,
              status: 'error',
              detail: 'TRANSACTION REJECTED: State transition halted due to unverified cryptographic signature.'
            };
          }
          return step;
        }));
        break;
      }
    }

    setIsProcessing(false);
    setStats(prev => ({
      ...prev,
      simulatedCount: prev.simulatedCount + 1,
      cascadesResolved: failureMode === 'gateway_timeout' ? prev.cascadesResolved + 1 : prev.cascadesResolved,
      idempDoubleChargesBlocked: failureMode === 'double_submit' ? prev.idempDoubleChargesBlocked + 1 : prev.idempDoubleChargesBlocked
    }));
  };

  const handleReset = () => {
    setHasRun(false);
    setIsProcessing(false);
    setExecutionLog([]);
    setFailureMode('none');
  };

  const { primary, fallback } = getPrimaryPsp(currency, method);

  return (
    <div id="orchestration-engine" className="relative rounded-2xl border border-[#1e2533] bg-[#0c0f16]/95 backdrop-blur-xl p-6 lg:p-8 shadow-2xl overflow-hidden">
      {/* Subtle top indicator bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1e2533]">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
                Interactive Proof-of-Work
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                v3.2 Production Simulation
              </span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
              Multi-PSP Payment Orchestration Engine & Live Inspector
            </h3>
          </div>
        </div>

        {/* Live System Metrics */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <div className="hidden sm:flex items-center gap-1.5 bg-[#141923] px-3 py-1.5 rounded-lg border border-[#222a3a]">
            <Server className="w-3.5 h-3.5 text-blue-400" />
            <span>Router p99:</span>
            <span className="text-white font-semibold">{stats.avgRouterLatency}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#141923] px-3 py-1.5 rounded-lg border border-[#222a3a]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Double-Charges Blocked:</span>
            <span className="text-emerald-300 font-semibold">{stats.idempDoubleChargesBlocked}</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 bg-[#141923] px-3 py-1.5 rounded-lg border border-[#222a3a]">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Cascades Resolved:</span>
            <span className="text-amber-300 font-semibold">{stats.cascadesResolved}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Column: Transaction Builder & Chaos Controller */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6 bg-[#090b10] p-5 rounded-xl border border-[#1b2230]">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase">
                1. Configure Ingress Request
              </span>
              <span className="text-[11px] font-mono text-slate-400">Payload: POST /v1/charges</span>
            </div>

            {/* Currency Selector */}
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-2">Currency & Region</label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['USD', 'EUR', 'GBP', 'BDT', 'JPY', 'USDT'] as Currency[]).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-3 py-2 text-xs font-mono rounded-lg border transition-all ${
                      currency === curr
                        ? 'bg-blue-600/20 border-blue-500/50 text-blue-300 font-bold'
                        : 'bg-[#121620] border-[#1e2533] text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    {curr} ({currencySymbols[curr]})
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Selector */}
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-2">Transaction Amount</label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5 text-xs font-mono text-slate-400">
                    {currencySymbols[currency]}
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-[#121620] border border-[#1e2533] rounded-lg py-2 pl-7 pr-3 text-sm font-mono text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-1">
                  {[50, 250, 1000].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setAmount(preset)}
                      className="px-2 py-2 text-[11px] font-mono bg-[#141923] border border-[#1e2533] rounded-lg text-slate-400 hover:text-white"
                    >
                      +{preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-2">Payment Channel / Rail</label>
              <div className="space-y-1.5">
                {[
                  { id: 'card', name: 'Credit / Debit Card', detail: 'Visa, Mastercard 3D-Secure 2.2' },
                  { id: 'applepay', name: 'Digital Wallet', detail: 'Apple Pay / Google Pay Tokenized' },
                  { id: 'sepa', name: 'SEPA Direct Debit', detail: 'Eurozone Instant ACH Rail' },
                  { id: 'bkash', name: 'bKash / Nagad Local APM', detail: 'South Asian MFS Direct Callback' },
                  { id: 'crypto', name: 'USDT / Stablecoin Rail', detail: 'Instant Web3 On-Chain Settlement' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setMethod(item.id as PaymentMethod)}
                    className={`w-full text-left px-3 py-2 rounded-lg border transition-all flex items-center justify-between ${
                      method === item.id
                        ? 'bg-blue-600/15 border-blue-500/40 text-white'
                        : 'bg-[#121620] border-[#1e2533] text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-200">{item.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{item.detail}</div>
                    </div>
                    {method === item.id && <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Chaos & Fault Injection Switcher */}
            <div className="pt-2 border-t border-[#1b2230]">
              <div className="flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <label className="text-xs font-mono font-semibold tracking-wider text-amber-300 uppercase">
                  Fault Injection & Stress Test
                </label>
              </div>
              <div className="space-y-1.5">
                {[
                  {
                    id: 'none',
                    label: 'Nominal Optimal Flow',
                    desc: 'Optimal route, 200 OK fast path'
                  },
                  {
                    id: 'gateway_timeout',
                    label: '⚡ Primary PSP 504 Timeout',
                    desc: `Simulate ${primary} outage -> Cascade to ${fallback} in 14ms`
                  },
                  {
                    id: 'double_submit',
                    label: '🔒 Duplicate Request Attack',
                    desc: 'Race condition test -> Mutex lock returns cached response'
                  },
                  {
                    id: 'tampered_webhook',
                    label: '🛡️ HMAC Signature Tampering',
                    desc: 'Forged webhook payload -> Constant-time verification drops it'
                  }
                ].map((mode) => (
                  <label
                    key={mode.id}
                    className={`flex items-start gap-2.5 p-2 rounded-lg border cursor-pointer transition-all ${
                      failureMode === mode.id
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                        : 'bg-[#121620] border-[#1e2533] text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="failureMode"
                      value={mode.id}
                      checked={failureMode === mode.id}
                      onChange={() => setFailureMode(mode.id as FailureMode)}
                      className="mt-0.5 text-amber-500 focus:ring-0 bg-[#0c0f16]"
                    />
                    <div>
                      <div className="text-xs font-semibold">{mode.label}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{mode.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="pt-4 border-t border-[#1b2230] space-y-2">
            <button
              onClick={handleSimulate}
              disabled={isProcessing}
              className={`w-full py-3 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                isProcessing
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 active:scale-[0.98]'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                  Executing Pipeline Trace...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-black" />
                  Dispatch Payment Orchestration
                </>
              )}
            </button>

            {hasRun && (
              <button
                onClick={handleReset}
                className="w-full py-2 px-3 rounded-lg font-mono text-[11px] text-slate-400 hover:text-white bg-[#141923] border border-[#1e2533] flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Pipeline State
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Visual Telemetry Inspector & Trace Console */}
        <div className="lg:col-span-8 flex flex-col bg-[#090b10] rounded-xl border border-[#1b2230] overflow-hidden">
          {/* Tab Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0e121a] border-b border-[#1b2230]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('trace')}
                className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeTab === 'trace'
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                Live Pipeline Trace
              </button>
              <button
                onClick={() => setActiveTab('payload')}
                className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeTab === 'payload'
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                HTTP & Webhook Telemetry
              </button>
              <button
                onClick={() => setActiveTab('architecture')}
                className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeTab === 'architecture'
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Production Laravel Architecture
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Idemp Key: {simulatedIdempKey.slice(0, 14)}...</span>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-5 flex-1 overflow-y-auto min-h-[480px]">
            {activeTab === 'trace' && (
              <div className="space-y-4">
                {!hasRun && (
                  <div className="flex flex-col items-center justify-center text-center py-16 px-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-3">
                      <Server className="w-6 h-6 text-blue-400" />
                    </div>
                    <h4 className="text-white font-medium text-sm">Pipeline Ready for Ingress</h4>
                    <p className="text-xs text-slate-400 max-w-md mt-1 mb-4">
                      Select transaction parameters on the left (or toggle a Chaos scenario like Primary PSP 504 Outage) and click "Dispatch Payment Orchestration" to view the live execution trace.
                    </p>
                    <button
                      onClick={handleSimulate}
                      className="px-4 py-2 rounded-lg bg-emerald-500 text-black font-mono text-xs font-bold flex items-center gap-2"
                    >
                      <Play className="w-3 h-3 fill-black" />
                      Run Nominal Simulation ($250 USD)
                    </button>
                  </div>
                )}

                {hasRun && (
                  <div className="space-y-3">
                    {executionLog.map((step, idx) => {
                      const isPending = step.status === 'pending';
                      const isRunning = step.status === 'running';
                      const isSuccess = step.status === 'success';
                      const isWarning = step.status === 'warning';
                      const isError = step.status === 'error';

                      return (
                        <div
                          key={step.id}
                          className={`relative rounded-xl border p-4 transition-all duration-300 ${
                            isRunning
                              ? 'bg-blue-950/20 border-blue-500/60 shadow-lg shadow-blue-500/10'
                              : isSuccess
                              ? 'bg-[#10141e] border-emerald-500/30'
                              : isWarning
                              ? 'bg-amber-950/20 border-amber-500/40'
                              : isError
                              ? 'bg-rose-950/20 border-rose-500/40'
                              : 'bg-[#0f121a]/50 border-[#1a202c] opacity-40'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5">
                                {isRunning && (
                                  <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                                )}
                                {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                                {isWarning && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                                {isError && <ShieldAlert className="w-4 h-4 text-rose-400" />}
                                {isPending && <div className="w-4 h-4 rounded-full border border-slate-600"></div>}
                              </div>

                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-mono font-semibold text-slate-100">
                                    {idx + 1}. {step.name}
                                  </span>
                                  {step.latencyMs > 0 && !isPending && (
                                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                                      {step.latencyMs}ms
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                                  {step.detail}
                                </p>
                              </div>
                            </div>

                            {/* Meta Tags */}
                            {step.meta && (
                              <div className="hidden sm:flex flex-wrap gap-1.5 justify-end max-w-xs">
                                {Object.entries(step.meta).map(([k, v]) => (
                                  <span
                                    key={k}
                                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161c28] border border-[#232c3d] text-slate-300"
                                  >
                                    <strong className="text-slate-400">{k}:</strong> {v}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'payload' && (
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                    <span>1. Ingress Request (POST /v1/orchestration/charges)</span>
                    <span className="text-emerald-400">Header: Idempotency-Key: {simulatedIdempKey}</span>
                  </div>
                  <pre className="p-3 bg-[#06080b] rounded-lg border border-[#1b2230] text-emerald-400 overflow-x-auto">
{JSON.stringify({
  amount: amount * 100, // atomic cents
  currency: currency,
  payment_method: method,
  country_code: currency === 'BDT' ? 'BD' : currency === 'EUR' ? 'DE' : 'US',
  metadata: {
    customer_id: "cus_9941a87b",
    merchant_tier: "enterprise",
    routing_policy: "cost_and_latency_optimized"
  },
  idempotency_key: simulatedIdempKey
}, null, 2)}
                  </pre>
                </div>

                <div>
                  <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                    <span>2. Gateway Response & Cascade Route</span>
                    <span className="text-blue-400">Active Acquirer: {primary}</span>
                  </div>
                  <pre className="p-3 bg-[#06080b] rounded-lg border border-[#1b2230] text-blue-300 overflow-x-auto">
{JSON.stringify({
  status: failureMode === 'gateway_timeout' ? "CASCADED_SUCCESS" : "AUTHORIZED",
  gateway_reference: "ch_live_3Mpd09Kj2L90",
  acquirer_route: {
    attempted: primary,
    primary_status_code: failureMode === 'gateway_timeout' ? 504 : 200,
    cascaded_to: failureMode === 'gateway_timeout' ? fallback : null,
    failover_latency_ms: failureMode === 'gateway_timeout' ? 14 : 0
  },
  fee_collected_bps: 140,
  net_settlement: amount * 0.986
}, null, 2)}
                  </pre>
                </div>

                <div>
                  <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                    <span>3. Inbound Signed Webhook Event</span>
                    <span className="text-purple-400">X-Paymid-Signature: sha256=9f8c14...</span>
                  </div>
                  <pre className="p-3 bg-[#06080b] rounded-lg border border-[#1b2230] text-purple-300 overflow-x-auto">
{JSON.stringify({
  event_id: "evt_live_891bc23a",
  type: "payment_intent.succeeded",
  timestamp: Math.floor(Date.now() / 1000),
  signature_verified: failureMode !== 'tampered_webhook',
  data: {
    id: "tx_99812480",
    state: failureMode === 'tampered_webhook' ? "FLAGGED_FOR_FRAUD" : "SETTLED",
    currency: currency,
    amount: amount
  }
}, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="p-3 bg-[#0d1117] rounded-lg border border-blue-500/20 text-slate-300 text-[11px] leading-relaxed">
                  <span className="text-blue-400 font-bold">Architecture Insight:</span> Farhan implements an extensible <strong>Strategy & Circuit Breaker Pattern</strong> in Laravel 11. Upstream gateways are abstracted behind a unified interface with atomic Redis distributed locking to prevent duplicate authorization requests.
                </div>

                <div>
                  <div className="text-slate-400 text-[11px] mb-1">App\Services\Payments\PaymentOrchestrationEngine.php</div>
                  <pre className="p-4 bg-[#06080b] rounded-lg border border-[#1b2230] text-slate-300 overflow-x-auto text-[11px] leading-relaxed">
{`namespace App\\Services\\Payments;

use App\\Contracts\\PaymentGatewayInterface;
use App\\Exceptions\\AllGatewaysExhaustedException;
use Illuminate\\Support\\Facades\\Cache;
use Illuminate\\Support\\Facades\\DB;
use Illuminate\\Support\\Facades\\Log;

final class PaymentOrchestrationEngine
{
    public function __construct(
        private readonly SmartRoutingResolver $router,
        private readonly CircuitBreaker $circuitBreaker,
        private readonly WebhookSigner $signer
    ) {}

    public function process(PaymentRequest $request): OrchestratedResult
    {
        $idempKey = $request->header('Idempotency-Key');
        $lock = Cache::lock("idemp:lock:{$idempKey}", 15);

        // 1. Race condition defense
        if (!$lock->get()) {
            throw new ConcurrentTransactionException("Concurrent request in flight.");
        }

        try {
            // Check atomic replay cache
            if ($cached = Transaction::findByCachedKey($idempKey)) {
                return $cached->toOrchestratedResult();
            }

            // 2. Resolve dynamic cascade order
            $gatewayChain = $this->router->resolvePriorityChain($request);

            foreach ($gatewayChain as $gateway) {
                if ($this->circuitBreaker->isOpen($gateway->identifier())) {
                    continue; // Skip degraded PSPs
                }

                try {
                    $result = $gateway->authorize($request);
                    if ($result->isSuccess()) {
                        return $this->commitToLedger($result, $idempKey);
                    }
                } catch (GatewayTimeoutException $e) {
                    $this->circuitBreaker->recordFailure($gateway->identifier());
                    Log::warning("PSP [{$gateway->identifier()}] timed out. Cascading to fallback.");
                }
            }

            throw new AllGatewaysExhaustedException("All upstream PSP routes degraded.");
        } finally {
            $lock->release();
        }
    }
}`}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-4 py-2.5 bg-[#0e121a] border-t border-[#1b2230] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Zero-double-charge guarantee</span>
              <span className="text-slate-600">|</span>
              <span>Sub-20ms Cascade Rerouting</span>
            </div>
            <div className="text-slate-400">
              Pattern: <span className="text-slate-300">Strategy + Redis Mutex + Double-Entry Ledger</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
