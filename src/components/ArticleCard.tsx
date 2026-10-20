import React from 'react';
import { Article } from '../types/blog';
import { Clock, Calendar, Bookmark, ArrowRight, MapPin } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  index: number;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onReadArticle: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  index,
  isBookmarked,
  onToggleBookmark,
  onReadArticle,
}) => {
  // Category color mapper
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Heritage & Spiritual':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Wine & Leisure':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      case 'Adventure & Treks':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Ancient Caves & History':
        return 'bg-indigo-100 text-indigo-900 border-indigo-300';
      case 'Nature & Escapes':
        return 'bg-teal-100 text-teal-900 border-teal-300';
      default:
        return 'bg-stone-100 text-stone-900 border-stone-300';
    }
  };

  return (
    <article className="group bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Cover Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onReadArticle(article)}>
        <img
          src={article.coverImage}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        
        {/* Gradient Overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent pointer-events-none" />

        {/* Index Number Badge */}
        <div className="absolute top-3.5 left-3.5 w-7 h-7 rounded-full bg-stone-900/80 backdrop-blur-md text-amber-300 text-xs font-bold flex items-center justify-center border border-amber-400/30 shadow-md">
          #{index + 1}
        </div>

        {/* Bookmark Toggle Button */}
        <button
          type="button"
          onClick={(e) => onToggleBookmark(article.id, e)}
          title={isBookmarked ? 'Remove from saved' : 'Save article'}
          className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
            isBookmarked
              ? 'bg-amber-500 text-stone-950 shadow-amber-500/30'
              : 'bg-stone-900/70 text-stone-200 hover:bg-stone-900 hover:text-amber-400'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-stone-950' : ''}`} />
        </button>

        {/* Distance location tag */}
        <div className="absolute bottom-3 left-3 text-[11px] font-medium text-stone-100 bg-stone-950/75 backdrop-blur-sm px-2.5 py-1 rounded-md flex items-center gap-1 border border-stone-800">
          <MapPin className="w-3 h-3 text-amber-400" />
          <span>{article.practicalInfo.distanceFromCBS}</span>
        </div>

        <div className="absolute bottom-3 right-3 text-[11px] font-medium text-stone-200 bg-stone-950/75 backdrop-blur-sm px-2.5 py-1 rounded-md flex items-center gap-1 border border-stone-800">
          <Clock className="w-3 h-3 text-amber-400" />
          <span>{article.readTime}</span>
        </div>
      </div>

      {/* Article Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Pill and Date */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getCategoryBadgeClass(article.category)}`}>
              {article.category}
            </span>
            <span className="text-[11px] text-stone-400 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {article.publishedDate}
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onReadArticle(article)}
            className="font-editorial text-xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors leading-snug cursor-pointer line-clamp-2"
          >
            {article.title}
          </h3>

          {/* Subtitle / Excerpt */}
          <p className="mt-2.5 text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>

          {/* Highlights tag list */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {article.tags.slice(0, 3).map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-[10px] font-medium px-2 py-0.5 bg-stone-100 text-stone-600 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer with Author and CTA */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-7 h-7 rounded-full object-cover border border-stone-200"
            />
            <span className="text-xs text-stone-600 font-medium line-clamp-1">
              {article.author.name}
            </span>
          </div>

          <button
            onClick={() => onReadArticle(article)}
            className="text-xs font-bold text-amber-700 group-hover:text-amber-800 flex items-center gap-1 cursor-pointer hover:underline"
          >
            Read Article
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>

    </article>
  );
};
