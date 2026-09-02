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
          className="fixed inset-0 z-[100] bg-[#EAE8E2] border-y border-[#1A1A1A] text-[#1A1A1A] flex items-center justify-center pointer-events-none select-none px-6 shadow-2xl"
        >
          {/* Minimalist Centered Project Title — Pure Typography, No Green Dot, No Extra Labels */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-black text-[#1A1A1A] uppercase tracking-tight text-center"
          >
            {projectName || 'PROJECTS'}
          </motion.h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
