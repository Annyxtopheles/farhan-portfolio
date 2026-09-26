import React, { useState } from 'react';
import { Header } from './components/Header';
import { BentoGrid } from './components/BentoGrid';
import { ContactModal } from './components/ContactModal';

export const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-400 font-sans selection:bg-sky-500/20 selection:text-slate-100">
      
      {/* Top Navbar: No logo, clean anchor links, contact trigger */}
      <Header onOpenContact={() => setIsContactOpen(true)} />

      {/* Flagship Bento Grid Portfolio */}
      <main className="pb-16">
        <BentoGrid onOpenContact={() => setIsContactOpen(true)} />
      </main>

      {/* Direct Contact Ingress Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

    </div>
  );
};

export default App;
