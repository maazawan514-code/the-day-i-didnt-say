import React, { useState, useEffect } from 'react';
import { Post, Comment } from '../types';
import { MathRenderer } from './MathRenderer';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Bookmark, Share2, Clock, Check, MessageSquare, 
  Send, ThumbsUp, ChevronLeft, ChevronRight, Maximize2, Minimize2, 
  Quote, User
} from 'lucide-react';
import { PaperInput, PaperTextarea, PaperButton } from './PaperFormControls';

interface PostDetailProps {
  post: Post;
  allPosts: Post[];
  onBack: () => void;
  onSelectPost: (post: Post) => void;
  isBookmarked: boolean;
  onToggleBookmark: (post: Post) => void;
}

// Simple built-in markdown parser (doesn't require external library)
const simpleMarkdownToHtml = (text: string): string => {
  let html = text;

  // Headings (must be on their own line)
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

  // Bold (** or __)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Italic (* or _) - but avoid matching within words
  html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>');

  // Inline code (backticks)
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');

  // Links [text](url)
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  // Wrap remaining plain text lines in paragraphs (but not if already HTML)
  const lines = html.split('\n');
  const processedLines = lines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<')) return line;
    return `<p>${trimmed}</p>`;
  });
  html = processedLines.join('\n');

  // Add Tailwind classes to HTML elements for proper styling
  html = html.replace(/<h1>/g, '<h1 class="text-3xl font-serif font-bold text-[#2B2B2B] mt-8 mb-4">');
  html = html.replace(/<h2>/g, '<h2 class="text-2xl font-serif font-bold text-[#2B2B2B] mt-6 mb-3">');
  html = html.replace(/<h3>/g, '<h3 class="text-xl font-serif font-semibold text-[#2B2B2B] mt-5 mb-2">');
  html = html.replace(/<h4>/g, '<h4 class="text-lg font-serif font-semibold text-[#2B2B2B] mt-4 mb-2">');
  html = html.replace(/<h5>/g, '<h5 class="text-base font-serif font-semibold text-[#2B2B2B] mt-3 mb-1">');
  html = html.replace(/<h6>/g, '<h6 class="text-sm font-serif font-semibold text-[#2B2B2B] mt-2 mb-1">');

  html = html.replace(/<p>/g, '<p class="leading-relaxed text-[#2B2B2B]/90">');
  html = html.replace(/<strong>/g, '<strong class="font-semibold text-[#A67C52]">');
  html = html.replace(/<em>/g, '<em class="italic text-[#666666]">');
  html = html.replace(/<code>/g, '<code class="bg-[#EFEDE8] text-[#A67C52] px-2 py-1 rounded font-mono text-sm">');

  // Style links
  html = html.replace(/<a /g, '<a class="text-[#A67C52] hover:underline transition-colors" ');

  // Style lists (basic support)
  html = html.replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2 ml-4">');
  html = html.replace(/<ol>/g, '<ol class="list-decimal list-inside space-y-2 ml-4">');
  html = html.replace(/<li>/g, '<li class="text-[#2B2B2B]/90">');

  // Style code blocks
  html = html.replace(/<pre>/g, '<pre class="bg-[#2B2B2B] text-[#F8F7F4] p-4 rounded-lg overflow-x-auto my-4">');

  return html;
};

// Helper function to parse markdown and add Tailwind styling
const parseMarkdownWithStyling = (content: string): string => {
  try {
    // Use built-in markdown parser
    return simpleMarkdownToHtml(content);
  } catch (error) {
    console.error('Error parsing markdown:', error);
    return content;
  }
};

