import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OrchestrationEngine } from './components/OrchestrationEngine';
import { ProjectsSection } from './components/ProjectsSection';
import { ArchitecturePillars } from './components/ArchitecturePillars';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080a0d] text-slate-300 font-sans selection:bg-emerald-500/20 selection:text-emerald-300 fintech-grid">
      <Header onOpenContact={() => setIsContactOpen(true)} />
      
      <main>
        <Hero onOpenContact={() => setIsContactOpen(true)} />

        {/* The Flagship Interactive Proof-of-Work Section */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase mb-1">
              <span>● Live Technical Demonstration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Test The Payment Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Interact with the live simulator below to test smart routing, multi-currency settlement, and simulated gateway failovers in real time.
            </p>
          </div>

          <OrchestrationEngine />
        </section>

        <ProjectsSection />
        <ArchitecturePillars />
        <ExperienceTimeline />
      </main>

      <Footer onOpenContact={() => setIsContactOpen(true)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default App;
