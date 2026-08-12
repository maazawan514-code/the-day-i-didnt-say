import React, { useState } from 'react';
import { SAMPLE_POSTS } from './data/posts';
import { CMS_POSTS } from './data/cmsPosts';
import { Post, Category } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { PostCard } from './components/PostCard';
import { PostDetail } from './components/PostDetail';
import { ArchiveView } from './components/ArchiveView';
import { ContactSection } from './components/ContactSection';
import { Newsletter } from './components/Newsletter';
import { FloatingLeaves } from './components/FloatingLeaves';
import { PageLoader } from './components/PageLoader';
import { SearchModal } from './components/SearchModal';
import { BookmarksModal } from './components/BookmarksModal';
import { RSSModal } from './components/RSSModal';
import { NotFoundSection } from './components/NotFoundSection';
import { Footer } from './components/Footer';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

  // Bookmarks persistence
  const [bookmarks, setBookmarks] = useState<Post[]>(() => {
    const saved = localStorage.getItem('blog_bookmarks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  // Modals state
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [rssOpen, setRssOpen] = useState(false);

  const posts = CMS_POSTS.length > 0 ? CMS_POSTS : SAMPLE_POSTS;

  const handleToggleBookmark = (e: React.MouseEvent | null, post: Post) => {
    if (e) e.stopPropagation();
    const exists = bookmarks.some((b) => b.id === post.id);
    let updated: Post[];
    if (exists) {
      updated = bookmarks.filter((b) => b.id !== post.id);
    } else {
      updated = [...bookmarks, post];
    }
    setBookmarks(updated);
    localStorage.setItem('blog_bookmarks', JSON.stringify(updated));
  };

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromPost = () => {
    setSelectedPost(null);
  };

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredPost = posts.find((p) => p.featured) || posts[0];

  const categoriesList: (Category | 'All')[] = [
    'All',
    ...['Poetry', 'Letters', 'Essays', 'Reflections', 'Journal', 'Personal'].filter((category) =>
      posts.some((p) => p.category === category)
    ) as Category[],
  ];

  // Filter posts based on selected category
  const filteredPosts = posts.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  const validTabs = ['home', 'posts', 'about', 'archive', 'contact'];

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#2B2B2B] selection:bg-[#A67C52] selection:text-white transition-colors duration-300 relative">
      {/* Handcrafted Initial Page Loader */}
      <PageLoader />

      {/* Serene Floating Leaves Canvas */}
      <FloatingLeaves />

      {/* Global Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavClick}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        onOpenRss={() => setRssOpen(true)}
        bookmarkCount={bookmarks.length}
      />

      {/* Main View Router with Paper Page Turn Transitions */}
      <AnimatePresence mode="wait">
        <main className="relative z-10" key={selectedPost ? selectedPost.id : activeTab}>
          {selectedPost ? (
            <PostDetail
              post={selectedPost}
              allPosts={posts}
              onBack={handleBackFromPost}
              onSelectPost={handleSelectPost}
              isBookmarked={bookmarks.some((b) => b.id === selectedPost.id)}
              onToggleBookmark={(p) => handleToggleBookmark(null, p)}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeTab === 'home' && (
                <>
                  {/* Hero Section */}
                  <HeroSection
                    onExploreClick={() => {
                      const el = document.getElementById('latest-entries');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    postCount={posts.length}
                  />

                  {/* Featured Spotlight Article */}
                  <section className="py-12 px-4 max-w-5xl mx-auto">
                    <div className="flex items-center space-x-3 mb-6">
                      <span className="w-8 h-[1px] bg-[#8A6A4A]" />
                      <h2 className="font-serif text-xs uppercase tracking-widest text-[#8A6A4A] font-semibold">
                        Featured Reflection
                      </h2>
                    </div>

                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      onClick={() => handleSelectPost(featuredPost)}
                      className="cursor-pointer group relative rounded-2xl p-8 sm:p-12 bg-[#F3EFE8] border border-[#E5DED5] hover:border-[#304B3D] transition-all duration-300 shadow-xs"
                    >
                      <div className="max-w-2xl space-y-4">
                        <div className="flex items-center space-x-3 text-xs">
                          <span className="px-3 py-1 rounded-full bg-[#304B3D] text-white font-medium">
                            {featuredPost.category}
                          </span>
                          <span className="text-[#8A6A4A] font-mono">{featuredPost.readTime}</span>
                          <span className="text-[#5B5B5B] font-mono">• {featuredPost.date}</span>
                        </div>

                        <h3 className="font-serif text-3xl sm:text-4xl text-[#202020] font-normal group-hover:text-[#304B3D] transition-colors leading-tight">
                          {featuredPost.title}
                        </h3>

                        <p className="font-serif italic text-[#8A6A4A] text-lg">
                          {featuredPost.subtitle}
                        </p>

                        <p className="font-body text-sm text-[#5B5B5B] leading-relaxed font-light line-clamp-3">
                          {featuredPost.excerpt}
                        </p>

                        <div className="pt-2 flex items-center space-x-2 text-xs font-medium text-[#304B3D]">
                          <span>Read Full Feature</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  </section>

                  {/* Latest Entries with Category Filters */}
                  <section id="latest-entries" className="py-16 px-4 max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E5DED5]">
                      <div>
                        <span className="font-serif text-xs uppercase tracking-widest text-[#8A6A4A] font-semibold block mb-1">
                          Selected Writing
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-[#202020] font-normal">
                          Latest Essays & Notes
                        </h2>
                      </div>

                      {/* Category Tabs */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        {categoriesList.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                              selectedCategory === cat
                                ? 'bg-[#304B3D] text-white'
                                : 'bg-[#F3EFE8] text-[#5B5B5B] hover:bg-[#E5DED5]'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Post Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredPosts.map((post) => (
                        <PostCard
                          key={post.id}
                          post={post}
                          onSelect={handleSelectPost}
                          isBookmarked={bookmarks.some((b) => b.id === post.id)}
                          onToggleBookmark={handleToggleBookmark}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Newsletter Subscription Section */}
                  <Newsletter />

                  {/* About Section */}
                  <AboutSection />

                  {/* Contact Section */}
                  <ContactSection />
                </>
              )}

              {activeTab === 'posts' && (
                <section className="py-16 px-4 max-w-6xl mx-auto pt-28">
                  <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                    <span className="font-serif text-xs uppercase tracking-widest text-[#8A6A4A] font-semibold">
                      Essays, Letters & Equations
                    </span>
                    <h2 className="font-serif text-4xl sm:text-5xl text-[#202020] font-normal">
                      All Journal Entries
                    </h2>
                  </div>

                  {/* Category Pill Filters */}
                  <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categoriesList.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-[#304B3D] text-white'
                            : 'bg-[#F3EFE8] text-[#5B5B5B] hover:bg-[#E5DED5]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onSelect={handleSelectPost}
                        isBookmarked={bookmarks.some((b) => b.id === post.id)}
                        onToggleBookmark={handleToggleBookmark}
                      />
                    ))}
                  </div>
                </section>
              )}

              {activeTab === 'about' && (
                <div className="pt-20">
                  <AboutSection />
                </div>
              )}

              {activeTab === 'archive' && (
                <div className="pt-20">
                  <ArchiveView posts={posts} onSelectPost={handleSelectPost} />
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="pt-20">
                  <ContactSection />
                </div>
              )}

              {!validTabs.includes(activeTab) && (
                <div className="pt-20">
                  <NotFoundSection onReturnHome={() => handleNavClick('home')} />
                </div>
              )}
            </motion.div>
          )}
        </main>
      </AnimatePresence>

      {/* Global Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        posts={posts}
        onSelectPost={handleSelectPost}
      />

      <BookmarksModal
        isOpen={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        bookmarkedPosts={bookmarks}
        onSelectPost={handleSelectPost}
        onRemoveBookmark={(p) => handleToggleBookmark(null, p)}
      />

      <RSSModal
        isOpen={rssOpen}
        onClose={() => setRssOpen(false)}
        posts={posts}
      />

      {/* Footer */}
      <Footer onNavClick={handleNavClick} onOpenRss={() => setRssOpen(true)} />
    </div>
  );
}
