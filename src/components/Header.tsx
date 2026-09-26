import React, { useState } from 'react';
import { Sparkles, Mail, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenContact: () => void;
  onOpenAskAI: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenContact,
  onOpenAskAI
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'workbench', label: 'Architecture' },
    { id: 'work', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full">
      <div className="max-w-2xl mx-auto px-6 py-6 flex items-center justify-between">
        
        {/* Left: Avatar / Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="focus:outline-none transition-transform hover:scale-105 active:scale-95"
          title="Farhan Zaman Khan"
        >
          <img
            src="/farhan-avatar.jpg"
            alt="Farhan Zaman Khan"
            className="w-[46px] h-[46px] rounded-full object-cover border border-white/10 hover:border-white/30 transition-all shadow-sm"
            width="46"
            height="46"
          />
        </button>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden sm:flex items-center gap-0.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors font-medium ${
                  isActive
                    ? 'text-blue-400 font-semibold bg-white/[0.04]'
                    : 'text-slate-400/80 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Ask AI + Email Buttons */}
        <div className="flex items-center gap-2">
          
          {/* Ask AI CTA Pill */}
          <button
            onClick={onOpenAskAI}
            className="group flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-400 bg-white/[0.03] border border-blue-500/30 rounded-full hover:border-blue-400 hover:bg-blue-500/10 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all duration-200"
            aria-label="Ask AI about Farhan"
          >
            <Sparkles className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-12" />
            <span>Ask AI</span>
          </button>

          {/* Email Envelope Button */}
          <button
            onClick={onOpenContact}
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/[0.03]"
            aria-label="Contact Farhan"
            title="Send Email"
          >
            <Mail className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <div className="relative sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mobile Dropdown */}
            {mobileMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-44 rounded-xl bg-[#111318] border border-white/[0.08] shadow-2xl p-2 z-50">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      activeTab === item.id
                        ? 'text-blue-400 bg-white/[0.04]'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
