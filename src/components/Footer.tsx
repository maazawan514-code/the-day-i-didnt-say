import React from 'react';
import { Feather, Mail, Instagram, Rss } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onOpenRss: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenRss }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-24 border-t border-[#DDD7CC] bg-[#FFFFFF] py-16 px-4 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div>
            <h3 className="font-serif text-xl text-[#2B2B2B] font-medium">
              The Day I Didn't Say
            </h3>
            <p className="font-serif italic text-xs text-[#A67C52]">
              Poetry • Letters • Essays • Reflections
            </p>
          </div>
        </div>

        {/* Footer Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-xs text-[#666666] font-medium">
          <button onClick={() => onNavClick('home')} className="hover:text-[#A67C52] transition-colors cursor-pointer">
            Home
          </button>
          <button onClick={() => onNavClick('posts')} className="hover:text-[#A67C52] transition-colors cursor-pointer">
            Entries
          </button>
          <button onClick={() => onNavClick('about')} className="hover:text-[#A67C52] transition-colors cursor-pointer">
            About
          </button>
          <button onClick={() => onNavClick('archive')} className="hover:text-[#A67C52] transition-colors cursor-pointer">
            Archive
          </button>
          <button onClick={() => onNavClick('contact')} className="hover:text-[#A67C52] transition-colors cursor-pointer">
            Contact
          </button>
          <button onClick={onOpenRss} className="hover:text-[#A67C52] transition-colors flex items-center space-x-1 cursor-pointer">
            <Rss className="w-3 h-3 text-[#A67C52]" />
            <span>RSS</span>
          </button>
        </nav>

        {/* Social Links & Back to Top Feather */}
        <div className="flex items-center space-x-4 text-[#666666]">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=salehaawan92@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Email: Salehaawan92@gmail.com"
            className="p-2.5 rounded-full hover:bg-[#EFEDE8] hover:text-[#A67C52] transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>

          <a
            href="https://instagram.com/sualeha.16"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram: @sualeha.16"
            className="p-2.5 rounded-full hover:bg-[#EFEDE8] hover:text-[#A67C52] transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>

          {/* Feather Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Back to top"
            className="p-3 rounded-full border border-[#DDD7CC] hover:border-[#A67C52] hover:text-[#A67C52] transition-colors bg-[#F8F7F4] shadow-xs flex items-center space-x-1 cursor-pointer"
          >
            <Feather className="w-4 h-4 text-[#A67C52]" />
            <span className="text-[10px] font-mono uppercase tracking-wider hidden sm:inline">Top</span>
          </motion.button>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-[#DDD7CC]/60 text-center text-[11px] text-[#666666]/80 font-serif">
        <p>
          © {new Date().getFullYear()} The Day I Didn't Say. Handcrafted with quiet intention. No trackers or commercial ads.
        </p>
      </div>
    </footer>
  );
};
