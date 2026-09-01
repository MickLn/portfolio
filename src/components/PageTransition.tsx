import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  isActive: boolean;
  projectName?: string;
  category?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  isActive,
  projectName,
  category,
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
            duration: 0.45,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[100] bg-[#141414] text-[#F4F3EF] flex flex-col items-center justify-center pointer-events-none select-none px-6"
        >
          {/* Subtle Grid Corner Accents */}
          <div className="absolute top-8 left-8 font-mono-custom text-xs text-[#666664] tracking-widest uppercase">
            [TRANSITION]
          </div>

          <div className="text-center space-y-3">
            {category && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="font-mono-custom text-xs text-[#10B981] uppercase tracking-widest block font-bold"
              >
                ● {category}
              </motion.span>
            )}

            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="text-3xl sm:text-5xl md:text-6xl font-black text-[#F4F3EF] uppercase tracking-tight"
            >
              {projectName || 'LOADING'}
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-24 h-[1.5px] bg-[#D5D4CE] mx-auto origin-center mt-4"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
