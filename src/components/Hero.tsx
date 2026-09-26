import React from 'react';
import { ArrowDown, ArrowUpRight, Activity } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#1b2230] overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/10 via-blue-500/5 to-transparent blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Telemetry pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111622] border border-[#212b3e] text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot"></span>
              <span className="text-slate-300">Software Engineer (SDE-1) @</span>
              <span className="text-emerald-400 font-semibold">Paymid</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">Limassol, Cyprus</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Engineering Scalable <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">
                FinTech & Payment
              </span>{' '}
              Infrastructure.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              I’m <strong className="text-white">Farhan Zaman Khan</strong>, a backend engineer with 7+ years of experience architecting fault-tolerant payment rails, multi-PSP routing engines, and high-concurrency transactional systems.
            </p>

            {/* Core Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {PORTFOLIO_DATA.stats.map((stat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#0e121a] border border-[#1d2536]">
                  <div className="text-lg sm:text-xl font-bold font-mono text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-300 font-medium mt-0.5">{stat.label}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{stat.detail}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#orchestration-engine"
                className="px-5 py-3 rounded-xl font-mono text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]"
              >
                <span>Launch Orchestration Sandbox</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onOpenContact}
                className="px-5 py-3 rounded-xl font-mono text-xs font-medium text-slate-300 hover:text-white bg-[#121622] hover:bg-[#181f2e] border border-[#212b3e] transition-colors flex items-center gap-2"
              >
                <span>Initiate Technical Handshake</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Code & Architecture Terminal */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-[#1f283a] bg-[#07090d] shadow-2xl overflow-hidden font-mono text-xs">
              {/* Terminal Title Bar */}
              <div className="px-4 py-3 bg-[#0d1117] border-b border-[#1b2230] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="text-[11px] text-slate-400 ml-2">PaymentChannelRouter.php</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <Activity className="w-3 h-3" />
                  <span>PHP 8.3 / Strict Types</span>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="p-4 text-slate-300 leading-relaxed overflow-x-auto text-[11px] space-y-1">
                <div className="text-slate-400">// Smart Multi-Gateway Acquirer Routing & Failover</div>
                <div><span className="text-purple-400">declare</span>(strict_types=<span className="text-amber-400">1</span>);</div>
                <div className="h-2"></div>
                <div><span className="text-blue-400">final class</span> <span className="text-yellow-300">PaymentChannelRouter</span></div>
                <div>{'{'}</div>
                <div className="pl-4">
                  <span className="text-blue-400">public function</span> <span className="text-emerald-400">route</span>(<span className="text-yellow-300">Transaction</span> $tx): <span className="text-yellow-300">AcquirerRoute</span>
                </div>
                <div className="pl-4">{'{'}</div>
                <div className="pl-8 text-slate-400">// 1. Enforce atomic idempotency lock</div>
                <div className="pl-8">
                  $this-&gt;guard-&gt;<span className="text-emerald-400">acquireMutex</span>($tx-&gt;idempotencyKey);
                </div>
                <div className="h-1"></div>
                <div className="pl-8 text-slate-400">// 2. Dynamic fee & latency solver across 200+ PSPs</div>
                <div className="pl-8">
                  $optimalAcquirer = $this-&gt;optimizer-&gt;<span className="text-emerald-400">resolveAcquirer</span>(
                </div>
                <div className="pl-12">currency: $tx-&gt;currency,</div>
                <div className="pl-12">country: $tx-&gt;country,</div>
                <div className="pl-12">binCategory: $tx-&gt;bin</div>
                <div className="pl-8">);</div>
                <div className="h-1"></div>
                <div className="pl-8 text-slate-400">// 3. Dispatch with zero-downtime cascade failover</div>
                <div className="pl-8">
                  <span className="text-purple-400">return</span> $this-&gt;circuitBreaker-&gt;<span className="text-emerald-400">executeWithFallback</span>(
                </div>
                <div className="pl-12">primary: $optimalAcquirer,</div>
                <div className="pl-12">fallback: <span className="text-yellow-300">CheckoutComGlobalFallback</span>::<span className="text-blue-400">class</span>,</div>
                <div className="pl-12">timeoutMs: <span className="text-amber-400">1200</span></div>
                <div className="pl-8">);</div>
                <div className="pl-4">{'}'}</div>
                <div>{'}'}</div>
              </div>

              {/* Terminal Footer */}
              <div className="px-4 py-2.5 bg-[#0a0d13] border-t border-[#181f2c] flex items-center justify-between text-[10px] text-slate-400">
                <span className="text-emerald-400">● Redis Mutex Active</span>
                <span>Idempotency TTL: 120s</span>
                <span>Throughput: ~12,000 req/min</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
