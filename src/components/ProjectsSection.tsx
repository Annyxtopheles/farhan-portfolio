import React, { useState } from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Architectures' },
    { id: 'FinTech & Payments', label: 'FinTech & Payments' },
    { id: 'Lending & Cash Rails', label: 'Lending & Cash Rails' },
    { id: 'Enterprise Infrastructure', label: 'Enterprise Systems' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 border-b border-[#1b2230]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Production Track Record</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Enterprise Platforms & FinTech Rails
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Architectural deep-dives across global payment orchestration, cross-border lending, and enterprise migrations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                    : 'bg-[#111622] text-slate-400 border border-[#1e2738] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`rounded-2xl border bg-[#0b0e14] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-slate-600 ${
                project.featured
                  ? 'border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                  : 'border-[#1b2230]'
              }`}
            >
              <div>
                {/* Meta header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#141b27] border border-[#212c40] text-emerald-400 font-medium">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {project.period}
                  </span>
                </div>

                {/* Title & Company */}
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <div className="text-xs font-mono text-slate-400 mt-1 mb-4">
                  Associated with: <strong className="text-slate-300">{project.company}</strong>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {project.summary}
                </p>

                {/* Key Metrics */}
                <div className="mb-6 p-4 rounded-xl bg-[#080a0f] border border-[#171d2a] space-y-2">
                  <div className="text-[11px] font-mono font-semibold tracking-wider text-slate-400 uppercase">
                    Key Performance Indicators
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

                {/* Architectural Highlights */}
                <div className="space-y-2 mb-6">
                  <div className="text-[11px] font-mono font-semibold tracking-wider text-slate-400 uppercase">
                    Engineering Architecture
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

              {/* Tech Stack Tags */}
              <div className="pt-4 border-t border-[#171e2c] flex flex-wrap gap-1.5">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#121622] border border-[#1e2739] text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
