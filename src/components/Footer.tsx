import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
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
    <footer className="py-20 max-w-6xl mx-auto px-6 lg:px-8 border-t border-white/[0.06]">
      
      {/* Contact Section */}
      <div className="mb-14 space-y-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Let's talk architecture.
        </h2>
        <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
          Whether you're scaling a payment gateway integration, untangling high-concurrency race conditions, or looking for a senior backend engineer — my inbox is open.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-black font-semibold text-xs font-mono transition-colors flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-black" />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{PORTFOLIO_DATA.engineer.links.email}</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenContact}
            className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs font-mono border border-white/[0.08] transition-colors flex items-center gap-1.5"
          >
            <span>Send message</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <a
            href={PORTFOLIO_DATA.engineer.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-colors"
            title="LinkedIn Profile"
          >
            <LinkedInIcon className="w-4 h-4 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Subtle Colophon */}
      <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-500">
        <div>
          {PORTFOLIO_DATA.engineer.name} • {PORTFOLIO_DATA.engineer.headline}
        </div>
        <div>
          Dhaka (UTC+6) • Remote
        </div>
      </div>

    </footer>
  );
};
