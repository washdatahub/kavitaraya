import React from 'react';
import { Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 bg-black text-white border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <a
              href="https://www.instagram.com/kavitaa_raya/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors text-sm font-light tracking-wider uppercase"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/princessprincess.nishu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors text-sm font-light tracking-wider uppercase"
            >
              Facebook
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm font-light text-white/60 mb-2">
              KAVITA RAYA ©{new Date().getFullYear()}
            </p>
            <p className="text-xs font-light text-white/40">
              ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
