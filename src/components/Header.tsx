import React, { useState } from 'react';
import { Mail, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '#overview', label: 'Overview' },
    { href: '#architecture', label: 'Architecture' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b1120]/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Clean text title (No logo, no avatar) */}
        <a href="#overview" className="text-sm font-bold text-slate-100 tracking-tight hover:text-white transition-colors">
          Farhan Zaman Khan
          <span className="text-slate-500 font-normal ml-2 hidden sm:inline">
            / Payment Systems Engineer
          </span>
        </a>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden sm:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Contact Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span>Contact</span>
          </button>

          {/* Mobile Menu Toggle */}
          <div className="relative sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-400 hover:text-slate-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {mobileMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-44 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
