import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function Portfolio() {
  const [selectedImage, setSelectedImage] = useState(null);

  const portfolioItems = [
    {
      image: '/images/portfolio/P1.jpeg',
      title: 'Editorial',
      description: 'Fashion Editorial'
    },
    {
      image: '/images/portfolio/P2.jpeg',
      title: 'Commercial',
      description: 'Brand Campaign'
    },
    {
      image: '/images/portfolio/P3.jpeg',
      title: 'High Fashion',
      description: 'Runway & Couture'
    },
    {
      image: '/images/portfolio/P4.jpeg',
      title: 'Beauty',
      description: 'Beauty Campaign'
    },
  ];

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-wider mb-6 text-black">
            PORTFOLIO & WORK
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden"
              onClick={() => setSelectedImage(item.image)}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>
              </div>
              
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl md:text-3xl font-light tracking-wider text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-sm font-light text-white/80 uppercase tracking-wider">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:opacity-70 transition-opacity z-10"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage}
            alt="Kavita Raya Portfolio"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
