import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, ProjectItem } from '../data/projects';

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

// Magnetic Button Subcomponent for the CTA
const MagneticCTA: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    if (ref.current) {
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.1 }}
      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1A1A1A] text-[#F4F3EF] text-xs font-mono-custom uppercase tracking-wider group-hover:bg-black transition-colors cursor-pointer border border-[#1A1A1A]"
    >
      <span>View Case Study</span>
      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </motion.button>
  );
};

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 px-6 md:px-12 lg:px-16 border-b border-[#D5D4CE] relative bg-[#F4F3EF]"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#1A1A1A] pb-6 mb-12">
          <div>
            <span className="font-mono-custom text-xs uppercase tracking-widest text-[#666664] block mb-2">
              [02. SELECTED WORK]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A1A1A]">
              Featured Projects
            </h2>
          </div>
          <p className="font-mono-custom text-xs text-[#666664] mt-2 sm:mt-0 uppercase">
            30-Second UX/UI Case Studies • Content-First
          </p>
        </div>

        {/* Staggered Vertical Stack / Interactive Cards List */}
        <div className="space-y-6">
          {PROJECTS.map((project, index) => {
            const isHovered = hoveredProjectId === project.id;
            const isAnyHovered = hoveredProjectId !== null;
            const isDimmed = isAnyHovered && !isHovered;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1]
                }}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                onClick={() => onSelectProject(project)}
                className={`group relative border transition-all duration-300 cursor-pointer p-6 sm:p-8 bg-[#F4F3EF] ${
                  isHovered
                    ? 'border-[#1A1A1A] bg-[#EFECE6] scale-[1.015]'
                    : 'border-[#D5D4CE]'
                } ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                  
                  {/* Left Column: Thumbnail Preview with Smooth Zoom */}
                  <div className="lg:col-span-4 overflow-hidden border border-[#D5D4CE] bg-[#E5E3DC] aspect-video sm:aspect-16/10 relative">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#1A1A1A] text-[#F4F3EF] font-mono-custom text-[10px] uppercase tracking-wider">
                      {project.index}
                    </div>
                  </div>

                  {/* Middle Column: Title, Category & Flash Concept (Geist Font) */}
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    <div className="font-mono-custom text-xs text-[#666664] uppercase tracking-wider mb-1 flex items-center gap-2">
                      <span>[{project.index}]</span>
                      <span>•</span>
                      <span>{project.category}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight group-hover:text-black transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#1A1A1A] mt-2 leading-relaxed font-normal">
                      {project.flashConcept}
                    </p>

                    {/* Tools Tags (Space Mono - Illuminates on Hover) */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className={`font-mono-custom text-[11px] px-2.5 py-1 border transition-colors duration-200 ${
                            isHovered
                              ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#F4F3EF]'
                              : 'border-[#D5D4CE] bg-[#EAE8E2] text-[#1A1A1A]'
                          }`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Interactive CTA with Magnetic Feel */}
                  <div className="lg:col-span-3 flex lg:justify-end items-center pt-4 lg:pt-0 border-t lg:border-t-0 border-[#D5D4CE]">
                    <MagneticCTA onClick={() => onSelectProject(project)} />
                  </div>

                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
