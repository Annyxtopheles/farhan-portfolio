import React from 'react';
import { Briefcase, GraduationCap, Quote } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 max-w-6xl mx-auto px-6 lg:px-8 border-t border-white/[0.06]">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider mb-2">
            <Briefcase className="w-4 h-4" />
            <span>Career Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work Experience
          </h2>
        </div>
        <p className="text-slate-400 text-xs sm:text-sm max-w-md font-normal md:text-right">
          Over seven years building transactional web applications, microservices, and financial rails.
        </p>
      </div>

      {/* 2-Column Experience Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Chronological Experience Roles (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {PORTFOLIO_DATA.experiences.map((exp, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl bg-[#111318] border border-white/[0.07] hover:border-white/20 transition-all shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {exp.role}
                  </h3>
                  <span className="text-slate-500 font-mono text-xs">at</span>
                  <span className="text-slate-200 font-semibold text-sm">{exp.company}</span>
                </div>
                <span className="text-xs font-mono text-slate-400 shrink-0">
                  {exp.period}
                </span>
              </div>

              <div className="text-xs font-mono text-slate-500 mb-3">
                {exp.location} • {exp.type}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                {exp.description}
              </p>

              <ul className="space-y-1 mb-4 text-xs text-slate-400">
                {exp.highlights.map((hl, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2">
                    <span className="text-blue-400/80 mt-0.5">•</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                {exp.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#090a0d] border border-white/[0.05] text-slate-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Education & Colleague Recommendation (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Education Card */}
          <div className="p-6 rounded-2xl bg-[#111318] border border-white/[0.07] space-y-3 shadow-md">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </div>
            <h4 className="text-base font-bold text-white">
              Khulna University of Engineering & Technology (KUET)
            </h4>
            <div className="text-xs text-slate-300 font-medium">
              Bachelor of Engineering in Electrical, Electronics & Communication Engineering
            </div>
            <div className="text-xs font-mono text-slate-500">
              Batch of ECE '13 • 2014 – 2019
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-white/[0.04]">
              Rigorous 4-year engineering foundation in telecommunication protocols, signal processing, and computational mathematics.
            </p>
          </div>

          {/* Manager Recommendation Card */}
          <div className="p-6 rounded-2xl bg-[#111318] border border-white/[0.07] space-y-4 shadow-md relative">
            <Quote className="w-10 h-10 text-white/[0.03] absolute top-4 right-4 pointer-events-none" />

            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider">
              <Quote className="w-4 h-4" />
              <span>Manager Testimonial</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
              "{PORTFOLIO_DATA.recommendations[0].quote}"
            </p>

            <div className="pt-3 border-t border-white/[0.06] text-xs">
              <div className="font-bold text-white">{PORTFOLIO_DATA.recommendations[0].name}</div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                {PORTFOLIO_DATA.recommendations[0].title}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-1">
                Direct Manager at SJ Innovation
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
