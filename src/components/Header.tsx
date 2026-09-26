import React from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeaderProps {
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#d4f769] border-b border-black/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center text-[#d4f769] font-black text-base shadow-sm">
            FK
          </div>
          <div>
            <div className="font-extrabold text-black text-base tracking-tight flex items-center gap-2">
              {PORTFOLIO_DATA.engineer.name}
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/10 text-black font-bold">
                Paymid SDE-1
              </span>
            </div>
            <div className="text-[11px] text-slate-700 font-mono font-medium hidden sm:block">
              KUET ECE '13 • Limassol, Cyprus (Remote)
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
          <a href="#orchestration-engine" className="hover:text-black transition-colors flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-black"></span>
            Payment Sandbox
          </a>
          <a href="#stack" className="hover:text-black transition-colors">
            Core Stack
          </a>
          <a href="#experience" className="hover:text-black transition-colors">
            Experience Log
          </a>
          <a href="#projects" className="hover:text-black transition-colors">
            Case Studies
          </a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono font-bold bg-black/10 px-3 py-1.5 rounded-full text-black">
            <ShieldCheck className="w-3.5 h-3.5 text-black" />
            <span>99.99% Uptime</span>
          </div>

          <button
            onClick={onOpenContact}
            className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-black hover:bg-slate-900 text-white flex items-center gap-1.5 shadow-md transition-all active:scale-[0.98]"
          >
            <span>Retain / Hire</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </header>
  );
};
