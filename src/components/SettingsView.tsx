import React, { useState, useEffect } from 'react';
import { Settings, ShieldCheck, Activity, Compass, Info, Check, Sparkles, RefreshCw } from 'lucide-react';

interface SettingsViewProps {
  activeTopic: string;
  onSelectTopic: (topic: string) => void;
  hasApiKey: boolean;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  activeTopic,
  onSelectTopic,
  hasApiKey,
}) => {
  const [serverHealth, setServerHealth] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [modelName, setModelName] = useState<string>('gemini-3.8-flash');

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setServerHealth('connected');
          if (data.model) setModelName(data.model);
        } else {
          setServerHealth('disconnected');
        }
      })
      .catch(() => setServerHealth('disconnected'));
  }, []);

  const CAMPAIGN_TOPICS = [
    { id: 'waterfalls', name: 'Waterfalls Near Nashik', status: 'Active (Ubersuggest Dataset Loaded)', count: '14 keywords' },
    { id: 'temples', name: 'Temples & Jyotirlinga Heritage', status: 'Available in Campaign Switcher', count: '16 keywords' },
    { id: 'vineyards', name: 'Nashik Wine Country & Vineyards', status: 'Editorial Backlog', count: 'Planned' },
    { id: 'treks', name: 'Sahyadri Forts & Monsoon Treks', status: 'Editorial Backlog', count: 'Planned' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-800" />
            <h2 className="font-editorial text-2xl font-bold text-stone-900">
              Settings &amp; Scoring Methodology
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1 max-w-2xl">
            Audit the mathematical formulas behind Opportunity Scoring, confidence ratings, geographic penalties, and AI model health.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border ${
            serverHealth === 'connected' 
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
              : 'bg-amber-50 text-amber-800 border-amber-300'
          }`}>
            <span className={`w-2 h-2 rounded-full ${serverHealth === 'connected' ? 'bg-emerald-600 animate-pulse' : 'bg-amber-500'}`} />
            <span>AI Studio Engine: {serverHealth === 'connected' ? `${modelName} Active` : 'Offline Fallback Active'}</span>
          </div>
        </div>
      </div>

      {/* Transparent Opportunity Scoring Formula Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px] font-bold uppercase tracking-wider mb-2">
            Mathematical Precision
          </div>
          <h3 className="font-editorial text-xl font-bold text-stone-900">
            Opportunity Scoring Formula
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Our weighted algorithm evaluates each keyword on a 0–100 scale to surface high-impact terms while penalizing off-topic geo noise.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
              1. Relevance Weight (35%)
            </span>
            <p className="text-xs font-bold text-stone-900">0 to 10 Scale</p>
            <p className="text-[11px] text-stone-500 leading-snug">
              Direct alignment with Nashik, Trimbakeshwar, Igatpuri, or Sahyadri tourism. Non-local queries receive 0.0.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
              2. Intent Weight (25%)
            </span>
            <p className="text-xs font-bold text-stone-900">Conversion Quality</p>
            <p className="text-[11px] text-stone-500 leading-snug">
              Commercial Investigation &amp; Local queries receive top weighting (9-10). Pure informational queries receive (7-8).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
              3. Volume Weight (20%)
            </span>
            <p className="text-xs font-bold text-stone-900">Log-Normalized Scale</p>
            <p className="text-[11px] text-stone-500 leading-snug">
              Scaled log-transform so 6.6K volume doesn&apos;t completely obliterate high-intent 720 or zero-volume queries.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">
              4. Feasibility (20%)
            </span>
            <p className="text-xs font-bold text-stone-900">E-E-A-T Content Fit</p>
            <p className="text-[11px] text-stone-500 leading-snug">
              Ability of <em>Nashik Wanderlust</em> to provide first-person photographic proof, route maps, and verified timings.
            </p>
          </div>

        </div>

        {/* Geo Penalty Formula Callout */}
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 space-y-1">
          <p className="font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-red-600" /> Geographic Exclusion Rule:
          </p>
          <p className="text-red-800 leading-relaxed">
            Keywords outside Maharashtra or irrelevantly matched by search tools (e.g. <code>Near Chennai waterfalls</code> — 3,600 vol) receive a 100% topical penalty, setting their Priority to <strong>Excluded (Out of Scope)</strong>.
          </p>
        </div>
      </div>

      {/* Disclaimers & Ethics */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-3">
        <h3 className="font-editorial text-lg font-bold text-stone-900">
          Data Integrity &amp; Honest Metrics Policy
        </h3>
        <div className="space-y-2 text-xs text-stone-600 leading-relaxed">
          <p>
            • <strong>Preserved Metrics:</strong> Stated search volumes (e.g., 6,600, 3,600, 720, 260) are copied directly from the research screenshot.
          </p>
          <p>
            • <strong>No Fabricated Metrics:</strong> Keyword Difficulty (KD) is marked as <code className="bg-stone-100 px-1 py-0.5 rounded font-mono">Unknown</code> rather than inventing false difficulty ratings without live SERP clickstream data.
          </p>
          <p>
            • <strong>Truncated Terms:</strong> Incomplete screenshot phrases ending in ellipsis (e.g., <code>Dudhsagar waterfall near ...</code>) are explicitly flagged for human verification.
          </p>
        </div>
      </div>

    </div>
  );
};
