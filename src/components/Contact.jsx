import React from 'react';
import { Mail, ArrowDown } from 'lucide-react';

export default function Contact() {
  const handleEmailClick = () => {
    window.location.href = 'mailto:kavitaraya99@gmail.com';
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-black text-white relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg md:text-xl font-light text-white/80 mb-8">
            If you have a General Or Project enquiry, please drop me an email — AVAILABLE NOW.
          </p>
          
          <div className="flex justify-center mb-12">
            <ArrowDown size={32} className="text-white/50 animate-bounce" />
          </div>

          <button
            onClick={handleEmailClick}
            className="inline-flex items-center gap-3 text-4xl md:text-5xl lg:text-6xl font-light tracking-wider hover:text-white/70 transition-colors group"
          >
            <Mail size={40} className="group-hover:scale-110 transition-transform" />
            SEND AN EMAIL
          </button>
        </div>
      </div>
    </section>
  );
}
