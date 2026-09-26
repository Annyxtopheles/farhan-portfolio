import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ArchitectureBlueprint } from './components/ArchitectureBlueprint';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-300 font-sans selection:bg-blue-600/30 selection:text-white blue-ambient midnight-grid">
      <Header onOpenContact={() => setIsContactOpen(true)} />
      
      <main>
        {/* Personal Introduction & Architectural Domains */}
        <Hero onOpenContact={() => setIsContactOpen(true)} />

        {/* The Flagship Proof-of-Work: Interactive System Architecture Blueprint */}
        <ArchitectureBlueprint />

        {/* Selected Systems & Production Deep-Dives */}
        <ProjectsSection />

        {/* Career Experience, Education & Colleague Recommendation */}
        <ExperienceTimeline />
      </main>

      <Footer onOpenContact={() => setIsContactOpen(true)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default App;
