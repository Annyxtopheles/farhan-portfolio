import React from 'react';
import { Calendar, MapPin, CheckCircle2, GraduationCap, Quote, Award } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-xs font-mono font-bold tracking-wider text-[#d4f769] uppercase mb-2">
          Track Record
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Work Experience
        </h2>
        <p className="text-slate-400 text-base mt-3 font-medium">
          From hardware & telecommunication engineering at KUET to scaling high-throughput payment channels at Paymid.
        </p>
      </div>

      {/* Horizontal Experience Rows */}
      <div className="space-y-6 mb-20">
        {PORTFOLIO_DATA.experiences.map((exp, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-[#121622] border border-white/10 p-8 sm:p-10 hover:border-white/20 transition-all shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {exp.role}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mt-1.5">
                  <span className="text-[#d4f769] font-bold text-sm">{exp.company}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {exp.location}
                  </span>
                  <span>•</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#1c2436] text-slate-200 border border-white/5">
                    {exp.type}
                  </span>
                </div>
              </div>

              <div className="text-xs font-mono text-slate-300 flex items-center gap-2 sm:self-start bg-[#192233] px-4 py-2 rounded-xl border border-white/5 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-[#d4f769]" />
                <span>{exp.period}</span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed my-5 font-medium">
              {exp.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {exp.highlights.map((hl, hIdx) => (
                <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#d4f769] shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              {exp.techStack.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="text-xs font-mono px-3 py-1 rounded-xl bg-[#182030] border border-white/5 text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Education & Recommendation Split */}
      <div id="recommendations" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Education (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-[#121622] border border-white/10 p-8 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-blue-400 uppercase mb-4">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Foundation</span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">
              Khulna University of Engineering & Technology (KUET)
            </h3>
            <div className="text-xs text-[#d4f769] font-mono font-semibold mt-1">
              B.Sc. in Electrical, Electronics & Communication Engineering
            </div>
            <div className="text-xs text-slate-400 font-mono mt-1">
              Batch of ECE '13 • 2014 – 2019
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed font-medium">
              Hardware-level systems, digital signal processing, telecommunication routing protocols, and advanced computing mathematics.
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6 space-y-3">
            <div className="text-xs font-mono font-bold uppercase text-slate-400">
              Enterprise Accreditations
            </div>
            
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#182233] border border-white/5">
              <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white">Performer of the Month</div>
                <div className="text-[10px] font-mono text-slate-400">SJ Innovation LLC • Nov 2023 (ID: SJI-2023-POM87)</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#182233] border border-white/5">
              <Award className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white">Certificate of Appreciation (AI Innovation)</div>
                <div className="text-[10px] font-mono text-slate-400">SJ Innovation LLC • Oct 2023</div>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Colleague Recommendation (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-[#121622] to-[#181d2a] border border-white/10 p-8 sm:p-10 relative flex flex-col justify-between shadow-xl">
          <Quote className="w-16 h-16 text-white/5 absolute top-6 right-6 pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-purple-400 uppercase mb-4">
              <Quote className="w-4 h-4" />
              <span>Verified Manager Recommendation</span>
            </div>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed italic font-medium">
              "{PORTFOLIO_DATA.recommendations[0].quote}"
            </p>
          </div>

          <div className="pt-8 border-t border-white/10 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-base font-bold text-white">{PORTFOLIO_DATA.recommendations[0].name}</div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">{PORTFOLIO_DATA.recommendations[0].title}</div>
              <div className="text-xs text-[#d4f769] font-mono font-bold mt-1">
                Direct Manager • {PORTFOLIO_DATA.recommendations[0].relationship}
              </div>
            </div>

            <div className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold self-start sm:self-auto">
              LinkedIn Verified
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
