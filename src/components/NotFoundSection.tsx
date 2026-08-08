import React from 'react';
import { motion } from 'motion/react';
import { Home, Feather } from 'lucide-react';

interface NotFoundSectionProps {
  onReturnHome: () => void;
}

export const NotFoundSection: React.FC<NotFoundSectionProps> = ({ onReturnHome }) => {
  return (
    <section className="min-h-[75vh] flex flex-col justify-center items-center text-center px-4 py-20 relative">
      <div className="max-w-md mx-auto space-y-8">
        {/* Feather Illustration */}
        <div className="relative flex justify-center items-center">
          <div className="p-6 rounded-full bg-[#EFEDE8] border border-[#DDD7CC] text-[#A67C52] shadow-xs">
            <Feather className="w-12 h-12" />
          </div>

          {/* Falling Leaf Animation */}
          <motion.div
            initial={{ y: -20, x: 10, rotate: 0, opacity: 0 }}
            animate={{
              y: [0, 40, 90, 140],
              x: [10, -25, 15, -10],
              rotate: [0, 45, -30, 90],
              opacity: [0, 1, 0.8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 1.5,
            }}
            className="absolute top-2 right-12 pointer-events-none"
          >
            <svg className="w-5 h-5 text-[#8A6A4A]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10 1.25 0 2.44-.23 3.54-.65-.48-.68-.84-1.46-1.04-2.31C13.62 19.34 12.83 19.5 12 19.5c-4.14 0-7.5-3.36-7.5-7.5S7.86 4.5 12 4.5s7.5 3.36 7.5 7.5c0 .83-.16 1.62-.46 2.36.85.2 1.63.56 2.31 1.04.42-1.1.65-2.29.65-3.54 0-5.52-4.48-10-10-10z" />
            </svg>
          </motion.div>
        </div>

        <div className="space-y-3">
          <span className="font-mono text-xs text-[#8A6A4A] tracking-widest uppercase">
            Error 404 • Page Not Found
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#202020] font-normal leading-tight">
            Perhaps this page was never written.
          </h2>
          <p className="font-body text-sm text-[#5B5B5B] leading-relaxed">
            The path you sought seems to linger in the unsaid. You are welcome to return to the library home.
          </p>
        </div>

        <button
          onClick={onReturnHome}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#304B3D] text-white text-xs font-medium hover:bg-[#253B30] transition-colors shadow-xs cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </button>
      </div>
    </section>
  );
};
