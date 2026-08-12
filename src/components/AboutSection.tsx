import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 max-w-3xl mx-auto">
      <div className="relative bg-[#FFFFFF] border border-[#DDD7CC] rounded-2xl p-8 sm:p-12 md:p-16 shadow-xs overflow-hidden">
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-8">
          <span className="w-8 h-[1px] bg-[#A67C52]" />
          <h2 className="font-serif text-xs uppercase tracking-widest text-[#A67C52] font-semibold">
            About This Place
          </h2>
        </div>

        {/* Title */}
        <h3 className="font-serif text-3xl sm:text-4xl text-[#2B2B2B] mb-8 font-normal leading-tight">
          A quiet corner off the digital highway
        </h3>

        {/* Formatted Text */}
        <div className="font-serif text-lg sm:text-xl text-[#2B2B2B]/90 space-y-6 leading-relaxed font-normal">
          <p className="first-letter-drop">
            This blog exists because I wanted to create a safe space to record and share my thoughts, letters, poetry, essays, and quiet reflections.
          </p>

          <p>
            It isn't a polished media platform, and it isn't optimized for an algorithm.
          </p>

          <p className="italic text-[#A67C52]">
            It is intentional, human, and probably a little unorganized—just like real thought always is.
          </p>

          <p>
            Here, off to the side of the digital highway, you'll find my personal diary entries, reflections on quiet moments, philosophical musings on thinking without a banister, and written scribbles meant to slow things down.
          </p>

          <div className="pt-4 space-y-2 font-serif text-xl sm:text-2xl text-[#A67C52]">
            <p>Thank you for wandering over to this quiet corner.</p>
            <p className="font-medium">Take your time.</p>
            <p className="font-medium">Read slowly.</p>
            <p className="font-medium italic">Stay a while.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
