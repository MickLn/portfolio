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

  // Prevent background scrolling & scroll to top on open/switch
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 bg-[#F4F3EF] overflow-y-auto select-none"
      >
        {/* 1. Minimalist Top Bar (Sticky, 1px Border) */}
        <div className="sticky top-0 left-0 w-full bg-[#F4F3EF]/95 backdrop-blur-md border-b border-[#D5D4CE] z-30 px-6 sm:px-12 lg:px-20 h-16 sm:h-20 flex items-center justify-between">
          <button
            onClick={onClose}
            className="group inline-flex items-center gap-2 font-mono-custom text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:opacity-60 transition-opacity cursor-pointer py-2"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>BACK TO PROJECTS</span>
          </button>

          <span className="font-mono-custom text-xs text-[#666664] tracking-widest uppercase hidden md:block">
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

        {/* 2. Main Editorial Case Study Flow (Asymmetrical Lookbook Layout) */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-12 sm:py-16 space-y-16">
          
          {/* Editorial Header Block */}
          <div className="border-b border-[#D5D4CE] pb-12 space-y-4">
            <span className="font-mono-custom text-xs text-[#666664] uppercase tracking-widest font-bold block">
              {project.category}
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#1A1A1A] uppercase leading-[0.9]">
              {project.title}
            </h1>
            <p className="text-xl sm:text-2xl text-[#1A1A1A] font-normal max-w-3xl leading-relaxed pt-2">
              {project.tagline}
            </p>
          </div>

          {/* Asymmetrical 2-Column Grid (Left: Sticky Meta / Right: Story & Visuals) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Metadata & Specifications (Sticky Sidebar) */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-10 border-b lg:border-b-0 pb-10 lg:pb-0 font-mono-custom">
              {/* Project Meta Details */}
              <div className="space-y-6">
                <div>
                  <span className="text-[#666664] text-[10px] uppercase tracking-wider block mb-1">ROLE</span>
                  <span className="text-[#1A1A1A] font-bold text-sm block">{project.metadataBar.role}</span>
                </div>
                <div>
                  <span className="text-[#666664] text-[10px] uppercase tracking-wider block mb-1">CONTEXT</span>
                  <span className="text-[#1A1A1A] font-bold text-sm block">{project.metadataBar.context}</span>
                </div>
                <div>
                  <span className="text-[#666664] text-[10px] uppercase tracking-wider block mb-1">TOOLS</span>
                  <span className="text-[#1A1A1A] font-bold text-sm block">{project.metadataBar.tools}</span>
                </div>
              </div>

              {/* Design System Tokens (Integrated seamlessly) */}
              {project.brandAndDesignSystem && (
                <div className="pt-8 border-t border-[#D5D4CE] space-y-6">
                  <div>
                    <span className="text-[#666664] text-[10px] uppercase tracking-wider block mb-3">PALETTE</span>
                    <div className="flex flex-wrap gap-2.5">
                      {project.brandAndDesignSystem.colorPalette.map((color, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 border border-[#1A1A1A] px-2.5 py-1.5 bg-[#EAE8E2] text-xs"
                        >
                          <div
                            className="w-3 h-3 border border-[#1A1A1A]/30 flex-shrink-0"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="font-bold text-[#1A1A1A] text-[11px]">{color.hex}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[#666664] text-[10px] uppercase tracking-wider block mb-2">TYPOGRAPHY</span>
                    <div className="space-y-1 text-xs font-bold text-[#1A1A1A]">
                      {project.brandAndDesignSystem.typography.map((type, idx) => (
                        <div key={idx}>{type.name}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Visual Showcase & Storytelling */}
            <div className="lg:col-span-8 space-y-14">
              
              {/* Proportional Showcase Image (Compact, Sharp 1px Border) */}
              <div className="w-full aspect-[16/10] max-h-[460px] overflow-hidden border border-[#1A1A1A] bg-[#E5E3DC] group">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700 ease-out"
                />
              </div>

              {/* 01. The Problem */}
              <div className="space-y-3">
                <h3 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[#666664]">
                  01 / THE PROBLEM
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-[#1A1A1A]">
                  {project.problem}
                </p>
              </div>

              {/* 02. The Solution */}
              <div className="space-y-3">
                <h3 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[#666664]">
                  02 / THE SOLUTION
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-[#1A1A1A]">
                  {project.solution}
                </p>
              </div>

              {/* 03. Concept Note */}
              {project.brandAndDesignSystem && (
                <div className="space-y-3 pt-4 border-t border-[#D5D4CE]">
                  <h3 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[#666664]">
                    03 / BRAND CONCEPT
                  </h3>
                  <p className="text-base leading-relaxed text-[#1A1A1A]">
                    {project.brandAndDesignSystem.concept}
                  </p>
                </div>
              )}

            </div>
          </div>

          {/* 3. Bottom Next Case Study Link */}
          <div className="pt-12 border-t border-[#D5D4CE]">
            <button
              onClick={() => {
                if (onSelectProject) {
                  onSelectProject(nextProject);
                }
              }}
              className="w-full group p-8 sm:p-10 border border-[#1A1A1A] bg-[#EAE8E2] hover:bg-[#1A1A1A] transition-colors duration-500 flex items-center justify-between cursor-pointer text-left"
            >
              <div>
                <span className="font-mono-custom text-xs uppercase tracking-widest text-[#666664] group-hover:text-[#D5D4CE] transition-colors block mb-1">
                  NEXT CASE STUDY →
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] group-hover:text-[#F4F3EF] tracking-tight uppercase transition-colors">
                  {nextProject.title}
                </h3>
              </div>

              <div className="w-10 h-10 border border-[#1A1A1A] group-hover:border-[#F4F3EF] flex items-center justify-center text-[#1A1A1A] group-hover:text-[#F4F3EF] group-hover:translate-x-1.5 transition-all duration-300">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
