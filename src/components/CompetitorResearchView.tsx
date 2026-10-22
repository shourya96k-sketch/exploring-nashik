import React, { useState } from 'react';
import { 
  BarChart2, AlertTriangle, ShieldCheck, CheckCircle2, 
  XCircle, ExternalLink, HelpCircle, ArrowRight, Compass, Sparkles 
} from 'lucide-react';

export const CompetitorResearchView: React.FC = () => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>('Aggregators (Holidify/Tripadvisor)');

  const competitors = [
    {
      name: 'Aggregators (Holidify/Tripadvisor)',
      strengths: 'High domain authority (DR 70-85), high programmatic page velocity.',
      criticalGaps: [
        'Generic short snippets lacking actionable driving routes and parking fees.',
        'Frequent confusion between Goa Dudhsagar and Nashik Someshwar (Dudhsagar) Falls.',
        'No real-time monsoon flash flood safety warnings or whirlpool hazard notices.',
        'Outdated opening hours that get tourists trapped at forest gates after 5:30 PM.'
      ],
      ourWinningAdvantage: 'Hyper-local E-E-A-T, verified road logs, high-res photography, and verified field timings.'
    },
    {
      name: 'Commercial Portals (Thrillophilia)',
      strengths: 'Strong commercial packaging for trekking tours and waterfall rappelling packages.',
      criticalGaps: [
        'Heavily biased toward selling tickets rather than answering free-access logistical questions.',
        'Fails to address dry summer reality: tourists book trips in May expecting water cascades.',
        'Neglects offbeat zero-volume hidden gems like Pahine roadside streams and Deori cascades.'
      ],
      ourWinningAdvantage: 'Authentic editorial honesty. Clear warnings on dry summer seasons; uncommercialized exploration.'
    },
    {
      name: 'Official Tourism (MTDC)',
      strengths: 'Government domain trust (.gov / state portal), authoritative historic mentions.',
      criticalGaps: [
        'Clunky UI, poor mobile performance, zero structured FAQ schema or rich snippets.',
        'Infrequent updates (last updated 2021); missing modern trek details and cafe stops.',
        'Zero coverage of modern queries like reverse waterfalls or vineyard combo itineraries.'
      ],
      ourWinningAdvantage: 'Fast, modern, mobile-first design, comprehensive JSON-LD schema, and vineyard pairing guides.'
    }
  ];

  const contentGapsChecklist = [
    {
      query: 'Dudhsagar waterfall near Nashik',
      issue: 'Competitors rank Goa Dudhsagar or show broken links',
      fix: 'Clarify Someshwar (Dudhsagar) on Godavari river vs Goa; rank #1 for local disambiguation',
      status: 'Targeted in Plan #2'
    },
    {
      query: 'Summer waterfall near Nashik',
      issue: 'Competitors show stock photos of flowing water in May',
      fix: 'Transparent seasonal reality check: redirect users to Someshwar perennial dam overflow and Bhandardara backwaters',
      status: 'Targeted in Plan #5'
    },
    {
      query: 'Reverse waterfall near Nashik',
      issue: 'Competitors only mention Naneghat (Pune/Thane border)',
      fix: 'Document Anjaneri Hill wind-tunnel reverse waterfall just 20km from Nashik CBS',
      status: 'Targeted in Plan #6'
    },
    {
      query: 'Hidden waterfalls in Nashik',
      issue: 'Competitors list standard 3 crowded spots (Someshwar, Dugarwadi, Vihigaon)',
      fix: 'Detailed coverage of Pahine village roadside streams and secret Igatpuri monsoon valleys',
      status: 'Targeted in Plan #3'
    },
    {
      query: 'Dugarwadi waterfall safety',
      issue: 'Zero warnings about deadly underwater currents and lack of mobile signal',
      fix: 'Explicit red safety advisory box and forest entry curfew times',
      status: 'Integrated in Travel Facts'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* View Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-emerald-800" />
            <h2 className="font-editorial text-2xl font-bold text-stone-900">
              SERP Gap Analysis &amp; Competitor Intelligence
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1 max-w-2xl">
            Analysis of the Nashik waterfall SERP landscape showing where national travel portals fail local searchers and how <em>Nashik Wanderlust</em> establishes definitive topical authority.
          </p>
        </div>
      </div>

      {/* Competitor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {competitors.map((comp) => (
          <div 
            key={comp.name} 
            className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  Competitor Tier
                </span>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                  Gaps Identified
                </span>
              </div>
              <h3 className="font-editorial text-base font-bold text-stone-900">
                {comp.name}
              </h3>
              <p className="text-xs text-stone-600">
                <strong>Strength:</strong> {comp.strengths}
              </p>

              <div className="pt-2 border-t border-stone-100">
                <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                  <XCircle className="w-3 h-3 text-red-600" /> Critical Content Flaws
                </span>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {comp.criticalGaps.map((gap, gIdx) => (
                    <li key={gIdx} className="flex items-start gap-1.5 leading-snug">
                      <span className="text-red-500 font-bold shrink-0">•</span>
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
              <span className="font-bold text-emerald-900 text-[10px] uppercase tracking-wider block mb-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Nashik Wanderlust Advantage
              </span>
              <p className="text-emerald-800 leading-snug font-medium">
                {comp.ourWinningAdvantage}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Actionable SERP Gap Checklist */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div>
          <h3 className="font-editorial text-xl font-bold text-stone-900">
            5 Critical SERP Gaps We Exploit
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Specific search queries where competitors provide poor or misleading information, creating an easy opportunity to win rank #1 and Featured Snippets.
          </p>
        </div>

        <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden text-xs">
          {contentGapsChecklist.map((item, idx) => (
            <div key={idx} className="p-4 hover:bg-stone-50/80 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-3">
                <span className="font-mono font-bold text-stone-900 block text-xs">
                  &quot;{item.query}&quot;
                </span>
                <span className="text-[10px] text-stone-400 mt-0.5 block">High Search Intent</span>
              </div>
              <div className="md:col-span-4 text-red-800 font-medium">
                <span className="font-bold text-[10px] uppercase tracking-wider text-red-600 block">Competitor Failure:</span>
                {item.issue}
              </div>
              <div className="md:col-span-3 text-emerald-900 font-medium">
                <span className="font-bold text-[10px] uppercase tracking-wider text-emerald-700 block">Our Strategy:</span>
                {item.fix}
              </div>
              <div className="md:col-span-2 text-right">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold border border-emerald-300">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