export const PostDetail: React.FC<PostDetailProps> = ({
  post,
  allPosts,
  onBack,
  onSelectPost,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [activeParagraphIndex, setActiveParagraphIndex] = useState<number | null>(null);

  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem(`comments_${post.id}`);
    if (saved) return JSON.parse(saved);
    return [];
  });

  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  // Scroll Progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Previous and Next Post
  const currentIndex = allPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Related posts
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some(t => post.tags.includes(t))))
    .slice(0, 2);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newC: Comment = {
      id: Date.now().toString(),
      postId: post.id,
      authorName: newCommentName.trim() || 'Gentle Reader',
      date: 'Just now',
      text: newCommentText.trim(),
      likes: 1,
    };

    const updated = [newC, ...comments];
    setComments(updated);
    localStorage.setItem(`comments_${post.id}`, JSON.stringify(updated));
    setNewCommentText('');
    setNewCommentName('');
  };

  const handleLikeComment = (commentId: string) => {
    const updated = comments.map((c) =>
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    );
    setComments(updated);
    localStorage.setItem(`comments_${post.id}`, JSON.stringify(updated));
  };

  const isHandwritten = post.contentType === 'letter' || post.contentType === 'journal';
  const isPoetry = post.contentType === 'poetry';
  const isMath = post.contentType === 'mathematics';

  const paragraphs = post.content.trim().split('\n\n');

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`min-h-screen pt-24 pb-20 px-4 transition-all duration-500 ${
        focusMode ? 'bg-[#F8F7F4] fixed inset-0 z-50 overflow-y-auto py-12' : ''
      }`}
    >
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#DDD7CC] z-50">
        <div
          className="h-full bg-[#A67C52] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Navigation Actions */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#DDD7CC]">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-xs font-medium text-[#666666] hover:text-[#A67C52] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Entries</span>
          </button>

          <div className="flex items-center space-x-3">
            {/* Focus Reader Mode Toggle */}
            <button
              onClick={() => setFocusMode(!focusMode)}
              title={focusMode ? 'Exit Reader Mode' : 'Focus Reader Mode'}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#EFEDE8] text-xs text-[#666666] hover:text-[#A67C52] transition-colors cursor-pointer"
            >
              {focusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline font-medium">{focusMode ? 'Standard Mode' : 'Focus Mode'}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(post)}
              title={isBookmarked ? 'Bookmarked' : 'Bookmark entry'}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-[#A67C52] text-white'
                  : 'bg-[#EFEDE8] text-[#666666] hover:text-[#A67C52]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Share link */}
            <button
              onClick={handleCopyLink}
              title="Copy entry link"
              className="p-2 rounded-full bg-[#EFEDE8] text-[#666666] hover:text-[#A67C52] transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Post Metadata Header */}
        <header className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#EFEDE8] text-xs font-medium text-[#A67C52]">
            <span>{post.category}</span>
            <span>•</span>
            <span className="font-mono">{post.date}</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl text-[#2B2B2B] leading-[1.15] font-normal ${
            isHandwritten
              ? 'font-handwritten'
              : isPoetry
              ? 'font-poetry italic text-[#A67C52]'
              : 'font-serif'
          }`}>
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="font-serif italic text-lg sm:text-xl text-[#A67C52] max-w-xl mx-auto">
              {post.subtitle}
            </p>
          )}

          <div className="flex items-center justify-center space-x-4 text-xs text-[#666666] pt-2 font-mono">
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-[#A67C52]" />
              <span>{post.readTime}</span>
            </span>
            {post.letterRecipient && (
              <>
                <span>•</span>
                <span className="font-handwritten text-sm text-[#A67C52]">{post.letterRecipient}</span>
              </>
            )}
            {post.diaryLocation && (
              <>
                <span>•</span>
                <span className="italic">{post.diaryLocation}</span>
              </>
            )}
          </div>
        </header>

        {/* Table of Contents */}
        {post.toc && post.toc.length > 0 && (
          <div className="mb-10 p-5 rounded-xl bg-[#FFFFFF] border border-[#DDD7CC]">
            <h4 className="font-serif text-xs uppercase tracking-widest text-[#A67C52] font-semibold mb-3">
              Contents
            </h4>
            <ul className="space-y-1.5 text-xs text-[#666666]">
              {post.toc.map((item) => (
                <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}>
                  <a
                    href={`#${item.id}`}
                    className="hover:text-[#A67C52] transition-colors"
                  >
                    • {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Post Body */}
        <div className={`text-base sm:text-lg leading-relaxed text-[#2B2B2B]/90 space-y-6 ${
          isHandwritten
            ? 'font-handwritten text-xl sm:text-2xl diary-grid p-6 sm:p-10 rounded-2xl bg-[#FFFFFF] border border-[#DDD7CC]'
            : isPoetry
            ? 'font-poetry italic text-xl sm:text-2xl text-center py-6 space-y-8 tracking-wide'
            : 'font-body font-light space-y-6'
        }`}>
          {/* Paragraphs rendering with Focus Reading Mode & Stanza Reveal */}
          {paragraphs.map((paragraph, idx) => {
            const isFocused = activeParagraphIndex === idx;
            const isDimmed = focusMode && activeParagraphIndex !== null && !isFocused;

            if (paragraph.startsWith('$$') && paragraph.endsWith('$$')) {
              const latexCode = paragraph.slice(2, -2).trim();
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <MathRenderer latex={latexCode} inline={false} />
                </motion.div>
              );
            }

            if (paragraph.startsWith('> ')) {
              return (
                <motion.blockquote
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="pl-6 py-4 border-l-2 border-[#A67C52] font-serif italic text-lg sm:text-xl text-[#A67C52] bg-[#EFEDE8]/50 rounded-r-lg my-6 relative"
                >
                  <Quote className="w-5 h-5 text-[#A67C52]/30 absolute -top-2 left-2" />
                  <p className="relative z-10">{paragraph.replace('> ', '')}</p>
                </motion.blockquote>
              );
            }

            return (
              <motion.div
                key={idx}
                onMouseEnter={() => setActiveParagraphIndex(idx)}
                onMouseLeave={() => setActiveParagraphIndex(null)}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: isPoetry ? idx * 0.15 : 0 }}
                className={`transition-all duration-300 ${
                  isDimmed ? 'opacity-30 blur-[0.5px]' : 'opacity-100'
                } ${isFocused ? 'scale-[1.01]' : ''}`}
              >
                <div 
                  className="leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: parseMarkdownWithStyling(paragraph) }}
                />
              </motion.div>
            );
          })}

          {/* Formulas block */}
          {post.mathFormulas && post.mathFormulas.length > 0 && (
            <div className="my-10 space-y-6">
              <h3 className="font-serif text-xl font-medium text-[#2B2B2B] border-b border-[#DDD7CC] pb-2">
                Mathematical Formulations
              </h3>
              {post.mathFormulas.map((f, i) => (
                <div key={i} className="p-5 rounded-xl bg-[#FFFFFF] border border-[#DDD7CC]">
                  <p className="font-serif text-sm font-semibold text-[#A67C52] mb-2">{f.label}</p>
                  <MathRenderer latex={f.latex} />
                  {f.explanation && (
                    <p className="text-xs text-[#666666] font-sans mt-2 italic">
                      Note: {f.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footnotes Section */}
        {post.footnotes && post.footnotes.length > 0 && (
          <div className="mt-12 pt-6 border-t border-[#DDD7CC] text-xs text-[#666666]">
            <h4 className="font-serif uppercase tracking-widest text-[#A67C52] font-semibold mb-3">
              Footnotes & References
            </h4>
            <ol className="list-decimal list-inside space-y-2 font-serif italic">
              {post.footnotes.map((fn) => (
                <li key={fn.id} id={`fn-${fn.id}`}>
                  <span>{fn.text}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-[#EFEDE8] text-xs text-[#666666] font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Previous & Next Navigation */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-[#DDD7CC]">
          {prevPost ? (
            <button
              onClick={() => onSelectPost(prevPost)}
              className="p-4 rounded-xl border border-[#DDD7CC] hover:border-[#A67C52] transition-colors text-left group bg-[#FFFFFF] cursor-pointer"
            >
              <div className="flex items-center space-x-1 text-xs text-[#A67C52] mb-1">
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous Entry</span>
              </div>
              <p className="font-serif text-sm font-medium text-[#2B2B2B] group-hover:text-[#A67C52] line-clamp-1">
                {prevPost.title}
              </p>
            </button>
          ) : <div />}

          {nextPost ? (
            <button
              onClick={() => onSelectPost(nextPost)}
              className="p-4 rounded-xl border border-[#DDD7CC] hover:border-[#A67C52] transition-colors text-right group bg-[#FFFFFF] cursor-pointer"
            >
              <div className="flex items-center justify-end space-x-1 text-xs text-[#A67C52] mb-1">
                <span>Next Entry</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
              <p className="font-serif text-sm font-medium text-[#2B2B2B] group-hover:text-[#A67C52] line-clamp-1">
                {nextPost.title}
              </p>
            </button>
          ) : <div />}
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="font-serif text-2xl text-[#2B2B2B] mb-6 font-normal">
              Related Reflections
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectPost(rel)}
                  className="p-5 rounded-xl bg-[#FFFFFF] border border-[#DDD7CC] hover:border-[#A67C52] cursor-pointer transition-colors shadow-xs"
                >
                  <span className="text-[10px] uppercase font-mono text-[#A67C52] block mb-2">
                    {rel.category} • {rel.readTime}
                  </span>
                  <h4 className="font-serif text-lg font-medium text-[#2B2B2B] mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-[#666666] line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reader Comments Section */}
        <section className="mt-20 pt-10 border-t border-[#DDD7CC]">
          <div className="flex items-center space-x-3 mb-8">
            <MessageSquare className="w-5 h-5 text-[#A67C52]" />
            <h3 className="font-serif text-2xl text-[#2B2B2B]">
              Reader Thoughts & Comments ({comments.length})
            </h3>
          </div>

          <form onSubmit={handleAddComment} className="mb-10 p-6 sm:p-8 rounded-[24px] bg-[#FFFFFF] border border-[#DDD7CC] space-y-5 shadow-xs relative">
            <p className="font-serif text-sm text-[#A67C52] italic mb-2">
              Leave a quiet thought or response. No algorithms, no harsh noise.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PaperInput
                label="Your Name (Optional)"
                value={newCommentName}
                onChange={(e) => setNewCommentName(e.target.value)}
                icon={<User className="w-4 h-4" />}
              />
            </div>
            <PaperTextarea
              label="Write your note here..."
              rows={3}
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              required
            />
            <PaperButton
              type="submit"
              icon={<Send className="w-3.5 h-3.5" />}
            >
              Post Thought
            </PaperButton>
          </form>

          <div className="space-y-4">
            {comments.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-xl bg-[#FFFFFF] border border-[#DDD7CC] space-y-2 shadow-xs"
              >
                <div className="flex items-center justify-between text-xs text-[#666666]">
                  <span className="font-serif font-semibold text-[#2B2B2B]">
                    {c.authorName}
                  </span>
                  <span className="font-mono text-[10px]">{c.date}</span>
                </div>
                <p className="text-sm text-[#2B2B2B] leading-relaxed">
                  {c.text}
                </p>
                <div className="pt-2 flex items-center justify-end">
                  <button
                    onClick={() => handleLikeComment(c.id)}
                    className="flex items-center space-x-1 text-xs text-[#A67C52] hover:text-[#8C6842] transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{c.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};
