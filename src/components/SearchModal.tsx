import React, { useState, useEffect } from 'react';
import { Post, Category } from '../types';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post[];
  onSelectPost: (post: Post) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  posts,
  onSelectPost,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<Category | 'All'>('All');
  const [isFocused, setIsFocused] = useState(false);

  // Listen for Cmd+K or Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPosts = posts.filter((post) => {
    const matchesCat = selectedCat === 'All' || post.category === selectedCat;
    const q = query.toLowerCase().trim();
    if (!q) return matchesCat;

    const matchesQuery =
      post.title.toLowerCase().includes(q) ||
      (post.subtitle && post.subtitle.toLowerCase().includes(q)) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q)) ||
      post.category.toLowerCase().includes(q);

    return matchesCat && matchesQuery;
  });

  const categories: Category[] = Array.from(new Set(posts.map((p) => p.category))) as Category[];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-md transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl bg-[#FFFFFF]/95 backdrop-blur-xl border border-[#DDD7CC] rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.12),0_8px_25px_rgba(166,124,82,0.08)] overflow-hidden flex flex-col max-h-[82vh] relative"
        >
          {/* Moonlight Focus Glow Overlay */}
          <div
            className={`absolute -inset-4 rounded-[28px] transition-opacity duration-700 pointer-events-none ${
              isFocused ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background:
                'radial-gradient(circle at center, rgba(166, 124, 82, 0.09) 0%, transparent 70%)',
            }}
          />

          {/* Search Bar Input Header */}
          <div className="relative flex items-center px-6 py-4.5 border-b border-[#DDD7CC]/80 bg-[#FFFFFF]/80 group">
            {/* Morphing / Rotating Search Icon */}
            <motion.div
              animate={{ rotate: isFocused ? 90 : 0, scale: isFocused ? 1.1 : 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mr-3.5 flex-shrink-0 text-[#A67C52]"
            >
              {query ? <Sparkles className="w-5 h-5 text-[#A67C52]" /> : <Search className="w-5 h-5 text-[#A67C52]" />}
            </motion.div>

            <input
              type="text"
              placeholder="Search entries by title, keyword, or year... (ESC to close)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full bg-transparent text-base text-[#2B2B2B] focus:outline-none placeholder-[#666666]/60 font-serif leading-relaxed caret-[#A67C52]"
              autoFocus
            />

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#EFEDE8] text-[#666666] hover:text-[#2B2B2B] ml-2 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Filter Categories */}
          <div className="px-6 py-3 border-b border-[#DDD7CC]/70 bg-[#F8F7F4]/90 flex items-center space-x-2 overflow-x-auto text-xs">
            <button
              onClick={() => setSelectedCat('All')}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-300 cursor-pointer font-serif ${
                selectedCat === 'All'
                  ? 'bg-[#A67C52] text-white shadow-xs'
                  : 'text-[#666666] hover:bg-[#EFEDE8] hover:text-[#2B2B2B]'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-300 cursor-pointer font-serif ${
                  selectedCat === cat
                    ? 'bg-[#A67C52] text-white shadow-xs'
                    : 'text-[#666666] hover:bg-[#EFEDE8] hover:text-[#2B2B2B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Results List with Blur-In Animation */}
          <div className="overflow-y-auto p-4 space-y-2 divide-y divide-[#DDD7CC]/40">
            {filteredPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                className="text-center py-12 text-[#666666] font-serif text-base italic"
              >
                No quiet entries found matching your search.
              </motion.div>
            ) : (
              filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, filter: 'blur(6px)', y: 8 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
                  onClick={() => {
                    onSelectPost(post);
                    onClose();
                  }}
                  className="pt-3.5 pb-3.5 px-4 rounded-xl hover:bg-[#F8F7F4] border border-transparent hover:border-[#DDD7CC]/60 cursor-pointer transition-all duration-300 group flex items-center justify-between"
                >
                  <div className="pr-4">
                    <div className="flex items-center space-x-2 text-[10px] font-mono text-[#A67C52] mb-1">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <h4 className="font-serif text-base text-[#2B2B2B] font-medium group-hover:text-[#A67C52] transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-xs text-[#666666] line-clamp-1 mt-0.5 font-body">
                      {post.excerpt}
                    </p>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#A67C52] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 flex-shrink-0" />
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

