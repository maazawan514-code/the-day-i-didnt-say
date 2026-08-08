import React, { useState } from 'react';
import { Post, Category } from '../types';
import { Calendar, Tag, FolderOpen, ArrowUpRight, Clock } from 'lucide-react';

interface ArchiveViewProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({ posts, onSelectPost }) => {
  const [selectedYear, setSelectedYear] = useState<number | 'All'>('All');
  const [selectedTag, setSelectedTag] = useState<string | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

  // Extract unique years
  const years = Array.from(new Set(posts.map((p) => p.year))).sort((a: number, b: number) => b - a);

  // Extract unique tags
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  // Categories list derived from posts
  const categories: Category[] = Array.from(new Set(posts.map((p) => p.category))) as Category[];

  // Filter posts
  const filtered = posts.filter((p) => {
    const matchesYear = selectedYear === 'All' || p.year === selectedYear;
    const matchesTag = selectedTag === 'All' || p.tags.includes(selectedTag);
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesYear && matchesTag && matchesCat;
  });

  return (
    <div className="py-16 px-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="font-serif text-xs uppercase tracking-widest text-[#A67C52] font-semibold">
          Complete Records
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl text-[#2B2B2B] font-normal">
          The Archive
        </h2>
        <p className="font-body text-sm text-[#666666]">
          An organized timeline of reflections, poetry stanzas, essays, and letters sorted by year, category, and theme.
        </p>
      </div>

      {/* Filter Bar Controls */}
      <div className="mb-10 p-6 rounded-2xl bg-[#FFFFFF] border border-[#DDD7CC] space-y-6 shadow-xs">
        {/* Filter By Category */}
        <div>
          <label className="block font-serif text-xs uppercase tracking-wider text-[#A67C52] mb-2 font-semibold">
            Filter by Category
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-[#A67C52] text-white'
                  : 'bg-[#EFEDE8] text-[#666666] hover:bg-[#DDD7CC]'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#A67C52] text-white'
                    : 'bg-[#EFEDE8] text-[#666666] hover:bg-[#DDD7CC]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filter By Year */}
        <div>
          <label className="block font-serif text-xs uppercase tracking-wider text-[#A67C52] mb-2 font-semibold">
            Filter by Year
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedYear('All')}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                selectedYear === 'All'
                  ? 'bg-[#A67C52] text-white'
                  : 'bg-[#EFEDE8] text-[#666666] hover:bg-[#DDD7CC]'
              }`}
            >
              All Years
            </button>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                  selectedYear === y
                    ? 'bg-[#A67C52] text-white'
                    : 'bg-[#EFEDE8] text-[#666666] hover:bg-[#DDD7CC]'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* Filter By Tags */}
        <div>
          <label className="block font-serif text-xs uppercase tracking-wider text-[#A67C52] mb-2 font-semibold">
            Filter by Theme Tag
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedTag('All')}
              className={`px-2.5 py-0.5 rounded-md text-[11px] transition-colors cursor-pointer ${
                selectedTag === 'All'
                  ? 'bg-[#A67C52] text-white'
                  : 'bg-[#EFEDE8] text-[#666666] hover:bg-[#DDD7CC]'
              }`}
            >
              #AllTags
            </button>
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTag(t)}
                className={`px-2.5 py-0.5 rounded-md text-[11px] transition-colors cursor-pointer ${
                  selectedTag === t
                    ? 'bg-[#A67C52] text-white'
                    : 'bg-[#EFEDE8] text-[#666666] hover:bg-[#DDD7CC]'
                }`}
              >
                #{t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Archive Timeline Results */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFFFF] rounded-2xl border border-[#DDD7CC]">
            <FolderOpen className="w-8 h-8 text-[#A67C52] mx-auto mb-3 opacity-60" />
            <p className="font-serif text-lg text-[#2B2B2B]">
              No archived entries match this specific filter combination.
            </p>
          </div>
        ) : (
          filtered.map((post) => (
            <div
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="p-5 rounded-xl bg-[#FFFFFF] border border-[#DDD7CC] hover:border-[#A67C52] cursor-pointer transition-all duration-200 group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-[11px] font-mono text-[#A67C52]">
                  <span>{post.month} {post.year}</span>
                  <span>•</span>
                  <span className="text-[#A67C52] font-semibold">{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-serif text-xl text-[#2B2B2B] font-medium group-hover:text-[#A67C52] transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-[#666666] line-clamp-1 font-light">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center space-x-2 text-xs text-[#A67C52] font-medium flex-shrink-0">
                <span>Read Entry</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
