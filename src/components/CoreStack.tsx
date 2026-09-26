import React from 'react';
import { Server, CreditCard, Layout } from 'lucide-react';

export const CoreStack: React.FC = () => {
  const competencies = [
    {
      title: "Backend & Architecture",
      icon: Server,
      iconColor: "text-blue-400",
      description: "Architecting high-concurrency transactional backends, RESTful APIs, distributed microservices, and zero-downtime database schemas.",
      tags: ["PHP 8.3", "Laravel 11", "MySQL 8.0", "RoadRunner", "Redis Caching", "RESTful APIs"]
    },
    {
      title: "FinTech & Payment Rails",
      icon: CreditCard,
      iconColor: "text-emerald-400",
      description: "Deep expertise in multi-PSP orchestration, smart cost routing, automatic cascade failover, idempotency locking, and double-entry ledgers.",
      tags: ["Payment Gateways", "200+ PSP Drivers", "Card & 3DS 2.2", "Local APMs", "HMAC Webhooks", "Docker"]
    },
    {
      title: "Frontend, Cloud & CMS",
      icon: Layout,
      iconColor: "text-purple-400",
      description: "Building responsive frontends and executing massive enterprise migrations (like moving Johnson & Johnson to headless Contentful DXP).",
      tags: ["Vue.js", "TypeScript", "Tailwind CSS", "Contentful DXP", "Linux & CI/CD", "Git Architecture"]
    }
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase mb-2">
          Engineering Depth
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Core Competencies & Stack
        </h2>
        <p className="text-slate-400 text-sm mt-2">
          Specialized in high-reliability transactional architecture with hardware-level engineering rigor from KUET.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {competencies.map((comp, idx) => {
          const Icon = comp.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-[#0c1017] p-7 flex flex-col justify-between hover:border-white/20 transition-all shadow-lg"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#141b27] border border-white/10 flex items-center justify-center mb-5">
                  <Icon className={`w-6 h-6 ${comp.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                  {comp.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {comp.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {comp.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#141a26] border border-white/5 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
