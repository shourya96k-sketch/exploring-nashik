import React from 'react';
import { Article } from '../types/blog';
import { ArrowRight, Clock, Calendar, Sparkles, MapPin, Award } from 'lucide-react';

interface HeroFeaturedProps {
  article: Article;
  onReadArticle: (article: Article) => void;
  onExploreAll: () => void;
}

export const HeroFeatured: React.FC<HeroFeaturedProps> = ({
  article,
  onReadArticle,
  onExploreAll,
}) => {
  return (
    <section className="relative overflow-hidden bg-stone-950 text-white">
      {/* Background Graphic elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-600 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-rose-700 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20 relative z-10">
        
        {/* Header Introduction Tagline */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Curated Maharashtra Travel Series
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-100 leading-tight">
            10 Unforgettable Spots in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-rose-300">Nashik</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-300 font-normal leading-relaxed">
            Where sacred Godavari ghats, 2,000-year-old rock-cut stupas, high Sahyadri fortresses, and India’s lush wine capital come together.
          </p>

          {/* Key Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-stone-800">
            <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800">
              <span className="block font-editorial text-2xl font-bold text-amber-400">10</span>
              <span className="text-xs text-stone-400 font-medium">Curated Guides</span>
            </div>
            <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800">
              <span className="block font-editorial text-2xl font-bold text-amber-400">12th C.</span>
              <span className="text-xs text-stone-400 font-medium">Sacred Heritage</span>
            </div>
            <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800">
              <span className="block font-editorial text-2xl font-bold text-amber-400">3,676 ft</span>
              <span className="text-xs text-stone-400 font-medium">Sahyadri Peaks</span>
            </div>
            <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800">
              <span className="block font-editorial text-2xl font-bold text-amber-400">#1</span>
              <span className="text-xs text-stone-400 font-medium">Wine Capital of India</span>
            </div>
          </div>
        </div>

        {/* Featured Card */}
        <div className="mt-8 rounded-3xl overflow-hidden bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800 shadow-2xl hover:border-amber-500/40 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Image Column */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[360px] overflow-hidden group">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent lg:hidden" />
              
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider shadow-lg">
                  <Award className="w-3.5 h-3.5" />
                  Featured Story
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-amber-300 text-xs font-semibold border border-amber-500/30">
                  {article.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 text-xs text-stone-300 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {article.practicalInfo.distanceFromCBS} from Nashik CBS
              </div>
            </div>

            {/* Text Content Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 text-xs text-stone-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {article.publishedDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {article.readTime}
                  </span>
                </div>

                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white leading-snug hover:text-amber-300 transition-colors cursor-pointer"
                    onClick={() => onReadArticle(article)}>
                  {article.title}
                </h2>

                <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Highlights preview */}
                <div className="mt-6 space-y-2 border-t border-stone-800/80 pt-4">
                  <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 block">
                    What Makes It Special:
                  </span>
                  <ul className="text-xs text-stone-300 space-y-1.5">
                    {article.highlights.slice(0, 3).map((hl, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Author and Action */}
              <div className="mt-8 pt-6 border-t border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                  />
                  <div>
                    <span className="text-xs font-semibold text-stone-200 block">
                      {article.author.name}
                    </span>
                    <span className="text-[11px] text-stone-400 block line-clamp-1">
                      {article.author.role}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onReadArticle(article)}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-amber-900/30 flex items-center gap-1.5 group cursor-pointer"
                >
                  Read Guide
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
