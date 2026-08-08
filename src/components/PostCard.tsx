import React from 'react';
import { Post } from '../types';
import { Bookmark, Clock, ArrowUpRight, Share2, Sparkles, Feather, FileText, Calculator, BookOpen, BookMarked, MessageSquare } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onSelect: (post: Post) => void;
  isBookmarked: boolean;
  onToggleBookmark: (e: React.MouseEvent, post: Post) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onSelect,
  isBookmarked,
  onToggleBookmark,
}) => {
  // Category specific icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Poetry':
        return <Feather className="w-3.5 h-3.5" />;
      case 'Letters':
        return <MessageSquare className="w-3.5 h-3.5" />;
      case 'Journal':
        return <FileText className="w-3.5 h-3.5" />;
      case 'Reflections':
      case 'Essays':
        return <BookMarked className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  // Font styling adaptation
  const getTitleFontClass = () => {
    switch (post.contentType) {
      case 'letter':
      case 'journal':
        return 'font-handwritten text-2xl sm:text-3xl text-[#2B2B2B]';
      case 'poetry':
        return 'font-poetry italic text-2xl sm:text-3xl text-[#A67C52]';
      default:
        return 'font-serif text-2xl sm:text-3xl text-[#2B2B2B] font-medium';
    }
  };

  const isHandwrittenType = post.contentType === 'letter' || post.contentType === 'journal';

  return (
    <article
      onClick={() => onSelect(post)}
      className="group relative cursor-pointer rounded-2xl p-6 sm:p-8 transition-all duration-300 border bg-[#FFFFFF] border-[#DDD7CC] hover:border-[#A67C52] shadow-xs hover:shadow-md hover:-translate-y-1 flex flex-col justify-between"
    >
      <div>
        {/* Card Header Metadata */}
        <div className="flex items-center justify-between gap-4 mb-4 text-xs">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#EFEDE8] text-[#A67C52] font-medium">
              {getCategoryIcon(post.category)}
              <span>{post.category}</span>
            </span>

            {post.featured && (
              <span className="px-2 py-0.5 rounded-full bg-[#A67C52]/10 text-[#A67C52] text-[10px] font-semibold uppercase tracking-wider">
                Featured
              </span>
            )}
          </div>

          <div className="flex items-center space-x-3 text-[#666666]">
            <span className="flex items-center space-x-1 font-mono text-[11px]">
              <Clock className="w-3 h-3" />
              <span>{post.readTime}</span>
            </span>

            {/* Bookmark button */}
            <button
              onClick={(e) => onToggleBookmark(e, post)}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this entry'}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                isBookmarked
                  ? 'text-[#A67C52] bg-[#A67C52]/10'
                  : 'hover:bg-[#EFEDE8]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Post Title */}
        <h3 className={`${getTitleFontClass()} mb-2 group-hover:text-[#A67C52] transition-colors leading-tight`}>
          {post.title}
        </h3>

        {/* Subtitle if available */}
        {post.subtitle && (
          <p className="text-xs sm:text-sm font-serif italic text-[#A67C52] mb-3">
            {post.subtitle}
          </p>
        )}

        {/* Excerpt preview */}
        <p className={`text-sm leading-relaxed mb-6 ${
          isHandwrittenType
            ? 'font-handwritten text-[#2B2B2B]'
            : 'text-[#666666] font-body font-light'
        }`}>
          {post.excerpt}
        </p>

        {/* Math formula highlight if present */}
        {post.mathFormulas && post.mathFormulas.length > 0 && (
          <div className="mb-4 p-3 rounded-lg bg-[#F8F7F4] border border-[#DDD7CC] font-math text-xs text-center text-[#A67C52]">
            <span className="font-mono text-[10px] text-[#A67C52] block mb-1">
              Formula: {post.mathFormulas[0].label}
            </span>
            <code className="text-sm font-semibold">{post.mathFormulas[0].latex}</code>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="pt-4 border-t border-[#DDD7CC]/60 flex items-center justify-between text-xs text-[#666666]">
        <div className="flex items-center space-x-2">
          <span>{post.month} {post.year}</span>
          {post.letterRecipient && (
            <span className="font-handwritten text-xs text-[#A67C52]">
              • {post.letterRecipient}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-1 text-[#A67C52] font-medium group-hover:translate-x-1 transition-transform">
          <span>Read Entry</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </article>
  );
};
