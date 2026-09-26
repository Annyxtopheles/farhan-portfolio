import React from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { LinkedInIcon } from './icons/LinkedInIcon';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  return (
    <footer className="border-t border-[#1b2230] bg-[#07090d]">
      
      {/* High-Impact CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="relative rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#0f1522] to-[#090c12] p-8 sm:p-12 text-center overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero Double-Spend • 99.99% Uptime SLA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Let's Scale Your Next Payment Architecture
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Available for mission-critical payment gateway orchestration, cross-border financial rails, and high-concurrency Laravel/PHP systems.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={onOpenContact}
                className="px-6 py-3 rounded-xl font-mono text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]"
              >
                <span>Hire / Retain Farhan</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={PORTFOLIO_DATA.engineer.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl font-mono text-xs font-medium text-slate-300 hover:text-white bg-[#121622] hover:bg-[#181f2e] border border-[#212b3e] transition-colors flex items-center gap-2"
              >
                <LinkedInIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry & Copyright Bar */}
      <div className="border-t border-[#151a24] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot"></span>
            <span className="text-slate-300 font-semibold">{PORTFOLIO_DATA.engineer.name}</span>
            <span>—</span>
            <span>{PORTFOLIO_DATA.engineer.headline}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>KUET ECE '13</span>
            <span>•</span>
            <span>Paymid (Limassol)</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">99.99% Nominal</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
