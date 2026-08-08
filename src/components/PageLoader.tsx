import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Feather } from 'lucide-react';

export const PageLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Page loader finishes smoothly in ~1.6 seconds (max 2s)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F8F7F4] text-[#2B2B2B] select-none pointer-events-none"
        >
          <div className="flex flex-col items-center space-y-6">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="p-5 rounded-full bg-[#EFEDE8] border border-[#DDD7CC] text-[#A67C52] shadow-xs"
            >
              <Feather className="w-8 h-8 animate-pulse text-[#A67C52]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <h1 className="font-serif text-xl sm:text-2xl font-normal tracking-wide text-[#2B2B2B]">
                The Day I Didn't Say
              </h1>
              <p className="font-serif italic text-xs text-[#A67C52] mt-1 tracking-widest">
                Poetry • Letters • Essays
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
