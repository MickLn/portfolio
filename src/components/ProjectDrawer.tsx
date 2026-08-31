import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../data/projects';

interface ProjectDrawerProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({ project, onClose }) => {
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

          {/* Drawer Slide-Over */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="relative w-full max-w-2xl bg-[#F4F3EF] border-l border-[#1A1A1A] h-full overflow-y-auto p-6 sm:p-10 z-10 flex flex-col justify-between"
          >
            <div>
              {/* Drawer Top Navigation */}
              <div className="flex justify-between items-start border-b border-[#D5D4CE] pb-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 font-mono-custom text-xs text-[#666664] uppercase mb-1">
                    <span>[{project.index}]</span>
                    <span>•</span>
                    <span>{project.category}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight">
                    {project.title}
                  </h2>
                  <p className="text-sm font-mono-custom text-[#666664] mt-1">
                    Timeline: {project.timeline}
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F3EF] transition-colors cursor-pointer"
                  aria-label="Close project drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Image Preview */}
              <div className="border border-[#1A1A1A] mb-8 overflow-hidden bg-[#E5E3DC]">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-64 sm:h-72 object-cover grayscale contrast-125"
                />
              </div>

              {/* Key Highlights Matrix */}
              <div className="grid grid-cols-3 gap-3 border-y border-[#D5D4CE] py-4 mb-8 font-mono-custom text-xs">
                {project.keyHighlights.map((item, idx) => (
                  <div key={idx}>
                    <span className="text-[#666664] block text-[10px] uppercase">{item.label}</span>
                    <span className="text-[#1A1A1A] font-bold mt-0.5 block">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Structured Content: Problem -> Solution -> Results */}
              <div className="space-y-8 text-[#1A1A1A]">
                {/* 1. Problem */}
                <div>
                  <h3 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[#666664] mb-2">
                    [01. THE FRICTION / PROBLEM]
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-[#1A1A1A]">
                    {project.problem}
                  </p>
                </div>

                {/* 2. Solution */}
                <div>
                  <h3 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[#666664] mb-2">
                    [02. DESIGN SYSTEM & SOLUTION]
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-[#1A1A1A]">
                    {project.solution}
                  </p>
                </div>

                {/* 3. Measurable Results */}
                <div>
                  <h3 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[#666664] mb-3">
                    [03. MEASURABLE RESULTS & DELIVERABLES]
                  </h3>
                  <div className="space-y-2">
                    {project.results.map((res, idx) => (
                      <div
                        key={idx}
                        className="border border-[#D5D4CE] p-3 bg-[#EAE8E2] text-xs sm:text-sm flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Tools Used */}
                <div>
                  <h3 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[#666664] mb-2">
                    [TOOLS & METHODS]
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-mono-custom border border-[#1A1A1A] bg-[#EAE8E2] text-[#1A1A1A]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-8 mt-8 border-t border-[#D5D4CE] flex flex-wrap gap-3 font-mono-custom text-xs">
              <a
                href="mailto:contact@mickaellin.design?subject=Inquiry regarding your project: "
                className="px-5 py-3 bg-[#1A1A1A] text-[#F4F3EF] hover:bg-black transition-colors flex items-center gap-2"
              >
                <span>DISCUSS THIS CASE STUDY</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button
                onClick={onClose}
                className="px-5 py-3 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F3EF] transition-colors cursor-pointer"
              >
                BACK TO PROJECTS
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
