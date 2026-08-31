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
    <div className="min-h-screen bg-[#F4F3EF] text-[#1A1A1A] relative flex flex-col justify-between selection:bg-[#1A1A1A] selection:text-[#F4F3EF]">
      {/* 1. Minimalist Header — Fixed, Zero Background */}
      <Header onOpenAbout={() => setIsAboutOpen(true)} />

      {/* Main Content Flow */}
      <main className="relative z-10 bg-[#F4F3EF]">
        {/* 2. Hero Section — 3 Columns strict */}
        <Hero />

        {/* 3. Projects Section — Interactive editorial list */}
        <Projects onSelectProject={(project) => setSelectedProject(project)} />
      </main>

      {/* 4. Footer Section — Sticky dark uncover effect */}
      <Footer onOpenAbout={() => setIsAboutOpen(true)} />

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
