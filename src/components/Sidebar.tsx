import React from 'react';
import { 
  LayoutDashboard, Search, Layers, Sparkles, Calendar, 
  BarChart2, Bookmark, Download, Settings, Compass, 
  Menu, X, ShieldAlert, Waves
} from 'lucide-react';

export type NavSection = 
  | 'dashboard'
  | 'keyword-research'
  | 'clusters'
  | 'content-generator'
  | 'content-calendar'
  | 'competitor-research'
  | 'saved-keywords'
  | 'export-reports'
  | 'settings';

interface SidebarProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  savedCount: number;
  mobileOpen: boolean;
  onToggleMobile: () => void;
  hasApiKey: boolean;
  activeTopic: string;
  onSelectTopic: (topic: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  savedCount,
  mobileOpen,
  onToggleMobile,
  hasApiKey,
  activeTopic,
  onSelectTopic,
}) => {
  const navItems = [
    { id: 'dashboard' as NavSection, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'keyword-research' as NavSection, label: 'Keyword Research', icon: Search },
    { id: 'clusters' as NavSection, label: 'Keyword Clusters', icon: Layers },
    { id: 'content-generator' as NavSection, label: 'AI Content Generator', icon: Sparkles, badge: 'AI' },
    { id: 'content-calendar' as NavSection, label: 'Content Calendar', icon: Calendar },
    { id: 'competitor-research' as NavSection, label: 'Competitor Research', icon: BarChart2 },
    { id: 'saved-keywords' as NavSection, label: 'Saved Keywords', icon: Bookmark, count: savedCount },
    { id: 'export-reports' as NavSection, label: 'Export & Reports', icon: Download },
    { id: 'settings' as NavSection, label: 'Settings & Scoring', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={onToggleMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#152e22] text-[#f7f5ef] border-r border-[#244b38] flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Top Header & Brand */}
        <div>
          <div className="p-6 border-b border-[#244b38] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-emerald-400 flex items-center justify-center shadow-md shadow-emerald-950/50">
                <Compass className="w-5 h-5 text-stone-950" />
              </div>
              <div>
                <h1 className="font-editorial text-lg font-bold text-[#faf8f5] tracking-tight">
                  Nashik Wanderlust
                </h1>
                <p className="text-[10px] text-emerald-200/80 font-medium tracking-wide">
                  SEO Research Assistant
                </p>
              </div>
            </div>

            <button 
              onClick={onToggleMobile}
              className="lg:hidden p-1.5 rounded-lg text-emerald-200 hover:bg-[#1e4231]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Active Campaign Topic Switcher */}
          <div className="px-5 pt-4 pb-2">
            <div className="p-3 rounded-xl bg-[#1c3c2d] border border-[#2b5841] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                  <Waves className="w-3 h-3 text-amber-400" />
                  Active Campaign
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  Ubersuggest
                </span>
              </div>
              <select
                value={activeTopic}
                onChange={(e) => onSelectTopic(e.target.value)}
                className="w-full bg-[#12281e] text-xs font-semibold text-emerald-100 rounded-lg p-2 border border-[#2b5841] focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="Waterfalls Near Nashik">🌊 Waterfalls Near Nashik</option>
                <option value="Sahyadri Treks & Forts">⛰️ Sahyadri Treks & Forts</option>
                <option value="Ancient Temples & Heritage">🛕 Ancient Temples & Heritage</option>
                <option value="Vineyards & Wine Tourism">🍷 Vineyards & Wine Tourism</option>
              </select>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-280px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectSection(item.id);
                    if (mobileOpen) onToggleMobile();
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-emerald-950/40'
                      : 'text-emerald-100/90 hover:bg-[#1e4231] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-emerald-300'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-amber-400 text-stone-950">
                      {item.badge}
                    </span>
                  )}

                  {typeof item.count === 'number' && item.count > 0 && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-stone-900 text-amber-300' : 'bg-[#2b5841] text-emerald-100'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Status Bar */}
        <div className="p-4 border-t border-[#244b38] bg-[#12281e]">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${hasApiKey ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="text-[11px] text-emerald-200">
                {hasApiKey ? 'Gemini 3.8 Flash Online' : 'Verified Dataset Mode'}
              </span>
            </div>
            <span className="text-[10px] text-stone-400 font-mono">v2.4</span>
          </div>
          <p className="text-[10px] text-emerald-300/60 mt-1 leading-tight">
            Nashik Wanderlust • Western Ghats Travel
          </p>
        </div>

      </aside>
    </>
  );
};
