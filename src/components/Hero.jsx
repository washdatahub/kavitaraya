import React from 'react';
import { ArrowDown, Mail } from 'lucide-react';

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Image Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-image.jpeg"
          alt="Kavita Raya"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Overlay */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-7xl md:text-8xl lg:text-[150px] font-light tracking-wider mb-6 text-white">
            THIS IS
          </h1>
          <h2 className="text-7xl md:text-8xl lg:text-[150px] font-light tracking-wider mb-8 text-white">
            KAVITA RAYA
          </h2>
          <p className="text-xl md:text-2xl font-light tracking-wider uppercase text-white/90 mb-12">
            Fashion Model
          </p>
          
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-sm font-light tracking-wider uppercase rounded-full"
          >
            <Mail size={16} />
            Contact
          </button>
        </div>
      </div>

      {/* Copyright notice */}
      <div className="absolute bottom-6 right-6 z-10 text-white/70 text-xs font-light">
        ©{new Date().getFullYear()}, ALL RIGHTS RESERVED
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <ArrowDown size={24} className="text-white" />
      </div>
    </section>
  );
}
