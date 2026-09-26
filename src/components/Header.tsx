import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeaderProps {
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#080c14]/85 backdrop-blur-md border-b border-blue-950/40">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Clean Personal Branding */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono text-xs font-bold">
            FK
          </div>
          <span className="font-bold text-slate-100 text-sm tracking-tight group-hover:text-blue-400 transition-colors">
            {PORTFOLIO_DATA.engineer.name}
          </span>
          <span className="text-slate-500 text-xs hidden sm:inline">
            / Software Engineer
          </span>
        </a>

        {/* Navigation & Direct Action */}
        <nav className="flex items-center gap-6 text-xs text-slate-400">
          <a href="#workbench" className="hover:text-blue-400 transition-colors hidden sm:block">
            Payment Workbench
          </a>
          <a href="#work" className="hover:text-blue-400 transition-colors hidden sm:block">
            Selected Work
          </a>
          <a href="#experience" className="hover:text-blue-400 transition-colors hidden sm:block">
            Experience
          </a>
          
          <button
            onClick={onOpenContact}
            className="text-xs font-medium text-blue-300 hover:text-white flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-blue-400" />
          </button>
        </nav>

      </div>
    </header>
  );
};
