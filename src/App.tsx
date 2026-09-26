import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PaymentWorkbench } from './components/PaymentWorkbench';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0c0e12] text-slate-300 font-sans selection:bg-white/20 selection:text-white editorial-grid">
      <Header onOpenContact={() => setIsContactOpen(true)} />
      
      <main>
        {/* Personal Introduction */}
        <Hero onOpenContact={() => setIsContactOpen(true)} />

        {/* Flagship Proof-of-Work: The Payment Lifecycle Workbench */}
        <PaymentWorkbench />

        {/* Selected Systems & Architecture */}
        <ProjectsSection />

        {/* Career Experience, Education & Testimonial */}
        <ExperienceTimeline />
      </main>

      <Footer onOpenContact={() => setIsContactOpen(true)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default App;
