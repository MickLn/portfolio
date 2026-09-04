import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { getAssetUrl } from '../utils/assets';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen w-full bg-[var(--bg-paper)] overflow-hidden flex flex-col justify-between select-none transition-colors duration-300"
    >
      {/* 1. Structural Architectural Grid Lines (1px Sharp Symmetrical Borders) */}
      <div className="absolute top-14 sm:top-16 left-0 w-full border-b border-[var(--border-sharp)] pointer-events-none z-0 transition-colors duration-300" />
      <div className="absolute bottom-14 sm:bottom-16 left-0 w-full border-t border-[var(--border-sharp)] pointer-events-none z-0 transition-colors duration-300" />
      <div className="absolute top-0 left-6 sm:left-12 lg:left-16 h-full border-r border-[var(--border-sharp)] pointer-events-none z-0 transition-colors duration-300" />
      <div className="absolute top-0 right-6 sm:right-12 lg:right-16 h-full border-l border-[var(--border-sharp)] pointer-events-none z-0 transition-colors duration-300" />

      {/* Top Spacer matching Header Cell */}
      <div className="h-14 sm:h-16 w-full flex-shrink-0" />

      {/* 2. Main Center Box: Composition in Viewport */}
      <div className="flex-1 w-full px-6 sm:px-12 lg:px-20 flex flex-col items-center justify-center py-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-fit max-w-full mx-auto flex flex-col items-center justify-center"
        >
          {/* Row 1: MICKAEL (Geist font-black, balanced editorial size) */}
          <h1 className="text-[15vw] sm:text-[13vw] md:text-[11.5vw] lg:text-[10.5vw] font-black tracking-[-0.04em] text-[var(--text-carbon)] leading-[0.85] uppercase w-full text-left transition-colors duration-300">
            MICKAEL
          </h1>

          {/* Row 2: LIN + Embedded Portrait Photo */}
          <div className="w-full flex items-center justify-between gap-6 sm:gap-10 md:gap-14 lg:gap-20 mt-2 sm:mt-4">
            <span className="text-[15vw] sm:text-[13vw] md:text-[11.5vw] lg:text-[10.5vw] font-black tracking-[-0.04em] text-[var(--text-carbon)] leading-[0.85] uppercase transition-colors duration-300">
              LIN
            </span>

            {/* Embedded Portrait Photo — Static & Sharp */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-32 h-44 sm:w-44 sm:h-60 md:w-56 md:h-76 lg:w-68 lg:h-92 overflow-hidden bg-[var(--bg-surface)] flex-shrink-0 shadow-xs border border-[var(--border-sharp)] transition-colors duration-300"
            >
              <img
                src={getAssetUrl('/profile.jpg')}
                alt="Mickael LIN"
                className="w-full h-full object-cover object-[center_15%] grayscale contrast-125"
                loading="eager"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 3. Bottom Information Bar (Space Mono, Clean 3-Part Responsive Layout) */}
      <div className="py-3 sm:py-0 min-h-14 sm:h-16 w-full px-6 sm:px-12 lg:px-24 flex flex-col md:flex-row md:items-center justify-between gap-1.5 sm:gap-4 font-mono-custom text-[10px] sm:text-xs z-10 flex-shrink-0">
        {/* Left: Specializations */}
        <div className="font-bold tracking-wider text-[var(--text-carbon)] uppercase text-left transition-colors duration-300">
          {t('hero.role')}
        </div>

        {/* Center: Scroll Text (Desktop Only) */}
        <div className="text-[var(--text-muted)] tracking-widest uppercase text-center hidden md:block transition-colors duration-300">
          {t('hero.scroll')}
        </div>

        {/* Right: Apprenticeship status */}
        <div className="font-bold tracking-wider text-[var(--text-carbon)] uppercase text-left md:text-right transition-colors duration-300">
          {t('hero.status')}
        </div>
      </div>
    </section>
  );
};
