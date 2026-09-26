import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, ShieldCheck } from 'lucide-react';
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
    <footer>
      
      {/* High-Impact Paymid Citron CTA Banner */}
      <div className="bg-[#d4f769] text-black py-20 sm:py-28 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/10 text-xs font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 fill-black text-[#d4f769]" />
            <span>High-Throughput Global Infrastructure</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
            Let's discuss scaling your next platform.
          </h2>

          <p className="text-base sm:text-xl text-slate-800 font-medium max-w-2xl mx-auto leading-relaxed">
            Available for mission-critical FinTech engineering, multi-gateway orchestration, distributed systems, and technical advisory.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenContact}
              className="px-8 py-4 rounded-2xl font-mono text-xs font-black uppercase tracking-wider bg-black hover:bg-slate-900 text-white flex items-center gap-2 shadow-2xl transition-all active:scale-[0.98]"
            >
              <span>Retain / Hire Farhan</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopy}
              className="px-6 py-4 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider bg-white/80 hover:bg-white text-black flex items-center gap-2 shadow-md transition-all active:scale-[0.98] border border-black/10"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{PORTFOLIO_DATA.engineer.links.email}</span>
                </>
              )}
            </button>

            <a
              href={PORTFOLIO_DATA.engineer.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-white/80 hover:bg-white text-black border border-black/10 shadow-md transition-all flex items-center justify-center"
              title="LinkedIn Profile"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Deep Obsidian Telemetry & Footer Bar */}
      <div className="bg-[#07090e] border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-black text-[#d4f769] border border-white/10 flex items-center justify-center font-black">
              FK
            </div>
            <div>
              <span className="text-white font-bold">{PORTFOLIO_DATA.engineer.name}</span>
              <span className="mx-2 text-slate-600">•</span>
              <span>{PORTFOLIO_DATA.engineer.headline}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>KUET ECE '13</span>
            <span>•</span>
            <span>Paymid (Limassol, Cyprus)</span>
            <span>•</span>
            <span className="text-[#d4f769] font-bold">99.99% Nominal SLA</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
