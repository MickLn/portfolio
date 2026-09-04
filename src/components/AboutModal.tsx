import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, CheckCircle2, FileText, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();

  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const skills = language === 'en' ? [
    'UX/UI Design & Wireframing (Figma)',
    'User Research & Ergonomic Audits',
    'No-code Integration & Web Design (WordPress)',
    'Modular Productivity Systems (Notion)',
    'Front-end Fundamentals (HTML / CSS / JavaScript)',
    'Creative Suite & Video Editing (DaVinci Resolve)'
  ] : [
    'Design d’Interface UX/UI & Wireframing (Figma)',
    'Recherche Utilisateur & Audits d’Ergonomie',
    'Intégration No-code & Web Design (WordPress)',
    'Systèmes Modulaires de Productivité (Notion)',
    'Bases Front-end (HTML / CSS / JavaScript)',
    'Création Visuelle & Montage Vidéo (DaVinci Resolve)'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1A1A1A]/70 dark:bg-black/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[var(--bg-paper)] border border-[var(--border-carbon)] p-6 md:p-10 z-10 max-h-[90vh] overflow-y-auto shadow-2xl transition-colors duration-300 select-none"
          >
            {/* Header / Close */}
            <div className="flex justify-between items-start border-b border-[var(--border-sharp)] pb-4 mb-6">
              <div>
                <span className="font-mono-custom text-xs uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                  {language === 'en' ? 'PROFILE METADATA' : 'MÉTADONNÉES DU PROFIL'}
                </span>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[var(--text-carbon)] uppercase">
                  Mickael LIN
                </h2>
                <p className="text-xs sm:text-sm font-mono-custom text-[var(--text-carbon)] mt-1 font-bold">
                  {language === 'en'
                    ? 'UX/UI & Web Designer — Seeking Apprenticeship (Paris / ASAP)'
                    : 'UX/UI & Web Designer — Recherche Alternance (Paris / Dès que possible)'}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 border border-[var(--border-carbon)] text-[var(--text-carbon)] hover:opacity-60 transition-opacity cursor-pointer"
                aria-label="Fermer la fenêtre"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="space-y-6 text-[var(--text-carbon)]">
              <div>
                <h3 className="font-mono-custom text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2 font-bold">
                  {language === 'en' ? 'PROFILE & OBJECTIVES' : 'PROFIL & OBJECTIFS'}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-[var(--text-carbon)] font-normal">
                  {language === 'en'
                    ? 'Student in Bachelor (B3) Digital Creation & Interface Design at ESD Paris, with a background in Economics at Panthéon-Sorbonne. Combining user empathy, strict layout discipline in Figma, and solid technical understanding (HTML, CSS, JS, No-code) to ship robust interfaces.'
                    : 'Étudiant en Bachelor (B3) Création Digitale & Design d’Interface à l’ESD Paris, fort d’un parcours initial en Économie à Panthéon-Sorbonne. J’allie empathie utilisateur, rigueur visuelle sous Figma et compréhension technique (HTML, CSS, JS, No-code) pour concevoir des produits clairs et performants.'}
                </p>
              </div>

              <div>
                <h3 className="font-mono-custom text-xs uppercase tracking-wider text-[var(--text-muted)] mb-3 font-bold">
                  {t('about.skills_title')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-custom">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="border border-[var(--border-sharp)] p-2.5 flex items-center gap-2 bg-[var(--bg-surface)] text-[var(--text-carbon)]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Box */}
              <div className="border border-[var(--border-carbon)] p-4 bg-[var(--bg-surface)]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse-live" />
                  <span className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[var(--text-carbon)]">
                    {t('about.badge')}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {language === 'en'
                    ? 'Open for an apprenticeship contract in UX/UI Design, Webdesign or No-code integration in Paris (15e / Île-de-France) starting immediately. Available to contribute to design sprints and user research.'
                    : 'Disponible immédiatement pour un contrat d’alternance en UX/UI Design, Webdesign ou intégration No-code à Paris (15e / Île-de-France). Prêt à m’investir dans vos sprints produit.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 font-mono-custom text-xs">
                <a
                  href="mailto:mickael.lin.etud@gmail.com?subject=Opportunit%C3%A9%20Alternance%20UX%2FUI"
                  className="px-5 py-3 bg-[var(--text-carbon)] text-[var(--bg-paper)] font-bold hover:opacity-85 transition-opacity flex items-center gap-2 shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{t('about.contact_title')}</span>
                </a>

                <a
                  href="/cv-mickael-lin.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 border border-[var(--border-carbon)] text-[var(--text-carbon)] font-bold hover:bg-[var(--text-carbon)] hover:text-[var(--bg-paper)] transition-all flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'VIEW RESUME (PDF)' : 'CONSULTER CV (PDF)'}</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/mickael-lin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 border border-[var(--border-sharp)] text-[var(--text-muted)] hover:text-[var(--text-carbon)] hover:border-[var(--border-carbon)] transition-colors flex items-center gap-1.5"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
