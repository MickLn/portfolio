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
      className="py-24 w-full border-b border-[#D5D4CE] relative bg-[#F4F3EF] overflow-hidden"
    >
      {/* Section Header with Navigation Controls */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono-custom text-xs uppercase tracking-widest text-[#666664] block mb-2">
            [02. SELECTED WORK • 3D CIRCULAR CAROUSEL]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A1A1A]">
            Featured Projects
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
              className="p-3 border border-[#1A1A1A] bg-[#F4F3EF] hover:bg-[#1A1A1A] hover:text-[#F4F3EF] transition-colors cursor-pointer flex items-center justify-center group"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={nextProject}
              className="p-3 border border-[#1A1A1A] bg-[#F4F3EF] hover:bg-[#1A1A1A] hover:text-[#F4F3EF] transition-colors cursor-pointer flex items-center justify-center group"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-width 3D Circular Perspective Container with Soft Edge Masking */}
      <div
        className="relative w-full overflow-hidden py-8"
        style={{
          perspective: '1400px',
          perspectiveOrigin: 'center center',
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
        }}
      >
        <div className="relative w-full h-[620px] sm:h-[640px] flex items-center justify-center">
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
                rotateY = 32; // tilted inward
                scale = 0.84;
                opacity = 0.45;
                zIndex = 10;
              } else if (isRight) {
                xTranslation = '92%';
                rotateY = -32; // tilted inward
                scale = 0.84;
                opacity = 0.45;
                zIndex = 10;
              }

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
                  className={`absolute w-[88vw] sm:w-[540px] md:w-[600px] h-[580px] bg-[#F4F3EF] border border-[#1A1A1A] p-6 sm:p-7 flex flex-col justify-between cursor-pointer select-none transition-shadow duration-300 ${
                    isCenter
                      ? 'shadow-2xl ring-1 ring-[#1A1A1A]'
                      : 'hover:opacity-75'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* TOP: Project Image Preview */}
                  <div className="relative w-full h-[230px] sm:h-[250px] border border-[#1A1A1A] overflow-hidden bg-[#E5E3DC] group">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className={`w-full h-full object-cover grayscale contrast-125 transition-all duration-700 ${
                        isCenter ? 'group-hover:scale-105 group-hover:grayscale-0' : ''
                      }`}
                      loading="lazy"
                    />
                    
                    {/* Index Badge */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-[#1A1A1A] text-[#F4F3EF] font-mono-custom text-xs uppercase tracking-wider">
                      [{project.index}]
                    </div>

                    {/* Timeline Tag */}
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-[#F4F3EF] text-[#1A1A1A] border border-[#1A1A1A] font-mono-custom text-[10px] uppercase">
                      {project.timeline}
                    </div>
                  </div>

                  {/* MIDDLE: Project Title, Flash Concept & Category */}
                  <div className="my-auto py-3">
                    <div className="font-mono-custom text-xs text-[#666664] uppercase tracking-wider mb-1 flex items-center gap-2">
                      <span>[{project.category}]</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
                      {project.title}
                    </h3>

                    <p className="text-sm text-[#1A1A1A] mt-2 leading-relaxed line-clamp-2">
                      {project.flashConcept}
                    </p>

                    <div className="mt-3 text-xs font-mono-custom text-[#666664] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                      <span>{project.keyHighlights[0]?.label}: {project.keyHighlights[0]?.value}</span>
                    </div>
                  </div>

                  {/* BOTTOM: Tools Badges & Interactive CTA */}
                  <div className="pt-4 border-t border-[#D5D4CE] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Tools Tags (Space Mono) */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.slice(0, 3).map((tool, idx) => (
                        <span
                          key={idx}
                          className="font-mono-custom text-[10px] sm:text-[11px] px-2.5 py-1 border border-[#1A1A1A] bg-[#EAE8E2] text-[#1A1A1A]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#1A1A1A] text-[#F4F3EF] text-xs font-mono-custom uppercase tracking-wider hover:bg-black transition-colors cursor-pointer flex-shrink-0"
                    >
                      <span>Case Study</span>
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
      <div className="flex justify-center items-center gap-2.5 mt-8">
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
