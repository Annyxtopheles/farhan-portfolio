import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { NetworkCoverage } from './components/NetworkCoverage';
import { OrchestrationEngine } from './components/OrchestrationEngine';
import { CoreStack } from './components/CoreStack';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-100 font-sans selection:bg-[#d4f769] selection:text-black">
      <Header onOpenContact={() => setIsContactOpen(true)} />
      
      <main>
        {/* 1. Paymid-Themed Hero with Floating Payment Badges */}
        <Hero onOpenContact={() => setIsContactOpen(true)} />

        {/* 2. Global Payment Network & Acquirer Drivers Bar */}
        <NetworkCoverage />

        {/* 3. The Flagship Proof-of-Work: Smart Payment Processing & Routing Engine */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OrchestrationEngine />
        </section>

        {/* 4. Core Competencies & Architecture Stack */}
        <CoreStack />

        {/* 5. Career Track Record, KUET Degree & Recommendations */}
        <ExperienceTimeline />

        {/* 6. Enterprise FinTech Projects Grid */}
        <ProjectsSection />
      </main>

      {/* 7. Paymid-Themed High-Impact CTA & Telemetry Footer */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {/* Direct Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default App;
