import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onOpenAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAbout }) => {
  const { language, setLanguage, t } = useLanguage();

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-14 sm:h-16 z-40 pointer-events-none px-6 sm:px-12 lg:px-16 flex justify-between items-center text-xs tracking-wider uppercase font-mono-custom text-[#1A1A1A]">
      {/* Invisible spacer on left for perfect centering */}
      <div className="w-16 hidden sm:block pointer-events-none" />

      {/* 3 Clickable Links — Centered in Upper Header Grid Cell */}
      <nav className="pointer-events-auto flex items-center gap-8 md:gap-12 mx-auto sm:mx-0">
        <button
          onClick={() => scrollToSection('home')}
          className="link-drawer hover:text-black transition-colors cursor-pointer py-1 text-[11px] sm:text-xs font-bold"
        >
          {t('nav.home')}
        </button>
        <button
          onClick={onOpenAbout}
          className="link-drawer hover:text-black transition-colors cursor-pointer py-1 text-[11px] sm:text-xs font-bold"
        >
          {t('nav.about')}
        </button>
        <button
          onClick={() => scrollToSection('projects')}
          className="link-drawer hover:text-black transition-colors cursor-pointer py-1 text-[11px] sm:text-xs font-bold"
        >
          {t('nav.projects')}
        </button>
      </nav>

      {/* Language Switcher Button — Right Side of the Header (EN | FR with Vertical Bar) */}
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono-custom">
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
  );
};
