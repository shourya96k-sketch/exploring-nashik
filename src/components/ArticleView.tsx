import React, { useState, useEffect } from 'react';
import { Article, UserComment } from '../types/blog';
import { 
  ArrowLeft, Clock, Calendar, Bookmark, Share2, Heart, 
  MapPin, CheckCircle2, Utensils, Compass, 
  ChevronRight, ChevronLeft, MessageSquare, Send, Check
} from 'lucide-react';

interface ArticleViewProps {
  article: Article;
  allArticles: Article[];
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  allArticles,
  onBack,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [likes, setLikes] = useState<number>(() => {
    const saved = localStorage.getItem(`likes_${article.id}`);
    return saved ? parseInt(saved, 10) : 42;
  });
  const [hasLiked, setHasLiked] = useState<boolean>(() => {
    return localStorage.getItem(`has_liked_${article.id}`) === 'true';
  });
  const [copyToast, setCopyToast] = useState(false);

  // Comments state
  const [comments, setComments] = useState<UserComment[]>(() => {
    const saved = localStorage.getItem(`comments_${article.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    // Default seed comment for social proof
    return [
      {
        id: 'seed-1',
        articleId: article.id,
        author: 'Rohan Deshpande',
        city: 'Pune',
        text: `Visited this spot last month! Highly recommend going early morning to beat the rush. The local misal pav nearby is phenomenal.`,
        createdAt: '3 days ago',
      }
    ];
  });

  const [authorName, setAuthorName] = useState('');
  const [authorCity, setAuthorCity] = useState('');
  const [commentText, setCommentText] = useState('');

  // Scroll Progress listener
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.id]);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
      localStorage.setItem(`likes_${article.id}`, String(likes - 1));
      localStorage.setItem(`has_liked_${article.id}`, 'false');
    } else {
      setLikes(prev => prev + 1);
      setHasLiked(true);
      localStorage.setItem(`likes_${article.id}`, String(likes + 1));
      localStorage.setItem(`has_liked_${article.id}`, 'true');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 2500);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: UserComment = {
      id: Date.now().toString(),
      articleId: article.id,
      author: authorName.trim() || 'Fellow Traveler',
      city: authorCity.trim() || 'Nashik Visitor',
      text: commentText.trim(),
      createdAt: 'Just now',
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(`comments_${article.id}`, JSON.stringify(updated));
    setCommentText('');
  };

  // Find next and previous articles
  const currentIndex = allArticles.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : allArticles[allArticles.length - 1];
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : allArticles[0];

  // Related articles in same category or adjacent
  const relatedArticles = allArticles
    .filter(a => a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-20">
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-stone-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-amber-500 via-amber-600 to-rose-600 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Article Navigation Bar */}
      <nav className="sticky top-0 z-30 bg-stone-900/90 backdrop-blur-md text-stone-200 border-b border-stone-800 px-4 py-3 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-300 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All 10 Spots</span>
          </button>

          <div className="hidden md:block text-xs text-stone-400 font-medium truncate max-w-md">
            {article.title}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-full border transition-all flex items-center gap-1.5 text-xs font-semibold ${
                hasLiked 
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50' 
                  : 'bg-stone-800 text-stone-300 border-stone-700 hover:text-rose-400'
              }`}
              title="Like this article"
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
              <span>{likes}</span>
            </button>

            <button
              onClick={(e) => onToggleBookmark(article.id, e)}
              className={`p-2 rounded-full border transition-all ${
                isBookmarked 
                  ? 'bg-amber-500 text-stone-950 border-amber-500' 
                  : 'bg-stone-800 text-stone-300 border-stone-700 hover:text-amber-400'
              }`}
              title={isBookmarked ? 'Saved to bookmarks' : 'Save article'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-stone-950' : ''}`} />
            </button>

            <button
              onClick={handleCopyLink}
              className="p-2 rounded-full bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-colors relative"
              title="Share article link"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Copy Link Toast notification */}
      {copyToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-amber-500/30 flex items-center gap-2 text-xs font-medium animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Article link copied to clipboard!</span>
        </div>
      )}

      {/* Hero Banner Section */}
      <header className="relative bg-stone-950 text-white pt-10 pb-16 lg:pb-24 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb & Category */}
          <div className="flex flex-wrap items-center gap-2 text-xs mb-6">
            <span className="text-stone-400">Nashik Travel Blog</span>
            <span className="text-stone-600">/</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
              {article.category}
            </span>
            <span className="text-stone-600">/</span>
            <span className="text-stone-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {article.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100 leading-tight tracking-tight">
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-stone-300 font-light leading-relaxed">
            {article.subtitle}
          </p>

          {/* Author & Meta Row */}
          <div className="mt-8 pt-6 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/50"
              />
              <div>
                <span className="text-sm font-semibold text-stone-100 block">
                  {article.author.name}
                </span>
                <span className="text-xs text-stone-400 block">
                  {article.author.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-stone-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Published {article.publishedDate}
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        
        {/* Featured Image with Rounded Card Frame */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-900">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full max-h-[520px] object-cover"
          />
        </div>

        {/* Quick Travel Essentials Card */}
        <div className="mt-10 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
            <Compass className="w-5 h-5 text-amber-600" />
            <h2 className="font-editorial text-xl font-bold text-stone-900">
              Visitor Quick Guide & Fast Facts
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-stone-400 block mb-1">
                Best Time to Visit
              </span>
              <p className="text-stone-800 font-medium">{article.practicalInfo.bestTime}</p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-stone-400 block mb-1">
                Opening Timings
              </span>
              <p className="text-stone-800 font-medium">{article.practicalInfo.timings}</p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-stone-400 block mb-1">
                Entry Fee & Pass
              </span>
              <p className="text-stone-800 font-medium">{article.practicalInfo.entryFee}</p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-stone-400 block mb-1">
                From Nashik Central (CBS)
              </span>
              <p className="text-stone-800 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                {article.practicalInfo.distanceFromCBS}
              </p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-stone-400 block mb-1">
                Time Recommended
              </span>
              <p className="text-stone-800 font-medium">{article.practicalInfo.recommendedDuration}</p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-stone-400 block mb-1">
                Experience Vibe
              </span>
              <p className="text-stone-800 font-medium">{article.practicalInfo.difficultyOrVibe}</p>
            </div>
          </div>

          {/* Recommended Eats Nearby */}
          <div className="mt-6 pt-5 border-t border-stone-100 bg-amber-50/60 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 sm:p-8 rounded-b-2xl">
            <span className="text-xs uppercase tracking-wider font-bold text-amber-900 block mb-2 flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-amber-700" />
              Must-Try Eats & Culinary Gems Nearby:
            </span>
            <div className="flex flex-wrap gap-2">
              {article.practicalInfo.recommendedEatsNearby.map((eat, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white text-stone-800 rounded-lg text-xs font-semibold shadow-xs border border-amber-200"
                >
                  {eat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Table of Contents Floating / In-page */}
        <div className="mt-10 p-5 rounded-2xl bg-stone-100/80 border border-stone-200">
          <span className="text-xs uppercase tracking-widest font-bold text-stone-500 block mb-3">
            In This Comprehensive Guide:
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            <a href="#introduction" className="px-3 py-1.5 rounded-lg bg-white hover:bg-amber-100 text-stone-700 hover:text-amber-900 font-medium border border-stone-200 transition-colors">
              1. Introduction
            </a>
            {article.sections.map((section, sIdx) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-amber-100 text-stone-700 hover:text-amber-900 font-medium border border-stone-200 transition-colors"
              >
                {sIdx + 2}. {section.heading}
              </a>
            ))}
            <a href="#conclusion" className="px-3 py-1.5 rounded-lg bg-white hover:bg-amber-100 text-stone-700 hover:text-amber-900 font-medium border border-stone-200 transition-colors">
              {article.sections.length + 2}. Conclusion
            </a>
          </div>
        </div>

        {/* Article Body Content */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200 shadow-sm space-y-12">
          
          {/* Introduction */}
          <section id="introduction">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
              The Journey Begins
            </h2>
            <p className="text-stone-800 text-lg sm:text-xl leading-relaxed font-serif italic text-stone-700 bg-stone-50 p-6 rounded-2xl border-l-4 border-amber-500">
              "{article.introduction}"
            </p>
          </section>

          {/* Sections */}
          {article.sections.map((sec, idx) => (
            <section key={sec.id} id={sec.id} className="pt-4 space-y-5">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-editorial font-bold text-sm flex items-center justify-center shrink-0">
                  0{idx + 1}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900">
                  {sec.heading}
                </h3>
              </div>

              {sec.content.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-stone-700 text-base sm:text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {sec.quote && (
                <div className="my-6 p-6 rounded-2xl bg-amber-50/70 border-l-4 border-amber-600 text-amber-950 font-serif italic text-base sm:text-lg">
                  "{sec.quote}"
                </div>
              )}

              {sec.image && (
                <figure className="my-8 rounded-2xl overflow-hidden border border-stone-200">
                  <img
                    src={sec.image.url}
                    alt={sec.image.caption}
                    className="w-full h-80 object-cover"
                  />
                  <figcaption className="p-3 bg-stone-100 text-xs text-stone-500 italic text-center">
                    {sec.image.caption}
                  </figcaption>
                </figure>
              )}
            </section>
          ))}

          {/* Key Highlights Checklist Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-stone-900 to-stone-950 text-white shadow-xl">
            <h3 className="font-editorial text-2xl font-bold text-amber-400 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-amber-400" />
              Spot Highlights At A Glance
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-200 text-sm">
              {article.highlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Conclusion */}
          <section id="conclusion" className="pt-6 border-t border-stone-200 space-y-4">
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900">
              The Verdict & Traveler’s Take
            </h3>
            <p className="text-stone-700 text-base sm:text-lg leading-relaxed">
              {article.conclusion}
            </p>
          </section>

          {/* Social Share & Reactions Footer */}
          <div className="pt-8 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className={`px-4 py-2.5 rounded-xl border text-sm font-semibold flex items-center gap-2 transition-all ${
                  hasLiked
                    ? 'bg-rose-50 text-rose-700 border-rose-300'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{hasLiked ? 'Loved this guide' : 'Like guide'} ({likes})</span>
              </button>

              <button
                onClick={(e) => onToggleBookmark(article.id, e)}
                className={`px-4 py-2.5 rounded-xl border text-sm font-semibold flex items-center gap-2 transition-all ${
                  isBookmarked
                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600 text-amber-600' : ''}`} />
                <span>{isBookmarked ? 'Saved' : 'Save for Later'}</span>
              </button>
            </div>

            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Travel Guide</span>
            </button>
          </div>

        </div>

        {/* Next / Previous Article Switcher */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => onSelectArticle(prevArticle)}
            className="p-5 bg-white hover:bg-stone-100 rounded-2xl border border-stone-200 text-left transition-all group flex items-center gap-4 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-stone-100 group-hover:bg-amber-100 flex items-center justify-center shrink-0">
              <ChevronLeft className="w-5 h-5 text-stone-600 group-hover:text-amber-700" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                Previous Spot
              </span>
              <span className="text-sm font-bold text-stone-800 group-hover:text-amber-800 line-clamp-1">
                {prevArticle.title}
              </span>
            </div>
          </button>

          <button
            onClick={() => onSelectArticle(nextArticle)}
            className="p-5 bg-white hover:bg-stone-100 rounded-2xl border border-stone-200 text-right transition-all group flex items-center justify-end gap-4 cursor-pointer"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                Next Spot
              </span>
              <span className="text-sm font-bold text-stone-800 group-hover:text-amber-800 line-clamp-1">
                {nextArticle.title}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-stone-100 group-hover:bg-amber-100 flex items-center justify-center shrink-0">
              <ChevronRight className="w-5 h-5 text-stone-600 group-hover:text-amber-700" />
            </div>
          </button>
        </div>

        {/* Travel Notes & Community Comments Section */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-amber-600" />
            <h3 className="font-editorial text-2xl font-bold text-stone-900">
              Traveler Notes & Tips ({comments.length})
            </h3>
          </div>

          {/* Form */}
          <form onSubmit={handleAddComment} className="mb-8 space-y-4 bg-stone-50 p-5 rounded-2xl border border-stone-200">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
              Have you visited {article.title.split(':')[0]}? Share your insider tip!
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your Name (e.g. Aditi Sharma)"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-sm focus:outline-none focus:border-amber-600"
              />
              <input
                type="text"
                placeholder="Where are you traveling from? (e.g. Mumbai)"
                value={authorCity}
                onChange={(e) => setAuthorCity(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-sm focus:outline-none focus:border-amber-600"
              />
            </div>

            <textarea
              rows={3}
              placeholder="What was the highlight of your visit? Best photo spot, tips about timing, or delicious local food nearby..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-sm focus:outline-none focus:border-amber-600"
              required
            />

            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              Post Traveler Note
            </button>
          </form>

          {/* Comment list */}
          <div className="space-y-4">
            {comments.map((comm) => (
              <div key={comm.id} className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900">{comm.author}</span>
                    <span className="text-[11px] text-stone-400">• {comm.city}</span>
                  </div>
                  <span className="text-[11px] text-stone-400">{comm.createdAt}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {comm.text}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* More Nashik Spots Grid */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-editorial text-2xl font-bold text-stone-900">
                More Nashik Spots You Should Visit
              </h3>
              <p className="text-xs text-stone-500">
                Continue your journey through Maharashtra’s most captivating city.
              </p>
            </div>
            <button
              onClick={onBack}
              className="text-xs font-bold text-amber-700 hover:underline"
            >
              View All 10
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectArticle(rel)}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-stone-100">
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                      {rel.category}
                    </span>
                    <h4 className="font-editorial font-bold text-stone-900 group-hover:text-amber-800 line-clamp-2 mt-1 text-sm leading-snug">
                      {rel.title}
                    </h4>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-1 text-xs font-semibold text-amber-700 flex items-center gap-1">
                  <span>Read Guide</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

    </div>
  );
};
