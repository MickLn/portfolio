import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onOpenAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAbout }) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAboutFromMenu = () => {
    setIsMobileMenuOpen(false);
    onOpenAbout();
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-14 sm:h-16 z-50 pointer-events-none px-6 sm:px-12 lg:px-24 flex items-center justify-between text-xs tracking-wider uppercase font-mono-custom text-[var(--text-carbon)]">
        {/* 1. Left Column: Theme Switcher */}
        <div className="pointer-events-auto flex items-center justify-start w-28 sm:w-36">
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

        {/* 2. Center Navigation Links: Desktop Only (Zero Shift absolute centering) */}
        <nav className="pointer-events-auto absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 lg:gap-12">
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="link-drawer hover:opacity-70 transition-opacity cursor-pointer py-1 text-[11px] sm:text-xs font-bold"
          >
            {t('nav.home')}
          </button>
          <button
            type="button"
            onClick={onOpenAbout}
            className="link-drawer hover:opacity-70 transition-opacity cursor-pointer py-1 text-[11px] sm:text-xs font-bold"
          >
            {t('nav.about')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('projects')}
            className="link-drawer hover:opacity-70 transition-opacity cursor-pointer py-1 text-[11px] sm:text-xs font-bold"
          >
            {t('nav.projects')}
          </button>
        </nav>

        {/* 3. Right Column: Language Switcher + Mobile Menu Button */}
        <div className="pointer-events-auto flex items-center justify-end w-28 sm:w-36 gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono-custom">
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
              aria-label="Changer la langue en Français"
            >
              FR
            </button>
          </div>

          {/* Mobile Burger Menu Button (Visible on < md screens) */}
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

      {/* 4. Minimalist Mobile Drawer Overlay (Full Screen Editorial Menu) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[var(--bg-paper)] text-[var(--text-carbon)] flex flex-col justify-between pt-20 pb-10 px-8 select-none md:hidden border-b border-[var(--border-carbon)]"
          >
            {/* Navigation Links */}
            <div className="flex flex-col gap-6 my-auto font-mono-custom">
              <button
                type="button"
                onClick={() => scrollToSection('home')}
                className="text-left text-3xl font-black tracking-tight uppercase hover:opacity-60 transition-opacity py-2 border-b border-[var(--border-sharp)]"
              >
                01 / {t('nav.home')}
              </button>
              <button
                type="button"
                onClick={handleOpenAboutFromMenu}
                className="text-left text-3xl font-black tracking-tight uppercase hover:opacity-60 transition-opacity py-2 border-b border-[var(--border-sharp)]"
              >
                02 / {t('nav.about')}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="text-left text-3xl font-black tracking-tight uppercase hover:opacity-60 transition-opacity py-2 border-b border-[var(--border-sharp)]"
              >
                03 / {t('nav.projects')}
              </button>
            </div>

            {/* Quick Actions in Mobile Menu */}
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
                  <span>{language === 'en' ? 'CONTACT' : 'CONTACT'}</span>
                </a>
              </div>

              <div className="text-[10px] text-[var(--text-muted)] text-center pt-2">
                <span>© {new Date().getFullYear()} MICKAEL LIN · PARIS</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
