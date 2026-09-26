import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-16 max-w-4xl mx-auto px-6 border-t border-white/[0.08]">
      
      {/* Section Header */}
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Work Experience
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Seven years building transactional web applications, microservices, and financial rails.
        </p>
      </div>

      {/* Experience List */}
      <div className="space-y-10">
        {PORTFOLIO_DATA.experiences.map((exp, idx) => (
          <div key={idx} className="group relative">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {exp.role}
                </h3>
                <span className="text-slate-500 font-mono text-xs">at</span>
                <span className="text-slate-200 font-semibold text-sm">{exp.company}</span>
              </div>
              <span className="text-xs font-mono text-slate-500 shrink-0">
                {exp.period}
              </span>
            </div>

            <div className="text-xs font-mono text-slate-400 mb-3">
              {exp.location} • {exp.type}
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              {exp.description}
            </p>

            <ul className="space-y-1.5 mb-4 text-xs text-slate-400">
              {exp.highlights.map((hl, hIdx) => (
                <li key={hIdx} className="flex items-start gap-2">
                  <span className="text-slate-600 mt-1">•</span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {exp.techStack.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-slate-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Education & Recommendation Section */}
      <div className="mt-16 pt-12 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Education */}
        <div className="p-6 rounded-2xl bg-[#101319] border border-white/[0.06] space-y-3">
          <div className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">
            Education
          </div>
          <h4 className="text-base font-bold text-white">
            Khulna University of Engineering & Technology (KUET)
          </h4>
          <div className="text-xs text-slate-300">
            Bachelor of Engineering in Electrical, Electronics & Communication Engineering
          </div>
          <div className="text-xs font-mono text-slate-500">
            Batch of ECE '13 • 2014 – 2019
          </div>
        </div>

        {/* Verified Colleague Quote */}
        <div className="p-6 rounded-2xl bg-[#101319] border border-white/[0.06] space-y-3 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider mb-2">
              Manager Testimonial
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "{PORTFOLIO_DATA.recommendations[0].quote}"
            </p>
          </div>
          <div className="pt-3 border-t border-white/[0.04] text-xs">
            <div className="font-bold text-white">{PORTFOLIO_DATA.recommendations[0].name}</div>
            <div className="text-[11px] font-mono text-slate-500">
              Direct Manager at SJ Innovation
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
