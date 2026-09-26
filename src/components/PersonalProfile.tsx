import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon } from './icons/GithubIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';

interface PersonalProfileProps {
  onOpenContact: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const PersonalProfile: React.FC<PersonalProfileProps> = ({ 
  onOpenContact,
  onNavigateSection
}) => {
  const [copiedCli, setCopiedCli] = useState(false);

  const handleCopyCli = () => {
    navigator.clipboard.writeText('npx farhankhan');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <section className="mt-8 sm:mt-12 max-w-2xl mx-auto px-6 text-left">
      
      {/* Name Heading */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mb-1.5 tracking-tight font-sans">
        {PORTFOLIO_DATA.engineer.name}
      </h1>

      {/* Subtitle & Status Badge */}
      <div className="flex items-center flex-wrap gap-2 text-slate-400 text-sm mb-8">
        <span>Senior Backend & Payment Systems Engineer</span>
        <span className="inline-flex items-center bg-slate-800/80 text-slate-300 text-xs font-medium px-2.5 py-0.5 rounded-full border border-slate-700/60">
          <span className="inline-block w-2 h-2 rounded-full bg-sky-400 mr-1.5 animate-pulse"></span>
          Paymid • Remote
        </span>
      </div>

      {/* Profile Row: Real Photo + Social Links Stack */}
      <div className="flex flex-row flex-wrap items-center gap-6 mb-7">
        
        {/* Real Photo */}
        <div className="relative">
          <img 
            src="/farhan.jpg" 
            alt={PORTFOLIO_DATA.engineer.name}
            className="w-[105px] h-[105px] rounded-xl border border-slate-700/70 object-cover bg-slate-900 shadow-xl"
            width="105"
            height="105"
          />
        </div>

        {/* Vertical Social Links with Quiet Opacity Transitions */}
        <div className="flex flex-col justify-center gap-2.5 text-sm font-medium text-slate-400 group/socials">
          <a
            href={PORTFOLIO_DATA.engineer.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 opacity-70 group-hover/socials:opacity-35 hover:!opacity-100 hover:text-slate-200 transition-all"
          >
            <GithubIcon className="w-4 h-4 text-slate-400" />
            <span>GitHub</span>
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 opacity-70 group-hover/socials:opacity-35 hover:!opacity-100 hover:text-slate-200 transition-all"
          >
            <TwitterIcon className="w-4 h-4 text-slate-400" />
            <span>Twitter</span>
          </a>

          <a
            href={PORTFOLIO_DATA.engineer.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 opacity-70 group-hover/socials:opacity-35 hover:!opacity-100 hover:text-slate-200 transition-all"
          >
            <LinkedInIcon className="w-4 h-4 text-slate-400" />
            <span>LinkedIn</span>
          </a>
        </div>

      </div>

      {/* GitHub Follow Pill */}
      <div className="mb-6">
        <a
          href={PORTFOLIO_DATA.engineer.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 text-xs font-medium text-slate-300 hover:text-slate-100 transition-all shadow-sm group"
        >
          <GithubIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200" />
          <span>Follow @Annyxtopheles</span>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-700/50">
            2.4k
          </span>
        </a>
      </div>

      {/* Subtle CLI Terminal Prompt */}
      <div
        onClick={handleCopyCli}
        title="Click to copy CLI command"
        className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 mb-8 py-1.5 px-3 rounded-lg bg-slate-800/40 border border-slate-700/50 hover:border-slate-600 transition-all cursor-pointer group"
      >
        <span className="text-sky-400 font-bold">$</span>
        <span className="text-slate-300 group-hover:underline group-hover:underline-offset-2">
          npx farhankhan
        </span>
        <span className="text-slate-500">
          — {copiedCli ? 'Copied command to clipboard!' : 'try my CLI portfolio'}
        </span>
        {copiedCli ? (
          <Check className="w-3 h-3 text-sky-400" />
        ) : (
          <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-slate-300 transition-colors" />
        )}
      </div>

      {/* Narrative Bio in Brittany Chiang's First-Person Voice */}
      <div className="space-y-4 text-sm text-slate-400 leading-relaxed font-sans max-w-xl mb-9">
        <p>
          I’m a backend engineer with over 7 years of production experience, specializing in payment gateway integration, multi-PSP orchestration, and distributed transactional systems. I care deeply about building resilient financial rails where race conditions, duplicate webhooks, and upstream acquirer timeouts are solved by design.
        </p>

        <p>
          Currently, I’m a Senior Backend Engineer at{' '}
          <a
            href="https://paymid.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-200 font-medium hover:text-sky-400 transition-colors underline underline-offset-4"
          >
            Paymid
          </a>
          , where I architect our multi-PSP routing engine and dynamic failover cascade — turning dozens of fragmented banking APIs into high-throughput, unified payment pipelines with sub-15ms automated failover.
        </p>

        <p>
          My technical focus centers around event-driven architectures, distributed idempotency mutexes, and zero-variance double-entry ledgers with{' '}
          <strong className="text-slate-200 font-medium">PHP 8.3 / Laravel</strong>,{' '}
          <strong className="text-slate-200 font-medium">Go</strong>,{' '}
          <strong className="text-slate-200 font-medium">Node.js</strong>, and{' '}
          <strong className="text-slate-200 font-medium">Redis</strong>. Beyond code, I spend time exploring distributed systems literature, brewing pour-over coffee, and mentoring engineers.
        </p>

        <p className="pt-2 text-slate-400 font-mono text-xs">
          <span>In a nutshell, ☕ + ⚡ + 💻 = </span>
          <button
            onClick={onOpenContact}
            className="text-slate-200 hover:text-sky-400 underline underline-offset-4 font-semibold transition-colors"
          >
            @farhankhan
          </button>
        </p>
      </div>

      {/* Bottom Social / Resource Bar */}
      <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400 pt-5 pb-16 border-t border-slate-800/80 group/bottom">
        <a
          href="https://peerlist.io"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 opacity-60 group-hover/bottom:opacity-40 hover:!opacity-100 hover:text-slate-200 transition-all"
        >
          <span>Peerlist</span>
        </a>

        <button
          onClick={() => onNavigateSection('workbench')}
          className="flex items-center gap-1.5 opacity-60 group-hover/bottom:opacity-40 hover:!opacity-100 hover:text-slate-200 transition-all"
        >
          <span>Blueprint</span>
        </button>

        <button
          onClick={() => onNavigateSection('work')}
          className="flex items-center gap-1.5 opacity-60 group-hover/bottom:opacity-40 hover:!opacity-100 hover:text-slate-200 transition-all"
        >
          <span>Projects</span>
        </button>

        <button
          onClick={() => onNavigateSection('experience')}
          className="flex items-center gap-1.5 opacity-60 group-hover/bottom:opacity-40 hover:!opacity-100 hover:text-slate-200 transition-all"
        >
          <span>Career</span>
        </button>

        <a
          href={PORTFOLIO_DATA.engineer.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 opacity-60 group-hover/bottom:opacity-40 hover:!opacity-100 hover:text-slate-200 transition-all"
        >
          <span>Source</span>
        </a>
      </div>

    </section>
  );
};
