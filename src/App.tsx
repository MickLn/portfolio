import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { ProjectDrawer } from './components/ProjectDrawer';
import { AboutModal } from './components/AboutModal';
import { Footer } from './components/Footer';
import { ProjectItem } from './data/projects';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#141414] text-[#1A1A1A] relative selection:bg-[#1A1A1A] selection:text-[#F4F3EF]">
      {/* 1. Minimalist Header — Fixed, Zero Background */}
      <Header onOpenAbout={() => setIsAboutOpen(true)} />

      {/* Main Content Flow — Slides above the sticky footer (Curtain Reveal) */}
      <main className="relative z-10 bg-[#F4F3EF] border-b border-[#1A1A1A] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
        {/* 2. Hero Section — 3 Columns strict */}
        <Hero />

        {/* 3. Projects Section — 3D Circular perspective carousel */}
        <Projects onSelectProject={(project) => setSelectedProject(project)} />
      </main>

      {/* 4. Footer Section — Sticky underneath main content (Curtain / Uncover Effect) */}
      <div className="sticky bottom-0 left-0 w-full z-0">
        <Footer onOpenAbout={() => setIsAboutOpen(true)} />
      </div>

      {/* Interactive Case Study Slide-Over Drawer */}
      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Minimal About Profile Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
};

export default App;
