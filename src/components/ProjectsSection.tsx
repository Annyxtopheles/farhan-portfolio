import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  return (
    <section id="work" className="py-16 max-w-4xl mx-auto px-6 border-t border-white/[0.08]">
      
      {/* Section Header */}
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Selected Projects & Systems
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Detailed technical context on payment infrastructure, cash rails, and enterprise migrations.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="space-y-8">
        {PORTFOLIO_DATA.projects.map((project) => (
          <div
            key={project.id}
            className="p-6 sm:p-7 rounded-2xl bg-[#101319] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono font-medium text-emerald-400">
                {project.company}
              </span>
              <span className="text-xs font-mono text-slate-500">
                {project.period}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2">
              {project.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {project.summary}
            </p>

            {/* Architecture Highlights */}
            <div className="space-y-1.5 mb-5 text-xs text-slate-400">
              {project.architecturePoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-slate-600 mt-1">•</span>
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.04]">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-slate-400"
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
