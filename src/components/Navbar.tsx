import React, { useState, useEffect } from 'react';
import { EnsoLogo } from './EnsoLogo';
import { AmbientSoundToggle } from './AmbientSoundToggle';
import { Category } from '../types';
import { CMS_POSTS } from '../data/cmsPosts';
import { SAMPLE_POSTS } from '../data/posts';
import { Search, Bookmark, Rss, ChevronDown, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCategory: Category | 'All';
  setSelectedCategory: (cat: Category | 'All') => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenRss: () => void;
  bookmarkCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
  onOpenSearch,
  onOpenBookmarks,
  onOpenRss,
  bookmarkCount,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const posts = CMS_POSTS.length > 0 ? CMS_POSTS : SAMPLE_POSTS;

  const categories: Category[] = Array.from(new Set(posts.map((p) => p.category as Category))).filter(Boolean) as Category[];

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setShowCatMenu(false);
  };

  const handleCategorySelect = (cat: Category | 'All') => {
    setSelectedCategory(cat);
    setActiveTab('posts');
    setShowCatMenu(false);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#EAE7E1]/95 backdrop-blur-md shadow-sm border-b border-[#D8D3C8] py-3'
          : 'bg-[#EBE8E2]/90 backdrop-blur-md border-b border-[#DCD7CC] py-3.5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-3 text-left group focus:outline-none cursor-pointer"
        >
          <EnsoLogo size={76} animated={true} />
          <h1 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#2B2B2B] group-hover:text-[#A67C52] transition-colors leading-none">
            The Day I Didn't Say
          </h1>
        </button>

        {/* Desktop Navigation Links - Styled Fields with Special Grey Background */}
        <nav className="hidden md:flex items-center space-x-2.5 text-xs sm:text-sm font-medium">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'bg-[#A67C52] text-white border-[#A67C52] shadow-xs font-semibold'
                : 'bg-[#DFDCD4] text-[#2B2B2B] border-[#D2CDC0] hover:bg-[#D4D0C5] hover:border-[#BFB8A8]'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('posts')}
            className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
              activeTab === 'posts' && selectedCategory === 'All'
                ? 'bg-[#A67C52] text-white border-[#A67C52] shadow-xs font-semibold'
                : 'bg-[#DFDCD4] text-[#2B2B2B] border-[#D2CDC0] hover:bg-[#D4D0C5] hover:border-[#BFB8A8]'
            }`}
          >
            Essays & Entries
          </button>

          {/* Category Dropdown Field */}
          <div className="relative">
            <button
              onClick={() => setShowCatMenu(!showCatMenu)}
              className={`flex items-center space-x-1 px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                selectedCategory !== 'All'
                  ? 'bg-[#A67C52] text-white border-[#A67C52] shadow-xs font-semibold'
                  : 'bg-[#DFDCD4] text-[#2B2B2B] border-[#D2CDC0] hover:bg-[#D4D0C5] hover:border-[#BFB8A8]'
              }`}
            >
              <span>{selectedCategory === 'All' ? 'Categories' : selectedCategory}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {showCatMenu && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-[#EBE8E2] border border-[#D2CDC0] rounded-xl shadow-xl py-2 z-50 animate-fadeIn">
                <button
                  onClick={() => handleCategorySelect('All')}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer ${
                    selectedCategory === 'All' ? 'bg-[#A67C52] text-white font-semibold' : 'text-[#2B2B2B] hover:bg-[#DFDCD4]'
                  }`}
                >
                  All Categories
                </button>
                <div className="my-1 border-t border-[#D8D3C8]" />
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer ${
                      selectedCategory === cat ? 'bg-[#A67C52] text-white font-semibold' : 'text-[#2B2B2B] hover:bg-[#DFDCD4]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('about')}
            className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
              activeTab === 'about'
                ? 'bg-[#A67C52] text-white border-[#A67C52] shadow-xs font-semibold'
                : 'bg-[#DFDCD4] text-[#2B2B2B] border-[#D2CDC0] hover:bg-[#D4D0C5] hover:border-[#BFB8A8]'
            }`}
          >
            About
          </button>

          <button
            onClick={() => handleNavClick('archive')}
            className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
              activeTab === 'archive'
                ? 'bg-[#A67C52] text-white border-[#A67C52] shadow-xs font-semibold'
                : 'bg-[#DFDCD4] text-[#2B2B2B] border-[#D2CDC0] hover:bg-[#D4D0C5] hover:border-[#BFB8A8]'
            }`}
          >
            Archive
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
              activeTab === 'contact'
                ? 'bg-[#A67C52] text-white border-[#A67C52] shadow-xs font-semibold'
                : 'bg-[#DFDCD4] text-[#2B2B2B] border-[#D2CDC0] hover:bg-[#D4D0C5] hover:border-[#BFB8A8]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Action Controls - Styled Fields */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          {/* Literary Ambient Reading Room Sound Toggle */}
          <AmbientSoundToggle />

          {/* Search Trigger Field */}
          <button
            onClick={onOpenSearch}
            title="Search entries (Cmd+K)"
            className="p-2 bg-[#DFDCD4] text-[#2B2B2B] border border-[#D2CDC0] hover:bg-[#D4D0C5] hover:border-[#BFB8A8] rounded-lg transition-all cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Bookmarks Field */}
          <button
            onClick={onOpenBookmarks}
            title="Saved entries"
            className="relative p-2 bg-[#DFDCD4] text-[#2B2B2B] border border-[#D2CDC0] hover:bg-[#D4D0C5] hover:border-[#BFB8A8] rounded-lg transition-all cursor-pointer"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#A67C52] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {bookmarkCount}
              </span>
            )}
          </button>

          {/* RSS Feed Modal Trigger Field */}
          <button
            onClick={onOpenRss}
            title="RSS Feed"
            className="hidden sm:block p-2 bg-[#DFDCD4] text-[#2B2B2B] border border-[#D2CDC0] hover:bg-[#D4D0C5] hover:border-[#BFB8A8] rounded-lg transition-all cursor-pointer"
          >
            <Rss className="w-4 h-4" />
          </button>

          {/* Mobile Menu Button Field */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 bg-[#DFDCD4] text-[#2B2B2B] border border-[#D2CDC0] hover:bg-[#D4D0C5] hover:border-[#BFB8A8] rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#EBE8E2] border-b border-[#D8D3C8] px-6 py-6 space-y-3 animate-fadeIn">
          <button
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left px-4 py-2.5 rounded-lg border transition-all ${
              activeTab === 'home'
                ? 'bg-[#A67C52] text-white font-semibold border-[#A67C52]'
                : 'bg-[#DFDCD4] text-[#2B2B2B] border-[#D2CDC0]'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('posts')}
            className={`block w-full text-left px-4 py-2.5 rounded-lg border transition-all ${
              activeTab === 'posts' && selectedCategory === 'All'
                ? 'bg-[#A67C52] text-white font-semibold border-[#A67C52]'
                : 'bg-[#DFDCD4] text-[#2B2B2B] border-[#D2CDC0]'
            }`}
          >
            All Essays & Entries
          </button>

          <div className="bg-[#DFDCD4] p-3 rounded-lg border border-[#D2CDC0] space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#666666]">Categories</p>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`block w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#A67C52] text-white font-semibold'
                    : 'text-[#2B2B2B] hover:bg-[#D4D0C5]'
                }`}
              >
                • {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleNavClick('about')}
            className={`block w-full text-left px-4 py-2.5 rounded-lg border transition-all ${
              activeTab === 'about'
                ? 'bg-[#A67C52] text-white font-semibold border-[#A67C52]'
                : 'bg-[#DFDCD4] text-[#2B2B2B] border-[#D2CDC0]'
            }`}
          >
            About
          </button>

          <button
            onClick={() => handleNavClick('archive')}
            className={`block w-full text-left px-4 py-2.5 rounded-lg border transition-all ${
              activeTab === 'archive'
                ? 'bg-[#A67C52] text-white font-semibold border-[#A67C52]'
                : 'bg-[#DFDCD4] text-[#2B2B2B] border-[#D2CDC0]'
            }`}
          >
            Archive
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`block w-full text-left px-4 py-2.5 rounded-lg border transition-all ${
              activeTab === 'contact'
                ? 'bg-[#A67C52] text-white font-semibold border-[#A67C52]'
                : 'bg-[#DFDCD4] text-[#2B2B2B] border-[#D2CDC0]'
            }`}
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
};
