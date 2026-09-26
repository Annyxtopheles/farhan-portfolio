import React, { useState } from 'react';
import { X, Mail, Copy, Check, Send, ShieldCheck, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { LinkedInIcon } from './icons/LinkedInIcon';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    scope: 'Payment Gateway Integration',
    message: ''
  });

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.engineer.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      // Create mailto link as fallback
      const subject = encodeURIComponent(`[Engineering Ingress] ${formData.scope} - ${formData.company || formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nScope: ${formData.scope}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:${PORTFOLIO_DATA.engineer.links.email}?subject=${subject}&body=${body}`;
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl border border-[#1f283a] bg-[#0c0f16] shadow-2xl p-6 sm:p-8 text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#141924] border border-[#20293a] text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase mb-1">
            <Terminal className="w-3.5 h-3.5" />
            <span>Initiate Engineering Ingress</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Discuss Architecture or Retain Farhan
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Available for mission-critical payment architecture, backend contracts, and engineering advisory.
          </p>
        </div>

        {/* Fast Action: Direct Email Pill */}
        <div className="mb-6 p-4 rounded-xl bg-[#090b10] border border-[#1b2230] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Mail className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400">Direct Engineering Email</div>
              <div className="text-xs font-mono font-bold text-white">
                {PORTFOLIO_DATA.engineer.links.email}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#141924] border border-[#212a3c] text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <a
              href={PORTFOLIO_DATA.engineer.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-mono bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:bg-blue-600/30 flex items-center gap-1.5 transition-colors"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Message Form */}
        {formSent ? (
          <div className="py-8 text-center space-y-3 bg-[#080b10] rounded-xl border border-emerald-500/30 p-6">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <h4 className="text-white font-bold text-base">Transmission Formatted</h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Opening your mail client with pre-formatted encryption headers and details for Farhan.
            </p>
            <button
              onClick={() => setFormSent(false)}
              className="text-xs font-mono text-emerald-400 hover:underline pt-2 inline-block"
            >
              Edit parameters
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 text-[11px] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Mercer"
                  className="w-full bg-[#111622] border border-[#1e2637] rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-[11px] mb-1">Your Work Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@fintech.co"
                  className="w-full bg-[#111622] border border-[#1e2637] rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 text-[11px] mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. PayFlow Global"
                  className="w-full bg-[#111622] border border-[#1e2637] rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-[11px] mb-1">Engagement Scope</label>
                <select
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full bg-[#111622] border border-[#1e2637] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Payment Gateway Integration">Payment Gateway Integration</option>
                  <option value="Multi-PSP Orchestration & Routing">Multi-PSP Orchestration & Routing</option>
                  <option value="FinTech Backend Architecture">FinTech Backend Architecture</option>
                  <option value="Full-Time / Senior SDE Hire">Full-Time / Senior SDE Hire</option>
                  <option value="Technical Advisory / Audit">Technical Advisory / Audit</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-[11px] mb-1">Project Brief / Challenge</label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your current payment routing bottleneck, gateway expansion plan, or backend requirements..."
                className="w-full bg-[#111622] border border-[#1e2637] rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20"
            >
              <Send className="w-3.5 h-3.5 fill-black" />
              <span>Transmit Engineering Ingress</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
