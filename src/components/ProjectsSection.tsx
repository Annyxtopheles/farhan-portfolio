import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <div className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase mb-2">
            Selected Work
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Enterprise & FinTech Projects
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 max-w-xs md:text-right">
          Production Systems • High-Concurrency Architecture • Multi-Region Resiliency
        </div>
      </div>

      {/* 2x2 Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PORTFOLIO_DATA.projects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl border border-white/10 bg-[#0c1017] p-7 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all shadow-lg"
          >
            <div>
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#141b27] border border-white/10 text-emerald-400 font-medium">
                  {project.company}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {project.period}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                {project.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {project.summary}
              </p>

              {/* Metrics */}
              <div className="mb-6 p-4 rounded-xl bg-[#080b12] border border-white/5 space-y-2">
                <div className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase">
                  Verified Engineering Metrics
                </div>
                <div className="space-y-1.5">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture highlights */}
              <div className="space-y-2 mb-6">
                <div className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase">
                  System Architecture Highlights
                </div>
                <ul className="space-y-2">
                  {project.architecturePoints.map((point, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141a26] border border-white/5 text-slate-300"
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
