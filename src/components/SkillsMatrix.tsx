import React from 'react';
import { SKILLS_DATA } from '../data/projects';

export const SkillsMatrix: React.FC = () => {
  return (
    <section id="skills" className="w-full border-b border-[#1A1A1A] bg-[#F4F3EF] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-[#1A1A1A] gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#6B6A65] mb-2">
              [Capabilities • 02]
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight">
              Design & Systems Toolkit
            </h2>
          </div>
          <div className="font-mono text-xs text-[#6B6A65]">
            Engineered for fast execution & structured iteration
          </div>
        </div>

        {/* 3-Column Skills Grid with sharp 1px borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[#1A1A1A] divide-y md:divide-y-0 md:divide-x divide-[#1A1A1A] bg-[#EBEAE5]">
          {SKILLS_DATA.map((group, idx) => (
            <div key={idx} className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="font-mono text-xs text-[#6B6A65] uppercase tracking-wider mb-2">
                  [0{idx + 1}] Focus Area
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A]">
                  {group.category}
                </h3>
              </div>

              <ul className="space-y-3 font-mono text-xs text-[#1A1A1A]">
                {group.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-center gap-2 border-b border-[#D5D4CE] pb-2 last:border-b-0">
                    <span className="text-[#6B6A65] font-bold">›</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Rapid summary badge */}
        <div className="mt-8 border border-[#1A1A1A] p-4 bg-[#F4F3EF] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#1A1A1A]"></span>
            <span className="font-bold">Core Working Environment:</span>
            <span className="text-[#6B6A65]">Figma • Webflow / Framer • Notion • Claude / Cursor AI</span>
          </div>
          <span className="text-[#6B6A65]">Ready for Apprenticeship integration</span>
        </div>

      </div>
    </section>
  );
};
