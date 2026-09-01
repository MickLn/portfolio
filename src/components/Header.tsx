import React from 'react';

interface HeaderProps {
  onOpenAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAbout }) => {
  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-14 sm:h-16 z-40 pointer-events-none px-6 md:px-12 flex justify-center items-center text-xs tracking-wider uppercase font-mono-custom text-[#1A1A1A]">
      {/* 3 Clickable Links — Centered in Upper Header Grid Cell */}
      <nav className="pointer-events-auto flex items-center gap-8 md:gap-12">
        <button
          onClick={() => scrollToSection('home')}
          className="link-drawer hover:text-black transition-colors cursor-pointer py-1 text-[11px] sm:text-xs"
        >
          HOME
        </button>
        <button
          onClick={onOpenAbout}
          className="link-drawer hover:text-black transition-colors cursor-pointer py-1 text-[11px] sm:text-xs"
        >
          ABOUT
        </button>
        <button
          onClick={() => scrollToSection('projects')}
          className="link-drawer hover:text-black transition-colors cursor-pointer py-1 text-[11px] sm:text-xs"
        >
          PROJECTS
        </button>
      </nav>
    </header>
  );
};
