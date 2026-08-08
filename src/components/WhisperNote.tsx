import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Feather, X } from 'lucide-react';

const WHISPER_NOTES = [
  "Some words take years.",
  "You found this place.",
  "Read slowly.",
  "What is unsaid remains untamed.",
  "Every silence holds a memory.",
  "The quietest moments leave the deepest marks.",
];

export const WhisperNote: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [noteIndex, setNoteIndex] = useState(0);

  useEffect(() => {
    // Show handwritten note after 45 seconds
    const timer = setTimeout(() => {
      setNoteIndex(Math.floor(Math.random() * WHISPER_NOTES.length));
      setVisible(true);
    }, 45000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (visible) {
      // Automatically fade away after 8 seconds
      const fadeTimer = setTimeout(() => {
        setVisible(false);
      }, 8000);
      return () => clearTimeout(fadeTimer);
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(4px)', transition: { duration: 1 } }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 right-8 z-40 max-w-sm p-5 rounded-2xl bg-[#FFFFFF]/95 border border-[#DDD7CC] text-[#2B2B2B] shadow-xl backdrop-blur-md"
        >
          <div className="flex items-start justify-between space-x-3">
            <div className="flex items-center space-x-2 text-[#A67C52] text-xs font-serif italic mb-2">
              <Feather className="w-3.5 h-3.5" />
              <span>A Quiet Note</span>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="text-[#666666] hover:text-[#2B2B2B] transition-colors p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="font-handwritten text-xl sm:text-2xl text-[#2B2B2B] leading-snug">
            "{WHISPER_NOTES[noteIndex]}"
          </p>
          <div className="mt-3 text-[10px] font-mono text-[#A67C52]/80 text-right italic">
            — The Day I Didn't Say
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
