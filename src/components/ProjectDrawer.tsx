import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { ProjectItem, PROJECTS } from '../data/projects';

interface ProjectDrawerProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectProject?: (project: ProjectItem) => void;
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({
  project,
  onClose,
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Prevent background scrolling & scroll to top when opening or switching project
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      if (containerRef.current) {
        containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  // Keyboard navigation: ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  // Find next project
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 bg-[#F4F3EF] overflow-y-auto select-none"
      >
        {/* 1. Sticky Navigation Bar */}
        <div className="sticky top-0 left-0 w-full bg-[#F4F3EF]/90 backdrop-blur-md border-b border-[#D5D4CE] z-30 px-6 sm:px-12 lg:px-20 h-16 sm:h-20 flex items-center justify-between">
          <button
            onClick={onClose}
            className="group inline-flex items-center gap-2.5 font-mono-custom text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:opacity-60 transition-opacity cursor-pointer py-2"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>BACK TO PROJECTS</span>
          </button>

          <span className="font-mono-custom text-xs text-[#666664] tracking-widest uppercase hidden sm:block">
            {project.category}
          </span>

          <button
            onClick={onClose}
            className="p-2 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F3EF] transition-colors cursor-pointer"
            aria-label="Close case study"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Main Full-Screen Case Study Content */}
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 py-12 sm:py-16 space-y-12 sm:space-y-16">
          
          {/* Hero Header Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <span className="font-mono-custom text-xs text-[#666664] uppercase tracking-widest font-bold">
              {project.category}
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#1A1A1A] uppercase leading-[0.95]">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl text-[#1A1A1A] max-w-3xl leading-relaxed font-normal pt-2">
              {project.tagline}
            </p>
          </motion.div>

          {/* Large Immersive Cover Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-[360px] sm:h-[480px] md:h-[560px] rounded-2xl overflow-hidden border border-[#D5D4CE] bg-[#EAE8E2] shadow-sm group"
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700 ease-out"
            />
          </motion.div>

          {/* Metadata Grid (ROLE, CONTEXT, TOOLS) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-y border-[#D5D4CE] py-6 font-mono-custom text-xs"
          >
            <div>
              <span className="text-[#666664] block text-[10px] uppercase tracking-wider mb-1">ROLE</span>
              <span className="text-[#1A1A1A] font-bold text-sm block">{project.metadataBar.role}</span>
            </div>
            <div>
              <span className="text-[#666664] block text-[10px] uppercase tracking-wider mb-1">CONTEXT</span>
              <span className="text-[#1A1A1A] font-bold text-sm block">{project.metadataBar.context}</span>
            </div>
            <div>
              <span className="text-[#666664] block text-[10px] uppercase tracking-wider mb-1">TOOLS</span>
              <span className="text-[#1A1A1A] font-bold text-sm block">{project.metadataBar.tools}</span>
            </div>
          </motion.div>

          {/* 2-Column Editorial Content Flow */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-4">
            
            {/* Left Column: Problem & Solution (Geist) */}
            <div className="lg:col-span-7 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[#666664] mb-3">
                  THE PROBLEM
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-[#1A1A1A]">
                  {project.problem}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[#666664] mb-3">
                  THE SOLUTION
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-[#1A1A1A]">
                  {project.solution}
                </p>
              </motion.div>
            </div>

            {/* Right Column: Brand & Design System (Geist & Space Mono) */}
            {project.brandAndDesignSystem && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 space-y-8 border-t lg:border-t-0 lg:border-l border-[#D5D4CE] pt-8 lg:pt-0 lg:pl-12"
              >
                <h2 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[#666664]">
                  BRAND & DESIGN SYSTEM
                </h2>

                {/* Concept */}
                <div>
                  <span className="font-mono-custom text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-2">
                    Concept
                  </span>
                  <p className="text-sm sm:text-base leading-relaxed text-[#1A1A1A]">
                    {project.brandAndDesignSystem.concept}
                  </p>
                </div>

                {/* Color Palette (HEX only) */}
                <div>
                  <span className="font-mono-custom text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-3">
                    Color Palette
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {project.brandAndDesignSystem.colorPalette.map((color, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2.5 font-mono-custom text-xs border border-[#D5D4CE] p-2.5 bg-[#EAE8E2] rounded-lg"
                      >
                        <div
                          className="w-4 h-4 rounded-xs border border-[#1A1A1A]/30 flex-shrink-0 shadow-xs"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="font-bold text-[#1A1A1A]">{color.hex}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Typography (Line by line, clean) */}
                <div>
                  <span className="font-mono-custom text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-2">
                    Typography
                  </span>
                  <div className="space-y-1.5 font-mono-custom text-sm text-[#1A1A1A]">
                    {project.brandAndDesignSystem.typography.map((type, idx) => (
                      <div key={idx} className="font-semibold">
                        {type.name}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* 3. Next Project Transition Card at Bottom */}
          <div className="pt-12 border-t border-[#D5D4CE]">
            <button
              onClick={() => {
                if (onSelectProject) {
                  onSelectProject(nextProject);
                }
              }}
              className="w-full group p-8 sm:p-12 border border-[#D5D4CE] rounded-2xl bg-[#EAE8E2] hover:bg-[#1A1A1A] transition-colors duration-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 cursor-pointer text-left"
            >
              <div>
                <span className="font-mono-custom text-xs uppercase tracking-widest text-[#666664] group-hover:text-[#D5D4CE] transition-colors">
                  NEXT CASE STUDY
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-[#1A1A1A] group-hover:text-[#F4F3EF] tracking-tight uppercase mt-2 transition-colors">
                  {nextProject.title}
                </h3>
              </div>

              <div className="w-12 h-12 rounded-full border border-[#1A1A1A] group-hover:border-[#F4F3EF] flex items-center justify-center text-[#1A1A1A] group-hover:text-[#F4F3EF] group-hover:translate-x-2 transition-all duration-300">
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
