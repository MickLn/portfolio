import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, ProjectItem } from '../data/projects';

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  return (
    <section
      id="projects"
      className="min-h-screen w-full border-b border-[#D5D4CE] relative bg-[#F4F3EF] flex flex-col justify-between py-12 sm:py-16 px-6 sm:px-12 lg:px-16 select-none"
    >
      <div className="w-full h-full flex-1 flex flex-col justify-between">
        {/* Section Heading: PROJECTS (Monumental Geist Black) */}
        <div className="mb-6 sm:mb-8 flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#1A1A1A] uppercase">
            PROJECTS
          </h2>
        </div>

        {/* Projects Grid — Full Screen 3-Column Immersive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 flex-1 my-auto items-center">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={() => onSelectProject(project)}
            />
          ))}
        </div>

        {/* Bottom Micro Spacer to balance the section */}
        <div className="h-4 sm:h-6 flex-shrink-0" />
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Category name formatted
  const categoryName = project.category.split('/')[0].trim().toUpperCase();

  return (
    <motion.div
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] lg:h-[58vh] max-h-[600px] rounded-2xl overflow-hidden cursor-pointer select-none border border-[#D5D4CE] bg-[#EAE8E2] group shadow-xs"
    >
      {/* 1. Project Thumbnail Cover (Full Height, Blurs & Zooms on Hover) */}
      <img
        src={project.thumbnail}
        alt={project.title}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          isHovered ? 'scale-105 blur-sm brightness-75' : 'scale-100 blur-0 brightness-100'
        }`}
        loading="lazy"
      />

      {/* 2. Matte Carbon Backdrop Overlay (DA Token: #1A1A1A) */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-out ${
          isHovered
            ? 'opacity-100 bg-[#1A1A1A]/75 backdrop-blur-xs'
            : 'opacity-0 bg-transparent pointer-events-none'
        }`}
      />

      {/* 3. Text Content Revealed on Hover (DA Tokens: Paper #F4F3EF, Space Mono, Border #D5D4CE) */}
      <div
        className={`absolute inset-x-0 bottom-0 p-6 sm:p-7 md:p-8 flex flex-col justify-end z-10 transition-all duration-400 ease-out ${
          isHovered
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        {/* Project Title (Geist Font-Bold in Paper #F4F3EF) */}
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F4F3EF] tracking-tight uppercase leading-tight mb-2">
          {project.title}
        </h3>

        {/* Category Tagline (Space Mono in Muted #D5D4CE) */}
        <p className="font-mono-custom text-[11px] sm:text-xs font-semibold text-[#D5D4CE] tracking-wider uppercase mb-5">
          {categoryName}
        </p>

        {/* Tags in Paper Tone (#F4F3EF) with Fine 1px Border */}
        <div className="flex flex-wrap gap-2">
          {project.tools.slice(0, 2).map((tool, idx) => (
            <span
              key={idx}
              className="font-mono-custom text-[10px] sm:text-[11px] font-bold bg-[#F4F3EF] text-[#1A1A1A] px-3.5 py-1.5 rounded-full border border-[#D5D4CE] uppercase tracking-wider"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
