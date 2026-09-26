import React from 'react';
import { Briefcase, Award, GraduationCap, Quote, CheckCircle2, Calendar, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-b border-[#1b2230]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Chronological Career Path</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work Experience & Track Record
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            From telecommunications engineering at KUET to architecting global payment infrastructure at Paymid.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Timeline */}
          <div className="lg:col-span-8 space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#1a2230]">
            {PORTFOLIO_DATA.experiences.map((exp, idx) => (
              <div key={idx} className="relative pl-10">
                {/* Node icon */}
                <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-[#0d1117] border-2 border-emerald-500/80 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                </div>

                <div className="rounded-xl border border-[#1b2230] bg-[#0b0e14] p-6 hover:border-slate-600 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-sm font-bold text-white tracking-tight">
                      {exp.role}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {exp.period}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-3">
                    <span className="text-emerald-400 font-semibold">{exp.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                    <span>•</span>
                    <span className="px-2 py-0.2 rounded bg-[#131924] text-slate-300">{exp.type}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    {exp.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#161d2a]">
                    {exp.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#121622] border border-[#1c2434] text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Recommendations & Honors */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Testimonials */}
            <div id="recommendations" className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-purple-400 uppercase">
                <Quote className="w-3.5 h-3.5" />
                <span>Executive Recommendation</span>
              </div>

              {PORTFOLIO_DATA.recommendations.map((rec, idx) => (
                <div key={idx} className="rounded-xl border border-purple-500/20 bg-[#0d0f17] p-6 relative">
                  <Quote className="w-8 h-8 text-purple-500/10 absolute top-4 right-4 pointer-events-none" />
                  
                  <p className="text-xs text-slate-300 leading-relaxed italic mb-4">
                    "{rec.quote}"
                  </p>

                  <div className="pt-3 border-t border-[#1b202e]">
                    <div className="text-xs font-bold text-white">{rec.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{rec.title}</div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{rec.relationship}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Honors & Certifications */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-amber-400 uppercase">
                <Award className="w-3.5 h-3.5" />
                <span>Accreditations & Honors</span>
              </div>

              <div className="space-y-3">
                {PORTFOLIO_DATA.accreditations.map((acc, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-[#1b2230] bg-[#0a0d13]">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-xs font-bold text-white">{acc.title}</div>
                      <span className="text-[10px] font-mono text-amber-400 shrink-0">{acc.date}</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">{acc.issuer}</div>
                    <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                      {acc.description}
                    </p>
                    {acc.credentialId && (
                      <div className="text-[10px] font-mono text-slate-400 mt-2">
                        ID: {acc.credentialId}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Education Summary */}
            <div className="p-5 rounded-xl border border-blue-500/20 bg-[#090d14]">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold uppercase mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>Academic Foundation</span>
              </div>
              <div className="text-sm font-bold text-white">Khulna University of Engineering & Technology (KUET)</div>
              <div className="text-xs text-slate-300 mt-1">B.Sc. in Electrical, Electronics & Communication Engineering</div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">Batch of ECE '13 · 2014 – 2019</div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
