import React, { useState, useEffect, useMemo } from 'react';
import { ARTICLES, CATEGORIES } from './data/articles';
import { Article, Category } from './types/blog';
import { Navbar } from './components/Navbar';
import { HeroFeatured } from './components/HeroFeatured';
import { ArticleCard } from './components/ArticleCard';
import { ArticleView } from './components/ArticleView';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { TravelPlannerModal } from './components/TravelPlannerModal';
import { QuickGuideSection } from './components/QuickGuideSection';
import { Footer } from './components/Footer';
import { Search, SlidersHorizontal, MapPin, Compass, ArrowUpDown } from 'lucide-react';

export default function App() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'readTime' | 'distance'>('default');

  // Bookmarks State in localStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nashik_saved_articles');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState(false);
  const [itinerariesModalOpen, setItinerariesModalOpen] = useState(false);

  // Sync Bookmarks to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('nashik_saved_articles', JSON.stringify(bookmarkedIds));
    } catch {
      // storage error fallback
    }
  }, [bookmarkedIds]);

  // Handle URL hash routing (e.g., #sula-vineyards)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const found = ARTICLES.find(a => a.id === hash || a.slug === hash);
        if (found) {
          setSelectedArticle(found);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      } else {
        setSelectedArticle(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    window.location.hash = article.id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setSelectedArticle(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleClearAllBookmarks = () => {
    setBookmarkedIds([]);
  };

  // Filter & Sort Articles
  const filteredArticles = useMemo(() => {
    let result = ARTICLES.filter((art) => {
      // Category filter
      const matchesCategory = activeCategory === 'All' || art.category === activeCategory;
      if (!matchesCategory) return false;

      // Search query filter (title, subtitle, excerpt, tags, highlights)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = art.title.toLowerCase().includes(q);
        const matchesSub = art.subtitle.toLowerCase().includes(q);
        const matchesExcerpt = art.excerpt.toLowerCase().includes(q);
        const matchesTags = art.tags.some(t => t.toLowerCase().includes(q));
        const matchesHighlights = art.highlights.some(h => h.toLowerCase().includes(q));
        return matchesTitle || matchesSub || matchesExcerpt || matchesTags || matchesHighlights;
      }

      return true;
    });

    if (sortBy === 'readTime') {
      result = [...result].sort((a, b) => {
        const minA = parseInt(a.readTime);
        const minB = parseInt(b.readTime);
        return minA - minB;
      });
    } else if (sortBy === 'distance') {
      result = [...result].sort((a, b) => {
        const distA = parseFloat(a.practicalInfo.distanceFromCBS);
        const distB = parseFloat(b.practicalInfo.distanceFromCBS);
        return distA - distB;
      });
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  // Featured article for the hero
  const featuredArticle = ARTICLES[0]; // Trimbakeshwar Shiva Temple

  // Bookmarked articles list
  const bookmarkedArticles = ARTICLES.filter(a => bookmarkedIds.includes(a.id));

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: ARTICLES.length };
    ARTICLES.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* Global Navbar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        bookmarkCount={bookmarkedIds.length}
        onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
        onOpenItineraries={() => setItinerariesModalOpen(true)}
        onGoHome={handleBackToHome}
        isArticleOpen={selectedArticle !== null}
      />

      {/* Conditionally Render Standalone Article Page or Homepage */}
      {selectedArticle ? (
        <ArticleView
          article={selectedArticle}
          allArticles={ARTICLES}
          onBack={handleBackToHome}
          onSelectArticle={handleSelectArticle}
          isBookmarked={bookmarkedIds.includes(selectedArticle.id)}
          onToggleBookmark={handleToggleBookmark}
        />
      ) : (
        <main className="flex-1">
          {/* Featured Article Hero Section */}
          <HeroFeatured
            article={featuredArticle}
            onReadArticle={handleSelectArticle}
            onExploreAll={() => {
              const el = document.getElementById('articles-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Main 10 Articles Section */}
          <section id="articles-section" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header with Category Tabs */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-stone-200">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                  <Compass className="w-4 h-4" />
                  <span>The Complete Destination Directory</span>
                </div>
                <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-900">
                  Explore All 10 Visiting Spots
                </h2>
                <p className="text-stone-600 text-sm mt-1">
                  Each destination includes historical insights, photography, visitor timings, and local food tips.
                </p>
              </div>

              {/* Sorting Control */}
              <div className="flex items-center gap-2 text-xs text-stone-600 self-start md:self-auto">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                <span className="font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-stone-800 focus:outline-none focus:border-amber-600 cursor-pointer shadow-xs"
                >
                  <option value="default">Default Order (#1 - #10)</option>
                  <option value="readTime">Shortest Read Time</option>
                  <option value="distance">Distance from Central Nashik</option>
                </select>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mr-1 flex items-center gap-1 shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filter:
              </span>
              {CATEGORIES.map((cat) => {
                const count = categoryCounts[cat] || 0;
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat as Category);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-amber-600 text-white shadow-md shadow-amber-900/20'
                        : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-amber-700/80 text-amber-100' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search feedback indicator if query active */}
            {searchQuery && (
              <div className="mb-6 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                <span>
                  Showing results for "<strong>{searchQuery}</strong>" ({filteredArticles.length} matching spots found)
                </span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-amber-800 font-bold hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}

            {/* 10 Articles Cards Grid */}
            {filteredArticles.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
                <Search className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="font-editorial text-xl font-bold text-stone-800">
                  No spots match your search
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Try searching for another keyword like "Shiva", "Wine", "Trek", "Ghats", or "Caves".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 transition-colors"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    index={index}
                    isBookmarked={bookmarkedIds.includes(article.id)}
                    onToggleBookmark={handleToggleBookmark}
                    onReadArticle={handleSelectArticle}
                  />
                ))}
              </div>
            )}

          </section>

          {/* Quick Distance & Location Matrix Overview */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="bg-gradient-to-r from-stone-900 to-stone-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-800 shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
                    Route & Distance Reference Matrix
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
                    Distance from Nashik Central (CBS)
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 mt-1">
                    Quickly check driving times and plan sequential stops across the region.
                  </p>
                </div>

                <button
                  onClick={() => setItinerariesModalOpen(true)}
                  className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-colors shrink-0 self-start lg:self-auto cursor-pointer"
                >
                  View 1-Day to 3-Day Itineraries
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {ARTICLES.map((art, idx) => (
                  <div
                    key={art.id}
                    onClick={() => handleSelectArticle(art)}
                    className="p-3 bg-stone-900/80 hover:bg-stone-800 border border-stone-800 hover:border-amber-400/50 rounded-xl transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold mb-1">
                      <span>#{idx + 1}</span>
                      <MapPin className="w-3 h-3 text-amber-400" />
                    </div>
                    <span className="text-xs font-semibold text-stone-200 group-hover:text-amber-300 block truncate">
                      {art.title.split(':')[0]}
                    </span>
                    <span className="text-[11px] text-stone-400 block mt-1">
                      {art.practicalInfo.distanceFromCBS}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Nashik Travel Essentials Guide (Misal trail, best seasons, logistics) */}
          <QuickGuideSection />

        </main>
      )}

      {/* Bookmarks Slide-over Drawer */}
      <BookmarksDrawer
        isOpen={bookmarksDrawerOpen}
        onClose={() => setBookmarksDrawerOpen(false)}
        bookmarkedArticles={bookmarkedArticles}
        onRemoveBookmark={(id) => setBookmarkedIds(prev => prev.filter(item => item !== id))}
        onSelectArticle={handleSelectArticle}
        onClearAll={handleClearAllBookmarks}
      />

      {/* Curated Itineraries Modal */}
      <TravelPlannerModal
        isOpen={itinerariesModalOpen}
        onClose={() => setItinerariesModalOpen(false)}
        articles={ARTICLES}
        onSelectArticle={handleSelectArticle}
      />

      {/* Footer */}
      <Footer
        onSelectArticle={handleSelectArticle}
        onOpenItineraries={() => setItinerariesModalOpen(true)}
      />

    </div>
  );
}
