import React from 'react';
import { ArrowUpRight, CheckCircle } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="w-full border-b border-[#1A1A1A] bg-[#F4F3EF] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-[#1A1A1A] gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#6B6A65] mb-2">
              [Background • 03]
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight">
              Design Philosophy & Objective
            </h2>
          </div>
          <div className="font-mono text-xs text-[#6B6A65]">
            Pragmatic • User-Centric • Systems-Driven
          </div>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Statement */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] leading-snug">
              "Good UI is invisible. Great UX removes hesitation before the user even realizes it."
            </h3>
            
            <div className="space-y-4 text-sm sm:text-base text-[#1A1A1A] leading-relaxed">
              <p>
                I am a Junior UX/UI Designer focusing on turning complex workflows into intuitive digital products. 
                Whether through rapid 4-day Figma sprints or scalable Notion databases, I bridge user research with strict design systems.
              </p>
              <p className="text-[#6B6A65]">
                Currently seeking a <strong className="text-[#1A1A1A]">UX/UI Design Apprenticeship</strong> starting in Fall 2026. 
                I bring rigorous wireframing, high-velocity prototyping, and an AI-augmented workflow to high-performing product teams.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3 font-mono text-xs">
              <div className="border border-[#1A1A1A] px-3 py-1.5 bg-[#EBEAE5] inline-flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#1A1A1A]" /> Rapid Figma Prototyping
              </div>
              <div className="border border-[#1A1A1A] px-3 py-1.5 bg-[#EBEAE5] inline-flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#1A1A1A]" /> Content-First Approach
              </div>
              <div className="border border-[#1A1A1A] px-3 py-1.5 bg-[#EBEAE5] inline-flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#1A1A1A]" /> Design Systems & Tokens
              </div>
            </div>
          </div>

          {/* Right Column: Apprenticeship Specs Card */}
          <div className="lg:col-span-5 border border-[#1A1A1A] p-6 sm:p-8 bg-[#1A1A1A] text-[#F4F3EF]">
            <div className="font-mono text-xs uppercase tracking-wider text-emerald-400 mb-4 pb-2 border-b border-[#333]">
              [Apprenticeship Specifications]
            </div>
            
            <div className="space-y-4 font-mono text-xs">
              <div>
                <span className="text-[#888] block">TARGET ROLE:</span>
                <span className="text-white font-bold text-sm">Junior UX / UI Product Designer</span>
              </div>
              <div>
                <span className="text-[#888] block">TIMELINE:</span>
                <span className="text-white font-bold">Fall 2026 (12 - 24 Months)</span>
              </div>
              <div>
                <span className="text-[#888] block">LOCATION:</span>
                <span className="text-white font-bold">Paris Region / Hybrid / Remote</span>
              </div>
              <div>
                <span className="text-[#888] block">ACADEMIC LEVEL:</span>
                <span className="text-white font-bold">Master's Degree in Digital Design / UX</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#333]">
              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center gap-2 border border-[#F4F3EF] bg-[#F4F3EF] text-[#1A1A1A] px-4 py-2.5 font-mono text-xs uppercase font-bold hover:bg-transparent hover:text-[#F4F3EF] transition-colors"
              >
                Send Direct Inquiry <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
