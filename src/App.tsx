import React, { useState } from 'react';
import { Header } from './components/Header';
import { BentoGrid } from './components/BentoGrid';
import { ContactModal } from './components/ContactModal';

export const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-300 font-sans selection:bg-sky-500/20 selection:text-sky-200">
      
      {/* Top Navbar */}
      <Header onOpenContact={() => setIsContactOpen(true)} />

      {/* Spacious, Legible Bento Grid */}
      <main className="pb-16">
        <BentoGrid onOpenContact={() => setIsContactOpen(true)} />
      </main>

      {/* Direct Ingress Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

    </div>
  );
};

export default App;
