import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, X, FileText, Mail } from 'lucide-react';
import { ProjectItem, PROJECTS } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false);
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

  const handleOpenAboutFromDrawer = () => {
    setIsMobileMenuOpen(false);
    onClose();
    if (onOpenAbout) onOpenAbout();
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 bg-[var(--bg-paper)] overflow-y-auto select-none transition-colors duration-300"
      >
        {/* 1. Unified Minimalist Header — Responsive & Clean on Mobile */}
        <header className="sticky top-0 left-0 w-full h-14 sm:h-16 z-40 bg-[var(--bg-paper)]/95 backdrop-blur-md border-b border-[var(--border-sharp)] px-6 sm:px-12 lg:px-24 flex items-center justify-between text-xs tracking-wider uppercase font-mono-custom text-[var(--text-carbon)] relative transition-colors duration-300">
          
          {/* Left: Back to Projects Link & Theme Switcher */}
          <div className="flex items-center gap-3 sm:gap-4 justify-start">
            <button
              type="button"
              onClick={onClose}
              className="group inline-flex items-center gap-2 font-mono-custom text-xs font-bold uppercase tracking-wider text-[var(--text-carbon)] hover:opacity-60 transition-opacity cursor-pointer py-1"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>{t('drawer.back')}</span>
            </button>

            <span className="text-[var(--border-sharp)] select-none hidden sm:inline">|</span>

            <button
              type="button"
              onClick={toggleTheme}
              className="hidden sm:flex items-center gap-1.5 cursor-pointer py-1 text-[10px] sm:text-xs text-[var(--text-muted)] hover:text-[var(--text-carbon)] transition-colors"
              aria-label="Basculer le mode sombre ou clair"
            >
              <span className={`inline-block w-2.5 h-2.5 rounded-full border border-current transition-colors ${
                theme === 'dark' ? 'bg-[var(--text-carbon)]' : 'bg-transparent'
              }`} />
              <span className="font-bold tracking-widest select-none">
                {theme === 'dark' ? 'LIGHT' : 'DARK'}
              </span>
            </button>
          </div>

          {/* Center: 3 Navigation Tabs (Desktop Only to keep Mobile uncluttered) */}
          <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-6 sm:gap-10">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="link-drawer hover:opacity-70 transition-opacity cursor-pointer py-1 text-[11px] sm:text-xs font-bold"
            >
              {t('nav.home')}
            </button>
            <button
              type="button"
              onClick={() => {
                if (onOpenAbout) onOpenAbout();
              }}
              className="link-drawer hover:opacity-70 transition-opacity cursor-pointer py-1 text-[11px] sm:text-xs font-bold"
            >
              {t('nav.about')}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('projects')}
              className="link-drawer hover:opacity-70 transition-opacity cursor-pointer py-1 text-[11px] sm:text-xs font-bold"
            >
              {t('nav.projects')}
            </button>
          </nav>

          {/* Right: Language Switcher + Mobile Burger Menu Button */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono-custom">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`cursor-pointer transition-colors py-1 px-1 ${
                  language === 'en'
                    ? 'font-bold text-[var(--text-carbon)] underline underline-offset-4 decoration-1 decoration-current'
                    : 'font-normal text-[var(--text-muted)] hover:text-[var(--text-carbon)]'
                }`}
                aria-label="Switch language to English"
              >
                EN
              </button>

              <span className="text-[var(--border-sharp)] select-none">|</span>

              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`cursor-pointer transition-colors py-1 px-1 ${
                  language === 'fr'
                    ? 'font-bold text-[var(--text-carbon)] underline underline-offset-4 decoration-1 decoration-current'
                    : 'font-normal text-[var(--text-muted)] hover:text-[var(--text-carbon)]'
                }`}
                aria-label="Changer la langue en Français"
              >
                FR
              </button>
            </div>

            {/* Mobile Burger Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 border border-[var(--border-carbon)] text-[var(--text-carbon)] bg-[var(--bg-paper)] hover:opacity-70 transition-opacity cursor-pointer flex items-center justify-center"
              aria-label="Ouvrir le menu de navigation"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Mobile Full Screen Menu Overlay inside Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 bg-[var(--bg-paper)] text-[var(--text-carbon)] flex flex-col justify-between pt-20 pb-10 px-8 select-none md:hidden border-b border-[var(--border-carbon)]"
            >
              <div className="absolute top-4 right-6">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 border border-[var(--border-carbon)] text-[var(--text-carbon)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-6 my-auto font-mono-custom">
                <button
                  type="button"
                  onClick={() => handleNavClick('home')}
                  className="text-left text-3xl font-black tracking-tight uppercase hover:opacity-60 transition-opacity py-2 border-b border-[var(--border-sharp)]"
                >
                  01 / {t('nav.home')}
                </button>
                <button
                  type="button"
                  onClick={handleOpenAboutFromDrawer}
                  className="text-left text-3xl font-black tracking-tight uppercase hover:opacity-60 transition-opacity py-2 border-b border-[var(--border-sharp)]"
                >
                  02 / {t('nav.about')}
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('projects')}
                  className="text-left text-3xl font-black tracking-tight uppercase hover:opacity-60 transition-opacity py-2 border-b border-[var(--border-sharp)]"
                >
                  03 / {t('nav.projects')}
                </button>
              </div>

              <div className="pt-6 space-y-4 font-mono-custom text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="/cv-mickael-lin.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-[var(--border-carbon)] flex items-center justify-center gap-2 font-bold uppercase text-center"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>CV (PDF)</span>
                  </a>
                  <a
                    href="mailto:mickael.lin.etud@gmail.com"
                    className="p-3 bg-[var(--text-carbon)] text-[var(--bg-paper)] flex items-center justify-center gap-2 font-bold uppercase text-center"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>CONTACT</span>
                  </a>
                </div>

                <div className="text-[10px] text-[var(--text-muted)] text-center pt-2">
                  <span>© {new Date().getFullYear()} MICKAEL LIN · PARIS</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Restrained & Refined Case Study Content Container */}
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 py-6 sm:py-10 space-y-9 sm:space-y-12">
          
          {/* Header Block & Integrated Metadata Ribbon */}
          <div className="space-y-5">
            <div className="space-y-2.5">
              <span className="font-mono-custom text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] block transition-colors duration-300">
                {project.category[language]}
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--text-carbon)] uppercase leading-tight transition-colors duration-300">
                {project.title}
              </h1>

              <p className="text-base sm:text-lg text-[var(--text-carbon)] font-normal max-w-4xl leading-relaxed transition-colors duration-300">
                {project.tagline[language]}
              </p>
            </div>

            {/* Metadata Grid (Balanced Architectural Ribbon) */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-y border-[var(--border-sharp)] py-4 sm:py-5 font-mono-custom text-xs gap-5 md:gap-8 transition-colors duration-300">
              <div className="space-y-1">
                <span className="text-[var(--text-muted)] text-[10px] sm:text-[11px] uppercase tracking-widest block">{t('drawer.role')}</span>
                <span className="text-[var(--text-carbon)] font-bold text-xs sm:text-sm block">{project.metadataBar.role[language]}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[var(--text-muted)] text-[10px] sm:text-[11px] uppercase tracking-widest block">{t('drawer.timeline')}</span>
                <span className="text-[var(--text-carbon)] font-bold text-xs sm:text-sm block">{project.metadataBar.context[language]}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[var(--text-muted)] text-[10px] sm:text-[11px] uppercase tracking-widest block">{t('drawer.tools')}</span>
                <span className="text-[var(--text-carbon)] font-bold text-xs sm:text-sm block">{project.metadataBar.tools}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[var(--text-muted)] text-[10px] sm:text-[11px] uppercase tracking-widest block">{t('drawer.discipline')}</span>
                <span className="text-[var(--text-carbon)] font-bold text-xs sm:text-sm block">{project.metadataBar.discipline[language]}</span>
              </div>
            </div>

            {/* External Link Action Button (e.g. Notion Profile / Live Site) */}
            {project.externalLink && (
              <div className="pt-0.5">
                <a
                  href={project.externalLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-carbon)] bg-[var(--text-carbon)] text-[var(--bg-paper)] font-mono-custom text-xs font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
                >
                  <span>{project.externalLink.label[language]}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* 01 / Le Projet (Contexte & Objectif) */}
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block transition-colors duration-300">
                {t('drawer.context')}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-carbon)] tracking-tight uppercase leading-snug transition-colors duration-300">
                {project.sectionHeadings.context[language]}
              </h3>
              <p className="text-sm sm:text-base text-[var(--text-carbon)] leading-relaxed font-normal pt-1 max-w-4xl transition-colors duration-300">
                {project.problem[language]}
              </p>
            </div>

            {/* Main Overview Image (Only for standard single-layout projects) */}
            {!project.parts && project.overviewImage && (
              <div className="w-full flex justify-center">
                <img
                  src={project.overviewImage || project.thumbnail}
                  alt={project.title}
                  className="w-full h-auto object-contain border border-[var(--border-carbon)] shadow-xs block"
                />
              </div>
            )}
          </div>

          {/* CASE A: SEQUENTIAL 2-PART LAYOUT (FOR NOTION WORKSPACES) */}
          {project.parts && project.parts.length > 0 ? (
            <div className="space-y-14">
              {project.parts.map((part) => (
                <div key={part.number} className="border-t border-[var(--border-sharp)] pt-10 space-y-8 transition-colors duration-300">
                  {/* Part Header */}
                  <div className="space-y-3">
                    <span className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block transition-colors duration-300">
                      {part.tag[language]}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-carbon)] tracking-tight uppercase leading-tight transition-colors duration-300">
                      {part.title[language]}
                    </h3>
                    <p className="text-sm sm:text-base text-[var(--text-carbon)] leading-relaxed font-normal pt-1 max-w-4xl transition-colors duration-300">
                      {part.description[language]}
                    </p>
                  </div>

                  {/* Part Banner Image */}
                  {part.bannerImage && (
                    <div className="w-full flex justify-center">
                      <img
                        src={part.bannerImage}
                        alt={`${part.title[language]} Banner`}
                        className="w-full h-auto object-contain border border-[var(--border-carbon)] shadow-xs block"
                      />
                    </div>
                  )}

                  {/* Part Main Dashboard Screenshot */}
                  {part.mainImage && (
                    <div className="w-full flex justify-center">
                      <img
                        src={part.mainImage}
                        alt={`${part.title[language]} Dashboard`}
                        className="w-full h-auto object-contain border border-[var(--border-carbon)] shadow-xs block"
                      />
                    </div>
                  )}

                  {/* Part Modular Screens (Triptych Grid) */}
                  {part.screens && part.screens.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 items-stretch">
                      {part.screens.map((screen, sIdx) => (
                        <div
                          key={sIdx}
                          className="overflow-hidden border border-[var(--border-carbon)] bg-[#191919] shadow-xs flex flex-col justify-center items-center"
                        >
                          <img
                            src={screen}
                            alt={`${part.title[language]} View ${sIdx + 1}`}
                            className="w-full h-full object-cover block"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* CASE B: STANDARD SINGLE PROJECT LAYOUT */
            <div className="border-t border-[var(--border-sharp)] pt-10 space-y-8 transition-colors duration-300">
              <div className="space-y-3">
                <span className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block transition-colors duration-300">
                  {t('drawer.usage')}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-carbon)] tracking-tight uppercase leading-snug transition-colors duration-300">
                  {project.sectionHeadings.usage[language]}
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-carbon)] leading-relaxed font-normal pt-1 max-w-4xl transition-colors duration-300">
                  {project.solution[language]}
                </p>
              </div>

              {/* Screens Showcase */}
              {project.screens && project.screens.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 items-stretch">
                  {project.screens.map((screen, idx) => (
                    <div
                      key={idx}
                      className="overflow-hidden border border-[var(--border-carbon)] bg-[var(--bg-surface)] shadow-xs transition-colors duration-300 flex flex-col justify-center items-center"
                    >
                      <img
                        src={screen}
                        alt={`${project.title} Screen ${idx + 1}`}
                        className="w-full h-full object-cover block"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 03 / Identité Visuelle & Tokens (Only shown if defined) */}
          {project.brandAndDesignSystem && (
            <div className="border-t border-[var(--border-sharp)] pt-10 space-y-6 transition-colors duration-300">
              <div>
                <span className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1 transition-colors duration-300">
                  {t('drawer.brand')}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-carbon)] tracking-tight uppercase mb-3 transition-colors duration-300">
                  {project.sectionHeadings.brand?.[language]}
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-carbon)] leading-relaxed max-w-4xl font-normal transition-colors duration-300">
                  {project.brandAndDesignSystem.concept[language]}
                </p>
              </div>

              {/* Color Palette Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {project.brandAndDesignSystem.colorPalette.map((color, idx) => {
                  const hex = color.hex.replace('#', '');
                  const r = parseInt(hex.substring(0, 2), 16) || 0;
                  const g = parseInt(hex.substring(2, 4), 16) || 0;
                  const b = parseInt(hex.substring(4, 6), 16) || 0;
                  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                  const isLight = luminance > 0.6;

                  return (
                    <div
                      key={idx}
                      className="border border-[var(--border-carbon)] p-4 flex flex-col justify-between h-24 sm:h-28 shadow-xs"
                      style={{ backgroundColor: color.hex }}
                    >
                      <span
                        className={`font-mono-custom text-[11px] font-bold uppercase tracking-wider ${
                          isLight ? 'text-[#1A1A1A]' : 'text-[#F4F3EF]'
                        }`}
                      >
                        {color.name}
                      </span>

                      <div className={`border-t pt-2 ${isLight ? 'border-black/20' : 'border-white/20'}`}>
                        <span
                          className={`font-mono-custom text-xs font-extrabold ${
                            isLight ? 'text-[#1A1A1A]' : 'text-[#F4F3EF]'
                          }`}
                        >
                          {color.hex}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Typography Specimen */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {project.brandAndDesignSystem.typography.map((type, idx) => (
                  <div key={idx} className="border border-[var(--border-carbon)] p-5 bg-[var(--bg-surface)] space-y-2 transition-colors duration-300">
                    <div className="border-b border-[var(--border-sharp)] pb-2 transition-colors duration-300">
                      <span className="font-mono-custom text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        {t('drawer.typeface')} {idx + 1}
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-[var(--text-carbon)] tracking-tight transition-colors duration-300">
                      {type.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 04 / Bilan & Ce que j'en retiens */}
          {project.takeaway && (
            <div className="border-t border-[var(--border-sharp)] pt-10 space-y-3 transition-colors duration-300">
              <span className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block transition-colors duration-300">
                {t('drawer.takeaway')}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-carbon)] tracking-tight uppercase leading-snug transition-colors duration-300">
                {project.sectionHeadings.takeaway[language]}
              </h3>
              <p className="text-sm sm:text-base text-[var(--text-carbon)] leading-relaxed font-normal pt-1 max-w-4xl transition-colors duration-300">
                {project.takeaway[language]}
              </p>
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="border-t border-[var(--border-sharp)] pt-8 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-custom text-xs select-none transition-colors duration-300">
            <button
              type="button"
              onClick={() => {
                if (onSelectProject) onSelectProject(prevProject);
              }}
              className="group inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-carbon)] transition-colors cursor-pointer py-2 w-full sm:w-auto justify-start"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{t('drawer.prev')} ({prevProject.title})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (onSelectProject) onSelectProject(nextProject);
              }}
              className="group inline-flex items-center gap-2 font-bold text-[var(--text-carbon)] hover:opacity-60 transition-opacity cursor-pointer py-2 w-full sm:w-auto justify-end"
            >
              <span>{t('drawer.next')} ({nextProject.title})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
