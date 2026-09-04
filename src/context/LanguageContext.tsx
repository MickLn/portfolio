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
    'hero.status': 'SEEKING APPRENTICESHIP - AVAILABLE ASAP (PARIS)',

    // Projects Section
    'projects.title': 'PROJECTS',

    // Case Study Drawer
    'drawer.back': 'BACK TO PROJECTS',
    'drawer.role': 'ROLE',
    'drawer.timeline': 'TIMELINE',
    'drawer.tools': 'TOOLS',
    'drawer.discipline': 'DISCIPLINE',
    'drawer.context': '01 / THE PROJECT',
    'drawer.context_sub': 'Brief & Collaborative Sprint',
    'drawer.usage': '02 / USAGE & EXPERIENCE',
    'drawer.usage_sub': 'Instant capture & spontaneous thoughts',
    'drawer.brand': '03 / VISUAL IDENTITY',
    'drawer.brand_title': 'Natural Tones & Brand Concept',
    'drawer.takeaway': '04 / KEY TAKEAWAY',
    'drawer.takeaway_sub': 'Learning & UX perspective',
    'drawer.typeface': 'TYPEFACE',
    'drawer.next': 'NEXT PROJECT',
    'drawer.prev': 'PREVIOUS PROJECT',

    // About Dedicated Page
    'about.back': 'BACK TO PROJECTS',
    'about.tag': 'PROFILE & BACKGROUND',
    'about.title': 'MICKAEL LIN',
    'about.subtitle': 'UX/UI / No-code / Webdesign — Seeking Apprenticeship in Paris (Available ASAP)',
    'about.badge': 'AVAILABLE ASAP · PARIS',
    'about.section_background': '01 / EDUCATION & BACKGROUND',
    'about.section_background_title': 'ACADEMIC BACKGROUND',
    'about.background_text': 'I am currently a 3rd-year student (B3) in Digital Creation & Interface Design at ESD Paris. Prior to that, I studied Economics at Paris 1 Panthéon-Sorbonne University. Today, I focus on building clean interfaces in Figma and developing websites with code (HTML, CSS, JavaScript) and No-code tools.',
    
    'about.section_skills': '02 / SKILLS',
    'about.section_skills_title': 'TECHNICAL SKILLS & SOFT SKILLS',
    'about.hard_skills_title': 'TOOLS',
    'about.soft_skills_title': 'SOFT SKILLS',

    'about.section_passions': '03 / BEYOND THE SCREEN & HOBBIES',
    'about.section_passions_title': 'GASTRONOMY, RUNNING & PHOTOGRAPHY',
    'about.passion_food_title': 'Gastronomy & Culinary Exploration',
    'about.passion_food_text': 'Outside of design and academics, I love discovering new restaurants, world cuisines, and unexpected flavor pairings. It is a genuine curiosity for crafted details that I document and share visually.',
    'about.passion_photo_title': 'Photography & Daily Atmosphere',
    'about.passion_photo_text': 'Whether capturing an artisanal dish, sunset light on the highway, or urban architecture, I love freezing everyday atmospheres and training my eye on composition and lighting.',
    'about.passion_run_title': 'Running & Paris Marathon 2027 Challenge',
    'about.passion_run_text': 'Running is my daily reset for physical and mental balance, an essential outlet to clear my head and build endurance. I am currently training for my first major milestone, the 2027 Paris Marathon!',

    'about.section_gallery': '04 / VISUAL DIARY & ATMOSPHERES',
    'about.section_gallery_title': 'MOMENTS & PERSPECTIVES',
    'about.gallery_food': 'Culinary exploration & table gathering',
    'about.gallery_paris': 'Parisian perspective & Eiffel Tower',
    'about.gallery_sunset': 'Golden hour & highway silhouette',
    'about.gallery_pool': 'Pastel architecture & summer tones',

    'about.section_contact': '05 / CONTACT & RESUME',
    'about.section_contact_title': 'LET’S COLLABORATE',
    'about.contact_text': 'Available immediately for an apprenticeship contract in UX/UI Design, Webdesign, or No-code integration in Paris / Île-de-France.',
    'about.cta_contact': 'SEND AN EMAIL',
    'about.cta_cv': 'DOWNLOAD RESUME (PDF)',
    'about.cta_linkedin': 'LINKEDIN PROFILE',
    'about.cta_notion': 'NOTION PROFILE',

    // Footer
    'footer.status': 'SEEKING APPRENTICESHIP · UX/UI / NO-CODE / WEBDESIGN · AVAILABLE ASAP (PARIS)',
    'footer.headline': 'Looking for an apprenticeship in UX/UI Design, Webdesign or No-code integration.',
    'footer.sub': 'Ready to bring design rigor in Figma and user-centric problem solving to your team.',
    'footer.cta_contact': 'CONTACT ME',
    'footer.cta_cv': 'CV (PDF)',
    'footer.cta_about': 'ABOUT ME',
    'footer.rights': 'ALL RIGHTS RESERVED',
    'footer.back_top': 'BACK TO TOP',
  },
  fr: {
    // Header
    'nav.home': 'ACCUEIL',
    'nav.about': 'À PROPOS',
    'nav.projects': 'PROJETS',

    // Hero
    'hero.role': 'UX/UI / NO-CODE / WEBDESIGN',
    'hero.scroll': 'DÉFILER POUR CONTINUER',
    'hero.status': 'RECHERCHE ALTERNANCE - DISPONIBLE DÈS QUE POSSIBLE (PARIS)',

    // Projects Section
    'projects.title': 'PROJETS',

    // Case Study Drawer
    'drawer.back': 'RETOUR AUX PROJETS',
    'drawer.role': 'RÔLE',
    'drawer.timeline': 'CALENDRIER',
    'drawer.tools': 'OUTILS',
    'drawer.discipline': 'DISCIPLINE',
    'drawer.context': '01 / LE PROJET',
    'drawer.context_sub': 'Brief & Sprint en équipe',
    'drawer.usage': '02 / L’USAGE & EXPÉRIENCE',
    'drawer.usage_sub': 'Capture instantanée & flux des idées',
    'drawer.brand': '03 / IDENTITÉ VISUELLE',
    'drawer.brand_title': 'Teintes naturelles & Concept',
    'drawer.takeaway': '04 / CE QUE J’EN RETIENS',
    'drawer.takeaway_sub': 'Apprentissage & Regard UX',
    'drawer.typeface': 'TYPOGRAPHIE',
    'drawer.next': 'PROJET SUIVANT',
    'drawer.prev': 'PROJET PRÉCÉDENT',

    // About Dedicated Page
    'about.back': 'RETOUR AUX PROJETS',
    'about.tag': 'PROFIL & PARCOURS',
    'about.title': 'MICKAEL LIN',
    'about.subtitle': 'UX/UI / No-code / Webdesign — Recherche Alternance à Paris (Disponible dès que possible)',
    'about.badge': 'DISPONIBLE DÈS QUE POSSIBLE · PARIS',
    'about.section_background': '01 / FORMATION & PARCOURS',
    'about.section_background_title': 'FORMATION ACADÉMIQUE',
    'about.background_text': 'Je suis actuellement étudiant en 3e année (B3) de Création Digitale & Design d’Interface à l’ESD Paris. Avant cela, j’ai suivi un cursus en Économie à l’Université Paris 1 Panthéon-Sorbonne. Aujourd’hui, je conçois des maquettes claires sur Figma et j’intègre des sites web avec du code (HTML, CSS, JavaScript) et des outils No-code.',
    
    'about.section_skills': '02 / COMPÉTENCES',
    'about.section_skills_title': 'COMPÉTENCES & SOFT SKILLS',
    'about.hard_skills_title': 'OUTILS',
    'about.soft_skills_title': 'SOFT SKILLS',

    'about.section_passions': '03 / HORS ÉCRAN & PASSIONS',
    'about.section_passions_title': 'GASTRONOMIE, COURSE À PIED & PHOTOGRAPHIE',
    'about.passion_food_title': 'Gastronomie & Découvertes culinaires',
    'about.passion_food_text': 'En dehors du design et des cours, j’adore tester de nouvelles adresses, explorer les cuisines du monde et découvrir des associations de saveurs inédites. Une vraie curiosité pour le travail bien fait que j’aime capturer en photo.',
    'about.passion_photo_title': 'Photographie & Sens du détail',
    'about.passion_photo_text': 'Qu’il s’agisse d’un plat soigné au restaurant, d’une lumière de fin de journée sur la route ou d’une perspective urbaine, j’aime figer les atmosphères du quotidien et exercer mon regard sur la composition et les contrastes.',
    'about.passion_run_title': 'Course à pied & Défi Marathon de Paris 2027',
    'about.passion_run_text': 'La course à pied est mon rituel d’équilibre physique et mental, un échappatoire indispensable pour prendre l’air et cultiver l’endurance. Je me prépare actuellement pour mon tout premier grand défi, le Marathon de Paris 2027 !',

    'about.section_gallery': '04 / CARNET VISUEL & ATMOSPHÈRES',
    'about.section_gallery_title': 'INSTANTS & PERSPECTIVES',
    'about.gallery_food': 'Découverte culinaire & partage à table',
    'about.gallery_paris': 'Perspective aérienne & Tour Eiffel',
    'about.gallery_sunset': 'Lumière dorée & horizon routier',
    'about.gallery_pool': 'Architecture pastel & teintes estivales',

    'about.section_contact': '05 / CONTACT & RECRUTEMENT',
    'about.section_contact_title': 'CONSTRUISONS ENSEMBLE',
    'about.contact_text': 'Disponible immédiatement pour un contrat d’alternance en UX/UI Design, Webdesign ou intégration No-code à Paris / Île-de-France.',
    'about.cta_contact': 'M’ENVOYER UN EMAIL',
    'about.cta_cv': 'TÉLÉCHARGER MON CV (PDF)',
    'about.cta_linkedin': 'PROFIL LINKEDIN',
    'about.cta_notion': 'PROFIL NOTION',

    // Footer
    'footer.status': 'RECHERCHE ALTERNANCE · UX/UI / NO-CODE / WEBDESIGN · DISPONIBLE DÈS QUE POSSIBLE (PARIS)',
    'footer.headline': 'À la recherche d’une alternance en UX/UI Design, Webdesign ou intégration No-code.',
    'footer.sub': 'Prêt à apporter ma rigueur de conception sous Figma, mon sens du détail et mon autonomie à vos projets.',
    'footer.cta_contact': 'ME CONTACTER',
    'footer.cta_cv': 'CV (PDF)',
    'footer.cta_about': 'À PROPOS',
    'footer.rights': 'TOUS DROITS RÉSERVÉS',
    'footer.back_top': 'REMONTER EN HAUT',
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

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
