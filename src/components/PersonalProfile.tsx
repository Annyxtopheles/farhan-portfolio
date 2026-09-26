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
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-1.5 tracking-tight font-sans">
        {PORTFOLIO_DATA.engineer.name}
      </h1>

      {/* Subtitle & Status Badge */}
      <div className="flex items-center flex-wrap gap-2 text-slate-400 text-sm mb-9">
        <span>Senior Backend & Payment Systems Engineer</span>
        <span className="inline-flex items-center bg-white/[0.04] text-slate-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-white/[0.08]">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-1.5 animate-pulse"></span>
          Paymid • Remote
        </span>
      </div>

      {/* Profile Row: Avatar + Social Links Stack */}
      <div className="flex flex-row flex-wrap items-center gap-6 mb-7">
        
        {/* Avatar Photo */}
        <div className="relative group">
          <img 
            src="/farhan-avatar.jpg" 
            alt={PORTFOLIO_DATA.engineer.name}
            className="w-[105px] h-[105px] rounded-xl border-2 border-white/[0.1] object-cover bg-[#12141a] shadow-xl"
            width="105"
            height="105"
          />
        </div>

        {/* Vertical Social Links with Group Hover Fade */}
        <div className="flex flex-col justify-center gap-2.5 text-sm font-medium text-slate-300 group/socials">
          <a
            href={PORTFOLIO_DATA.engineer.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 opacity-70 group-hover/socials:opacity-35 hover:!opacity-100 transition-opacity"
          >
            <GithubIcon className="w-4 h-4 text-slate-400" />
            <span>GitHub</span>
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 opacity-70 group-hover/socials:opacity-35 hover:!opacity-100 transition-opacity"
          >
            <TwitterIcon className="w-4 h-4 text-slate-400" />
            <span>Twitter</span>
          </a>

          <a
            href={PORTFOLIO_DATA.engineer.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 opacity-70 group-hover/socials:opacity-35 hover:!opacity-100 transition-opacity"
          >
            <LinkedInIcon className="w-4 h-4 text-slate-400" />
            <span>LinkedIn</span>
          </a>
        </div>

      </div>

      {/* GitHub Follow Pill Button */}
      <div className="mb-6">
        <a
          href={PORTFOLIO_DATA.engineer.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.09] text-xs font-medium text-slate-200 transition-all shadow-sm group"
        >
          <GithubIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
          <span>Follow @Annyxtopheles</span>
          <span className="text-[10px] font-mono text-slate-500 bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.06]">
            2.4k
          </span>
        </a>
      </div>

      {/* Subtle CLI Terminal Prompt */}
      <div
        onClick={handleCopyCli}
        title="Click to copy CLI command"
        className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 mb-8 py-1.5 px-3 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition-all cursor-pointer group"
      >
        <span className="text-blue-400 font-bold">$</span>
        <span className="text-slate-200 group-hover:underline group-hover:underline-offset-2">
          npx farhankhan
        </span>
        <span className="text-slate-500">
          — {copiedCli ? 'Copied command to clipboard!' : 'try my CLI portfolio'}
        </span>
        {copiedCli ? (
          <Check className="w-3 h-3 text-blue-400" />
        ) : (
          <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-slate-300 transition-colors" />
        )}
      </div>

      {/* Narrative Bio Paragraphs */}
      <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-sans max-w-xl mb-9">
        <p>
          Software Engineer leading engineering & payment orchestration at{' '}
          <a
            href="https://paymid.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline underline-offset-4 hover:text-blue-300 font-medium transition-colors"
          >
            paymid
          </a>
          , building high-throughput payment rails — turning fragmented banking APIs and multi-acquirer networks into reliable, unified transaction pipelines.
        </p>

        <p>
          From enterprise platforms to FinTech, it’s been a rewarding journey — over 7 years architecting transactional backends, serving as technical lead across cross-border financial systems, and optimizing multi-PSP settlement pipelines.
        </p>

        <p>
          Passionate about building event-driven architectures, designing sub-15ms acquirer failovers, and scaling distributed microservices with{' '}
          <strong className="text-white font-semibold">PHP 8.3 / Laravel</strong>,{' '}
          <strong className="text-white font-semibold">Go</strong>, and{' '}
          <strong className="text-white font-semibold">Redis</strong>. Beyond code, you’ll find me exploring distributed consensus papers, brewing pour-over coffee, and dissecting financial ledgers.
        </p>

        <p className="pt-2 text-slate-400 font-mono text-xs">
          <span>In a nutshell, ☕ + ⚡ + 💻 = </span>
          <button
            onClick={onOpenContact}
            className="text-blue-400 underline underline-offset-4 hover:text-blue-300 font-semibold"
          >
            @farhankhan
          </button>
        </p>
      </div>

      {/* Bottom Social / Resource Bar */}
      <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400 pt-5 pb-16 border-t border-white/[0.06] group/bottom">
        <a
          href="https://peerlist.io"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 opacity-60 group-hover/bottom:opacity-40 hover:!opacity-100 transition-opacity"
        >
          <span>Peerlist</span>
        </a>

        <button
          onClick={() => onNavigateSection('workbench')}
          className="flex items-center gap-1.5 opacity-60 group-hover/bottom:opacity-40 hover:!opacity-100 transition-opacity"
        >
          <span>Blueprint</span>
        </button>

        <button
          onClick={() => onNavigateSection('work')}
          className="flex items-center gap-1.5 opacity-60 group-hover/bottom:opacity-40 hover:!opacity-100 transition-opacity"
        >
          <span>Projects</span>
        </button>

        <button
          onClick={() => onNavigateSection('experience')}
          className="flex items-center gap-1.5 opacity-60 group-hover/bottom:opacity-40 hover:!opacity-100 transition-opacity"
        >
          <span>Career</span>
        </button>

        <a
          href={PORTFOLIO_DATA.engineer.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 opacity-60 group-hover/bottom:opacity-40 hover:!opacity-100 transition-opacity"
        >
          <span>Source</span>
        </a>
      </div>

    </section>
  );
};
