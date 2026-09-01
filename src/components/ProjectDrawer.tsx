import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ProjectItem } from '../data/projects';

interface ProjectDrawerProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({ project, onClose }) => {
  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Slide-Over Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="relative w-full max-w-2xl bg-[#F4F3EF] border-l border-[#1A1A1A] h-full z-10 flex flex-col"
          >
            {/* 1. Fixed / Sticky Top Header (Does not move when scrolling) */}
            <div className="sticky top-0 bg-[#F4F3EF] border-b border-[#D5D4CE] px-6 sm:px-10 py-6 z-20 flex justify-between items-start flex-shrink-0">
              <div>
                <div className="font-mono-custom text-xs text-[#666664] uppercase tracking-wider mb-1.5">
                  {project.category}
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight">
                  {project.title}
                </h2>
                <p className="text-sm text-[#1A1A1A] mt-2 leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F3EF] transition-colors cursor-pointer flex-shrink-0 ml-4"
                aria-label="Close project drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2. Scrollable Body Content */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-6 space-y-8">
              {/* Image Preview */}
              <div className="border border-[#1A1A1A] overflow-hidden bg-[#E5E3DC]">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-60 sm:h-64 object-cover grayscale contrast-125"
                />
              </div>

              {/* Metadata Bar (Space Mono) */}
              <div className="grid grid-cols-3 gap-4 border-y border-[#D5D4CE] py-3 font-mono-custom text-xs bg-[#EAE8E2] px-4">
                <div>
                  <span className="text-[#666664] block text-[10px] uppercase tracking-wider">ROLE</span>
                  <span className="text-[#1A1A1A] font-bold mt-0.5 block">{project.metadataBar.role}</span>
                </div>
                <div>
                  <span className="text-[#666664] block text-[10px] uppercase tracking-wider">CONTEXT</span>
                  <span className="text-[#1A1A1A] font-bold mt-0.5 block">{project.metadataBar.context}</span>
                </div>
                <div>
                  <span className="text-[#666664] block text-[10px] uppercase tracking-wider">TOOLS</span>
                  <span className="text-[#1A1A1A] font-bold mt-0.5 block">{project.metadataBar.tools}</span>
                </div>
              </div>

              {/* Section 1: THE PROBLEM (Geist) */}
              <div>
                <h3 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[#666664] mb-2">
                  THE PROBLEM
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#1A1A1A]">
                  {project.problem}
                </p>
              </div>

              {/* Section 2: THE SOLUTION (Geist) */}
              <div>
                <h3 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[#666664] mb-2">
                  THE SOLUTION
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#1A1A1A]">
                  {project.solution}
                </p>
              </div>

              {/* Section 3: BRAND & DESIGN SYSTEM (Geist & Space Mono) */}
              {project.brandAndDesignSystem && (
                <div className="border-t border-[#D5D4CE] pt-6 space-y-6 pb-6">
                  <h3 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[#666664]">
                    BRAND & DESIGN SYSTEM
                  </h3>

                  {/* Concept */}
                  <div>
                    <span className="font-mono-custom text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                      Concept:
                    </span>
                    <p className="text-sm sm:text-base leading-relaxed text-[#1A1A1A]">
                      {project.brandAndDesignSystem.concept}
                    </p>
                  </div>

                  {/* Color Palette (HEX only, no names) */}
                  <div>
                    <span className="font-mono-custom text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-2">
                      Color Palette:
                    </span>
                    <div className="flex flex-wrap gap-4">
                      {project.brandAndDesignSystem.colorPalette.map((color, idx) => (
                        <div key={idx} className="flex items-center gap-2 font-mono-custom text-xs">
                          <div
                            className="w-4 h-4 border border-[#1A1A1A]/30 flex-shrink-0"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="font-bold text-[#1A1A1A]">{color.hex}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Typography (Clean, no boxes, no descriptions, just on separate lines) */}
                  <div>
                    <span className="font-mono-custom text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-2">
                      Typography:
                    </span>
                    <div className="space-y-1 font-mono-custom text-xs sm:text-sm text-[#1A1A1A]">
                      {project.brandAndDesignSystem.typography.map((type, idx) => (
                        <div key={idx}>
                          {type.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
