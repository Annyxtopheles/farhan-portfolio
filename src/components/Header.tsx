import React from 'react';
import { Shield, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeaderProps {
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1b2230] bg-[#080a0d]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Name */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/10 border border-emerald-500/30 flex items-center justify-center">
            <Shield className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <a href="#" className="font-bold text-white text-sm sm:text-base tracking-tight hover:text-emerald-400 transition-colors flex items-center gap-2">
              {PORTFOLIO_DATA.engineer.name}
              <span className="hidden md:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#161d2a] border border-[#232f42] text-slate-300 font-normal">
                KUET ECE '13
              </span>
            </a>
            <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
              Platform & Payments @ <span className="text-white font-medium">Paymid</span> (Cyprus/Remote)
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono">
          <a href="#orchestration-engine" className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Proof-of-Work
          </a>
          <a href="#projects" className="text-slate-400 hover:text-white transition-colors">
            Case Studies
          </a>
          <a href="#architecture" className="text-slate-400 hover:text-white transition-colors">
            Architecture
          </a>
          <a href="#experience" className="text-slate-400 hover:text-white transition-colors">
            Experience Log
          </a>
          <a href="#recommendations" className="text-slate-400 hover:text-white transition-colors">
            Testimonials
          </a>
        </nav>

        {/* Status Chip & CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#10141e] border border-[#1e2637] text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot"></span>
            <span>Uptime: 99.99%</span>
          </div>

          <button
            onClick={onOpenContact}
            className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-emerald-500 hover:bg-emerald-400 text-black flex items-center gap-1.5 shadow-sm shadow-emerald-500/20 transition-all active:scale-[0.98]"
          >
            <span>Retain / Hire</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
