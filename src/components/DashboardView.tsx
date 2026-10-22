import React from 'react';
import { KeywordItem, ClusterInfo, WaterfallContentPlanArticle } from '../types/seo';
import { 
  Sparkles, TrendingUp, Search, Layers, FileText, 
  AlertTriangle, ShieldCheck, ArrowRight, Bookmark, 
  MapPin, Calendar, Compass, ExternalLink, HelpCircle 
} from 'lucide-react';

interface DashboardViewProps {
  keywords: KeywordItem[];
  clusters: ClusterInfo[];
  contentPlan: WaterfallContentPlanArticle[];
  savedCount: number;
  onNavigate: (section: any) => void;
  onOpenOcrModal: () => void;
  onSelectCluster: (clusterName: string) => void;
  onStartArticleGeneration: (topic: string, primaryKw: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  keywords,
  clusters,
  contentPlan,
  savedCount,
  onNavigate,
  onOpenOcrModal,
  onSelectCluster,
  onStartArticleGeneration,
}) => {
  // Aggregate stats
  const totalVolume = keywords.reduce((sum, kw) => sum + kw.volume, 0);
  const localKeywords = keywords.filter(k => k.cluster !== 'Out of Scope / Irrelevant Geo');
  const localVolume = localKeywords.reduce((sum, kw) => sum + kw.volume, 0);
  const truncatedKeywords = keywords.filter(k => k.isTruncated);
  const topOpportunity = [...keywords].sort((a, b) => b.opportunityScore - a.opportunityScore)[0];
  const zeroVolumeKeywords = keywords.filter(k => k.volume === 0);

  return (
    <div className="space-y-8">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#152e22] via-[#1c3c2d] to-[#11241a] text-[#f7f5ef] p-6 sm:p-8 lg:p-10 border border-[#2b5841] shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Nashik Wanderlust Editorial Intelligence
          </div>
          <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#faf8f5]">
            SEO Strategy Hub: Waterfalls Near Nashik
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-sans">
            Actionable search intent analysis, structured topical clusters, and verified E-E-A-T travel facts extracted from research screenshots to dominate Sahyadri waterfall queries on Google Search.
          </p>

          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => onNavigate('keyword-research')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Search className="w-4 h-4 text-stone-950" />
              Explore 14 Research Keywords
            </button>
            <button
              onClick={onOpenOcrModal}
              className="px-4 py-2 rounded-xl bg-[#244b38] hover:bg-[#2e5d47] text-white font-medium text-xs flex items-center gap-2 border border-emerald-500/30 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Upload Screenshot OCR
            </button>
            <button
              onClick={() => onNavigate('content-calendar')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center gap-2 border border-white/15 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-emerald-300" />
              View 10-Article Roadmap
            </button>
          </div>
        </div>

        {/* Decorative corner element */}
        <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-10 pointer-events-none">
          <Compass className="w-80 h-80 text-emerald-200" />
        </div>
      </div>

      {/* Key Metric Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
              <span>Total Visible Keywords</span>
              <Search className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-editorial text-3xl font-bold text-stone-900">
                {keywords.length}
              </span>
              <span className="text-xs text-stone-500 font-medium">queries analyzed</span>
            </div>
          </div>
          <p className="text-[11px] text-stone-500 mt-3 pt-3 border-t border-stone-100">
            Extracted from Ubersuggest dataset
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
              <span>Stated Local Volume</span>
              <TrendingUp className="w-4 h-4 text-amber-600" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-editorial text-3xl font-bold text-amber-700">
                {localVolume.toLocaleString()}
              </span>
              <span className="text-xs text-stone-500 font-medium">/ month</span>
            </div>
          </div>
          <p className="text-[11px] text-stone-500 mt-3 pt-3 border-t border-stone-100">
            Excludes 3.6K Chennai geo-spillover
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
              <span>Topical Clusters</span>
              <Layers className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-editorial text-3xl font-bold text-emerald-800">
                10 + 1
              </span>
              <span className="text-xs text-stone-500 font-medium">hubs</span>
            </div>
          </div>
          <p className="text-[11px] text-stone-500 mt-3 pt-3 border-t border-stone-100">
            10 target + 1 negative geo-bucket
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
              <span>Planned Articles</span>
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-editorial text-3xl font-bold text-stone-900">
                {contentPlan.length}
              </span>
              <span className="text-xs text-stone-500 font-medium">long-form guides</span>
            </div>
          </div>
          <p className="text-[11px] text-stone-500 mt-3 pt-3 border-t border-stone-100">
            10 distinct content formats mapped
          </p>
        </div>

      </div>

      {/* Strategic Callouts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Core Opportunity Card */}
        <div className="bg-[#1c3c2d]/10 border border-[#2b5841]/30 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                Top Priority Head Term
              </span>
              <span className="text-xs font-bold text-emerald-900 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                Score: 92/100
              </span>
            </div>
            <h3 className="font-editorial text-lg font-bold text-stone-900 mt-3">
              &quot;Waterfall near Nashik&quot; (720/mo)
            </h3>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
              Highest commercial and navigational intent. Serves as our anchor Pillar Page (&gt;3,500 words) connecting Dugarwadi, Someshwar, Vihigaon, and Pahine into one master itinerary.
            </p>
          </div>
          <button
            onClick={() => onStartArticleGeneration('Best Waterfalls Near Nashik: A Complete Travel Guide', 'Waterfall near Nashik')}
            className="mt-4 text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            Generate Pillar Content Brief <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Geo Disambiguation Alert */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                Truncation &amp; Disambiguation
              </span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <h3 className="font-editorial text-lg font-bold text-stone-900 mt-3">
              &quot;Dudhsagar waterfall near ...&quot;
            </h3>
            <p className="text-xs text-stone-700 mt-1.5 leading-relaxed">
              <strong>Local E-E-A-T Notice:</strong> This truncated screenshot phrase refers to <em>Someshwar Waterfall</em> on the Godavari in Nashik (locally nicknamed Dudhsagar Falls), not Goa&apos;s Mandovi railway falls. Addressing this confusion directly wins trust.
            </p>
          </div>
          <button
            onClick={() => onNavigate('keyword-research')}
            className="mt-4 text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            Inspect Disambiguation Notes <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Zero-Volume Goldmine */}
        <div className="bg-stone-100 border border-stone-200 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700 bg-stone-200 px-2 py-0.5 rounded">
                Featured Snippet Targets
              </span>
              <HelpCircle className="w-4 h-4 text-stone-600" />
            </div>
            <h3 className="font-editorial text-lg font-bold text-stone-900 mt-3">
              4 Zero-Volume PAA Queries
            </h3>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
              Queries like <code>How many waterfalls in Nashik</code> and <code>Hidden waterfalls in Nashik</code> have 0 stated monthly volume but high conversational query intent. Perfect for FAQ schema and direct answer boxes.
            </p>
          </div>
          <button
            onClick={() => onNavigate('keyword-research')}
            className="mt-4 text-xs font-bold text-stone-800 hover:text-stone-950 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            View Zero-Volume FAQ Targets <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Keyword Clusters Quick Explorer */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-editorial text-xl font-bold text-stone-900">
              Topical Keyword Clusters (10 Target Hubs)
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Structured to prevent keyword cannibalization and distribute search equity through logical parent-child internal links.
            </p>
          </div>
          <button
            onClick={() => onNavigate('clusters')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
          >
            View Full Cluster Architecture <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {clusters.slice(0, 6).map((cluster) => (
            <div
              key={cluster.id}
              onClick={() => onSelectCluster(cluster.name)}
              className="p-3.5 rounded-xl border border-stone-200 hover:border-emerald-700/50 bg-stone-50/50 hover:bg-emerald-50/20 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  {cluster.recommendedPriority}
                </span>
                <span className="text-[10px] text-stone-500 font-mono">
                  {cluster.existingVolume > 0 ? `${cluster.existingVolume} vol` : 'Emerging / Niche'}
                </span>
              </div>
              <h4 className="text-sm font-bold text-stone-900 mt-1.5 group-hover:text-emerald-800 transition-colors">
                {cluster.name}
              </h4>
              <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                Primary: <strong className="text-stone-700 font-semibold">{cluster.primaryKeyword}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Content Calendar Snapshot */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-editorial text-xl font-bold text-stone-900">
              10 Waterfall Content Plan Articles
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Systematic publication roadmap with assigned formats, primary keywords, and target URL slugs.
            </p>
          </div>
          <button
            onClick={() => onNavigate('content-calendar')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
          >
            Open Editorial Calendar <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-stone-100 border border-stone-100 rounded-xl overflow-hidden text-xs">
          {contentPlan.slice(0, 5).map((plan) => (
            <div key={plan.id} className="p-3.5 hover:bg-stone-50 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-700 font-bold flex items-center justify-center text-xs shrink-0 font-mono">
                  {plan.orderNumber}
                </span>
                <div>
                  <h4 className="font-bold text-stone-900 hover:text-emerald-800 cursor-pointer" onClick={() => onStartArticleGeneration(plan.title, plan.primaryKeyword)}>
                    {plan.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-stone-500">
                    <span className="bg-stone-100 px-1.5 py-0.5 rounded text-stone-600 font-medium">
                      {plan.format}
                    </span>
                    <span>•</span>
                    <span>KW: <strong className="text-stone-700">{plan.primaryKeyword}</strong></span>
                    <span>•</span>
                    <span className="text-emerald-700">{plan.suggestedUrlSlug}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  plan.status === 'Ready to Publish' ? 'bg-emerald-100 text-emerald-800' :
                  plan.status === 'Drafted' ? 'bg-blue-100 text-blue-800' : 'bg-stone-100 text-stone-700'
                }`}>
                  {plan.status}
                </span>
                <button
                  onClick={() => onStartArticleGeneration(plan.title, plan.primaryKeyword)}
                  className="px-2.5 py-1 rounded-lg bg-[#152e22] hover:bg-[#1c3c2d] text-white font-medium text-[11px] transition-colors cursor-pointer"
                >
                  Write with AI
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
