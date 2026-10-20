import React, { useState } from 'react';
import { Compass, Bookmark, Search, Calendar, Menu, X, MapPin } from 'lucide-react';
import { Category } from '../types/blog';

interface NavbarProps {
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  bookmarkCount: number;
  onOpenBookmarks: () => void;
  onOpenItineraries: () => void;
  onGoHome: () => void;
  isArticleOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  bookmarkCount,
  onOpenBookmarks,
  onOpenItineraries,
  onGoHome,
  isArticleOpen,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md text-white border-b border-stone-800 shadow-lg transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <button 
            onClick={onGoHome}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-rose-700 flex items-center justify-center shadow-md shadow-amber-950/40 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-amber-100" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-editorial text-2xl font-bold tracking-tight text-amber-50 group-hover:text-amber-300 transition-colors">
                  Nashik Wanderlust
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                  10 Spots
                </span>
              </div>
              <p className="text-xs text-stone-400 font-medium hidden sm:block">
                The Heritage, Treks & Wine Country Travel Blog
              </p>
            </div>
          </button>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center relative max-w-xs w-full mx-6">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search spots, treks, wineries..."
              className="w-full pl-9 pr-4 py-2 bg-stone-800/80 hover:bg-stone-800 focus:bg-stone-800 text-stone-100 text-sm rounded-full border border-stone-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all placeholder:text-stone-500"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-xs text-stone-400 hover:text-stone-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => {
                if (isArticleOpen) onGoHome();
                const el = document.getElementById('articles-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-2 text-sm font-medium text-stone-300 hover:text-amber-300 hover:bg-stone-800/60 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              All 10 Spots
            </button>

            <button
              onClick={onOpenItineraries}
              className="px-3.5 py-2 text-sm font-medium text-stone-300 hover:text-amber-300 hover:bg-stone-800/60 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              Itineraries (1-3 Days)
            </button>

            <button
              onClick={onOpenBookmarks}
              className="relative px-3.5 py-2 text-sm font-medium text-stone-200 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-lg transition-all flex items-center gap-2"
            >
              <Bookmark className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              <span>Saved</span>
              {bookmarkCount > 0 && (
                <span className="w-5 h-5 text-xs font-bold bg-amber-500 text-stone-950 rounded-full flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Icons */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Toggle search"
              className="p-2 text-stone-300 hover:text-white rounded-lg bg-stone-800"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenBookmarks}
              aria-label="Open saved bookmarks"
              className="relative p-2 text-stone-300 hover:text-white rounded-lg bg-stone-800"
            >
              <Bookmark className="w-5 h-5 text-amber-400" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold bg-amber-500 text-stone-950 rounded-full flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 text-stone-300 hover:text-white rounded-lg bg-stone-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Input Drawer */}
        {searchOpen && (
          <div className="md:hidden py-3 border-t border-stone-800">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search spots, treks, wineries..."
                className="w-full pl-9 pr-4 py-2 bg-stone-800 text-stone-100 text-sm rounded-lg border border-stone-700 focus:outline-none focus:border-amber-500"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-stone-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (isArticleOpen) onGoHome();
                setTimeout(() => {
                  const el = document.getElementById('articles-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="w-full text-left px-3 py-2.5 text-stone-200 hover:bg-stone-800 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              Explore All 10 Spots
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenItineraries();
              }}
              className="w-full text-left px-3 py-2.5 text-stone-200 hover:bg-stone-800 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              Curated Itineraries (1-3 Days)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookmarks();
              }}
              className="w-full text-left px-3 py-2.5 text-stone-200 hover:bg-stone-800 rounded-lg text-sm font-medium flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-400" />
                Saved Articles
              </span>
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                {bookmarkCount}
              </span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
};
