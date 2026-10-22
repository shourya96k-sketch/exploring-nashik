import React, { useState, useEffect, useMemo } from 'react';
import { 
  KeywordItem, ClusterInfo, WaterfallContentPlanArticle, 
  ArticleFormat, WaterfallCluster 
} from './types/seo';
import { 
  INITIAL_WATERFALL_KEYWORDS, 
  WATERFALL_CLUSTERS, 
  NASHIK_WATERFALL_CONTENT_PLAN 
} from './data/nashikWaterfallsData';

// SEO Research Views
import { Sidebar, NavSection } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { KeywordResearchView } from './components/KeywordResearchView';
import { KeywordClustersView } from './components/KeywordClustersView';
import { AiContentGeneratorView } from './components/AiContentGeneratorView';
import { ContentCalendarView } from './components/ContentCalendarView';
import { CompetitorResearchView } from './components/CompetitorResearchView';
import { SavedKeywordsView } from './components/SavedKeywordsView';
import { ExportReportsView } from './components/ExportReportsView';
import { SettingsView } from './components/SettingsView';
import { ScreenshotOcrModal } from './components/ScreenshotOcrModal';

// Live Travel Blog Components (10 Visiting Spots in Nashik)
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

import { 
  Menu, Sparkles, BookOpen, Search, Compass, 
  Layers, ExternalLink, ArrowLeft, ArrowRight, Check, Waves 
} from 'lucide-react';

