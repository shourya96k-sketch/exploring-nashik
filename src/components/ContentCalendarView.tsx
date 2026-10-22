import React, { useState } from 'react';
import { WaterfallContentPlanArticle, PriorityTier } from '../types/seo';
import { NASHIK_WATERFALL_CONTENT_PLAN } from '../data/nashikWaterfallsData';
import { 
  Calendar, Check, Copy, ExternalLink, ArrowRight, 
  FileText, Sparkles, Filter, ChevronDown, ChevronUp, Clock, Target, Layers 
} from 'lucide-react';

interface ContentCalendarViewProps {
  onStartArticleGeneration: (topic: string, primaryKw: string, format?: any) => void;
}

export const ContentCalendarView: React.FC<ContentCalendarViewProps> = ({
  onStartArticleGeneration,
}) => {
  const [articles, setArticles] = useState<WaterfallContentPlanArticle[]>(NASHIK_WATERFALL_CONTENT_PLAN);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('plan-1');
  const [copyToast, setCopyToast] = useState<string | null>(null);

  const filteredArticles = articles.filter(a => {
    if (statusFilter !== 'All' && a.status !== statusFilter) return false;
    return true;
  });

  const handleToggleStatus = (id: string) => {
    setArticles(prev => prev.map(a => {
      if (a.id !== id) return a;
      const nextStatus = 
        a.status === 'Planned' ? 'Drafted' :
        a.status === 'Drafted' ? 'Ready to Publish' : 'Planned';
      return { ...a, status: nextStatus as any };
    }));
  };

  const handleCopyBrief = (plan: WaterfallContentPlanArticle) => {
    const brief = `CONTENT BRIEF: ${plan.title}
Format: ${plan.format}
Topical Cluster: ${plan.cluster}
Primary Keyword: ${plan.primaryKeyword}
Supporting Keywords: ${plan.supportingKeywords.join(', ')}
Search Intent: ${plan.searchIntent}
Target URL Slug: ${plan.suggestedUrlSlug}
Meta Description: ${plan.metaDescription}

OUTLINE:
${plan.outline.map((o, idx) => `${idx + 1}. ${o}`).join('\n')}

INTERNAL LINKS:
${plan.recommendedInternalLinks.map(l => `- ${l}`).join('\n')}
`;
    navigator.clipboard.writeText(brief);
    setCopyToast(`Copied brief for #${plan.orderNumber}`);
    setTimeout(() => setCopyToast(null), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Calendar Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-600" />
            <h2 className="font-editorial text-2xl font-bold text-stone-900">
              Waterfall Editorial Calendar &amp; Roadmap
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1 max-w-2xl">
            10-article publishing sequence starting with the core pillar page (&quot;Best Waterfalls Near Nashik&quot;) and cascading into high-intent spoke guides, itineraries, and seasonal warnings.
          </p>
        </div>

        {copyToast && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 animate-fade-in border border-emerald-300">
            <Check className="w-4 h-4 text-emerald-700" />
            {copyToast}
          </div>
        )}
      </div>

      {/* Filter and Roadmap Progress Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Total Articles</span>
          <p className="font-editorial text-2xl font-bold text-stone-900 mt-1">10 Guides</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Ready to Publish</span>
          <p className="font-editorial text-2xl font-bold text-emerald-800 mt-1">
            {articles.filter(a => a.status === 'Ready to Publish').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Drafted</span>
          <p className="font-editorial text-2xl font-bold text-blue-800 mt-1">
            {articles.filter(a => a.status === 'Drafted').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Planned</span>
          <p className="font-editorial text-2xl font-bold text-stone-700 mt-1">
            {articles.filter(a => a.status === 'Planned').length}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div className="flex gap-2">
          {['All', 'Ready to Publish', 'Drafted', 'Planned'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#152e22] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
        <span className="text-xs text-stone-500 hidden sm:inline">
          Click any card to expand outline and recommended links
        </span>
      </div>

      {/* Articles Roadmap List */}
      <div className="space-y-4">
        {filteredArticles.map((article) => {
          const isExpanded = expandedId === article.id;
          return (
            <div
              key={article.id}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                isExpanded ? 'border-emerald-700/60 shadow-md ring-1 ring-emerald-700/20' : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              
              {/* Card Header */}
              <div 
                onClick={() => setExpandedId(isExpanded ? null : article.id)}
                className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/50"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#152e22] text-white font-mono text-sm font-bold flex items-center justify-center shrink-0">
                    #{article.orderNumber}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-semibold">
                        {article.format}
                      </span>
                      <span className="text-stone-300">•</span>
                      <span className="text-[11px] text-stone-500 font-medium">
                        Cluster: <strong className="text-stone-800">{article.cluster}</strong>
                      </span>
                    </div>
                    <h3 className="font-editorial text-base sm:text-lg font-bold text-stone-900">
                      {article.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleToggleStatus(article.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                      article.status === 'Ready to Publish' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                      article.status === 'Drafted' ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                      'bg-stone-100 text-stone-700 border border-stone-200'
                    }`}
                    title="Click to cycle status"
                  >
                    {article.status}
                  </button>

                  <button
                    onClick={() => handleCopyBrief(article)}
                    className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors"
                    title="Copy full content brief"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onStartArticleGeneration(article.title, article.primaryKeyword, article.format)}
                    className="px-3 py-1.5 rounded-lg bg-[#152e22] hover:bg-[#1c3c2d] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    Write
                  </button>

                  <button 
                    onClick={() => setExpandedId(isExpanded ? null : article.id)}
                    className="p-1 text-stone-400 hover:text-stone-700"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expanded Card Details */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-stone-100 space-y-4 text-xs bg-stone-50/50">
                  
                  {/* Meta & Keyword Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Target Keyword</span>
                      <p className="font-bold text-stone-900 flex items-center gap-1">
                        <Target className="w-3.5 h-3.5 text-amber-600" /> &quot;{article.primaryKeyword}&quot;
                      </p>
                      <p className="text-[11px] text-stone-500">
                        Supporting: {article.supportingKeywords.join(', ')}
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Target URL Slug</span>
                      <p className="font-mono text-emerald-800 font-medium">
                        {article.suggestedUrlSlug}
                      </p>
                      <p className="text-[11px] text-stone-500 truncate">
                        Meta: {article.metaDescription}
                      </p>
                    </div>
                  </div>

                  {/* Outline Section */}
                  <div>
                    <span className="font-bold text-stone-700 uppercase tracking-wider text-[10px] block mb-2">
                      Structured Content Outline ({article.outline.length} Sections)
                    </span>
                    <ol className="space-y-1.5 bg-white p-4 rounded-xl border border-stone-200">
                      {article.outline.map((heading, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-stone-700">
                          <span className="font-mono text-emerald-800 font-bold shrink-0">{hIdx + 1}.</span>
                          <span className="leading-relaxed">{heading}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Internal Linking Recommendations */}
                  <div>
                    <span className="font-bold text-stone-700 uppercase tracking-wider text-[10px] block mb-1.5">
                      Recommended Internal Links
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {article.recommendedInternalLinks.map((link, lIdx) => (
                        <code key={lIdx} className="px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-emerald-800 font-mono text-[11px]">
                          {link}
                        </code>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
