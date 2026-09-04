import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUp, FileText, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenAbout: () => void;
}

// Minimalist Back-to-Top Button (Strict Vertical Arrow)
const BackToTopButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-11 h-11 rounded-full border border-[#D5D4CE]/30 hover:border-[#F4F3EF] flex items-center justify-center text-[#F4F3EF] hover:bg-[#F4F3EF] hover:text-[#1A1A1A] transition-all duration-300 group cursor-pointer select-none"
      aria-label="Remonter en haut de page"
    >
      <ArrowUp
        className={`w-4 h-4 transition-transform duration-300 ease-out ${
          isHovered ? '-translate-y-1' : 'translate-y-0'
        }`}
      />
    </button>
  );
};

export const Footer: React.FC<FooterProps> = ({ onOpenAbout }) => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: '-40px' });
  const { language, t } = useLanguage();

  const footerLinks = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/mickael-lin/',
      external: true,
    },
    {
      label: language === 'en' ? 'Contact me' : 'Me contacter',
      href: 'mailto:mickael.lin.etud@gmail.com',
      external: false,
    },
    {
      label: 'CV (PDF)',
      href: '/cv-mickael-lin.pdf',
      external: true,
    },
  ];

  return (
    <footer
      id="contact"
      ref={containerRef}
      className="relative w-full bg-[#141414] text-[#F4F3EF] pt-14 pb-10 px-6 sm:px-12 lg:px-16 flex flex-col justify-between select-none"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col justify-between flex-1 gap-10">
        
        {/* 1. Minimal Top Status Bar (Pure Typography, No Blinking Dot, No Duplicate Paris) */}
        <div className="border-b border-[#2E2E2E] pb-4 flex items-center justify-between font-mono-custom text-xs">
          <span className="text-[#A3A3A3] uppercase tracking-wider font-medium">
            {t('footer.status')}
          </span>
        </div>

        {/* 2. Focused & Restrained Alternance Presentation (No AI-slop Slogan) */}
        <div className="py-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 max-w-3xl"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F4F3EF] leading-snug">
              {t('footer.headline')}
            </h3>

            <p className="text-sm sm:text-base text-[#A3A3A3] font-normal leading-relaxed">
              {t('footer.sub')}
            </p>
          </motion.div>

          {/* Action Buttons (Sharp, Restrained 1px Borders) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3 pt-2 font-mono-custom text-xs"
          >
            {/* Direct Email Contact */}
            <a
              href="mailto:mickael.lin.etud@gmail.com?subject=Opportunit%C3%A9%20Alternance%20UX%2FUI"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#F4F3EF] text-[#1A1A1A] font-bold hover:bg-white transition-colors shadow-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{t('footer.cta_contact')}</span>
            </a>

            {/* Direct CV PDF Link */}
            <a
              href="/cv-mickael-lin.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 border border-[#D5D4CE]/40 text-[#F4F3EF] font-bold hover:border-[#F4F3EF] hover:bg-[#F4F3EF]/10 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t('footer.cta_cv')}</span>
            </a>

            {/* About Modal CTA */}
            <button
              type="button"
              onClick={onOpenAbout}
              className="inline-flex items-center gap-2 px-5 py-3 border border-[#D5D4CE]/40 text-[#F4F3EF] font-bold hover:border-[#F4F3EF] hover:bg-[#F4F3EF]/10 transition-colors cursor-pointer"
            >
              <span>{t('footer.cta_about')}</span>
            </button>
          </motion.div>
        </div>

        {/* 3. Bottom Links & Back-To-Top (No Extra Arrows, Pure Link Underline Hover) */}
        <div className="pt-6 border-t border-[#2E2E2E] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono-custom text-xs">
          {/* Quick Footer Links */}
          <div className="flex flex-wrap gap-8 sm:gap-10">
            {footerLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="link-drawer text-[#8E8E8A] hover:text-[#F4F3EF] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright & Back to Top Button */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-6">
            <span className="text-[11px] text-[#666664]">
              © {new Date().getFullYear()} MICKAEL LIN
            </span>

            <BackToTopButton />
          </div>
        </div>

      </div>
    </footer>
  );
};
