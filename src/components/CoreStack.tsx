import React from 'react';
import { Server, CreditCard, Layout } from 'lucide-react';

export const CoreStack: React.FC = () => {
  const competencies = [
    {
      title: "Backend & Concurrency Architecture",
      icon: Server,
      accent: "text-blue-500",
      description: "Architecting high-throughput transactional backends, RESTful APIs, distributed microservices, and zero-downtime database schemas.",
      tags: ["PHP 8.3", "Laravel 11", "MySQL 8.0", "RoadRunner", "Redis Caching", "RESTful APIs"]
    },
    {
      title: "FinTech & Payment Rails",
      icon: CreditCard,
      accent: "text-[#d4f769]",
      description: "Multi-PSP orchestration, smart fee routing, automatic cascade failover, Redis idempotency locking, and double-entry ledgers.",
      tags: ["Payment Gateways", "200+ PSP Drivers", "Card & 3DS 2.2", "Local APMs", "HMAC Webhooks", "Docker"]
    },
    {
      title: "Frontend, Cloud & CMS",
      icon: Layout,
      accent: "text-purple-400",
      description: "Engineering responsive client frontends and leading enterprise migrations (like moving Johnson & Johnson to headless Contentful DXP).",
      tags: ["Vue.js", "TypeScript", "Tailwind CSS", "Contentful DXP", "Linux & CI/CD", "Git Architecture"]
    }
  ];

  return (
    <section id="stack" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="text-xs font-mono font-bold tracking-wider text-[#d4f769] uppercase mb-2">
          Engineering Competencies
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Core Competencies & Stack
        </h2>
        <p className="text-slate-400 text-base mt-3 font-medium">
          Grounded in electrical & communications engineering fundamentals from KUET ECE '13.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {competencies.map((comp, idx) => {
          const Icon = comp.icon;
          return (
            <div
              key={idx}
              className="rounded-3xl bg-[#121622] border border-white/10 p-8 flex flex-col justify-between hover:border-white/20 transition-all shadow-xl"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#192030] border border-white/10 flex items-center justify-center mb-6">
                  <Icon className={`w-6 h-6 ${comp.accent}`} />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                  {comp.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-medium">
                  {comp.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {comp.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs font-mono px-3 py-1 rounded-xl bg-[#182030] border border-white/5 text-slate-200"
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
