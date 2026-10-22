import React, { useState, useMemo } from 'react';
import { KeywordItem, WaterfallCluster, SearchIntent, PriorityTier } from '../types/seo';
import { 
  Search, SlidersHorizontal, ArrowUpDown, Filter, Plus, 
  Bookmark, Download, Sparkles, AlertTriangle, ShieldAlert, 
  Info, ExternalLink, Trash2, Edit3, Check, X, Eye, FileText, Compass
} from 'lucide-react';

interface KeywordResearchViewProps {
  keywords: KeywordItem[];
  onToggleBookmark: (id: string) => void;
  onUpdateKeyword: (updated: KeywordItem) => void;
  onAddKeyword: (newKw: KeywordItem) => void;
  onDeleteKeyword: (id: string) => void;
  onOpenOcrModal: () => void;
  onGenerateArticle: (topic: string, primaryKw: string, format?: any) => void;
  initialClusterFilter?: string;
}

export const KeywordResearchView: React.FC<KeywordResearchViewProps> = ({
  keywords,
  onToggleBookmark,
  onUpdateKeyword,
  onAddKeyword,
  onDeleteKeyword,
  onOpenOcrModal,
  onGenerateArticle,
  initialClusterFilter = 'All',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [clusterFilter, setClusterFilter] = useState<string>(initialClusterFilter);
  const [intentFilter, setIntentFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [locationFilter, setLocationFilter] = useState<string>('All');
  const [showTruncatedOnly, setShowTruncatedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'opportunity' | 'volume' | 'phrase' | 'relevance'>('opportunity');
  const [sortAsc, setSortAsc] = useState(false);

  // Selected keyword for detailed modal/drawer
  const [selectedKw, setSelectedKw] = useState<KeywordItem | null>(null);

  // Add Keyword Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPhrase, setNewPhrase] = useState('');
  const [newVolume, setNewVolume] = useState('100');
  const [newIntent, setNewIntent] = useState<SearchIntent>('Commercial Investigation');
  const [newCluster, setNewCluster] = useState<WaterfallCluster>('Waterfalls near Nashik');
  const [newLocation, setNewLocation] = useState<'Nashik' | 'Nashik District / Ghats' | 'Maharashtra' | 'Irrelevant (Chennai/Other)'>('Nashik');
  const [newNotes, setNewNotes] = useState('');
  const [addError, setAddError] = useState<string | null>(null);

  // Filtered & Sorted Keywords
  const filteredKeywords = useMemo(() => {
    return keywords.filter(kw => {
      // Search text
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesPhrase = kw.phrase.toLowerCase().includes(q);
        const matchesNotes = kw.notes.toLowerCase().includes(q);
        const matchesSlug = kw.suggestedUrlSlug.toLowerCase().includes(q);
        if (!matchesPhrase && !matchesNotes && !matchesSlug) return false;
      }

      // Cluster filter
      if (clusterFilter !== 'All' && kw.cluster !== clusterFilter) return false;

      // Intent filter
      if (intentFilter !== 'All' && kw.intent !== intentFilter) return false;

      // Priority filter
      if (priorityFilter !== 'All' && kw.priorityTier !== priorityFilter) return false;

      // Location filter
      if (locationFilter !== 'All' && kw.location !== locationFilter) return false;

      // Truncated filter
      if (showTruncatedOnly && !kw.isTruncated) return false;

      return true;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'opportunity') {
        comparison = a.opportunityScore - b.opportunityScore;
      } else if (sortBy === 'volume') {
        comparison = a.volume - b.volume;
      } else if (sortBy === 'relevance') {
        comparison = a.relevanceScore - b.relevanceScore;
      } else if (sortBy === 'phrase') {
        comparison = a.phrase.localeCompare(b.phrase);
      }
      return sortAsc ? comparison : -comparison;
    });
  }, [keywords, searchQuery, clusterFilter, intentFilter, priorityFilter, locationFilter, showTruncatedOnly, sortBy, sortAsc]);

  // Unique clusters list for filter dropdown
  const clusterOptions = useMemo(() => {
    const set = new Set<string>();
    keywords.forEach(k => set.add(k.cluster));
    return Array.from(set);
  }, [keywords]);

  // Handle Add Keyword with Duplicate Detection
  const handleCreateKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);

    const clean = newPhrase.trim();
    if (!clean) {
      setAddError('Keyword phrase cannot be empty');
      return;
    }

    // Duplicate check (case-insensitive)
    const exists = keywords.some(k => k.phrase.toLowerCase() === clean.toLowerCase());
    if (exists) {
      setAddError(`The keyword "${clean}" already exists in the research database`);
      return;
    }

    const volNum = parseInt(newVolume, 10) || 0;
    const isGeoMismatch = newLocation === 'Irrelevant (Chennai/Other)' || newCluster === 'Out of Scope / Irrelevant Geo';
    
    // Transparent scoring calculation
    let rel = isGeoMismatch ? 0.0 : 8.5;
    let opp = isGeoMismatch ? 15.0 : 70.0;
    if (volNum >= 1000) opp += 15;
    else if (volNum >= 250) opp += 12;
    else if (volNum > 0) opp += 8;

    const newKwItem: KeywordItem = {
      id: `custom-kw-${Date.now()}`,
      phrase: clean,
      volume: volNum,
      volumeDisplay: volNum.toLocaleString(),
      keywordDifficulty: 'Unknown',
      intent: newIntent,
      cluster: newCluster,
      location: newLocation,
      relevanceScore: rel,
      opportunityScore: Math.min(100, opp),
      confidenceLevel: 'Medium',
      priorityTier: isGeoMismatch ? 'Excluded (Out of Scope)' : (volNum >= 500 ? 'P1 (Critical)' : 'P2 (High)'),
      isTruncated: false,
      isBookmarked: false,
      suggestedPageType: 'Target Article Spoke',
      suggestedUrlSlug: `/${clean.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}/`,
      notes: newNotes.trim() || 'Manually added to research database',
      source: 'Manual',
    };

    onAddKeyword(newKwItem);
    setShowAddModal(false);
    setNewPhrase('');
    setNewVolume('100');
    setNewNotes('');
  };

  // Export filtered keywords to CSV
  const handleExportCsv = () => {
    const headers = [
      'Keyword Phrase',
      'Stated Search Volume',
      'Keyword Difficulty',
      'Search Intent',
      'Topical Cluster',
      'Geographic Scope',
      'Relevance Score (0-10)',
      'Opportunity Score (0-100)',
      'Confidence Level',
      'Priority Tier',
      'Is Truncated',
      'Suggested URL Slug',
      'Editorial Notes',
      'Data Source'
    ];

    const rows = filteredKeywords.map(k => [
      `"${k.phrase.replace(/"/g, '""')}"`,
      k.volume,
      k.keywordDifficulty,
      `"${k.intent}"`,
      `"${k.cluster}"`,
      `"${k.location}"`,
      k.relevanceScore,
      k.opportunityScore,
      `"${k.confidenceLevel}"`,
      `"${k.priorityTier}"`,
      k.isTruncated ? 'Yes' : 'No',
      `"${k.suggestedUrlSlug}"`,
      `"${k.notes.replace(/"/g, '""')}"`,
      `"${k.source}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nashik_wanderlust_waterfall_keywords_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* View Header with Title and Primary Actions */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-emerald-800" />
            <h2 className="font-editorial text-2xl font-bold text-stone-900">
              Keyword Research &amp; Intent Analysis
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1 max-w-2xl">
            Live database extracted from the Ubersuggest &quot;Waterfalls Near Nashik&quot; dataset. All volumes represent stated screenshot values; difficulty is transparently flagged as <em>Unknown</em>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-700" />
            Add Keyword
          </button>
          <button
            onClick={onOpenOcrModal}
            className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            OCR Screenshot
          </button>
          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 rounded-xl bg-[#152e22] hover:bg-[#1c3c2d] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-300" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Disclaimers & Truncation Alert Box */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-stone-700">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p>
            <strong className="text-amber-900">Transparent Methodology Notice:</strong> Search volumes reflect the visible metrics from the provided research screenshot. Zero-volume terms are not low quality—they represent targeted question-based conversational searches (e.g. &quot;How many waterfalls in Nashik&quot;).
          </p>
          <p className="text-stone-600">
            <strong>Geo Segregation:</strong> <code>Near Chennai waterfalls</code> (3,600 vol) is categorized under <span className="font-semibold text-red-700">Out of Scope / Irrelevant Geo</span> with 0.0 relevance to avoid diluting domain topical authority.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Text Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              placeholder="Search phrases, slugs, notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-700 bg-stone-50"
            />
          </div>

          {/* Cluster Filter */}
          <div>
            <select
              value={clusterFilter}
              onChange={(e) => setClusterFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-700 bg-stone-50 text-stone-700"
            >
              <option value="All">All Clusters (11)</option>
              {clusterOptions.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Intent Filter */}
          <div>
            <select
              value={intentFilter}
              onChange={(e) => setIntentFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-700 bg-stone-50 text-stone-700"
            >
              <option value="All">All Search Intents</option>
              <option value="Commercial Investigation">Commercial Investigation</option>
              <option value="Informational">Informational</option>
              <option value="Local / Near Me">Local / Near Me</option>
              <option value="Navigational">Navigational</option>
              <option value="Transactional">Transactional</option>
            </select>
          </div>

          {/* Priority Tier Filter */}
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-700 bg-stone-50 text-stone-700"
            >
              <option value="All">All Priority Tiers</option>
              <option value="P1 (Critical)">P1 (Critical)</option>
              <option value="P2 (High)">P2 (High)</option>
              <option value="P3 (Medium)">P3 (Medium)</option>
              <option value="Excluded (Out of Scope)">Excluded (Out of Scope)</option>
            </select>
          </div>

        </div>

        {/* Second Row: Toggles and Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 text-xs">
          
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer text-stone-600">
              <input
                type="checkbox"
                checked={showTruncatedOnly}
                onChange={(e) => setShowTruncatedOnly(e.target.checked)}
                className="rounded border-stone-300 text-amber-600 focus:ring-0"
              />
              <span>Truncated Only</span>
            </label>

            <span className="text-stone-300">|</span>

            <span className="text-stone-500">
              Showing <strong className="text-stone-900 font-bold">{filteredKeywords.length}</strong> of {keywords.length} keywords
            </span>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-2">
            <span className="text-stone-400 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1 text-xs rounded-lg border border-stone-200 bg-white font-medium text-stone-700"
            >
              <option value="opportunity">Opportunity Score</option>
              <option value="volume">Stated Volume</option>
              <option value="relevance">Relevance Score</option>
              <option value="phrase">Keyword Phrase (A-Z)</option>
            </select>
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="p-1 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600"
              title={sortAsc ? 'Ascending' : 'Descending'}
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Main Keywords Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#152e22] text-[#f7f5ef] font-semibold">
              <tr>
                <th className="p-3 w-10 text-center">Save</th>
                <th className="p-3">Keyword Phrase</th>
                <th className="p-3 text-right">Stated Volume</th>
                <th className="p-3">KD</th>
                <th className="p-3">Search Intent</th>
                <th className="p-3">Cluster</th>
                <th className="p-3 text-center">Priority</th>
                <th className="p-3 text-right">Opportunity</th>
                <th className="p-3 text-center">Confidence</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-800">
              {filteredKeywords.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-stone-500">
                    No keywords match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredKeywords.map((item) => {
                  const isExcluded = item.priorityTier === 'Excluded (Out of Scope)';
                  return (
                    <tr 
                      key={item.id} 
                      className={`hover:bg-stone-50/80 transition-colors ${
                        isExcluded ? 'bg-red-50/30' : ''
                      }`}
                    >
                      {/* Bookmark Icon */}
                      <td className="p-3 text-center">
                        <button
                          onClick={() => onToggleBookmark(item.id)}
                          className={`p-1 rounded-md transition-colors ${
                            item.isBookmarked ? 'text-amber-500 hover:text-amber-600' : 'text-stone-300 hover:text-stone-500'
                          }`}
                          title={item.isBookmarked ? 'Remove bookmark' : 'Bookmark keyword'}
                        >
                          <Bookmark className={`w-4 h-4 ${item.isBookmarked ? 'fill-amber-500' : ''}`} />
                        </button>
                      </td>

                      {/* Keyword Phrase */}
                      <td className="p-3 font-medium">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-stone-900">{item.phrase}</span>
                          {item.isTruncated && (
                            <span 
                              className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-300 shrink-0 cursor-help"
                              title="Truncated in research screenshot. Disambiguated in editorial notes."
                            >
                              Truncated
                            </span>
                          )}
                          {item.source === 'AI OCR' && (
                            <span className="px-1 py-0.2 rounded bg-purple-100 text-purple-800 text-[9px] font-bold">
                              OCR
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-stone-400 mt-0.5 truncate max-w-xs">
                          {item.notes}
                        </p>
                      </td>

                      {/* Stated Volume */}
                      <td className="p-3 text-right font-mono font-bold">
                        <span className={item.volume === 0 ? 'text-stone-400' : 'text-stone-800'}>
                          {item.volumeDisplay}
                        </span>
                      </td>

                      {/* KD (Keyword Difficulty) */}
                      <td className="p-3">
                        <span 
                          className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px] font-mono cursor-help"
                          title="KD is Unknown. We do not invent difficulty metrics without verified SERP data."
                        >
                          {item.keywordDifficulty}
                        </span>
                      </td>

                      {/* Search Intent */}
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${
                          item.intent === 'Commercial Investigation' ? 'bg-amber-100 text-amber-900 border border-amber-200' :
                          item.intent === 'Local / Near Me' ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' :
                          item.intent === 'Informational' ? 'bg-blue-100 text-blue-900 border border-blue-200' :
                          'bg-stone-100 text-stone-800'
                        }`}>
                          {item.intent}
                        </span>
                      </td>

                      {/* Topical Cluster */}
                      <td className="p-3 text-stone-600 text-[11px] whitespace-nowrap">
                        <span className="truncate max-w-[140px] block" title={item.cluster}>
                          {item.cluster}
                        </span>
                      </td>

                      {/* Priority Tier */}
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${
                          item.priorityTier === 'P1 (Critical)' ? 'bg-emerald-800 text-white' :
                          item.priorityTier === 'P2 (High)' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                          item.priorityTier === 'P3 (Medium)' ? 'bg-stone-100 text-stone-700' :
                          'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                          {item.priorityTier}
                        </span>
                      </td>

                      {/* Opportunity Score */}
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1 font-mono font-bold text-stone-900">
                          <span>{item.opportunityScore.toFixed(0)}</span>
                          <span className="text-[10px] text-stone-400 font-normal">/100</span>
                        </div>
                      </td>

                      {/* Confidence Level */}
                      <td className="p-3 text-center">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          item.confidenceLevel === 'High' ? 'text-emerald-700 bg-emerald-50' :
                          item.confidenceLevel === 'Medium' ? 'text-amber-700 bg-amber-50' :
                          'text-red-700 bg-red-50'
                        }`}>
                          {item.confidenceLevel}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setSelectedKw(item)}
                            className="p-1 rounded hover:bg-stone-200 text-stone-600"
                            title="Inspect scoring breakdown & details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          {!isExcluded && (
                            <button
                              onClick={() => onGenerateArticle(`Comprehensive Guide to ${item.phrase}`, item.phrase)}
                              className="p-1 rounded hover:bg-emerald-100 text-emerald-800"
                              title="Write article with AI Content Generator"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => onDeleteKeyword(item.id)}
                            className="p-1 rounded hover:bg-red-100 text-red-600"
                            title="Delete keyword"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Keyword Detail Inspection Modal */}
      {selectedKw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="px-6 py-4 bg-[#152e22] text-[#f7f5ef] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Keyword Audit &amp; Scoring Matrix
                </span>
                <h3 className="font-editorial text-lg font-bold text-white mt-0.5">
                  &quot;{selectedKw.phrase}&quot;
                </h3>
              </div>
              <button 
                onClick={() => setSelectedKw(null)}
                className="p-1 rounded hover:bg-[#1e4231] text-stone-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              
              {/* Scoring Formula Breakdown */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-800 uppercase tracking-wider text-[10px]">
                    Opportunity Score Breakdown
                  </span>
                  <span className="font-editorial text-xl font-bold text-emerald-800">
                    {selectedKw.opportunityScore.toFixed(1)} / 100
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 pt-2 text-center text-[11px]">
                  <div className="bg-white p-2 rounded-lg border border-stone-200">
                    <span className="text-stone-400 block text-[9px] uppercase font-bold">Relevance (35%)</span>
                    <span className="font-bold text-stone-800">{selectedKw.relevanceScore} / 10</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-stone-200">
                    <span className="text-stone-400 block text-[9px] uppercase font-bold">Search Intent (25%)</span>
                    <span className="font-bold text-stone-800">{selectedKw.intent.slice(0, 10)}</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-stone-200">
                    <span className="text-stone-400 block text-[9px] uppercase font-bold">Volume Weight (20%)</span>
                    <span className="font-bold text-stone-800">{selectedKw.volumeDisplay}</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-stone-200">
                    <span className="text-stone-400 block text-[9px] uppercase font-bold">Confidence</span>
                    <span className="font-bold text-emerald-700">{selectedKw.confidenceLevel}</span>
                  </div>
                </div>
              </div>

              {/* Editorial Strategy & Slug */}
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    Suggested Page Type
                  </label>
                  <p className="font-semibold text-stone-900 mt-0.5">{selectedKw.suggestedPageType}</p>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    Target URL Slug
                  </label>
                  <p className="font-mono text-emerald-800 bg-emerald-50 px-2 py-1 rounded mt-0.5 border border-emerald-100">
                    {selectedKw.suggestedUrlSlug}
                  </p>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    Editorial Notes &amp; Local Disambiguation
                  </label>
                  <p className="text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-200 mt-0.5">
                    {selectedKw.notes}
                  </p>
                </div>
              </div>

            </div>

            <div className="px-6 py-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => onToggleBookmark(selectedKw.id)}
                className="text-xs font-semibold text-stone-700 flex items-center gap-1.5 hover:text-stone-950"
              >
                <Bookmark className={`w-4 h-4 ${selectedKw.isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                {selectedKw.isBookmarked ? 'Bookmarked' : 'Bookmark this Keyword'}
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedKw(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-stone-600 hover:bg-stone-200"
                >
                  Close
                </button>
                {selectedKw.priorityTier !== 'Excluded (Out of Scope)' && (
                  <button
                    onClick={() => {
                      const topic = `Travel Guide: ${selectedKw.phrase}`;
                      const kw = selectedKw.phrase;
                      setSelectedKw(null);
                      onGenerateArticle(topic, kw);
                    }}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#152e22] hover:bg-[#1c3c2d] text-white flex items-center gap-1.5 shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Write Article
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Add Keyword Modal with Duplicate Check */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <form onSubmit={handleCreateKeyword} className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
            
            <div className="px-6 py-4 bg-[#152e22] text-[#f7f5ef] flex items-center justify-between">
              <h3 className="font-editorial text-base font-bold">
                Add Keyword to Research Workspace
              </h3>
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded hover:bg-[#1e4231] text-stone-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              
              {addError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{addError}</span>
                </div>
              )}

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Keyword Phrase *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Best waterfalls in Igatpuri"
                  value={newPhrase}
                  onChange={(e) => setNewPhrase(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Stated Volume (per month)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newVolume}
                    onChange={(e) => setNewVolume(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Search Intent
                  </label>
                  <select
                    value={newIntent}
                    onChange={(e) => setNewIntent(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-white"
                  >
                    <option value="Commercial Investigation">Commercial Investigation</option>
                    <option value="Informational">Informational</option>
                    <option value="Local / Near Me">Local / Near Me</option>
                    <option value="Navigational">Navigational</option>
                    <option value="Transactional">Transactional</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Topical Cluster
                </label>
                <select
                  value={newCluster}
                  onChange={(e) => setNewCluster(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-white"
                >
                  <option value="Waterfalls near Nashik">Waterfalls near Nashik</option>
                  <option value="Famous waterfalls in Nashik district">Famous waterfalls in Nashik district</option>
                  <option value="Hidden waterfalls near Nashik">Hidden waterfalls near Nashik</option>
                  <option value="Monsoon waterfalls">Monsoon waterfalls</option>
                  <option value="Summer waterfall destinations">Summer waterfall destinations</option>
                  <option value="Reverse waterfalls near Nashik">Reverse waterfalls near Nashik</option>
                  <option value="Waterfall trekking and adventure">Waterfall trekking and adventure</option>
                  <option value="Family-friendly waterfall trips">Family-friendly waterfall trips</option>
                  <option value="Waterfall road trips and transportation">Waterfall road trips and transportation</option>
                  <option value="Waterfall itineraries and nearby attractions">Waterfall itineraries and nearby attractions</option>
                  <option value="Out of Scope / Irrelevant Geo">Out of Scope / Irrelevant Geo</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Geographic Location
                </label>
                <select
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-white"
                >
                  <option value="Nashik">Nashik City</option>
                  <option value="Nashik District / Ghats">Nashik District / Ghats (Trimbak, Igatpuri)</option>
                  <option value="Maharashtra">Maharashtra Regional</option>
                  <option value="Irrelevant (Chennai/Other)">Irrelevant (Out of Scope)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Editorial Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Context, route details, or seasonal considerations..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                />
              </div>

            </div>

            <div className="px-6 py-4 bg-stone-100 border-t border-stone-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-stone-600 hover:bg-stone-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold rounded-xl bg-[#152e22] hover:bg-[#1c3c2d] text-white flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Add to Database
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
};
