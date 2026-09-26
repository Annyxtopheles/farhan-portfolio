import React from 'react';
import { Calendar, MapPin, CheckCircle2, GraduationCap, Quote, Award } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/10">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase mb-2">
          Career Trajectory
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Work Experience
        </h2>
        <p className="text-slate-400 text-sm mt-2">
          Proven history of delivering high-stakes transactional architectures, rapid promotions, and mission-critical client migrations.
        </p>
      </div>

      {/* Horizontal Experience Cards */}
      <div className="space-y-6 mb-16">
        {PORTFOLIO_DATA.experiences.map((exp, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-white/10 bg-[#0c1017] p-6 sm:p-8 hover:border-white/20 transition-all shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {exp.role}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mt-1">
                  <span className="text-emerald-400 font-semibold">{exp.company}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {exp.location}
                  </span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded bg-[#161d2a] text-slate-300 border border-white/5">
                    {exp.type}
                  </span>
                </div>
              </div>

              <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 sm:self-start bg-[#121622] px-3 py-1.5 rounded-lg border border-white/5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>{exp.period}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed my-4">
              {exp.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {exp.highlights.map((hl, hIdx) => (
                <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
              {exp.techStack.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141a26] border border-white/5 text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Education & Recommendation Split Grid (as in user's mockup) */}
      <div id="recommendations" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Education & Awards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-blue-400 uppercase">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Rigor & Honors</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0c1017] p-6 space-y-5">
            <div>
              <div className="text-base font-bold text-white">
                Khulna University of Engineering & Technology (KUET)
              </div>
              <div className="text-xs text-emerald-400 font-mono mt-0.5">
                B.Sc. in Electrical, Electronics & Communication Engineering
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                Batch of ECE '13 • 2014 – 2019
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Hardware-level systems, digital signal processing, telecommunication routing protocols, and advanced computing mathematics.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-3">
              <div className="text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase">
                Enterprise Honors
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#121622] border border-white/5">
                <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Performer of the Month</div>
                  <div className="text-[10px] font-mono text-slate-400">SJ Innovation LLC • Nov 2023 (ID: SJI-2023-POM87)</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#121622] border border-white/5">
                <Award className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Certificate of Appreciation (AI Innovation)</div>
                  <div className="text-[10px] font-mono text-slate-400">SJ Innovation LLC • Oct 2023</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Recommendation (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-purple-400 uppercase">
            <Quote className="w-4 h-4" />
            <span>Verified Colleague Recommendation</span>
          </div>

          <div className="rounded-2xl border border-purple-500/30 bg-[#0e111a] p-7 relative flex flex-col justify-between h-[calc(100%-2rem)]">
            <Quote className="w-12 h-12 text-purple-500/10 absolute top-6 right-6 pointer-events-none" />

            <div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic">
                "{PORTFOLIO_DATA.recommendations[0].quote}"
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">{PORTFOLIO_DATA.recommendations[0].name}</div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">{PORTFOLIO_DATA.recommendations[0].title}</div>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">
                  Direct Manager • {PORTFOLIO_DATA.recommendations[0].relationship}
                </div>
              </div>

              <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hidden sm:block">
                LinkedIn Verified
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
