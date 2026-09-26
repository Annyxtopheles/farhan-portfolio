import React from 'react';
import { ArrowUpRight, Zap, Play } from 'lucide-react';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section className="relative bg-[#d4f769] text-[#0a1118] pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
      {/* Decorative Floating Payment Badges (Directly echoing Paymid's iconic design) */}
      
      {/* Floating Apple Pay Pill (Top Right) */}
      <div className="hidden lg:flex items-center gap-3 absolute top-12 right-12 bg-white px-5 py-3 rounded-2xl shadow-xl border border-black/5 animate-bounce-subtle pointer-events-none">
        <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center text-white font-bold text-xs">
          
        </div>
        <div>
          <div className="text-xs font-bold text-black">Apple Pay</div>
          <div className="text-[10px] text-slate-500 font-mono">Biometric Tokenized</div>
        </div>
        <div className="w-8 h-4 rounded-full bg-emerald-500 flex items-center justify-end p-0.5 ml-2">
          <div className="w-3 h-3 rounded-full bg-white shadow-sm"></div>
        </div>
      </div>

      {/* Floating PayPal Pill (Top Left) */}
      <div className="hidden lg:flex items-center gap-3 absolute top-16 left-12 bg-white px-5 py-3 rounded-2xl shadow-xl border border-black/5 pointer-events-none">
        <div className="w-8 h-8 rounded-xl bg-[#003087] flex items-center justify-center text-white font-black text-xs italic">
          P
        </div>
        <div>
          <div className="text-xs font-bold text-black">PayPal Checkout</div>
          <div className="text-[10px] text-slate-500 font-mono">Instant Clearing</div>
        </div>
        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
      </div>

      {/* Floating Visa / Mastercard Pill (Bottom Right) */}
      <div className="hidden lg:flex items-center gap-3 absolute bottom-12 right-16 bg-white px-5 py-3.5 rounded-2xl shadow-xl border border-black/5 pointer-events-none">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-[#eb001b]"></div>
          <div className="w-6 h-6 rounded-full bg-[#f79e1b] opacity-80"></div>
        </div>
        <div>
          <div className="text-xs font-bold text-black">Cards & 3DS 2.2</div>
          <div className="text-[10px] text-slate-500 font-mono">200+ Global Gateways</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Top Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/10 backdrop-blur-md text-xs font-mono font-bold tracking-wide uppercase mb-6 text-black">
          <Zap className="w-3.5 h-3.5 fill-black" />
          <span>Payment Infrastructure & Multi-PSP Orchestration</span>
        </div>

        {/* Hero Main Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#0a1118] max-w-4xl mx-auto leading-[1.05]">
          Architecting Global <br />
          <span className="underline decoration-black/20 decoration-wavy">Payment Operations</span>.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-[#1e2a14] max-w-2xl mx-auto font-medium leading-relaxed">
          I’m <strong className="text-black font-bold">Farhan Zaman Khan</strong>, a Senior Backend Engineer at <strong className="text-black font-bold">Paymid</strong>. I engineer mission-critical payment rails, dynamic routing engines, and high-concurrency transactional backends.
        </p>

        {/* Main Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href="#orchestration-engine"
            className="px-8 py-4 rounded-2xl bg-black hover:bg-slate-900 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 shadow-2xl transition-all active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Launch Live Payment Sandbox</span>
          </a>

          <button
            onClick={onOpenContact}
            className="px-8 py-4 rounded-2xl bg-white/90 hover:bg-white text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all active:scale-[0.98] border border-black/10"
          >
            <span>Retain / Hire Farhan</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Live Proof Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-14 pt-8 border-t border-black/10">
          <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-black/5 text-left">
            <div className="text-3xl font-black font-mono text-black">700+</div>
            <div className="text-xs font-bold text-slate-800 mt-1">Payment Methods</div>
            <div className="text-[10px] text-slate-600 font-mono mt-0.5">APMs & Local Rails</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-black/5 text-left">
            <div className="text-3xl font-black font-mono text-black">200+</div>
            <div className="text-xs font-bold text-slate-800 mt-1">Global Gateways</div>
            <div className="text-[10px] text-slate-600 font-mono mt-0.5">Stripe, Adyen, bKash</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-black/5 text-left">
            <div className="text-3xl font-black font-mono text-black">99.99%</div>
            <div className="text-xs font-bold text-slate-800 mt-1">Uptime SLA</div>
            <div className="text-[10px] text-slate-600 font-mono mt-0.5">Zero Double-Spend</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-black/5 text-left">
            <div className="text-3xl font-black font-mono text-black">KUET</div>
            <div className="text-xs font-bold text-slate-800 mt-1">ECE '13 Rigor</div>
            <div className="text-[10px] text-slate-600 font-mono mt-0.5">Hardware & Telecom</div>
          </div>
        </div>

      </div>
    </section>
  );
};
