import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { ProjectDrawer } from './components/ProjectDrawer';
import { AboutModal } from './components/AboutModal';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { ProjectItem } from './data/projects';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [transitionData, setTransitionData] = useState<{ name: string; category: string }>({
    name: '',
    category: '',
  });

  // Handle cinematic curtain transition when selecting a project
  const handleOpenProject = (project: ProjectItem) => {
    setTransitionData({
      name: project.title,
      category: project.category,
    });
    setIsTransitioning(true);

    setTimeout(() => {
      setSelectedProject(project);
    }, 400);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 900);
  };

  // Handle cinematic curtain transition when closing case study
  const handleCloseProject = () => {
    setTransitionData({
      name: 'PROJECTS',
      category: 'SELECTED WORK',
    });
    setIsTransitioning(true);

    setTimeout(() => {
      setSelectedProject(null);
    }, 400);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-[#1A1A1A] relative selection:bg-[#1A1A1A] selection:text-[#F4F3EF]">
      {/* Cinematic Curtain Page Transition Overlay */}
      <PageTransition
        isActive={isTransitioning}
        projectName={transitionData.name}
        category={transitionData.category}
      />

      {/* 1. Minimalist Header — Fixed, Zero Background */}
      <Header onOpenAbout={() => setIsAboutOpen(true)} />

      {/* Main Content Flow — Slides above the sticky footer (Curtain Reveal) */}
      <main className="relative z-10 bg-[#F4F3EF] border-b border-[#1A1A1A] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
        {/* 2. Hero Section — Monumental Typography & Symmetrical Grid */}
        <Hero />

        {/* 3. Projects Section — Full Screen Immersive Grid */}
        <Projects onSelectProject={handleOpenProject} />
      </main>

      {/* 4. Footer Section — Sticky underneath main content (Curtain / Uncover Effect) */}
      <div className="sticky bottom-0 left-0 w-full z-0">
        <Footer onOpenAbout={() => setIsAboutOpen(true)} />
      </div>

      {/* Full-Screen Immersive Case Study Page View */}
      <ProjectDrawer
        project={selectedProject}
        onClose={handleCloseProject}
        onSelectProject={handleOpenProject}
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
