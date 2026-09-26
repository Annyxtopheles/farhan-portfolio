import React, { useState } from 'react';
import { X, Mail, Copy, Check, Send } from 'lucide-react';
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
      const subject = encodeURIComponent(`Contact from ${formData.name}${formData.company ? ` (${formData.company})` : ''}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:${PORTFOLIO_DATA.engineer.links.email}?subject=${subject}&body=${body}`;
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-6 sm:p-7 text-left font-sans">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-5">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
            Get in Touch
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Available for payment architecture, backend roles, and technical advisory.
          </p>
        </div>

        {/* Direct Email Pill */}
        <div className="mb-5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center">
              <Mail className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Direct Email</div>
              <div className="text-xs font-semibold text-slate-200">
                {PORTFOLIO_DATA.engineer.links.email}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 rounded-lg text-xs bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-sky-400" />
                  <span className="text-sky-300">Copied</span>
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
              className="px-3 py-1.5 rounded-lg text-xs bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Message Form */}
        {formSent ? (
          <div className="py-8 text-center space-y-3 bg-slate-950/60 rounded-xl border border-slate-800 p-6">
            <h4 className="text-slate-100 font-bold text-base">Message Ready</h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Opening your default email client with your message to Farhan.
            </p>
            <button
              onClick={() => setFormSent(false)}
              className="text-xs text-sky-400 hover:underline pt-2 inline-block"
            >
              Edit message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 text-[11px] mb-1 font-medium">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Mercer"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-600"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-[11px] mb-1 font-medium">Your Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-[11px] mb-1 font-medium">Company / Organization (Optional)</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Fintech Corp"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-600"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-[11px] mb-1 font-medium">Message</label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can Farhan help your team or system?"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl font-semibold bg-slate-100 hover:bg-white text-slate-950 flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm mt-1"
            >
              <Send className="w-3.5 h-3.5 fill-slate-950" />
              <span>Send Message</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
