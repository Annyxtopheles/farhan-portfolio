import React, { useState } from 'react';
import { ShieldAlert, Cpu, RefreshCw, Lock, Terminal, Check, Copy } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ArchitecturePillars: React.FC = () => {
  const [activePillarId, setActivePillarId] = useState<string>(PORTFOLIO_DATA.pillars[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activePillar = PORTFOLIO_DATA.pillars.find(p => p.id === activePillarId) || PORTFOLIO_DATA.pillars[0];

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'idempotency': return <Lock className="w-4 h-4 text-emerald-400" />;
      case 'failover-routing': return <RefreshCw className="w-4 h-4 text-blue-400" />;
      case 'webhook-integrity': return <ShieldAlert className="w-4 h-4 text-purple-400" />;
      case 'high-throughput-laravel': return <Cpu className="w-4 h-4 text-amber-400" />;
      default: return <Terminal className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <section id="architecture" className="py-20 border-b border-[#1b2230] bg-[#07090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Under The Hood</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Core Engineering Pillars & Rigor
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            How mission-critical FinTech systems guarantee zero-double-spend, sub-second failover, and cryptographic certainty.
          </p>
        </div>

        {/* Pillars Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Pillar Selectors */}
          <div className="lg:col-span-5 space-y-3">
            {PORTFOLIO_DATA.pillars.map((pillar) => {
              const isSelected = pillar.id === activePillarId;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillarId(pillar.id)}
                  className={`w-full text-left p-5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-[#10141e] border-blue-500/50 shadow-lg shadow-blue-500/5'
                      : 'bg-[#0a0d13] border-[#18202d] hover:border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-[#141b27] border border-[#212c40]">
                      {getPillarIcon(pillar.id)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-tight">
                        {pillar.title}
                      </h3>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {pillar.subtitle}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mt-2">
                    {pillar.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {pillar.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#131924] border border-[#1e2738] text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Code Implementation Showcase */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[#1f283a] bg-[#05070a] shadow-2xl overflow-hidden font-mono text-xs">
              
              {/* Header */}
              <div className="px-4 py-3 bg-[#0d1117] border-b border-[#1b2230] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-semibold text-slate-200">
                    Production Implementation: {activePillar.title}
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(activePillar.codeExample, activePillar.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#171d28] border border-[#242e40] text-[11px] text-slate-300 hover:text-white transition-colors"
                >
                  {copiedId === activePillar.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Viewer */}
              <div className="p-5 text-slate-300 overflow-x-auto text-[11.5px] leading-relaxed">
                <pre>
                  <code>{activePillar.codeExample}</code>
                </pre>
              </div>

              {/* Architectural Footer Note */}
              <div className="p-4 bg-[#0a0d13] border-t border-[#171d28] text-xs text-slate-400 leading-relaxed">
                <strong className="text-white">Why it matters:</strong> {activePillar.description}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
