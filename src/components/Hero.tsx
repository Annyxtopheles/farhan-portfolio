import React from 'react';
import { ArrowDown, Mail, ExternalLink, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { LinkedInIcon } from './icons/LinkedInIcon';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section className="pt-20 pb-16 max-w-6xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Personal Statement & Narrative (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/20 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span className="text-slate-300">
              Platform & Payments at <a href="https://paymid.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 font-medium hover:underline">Paymid</a> • Remote
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Building fault-tolerant payment rails & transactional systems.
          </h1>

          {/* Narrative Bio */}
          <div className="space-y-3 text-base text-slate-300 leading-relaxed font-normal">
            <p>
              I’m <strong className="text-white font-semibold">{PORTFOLIO_DATA.engineer.name}</strong>, a senior backend engineer with over 7 years of production experience in web platforms and distributed services.
            </p>
            <p>
              Moving money online is unforgiving: upstream APIs throw intermittent timeouts, webhooks arrive duplicate or out of order, and double-charges can ruin trust instantly. I specialize in solving these problems — building multi-gateway orchestration pipelines, distributed idempotency mutexes, and zero-downtime acquirer failovers.
            </p>
          </div>

          {/* Direct Personal Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-3 text-xs font-mono">
            <a
              href="#workbench"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
            >
              <span>Explore Payment Workbench</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onOpenContact}
              className="px-4 py-2.5 rounded-xl bg-[#0f1626] hover:bg-[#152037] text-slate-200 hover:text-white border border-blue-500/20 transition-colors flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>{PORTFOLIO_DATA.engineer.links.email}</span>
            </button>

            <a
              href={PORTFOLIO_DATA.engineer.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl bg-[#0f1626] hover:bg-[#152037] text-slate-300 hover:text-white border border-blue-500/20 transition-colors flex items-center gap-1.5"
            >
              <LinkedInIcon className="w-3.5 h-3.5 text-blue-400" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>
        </div>

        {/* Right Column: Architectural Focus Card (5 cols) - Cuts down vertical scroll! */}
        <div className="lg:col-span-5 rounded-2xl bg-[#0e1422] border border-blue-500/15 p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-400">
              <Terminal className="w-4 h-4" />
              <span>Core Architectural Domains</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">7+ Years Production</span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="p-3 rounded-xl bg-[#080c14] border border-blue-500/10 space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Multi-PSP Orchestration</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Dynamic routing solvers, intelligent fee optimization, and sub-15ms automated failover cascades across 200+ gateways.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#080c14] border border-blue-500/10 space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Strict Idempotency & Mutexes</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Redis cluster distributed locks and replay tokens preventing concurrent double-billing during network retries.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#080c14] border border-blue-500/10 space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Cryptographic Webhook Pipelines</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Constant-time HMAC-SHA256 signature verification, drift protection, and asynchronous event workers.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Primary Stack: PHP 8.3 • Laravel 11 • MySQL • Redis</span>
          </div>
        </div>

      </div>
    </section>
  );
};
