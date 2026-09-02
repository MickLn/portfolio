import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
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
    'UX Research & User Testing',
    'Wireframing & Information Architecture',
    'UI Systems & Design Tokens',
    'Interactive Prototyping in Figma',
    'Web Design (CMS & AI Workflows)',
    'Productivity Frameworks in Notion'
  ] : [
    'Recherche Utilisateur & Tests UX',
    'Wireframing & Architecture de l’Information',
    'Design Systems & Tokens UI',
    'Prototypage Interactif sous Figma',
    'Web Design (Workflows CMS & IA)',
    'Frameworks de Productivité Notion'
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
            className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#F4F3EF] border border-[#1A1A1A] p-6 md:p-10 z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Header / Close */}
            <div className="flex justify-between items-start border-b border-[#D5D4CE] pb-4 mb-6">
              <div>
                <span className="font-mono-custom text-xs uppercase tracking-wider text-[#666664] block mb-1">
                  {language === 'en' ? 'PROFILE METADATA' : 'MÉTADONNÉES DU PROFIL'}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1A1A1A]">
                  Mickael LIN
                </h2>
                <p className="text-sm font-mono-custom text-[#1A1A1A] mt-1">
                  {language === 'en'
                    ? 'Junior UX/UI Designer — Seeking Apprenticeship (Immediate / ASAP)'
                    : 'Junior UX/UI Designer — Recherche Alternance (Immédiate / ASAP)'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F3EF] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="space-y-6 text-[#1A1A1A]">
              <div>
                <h3 className="font-mono-custom text-xs uppercase tracking-wider text-[#666664] mb-2">
                  {language === 'en' ? 'CORE FOCUS' : 'OBJECTIF PRINCIPAL'}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-[#1A1A1A]">
                  {language === 'en'
                    ? 'Focused on crafting high-efficiency, intuitive digital products. Combining rigorous user research, sharp visual hierarchy in Figma, fast CMS & AI web deployment, and modular system design in Notion.'
                    : 'Dédié à la conception de produits numériques intuitifs et performants. Alliant recherche utilisateur rigoureuse, hiérarchie visuelle sous Figma, déploiement web rapide via CMS & IA, et design de systèmes modulaires sous Notion.'}
                </p>
              </div>

              <div>
                <h3 className="font-mono-custom text-xs uppercase tracking-wider text-[#666664] mb-3">
                  {t('about.skills_title')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-custom">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="border border-[#D5D4CE] p-2.5 flex items-center gap-2 bg-[#EAE8E2]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Box */}
              <div className="border border-[#1A1A1A] p-4 bg-[#EAE8E2]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse-live" />
                  <span className="font-mono-custom text-xs font-bold uppercase tracking-wider">
                    {t('about.badge')}
                  </span>
                </div>
                <p className="text-xs text-[#666664]">
                  {language === 'en'
                    ? 'Open for a UX/UI Apprenticeship contract starting immediately / ASAP. Ready to bring immediate value to design sprints and product teams.'
                    : 'Ouvert à un contrat d’alternance UX/UI débutant immédiatement / ASAP. Prêt à apporter une valeur concrète dès les premiers sprints de design.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3 font-mono-custom text-xs">
                <a
                  href="mailto:contact@mickaellin.design"
                  className="px-4 py-2.5 bg-[#1A1A1A] text-[#F4F3EF] hover:bg-black transition-colors flex items-center gap-2"
                >
                  <span>{t('about.contact_title')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F3EF] transition-colors cursor-pointer"
                >
                  {t('about.close')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
