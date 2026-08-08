import React from 'react';
import { Coffee, Compass } from 'lucide-react';

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

        {/* Signature & Author Note */}
        <div className="mt-12 pt-8 border-t border-[#DDD7CC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#A67C52] text-white flex items-center justify-center font-serif text-xl font-bold shadow-xs">
              M.
            </div>
            <div>
              <p className="font-handwritten text-2xl text-[#2B2B2B]">
                — M.
              </p>
              <p className="text-xs text-[#666666] font-serif italic">
                Written Slowly. Read Gently.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-xs text-[#666666] font-sans">
            <span className="flex items-center space-x-1.5">
              <Coffee className="w-4 h-4 text-[#A67C52]" />
              <span>Cold Tea</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Compass className="w-4 h-4 text-[#A67C52]" />
              <span>Solitude</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
