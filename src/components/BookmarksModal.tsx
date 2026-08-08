import React from 'react';
import { Post } from '../types';
import { Bookmark, X, ArrowRight, Trash2 } from 'lucide-react';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedPosts: Post[];
  onSelectPost: (post: Post) => void;
  onRemoveBookmark: (post: Post) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarkedPosts,
  onSelectPost,
  onRemoveBookmark,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-lg bg-[#FFFFFF] border border-[#DDD7CC] rounded-2xl shadow-xl p-6 flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DDD7CC]">
          <div className="flex items-center space-x-2 text-[#A67C52]">
            <Bookmark className="w-5 h-5 fill-current" />
            <h3 className="font-serif text-xl font-medium text-[#2B2B2B]">
              Saved Entries ({bookmarkedPosts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#EFEDE8] text-[#666666] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="overflow-y-auto py-4 space-y-3 flex-1">
          {bookmarkedPosts.length === 0 ? (
            <div className="text-center py-12 text-[#666666] font-serif italic text-sm">
              No saved entries yet. Click the bookmark icon on any post to save it for quiet reading later.
            </div>
          ) : (
            bookmarkedPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-xl bg-[#F8F7F4] border border-[#DDD7CC] flex items-center justify-between gap-3 group"
              >
                <div
                  onClick={() => {
                    onSelectPost(post);
                    onClose();
                  }}
                  className="cursor-pointer flex-1"
                >
                  <span className="text-[10px] font-mono text-[#A67C52] block mb-0.5">
                    {post.category} • {post.readTime}
                  </span>
                  <h4 className="font-serif text-base text-[#2B2B2B] font-medium group-hover:text-[#A67C52] transition-colors line-clamp-1">
                    {post.title}
                  </h4>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onRemoveBookmark(post)}
                    title="Remove from bookmarks"
                    className="p-1.5 text-[#666666] hover:text-red-600 hover:bg-[#EFEDE8] rounded-full transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectPost(post);
                      onClose();
                    }}
                    className="p-1.5 text-[#A67C52] hover:bg-[#EFEDE8] rounded-full cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
