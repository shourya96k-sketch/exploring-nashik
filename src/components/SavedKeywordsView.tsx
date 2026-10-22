import React from 'react';
import { KeywordItem } from '../types/seo';
import { Bookmark, Download, Sparkles, Trash2, ArrowRight, Target, ExternalLink } from 'lucide-react';

interface SavedKeywordsViewProps {
  keywords: KeywordItem[];
  onToggleBookmark: (id: string) => void;
  onClearAllBookmarks: () => void;
  onNavigateToResearch: () => void;
  onStartArticleGeneration: (topic: string, primaryKw: string) => void;
}

export const SavedKeywordsView: React.FC<SavedKeywordsViewProps> = ({
  keywords,
  onToggleBookmark,
  onClearAllBookmarks,
  onNavigateToResearch,
  onStartArticleGeneration,
}) => {
  const savedKeywords = keywords.filter(k => k.isBookmarked);

  const handleExportSavedCsv = () => {
    const headers = ['Keyword Phrase', 'Stated Volume', 'Search Intent', 'Cluster', 'Priority', 'Opportunity Score', 'Suggested Slug', 'Notes'];
    const rows = savedKeywords.map(k => [
      `"${k.phrase.replace(/"/g, '""')}"`,
      k.volume,
      `"${k.intent}"`,
      `"${k.cluster}"`,
      `"${k.priorityTier}"`,
      k.opportunityScore,
      `"${k.suggestedUrlSlug}"`,
      `"${k.notes.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encodedUri;
    link.download = `nashik_saved_keywords_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-600 fill-amber-600" />
            <h2 className="font-editorial text-2xl font-bold text-stone-900">
              Saved Priority Keywords ({savedKeywords.length})
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1 max-w-2xl">
            Your curated collection of high-opportunity keywords bookmarked for upcoming travel articles and content cluster sprints.
          </p>
        </div>

        {savedKeywords.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportSavedCsv}
              className="px-3.5 py-2 rounded-xl bg-[#152e22] hover:bg-[#1c3c2d] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-300" />
              Export Saved CSV
            </button>
            <button
              onClick={onClearAllBookmarks}
              className="px-3.5 py-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Keywords List or Empty State */}
      {savedKeywords.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="font-editorial text-xl font-bold text-stone-900">
            No Bookmarked Keywords Yet
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Star high-opportunity terms in the Keyword Research table to keep track of your priority content targets.
          </p>
          <div className="pt-2">
            <button
              onClick={onNavigateToResearch}
              className="px-4 py-2 rounded-xl bg-[#152e22] hover:bg-[#1c3c2d] text-white text-xs font-semibold flex items-center gap-1.5 mx-auto cursor-pointer"
            >
              Go to Keyword Research <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedKeywords.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between hover:border-emerald-700/50 transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {item.cluster}
                    </span>
                    <h3 className="font-bold text-base text-stone-900 mt-2 flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-amber-600 shrink-0" />
                      &quot;{item.phrase}&quot;
                    </h3>
                  </div>

                  <button
                    onClick={() => onToggleBookmark(item.id)}
                    className="p-1 rounded text-amber-500 hover:text-amber-700"
                    title="Remove from saved"
                  >
                    <Bookmark className="w-4 h-4 fill-amber-500" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs py-1 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="p-1.5">
                    <span className="text-[9px] uppercase font-bold text-stone-400 block">Stated Vol</span>
                    <span className="font-mono font-bold text-stone-900">{item.volumeDisplay}</span>
                  </div>
                  <div className="p-1.5">
                    <span className="text-[9px] uppercase font-bold text-stone-400 block">Intent</span>
                    <span className="font-semibold text-stone-800 truncate block">{item.intent}</span>
                  </div>
                  <div className="p-1.5">
                    <span className="text-[9px] uppercase font-bold text-stone-400 block">Opportunity</span>
                    <span className="font-mono font-bold text-emerald-800">{item.opportunityScore.toFixed(0)}/100</span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.notes}
                </p>

                <div className="text-[11px] font-mono text-emerald-800 bg-emerald-50/60 p-2 rounded-lg truncate">
                  Slug: {item.suggestedUrlSlug}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-stone-500">
                  Priority: {item.priorityTier}
                </span>

                <button
                  onClick={() => onStartArticleGeneration(`Complete Guide to ${item.phrase}`, item.phrase)}
                  className="px-3 py-1.5 rounded-lg bg-[#152e22] hover:bg-[#1c3c2d] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Generate Article
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
