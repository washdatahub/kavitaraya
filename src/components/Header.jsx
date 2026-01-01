import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <div className="hidden md:block text-white/80 text-xs font-light tracking-wider uppercase">
          BASED IN NEPAL
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white p-2 hover:opacity-70 transition-opacity"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="hidden md:flex items-center space-x-10">
          <button 
            onClick={() => scrollToSection('home')} 
            className="text-sm font-light tracking-wider uppercase text-white/80 hover:text-white transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('portfolio')} 
            className="text-sm font-light tracking-wider uppercase text-white/80 hover:text-white transition-colors"
          >
            Portfolio
          </button>
          <button 
            onClick={() => scrollToSection('story')} 
            className="text-sm font-light tracking-wider uppercase text-white/80 hover:text-white transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('instagram')} 
            className="text-sm font-light tracking-wider uppercase text-white/80 hover:text-white transition-colors"
          >
            Work
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="text-sm font-light tracking-wider uppercase text-white/80 hover:text-white transition-colors"
          >
            Contact
          </button>
        </nav>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-black/98 backdrop-blur-md border-t border-white/10">
          <ul className="container mx-auto px-6 py-6 space-y-5">
            <li>
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-base font-light tracking-wider uppercase text-white/80 hover:text-white transition-colors w-full text-left"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('portfolio')} 
                className="text-base font-light tracking-wider uppercase text-white/80 hover:text-white transition-colors w-full text-left"
              >
                Portfolio
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('story')} 
                className="text-base font-light tracking-wider uppercase text-white/80 hover:text-white transition-colors w-full text-left"
              >
                About
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('instagram')} 
                className="text-base font-light tracking-wider uppercase text-white/80 hover:text-white transition-colors w-full text-left"
              >
                Work
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-base font-light tracking-wider uppercase text-white/80 hover:text-white transition-colors w-full text-left"
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
