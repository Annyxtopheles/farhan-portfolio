import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CoreStack } from './components/CoreStack';
import { OrchestrationEngine } from './components/OrchestrationEngine';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-300 font-sans selection:bg-emerald-500/20 selection:text-emerald-300 fintech-grid">
      <Header onOpenContact={() => setIsContactOpen(true)} />
      
      <main>
        <Hero onOpenContact={() => setIsContactOpen(true)} />

        {/* 1. Core Competencies & Stack (3-column layout matching reference) */}
        <CoreStack />

        {/* 2. Interactive Proof-of-Work Centerpiece */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/10">
          <OrchestrationEngine />
        </section>

        {/* 3. Work Experience, Education & Recommendations */}
        <ExperienceTimeline />

        {/* 4. Enterprise & FinTech Projects (2x2 grid) */}
        <ProjectsSection />
      </main>

      <Footer onOpenContact={() => setIsContactOpen(true)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default App;
