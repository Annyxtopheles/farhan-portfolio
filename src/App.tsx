import React, { useState } from 'react';
import { Header } from './components/Header';
import { PersonalProfile } from './components/PersonalProfile';
import { ArchitectureBlueprint } from './components/ArchitectureBlueprint';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactModal } from './components/ContactModal';
import { AskAIModal } from './components/AskAIModal';
import { ArrowLeft } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAskAIOpen, setIsAskAIOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090a0d] text-slate-300 font-sans selection:bg-blue-500/20 selection:text-white">
      
      {/* Top Navbar matching the design */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenAskAI={() => setIsAskAIOpen(true)}
      />

      {/* Main View Area */}
      <main className="pb-24">
        {activeTab === 'home' || activeTab === 'about' ? (
          <PersonalProfile
            onOpenContact={() => setIsContactOpen(true)}
            onNavigateSection={(sec) => setActiveTab(sec)}
          />
        ) : (
          <div className="pt-4">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 mb-4">
              <button
                onClick={() => setActiveTab('home')}
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Profile</span>
              </button>
            </div>

            {activeTab === 'workbench' && <ArchitectureBlueprint />}
            {activeTab === 'work' && <ProjectsSection />}
            {activeTab === 'experience' && <ExperienceTimeline />}
          </div>
        )}
      </main>

      {/* Modals */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <AskAIModal 
        isOpen={isAskAIOpen} 
        onClose={() => setIsAskAIOpen(false)} 
        onOpenContact={() => {
          setIsAskAIOpen(false);
          setIsContactOpen(true);
        }}
      />

    </div>
  );
};

export default App;
