import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { ProjectDrawer } from './components/ProjectDrawer';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProjectItem } from './data/projects';

const PortfolioContent: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [transitionProjectName, setTransitionProjectName] = useState<string>('');
  const { language } = useLanguage();

  // Handle cinematic curtain transition when selecting a project
  const handleOpenProject = (project: ProjectItem) => {
    setTransitionProjectName(project.title);
    setIsTransitioning(true);

    setTimeout(() => {
      setSelectedProject(project);
    }, 350);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  // Handle cinematic curtain transition when closing case study
  const handleCloseProject = () => {
    setTransitionProjectName(language === 'en' ? 'PROJECTS' : 'PROJETS');
    setIsTransitioning(true);

    setTimeout(() => {
      setSelectedProject(null);
    }, 350);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-paper)] text-[var(--text-carbon)] relative selection:bg-[var(--text-carbon)] selection:text-[var(--bg-paper)] transition-colors duration-300">
      {/* Cinematic Paper Curtain Page Transition Overlay */}
      <PageTransition
        isActive={isTransitioning}
        projectName={transitionProjectName}
      />

      {/* 1. Minimalist Header — Fixed, Zero Background, Theme Toggle on Left, EN | FR Switcher on Right */}
      <Header onOpenAbout={() => setIsAboutOpen(true)} />

      {/* Main Content Flow — Slides above the sticky footer (Curtain Reveal) */}
      <main className="relative z-10 bg-[var(--bg-paper)] border-b border-[var(--border-carbon)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-colors duration-300">
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
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Full Dedicated About Page View (Center Split Curtain Reveal) */}
      <AboutView
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onNavigateHome={() => {
          setIsAboutOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateProjects={() => {
          setIsAboutOpen(false);
          setTimeout(() => {
            const el = document.getElementById('projects');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PortfolioContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