export default function App() {
  // App Mode: SEO Assistant vs Live Blog Preview
  const [appMode, setAppMode] = useState<'assistant' | 'live-blog'>('assistant');

  // Navigation State
  const [activeSection, setActiveSection] = useState<NavSection>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCampaignTopic, setActiveCampaignTopic] = useState('Waterfalls Near Nashik');

  // Modal State
  const [ocrModalOpen, setOcrModalOpen] = useState(false);

  // Cross-view presets (e.g. clicking "Write Article" from Calendar or Table)
  const [generatorPreset, setGeneratorPreset] = useState<{
    topic: string;
    keyword: string;
    format: ArticleFormat;
  }>({
    topic: 'Best Waterfalls Near Nashik: A Complete Travel Guide',
    keyword: 'Waterfall near Nashik',
    format: 'Complete destination guide',
  });

  const [clusterFilterPreset, setClusterFilterPreset] = useState<string>('All');

  // API Key Health Status
  const [hasApiKey, setHasApiKey] = useState(false);

  // Keywords State in LocalStorage with fallback to initial dataset
  const [keywords, setKeywords] = useState<KeywordItem[]>(() => {
    try {
      const saved = localStorage.getItem('nashik_wanderlust_keywords');
      return saved ? JSON.parse(saved) : INITIAL_WATERFALL_KEYWORDS;
    } catch {
      return INITIAL_WATERFALL_KEYWORDS;
    }
  });

  // Sync Keywords to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('nashik_wanderlust_keywords', JSON.stringify(keywords));
    } catch {
      // storage error fallback
    }
  }, [keywords]);

  // Check Backend Health
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data.hasApiKey) setHasApiKey(true);
      })
      .catch(() => setHasApiKey(false));
  }, []);

  // Saved keywords count
  const savedCount = useMemo(() => keywords.filter(k => k.isBookmarked).length, [keywords]);

  // Keyword Handlers
  const handleToggleBookmark = (id: string) => {
    setKeywords(prev => prev.map(k => 
      k.id === id ? { ...k, isBookmarked: !k.isBookmarked } : k
    ));
  };

  const handleClearAllBookmarks = () => {
    setKeywords(prev => prev.map(k => ({ ...k, isBookmarked: false })));
  };

  const handleUpdateKeyword = (updated: KeywordItem) => {
    setKeywords(prev => prev.map(k => k.id === updated.id ? updated : k));
  };

  const handleAddKeyword = (newKw: KeywordItem) => {
    setKeywords(prev => [newKw, ...prev]);
  };

  const handleDeleteKeyword = (id: string) => {
    setKeywords(prev => prev.filter(k => k.id !== id));
  };

  const handleImportOcrKeywords = (newKeywords: KeywordItem[]) => {
    setKeywords(prev => {
      const existingPhrases = new Set(prev.map(p => p.phrase.toLowerCase()));
      const filteredNew = newKeywords.filter(n => !existingPhrases.has(n.phrase.toLowerCase()));
      return [...filteredNew, ...prev];
    });
    setActiveSection('keyword-research');
  };

  // Navigations from sub-views
  const handleLaunchArticleGeneration = (topic: string, primaryKw: string, format?: ArticleFormat) => {
    setGeneratorPreset({
      topic,
      keyword: primaryKw,
      format: format || 'Complete destination guide',
    });
    setActiveSection('content-generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectClusterFromView = (clusterName: string) => {
    setClusterFilterPreset(clusterName);
    setActiveSection('keyword-research');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // -------------------------------------------------------------
  // Live Blog Mode State & Handlers (The 10 Visiting Spots Blog)
  // -------------------------------------------------------------
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [blogSearchQuery, setBlogSearchQuery] = useState<string>('');
  const [blogSortBy, setBlogSortBy] = useState<'default' | 'readTime' | 'distance'>('default');
  const [blogBookmarksDrawerOpen, setBlogBookmarksDrawerOpen] = useState(false);
  const [itinerariesModalOpen, setItinerariesModalOpen] = useState(false);
  const [blogBookmarkedIds, setBlogBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nashik_saved_articles');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const filteredBlogArticles = useMemo(() => {
    let result = ARTICLES.filter((art) => {
      const matchesCategory = activeCategory === 'All' || art.category === activeCategory;
      if (!matchesCategory) return false;
      if (blogSearchQuery.trim()) {
        const q = blogSearchQuery.toLowerCase().trim();
        const matchesTitle = art.title.toLowerCase().includes(q);
        const matchesSub = art.subtitle.toLowerCase().includes(q);
        const matchesExcerpt = art.excerpt.toLowerCase().includes(q);
        return matchesTitle || matchesSub || matchesExcerpt;
      }
      return true;
    });

    if (blogSortBy === 'readTime') {
      result.sort((a, b) => parseInt(a.readTime, 10) - parseInt(b.readTime, 10));
    } else if (blogSortBy === 'distance') {
      result.sort((a, b) => {
        const distA = parseFloat(a.practicalInfo.distanceFromCBS) || 0;
        const distB = parseFloat(b.practicalInfo.distanceFromCBS) || 0;
        return distA - distB;
      });
    }

    return result;
  }, [activeCategory, blogSearchQuery, blogSortBy]);

  const handleToggleBlogBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBlogBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#262626] font-sans selection:bg-amber-100 selection:text-amber-900 flex flex-col">
      
      {/* -------------------------------------------------------------
          Top Global Mode Switcher Banner
          ------------------------------------------------------------- */}
      <div className="bg-[#11241a] text-[#f7f5ef] border-b border-[#244b38] px-4 py-2 flex items-center justify-between text-xs sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold tracking-tight">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white">Nashik Wanderlust</span>
            <span className="text-emerald-300/80 font-normal hidden sm:inline">• The Heritage, Treks &amp; Wine Country Travel Blog</span>
          </div>
          <span className="text-stone-500 hidden md:inline">|</span>
          <span className="text-[11px] text-amber-300 font-medium hidden md:flex items-center gap-1">
            <Waves className="w-3 h-3 text-amber-400" /> Active Topic: Waterfalls Near Nashik (Ubersuggest Dataset)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {appMode === 'assistant' ? (
            <button
              onClick={() => {
                setAppMode('live-blog');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="px-3 py-1 rounded-lg bg-[#1c3c2d] hover:bg-[#285741] text-amber-300 border border-amber-500/30 font-semibold text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Preview Live Blog (10 Spots)</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setAppMode('assistant');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[11px] flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to SEO Assistant</span>
            </button>
          )}
        </div>
      </div>

      {/* -------------------------------------------------------------
          MODE 1: AI-Powered SEO Research Assistant
          ------------------------------------------------------------- */}
      {appMode === 'assistant' && (
        <div className="flex flex-1">
          
          {/* Left Fixed Navigation Sidebar */}
          <Sidebar
            activeSection={activeSection}
            onSelectSection={(sec) => {
              setActiveSection(sec);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            savedCount={savedCount}
            mobileOpen={mobileMenuOpen}
            onToggleMobile={() => setMobileMenuOpen(!mobileMenuOpen)}
            hasApiKey={hasApiKey}
            activeTopic={activeCampaignTopic}
            onSelectTopic={(t) => setActiveCampaignTopic(t)}
          />

          {/* Main Working Canvas */}
          <main className="flex-1 lg:pl-72 flex flex-col min-h-screen">
            
            {/* Top Workspace Header Bar */}
            <header className="sticky top-9 z-30 bg-[#faf8f5]/90 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-100"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="font-editorial text-lg font-bold text-stone-900 capitalize tracking-tight">
                    {activeSection.replace('-', ' ')}
                  </h2>
                  <p className="text-[11px] text-stone-500 hidden sm:block">
                    Campaign: <strong>{activeCampaignTopic}</strong> • 14 research keywords loaded
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOcrModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 border border-amber-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline">OCR Screenshot</span>
                </button>

                <button
                  onClick={() => handleLaunchArticleGeneration('Best Waterfalls Near Nashik: A Complete Travel Guide', 'Waterfall near Nashik')}
                  className="px-3.5 py-1.5 rounded-xl bg-[#152e22] hover:bg-[#1c3c2d] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Write Article</span>
                </button>
              </div>
            </header>

            {/* View Container */}
            <div className="p-4 sm:p-8 max-w-7xl w-full mx-auto flex-1">
              {activeSection === 'dashboard' && (
                <DashboardView
                  keywords={keywords}
                  clusters={WATERFALL_CLUSTERS}
                  contentPlan={NASHIK_WATERFALL_CONTENT_PLAN}
                  savedCount={savedCount}
                  onNavigate={(sec) => setActiveSection(sec)}
                  onOpenOcrModal={() => setOcrModalOpen(true)}
                  onSelectCluster={handleSelectClusterFromView}
                  onStartArticleGeneration={handleLaunchArticleGeneration}
                />
              )}

              {activeSection === 'keyword-research' && (
                <KeywordResearchView
                  keywords={keywords}
                  onToggleBookmark={handleToggleBookmark}
                  onUpdateKeyword={handleUpdateKeyword}
                  onAddKeyword={handleAddKeyword}
                  onDeleteKeyword={handleDeleteKeyword}
                  onOpenOcrModal={() => setOcrModalOpen(true)}
                  onGenerateArticle={handleLaunchArticleGeneration}
                  initialClusterFilter={clusterFilterPreset}
                />
              )}

              {activeSection === 'clusters' && (
                <KeywordClustersView
                  clusters={WATERFALL_CLUSTERS}
                  onFilterByCluster={handleSelectClusterFromView}
                  onGenerateArticleForCluster={handleLaunchArticleGeneration}
                />
              )}

              {activeSection === 'content-generator' && (
                <AiContentGeneratorView
                  initialTopic={generatorPreset.topic}
                  initialKeyword={generatorPreset.keyword}
                  initialFormat={generatorPreset.format}
                />
              )}

              {activeSection === 'content-calendar' && (
                <ContentCalendarView
                  onStartArticleGeneration={handleLaunchArticleGeneration}
                />
              )}

              {activeSection === 'competitor-research' && (
                <CompetitorResearchView />
              )}

              {activeSection === 'saved-keywords' && (
                <SavedKeywordsView
                  keywords={keywords}
                  onToggleBookmark={handleToggleBookmark}
                  onClearAllBookmarks={handleClearAllBookmarks}
                  onNavigateToResearch={() => setActiveSection('keyword-research')}
                  onStartArticleGeneration={handleLaunchArticleGeneration}
                />
              )}

              {activeSection === 'export-reports' && (
                <ExportReportsView
                  keywords={keywords}
                  clusters={WATERFALL_CLUSTERS}
                  contentPlan={NASHIK_WATERFALL_CONTENT_PLAN}
                />
              )}

              {activeSection === 'settings' && (
                <SettingsView
                  activeTopic={activeCampaignTopic}
                  onSelectTopic={(t) => setActiveCampaignTopic(t)}
                  hasApiKey={hasApiKey}
                />
              )}
            </div>

            {/* Footer */}
            <footer className="border-t border-stone-200 py-6 px-8 text-center text-xs text-stone-500 bg-white">
              <p>
                <strong>Nashik Wanderlust SEO Research Assistant</strong> • Powered by Gemini 3.8 Flash Vision &amp; Language Architecture • Designed for Maharashtra Travel Publishing
              </p>
            </footer>

          </main>

        </div>
      )}

      {/* -------------------------------------------------------------
          MODE 2: Live Travel Blog (10 Visiting Spots in Nashik)
          ------------------------------------------------------------- */}
      {appMode === 'live-blog' && (
        <div className="flex-1 flex flex-col">
          <Navbar
            activeCategory={activeCategory}
            onSelectCategory={(cat) => setActiveCategory(cat)}
            searchQuery={blogSearchQuery}
            onSearchChange={(q) => setBlogSearchQuery(q)}
            bookmarkCount={blogBookmarkedIds.length}
            onOpenBookmarks={() => setBlogBookmarksDrawerOpen(true)}
            onOpenItineraries={() => setItinerariesModalOpen(true)}
            onGoHome={() => {
              setSelectedArticle(null);
              window.location.hash = '';
            }}
            isArticleOpen={Boolean(selectedArticle)}
          />

          <main className="flex-1">
            {selectedArticle ? (
              <ArticleView
                article={selectedArticle}
                allArticles={ARTICLES}
                isBookmarked={blogBookmarkedIds.includes(selectedArticle.id)}
                onToggleBookmark={(id, e) => handleToggleBlogBookmark(id, e)}
                onBack={() => {
                  setSelectedArticle(null);
                  window.location.hash = '';
                }}
                onSelectArticle={(art) => {
                  setSelectedArticle(art);
                  window.location.hash = art.id;
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ) : (
              <>
                <HeroFeatured
                  article={ARTICLES[0]}
                  onReadArticle={(art) => {
                    setSelectedArticle(art);
                    window.location.hash = art.id;
                  }}
                  onExploreAll={() => {
                    const el = document.getElementById('explore');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />

                <QuickGuideSection />

                {/* Filter and Articles Grid */}
                <section id="explore" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-stone-200">
                    <div>
                      <span className="text-amber-800 font-semibold text-xs tracking-wider uppercase">
                        The Curated Guide
                      </span>
                      <h2 className="font-editorial text-3xl font-bold text-stone-900 mt-1">
                        10 Iconic Visiting Spots
                      </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                        <input
                          type="text"
                          placeholder="Search temples, forts..."
                          value={blogSearchQuery}
                          onChange={(e) => setBlogSearchQuery(e.target.value)}
                          className="pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-emerald-700"
                        />
                      </div>

                      <select
                        value={activeCategory}
                        onChange={(e) => setActiveCategory(e.target.value as Category)}
                        className="px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white text-stone-700"
                      >
                        {CATEGORIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBlogArticles.map((article, idx) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        index={idx}
                        isBookmarked={blogBookmarkedIds.includes(article.id)}
                        onToggleBookmark={(id, e) => handleToggleBlogBookmark(id, e)}
                        onReadArticle={(art) => {
                          setSelectedArticle(art);
                          window.location.hash = art.id;
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      />
                    ))}
                  </div>
                </section>
              </>
            )}
          </main>

          <Footer 
            onSelectArticle={(art) => {
              setSelectedArticle(art);
              window.location.hash = art.id;
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenItineraries={() => setItinerariesModalOpen(true)}
          />

          <BookmarksDrawer
            isOpen={blogBookmarksDrawerOpen}
            onClose={() => setBlogBookmarksDrawerOpen(false)}
            bookmarkedArticles={ARTICLES.filter(a => blogBookmarkedIds.includes(a.id))}
            onSelectArticle={(art) => {
              setSelectedArticle(art);
              setBlogBookmarksDrawerOpen(false);
              window.location.hash = art.id;
            }}
            onRemoveBookmark={(id) => handleToggleBlogBookmark(id)}
            onClearAll={() => setBlogBookmarkedIds([])}
          />

          <TravelPlannerModal
            isOpen={itinerariesModalOpen}
            onClose={() => setItinerariesModalOpen(false)}
            articles={ARTICLES}
            onSelectArticle={(art) => {
              setSelectedArticle(art);
              setItinerariesModalOpen(false);
              window.location.hash = art.id;
            }}
          />
        </div>
      )}

      {/* -------------------------------------------------------------
          Modal: Screenshot OCR Keyword Extractor (Gemini 3.8 Flash)
          ------------------------------------------------------------- */}
      <ScreenshotOcrModal
        isOpen={ocrModalOpen}
        onClose={() => setOcrModalOpen(false)}
        onImportKeywords={handleImportOcrKeywords}
      />

    </div>
  );
}
