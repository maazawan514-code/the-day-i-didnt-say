import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Clock, Sparkles, Feather } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  totalReadingTime?: string;
  postCount?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  totalReadingTime = '~35 min total',
  postCount = 8,
}) => {
  const titleWords = ["The", "Day", "I", "Didn't", "Say"];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 pt-28 pb-16 overflow-hidden">
      {/* Background Soft Glow & Paper Grain Overlay */}
      <div className="absolute inset-0 paper-grain pointer-events-none opacity-60" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8 flex flex-col items-center">
        {/* Subtle Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#EFEDE8] border border-[#DDD7CC] text-xs font-medium text-[#A67C52] tracking-wide shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#A67C52]" />
          <span>A Quiet Corner of the Internet</span>
        </motion.div>

        {/* Cinematic Literary Animated Title with Shimmer & Moonlight Sweep */}
        <div className="relative group overflow-hidden py-2 px-4 rounded-xl">
          {/* Soft Golden Shimmer Sweep Bar during Reveal */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-[#A67C52]/20 to-transparent animate-golden-shimmer" />
          </div>

          {/* 30-Second Moonlight Diagonal Light Sweep */}
          <div className="absolute -inset-10 pointer-events-none overflow-hidden">
            <div className="w-1/2 h-[300%] bg-gradient-to-r from-transparent via-white/80 to-transparent animate-moonlight-sweep -top-full left-0 blur-sm" />
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-[#2B2B2B] leading-[1.08] flex flex-wrap justify-center gap-x-4 sm:gap-x-6 relative z-10 select-none">
            {titleWords.map((word, index) => (
              <span
                key={index}
                className={`inline-block animate-word-cumulative-${index}`}
              >
                {word}
              </span>
            ))}
          </h1>
        </div>

        {/* Hero Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-xl sm:text-2xl text-[#A67C52] italic tracking-wide font-light max-w-xl mx-auto"
        >
          &ldquo;Some words are easier to write than to say.&rdquo;
        </motion.blockquote>

        {/* Subtitle Category Tags */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-sm uppercase tracking-widest text-[#666666] font-medium"
        >
          Poetry • Letters • Essays • Reflections
        </motion.p>

        {/* Calming Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-base sm:text-lg text-[#666666] max-w-xl mx-auto leading-relaxed font-light"
        >
          A peaceful refuge for diary entries, poetry, unmailed letters, and slow essays.
          Written by hand, read at leisure.
        </motion.p>

        {/* Reading Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="flex items-center justify-center space-x-6 text-xs text-[#666666] pt-2 font-mono"
        >
          <span className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-[#A67C52]" />
            <span>{totalReadingTime}</span>
          </span>
          <span className="text-[#DDD7CC]">•</span>
          <span>{postCount} Published Reflections</span>
        </motion.div>

        {/* Begin Reading Button & Gentle Bouncing Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.7, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6 flex flex-col items-center"
        >
          <button
            onClick={onExploreClick}
            className="group flex flex-col items-center space-y-3 text-xs text-[#666666] hover:text-[#A67C52] transition-colors focus:outline-none cursor-pointer"
          >
            <span className="tracking-widest uppercase text-[10px] font-medium">Begin Reading</span>
            <div className="p-3 rounded-full border border-[#DDD7CC] group-hover:border-[#A67C52] transition-colors bg-[#FFFFFF] shadow-xs">
              <ArrowDown className="w-4 h-4 animate-bounce text-[#A67C52]" />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
