import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import gsap from 'gsap';
import { Project, PROJECTS } from '../data/projects';

interface ProjectsTableProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({ onSelectProject }) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  // GSAP animation for row dimming
  useEffect(() => {
    if (!tableRef.current) return;
    const rows = tableRef.current.querySelectorAll('.project-row');

    if (hoveredIndex !== null) {
      rows.forEach((row, idx) => {
        if (idx !== hoveredIndex) {
          gsap.to(row, { opacity: 0.3, duration: 0.25, ease: 'power2.out' });
        } else {
          gsap.to(row, { opacity: 1, duration: 0.2, ease: 'power2.out' });
        }
      });
    } else {
      rows.forEach((row) => {
        gsap.to(row, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      });
    }
  }, [hoveredIndex]);

  // GSAP animation for floating thumbnail reveal
  useEffect(() => {
    if (!thumbnailRef.current) return;

    if (hoveredProject) {
      gsap.fromTo(
        thumbnailRef.current,
        { opacity: 0, scale: 0.95, x: -10 },
        { opacity: 1, scale: 1, x: 0, duration: 0.3, ease: 'power3.out' }
      );
    }
  }, [hoveredProject]);

  return (
    <section id="projects" className="w-full border-b border-[#1A1A1A] bg-[#F4F3EF] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-[#1A1A1A] gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#6B6A65] mb-2">
              [Selected Works • 01 — 03]
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight">
              Featured Case Studies
            </h2>
          </div>
          <div className="font-mono text-xs text-[#6B6A65]">
            Click row to view full UX breakdown ↗
          </div>
        </div>

        {/* Interactive Layout with Dynamic Thumbnail on Left & Table on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative" ref={tableRef}>
          
          {/* Left Side: Dynamic Sticky Thumbnail Preview (Visible on large screens during hover) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24">
            <div className="border border-[#1A1A1A] bg-[#EBEAE5] p-3 aspect-[4/3] flex flex-col justify-between overflow-hidden relative">
              {hoveredProject ? (
                <div ref={thumbnailRef} className="w-full h-full flex flex-col justify-between">
                  <div className="w-full h-44 bg-[#D5D4CE] overflow-hidden border border-[#1A1A1A]">
                    <img
                      src={hoveredProject.thumbnail}
                      alt={hoveredProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="pt-3 font-mono text-xs flex justify-between items-center text-[#1A1A1A]">
                    <span className="font-bold uppercase">[{hoveredProject.index}] {hoveredProject.title}</span>
                    <span className="text-[#6B6A65]">{hoveredProject.year}</span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 text-[#6B6A65]">
                  <Layers className="w-8 h-8 mb-2 stroke-[1.2] opacity-40" />
                  <p className="font-mono text-xs uppercase tracking-wider">
                    Hover a project to reveal preview
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Editorial Projects Rows (8 cols) */}
          <div className="col-span-1 lg:col-span-8 flex flex-col divide-y divide-[#1A1A1A] border-y border-[#1A1A1A]">
            {PROJECTS.map((project, index) => (
              <div
                key={project.id}
                className="project-row group cursor-pointer py-6 sm:py-8 px-2 sm:px-4 transition-colors hover:bg-[#EBEAE5]/70 flex flex-col md:flex-row md:items-center justify-between gap-4"
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  setHoveredProject(project);
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setHoveredProject(null);
                }}
                onClick={() => onSelectProject(project)}
              >
                {/* Left: Index & Title */}
                <div className="flex items-start gap-4 md:w-5/12">
                  <span className="font-mono text-xs font-bold text-[#6B6A65] pt-1">
                    [{project.index}]
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
                      {project.title}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="font-mono text-xs text-[#6B6A65] mt-1">
                      {project.category}
                    </p>
                  </div>
                </div>

                {/* Center: Flash Concept */}
                <div className="md:w-4/12">
                  <p className="text-xs sm:text-sm text-[#1A1A1A] font-medium leading-snug">
                    {project.flashConcept}
                  </p>
                </div>

                {/* Right: Tools in Space Mono */}
                <div className="md:w-3/12 flex flex-wrap md:justify-end gap-1.5 font-mono text-[10px] uppercase">
                  {project.tools.slice(0, 3).map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="border border-[#1A1A1A] px-1.5 py-0.5 bg-[#F4F3EF] text-[#1A1A1A]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
