import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  isActive: boolean;
  projectName?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  isActive,
  projectName,
}) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="curtain-wipe"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{
            duration: 0.38,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[100] bg-[#EAE8E2] dark:bg-[#1A1A1A] border-y border-[#1A1A1A] dark:border-[#333333] text-[#1A1A1A] dark:text-[#F4F3EF] flex items-center justify-center pointer-events-none select-none px-6 shadow-2xl transition-colors duration-300"
        >
          {/* Minimalist Centered Project Title */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-black text-[#1A1A1A] dark:text-[#F4F3EF] uppercase tracking-tight text-center transition-colors duration-300"
          >
            {projectName || 'PROJECTS'}
          </motion.h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
