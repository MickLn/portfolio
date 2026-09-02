import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ProjectItem, PROJECTS } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';

interface ProjectDrawerProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectProject?: (project: ProjectItem) => void;
  onOpenAbout?: () => void;
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({
  project,
  onClose,
  onSelectProject,
  onOpenAbout,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  // Prevent background scrolling & scroll to top on open/switch
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      if (containerRef.current) {
        containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  // Keyboard navigation: ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  // Find previous and next projects
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const handleNavClick = (sectionId: string) => {
    onClose();
    setTimeout(() => {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 bg-[#F4F3EF] overflow-y-auto select-none"
      >
        {/* 1. Unified Minimalist Header — Identical Navigation to Main Page */}
        <header className="sticky top-0 left-0 w-full h-14 sm:h-16 z-40 bg-[#F4F3EF]/95 backdrop-blur-md border-b border-[#D5D4CE] px-6 sm:px-12 lg:px-16 flex justify-between items-center text-xs tracking-wider uppercase font-mono-custom text-[#1A1A1A]">
          {/* Left: Back to Projects Link */}
          <button
            onClick={onClose}
            className="group inline-flex items-center gap-2 font-mono-custom text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:opacity-60 transition-opacity cursor-pointer py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="hidden sm:inline">{t('drawer.back')}</span>
            <span className="sm:hidden">BACK</span>
          </button>

          {/* Center: 3 Navigation Tabs from Main Header */}
          <nav className="flex items-center gap-6 sm:gap-10">
            <button
              onClick={() => handleNavClick('home')}
              className="link-drawer hover:text-black transition-colors cursor-pointer py-1 text-[11px] sm:text-xs font-bold"
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => {
                if (onOpenAbout) onOpenAbout();
              }}
              className="link-drawer hover:text-black transition-colors cursor-pointer py-1 text-[11px] sm:text-xs font-bold"
            >
              {t('nav.about')}
            </button>
            <button
              onClick={() => handleNavClick('projects')}
              className="link-drawer hover:text-black transition-colors cursor-pointer py-1 text-[11px] sm:text-xs font-bold"
            >
              {t('nav.projects')}
            </button>
          </nav>

          {/* Right: Language Switcher (EN | FR) */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono-custom">
            <button
              onClick={() => setLanguage('en')}
              className={`cursor-pointer transition-colors py-1 px-0.5 ${
                language === 'en'
                  ? 'font-bold text-[#1A1A1A] underline underline-offset-4 decoration-1 decoration-[#1A1A1A]'
                  : 'font-normal text-[#666664] hover:text-[#1A1A1A]'
              }`}
              aria-label="Switch language to English"
            >
              EN
            </button>

            <span className="text-[#D5D4CE] select-none">|</span>

            <button
              onClick={() => setLanguage('fr')}
              className={`cursor-pointer transition-colors py-1 px-0.5 ${
                language === 'fr'
                  ? 'font-bold text-[#1A1A1A] underline underline-offset-4 decoration-1 decoration-[#1A1A1A]'
                  : 'font-normal text-[#666664] hover:text-[#1A1A1A]'
              }`}
              aria-label="Changer la langue en Français"
            >
              FR
            </button>
          </div>
        </header>

        {/* 2. Restrained & Refined Case Study Content Container */}
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 py-10 sm:py-16 space-y-12 sm:space-y-16">
          
          {/* Header Block — Restrained Typography Scale */}
          <div className="space-y-4 border-b border-[#D5D4CE] pb-8">
            <span className="font-mono-custom text-xs font-bold uppercase tracking-widest text-[#666664] block">
              {project.category[language]}
            </span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1A1A1A] uppercase leading-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-[#1A1A1A] font-normal max-w-3xl leading-relaxed">
              {project.tagline[language]}
            </p>
          </div>

          {/* Metadata Grid (Compact 4-Column Architectural Ribbon) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-y border-[#D5D4CE] py-4 font-mono-custom text-xs gap-4">
            <div>
              <span className="text-[#666664] text-[10px] uppercase tracking-wider block mb-1">{t('drawer.role')}</span>
              <span className="text-[#1A1A1A] font-bold text-xs sm:text-sm block">{project.metadataBar.role[language]}</span>
            </div>
            <div>
              <span className="text-[#666664] text-[10px] uppercase tracking-wider block mb-1">{t('drawer.timeline')}</span>
              <span className="text-[#1A1A1A] font-bold text-xs sm:text-sm block">{project.metadataBar.context[language]}</span>
            </div>
            <div>
              <span className="text-[#666664] text-[10px] uppercase tracking-wider block mb-1">{t('drawer.tools')}</span>
              <span className="text-[#1A1A1A] font-bold text-xs sm:text-sm block">{project.metadataBar.tools}</span>
            </div>
            <div>
              <span className="text-[#666664] text-[10px] uppercase tracking-wider block mb-1">{t('drawer.discipline')}</span>
              <span className="text-[#1A1A1A] font-bold text-xs sm:text-sm block">{project.metadataBar.discipline[language]}</span>
            </div>
          </div>

          {/* Visual Showcase (Proportionate Height & 1px Border) */}
          <div className="w-full h-[320px] sm:h-[420px] md:h-[480px] overflow-hidden border border-[#1A1A1A] bg-[#E5E3DC] group shadow-xs">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700 ease-out"
            />
          </div>

          {/* Narrative Content: 2-Column Problem & Solution Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 pt-2">
            {/* The Problem */}
            <div className="space-y-3">
              <span className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[#666664] block">
                {t('drawer.friction')}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight uppercase leading-snug">
                {t('drawer.friction_sub')}
              </h3>
              <p className="text-sm sm:text-base text-[#1A1A1A] leading-relaxed font-normal pt-1">
                {project.problem[language]}
              </p>
            </div>

            {/* The Solution */}
            <div className="space-y-3">
              <span className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[#666664] block">
                {t('drawer.solution')}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight uppercase leading-snug">
                {t('drawer.solution_sub')}
              </h3>
              <p className="text-sm sm:text-base text-[#1A1A1A] leading-relaxed font-normal pt-1">
                {project.solution[language]}
              </p>
            </div>
          </div>

          {/* Brand Architecture & Design Tokens (Compact & Refined) */}
          {project.brandAndDesignSystem && (
            <div className="border-t border-[#D5D4CE] pt-10 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <span className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[#666664]">
                  {t('drawer.brand')}
                </span>
                <p className="font-mono-custom text-xs text-[#666664] max-w-xl">
                  {project.brandAndDesignSystem.concept[language]}
                </p>
              </div>

              {/* Color Palette Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.brandAndDesignSystem.colorPalette.map((color, idx) => (
                  <div
                    key={idx}
                    className="border border-[#1A1A1A] p-4 flex flex-col justify-between h-24 sm:h-28"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span
                      className={`font-mono-custom text-[11px] font-bold uppercase tracking-wider ${
                        color.hex === '#FAF3E0' || color.hex === '#FFFFFF' || color.hex === '#F4F3EF'
                          ? 'text-[#1A1A1A]'
                          : 'text-[#F4F3EF]'
                      }`}
                    >
                      {color.name}
                    </span>

                    <div className="flex items-baseline justify-between border-t border-current/20 pt-2">
                      <span
                        className={`font-mono-custom text-xs font-extrabold ${
                          color.hex === '#FAF3E0' || color.hex === '#FFFFFF' || color.hex === '#F4F3EF'
                            ? 'text-[#1A1A1A]'
                            : 'text-[#F4F3EF]'
                        }`}
                      >
                        {color.hex}
                      </span>
                      <span
                        className={`font-mono-custom text-[10px] uppercase tracking-wider ${
                          color.hex === '#FAF3E0' || color.hex === '#FFFFFF' || color.hex === '#F4F3EF'
                            ? 'text-[#1A1A1A]/70'
                            : 'text-[#F4F3EF]/70'
                        }`}
                      >
                        {color.desc[language]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Typography Specimen */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.brandAndDesignSystem.typography.map((type, idx) => (
                  <div key={idx} className="border border-[#1A1A1A] p-5 bg-[#EAE8E2] space-y-2">
                    <div className="flex items-center justify-between border-b border-[#D5D4CE] pb-2">
                      <span className="font-mono-custom text-[10px] font-bold uppercase tracking-wider text-[#666664]">
                        {t('drawer.typeface')} {idx + 1}
                      </span>
                      <span className="font-mono-custom text-[10px] text-[#1A1A1A] font-bold">
                        {type.desc[language]}
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
                      {type.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Streamlined Minimalist Project Navigation (No Big CTA) */}
          <div className="border-t border-[#D5D4CE] pt-8 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-custom text-xs select-none">
            <button
              onClick={() => {
                if (onSelectProject) onSelectProject(prevProject);
              }}
              className="group inline-flex items-center gap-2 text-[#666664] hover:text-[#1A1A1A] transition-colors cursor-pointer py-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>← {prevProject.title}</span>
            </button>

            <button
              onClick={() => {
                if (onSelectProject) onSelectProject(nextProject);
              }}
              className="group inline-flex items-center gap-2 font-bold text-[#1A1A1A] hover:opacity-60 transition-opacity cursor-pointer py-2"
            >
              <span>{nextProject.title} →</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
