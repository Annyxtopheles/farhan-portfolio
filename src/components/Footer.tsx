import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { LinkedInIcon } from './icons/LinkedInIcon';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.engineer.links.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t border-white/10 bg-[#06080d]">
      
      {/* High-Impact CTA Banner matching reference */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
            Let's Build Together
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's discuss scaling your next platform
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
            Available for mission-critical FinTech engineering, multi-PSP orchestration, distributed systems, and technical contracts.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
            <button
              onClick={onOpenContact}
              className="px-6 py-3 rounded-xl font-mono text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 shadow-lg shadow-blue-600/25 transition-all active:scale-[0.98]"
            >
              <span>Hire Farhan</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleCopy}
              className="px-5 py-3 rounded-xl font-mono text-xs font-medium text-slate-300 hover:text-white bg-[#10141e] hover:bg-[#161c2b] border border-white/10 transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{PORTFOLIO_DATA.engineer.links.email}</span>
                </>
              )}
            </button>

            <a
              href={PORTFOLIO_DATA.engineer.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#10141e] hover:bg-[#161c2b] border border-white/10 text-slate-300 hover:text-white transition-colors"
              title="LinkedIn Profile"
            >
              <LinkedInIcon className="w-4 h-4 text-blue-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Telemetry & Copyright Bar */}
      <div className="border-t border-white/5 py-8">
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
            <span className="text-emerald-400 font-medium">99.99% Nominal SLA</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
