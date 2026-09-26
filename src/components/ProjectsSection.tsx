import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="text-xs font-mono font-bold tracking-wider text-[#d4f769] uppercase mb-2">
            Enterprise Deliverables
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Enterprise & FinTech Projects
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 max-w-xs md:text-right font-medium">
          Multi-Region Gateways • Double-Entry Ledgers • Headless Migrations
        </div>
      </div>

      {/* 2x2 Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PORTFOLIO_DATA.projects.map((project) => (
          <div
            key={project.id}
            className="rounded-3xl bg-[#121622] border border-white/10 p-8 sm:p-10 flex flex-col justify-between hover:border-white/20 transition-all shadow-xl"
          >
            <div>
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#1c2436] border border-white/5 text-[#d4f769] font-bold">
                  {project.company}
                </span>
                <span className="text-xs font-mono text-slate-400 font-semibold">
                  {project.period}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white tracking-tight mb-4">
                {project.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-medium">
                {project.summary}
              </p>

              {/* Verified Metrics */}
              <div className="mb-6 p-5 rounded-2xl bg-[#0b0f17] border border-white/5 space-y-2.5">
                <div className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                  Verified Engineering Metrics
                </div>
                <div className="space-y-2">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#d4f769] shrink-0 mt-0.5" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture highlights */}
              <div className="space-y-2.5 mb-6">
                <div className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                  System Architecture
                </div>
                <ul className="space-y-2">
                  {project.architecturePoints.map((point, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5 leading-relaxed font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono px-3 py-1 rounded-xl bg-[#182030] border border-white/5 text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
