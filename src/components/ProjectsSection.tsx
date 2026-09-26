import React from 'react';
import { Layers } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  return (
    <section id="work" className="py-20 max-w-6xl mx-auto px-6 lg:px-8 border-t border-white/[0.06]">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider mb-2">
            <Layers className="w-4 h-4" />
            <span>Architecture & Platforms</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Selected Projects & Systems
          </h2>
        </div>
        <p className="text-slate-400 text-xs sm:text-sm max-w-md font-normal md:text-right">
          Production systems across global payment orchestration, cross-border lending, and enterprise migrations.
        </p>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PORTFOLIO_DATA.projects.map((project) => (
          <div
            key={project.id}
            className="p-6 sm:p-7 rounded-2xl bg-[#111318] border border-white/[0.07] hover:border-white/20 transition-all flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-medium text-blue-400 bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/[0.08]">
                  {project.company}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {project.period}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2">
                {project.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {project.summary}
              </p>

              {/* Architecture Highlights */}
              <div className="space-y-1.5 mb-5 text-xs text-slate-400">
                {project.architecturePoints?.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-blue-400/80 mt-1">•</span>
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#090a0d] border border-white/[0.05] text-slate-400"
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
