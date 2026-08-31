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
    <header className="fixed top-0 left-0 w-full z-40 pointer-events-none p-6 md:p-8 flex justify-between items-center text-xs tracking-wider uppercase font-mono-custom text-[#1A1A1A]">
      {/* Brand / Logo Indicator */}
      <div className="pointer-events-auto">
        <button
          onClick={() => scrollToSection('home')}
          className="text-left font-bold tracking-widest hover:opacity-60 transition-opacity flex items-center gap-2 group cursor-pointer"
          aria-label="Back to top"
        >
          <span className="inline-block w-1.5 h-1.5 bg-[#1A1A1A] group-hover:scale-125 transition-transform" />
          <span>MICKAEL LIN</span>
        </button>
      </div>

      {/* 3 Direct Clickable Links — Zero Background, Fixed */}
      <nav className="pointer-events-auto flex items-center gap-6 md:gap-10">
        <button
          onClick={() => scrollToSection('home')}
          className="link-drawer hover:text-black transition-colors cursor-pointer py-1"
        >
          [01] HOME
        </button>
        <button
          onClick={onOpenAbout}
          className="link-drawer hover:text-black transition-colors cursor-pointer py-1"
        >
          [02] ABOUT
        </button>
        <button
          onClick={() => scrollToSection('projects')}
          className="link-drawer hover:text-black transition-colors cursor-pointer py-1"
        >
          [03] PROJECTS
        </button>
      </nav>
    </header>
  );
};
