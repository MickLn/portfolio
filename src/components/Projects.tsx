import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECTS, ProjectItem } from '../data/projects';

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalProjects = PROJECTS.length;

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % totalProjects);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextProject();
      if (e.key === 'ArrowLeft') prevProject();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="min-h-screen w-full border-b border-[#D5D4CE] relative bg-[#F4F3EF] overflow-hidden flex flex-col justify-between py-16 px-0"
    >
      {/* Section Header with Navigation Controls */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A1A1A]">
            Projects
          </h2>
        </div>

        {/* Carousel Controls & Pagination */}
        <div className="flex items-center gap-4 font-mono-custom text-xs">
          <span className="text-[#666664] tracking-widest uppercase">
            [{String(activeIndex + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}]
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={prevProject}
              className="p-2.5 border border-[#1A1A1A] bg-[#F4F3EF] hover:bg-[#1A1A1A] hover:text-[#F4F3EF] transition-colors cursor-pointer flex items-center justify-center group"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={nextProject}
              className="p-2.5 border border-[#1A1A1A] bg-[#F4F3EF] hover:bg-[#1A1A1A] hover:text-[#F4F3EF] transition-colors cursor-pointer flex items-center justify-center group"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-width 3D Circular Perspective Container with Soft Edge Masking */}
      <div
        className="relative w-full overflow-hidden my-auto py-4"
        style={{
          perspective: '1400px',
          perspectiveOrigin: 'center center',
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
        }}
      >
        <div className="relative w-full h-[470px] sm:h-[490px] flex items-center justify-center">
          <AnimatePresence initial={false}>
            {PROJECTS.map((project, index) => {
              // Calculate relative offset from active card: -1 (left), 0 (center), 1 (right)
              let offset = index - activeIndex;
              if (offset < -1) offset += totalProjects;
              if (offset > 1) offset -= totalProjects;

              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;

              // Hide cards that are beyond immediate neighboring slots
              if (!isCenter && !isLeft && !isRight) {
                return null;
              }

              // Dynamic 3D transform metrics mimicking a 90-degree circular curve
              let xTranslation = '0%';
              let rotateY = 0;
              let scale = 1.04;
              let opacity = 1;
              let zIndex = 30;

              if (isLeft) {
                xTranslation = '-92%';
                rotateY = 32;
                scale = 0.84;
                opacity = 0.45;
                zIndex = 10;
              } else if (isRight) {
                xTranslation = '92%';
                rotateY = -32;
                scale = 0.84;
                opacity = 0.45;
                zIndex = 10;
              }

              // Category label formatting (e.g., 'Mobile App / Sprint' -> 'MOBILE APP')
              const surtitre = project.category.split('/')[0].trim().toUpperCase();

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    x: xTranslation,
                    rotateY: rotateY,
                    scale: scale,
                    opacity: opacity,
                    zIndex: zIndex
                  }}
                  exit={{ opacity: 0, scale: 0.75 }}
                  transition={{
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  onClick={() => {
                    if (isCenter) {
                      onSelectProject(project);
                    } else if (isLeft) {
                      prevProject();
                    } else if (isRight) {
                      nextProject();
                    }
                  }}
                  className={`absolute w-[88vw] sm:w-[480px] md:w-[520px] bg-[#F4F3EF] border border-[#1A1A1A] p-5 sm:p-6 flex flex-col justify-between cursor-pointer select-none transition-shadow duration-300 ${
                    isCenter
                      ? 'shadow-2xl ring-1 ring-[#1A1A1A]'
                      : 'hover:opacity-75'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* TOP: Project Image Preview (Max 200px, clean, no badge, no duration) */}
                  <div className="relative w-full h-[180px] sm:h-[190px] max-h-[200px] border border-[#1A1A1A] overflow-hidden bg-[#E5E3DC] group">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className={`w-full h-full object-cover grayscale contrast-125 transition-all duration-700 ${
                        isCenter ? 'group-hover:scale-105 group-hover:grayscale-0' : ''
                      }`}
                      loading="lazy"
                    />
                  </div>

                  {/* MIDDLE: Text Layout (Sur-titre, Titre, 1-line Description) */}
                  <div className="py-3">
                    {/* Sur-titre : Space Mono, small, opacity 0.6 */}
                    <span className="font-mono-custom text-[11px] text-[#666664] opacity-60 tracking-wider uppercase block mb-1">
                      {surtitre}
                    </span>

                    {/* Titre : Geist, bold */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
                      {project.title}
                    </h3>

                    {/* Description : Geist, single line */}
                    <p className="text-xs sm:text-sm text-[#1A1A1A] mt-1.5 truncate">
                      {project.flashConcept}
                    </p>
                  </div>

                  {/* BOTTOM: Tags (Space Mono fine border) & Minimal Text CTA (View Case Study ↗) */}
                  <div className="pt-3 border-t border-[#D5D4CE] flex items-center justify-between gap-3">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.slice(0, 3).map((tool, idx) => (
                        <span
                          key={idx}
                          className="font-mono-custom text-[10px] sm:text-[11px] px-2 py-0.5 border border-[#D5D4CE] bg-[#EAE8E2] text-[#1A1A1A]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Minimal Textual Link CTA */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="font-mono-custom text-xs text-[#1A1A1A] hover:opacity-60 transition-opacity flex items-center gap-1 link-drawer cursor-pointer py-1 flex-shrink-0"
                    >
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Interactive Dots Pagination at bottom of section */}
      <div className="flex justify-center items-center gap-2.5">
        {PROJECTS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-1.5 transition-all duration-300 cursor-pointer ${
              activeIndex === idx
                ? 'w-8 bg-[#1A1A1A]'
                : 'w-2 bg-[#D5D4CE] hover:bg-[#666664]'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
