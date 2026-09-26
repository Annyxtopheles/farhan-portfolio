import React from 'react';
import { ArrowDown, Mail, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { LinkedInIcon } from './icons/LinkedInIcon';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section className="pt-20 pb-16 max-w-4xl mx-auto px-6">
      
      {/* Status Pill */}
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span className="text-xs font-mono text-slate-400">
          Software Engineer (Platform & Payments) at <a href="https://paymid.com" target="_blank" rel="noopener noreferrer" className="text-slate-200 underline underline-offset-4 hover:text-white">Paymid</a> • Remote
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.2] mb-6">
        Building fault-tolerant payment rails and high-throughput transactional backends.
      </h1>

      {/* Narrative Bio */}
      <div className="space-y-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
        <p>
          I'm <strong className="text-white font-semibold">{PORTFOLIO_DATA.engineer.name}</strong>, a software engineer with over seven years of production experience in backend architecture and web systems.
        </p>
        <p>
          Moving money online is completely unforgiving: upstream APIs throw intermittent timeouts, webhooks arrive duplicate or out of order, and double-charges can ruin merchant trust in milliseconds. Over the past several years, I’ve specialized in solving those exact problems — designing multi-gateway orchestration pipelines, distributed idempotency mutexes, and zero-downtime acquirer failover.
        </p>
      </div>

      {/* Direct Personal Links */}
      <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-white/[0.08] text-xs font-mono">
        <a
          href="#workbench"
          className="px-4 py-2.5 rounded-xl bg-white text-black font-semibold hover:bg-slate-200 transition-colors flex items-center gap-1.5"
        >
          <span>Explore Interactive Payment Workbench</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </a>

        <button
          onClick={onOpenContact}
          className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 hover:text-white border border-white/[0.08] transition-colors flex items-center gap-2"
        >
          <Mail className="w-3.5 h-3.5 text-slate-400" />
          <span>{PORTFOLIO_DATA.engineer.links.email}</span>
        </button>

        <a
          href={PORTFOLIO_DATA.engineer.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] transition-colors flex items-center gap-1.5"
        >
          <LinkedInIcon className="w-3.5 h-3.5 text-blue-400" />
          <span>LinkedIn</span>
          <ExternalLink className="w-3 h-3 text-slate-500" />
        </a>
      </div>

    </section>
  );
};
