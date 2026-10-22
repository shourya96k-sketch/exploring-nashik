import React, { useState } from 'react';
import { ArticleFormat, GeneratedArticle, LocalTravelFacts } from '../types/seo';
import { NASHIK_WATERFALL_CONTENT_PLAN, LOCAL_TRAVEL_FACTS } from '../data/nashikWaterfallsData';
import { 
  Sparkles, FileText, Check, Copy, Download, RefreshCw, 
  MapPin, ShieldAlert, Calendar, Clock, Compass, Code, 
  HelpCircle, Image as ImageIcon, Link2, ExternalLink, AlertTriangle, Loader2 
} from 'lucide-react';

interface AiContentGeneratorViewProps {
  initialTopic?: string;
  initialKeyword?: string;
  initialFormat?: ArticleFormat;
}

export const AiContentGeneratorView: React.FC<AiContentGeneratorViewProps> = ({
  initialTopic = 'Best Waterfalls Near Nashik: A Complete Travel Guide',
  initialKeyword = 'Waterfall near Nashik',
  initialFormat = 'Complete destination guide',
}) => {
  const [topic, setTopic] = useState(initialTopic);
  const [primaryKeyword, setPrimaryKeyword] = useState(initialKeyword);
  const [format, setFormat] = useState<ArticleFormat>(initialFormat);
  const [targetDestination, setTargetDestination] = useState<string>('Dugarwadi Waterfall');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<GeneratedArticle | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'facts' | 'seo-schema' | 'faqs-images' | 'links'>('content');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const ARTICLE_FORMATS: ArticleFormat[] = [
    'Complete destination guide',
    'Top 10 listicle',
    'How-to travel guide',
    'Monsoon travel guide',
    'Trekking guide',
    'Family travel guide',
    'One-day itinerary',
    'Weekend itinerary',
    'Comparison article',
    'Frequently asked questions',
  ];

  // Preset topic loader
  const handleSelectPreset = (planId: string) => {
    const found = NASHIK_WATERFALL_CONTENT_PLAN.find(p => p.id === planId);
    if (found) {
      setTopic(found.title);
      setPrimaryKeyword(found.primaryKeyword);
      setFormat(found.format);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          primaryKeyword,
          format,
          targetDestination,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data.article) {
        setGeneratedArticle(data.article);
      } else {
        throw new Error('Failed to parse generated article');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error communicating with generation endpoint');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  const handleDownloadMarkdown = () => {
    if (!generatedArticle) return;
    const md = `---
title: "${generatedArticle.seoTitle}"
description: "${generatedArticle.metaDescription}"
slug: "${generatedArticle.urlSlug}"
format: "${generatedArticle.format}"
primary_keyword: "${generatedArticle.primaryKeyword}"
date: "${generatedArticle.generatedDate}"
---

# ${generatedArticle.h1}

${generatedArticle.introduction}

${generatedArticle.contentSections.map(s => `## ${s.heading}\n\n${s.body.join('\n\n')}`).join('\n\n')}

## Local Travel Facts & Verified Logistics

- **Location:** ${generatedArticle.travelFacts.geographicLocation}
- **Distance from Nashik:** ${generatedArticle.travelFacts.distanceFromNashikCity}
- **Travel Time:** ${generatedArticle.travelFacts.estimatedTravelTime}
- **Best Season:** ${generatedArticle.travelFacts.bestSeason}
- **Access Route:** ${generatedArticle.travelFacts.accessRouteInfo}
- **Entry Fee:** ${generatedArticle.travelFacts.entryFee}
- **Opening Timings:** ${generatedArticle.travelFacts.openingHours}
- **Verification Status:** ${generatedArticle.travelFacts.status} (As of ${generatedArticle.travelFacts.lastVerifiedDate})

### Safety Guidelines
${generatedArticle.travelFacts.safetyConsiderations.map(sc => `- ${sc}`).join('\n')}

## Frequently Asked Questions

${generatedArticle.faqs.map(f => `### ${f.question}\n\n${f.answer}`).join('\n\n')}

## Recommended Internal Links

${generatedArticle.internalLinking.map(l => `- [${l.anchorText}](${l.targetArticle}) — ${l.context}`).join('\n')}

---
*${generatedArticle.callToAction}*
`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${generatedArticle.urlSlug.replace(/\//g, '') || 'article'}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-700">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="font-editorial text-2xl font-bold text-stone-900">
              AI Travel Content Studio
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1 max-w-2xl">
            Generate full SEO-optimized travel articles covering all 10 formats with verified local travel facts, FAQ schema, image alt text, and internal link mapping.
          </p>
        </div>

        {copyFeedback && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 animate-fade-in border border-emerald-300">
            <Check className="w-4 h-4 text-emerald-700" />
            {copyFeedback}
          </div>
        )}
      </div>

      {/* Generator Configuration Card */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-5">
        
        {/* Preset Selector */}
        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
            Load Pre-Planned Waterfall Topic (10 Editorial Blueprints)
          </label>
          <div className="flex flex-wrap gap-2">
            {NASHIK_WATERFALL_CONTENT_PLAN.slice(0, 5).map(p => (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors text-left cursor-pointer ${
                  topic === p.title
                    ? 'bg-[#152e22] text-white border-[#152e22]'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                #{p.orderNumber}: {p.title.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Article Working Title *
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
              placeholder="e.g. Dugarwadi Waterfall Trek: How to Reach, Safety & Timings"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Primary Target Keyword *
            </label>
            <input
              type="text"
              value={primaryKeyword}
              onChange={(e) => setPrimaryKeyword(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 font-medium"
              placeholder="e.g. Waterfall near Nashik"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Article Format (10 Available) *
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as ArticleFormat)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-white"
            >
              {ARTICLE_FORMATS.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Grounding Waterfall Entity
            </label>
            <select
              value={targetDestination}
              onChange={(e) => setTargetDestination(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-white"
            >
              <option value="Dugarwadi Waterfall">Dugarwadi Waterfall (Trimbak)</option>
              <option value="Someshwar (Dudhsagar) Waterfall">Someshwar / Dudhsagar (Gangapur Rd)</option>
              <option value="Vihigaon (Ashoka) Waterfall">Vihigaon / Ashoka (Igatpuri/Kasara)</option>
              <option value="Pahine Waterfalls & Valley">Pahine Waterfalls (Trimbak-Ghoti)</option>
              <option value="All Nashik Waterfalls">Comprehensive District Overview</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !topic.trim()}
              className="w-full py-2.5 px-5 rounded-xl bg-[#152e22] hover:bg-[#1c3c2d] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                  Generating Full SEO Guide...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Generate SEO Travel Article
                </>
              )}
            </button>
          </div>

        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

      </div>

      {/* Generated Article Display Area */}
      {generatedArticle && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden space-y-0">
          
          {/* Article Header Top Bar */}
          <div className="p-6 bg-[#152e22] text-[#f7f5ef] flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#244b38]">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold mb-1">
                <span>{generatedArticle.format}</span>
                <span>•</span>
                <span>Primary KW: &quot;{generatedArticle.primaryKeyword}&quot;</span>
              </div>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white">
                {generatedArticle.h1}
              </h3>
              <p className="text-xs text-emerald-200/80 mt-1 font-mono">
                {generatedArticle.urlSlug}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleCopyText(generatedArticle.introduction + '\n\n' + generatedArticle.contentSections.map(s => `## ${s.heading}\n${s.body.join('\n\n')}`).join('\n\n'), 'Copied Full Content to Clipboard')}
                className="px-3 py-1.5 rounded-lg bg-[#1e4231] hover:bg-[#285741] text-xs font-semibold text-white flex items-center gap-1.5 border border-emerald-500/30 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Text
              </button>
              <button
                onClick={handleDownloadMarkdown}
                className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Export Markdown
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 px-6 border-b border-stone-200 bg-stone-50 overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => setActiveTab('content')}
              className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'content'
                  ? 'border-emerald-800 text-emerald-900 bg-white'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Full Article Body
            </button>
            <button
              onClick={() => setActiveTab('facts')}
              className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'facts'
                  ? 'border-emerald-800 text-emerald-900 bg-white'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              Verified Travel Facts
            </button>
            <button
              onClick={() => setActiveTab('seo-schema')}
              className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'seo-schema'
                  ? 'border-emerald-800 text-emerald-900 bg-white'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-blue-600" />
              SEO Meta &amp; Schema
            </button>
            <button
              onClick={() => setActiveTab('faqs-images')}
              className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'faqs-images'
                  ? 'border-emerald-800 text-emerald-900 bg-white'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
              PAA FAQs &amp; Image Alt
            </button>
            <button
              onClick={() => setActiveTab('links')}
              className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'links'
                  ? 'border-emerald-800 text-emerald-900 bg-white'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              <Link2 className="w-3.5 h-3.5 text-emerald-700" />
              Internal Linking
            </button>
          </div>

          {/* Tab 1: Rendered Article Body */}
          {activeTab === 'content' && (
            <div className="p-8 max-w-4xl mx-auto space-y-8 text-stone-800 font-sans">
              
              {/* Lead Paragraph */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 text-stone-700 text-sm sm:text-base leading-relaxed italic font-editorial">
                {generatedArticle.introduction}
              </div>

              {/* Headings Outline Summary */}
              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs">
                <span className="font-bold text-amber-900 uppercase tracking-wider block mb-2">
                  Editorial Outline Table of Contents
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700">
                  {generatedArticle.headingsOutline.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="font-medium truncate">{h.heading}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Body Sections */}
              <div className="space-y-8">
                {generatedArticle.contentSections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-3">
                    <h3 className="font-editorial text-xl font-bold text-stone-900 pt-3 border-t border-stone-100 flex items-center gap-2">
                      <span className="text-emerald-800">§{sIdx + 1}.</span> {section.heading}
                    </h3>
                    {section.body.map((p, pIdx) => (
                      <p key={pIdx} className="text-sm leading-relaxed text-stone-700">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Call to Action Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 to-[#152e22] text-white space-y-2">
                <h4 className="font-editorial text-lg font-bold text-amber-300">
                  Plan Your Nashik Waterfall Expedition
                </h4>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  {generatedArticle.callToAction}
                </p>
              </div>

            </div>
          )}

          {/* Tab 2: Verified Travel Facts */}
          {activeTab === 'facts' && (
            <div className="p-8 max-w-4xl mx-auto space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-editorial text-xl font-bold text-stone-900">
                    Verified Ground Travel Logistics: {generatedArticle.travelFacts.destinationName}
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Field-verified facts to maintain Google Search E-E-A-T trust.
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  generatedArticle.travelFacts.status === 'Verified'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  Status: {generatedArticle.travelFacts.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-1">
                  <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                    Geographic Location
                  </span>
                  <p className="font-medium text-stone-900">{generatedArticle.travelFacts.geographicLocation}</p>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-1">
                  <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                    Distance &amp; Travel Time
                  </span>
                  <p className="font-medium text-stone-900">
                    {generatedArticle.travelFacts.distanceFromNashikCity} ({generatedArticle.travelFacts.estimatedTravelTime})
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-1">
                  <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                    Best Visiting Season
                  </span>
                  <p className="font-medium text-emerald-800 font-semibold">{generatedArticle.travelFacts.bestSeason}</p>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-1">
                  <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                    Entry Fees &amp; Operating Timings
                  </span>
                  <p className="font-medium text-stone-900">
                    Fee: {generatedArticle.travelFacts.entryFee} • Hours: {generatedArticle.travelFacts.openingHours}
                  </p>
                </div>

              </div>

              {/* Route & Access */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-1 text-xs">
                <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                  Turn-by-Turn Route &amp; Parking Logistics
                </span>
                <p className="text-stone-800 leading-relaxed">{generatedArticle.travelFacts.accessRouteInfo}</p>
              </div>

              {/* Safety Guidelines */}
              <div className="p-4 rounded-xl border border-red-200 bg-red-50/50 space-y-2 text-xs">
                <span className="text-red-800 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-red-600" /> Critical Monsoon Safety Advisories
                </span>
                <ul className="list-disc list-inside space-y-1 text-stone-700">
                  {generatedArticle.travelFacts.safetyConsiderations.map((sc, i) => (
                    <li key={i} className="leading-relaxed">{sc}</li>
                  ))}
                </ul>
              </div>

              {/* Nearby Attractions */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2 text-xs">
                <span className="text-stone-500 font-bold uppercase tracking-wider text-[10px]">
                  Neighboring Sightseeing Stops (Combo Trips)
                </span>
                <div className="flex flex-wrap gap-2">
                  {generatedArticle.travelFacts.nearbyAttractions.map((na, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-800 font-medium">
                      {na}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Tab 3: SEO Meta & Schema Markup */}
          {activeTab === 'seo-schema' && (
            <div className="p-8 max-w-4xl mx-auto space-y-6 text-xs">
              
              {/* Meta Tags Card */}
              <div className="p-5 rounded-xl border border-stone-200 bg-stone-50 space-y-4">
                <h4 className="font-editorial text-base font-bold text-stone-900">
                  Page SEO Meta Tags
                </h4>

                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-stone-600">SEO Title Tag</span>
                    <span className="text-stone-400">{generatedArticle.seoTitle.length} / 60 characters</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-stone-200 font-medium text-stone-900 flex items-center justify-between">
                    <span>{generatedArticle.seoTitle}</span>
                    <button
                      onClick={() => handleCopyText(generatedArticle.seoTitle, 'Copied SEO Title')}
                      className="p-1 text-stone-400 hover:text-stone-700"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-stone-600">Meta Description</span>
                    <span className="text-stone-400">{generatedArticle.metaDescription.length} / 160 characters</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-stone-200 text-stone-800 flex items-center justify-between">
                    <span className="leading-relaxed">{generatedArticle.metaDescription}</span>
                    <button
                      onClick={() => handleCopyText(generatedArticle.metaDescription, 'Copied Meta Description')}
                      className="p-1 text-stone-400 hover:text-stone-700 shrink-0 ml-2"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <span className="font-bold text-stone-600 block mb-1">Target Canonical URL Slug</span>
                  <div className="p-2 rounded-lg bg-white border border-stone-200 font-mono text-emerald-800">
                    {generatedArticle.urlSlug}
                  </div>
                </div>
              </div>

              {/* JSON-LD Schema Card */}
              <div className="p-5 rounded-xl border border-stone-200 bg-stone-900 text-stone-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-amber-400 flex items-center gap-1.5">
                    <Code className="w-4 h-4" /> Validated JSON-LD Schema (Article &amp; FAQPage)
                  </span>
                  <button
                    onClick={() => handleCopyText(generatedArticle.schemaMarkup, 'Copied JSON-LD Schema to Clipboard')}
                    className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    Copy Schema Code
                  </button>
                </div>
                <pre className="p-3 bg-stone-950 rounded-lg overflow-x-auto text-[11px] font-mono text-emerald-400 leading-relaxed max-h-60">
                  {generatedArticle.schemaMarkup}
                </pre>
              </div>

            </div>
          )}

          {/* Tab 4: FAQs & Image Alt Tags */}
          {activeTab === 'faqs-images' && (
            <div className="p-8 max-w-4xl mx-auto space-y-6 text-xs">
              
              {/* FAQs Section */}
              <div className="space-y-3">
                <h4 className="font-editorial text-lg font-bold text-stone-900 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-purple-600" /> Google &quot;People Also Ask&quot; FAQ Targets
                </h4>
                <div className="space-y-3">
                  {generatedArticle.faqs.map((faq, fIdx) => (
                    <div key={fIdx} className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-1.5">
                      <p className="font-bold text-stone-900 text-sm">
                        Q: {faq.question}
                      </p>
                      <p className="text-stone-700 leading-relaxed">
                        A: {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Alt Tags */}
              <div className="space-y-3 pt-4 border-t border-stone-200">
                <h4 className="font-editorial text-lg font-bold text-stone-900 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-emerald-700" /> SEO Image Placement &amp; Descriptive Alt Tags
                </h4>
                <div className="space-y-3">
                  {generatedArticle.imageSuggestions.map((img, iIdx) => (
                    <div key={iIdx} className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-800 uppercase tracking-wider text-[10px]">
                          {img.placement}
                        </span>
                        <button
                          onClick={() => handleCopyText(img.altText, 'Copied Alt Tag')}
                          className="text-[10px] text-stone-500 hover:text-stone-900 font-semibold"
                        >
                          Copy Alt
                        </button>
                      </div>
                      <p className="text-stone-600">{img.description}</p>
                      <div className="p-2 rounded bg-white border border-stone-200 font-mono text-[11px] text-stone-800">
                        alt=&quot;{img.altText}&quot;
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Tab 5: Internal Linking */}
          {activeTab === 'links' && (
            <div className="p-8 max-w-4xl mx-auto space-y-4 text-xs">
              <h4 className="font-editorial text-lg font-bold text-stone-900 flex items-center gap-1.5">
                <Link2 className="w-4 h-4 text-emerald-800" /> Strategic Internal Linking Opportunities
              </h4>
              <p className="text-stone-500">
                Link to parent pillars and sibling cluster guides to pass link equity across <em>Nashik Wanderlust</em>.
              </p>

              <div className="space-y-3 pt-2">
                {generatedArticle.internalLinking.map((link, lIdx) => (
                  <div key={lIdx} className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-800">
                        Anchor Text: &quot;{link.anchorText}&quot;
                      </span>
                      <code className="text-[11px] bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-700 font-mono">
                        {link.targetArticle}
                      </code>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      <strong>Context:</strong> {link.context}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* If nothing generated yet, show helpful empty state */}
      {!generatedArticle && !isGenerating && (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="font-editorial text-xl font-bold text-stone-900">
            Select a Topic &amp; Format to Generate Content
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Generate any of the 10 pre-planned waterfall articles with grounded local travel facts, FAQ schema, image alt text, and SEO meta tags.
          </p>
          <div className="pt-2">
            <button
              onClick={handleGenerate}
              className="px-5 py-2.5 rounded-xl bg-[#152e22] hover:bg-[#1c3c2d] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Generate Sample Destination Guide
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
