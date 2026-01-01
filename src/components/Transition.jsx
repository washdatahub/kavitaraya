import React from 'react';

export default function Transition() {
  return (
    <section className="relative w-full h-[60vh] md:h-[150vh] overflow-hidden">
      <img
        src="/images/T1.jpg"
        alt="Kavita Raya"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20"></div>
    </section>
  );
}

