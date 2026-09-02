import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'nav.home': 'HOME',
    'nav.about': 'ABOUT',
    'nav.projects': 'PROJECTS',

    // Hero
    'hero.role': 'UX/UI / NO-CODE / WEBDESIGN',
    'hero.scroll': 'SCROLL TO CONTINUE',
    'hero.status': 'SEEKING APPRENTICESHIP - AVAILABLE NOW - PARIS',

    // Projects Section
    'projects.title': 'PROJECTS',

    // Case Study Drawer
    'drawer.back': 'BACK TO PROJECTS',
    'drawer.role': '01 / ROLE',
    'drawer.timeline': '02 / TIMELINE',
    'drawer.tools': '03 / TOOLS',
    'drawer.discipline': '04 / DISCIPLINE',
    'drawer.friction': '01 / THE FRICTION',
    'drawer.friction_sub': 'Why voice memos fail to turn into actions.',
    'drawer.focus': '[ FOCUS: ELIMINATING COGNITIVE DRAG ]',
    'drawer.solution': '02 / THE SOLUTION',
    'drawer.solution_sub': 'Single-tap capture paired with time-based recall.',
    'drawer.brand': '03 / BRAND ARCHITECTURE',
    'drawer.brand_title': 'Concept & Visual Tokens',
    'drawer.typeface': 'TYPEFACE',
    'drawer.next': 'NEXT CASE STUDY →',

    // About Modal
    'about.title': 'MICKAEL LIN',
    'about.badge': 'AVAILABLE NOW',
    'about.bio': 'Junior UX/UI Designer & Web Designer based in Paris. Passionate about brutalist minimalism, structural typography, and high-efficiency interfaces.',
    'about.skills_title': 'SPECIALIZATIONS & TOOLS',
    'about.contact_title': 'GET IN TOUCH',
    'about.close': 'CLOSE',

    // Footer
    'footer.talk': "LET'S BUILD SOMETHING EXCEPTIONAL TOGETHER.",
    'footer.contact': 'CONTACT',
    'footer.status': 'SEEKING APPRENTICESHIP · AVAILABLE NOW',
    'footer.rights': 'ALL RIGHTS RESERVED',
  },
  fr: {
    // Header
    'nav.home': 'ACCUEIL',
    'nav.about': 'À PROPOS',
    'nav.projects': 'PROJETS',

    // Hero
    'hero.role': 'UX/UI / NO-CODE / WEBDESIGN',
    'hero.scroll': 'DÉFILER POUR CONTINUER',
    'hero.status': 'RECHERCHE ALTERNANCE - DISPONIBLE MAINTENANT - PARIS',

    // Projects Section
    'projects.title': 'PROJETS',

    // Case Study Drawer
    'drawer.back': 'RETOUR AUX PROJETS',
    'drawer.role': '01 / RÔLE',
    'drawer.timeline': '02 / CALENDRIER',
    'drawer.tools': '03 / OUTILS',
    'drawer.discipline': '04 / DISCIPLINE',
    'drawer.friction': '01 / LA FRICTION',
    'drawer.friction_sub': 'Pourquoi les mémos vocaux peinent à devenir des actions.',
    'drawer.focus': '[ OBJECTIF : ÉLIMINER LA CHARGE COGNITIVE ]',
    'drawer.solution': '02 / LA SOLUTION',
    'drawer.solution_sub': 'Capture en un clic combinée à des rappels temporels ciblés.',
    'drawer.brand': '03 / ARCHITECTURE DE MARQUE',
    'drawer.brand_title': 'Concept & Système Visuel',
    'drawer.typeface': 'TYPOGRAPHIE',
    'drawer.next': 'PROJET SUIVANT →',

    // About Modal
    'about.title': 'MICKAEL LIN',
    'about.badge': 'DISPONIBLE IMMÉDIATEMENT',
    'about.bio': 'UX/UI Designer & Web Designer junior basé à Paris. Passionné par le minimalisme éditorial, la typographie monumentale et les interfaces à haute efficacité.',
    'about.skills_title': 'SPÉCIALISATIONS & OUTILS',
    'about.contact_title': 'ME CONTACTER',
    'about.close': 'FERMER',

    // Footer
    'footer.talk': 'CONCEVONS QUELQUE CHOSE D’EXCEPTIONNEL ENSEMBLE.',
    'footer.contact': 'CONTACT',
    'footer.status': 'RECHERCHE ALTERNANCE · DISPONIBLE MAINTENANT',
    'footer.rights': 'TOUS DROITS RÉSERVÉS',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_lang') as Language;
    if (saved === 'en' || saved === 'fr') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
