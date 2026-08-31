import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenAbout: () => void;
}

// Magnetic Back-to-Top Button
const BackToTopButton: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ref.current) {
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const middleX = e.clientX - (left + width / 2);
      const middleY = e.clientY - (top + height / 2);
      setPosition({ x: middleX * 0.35, y: middleY * 0.35 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      ref={ref}
      onClick={scrollToTop}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 15, mass: 0.1 }}
      className="w-14 h-14 rounded-full border border-[#D5D4CE]/30 hover:border-[#F4F3EF] flex items-center justify-center text-[#F4F3EF] hover:bg-[#F4F3EF] hover:text-[#1A1A1A] transition-colors duration-300 group cursor-pointer"
      aria-label="Scroll back to top"
    >
      <ArrowUp
        className={`w-5 h-5 transition-transform duration-300 ${
          isHovered ? 'rotate-45' : ''
        }`}
      />
    </motion.button>
  );
};

export const Footer: React.FC<FooterProps> = ({ onOpenAbout }) => {
  const [localTime, setLocalTime] = useState<string>('');
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: '-40px' });

  // Update Paris / Local live clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-GB', {
        timeZone: 'Europe/Paris',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setLocalTime(timeString);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://linkedin.com', external: true },
    { label: 'Figma Community', href: 'https://figma.com', external: true },
    { label: 'GitHub', href: 'https://github.com', external: true },
    { label: 'Direct Email', href: 'mailto:contact@mickaellin.design', external: false }
  ];

  return (
    <footer
      id="contact"
      ref={containerRef}
      className="relative w-full bg-[#141414] text-[#F4F3EF] pt-24 pb-12 px-6 md:px-12 lg:px-16 min-h-[620px] flex flex-col justify-between"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-between flex-1">
        
        {/* Top Meta Bar in Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2E2E2E] pb-6 mb-12 gap-4 font-mono-custom text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse-live" />
            <span className="text-[#F4F3EF] uppercase tracking-wider font-bold">
              STATUS: AVAILABLE FOR APPRENTICESHIP (ASAP)
            </span>
          </div>

          <div className="text-[#A3A3A3] flex items-center gap-2">
            <span>PARIS, FR (UTC+1/2):</span>
            <span className="text-[#F4F3EF] font-bold">{localTime || '19:46:00'}</span>
          </div>
        </div>

        {/* Kinetic Headline Reveal */}
        <div className="my-auto py-6">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : { y: '100%' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-[#F4F3EF] leading-[0.95]"
            >
              Let's work together.
            </motion.h2>
          </div>

          <div className="overflow-hidden mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="mailto:contact@mickaellin.design?subject=UX/UI Apprenticeship Opportunity"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#F4F3EF] text-[#1A1A1A] font-mono-custom text-xs uppercase tracking-wider font-bold hover:bg-white hover:scale-[1.02] transition-all duration-200"
              >
                <span>INITIATE CONTACT</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenAbout}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#D5D4CE]/40 text-[#F4F3EF] font-mono-custom text-xs uppercase tracking-wider hover:border-[#F4F3EF] transition-colors cursor-pointer"
              >
                <span>VIEW PROFILE SUMMARY</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Bottom Social Links & Back-To-Top */}
        <div className="pt-12 mt-10 border-t border-[#2E2E2E] flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          {/* Quick Links with Custom Underline Drawer Animation */}
          <div className="flex flex-wrap gap-6 sm:gap-10 font-mono-custom text-xs text-[#A3A3A3]">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="link-drawer text-[#F4F3EF] hover:text-white transition-colors flex items-center gap-1"
              >
                <span>{link.label}</span>
                {link.external && <ArrowUpRight className="w-3 h-3 text-[#A3A3A3]" />}
              </a>
            ))}
          </div>

          {/* Right: Copyright & Back-to-Top Button */}
          <div className="flex items-center justify-between w-full md:w-auto gap-8">
            <div className="font-mono-custom text-[11px] text-[#A3A3A3]">
              <div>© {new Date().getFullYear()} MICKAEL LIN</div>
            </div>

            <BackToTopButton />
          </div>
        </div>

      </div>
    </footer>
  );
};
