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
          
          {/* Eyebrow with surgical blue highlight */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-blue-400 font-semibold tracking-wide">
              Senior Software Engineer
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">
              Platform & Payments at <a href="https://paymid.com" target="_blank" rel="noopener noreferrer" className="text-slate-200 underline underline-offset-4 hover:text-white">Paymid</a>
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#f0f3f6] tracking-tight leading-[1.15]">
            Building fault-tolerant payment rails & transactional systems.
          </h1>

          {/* Narrative Bio */}
          <div className="space-y-3 text-base text-[#8b949e] leading-relaxed font-normal">
            <p>
              I’m <strong className="text-white font-semibold">{PORTFOLIO_DATA.engineer.name}</strong>, a backend engineer with over seven years of production experience in web platforms and distributed services.
            </p>
            <p>
              Moving money online is unforgiving: upstream APIs throw intermittent timeouts, webhooks arrive duplicate or out of order, and double-charges can ruin trust instantly. I specialize in solving these problems — building multi-gateway orchestration pipelines, distributed idempotency mutexes, and zero-downtime acquirer failovers.
            </p>
          </div>

          {/* Monochrome Action Buttons with Surgical Blue Links */}
          <div className="flex flex-wrap items-center gap-3 pt-3 text-xs font-mono">
            <a
              href="#workbench"
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-black font-semibold transition-colors flex items-center gap-2"
            >
              <span>Explore Architecture Blueprint</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onOpenContact}
              className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-colors flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{PORTFOLIO_DATA.engineer.links.email}</span>
            </button>

            <a
              href={PORTFOLIO_DATA.engineer.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.08] transition-colors flex items-center gap-1.5"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-slate-600" />
            </a>
          </div>
        </div>

        {/* Right Column: Architectural Domains Card (5 cols) - Neutral Dark Surface */}
        <div className="lg:col-span-5 rounded-2xl bg-[#111318] border border-white/[0.07] p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-300">
              <Terminal className="w-4 h-4 text-slate-400" />
              <span>Core Architectural Domains</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">7+ Years Production</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[#090a0d] border border-white/[0.05] space-y-1">
              <div className="font-bold text-slate-100 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Multi-PSP Orchestration</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-sans">
                Dynamic routing solvers, intelligent fee optimization, and sub-15ms automated failover cascades across 200+ gateways.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#090a0d] border border-white/[0.05] space-y-1">
              <div className="font-bold text-slate-100 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Strict Idempotency & Mutexes</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-sans">
                Redis cluster distributed locks and replay tokens preventing concurrent double-billing during network retries.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#090a0d] border border-white/[0.05] space-y-1">
              <div className="font-bold text-slate-100 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Cryptographic Webhook Pipelines</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-sans">
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
