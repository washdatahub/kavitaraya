import React from 'react';

export default function Story() {
  return (
    <section id="story" className="py-24 md:py-32 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <div className="order-2 md:order-1">
            <img
              src="/images/story.jpeg"
              alt="Kavita Raya"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight mb-6">
              I AM KAVITA RAYA. FASHION MODEL & CREATIVE PROFESSIONAL.
            </h2>
            
            <div className="space-y-4 text-white/80 font-light leading-relaxed text-base md:text-lg">
              <p>
                Currently working as a professional fashion model, bringing artistic vision to life 
                through collaborations with leading designers and photographers.
              </p>
              <p>
                Since the beginning of my career, I've always been passionate about fashion and 
                modeling. An interest that was influenced by the beauty of self-expression and 
                the power of visual storytelling.
              </p>
              <p>
                I have always believed that fashion is a form of art and self-expression. My 
                mission is to represent elegance, diversity, and authenticity through fashion 
                and modeling.
              </p>
              <p>
                Through my distinctive style and professional dedication, I continue to make my 
                mark in the fashion industry, working across editorial, commercial, and 
                high-fashion campaigns.
              </p>
            </div>

            <button className="mt-8 px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-sm font-light tracking-wider uppercase rounded-full">
              View CV
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
