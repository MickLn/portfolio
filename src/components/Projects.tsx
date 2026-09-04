import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, ProjectItem } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const { t } = useLanguage();

  return (
    <section
      id="projects"
      className="min-h-screen w-full border-b border-[var(--border-sharp)] relative bg-[var(--bg-paper)] flex flex-col justify-between py-12 sm:py-16 px-6 sm:px-12 lg:px-16 select-none transition-colors duration-300"
    >
      <div className="w-full h-full flex-1 flex flex-col justify-between">
        {/* Section Heading: PROJECTS / PROJETS */}
        <div className="mb-6 sm:mb-8 flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[var(--text-carbon)] uppercase transition-colors duration-300">
            {t('projects.title')}
          </h2>
        </div>

        {/* Projects Grid — 4-Column Immersive Sharp Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 flex-1 my-auto items-center">
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
  const { language } = useLanguage();

  // Category name formatted for current language
  const categoryName = project.category[language].split('/')[0].trim().toUpperCase();

  return (
    <motion.div
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] lg:h-[58vh] max-h-[600px] overflow-hidden cursor-pointer select-none border border-[var(--border-carbon)] bg-[var(--bg-surface)] group shadow-xs transition-colors duration-300"
    >
      {/* 1. Project Cover Image (Always Full Vivid Color on Desktop & Mobile) */}
      <img
        src={project.thumbnail}
        alt={project.title}
        className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
        loading="lazy"
      />

      {/* 2. Editorial Carbon Gradient Overlay (Permanent on mobile for readability, hover-revealed on desktop) */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-out ${
          isHovered
            ? 'opacity-100 bg-gradient-to-t from-[#1A1A1A]/95 via-[#1A1A1A]/40 to-transparent'
            : 'opacity-100 md:opacity-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/40 to-transparent md:bg-transparent pointer-events-none'
        }`}
      />

      {/* 3. Revealed Content (Always Visible on Mobile for Touch Usability) */}
      <div
        className={`absolute inset-x-0 bottom-0 p-6 sm:p-7 md:p-8 flex flex-col justify-end z-10 transition-all duration-400 ease-out ${
          isHovered
            ? 'opacity-100 translate-y-0'
            : 'opacity-100 md:opacity-0 translate-y-0 md:translate-y-3 pointer-events-none md:pointer-events-auto'
        }`}
      >
        {/* Project Title */}
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#F4F3EF] tracking-tight uppercase leading-tight mb-2">
          {project.title}
        </h3>

        {/* Category Tagline */}
        <p className="font-mono-custom text-[11px] sm:text-xs font-bold text-[#D5D4CE] tracking-wider uppercase mb-4">
          {categoryName}
        </p>

        {/* Sharp Rectangular Tags in Paper Tone (#F4F3EF) with 1px Border */}
        <div className="flex flex-wrap gap-2">
          {project.tools.slice(0, 2).map((tool, idx) => (
            <span
              key={idx}
              className="font-mono-custom text-[10px] sm:text-[11px] font-bold bg-[var(--bg-paper)] text-[var(--text-carbon)] px-3 py-1 border border-[var(--border-carbon)] uppercase tracking-wider transition-colors duration-300"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
