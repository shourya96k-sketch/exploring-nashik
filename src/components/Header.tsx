import React from 'react';
import { 
  Compass, Table, Grid, Calendar, FileText, Sparkles, 
  Download, UploadCloud, ShieldCheck, HelpCircle, Layers
} from 'lucide-react';

export type ActiveTab = 
  | 'keywords'
  | 'clusters'
  | 'calendar'
  | 'pillar-brief'
  | 'ai-tools'
  | 'strategy-doc';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenUpload: () => void;
  onExportCsv: () => void;
  keywordCount: number;
  hasApiKey: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenUpload,
  onExportCsv,
  keywordCount,
  hasApiKey,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-stone-900 border-b border-stone-800 text-stone-100 shadow-md">
      {/* Top Banner Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 border-b border-stone-800/80">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-rose-600 flex items-center justify-center shadow-md shadow-amber-950/40">
              <Compass className="w-5 h-5 text-amber-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-lg sm:text-xl font-bold tracking-tight text-stone-100">
                  Temple & Heritage SEO Assistant
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  AI Intelligence
                </span>
              </div>
              <p className="text-[11px] text-stone-400 hidden sm:block">
                Keyword Clustering, Content Architecture & 30-Day Strategy for Indian Heritage
              </p>
            </div>
          </div>

          {/* Quick Actions & Status */}
          <div className="flex items-center gap-2.5">
            {/* Status indicator */}
            <div 
              className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                hasApiKey 
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30' 
                  : 'bg-amber-950/60 text-amber-300 border-amber-500/30'
              }`}
              title={hasApiKey ? 'Server Gemini API key connected' : 'Operating in offline verified fallback mode'}
            >
              <div className={`w-2 h-2 rounded-full ${hasApiKey ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>{hasApiKey ? 'Gemini 3.8 Flash Active' : 'Verified Dataset Mode'}</span>
            </div>

            {/* Upload Screenshot button */}
            <button
              onClick={onOpenUpload}
              className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <UploadCloud className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Upload Screenshot</span>
              <span className="sm:hidden">Upload</span>
            </button>

            {/* Export CSV button */}
            <button
              onClick={onExportCsv}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-amber-900/30 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto py-2.5 scrollbar-none">
          
          <button
            onClick={() => onSelectTab('keywords')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'keywords'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Keyword Data Table ({keywordCount})</span>
          </button>

          <button
            onClick={() => onSelectTab('clusters')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'clusters'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>10 Keyword Clusters</span>
          </button>

          <button
            onClick={() => onSelectTab('calendar')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>30-Day Content Calendar</span>
          </button>

          <button
            onClick={() => onSelectTab('pillar-brief')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'pillar-brief'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Pillar Content Brief</span>
          </button>

          <button
            onClick={() => onSelectTab('ai-tools')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'ai-tools'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI SEO Generators</span>
          </button>

          <button
            onClick={() => onSelectTab('strategy-doc')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'strategy-doc'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Complete Strategy Report (10 Sections)</span>
          </button>

        </div>

      </div>
    </header>
  );
};
