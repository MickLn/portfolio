import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="min-h-screen pt-28 pb-16 px-6 md:px-12 lg:px-16 flex flex-col justify-center border-b border-[#D5D4CE]"
    >
      {/* 3-Column Editorial Raw Layout */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Name & Target Role (Geist font) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 flex flex-col justify-center"
        >
          <span className="font-mono-custom text-xs uppercase tracking-widest text-[#666664] mb-3 block">
            [01. CANDIDATE PROFILE]
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-[#1A1A1A] leading-[1.05]">
            Mickael<br />LIN
          </h1>
          <p className="text-lg sm:text-xl font-medium tracking-tight text-[#1A1A1A] mt-4">
            Junior UX/UI Designer
          </p>
        </motion.div>

        {/* Middle Column: Centered Profile Photo (1px sharp border, monochrome aesthetic) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 flex justify-center items-center"
        >
          <div className="relative w-56 h-72 sm:w-64 sm:h-80 md:w-72 md:h-96 border border-[#1A1A1A] p-2 bg-[#F4F3EF] group">
            <div className="w-full h-full border border-[#D5D4CE] overflow-hidden bg-[#E5E3DC] relative">
              {/* Clean Minimalist Portrait Representation */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                alt="Mickael LIN — Junior UX/UI Designer"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-[#1A1A1A]/10 mix-blend-multiply pointer-events-none" />
            </div>

            {/* Corner Markers */}
            <span className="absolute -top-1 -left-1 text-[9px] font-mono-custom text-[#1A1A1A] bg-[#F4F3EF] px-0.5">+</span>
            <span className="absolute -top-1 -right-1 text-[9px] font-mono-custom text-[#1A1A1A] bg-[#F4F3EF] px-0.5">+</span>
            <span className="absolute -bottom-1 -left-1 text-[9px] font-mono-custom text-[#1A1A1A] bg-[#F4F3EF] px-0.5">+</span>
            <span className="absolute -bottom-1 -right-1 text-[9px] font-mono-custom text-[#1A1A1A] bg-[#F4F3EF] px-0.5">+</span>
          </div>
        </motion.div>

        {/* Right Column: Apprenticeship Status (High visibility, Space Mono, No fluff) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 flex flex-col justify-center lg:items-end lg:text-right"
        >
          <div className="border border-[#1A1A1A] p-6 bg-[#EAE8E2] w-full max-w-sm">
            <div className="flex items-center gap-2 mb-3 lg:justify-end">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse-live" />
              <span className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                STATUS: AVAILABLE
              </span>
            </div>

            <div className="font-mono-custom text-sm font-bold text-[#1A1A1A] tracking-tight uppercase">
              SEEKING APPRENTICESHIP
            </div>
            
            <div className="font-mono-custom text-xs text-[#1A1A1A] mt-1 font-semibold">
              TIMELINE: IMMEDIATE / ASAP
            </div>

            <div className="border-t border-[#D5D4CE] mt-4 pt-3 text-xs font-mono-custom text-[#666664]">
              LOCATION: PARIS & REMOTE
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
