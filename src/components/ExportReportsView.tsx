import React, { useState } from 'react';
import { KeywordItem, ClusterInfo, WaterfallContentPlanArticle } from '../types/seo';
import { 
  Download, FileSpreadsheet, FileCode, FileText, 
  Printer, Check, Copy, ExternalLink, ShieldCheck 
} from 'lucide-react';

interface ExportReportsViewProps {
  keywords: KeywordItem[];
  clusters: ClusterInfo[];
  contentPlan: WaterfallContentPlanArticle[];
}

export const ExportReportsView: React.FC<ExportReportsViewProps> = ({
  keywords,
  clusters,
  contentPlan,
}) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const notifyCopied = (label: string) => {
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  // 1. Export CSV
  const handleExportCsv = () => {
    const headers = [
      'Keyword Phrase', 'Stated Search Volume', 'Keyword Difficulty', 
      'Search Intent', 'Cluster', 'Location', 'Opportunity Score', 
      'Priority Tier', 'Is Truncated', 'Target URL Slug', 'Editorial Notes'
    ];
    const rows = keywords.map(k => [
      `"${k.phrase.replace(/"/g, '""')}"`,
      k.volume,
      k.keywordDifficulty,
      `"${k.intent}"`,
      `"${k.cluster}"`,
      `"${k.location}"`,
      k.opportunityScore,
      `"${k.priorityTier}"`,
      k.isTruncated ? 'Yes' : 'No',
      `"${k.suggestedUrlSlug}"`,
      `"${k.notes.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadFile(encodeURI(csvContent), 'nashik_wanderlust_waterfall_keywords.csv');
  };

  // 2. Export JSON
  const handleExportJson = () => {
    const data = {
      campaign: 'Waterfalls Near Nashik',
      blogName: 'Nashik Wanderlust',
      tagline: 'The Heritage, Treks & Wine Country Travel Blog',
      generatedAt: new Date().toISOString(),
      keywordsCount: keywords.length,
      clustersCount: clusters.length,
      articlesCount: contentPlan.length,
      clusters,
      keywords,
      contentPlan
    };
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    downloadFile(jsonStr, 'nashik_wanderlust_seo_strategy.json');
  };

  // 3. Export Markdown Briefs
  const handleExportMarkdownBriefs = () => {
    const md = `# Nashik Wanderlust: Waterfall SEO Editorial Plan & Content Briefs
Campaign: Waterfalls Near Nashik
Generated: ${new Date().toLocaleDateString()}

---

## 1. Executive Summary
- Primary Commercial Anchor: "Waterfall near Nashik" (720/mo)
- High-Volume Mobile Query: "Near waterfalls near me" (6.6K/mo)
- Zero-Volume Targets: 4 high-converting PAA questions
- Excluded Geo Mismatch: "Near Chennai waterfalls" (3,600/mo - segregated)

---

## 2. The 10 Planned Waterfall Articles

${contentPlan.map(p => `### Article #${p.orderNumber}: ${p.title}
- **Format:** ${p.format}
- **Topical Cluster:** ${p.cluster}
- **Primary Keyword:** ${p.primaryKeyword}
- **Supporting Keywords:** ${p.supportingKeywords.join(', ')}
- **Target URL Slug:** ${p.suggestedUrlSlug}
- **Meta Description:** ${p.metaDescription}

#### Outline
${p.outline.map((o, idx) => `${idx + 1}. ${o}`).join('\n')}

#### Recommended Internal Links
${p.recommendedInternalLinks.map(l => `- ${l}`).join('\n')}
`).join('\n---\n\n')}
`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    downloadFile(url, 'nashik_waterfalls_10_article_briefs.md');
  };

  const downloadFile = (uriOrUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = uriOrUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-emerald-800" />
            <h2 className="font-editorial text-2xl font-bold text-stone-900">
              Export Hub &amp; Executive Reports
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1 max-w-2xl">
            Export data manifests, content briefs, and strategy summaries in standard spreadsheet, markdown, and JSON formats for your editorial team.
          </p>
        </div>

        {copiedItem && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 border border-emerald-300">
            <Check className="w-4 h-4 text-emerald-700" />
            {copiedItem}
          </div>
        )}
      </div>

      {/* Export Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* CSV Export */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
            </div>
            <h3 className="font-editorial text-base font-bold text-stone-900">
              Keywords CSV Spreadsheet
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Full table with {keywords.length} keywords, stated search volumes, intent categories, and opportunity scores.
            </p>
          </div>
          <button
            onClick={handleExportCsv}
            className="w-full py-2 px-3 rounded-xl bg-[#152e22] hover:bg-[#1c3c2d] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Download CSV
          </button>
        </div>

        {/* Markdown Briefs */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-700" />
            </div>
            <h3 className="font-editorial text-base font-bold text-stone-900">
              10 Editorial Briefs (.md)
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Complete markdown briefs for all 10 planned waterfall articles with section outlines and internal links.
            </p>
          </div>
          <button
            onClick={handleExportMarkdownBriefs}
            className="w-full py-2 px-3 rounded-xl bg-[#152e22] hover:bg-[#1c3c2d] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Download Markdown
          </button>
        </div>

        {/* JSON Schema */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <FileCode className="w-5 h-5 text-amber-700" />
            </div>
            <h3 className="font-editorial text-base font-bold text-stone-900">
              Full Strategy JSON
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Structured machine-readable JSON containing keywords, clusters, travel facts, and content calendar.
            </p>
          </div>
          <button
            onClick={handleExportJson}
            className="w-full py-2 px-3 rounded-xl bg-[#152e22] hover:bg-[#1c3c2d] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Download JSON
          </button>
        </div>

        {/* Print Executive Summary */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Printer className="w-5 h-5 text-purple-700" />
            </div>
            <h3 className="font-editorial text-base font-bold text-stone-900">
              Printable Summary
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Format current strategy overview for team review or client presentations in clean print format.
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="w-full py-2 px-3 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Save as PDF
          </button>
        </div>

      </div>

      {/* Executive Strategy Overview Preview */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <h3 className="font-editorial text-xl font-bold text-stone-900">
          Executive Editorial Strategy Summary
        </h3>
        
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3 text-xs text-stone-700 leading-relaxed">
          <p>
            <strong>Core Domain Objective:</strong> Establish <em>Nashik Wanderlust</em> as the definitive travel authority for Western Ghats waterfalls around Nashik, Trimbakeshwar, and Igatpuri.
          </p>
          <p>
            <strong>Head Query Architecture:</strong> Anchor high-volume searches (<code className="bg-white px-1.5 py-0.5 rounded border border-stone-200 font-bold">Waterfall near Nashik</code> - 720/mo and <code className="bg-white px-1.5 py-0.5 rounded border border-stone-200 font-bold">Near waterfalls near me</code> - 6,600/mo) into a Master Pillar Destination Guide that links downward to individual spoke pages.
          </p>
          <p>
            <strong>E-E-A-T Quality Safeguards:</strong> Prevent generic competitor mistakes by explicitly clarifying local naming conventions (Someshwar/Dudhsagar), publishing transparent warnings on dry summer flows, and providing verified GPS and parking logistics for rugged valley gorges like Dugarwadi.
          </p>
        </div>
      </div>

    </div>
  );
};
