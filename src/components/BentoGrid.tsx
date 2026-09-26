import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Check, 
  Copy, 
  Layers, 
  Briefcase, 
  GraduationCap, 
  Quote, 
  Server,
  Cpu
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon } from './icons/GithubIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { ArchitectureBlueprint } from './ArchitectureBlueprint';

interface BentoGridProps {
  onOpenContact: () => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ onOpenContact }) => {
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyCli = () => {
    navigator.clipboard.writeText('npx farhankhan');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.engineer.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      
      {/* SECTION 1: Bio Card (8 cols) + Engineering Metrics Card (4 cols) */}
      <section id="overview" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* CARD 1: Personal Bio & Narrative (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-sm">
          <div>
            
            {/* Header: Photo + Name + Status */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6">
              <img
                src="/farhan.jpg"
                alt={PORTFOLIO_DATA.engineer.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-slate-700/70 object-cover bg-slate-950 shadow-md shrink-0"
                width="96"
                height="96"
              />
              <div>
                <div className="flex items-center flex-wrap gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight font-sans">
                    {PORTFOLIO_DATA.engineer.name}
                  </h1>
                  <span className="inline-flex items-center bg-slate-800/80 text-slate-300 text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-slate-700/60">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-400 mr-1.5 animate-pulse"></span>
                    Paymid • Remote
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  Senior Backend & Payment Systems Engineer
                </p>
                <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                  <a
                    href={PORTFOLIO_DATA.engineer.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-slate-100 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>GitHub</span>
                  </a>
                  <span className="text-slate-700">•</span>
                  <a
                    href={PORTFOLIO_DATA.engineer.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-slate-100 transition-colors"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>LinkedIn</span>
                  </a>
                  <span className="text-slate-700">•</span>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-slate-100 transition-colors"
                  >
                    <TwitterIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>Twitter</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Narrative Prose in Brittany Chiang's First-Person Voice */}
            <div className="space-y-3.5 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
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
                My focus centers around event-driven architectures, distributed idempotency mutexes, and zero-variance double-entry ledgers with{' '}
                <strong className="text-slate-200 font-medium">PHP 8.3 / Laravel</strong>,{' '}
                <strong className="text-slate-200 font-medium">Go</strong>,{' '}
                <strong className="text-slate-200 font-medium">Node.js</strong>, and{' '}
                <strong className="text-slate-200 font-medium">Redis</strong>.
              </p>
            </div>
          </div>

          {/* Bottom CLI Prompt & Action */}
          <div className="pt-6 mt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
            <div
              onClick={handleCopyCli}
              title="Click to copy CLI command"
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 py-1.5 px-3 rounded-lg bg-slate-800/40 border border-slate-700/50 hover:border-slate-600 transition-all cursor-pointer group"
            >
              <span className="text-sky-400 font-bold">$</span>
              <span className="text-slate-300 group-hover:underline group-hover:underline-offset-2">
                npx farhankhan
              </span>
              <span className="text-slate-500">
                — {copiedCli ? 'Copied to clipboard!' : 'try my CLI portfolio'}
              </span>
              {copiedCli ? (
                <Check className="w-3 h-3 text-sky-400" />
              ) : (
                <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-slate-300 transition-colors" />
              )}
            </div>

            <button
              onClick={onOpenContact}
              className="text-xs font-mono text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors flex items-center gap-1.5"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

        </div>

        {/* CARD 2: High-Scale Financial Metrics Card (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider mb-5">
              <Server className="w-4 h-4" />
              <span>Production Invariants</span>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono tracking-tight">
                  200+
                </div>
                <div className="text-xs font-medium text-slate-300 mt-0.5">
                  Payment Gateways Integrated
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Stripe, Adyen, Checkout.com, SEPA, and regional acquirers.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono tracking-tight">
                  700+
                </div>
                <div className="text-xs font-medium text-slate-300 mt-0.5">
                  Alternative Payment Methods
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  APMs onboarded with Strategy Pattern driver interface.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono tracking-tight">
                  &lt;15ms
                </div>
                <div className="text-xs font-medium text-slate-300 mt-0.5">
                  Automated Acquirer Failover
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Circuit breaker hot-swaps on timeouts to prevent checkout drops.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono tracking-tight">
                  0.00%
                </div>
                <div className="text-xs font-medium text-slate-300 mt-0.5">
                  Ledger Mathematical Variance
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Strict double-entry journal balance with row-level locks.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 text-center">
            7+ Years Production Backend Experience
          </div>
        </div>

      </section>

      {/* SECTION 2: Interactive System Architecture Blueprint (12 cols) */}
      <section id="architecture">
        <ArchitectureBlueprint />
      </section>

      {/* SECTION 3: Projects (8 cols) + Core Tech Stack (4 cols) */}
      <section id="projects" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* CARD 4: Selected Enterprise Projects (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-sm">
          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider mb-1">
                  <Layers className="w-4 h-4" />
                  <span>Selected Systems</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
                  Production Platforms & Migrations
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                4 Flagship Systems
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PORTFOLIO_DATA.projects.map((project) => (
                <div
                  key={project.id}
                  className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700/80 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-sky-300 font-medium bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                        {project.company}
                      </span>
                      <span className="text-slate-500">{project.period}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-100 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      {project.summary}
                    </p>
                    <ul className="space-y-1 mb-4 text-xs text-slate-400">
                      {project.architecturePoints.slice(0, 2).map((point, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-sky-400/80 mt-0.5">•</span>
                          <span className="line-clamp-2">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-3 border-t border-slate-800/80">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800 text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 5: Core Tech Stack & Security Invariants (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider mb-5">
              <Cpu className="w-4 h-4" />
              <span>Core Stack & Protocols</span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                <div className="font-mono text-[10px] font-bold text-slate-500 uppercase">
                  Languages & Frameworks
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['PHP 8.3', 'Laravel 11', 'Go', 'Node.js', 'TypeScript', 'Symfony'].map((item) => (
                    <span
                      key={item}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                <div className="font-mono text-[10px] font-bold text-slate-500 uppercase">
                  Data & Concurrency
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Redis Cluster', 'Redlock Mutex', 'PostgreSQL', 'MySQL', 'Streams', 'Row Locks'].map((item) => (
                    <span
                      key={item}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                <div className="font-mono text-[10px] font-bold text-slate-500 uppercase">
                  Architecture & Patterns
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Strategy Pattern', 'Circuit Breakers', 'Event-Driven', 'Double-Entry Ledger', 'Idempotency'].map((item) => (
                    <span
                      key={item}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                <div className="font-mono text-[10px] font-bold text-slate-500 uppercase">
                  Security & Standards
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['PCI-DSS Ingress', 'HMAC-SHA256', 'OpenAPI Contracts', 'Docker', 'Linux'].map((item) => (
                    <span
                      key={item}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 text-center">
            Zero Toy Dependencies • Enterprise Ready
          </div>
        </div>

      </section>

      {/* SECTION 4: Career Experience & KUET Education (12 cols) */}
      <section id="experience" className="rounded-2xl bg-slate-900/50 border border-slate-800/80 p-6 sm:p-8 hover:border-slate-700/80 transition-all shadow-sm">
        
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider mb-1">
              <Briefcase className="w-4 h-4" />
              <span>Career Record & Foundation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              Work Experience & Academic Rigor
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500 hidden sm:inline">
            7+ Years Track Record
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Chronological Experience (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {PORTFOLIO_DATA.experiences.map((exp, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2 hover:border-slate-700/80 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="text-sm font-bold text-slate-100">
                      {exp.role}
                    </h3>
                    <span className="text-slate-500 font-mono text-xs">at</span>
                    <span className="text-slate-200 font-semibold text-xs">{exp.company}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {exp.period}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-slate-500">
                  {exp.location} • {exp.type}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {exp.description}
                </p>

                <ul className="space-y-1 pt-1 text-xs text-slate-400">
                  {exp.highlights.slice(0, 2).map((hl, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-1.5">
                      <span className="text-sky-400/80 mt-0.5">•</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-800/80">
                  {exp.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: KUET Education & Testimonial (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Education Card */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-semibold uppercase">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </div>
              <h4 className="text-sm font-bold text-slate-100">
                Khulna University of Engineering & Technology (KUET)
              </h4>
              <div className="text-xs text-slate-300 font-medium">
                Bachelor of Engineering in Electrical, Electronics & Communication Engineering
              </div>
              <div className="text-xs font-mono text-slate-500">
                Batch of ECE '13 • 2014 – 2019
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800/80">
                Rigorous 4-year engineering foundation in telecommunication protocols, signal processing, network topologies, and computational systems.
              </p>
            </div>

            {/* Colleague Testimonial */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3 relative">
              <Quote className="w-8 h-8 text-white/[0.03] absolute top-4 right-4 pointer-events-none" />
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-semibold uppercase">
                <Quote className="w-3.5 h-3.5" />
                <span>Manager Testimonial</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{PORTFOLIO_DATA.recommendations[0].quote}"
              </p>
              <div className="pt-2 border-t border-slate-800/80 text-xs">
                <div className="font-bold text-slate-100">{PORTFOLIO_DATA.recommendations[0].name}</div>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                  {PORTFOLIO_DATA.recommendations[0].title}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  Direct Manager at SJ Innovation
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* SECTION 5: Direct Ingress & Footer (12 cols) */}
      <footer className="rounded-2xl bg-slate-900/50 border border-slate-800/80 p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              Let's talk payment architecture.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mt-1 leading-relaxed">
              Available for senior backend roles, multi-PSP orchestration, and distributed transactional consulting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyEmail}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-white text-slate-950 font-semibold text-xs font-mono transition-colors flex items-center gap-2 shadow-sm"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-slate-950" />
                  <span>Copied Email</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{PORTFOLIO_DATA.engineer.links.email}</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenContact}
              className="px-4 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200 text-xs font-mono border border-slate-700/60 transition-colors flex items-center gap-1.5"
            >
              <span>Send message</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <a
              href={PORTFOLIO_DATA.engineer.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
              title="LinkedIn Profile"
            >
              <LinkedInIcon className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Colophon */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-500">
          <div>
            {PORTFOLIO_DATA.engineer.name} • {PORTFOLIO_DATA.engineer.headline}
          </div>
          <div className="flex items-center gap-4">
            <span>Dhaka (UTC+6) • Remote</span>
            <span>•</span>
            <a
              href={PORTFOLIO_DATA.engineer.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors underline underline-offset-4"
            >
              Source on GitHub
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};
