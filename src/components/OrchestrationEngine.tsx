import React, { useState } from 'react';
import { 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Play
} from 'lucide-react';

interface RouteRule {
  id: string;
  method: string;
  icon: string;
  rule: string;
  primaryPsp: string;
  fallbackPsp: string;
  interchangeFee: string;
  status: 'optimal' | 'cascaded' | 'active';
  latency: number;
}

export const OrchestrationEngine: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'BDT'>('USD');
  const [amount, setAmount] = useState<number>(250);
  const [simulateOutage, setSimulateOutage] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [hasRun, setHasRun] = useState<boolean>(false);
  const [idempKey, setIdempKey] = useState<string>('idemp_live_89a0b12cd');
  const [executionResult, setExecutionResult] = useState<{
    status: string;
    resolvedAcquirer: string;
    totalLatencyMs: number;
    feeSavedBps: number;
    receiptId: string;
  } | null>(null);

  const [routes, setRoutes] = useState<RouteRule[]>([
    {
      id: 'cards-us',
      method: 'Cards (Visa / MC)',
      icon: '💳',
      rule: 'US Domestic 3DS 2.2',
      primaryPsp: 'Stripe Direct Acquirer',
      fallbackPsp: 'Adyen Global Fallback',
      interchangeFee: '1.35% + $0.15',
      status: 'optimal',
      latency: 18
    },
    {
      id: 'apple-pay',
      method: 'Apple Pay / Google Pay',
      icon: '',
      rule: 'Biometric Device Token',
      primaryPsp: 'Checkout.com Express',
      fallbackPsp: 'Stripe Mobile Acquirer',
      interchangeFee: '1.20% + $0.10',
      status: 'optimal',
      latency: 14
    },
    {
      id: 'sepa',
      method: 'SEPA Direct Debit',
      icon: '🏦',
      rule: 'Eurozone Instant ACH',
      primaryPsp: 'Adyen EU Clearing',
      fallbackPsp: 'Barclays BACS Gateway',
      interchangeFee: '0.80% flat',
      status: 'optimal',
      latency: 22
    },
    {
      id: 'bkash',
      method: 'bKash / Nagad MFS',
      icon: '⚡',
      rule: 'South Asian Local APM',
      primaryPsp: 'bKash Direct Merchant Rail',
      fallbackPsp: 'Nagad Corporate Gateway',
      interchangeFee: '1.25% flat',
      status: 'optimal',
      latency: 16
    }
  ]);

  const handleSimulate = async () => {
    setIsProcessing(true);
    setHasRun(true);

    const newKey = `idemp_live_${Math.random().toString(36).substring(2, 10)}`;
    setIdempKey(newKey);

    // Simulate 3-stage orchestration
    await new Promise(r => setTimeout(r, 450));

    if (simulateOutage) {
      setRoutes(prev => prev.map(r => 
        r.id === 'cards-us' 
          ? { ...r, status: 'cascaded', latency: 29 } 
          : r
      ));
      setExecutionResult({
        status: 'AUTHORIZED VIA CASCADE FAILOVER',
        resolvedAcquirer: 'Adyen Global Fallback (Stripe 504 Handled)',
        totalLatencyMs: 29,
        feeSavedBps: 25,
        receiptId: `rcpt_${Math.random().toString(36).substring(2, 9)}`
      });
    } else {
      setRoutes(prev => prev.map(r => ({ ...r, status: 'active', latency: 15 })));
      setExecutionResult({
        status: '200 OK • AUTHORIZED',
        resolvedAcquirer: 'Stripe Direct Acquirer (Optimal Route)',
        totalLatencyMs: 15,
        feeSavedBps: 30,
        receiptId: `rcpt_${Math.random().toString(36).substring(2, 9)}`
      });
    }

    setIsProcessing(false);
  };

  const handleReset = () => {
    setHasRun(false);
    setSimulateOutage(false);
    setExecutionResult(null);
    setRoutes(prev => prev.map(r => ({ ...r, status: 'optimal', latency: 18 })));
  };

  return (
    <div id="orchestration-engine" className="rounded-3xl bg-white text-slate-900 p-8 sm:p-12 shadow-2xl border border-slate-200">
      
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-[#d4f769] text-xs font-mono font-bold uppercase mb-3">
            <Zap className="w-3.5 h-3.5 fill-[#d4f769]" />
            <span>Interactive Engineering Proof-of-Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
            Smart Payment Routing & Failover Engine
          </h2>
          <p className="text-slate-600 text-base mt-2 max-w-2xl font-medium">
            Test how Farhan’s multi-PSP orchestration router evaluates incoming transactions, optimizes interchange fees, and auto-cascades around upstream gateway outages.
          </p>
        </div>

        {/* Global SLA Counters */}
        <div className="flex items-center gap-3 font-mono">
          <div className="px-5 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-left">
            <div className="text-[10px] uppercase font-bold text-slate-500">Router Latency</div>
            <div className="text-xl font-black text-slate-950">14ms</div>
          </div>
          <div className="px-5 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-left">
            <div className="text-[10px] uppercase font-bold text-slate-500">Cascade SLA</div>
            <div className="text-xl font-black text-emerald-600">99.99%</div>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Live Routing Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
        
        {/* Left Column: Transaction Simulator Controls */}
        <div className="lg:col-span-4 rounded-2xl bg-slate-50 border border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              1. Ingress Configuration
            </span>
            <span className="text-[11px] font-mono text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
              TLS 1.3 Active
            </span>
          </div>

          {/* Amount and Currency */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2 font-mono">
              Transaction Volume
            </label>
            <div className="flex items-center gap-2">
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value as any)}
                className="bg-white border border-slate-300 font-mono font-bold text-sm px-3 py-2.5 rounded-xl text-slate-900 focus:outline-none"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="BDT">BDT (৳)</option>
              </select>

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 font-mono font-bold text-sm px-4 py-2.5 rounded-xl text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Chaos Toggle: Simulate Gateway 504 */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-amber-900 uppercase flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Simulate Primary PSP Outage</span>
              </span>
              <input
                type="checkbox"
                checked={simulateOutage}
                onChange={(e) => setSimulateOutage(e.target.checked)}
                className="w-5 h-5 rounded text-amber-600 focus:ring-0 cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
              Simulates Stripe throwing <strong>HTTP 504 Gateway Timeout</strong>. Watch the router hot-swap to Adyen in 12ms without declining the user.
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleSimulate}
            disabled={isProcessing}
            className={`w-full py-4 px-6 rounded-2xl font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all active:scale-[0.98] ${
              isProcessing
                ? 'bg-slate-400 text-slate-200 cursor-not-allowed'
                : 'bg-[#d4f769] hover:bg-[#c6ee53] text-black shadow-emerald-500/10'
            }`}
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Evaluating Priority Cascade...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-black" />
                Dispatch & Route ({selectedCurrency} {amount})
              </>
            )}
          </button>

          {hasRun && (
            <button
              onClick={handleReset}
              className="w-full py-2 font-mono text-xs text-slate-500 hover:text-slate-900 flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Simulation
            </button>
          )}

          {/* Idempotency Key Tag */}
          <div className="pt-2 border-t border-slate-200 text-[10px] font-mono text-slate-500 flex items-center justify-between">
            <span>Idempotency Mutex:</span>
            <span className="text-slate-800 font-bold">{idempKey}</span>
          </div>
        </div>

        {/* Right Column: Real-Time Dynamic Routing Engine Table */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                2. Live Payment Routing Table & Cascade Health
              </span>
              <span className="text-xs font-mono text-slate-500">
                200+ Global Gateways Connected
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100/50 text-slate-500">
                    <th className="py-3 px-4">Method</th>
                    <th className="py-3 px-4">Routing Policy</th>
                    <th className="py-3 px-4">Active Acquirer</th>
                    <th className="py-3 px-4">Interchange</th>
                    <th className="py-3 px-4 text-right">Latency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {routes.map((r) => {
                    const isCascaded = r.status === 'cascaded';
                    return (
                      <tr 
                        key={r.id} 
                        className={`transition-colors ${isCascaded ? 'bg-amber-50' : 'hover:bg-slate-50'}`}
                      >
                        <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                          <span className="text-base">{r.icon}</span>
                          <span>{r.method}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-sans font-medium">{r.rule}</td>
                        <td className="py-3.5 px-4 font-bold">
                          {isCascaded ? (
                            <span className="text-amber-700 font-bold flex items-center gap-1">
                              <span>↳ {r.fallbackPsp}</span>
                              <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded">CASCADED</span>
                            </span>
                          ) : (
                            <span className="text-emerald-700 font-semibold">{r.primaryPsp}</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">{r.interchangeFee}</td>
                        <td className="py-3.5 px-4 text-right font-bold text-slate-800">{r.latency}ms</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Real-Time Settlement Output Banner */}
          {executionResult && (
            <div className={`p-5 border-t ${simulateOutage ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${simulateOutage ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'}`}>
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-slate-900">
                      {executionResult.status}
                    </div>
                    <div className="text-xs font-medium text-slate-600">
                      Route: {executionResult.resolvedAcquirer} • Receipt: <span className="font-mono text-slate-800">{executionResult.receiptId}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono text-xs">
                  <div className="font-bold text-slate-900">Settled in {executionResult.totalLatencyMs}ms</div>
                  <div className="text-emerald-700 font-bold">+{executionResult.feeSavedBps} bps Fee Optimized</div>
                </div>
              </div>
            </div>
          )}

          {!executionResult && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs font-mono text-slate-500 flex items-center justify-between">
              <span>Strategy: Dynamic Acquirer Cascade + Redis Lock</span>
              <span className="text-emerald-600 font-bold">Zero-Double-Charge Active</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
