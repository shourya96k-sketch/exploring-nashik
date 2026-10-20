import React from 'react';
import { Article } from '../types/blog';
import { X, Trash2, ArrowRight, Bookmark } from 'lucide-react';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: Article[];
  onRemoveBookmark: (id: string) => void;
  onSelectArticle: (article: Article) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedArticles,
  onRemoveBookmark,
  onSelectArticle,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200">
          
          {/* Header */}
          <div className="p-6 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Bookmark className="w-4 h-4 fill-amber-400" />
              </div>
              <div>
                <h3 className="font-editorial text-lg font-bold text-stone-100">
                  Saved Spots ({bookmarkedArticles.length})
                </h3>
                <p className="text-xs text-stone-400">Your personalized Nashik bucket list</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {bookmarkedArticles.length === 0 ? (
              <div className="text-center py-16 text-stone-500 space-y-3">
                <Bookmark className="w-12 h-12 text-stone-300 mx-auto stroke-1" />
                <h4 className="font-editorial text-lg font-bold text-stone-700">No saved spots yet</h4>
                <p className="text-xs max-w-xs mx-auto text-stone-500 leading-relaxed">
                  Click the bookmark icon on any of the 10 Nashik articles to save them here for offline reference during your trip.
                </p>
              </div>
            ) : (
              bookmarkedArticles.map((art) => (
                <div
                  key={art.id}
                  className="group relative bg-stone-50 rounded-2xl p-4 border border-stone-200 hover:border-amber-400/60 transition-all flex gap-3.5"
                >
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 cursor-pointer"
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                        {art.category}
                      </span>
                      <h4
                        onClick={() => {
                          onSelectArticle(art);
                          onClose();
                        }}
                        className="font-editorial font-bold text-stone-900 group-hover:text-amber-800 text-sm line-clamp-2 cursor-pointer leading-snug"
                      >
                        {art.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => {
                          onSelectArticle(art);
                          onClose();
                        }}
                        className="text-xs font-semibold text-amber-700 flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        Read
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => onRemoveBookmark(art.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {bookmarkedArticles.length > 0 && (
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={onClearAll}
                className="text-xs font-medium text-stone-500 hover:text-rose-600 transition-colors cursor-pointer"
              >
                Clear all bookmarks
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors"
              >
                Close Drawer
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
