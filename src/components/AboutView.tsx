import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Footer } from './Footer';

interface AboutViewProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateHome?: () => void;
  onNavigateProjects?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ 
  isOpen, 
  onClose,
  onNavigateHome,
  onNavigateProjects
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleNavHome = () => {
    setIsMobileMenuOpen(false);
    onClose();
    if (onNavigateHome) {
      setTimeout(() => {
        onNavigateHome();
      }, 450);
    } else {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 450);
    }
  };

  const handleNavProjects = () => {
    setIsMobileMenuOpen(false);
    onClose();
    if (onNavigateProjects) {
      setTimeout(() => {
        onNavigateProjects();
      }, 450);
    } else {
      setTimeout(() => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 450);
    }
  };

  const handleNavAbout = () => {
    setIsMobileMenuOpen(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const hardSkills = [
    { 
      name: 'Figma', 
      desc: language === 'en' ? 'Design systems, UI components, auto-layout & prototypes' : 'Design systems, composants UI, auto-layout & prototypes' 
    },
    { 
      name: 'Notion', 
      desc: language === 'en' ? 'Relational databases, formula logic & modular templates' : 'Bases de données relationnelles, formules & templates modulaires' 
    },
    { 
      name: 'DaVinci Resolve', 
      desc: language === 'en' ? 'Video editing, color grading & social media formats' : 'Montage vidéo, colorimétrie & formats réseaux sociaux' 
    },
    { 
      name: 'CMS & Web', 
      desc: language === 'en' ? 'WordPress, Elementor Pro & landing page integration' : 'WordPress, Elementor Pro & intégration de landing pages' 
    },
    { 
      name: 'Code', 
      desc: 'HTML / CSS / JS' 
    },
  ];

  const softSkills = [
    { 
      title: language === 'en' ? 'Empathic' : 'Empathique', 
      desc: language === 'en' ? 'Deep active listening to user needs and business goals' : 'Écoute active des besoins utilisateurs et des enjeux métier' 
    },
    { 
      title: language === 'en' ? 'Meticulous' : 'Pointilleux', 
      desc: language === 'en' ? 'Obsession for 1px alignment, token consistency and micro-details' : 'Rigueur au pixel près, respect strict des tokens et micro-détails' 
    },
    { 
      title: language === 'en' ? 'Resilient' : 'Résilient', 
      desc: language === 'en' ? 'Perseverance facing technical challenges and continuous learning' : 'Persévérance face aux défis techniques et envie continue d’apprendre' 
    },
    { 
      title: language === 'en' ? 'Patient' : 'Patient', 
      desc: language === 'en' ? 'Methodical execution from sprint planning to user testing' : 'Démarche structurée, du cadrage initial aux tests utilisateurs' 
    },
    { 
      title: language === 'en' ? 'Curious' : 'Curieux', 
      desc: language === 'en' ? 'Continuous exploration of food culture, street art and visual design' : 'Veille permanente, passion pour la gastronomie et le street art' 
    },
  ];

  const galleryImages = [
    {
      src: '/about/food-table.jpg',
      alt: 'Gastronomie & Table de partage',
    },
    {
      src: '/about/paris-eiffel.jpg',
      alt: 'Paris & Tour Eiffel perspective aérienne',
    },
    {
      src: '/about/sunset-road.jpg',
      alt: 'Coucher de soleil écarlate',
    },
    {
      src: '/about/pool-architecture.jpg',
      alt: 'Architecture pastel & teintes estivales',
    },
  ];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div 
          key="about-view-container"
          ref={scrollContainerRef}
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-[var(--bg-paper)] text-[var(--text-carbon)] select-none transition-colors duration-300"
        >
          
          {/* ========================================================================= */}
          {/* CENTER SPLIT CURTAIN ANIMATION (Volets bilatéraux ultra-smooth aux teintes projet) */}
          {/* ========================================================================= */}
          
          {/* Left Curtain */}
          <motion.div
            key="about-curtain-left"
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            exit={{ x: 0 }}
            transition={{ duration: 0.85, ease: [0.65, 0, 0.05, 1] }}
            className="fixed inset-y-0 left-0 w-1/2 bg-[#EAE8E2] dark:bg-[#1A1A1A] z-[100] pointer-events-none border-r border-[#1A1A1A] dark:border-[#333333] transition-colors duration-300"
          />
          
          {/* Right Curtain */}
          <motion.div
            key="about-curtain-right"
            initial={{ x: 0 }}
            animate={{ x: '100%' }}
            exit={{ x: 0 }}
            transition={{ duration: 0.85, ease: [0.65, 0, 0.05, 1] }}
            className="fixed inset-y-0 right-0 w-1/2 bg-[#EAE8E2] dark:bg-[#1A1A1A] z-[100] pointer-events-none border-l border-[#1A1A1A] dark:border-[#333333] transition-colors duration-300"
          />

          {/* Centered Monogram / Label that fades out during curtain parting and reappears on exit */}
          <motion.div
            key="about-curtain-badge"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0.96 }}
            exit={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[101] pointer-events-none flex items-center justify-center font-mono-custom text-xs font-bold tracking-widest uppercase text-[#1A1A1A] dark:text-[#F4F3EF]"
          >
            <span className="px-5 py-2.5 border border-[#1A1A1A] dark:border-[#333333] bg-[#EAE8E2] dark:bg-[#1A1A1A] shadow-xs">
              02 / {t('nav.about')}
            </span>
          </motion.div>

          {/* ========================================================================= */}
          {/* 1. EDITORIAL TOP NAVIGATION BAR (ZERO BACKGROUND, ZERO BORDER LIKE HOME) */}
          {/* ========================================================================= */}
          <header className="sticky top-0 z-40 w-full h-14 sm:h-16 bg-transparent px-6 sm:px-12 lg:px-24 flex items-center justify-between text-xs tracking-wider uppercase font-mono-custom text-[var(--text-carbon)] transition-colors duration-300">
            
            {/* 1. Left: Theme Toggle */}
            <div className="flex items-center justify-start w-28 sm:w-36">
              <button
                type="button"
                onClick={toggleTheme}
                className="group inline-flex items-center gap-2 cursor-pointer py-2 text-[11px] sm:text-xs text-[var(--text-muted)] hover:text-[var(--text-carbon)] transition-colors select-none"
                aria-label="Basculer le mode sombre ou clair"
              >
                <span className={`inline-block w-2.5 h-2.5 rounded-full border border-current transition-colors ${
                  theme === 'dark' ? 'bg-[var(--text-carbon)]' : 'bg-transparent'
                }`} />
                <span className="font-bold tracking-wider">
                  {theme === 'dark' ? 'LIGHT' : 'DARK'}
                </span>
              </button>
            </div>

            {/* 2. Center: 3 Navigation Tabs (Desktop, Clean without underline) */}
            <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 lg:gap-12">
              <button
                type="button"
                onClick={handleNavHome}
                className="link-drawer hover:opacity-70 transition-opacity cursor-pointer py-1 text-[11px] sm:text-xs font-bold"
              >
                {t('nav.home')}
              </button>
              <button
                type="button"
                onClick={handleNavAbout}
                className="link-drawer text-[var(--text-carbon)] hover:opacity-70 transition-opacity cursor-pointer py-1 text-[11px] sm:text-xs font-bold"
              >
                {t('nav.about')}
              </button>
              <button
                type="button"
                onClick={handleNavProjects}
                className="link-drawer hover:opacity-70 transition-opacity cursor-pointer py-1 text-[11px] sm:text-xs font-bold"
              >
                {t('nav.projects')}
              </button>
            </nav>

            {/* 3. Right: Language Switcher + Mobile Menu Button */}
            <div className="flex items-center justify-end w-28 sm:w-36 gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono-custom">
              {/* Language Switcher */}
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
                  aria-label="Passer en français"
                >
                  FR
                </button>
              </div>

              {/* Mobile Burger Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-[var(--text-carbon)] hover:opacity-60 transition-opacity cursor-pointer ml-1"
                aria-label="Ouvrir le menu de navigation"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </header>

          {/* Mobile Navigation Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-x-0 top-14 sm:top-16 bottom-0 bg-[var(--bg-paper)] z-50 p-6 flex flex-col justify-between font-mono-custom border-b border-[var(--border-carbon)]"
              >
                <div className="flex flex-col space-y-4 pt-4">
                  <button
                    type="button"
                    onClick={handleNavHome}
                    className="text-left text-3xl font-black tracking-tight uppercase hover:opacity-60 transition-opacity py-2 border-b border-[var(--border-sharp)]"
                  >
                    01 / {t('nav.home')}
                  </button>
                  <button
                    type="button"
                    onClick={handleNavAbout}
                    className="text-left text-3xl font-black tracking-tight uppercase hover:opacity-60 transition-opacity py-2 border-b border-[var(--border-sharp)]"
                  >
                    02 / {t('nav.about')}
                  </button>
                  <button
                    type="button"
                    onClick={handleNavProjects}
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ========================================================================= */}
          {/* 2. MAIN EDITORIAL SLIDING CONTAINER (REVEALING STICKY FOOTER UNDERNEATH) */}
          {/* ========================================================================= */}
          <div className="relative z-10 bg-[var(--bg-paper)] border-b border-[var(--border-carbon)] transition-colors duration-300">
            <main className="w-full max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 py-8 sm:py-14 space-y-12 sm:space-y-16">
              

              {/* ======================================================================= */}
              {/* HEADER BLOCK & IDENTITY RIBBON */}
              {/* ======================================================================= */}
              <section className="space-y-6">
                <div className="space-y-2.5">
                  <span className="font-mono-custom text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] block">
                    {t('about.tag')}
                  </span>
                  
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase leading-tight text-[var(--text-carbon)]">
                    {t('about.title')}
                  </h1>

                  <p className="text-base sm:text-lg text-[var(--text-carbon)] max-w-3xl leading-relaxed">
                    {t('about.subtitle')}
                  </p>
                </div>

                {/* Status & Availability Ribbon */}
                <div className="border border-[var(--border-carbon)] bg-[var(--bg-surface)] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono-custom text-xs">
                  <div className="font-bold uppercase tracking-wider text-[var(--text-carbon)]">
                    {t('about.badge')}
                  </div>
                  <div className="text-[var(--text-muted)] uppercase">
                    PARIS · {language === 'en' ? 'APPRENTICESHIP CONTRACT' : 'CONTRAT D\'APPRENTISSAGE'}
                  </div>
                </div>
              </section>

              {/* ======================================================================= */}
              {/* SECTION 01: PARCOURS & FORMATION */}
              {/* ======================================================================= */}
              <section className="space-y-4 pt-2">
                <div className="border-b border-[var(--border-sharp)] pb-3">
                  <span className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                    {t('about.section_background')}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight uppercase text-[var(--text-carbon)]">
                    {t('about.section_background_title')}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                  <div className="md:col-span-8 space-y-4 text-sm sm:text-base leading-relaxed text-[var(--text-carbon)]">
                    <p>{t('about.background_text')}</p>
                  </div>

                  <div className="md:col-span-4 space-y-3 font-mono-custom text-xs">
                    <div className="border border-[var(--border-sharp)] p-3.5 bg-[var(--bg-surface)] space-y-1">
                      <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block">FORMATION ACTUELLE</span>
                      <span className="font-bold text-[var(--text-carbon)] block">ESD Paris — B3 Design d'Interface</span>
                      <span className="text-[var(--text-muted)] text-[11px] block">2024 - 2025</span>
                    </div>

                    <div className="border border-[var(--border-sharp)] p-3.5 bg-[var(--bg-surface)] space-y-1">
                      <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block">PARCOURS INITIAL</span>
                      <span className="font-bold text-[var(--text-carbon)] block">Panthéon-Sorbonne — Économie</span>
                      <span className="text-[var(--text-muted)] text-[11px] block">Paris 1</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* ======================================================================= */}
              {/* SECTION 02: COMPÉTENCES, OUTILS & SOFT SKILLS (PURE TYPOGRAPHY / NO ICONS) */}
              {/* ======================================================================= */}
              <section className="space-y-6 pt-2">
                <div className="border-b border-[var(--border-sharp)] pb-3">
                  <span className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                    {t('about.section_skills')}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight uppercase text-[var(--text-carbon)]">
                    {t('about.section_skills_title')}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* 1. Hard Skills / Tools */}
                  <div className="border border-[var(--border-carbon)] p-5 bg-[var(--bg-surface)] space-y-4">
                    <div className="border-b border-[var(--border-sharp)] pb-2.5">
                      <h3 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[var(--text-carbon)]">
                        {t('about.hard_skills_title')}
                      </h3>
                    </div>

                    <div className="space-y-3 font-mono-custom text-xs">
                      {hardSkills.map((skill, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <span className="font-bold text-[var(--text-carbon)] block">{skill.name}</span>
                          <span className="text-[11px] text-[var(--text-muted)] leading-tight block">{skill.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Soft Skills */}
                  <div className="border border-[var(--border-carbon)] p-5 bg-[var(--bg-surface)] space-y-4">
                    <div className="border-b border-[var(--border-sharp)] pb-2.5">
                      <h3 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[var(--text-carbon)]">
                        {t('about.soft_skills_title')}
                      </h3>
                    </div>

                    <div className="space-y-2.5 font-mono-custom text-xs">
                      {softSkills.map((soft, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <span className="font-bold text-[var(--text-carbon)] block">· {soft.title}</span>
                          <span className="text-[11px] text-[var(--text-muted)] leading-tight block pl-3">{soft.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* ======================================================================= */}
              {/* SECTION 03: PASSIONS & HORS TRAVAIL (PURE TYPOGRAPHY / NO ICONS) */}
              {/* ======================================================================= */}
              <section className="space-y-6 pt-2">
                <div className="border-b border-[var(--border-sharp)] pb-3">
                  <span className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                    {t('about.section_passions')}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight uppercase text-[var(--text-carbon)]">
                    {t('about.section_passions_title')}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  {/* Gastronomie */}
                  <div className="border border-[var(--border-sharp)] p-5 bg-[var(--bg-surface)] space-y-3">
                    <h3 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[var(--text-carbon)]">
                      {t('about.passion_food_title')}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-carbon)] leading-relaxed font-normal">
                      {t('about.passion_food_text')}
                    </p>
                  </div>

                  {/* Photographie */}
                  <div className="border border-[var(--border-sharp)] p-5 bg-[var(--bg-surface)] space-y-3">
                    <h3 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[var(--text-carbon)]">
                      {t('about.passion_photo_title')}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-carbon)] leading-relaxed font-normal">
                      {t('about.passion_photo_text')}
                    </p>
                  </div>

                  {/* Running / Marathon 2027 */}
                  <div className="border border-[var(--border-sharp)] p-5 bg-[var(--bg-surface)] space-y-3">
                    <h3 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[var(--text-carbon)]">
                      {t('about.passion_run_title')}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-carbon)] leading-relaxed font-normal">
                      {t('about.passion_run_text')}
                    </p>
                  </div>
                </div>
              </section>

              {/* ======================================================================= */}
              {/* SECTION 04: PHOTOGRAPHIE (PURE PHOTOS / NO DESCRIPTIONS / IPHONE 16 PRO MAX) */}
              {/* ======================================================================= */}
              <section className="space-y-4 pt-2">
                <div className="border-b border-[var(--border-sharp)] pb-3 flex items-center justify-between">
                  <div>
                    <span className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                      04 / {language === 'en' ? 'PHOTOGRAPHY' : 'PHOTOGRAPHIE'}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight uppercase text-[var(--text-carbon)]">
                      {language === 'en' ? 'PHOTOGRAPHY' : 'PHOTOGRAPHIE'}
                    </h2>
                  </div>
                  <span className="font-mono-custom text-xs font-bold text-[var(--text-carbon)] tracking-widest uppercase">
                    IPHONE 16 PRO MAX
                  </span>
                </div>

                {/* 4-Image Pure Sharp Grid (No text boxes below, no badges) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  {galleryImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="border border-[var(--border-carbon)] bg-[var(--bg-surface)] overflow-hidden group shadow-xs"
                    >
                      <div className="relative w-full h-72 sm:h-80 lg:h-96 overflow-hidden bg-[#1E1E1E]">
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-full object-cover grayscale-0 transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </main>
          </div>

          {/* ======================================================================= */}
          {/* 3. STICKY FOOTER UNDERNEATH (EXACT SAME REVEAL ANIMATION AS HOME PAGE) */}
          {/* ======================================================================= */}
          <div className="sticky bottom-0 left-0 w-full z-0">
            <Footer onOpenAbout={handleNavAbout} />
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
