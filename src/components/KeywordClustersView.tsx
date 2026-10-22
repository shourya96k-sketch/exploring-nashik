import React, { useState } from 'react';
import { ClusterInfo, WaterfallCluster } from '../types/seo';
import { 
  Layers, ArrowRight, ShieldCheck, AlertOctagon, 
  Sparkles, Link2, Target, Filter, ExternalLink, Compass 
} from 'lucide-react';

interface KeywordClustersViewProps {
  clusters: ClusterInfo[];
  onFilterByCluster: (clusterName: string) => void;
  onGenerateArticleForCluster: (topic: string, primaryKw: string, format: string) => void;
}

export const KeywordClustersView: React.FC<KeywordClustersViewProps> = ({
  clusters,
  onFilterByCluster,
  onGenerateArticleForCluster,
}) => {
  const [selectedClusterTab, setSelectedClusterTab] = useState<'all' | 'target' | 'excluded'>('all');

  const targetClusters = clusters.filter(c => !c.isGeoExcluded);
  const excludedClusters = clusters.filter(c => c.isGeoExcluded);

  const displayedClusters = 
    selectedClusterTab === 'target' ? targetClusters :
    selectedClusterTab === 'excluded' ? excludedClusters : clusters;

  return (
    <div className="space-y-8">
      
      {/* Cluster Hub Strategy Header */}
      <div className="bg-gradient-to-br from-[#152e22] via-[#1c3c2d] to-[#11241a] text-[#f7f5ef] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#2b5841] shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            Topical Authority Architecture
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#faf8f5]">
            10 Mandatory Waterfall Clusters (+1 Geo-Excluded Bucket)
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-sans">
            By mapping search intent across 10 cohesive topical clusters, <em>Nashik Wanderlust</em> establishes unbreakable E-E-A-T authority on Google. Each cluster links back to our master pillar page while satisfying distinct tourist search journeys.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-emerald-800/50 text-xs">
            <div>
              <span className="text-emerald-300/80 block font-medium">Target Clusters</span>
              <span className="font-editorial text-2xl font-bold text-amber-400">10 Hubs</span>
            </div>
            <div>
              <span className="text-emerald-300/80 block font-medium">Anchor Pillar Query</span>
              <span className="font-editorial text-2xl font-bold text-white">720 /mo</span>
            </div>
            <div>
              <span className="text-emerald-300/80 block font-medium">Geo Segregated</span>
              <span className="font-editorial text-2xl font-bold text-red-300">1 Bucket</span>
            </div>
            <div>
              <span className="text-emerald-300/80 block font-medium">Linking Topology</span>
              <span className="font-editorial text-2xl font-bold text-amber-400">Bidirectional</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedClusterTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedClusterTab === 'all'
                ? 'bg-[#152e22] text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All Clusters ({clusters.length})
          </button>
          <button
            onClick={() => setSelectedClusterTab('target')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedClusterTab === 'target'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Target Nashik Clusters ({targetClusters.length})
          </button>
          <button
            onClick={() => setSelectedClusterTab('excluded')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedClusterTab === 'excluded'
                ? 'bg-red-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Out of Scope Geo ({excludedClusters.length})
          </button>
        </div>

        <span className="text-xs text-stone-500 hidden sm:inline">
          Click any cluster to filter related keywords or generate content
        </span>
      </div>

      {/* Clusters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedClusters.map((cluster, index) => {
          const isExcluded = cluster.isGeoExcluded;
          return (
            <div
              key={cluster.id}
              className={`rounded-2xl p-6 border shadow-xs transition-all flex flex-col justify-between ${
                isExcluded
                  ? 'bg-red-50/40 border-red-200'
                  : 'bg-white border-stone-200 hover:border-emerald-700/50'
              }`}
            >
              <div className="space-y-4">
                
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-700 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <h3 className="font-editorial text-lg font-bold text-stone-900">
                      {cluster.name}
                    </h3>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                    isExcluded
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : cluster.recommendedPriority === 'P1 (Critical)'
                      ? 'bg-emerald-800 text-white'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {cluster.recommendedPriority}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-stone-600 leading-relaxed">
                  {cluster.description}
                </p>

                {/* Primary Keyword Pill */}
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-stone-500 uppercase tracking-wider text-[9px]">
                      Primary Target Keyword
                    </span>
                    <span className="font-mono font-bold text-emerald-800">
                      {cluster.existingVolume > 0 ? `${cluster.existingVolume} /mo` : '0-vol (Snippet)'}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-amber-600" />
                    <span>&quot;{cluster.primaryKeyword}&quot;</span>
                  </div>

                  {/* Supporting Keywords */}
                  <div className="pt-2 border-t border-stone-200/60">
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
                      Supporting LSI &amp; Semantic Queries
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cluster.supportingKeywords.map((sk, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-stone-200 text-stone-700 text-[10px]">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content Type & Strategic Role */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-stone-400 font-medium">Content Format:</span>
                    <span className="font-semibold text-stone-800">{cluster.contentType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-stone-400 font-medium">Search Intent:</span>
                    <span className="font-semibold text-stone-800">{cluster.searchIntent}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-normal pt-1">
                    <strong>Role:</strong> {cluster.strategicRole}
                  </p>
                </div>

                {/* Suggested Internal Links */}
                {cluster.suggestedInternalLinks.length > 0 && (
                  <div className="pt-2 text-[11px]">
                    <span className="text-stone-400 font-semibold block mb-1 flex items-center gap-1">
                      <Link2 className="w-3 h-3 text-emerald-700" /> Suggested Internal Links:
                    </span>
                    <div className="space-y-1">
                      {cluster.suggestedInternalLinks.map((link, lIdx) => (
                        <code key={lIdx} className="block text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded truncate">
                          {link}
                        </code>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onFilterByCluster(cluster.name)}
                  className="text-xs font-semibold text-stone-600 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                >
                  <Filter className="w-3.5 h-3.5" />
                  Filter Keywords
                </button>

                {!isExcluded && (
                  <button
                    onClick={() => onGenerateArticleForCluster(
                      `Comprehensive Guide: ${cluster.primaryKeyword}`,
                      cluster.primaryKeyword,
                      cluster.contentType.includes('Listicle') ? 'Top 10 listicle' :
                      cluster.contentType.includes('Monsoon') ? 'Monsoon travel guide' :
                      cluster.contentType.includes('Trek') ? 'Trekking guide' :
                      cluster.contentType.includes('Family') ? 'Family travel guide' :
                      cluster.contentType.includes('Itinerary') ? 'One-day itinerary' :
                      'Complete destination guide'
                    )}
                    className="px-3 py-1.5 rounded-xl bg-[#152e22] hover:bg-[#1c3c2d] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    Write Article
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
