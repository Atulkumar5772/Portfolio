import React, { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Navbar({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-3 md:px-6 pt-3 select-none">
      <div
        className={`glass max-w-7xl mx-auto rounded-2xl px-5 md:px-8 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'py-2.5 !bg-[#0a090d]/90 shadow-2xl border-white/10' : 'py-3.5 bg-black/40 border-white/10'
        }`}
      >
        {/* Brand: ATUL. with red glowing initial */}
        <a
          href="#home"
          className="text-white text-xl sm:text-2xl font-black tracking-tight uppercase group flex items-center font-['Syne']"
        >
          <span className="text-[#FF1E38] drop-shadow-[0_0_12px_rgba(255,30,56,0.9)]">
            A
          </span>
          <span className="group-hover:text-red-400 transition-colors duration-300">
            TUL.
          </span>
        </a>

        {/* Desktop Nav Links with animated red underline hover */}
        <div className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-xs md:text-sm font-bold text-gray-400 uppercase tracking-[0.15em] transition-colors duration-300 hover:text-white group py-1"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF1E38] transition-all duration-300 ease-out group-hover:w-full shadow-[0_0_8px_rgba(255,30,56,0.8)]" />
            </a>
          ))}
        </div>

        {/* Action Buttons: Resume & Let's Talk */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenResume}
            className="glass inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-gray-200 hover:text-white border border-white/15 hover:border-red-500/50 hover:bg-white/10 transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-[#FF1E38]" />
            <span>RESUME</span>
          </button>
          <a
            href="#contact"
            className="glass-red inline-block px-5 py-2 rounded-full text-white text-xs font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-transform"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenResume}
            className="glass px-3 py-1.5 rounded-full text-[11px] font-bold uppercase text-white border border-white/10"
          >
            Resume
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-gray-300 hover:text-white bg-white/5 border border-white/10"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF1E38]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass max-w-7xl mx-auto rounded-2xl p-5 border border-white/10 bg-[#0a090d]/95 backdrop-blur-2xl shadow-2xl flex flex-col gap-4 animate-fade-in">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-[#FF1E38] transition-colors py-1 border-b border-white/5"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="glass-red text-center py-2.5 rounded-full text-white text-xs font-bold uppercase tracking-wider mt-2"
          >
            Let's Talk
          </a>
        </div>
      )}
    </nav>
  );
}
