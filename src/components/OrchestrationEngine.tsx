import React, { useState } from 'react';
import { 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  ShieldCheck, 
  ShieldAlert, 
  Server, 
  CreditCard,
  Smartphone,
  Wallet,
  Coins
} from 'lucide-react';

type PaymentRail = 'card' | 'applepay' | 'sepa' | 'bkash' | 'crypto';
type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'BDT';

interface TraceStep {
  name: string;
  badge: string;
  detail: string;
  status: 'idle' | 'running' | 'success' | 'failover' | 'blocked';
  latency: number;
}

export const OrchestrationEngine: React.FC = () => {
  const [rail, setRail] = useState<PaymentRail>('card');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [simulateOutage, setSimulateOutage] = useState(false);
  const [simulateDuplicate, setSimulateDuplicate] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'telemetry' | 'laravel'>('pipeline');
  
  const [traceLogs, setTraceLogs] = useState<TraceStep[]>([]);
  const [idempotencyKey, setIdempotencyKey] = useState('idemp_live_9a4f2e08bc');
  const [metrics, setMetrics] = useState({
    avgRouterLatency: '16ms',
    uptime: '99.99%',
    failoversHandled: 124,
    doubleChargesBlocked: 42
  });

  const currencyMap = {
    USD: { symbol: '$', amount: 150, fee: '1.4% + $0.20' },
    EUR: { symbol: '€', amount: 135, fee: '1.1% + €0.15' },
    GBP: { symbol: '£', amount: 120, fee: '1.2% + £0.18' },
    BDT: { symbol: '৳', amount: 18000, fee: '1.25% flat' },
  };

  const getPspPair = () => {
    if (rail === 'bkash') return { primary: 'bKash Direct Merchant Rail', fallback: 'Nagad Corporate Gateway' };
    if (rail === 'crypto') return { primary: 'Binance Pay Settlement Rail', fallback: 'Coinbase Commerce Fallback' };
    if (currency === 'EUR' || rail === 'sepa') return { primary: 'Adyen EU Acquirer', fallback: 'Stripe SEPA Gateway' };
    if (currency === 'GBP') return { primary: 'Checkout.com UK Faster Payments', fallback: 'Barclays Acquirer' };
    return { primary: 'Stripe Direct Acquirer', fallback: 'Adyen Global Fallback' };
  };

  const { primary, fallback } = getPspPair();

  const handleExecute = async () => {
    setIsProcessing(true);

    const generatedIdemp = simulateDuplicate 
      ? 'idemp_live_REPLAY_MUTEX_LOCKED' 
      : `idemp_live_${Math.random().toString(36).substring(2, 10)}`;
    setIdempotencyKey(generatedIdemp);

    const steps: TraceStep[] = [
      {
        name: 'Ingress & Schema Validation',
        badge: 'TLS 1.3',
        detail: 'Request sanitized against OpenAPI 3.1 schema. Zero unvalidated fields passed.',
        status: 'idle',
        latency: 2
      },
      {
        name: 'Distributed Idempotency Mutex',
        badge: 'Redis 7.2',
        detail: simulateDuplicate 
          ? 'RACE CONDITION CAUGHT: Replay key detected in Redis cluster. Mutation locked, returning cached payload. Zero double-charges.'
          : `Atomic lock acquired for ${generatedIdemp}. Prevents concurrent double-billing.`,
        status: 'idle',
        latency: 4
      },
      {
        name: 'Dynamic Route & Fee Optimizer',
        badge: 'Smart Engine',
        detail: `Evaluated 200+ gateways. Primary assigned: [${primary}] (lowest interchange & lowest p99 latency).`,
        status: 'idle',
        latency: 10
      },
      {
        name: simulateOutage ? 'Primary PSP Outage & Cascade Failover' : 'Gateway Dispatch & Settlement',
        badge: simulateOutage ? 'Circuit Breaker' : 'Acquirer',
        detail: simulateOutage
          ? `[504 TIMEOUT] ${primary} dropped connection -> Circuit breaker hot-swapped to [${fallback}] in 12ms. Customer transaction saved.`
          : `Dispatched payload to ${primary}. 200 OK authorization received.`,
        status: 'idle',
        latency: simulateOutage ? 28 : 18
      },
      {
        name: 'HMAC Webhook Ingestion & Atomic Ledger',
        badge: 'HMAC-SHA256',
        detail: 'Constant-time cryptographic signature verified. Double-entry ledger state transitioned to SETTLED.',
        status: 'idle',
        latency: 5
      }
    ];

    setTraceLogs(steps);

    for (let i = 0; i < steps.length; i++) {
      setTraceLogs(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'running' } : s));
      
      await new Promise(r => setTimeout(r, 280));

      setTraceLogs(prev => prev.map((s, idx) => {
        if (idx !== i) return s;
        if (i === 1 && simulateDuplicate) return { ...s, status: 'blocked' };
        if (i === 3 && simulateOutage) return { ...s, status: 'failover' };
        return { ...s, status: 'success' };
      }));

      // If duplicate test, shortcut after idempotency lock
      if (simulateDuplicate && i === 1) {
        setTraceLogs(prev => prev.map((s, idx) => idx > 1 ? { ...s, status: 'success', detail: 'Skipped - safely replayed from atomic cache.' } : s));
        break;
      }
    }

    setIsProcessing(false);
    setMetrics(prev => ({
      ...prev,
      failoversHandled: simulateOutage ? prev.failoversHandled + 1 : prev.failoversHandled,
      doubleChargesBlocked: simulateDuplicate ? prev.doubleChargesBlocked + 1 : prev.doubleChargesBlocked
    }));
  };

  const handleReset = () => {
    setIsProcessing(false);
    setTraceLogs([]);
    setSimulateOutage(false);
    setSimulateDuplicate(false);
  };

  return (
    <div id="orchestration-engine" className="rounded-3xl border border-white/10 bg-[#0d121c] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      
      {/* Top Bar Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot"></span>
            <span>Live Interactive Proof-of-Work</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Multi-PSP Orchestration Sandbox & Architecture Trace
          </h3>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Test the live transaction pipeline below. Toggle a gateway timeout or race-condition attack to see real-time circuit breaking and idempotency in action.
          </p>
        </div>

        {/* Live Metrics Header */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-[#141a27] border border-white/5 text-xs font-mono">
            <div className="text-slate-400 text-[10px]">Router Latency</div>
            <div className="text-white font-bold text-sm">{metrics.avgRouterLatency}</div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-[#141a27] border border-white/5 text-xs font-mono">
            <div className="text-slate-400 text-[10px]">Failovers Saved</div>
            <div className="text-emerald-400 font-bold text-sm">{metrics.failoversHandled}</div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-[#141a27] border border-white/5 text-xs font-mono">
            <div className="text-slate-400 text-[10px]">Double-Charges Defended</div>
            <div className="text-blue-400 font-bold text-sm">{metrics.doubleChargesBlocked}</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Tactile Checkout on Left, Architecture X-Ray on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
        
        {/* Left Column: Tactile Checkout Card */}
        <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#080b12] p-6 sm:p-7 shadow-xl space-y-6">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Simulated Checkout</div>
              <div className="text-base font-bold text-white">Payment Architecture Retainer</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold font-mono text-emerald-400">
                {currencyMap[currency].symbol}{currencyMap[currency].amount}
              </div>
              <div className="text-[10px] font-mono text-slate-400">{currency} Settlement</div>
            </div>
          </div>

          {/* Currency Pill Switcher */}
          <div>
            <label className="text-xs font-medium text-slate-400 block mb-2 font-mono">1. Select Currency</label>
            <div className="grid grid-cols-4 gap-2">
              {(['USD', 'EUR', 'GBP', 'BDT'] as CurrencyCode[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all ${
                    currency === c
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-[#121622] text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="text-xs font-medium text-slate-400 block mb-2 font-mono">2. Select Payment Rail</label>
            <div className="space-y-2">
              {[
                { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, detail: 'Visa, Mastercard 3DS 2.2' },
                { id: 'applepay', name: 'Apple Pay / Google Pay', icon: Smartphone, detail: 'Biometric Device Tokenization' },
                { id: 'sepa', name: 'SEPA Direct Debit', icon: Wallet, detail: 'Instant Eurozone Clearing' },
                { id: 'bkash', name: 'bKash / Nagad MFS', icon: Zap, detail: 'Direct South Asian Mobile Rails' },
                { id: 'crypto', name: 'USDT / Stablecoin', icon: Coins, detail: 'TRON / Polygon Zero-Slippage' },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = rail === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setRail(m.id as PaymentRail)}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all text-left ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-900/30 to-[#121929] border-blue-500/60 text-white'
                        : 'bg-[#10141e] border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-600/30 text-blue-300' : 'bg-[#161d2b] text-slate-400'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">{m.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{m.detail}</div>
                      </div>
                    </div>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-blue-400 shadow-sm shadow-blue-400"></div>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fault & Chaos Toggles */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="text-xs font-mono font-semibold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Chaos Engineering Triggers</span>
            </div>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#121622] border border-white/5 cursor-pointer hover:border-white/10">
              <div>
                <div className="text-xs font-semibold text-slate-200">Simulate Primary PSP 504 Timeout</div>
                <div className="text-[10px] text-slate-400 font-mono">{primary} fails → Hot-swaps to {fallback} in 12ms</div>
              </div>
              <input
                type="checkbox"
                checked={simulateOutage}
                onChange={(e) => {
                  setSimulateOutage(e.target.checked);
                  if (e.target.checked) setSimulateDuplicate(false);
                }}
                className="w-4 h-4 rounded text-amber-500 focus:ring-0 bg-[#080b12] border-slate-700"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#121622] border border-white/5 cursor-pointer hover:border-white/10">
              <div>
                <div className="text-xs font-semibold text-slate-200">Simulate Race-Condition Attack</div>
                <div className="text-[10px] text-slate-400 font-mono">Replays duplicate mutation → Idempotency key locks it</div>
              </div>
              <input
                type="checkbox"
                checked={simulateDuplicate}
                onChange={(e) => {
                  setSimulateDuplicate(e.target.checked);
                  if (e.target.checked) setSimulateOutage(false);
                }}
                className="w-4 h-4 rounded text-blue-500 focus:ring-0 bg-[#080b12] border-slate-700"
              />
            </label>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleExecute}
              disabled={isProcessing}
              className={`w-full py-3.5 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                isProcessing
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/25 active:scale-[0.98]'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                  Orchestrating In Flight...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-black" />
                  Dispatch Payment Ingress ({currencyMap[currency].symbol}{currencyMap[currency].amount})
                </>
              )}
            </button>

            {traceLogs.length > 0 && (
              <button
                onClick={handleReset}
                className="w-full mt-2 py-2 text-[11px] font-mono text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Pipeline
              </button>
            )}
          </div>

        </div>

        {/* Right Column: Architecture X-Ray & Live Telemetry */}
        <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#080b12] overflow-hidden flex flex-col shadow-xl">
          
          {/* Inspector Tab Switcher */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#0e131d] border-b border-white/10">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('pipeline')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === 'pipeline'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Live Execution Trace
              </button>
              <button
                onClick={() => setActiveTab('telemetry')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === 'telemetry'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                HTTP & Webhook JSON
              </button>
              <button
                onClick={() => setActiveTab('laravel')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === 'laravel'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Laravel Engine Code
              </button>
            </div>

            <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
              Route: <span className="text-emerald-400 font-semibold">{primary}</span>
            </div>
          </div>

          {/* Trace Content */}
          <div className="p-6 flex-1 min-h-[440px]">
            {activeTab === 'pipeline' && (
              <div className="space-y-3.5">
                {traceLogs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center py-20 px-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                      <Server className="w-7 h-7 text-emerald-400" />
                    </div>
                    <h4 className="text-white font-bold text-base">Pipeline Ready for Ingress</h4>
                    <p className="text-xs text-slate-400 max-w-md mt-1 mb-6 leading-relaxed">
                      Click the green <strong>"Dispatch Payment Ingress"</strong> button on the left to watch the real-time execution trace, Redis distributed lock, and gateway failover cascade.
                    </p>
                    <button
                      onClick={handleExecute}
                      className="px-4 py-2.5 rounded-xl bg-emerald-500 text-black font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      <Zap className="w-3.5 h-3.5 fill-black" />
                      Run Nominal Test ($150 USD)
                    </button>
                  </div>
                ) : (
                  traceLogs.map((step, idx) => {
                    const isRunning = step.status === 'running';
                    const isSuccess = step.status === 'success';
                    const isFailover = step.status === 'failover';
                    const isBlocked = step.status === 'blocked';
                    const isIdle = step.status === 'idle';

                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                          isRunning
                            ? 'bg-blue-950/30 border-blue-500/70 shadow-lg shadow-blue-500/10'
                            : isFailover
                            ? 'bg-amber-950/30 border-amber-500/60'
                            : isBlocked
                            ? 'bg-purple-950/30 border-purple-500/60'
                            : isSuccess
                            ? 'bg-[#0f1420] border-emerald-500/30'
                            : 'bg-[#0b0e17]/50 border-white/5 opacity-40'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {isRunning && <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />}
                              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                              {isFailover && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                              {isBlocked && <ShieldAlert className="w-4 h-4 text-purple-400" />}
                              {isIdle && <div className="w-4 h-4 rounded-full border border-slate-700" />}
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-bold text-white">
                                  {idx + 1}. {step.name}
                                </span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                                  {step.badge}
                                </span>
                              </div>
                              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                                {step.detail}
                              </p>
                            </div>
                          </div>

                          {!isIdle && (
                            <span className="text-[10px] font-mono text-slate-400 shrink-0">
                              +{step.latency}ms
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {activeTab === 'telemetry' && (
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                    <span>1. Inbound Request (POST /v1/orchestration/charges)</span>
                    <span className="text-emerald-400">Idempotency-Key: {idempotencyKey}</span>
                  </div>
                  <pre className="p-3 bg-[#05070c] rounded-xl border border-white/5 text-emerald-400 overflow-x-auto text-[11px]">
{JSON.stringify({
  amount: currencyMap[currency].amount * 100,
  currency: currency,
  payment_method: rail,
  settlement_policy: "dynamic_cost_minimization",
  idempotency_key: idempotencyKey,
  metadata: {
    client: "farhan-portfolio-sandbox",
    routing_mode: simulateOutage ? "automatic_failover_enabled" : "nominal"
  }
}, null, 2)}
                  </pre>
                </div>

                <div>
                  <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                    <span>2. Gateway Dispatch & Response</span>
                    <span className="text-blue-400">Acquirer: {simulateOutage ? fallback : primary}</span>
                  </div>
                  <pre className="p-3 bg-[#05070c] rounded-xl border border-white/5 text-blue-300 overflow-x-auto text-[11px]">
{JSON.stringify({
  status: simulateOutage ? "SUCCESS_VIA_CASCADE_FAILOVER" : "AUTHORIZED",
  transaction_reference: "tx_live_891ad04bc",
  cascade_details: {
    primary_acquirer: primary,
    primary_status: simulateOutage ? 504 : 200,
    fallback_acquirer: simulateOutage ? fallback : null,
    reroute_duration_ms: simulateOutage ? 12 : 0
  },
  net_amount: currencyMap[currency].amount,
  settlement_state: "SETTLED"
}, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'laravel' && (
              <div className="space-y-3 font-mono text-xs">
                <div className="text-[11px] text-slate-400">
                  App\Services\Payments\PaymentOrchestrator.php
                </div>
                <pre className="p-4 bg-[#05070c] rounded-xl border border-white/5 text-slate-300 overflow-x-auto text-[11px] leading-relaxed">
{`namespace App\\Services\\Payments;

use App\\Contracts\\PaymentGateway;
use App\\Exceptions\\DuplicateTransactionException;
use Illuminate\\Support\\Facades\\Cache;
use Illuminate\\Support\\Facades\\DB;

final class PaymentOrchestrator
{
    public function __construct(
        private readonly SmartRoutingResolver $router,
        private readonly CircuitBreaker $circuitBreaker
    ) {}

    public function process(PaymentRequest $req): TransactionResult
    {
        $idempKey = $req->header('Idempotency-Key');
        $mutex = Cache::lock("idemp:lock:{$idempKey}", 15);

        // 1. Race condition defense
        if (!$mutex->get()) {
            throw new DuplicateTransactionException("Request in flight.");
        }

        try {
            // Check atomic replay cache
            if ($cached = Transaction::findByReplayKey($idempKey)) {
                return $cached->toResult();
            }

            // 2. Cascade priority chain (e.g. Stripe -> Adyen in 12ms)
            foreach ($this->router->resolveChain($req) as $gateway) {
                if ($this->circuitBreaker->isOpen($gateway)) continue;

                try {
                    $result = $gateway->charge($req);
                    if ($result->isSuccessful()) {
                        return $this->commitLedger($result, $idempKey);
                    }
                } catch (GatewayTimeoutException $e) {
                    $this->circuitBreaker->recordFailure($gateway);
                }
            }

            throw new AllGatewaysDegradedException();
        } finally {
            $mutex->release();
        }
    }
}`}
                </pre>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 bg-[#0a0e16] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Strict Double-Entry Bookkeeping & Concurrency Guard Active</span>
            </span>
            <span className="text-slate-400">Zero Customer Dropouts</span>
          </div>

        </div>

      </div>

    </div>
  );
};
