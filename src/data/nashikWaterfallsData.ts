import { KeywordItem, ClusterInfo, WaterfallContentPlanArticle, LocalTravelFacts } from '../types/seo';

/**
 * Initial dataset extracted directly from the Ubersuggest "Waterfalls Near Nashik" screenshot.
 * Preserves stated numbers and flags truncated phrases or geographic mismatches.
 */
export const INITIAL_WATERFALL_KEYWORDS: KeywordItem[] = [
  {
    id: 'wf-kw-1',
    phrase: 'Near waterfalls near me',
    volume: 6600,
    volumeDisplay: '6,600',
    keywordDifficulty: 'Unknown',
    intent: 'Local / Near Me',
    cluster: 'Waterfalls near Nashik',
    location: 'Maharashtra',
    relevanceScore: 7.5,
    opportunityScore: 78.5,
    confidenceLevel: 'Medium',
    priorityTier: 'P1 (Critical)',
    isTruncated: false,
    isBookmarked: true,
    suggestedPageType: 'Interactive Geo-Map Directory / Pillar Page',
    suggestedUrlSlug: '/waterfalls-near-me-nashik-maharashtra/',
    notes: 'Massive mobile-first local search query (6.6K). High local intent for day-trippers in Nashik, Mumbai, and Pune seeking proximate cascades.',
    source: 'Screenshot'
  },
  {
    id: 'wf-kw-2',
    phrase: 'Near Chennai waterfalls',
    volume: 3600,
    volumeDisplay: '3,600',
    keywordDifficulty: 'Unknown',
    intent: 'Local / Near Me',
    cluster: 'Out of Scope / Irrelevant Geo',
    location: 'Irrelevant (Chennai/Other)',
    relevanceScore: 0.0, // Geo penalty: Completely outside Nashik Wanderlust scope
    opportunityScore: 12.0,
    confidenceLevel: 'High',
    priorityTier: 'Excluded (Out of Scope)',
    isTruncated: false,
    isBookmarked: false,
    suggestedPageType: 'Excluded from Nashik Campaign',
    suggestedUrlSlug: '/chennai-waterfalls-out-of-scope/',
    notes: 'GEOGRAPHIC MISMATCH: Located in Tamil Nadu (1,200+ km away). High search volume (3.6K) but zero relevance to Nashik Wanderlust. Excluded from editorial plan.',
    source: 'Screenshot'
  },
  {
    id: 'wf-kw-3',
    phrase: 'Waterfall near Nashik',
    volume: 720,
    volumeDisplay: '720',
    keywordDifficulty: 'Unknown',
    intent: 'Commercial Investigation',
    cluster: 'Waterfalls near Nashik',
    location: 'Nashik',
    relevanceScore: 10.0,
    opportunityScore: 92.0,
    confidenceLevel: 'High',
    priorityTier: 'P1 (Critical)',
    isTruncated: false,
    isBookmarked: true,
    suggestedPageType: 'Master Destination Guide / Pillar Page',
    suggestedUrlSlug: '/best-waterfalls-near-nashik-travel-guide/',
    notes: 'The core commercial & navigational head term (720/mo). Highest direct intent for tourists planning weekend trips from Nashik, Mumbai, and Pune.',
    source: 'Screenshot'
  },
  {
    id: 'wf-kw-4',
    phrase: 'Nashik waterfall list',
    volume: 260,
    volumeDisplay: '260',
    keywordDifficulty: 'Unknown',
    intent: 'Informational',
    cluster: 'Famous waterfalls in Nashik district',
    location: 'Nashik',
    relevanceScore: 10.0,
    opportunityScore: 89.0,
    confidenceLevel: 'High',
    priorityTier: 'P1 (Critical)',
    isTruncated: false,
    isBookmarked: true,
    suggestedPageType: 'Comprehensive Curated Listicle (Top 10)',
    suggestedUrlSlug: '/famous-waterfalls-in-nashik-district-list/',
    notes: 'Prime candidate for high-ranking listicle (260/mo). Targets travelers looking for a quick, scannable overview with distances and timings.',
    source: 'Screenshot'
  },
  {
    id: 'wf-kw-5',
    phrase: 'Waterfall Nashik tourist places',
    volume: 260,
    volumeDisplay: '260',
    keywordDifficulty: 'Unknown',
    intent: 'Commercial Investigation',
    cluster: 'Waterfall itineraries and nearby attractions',
    location: 'Nashik',
    relevanceScore: 9.5,
    opportunityScore: 86.5,
    confidenceLevel: 'High',
    priorityTier: 'P1 (Critical)',
    isTruncated: false,
    isBookmarked: true,
    suggestedPageType: 'Combo Itinerary & Sightseeing Hub',
    suggestedUrlSlug: '/nashik-waterfalls-and-tourist-places-itinerary/',
    notes: 'Pairing waterfall visits with neighboring Nashik landmarks (e.g. Someshwar Waterfall + Sula Vineyards; Dugarwadi + Trimbakeshwar).',
    source: 'Screenshot'
  },
  {
    id: 'wf-kw-6',
    phrase: 'Summer waterfall near Nashik',
    volume: 40,
    volumeDisplay: '40',
    keywordDifficulty: 'Unknown',
    intent: 'Informational',
    cluster: 'Summer waterfall destinations',
    location: 'Nashik District / Ghats',
    relevanceScore: 9.0,
    opportunityScore: 78.0,
    confidenceLevel: 'High',
    priorityTier: 'P2 (High)',
    isTruncated: false,
    isBookmarked: false,
    suggestedPageType: 'Seasonal Reality Check & Alternative Guide',
    suggestedUrlSlug: '/summer-waterfall-destinations-near-nashik/',
    notes: 'CRITICAL E-E-A-T ADVISORY: Most Sahyadri waterfalls dry up completely by March. This article must guide travelers to perennial dam reservoirs like Someshwar or Bhandardara rather than misleading them.',
    source: 'Screenshot'
  },
  {
    id: 'wf-kw-7',
    phrase: 'Reverse waterfall near Nashik',
    volume: 10,
    volumeDisplay: '10',
    keywordDifficulty: 'Unknown',
    intent: 'Informational',
    cluster: 'Reverse waterfalls near Nashik',
    location: 'Nashik District / Ghats',
    relevanceScore: 9.5,
    opportunityScore: 82.0,
    confidenceLevel: 'High',
    priorityTier: 'P2 (High)',
    isTruncated: false,
    isBookmarked: true,
    suggestedPageType: 'Phenomenon Deep Dive & Trekking Guide',
    suggestedUrlSlug: '/reverse-waterfall-near-nashik-monsoon-guide/',
    notes: 'Fascinating monsoon updraft phenomenon observed at Anjaneri hills cliff edge and nearby Samrad/Sandhan valley during peak July-August gales.',
    source: 'Screenshot'
  },
  {
    id: 'wf-kw-8',
    phrase: 'Dudhsagar waterfall near ...',
    volume: 10,
    volumeDisplay: '10',
    keywordDifficulty: 'Unknown',
    intent: 'Informational',
    cluster: 'Famous waterfalls in Nashik district',
    location: 'Nashik',
    relevanceScore: 9.5,
    opportunityScore: 83.5,
    confidenceLevel: 'Medium',
    priorityTier: 'P1 (Critical)',
    isTruncated: true,
    isBookmarked: true,
    suggestedPageType: 'Dedicated Single-Attraction Guide',
    suggestedUrlSlug: '/someshwar-dudhsagar-waterfall-nashik-guide/',
    notes: 'TRUNCATION & DISAMBIGUATION: Refers to "Dudhsagar Waterfall Nashik" (Someshwar Waterfall on the Godavari River along Gangapur Road), distinct from Goa’s Mandovi Dudhsagar.',
    source: 'Screenshot'
  },
  {
    id: 'wf-kw-9',
    phrase: 'Waterfalls in Nashik district',
    volume: 10,
    volumeDisplay: '10',
    keywordDifficulty: 'Unknown',
    intent: 'Informational',
    cluster: 'Famous waterfalls in Nashik district',
    location: 'Nashik District / Ghats',
    relevanceScore: 9.5,
    opportunityScore: 76.0,
    confidenceLevel: 'High',
    priorityTier: 'P2 (High)',
    isTruncated: false,
    isBookmarked: false,
    suggestedPageType: 'District Geography & Route Compendium',
    suggestedUrlSlug: '/waterfalls-in-nashik-district-complete-directory/',
    notes: 'Broader district scope spanning Trimbak, Igatpuri, Jawhar border, and Dindori talukas.',
    source: 'Screenshot'
  },
  {
    id: 'wf-kw-10',
    phrase: 'Waterfall near Nashik road',
    volume: 10,
    volumeDisplay: '10',
    keywordDifficulty: 'Unknown',
    intent: 'Local / Near Me',
    cluster: 'Waterfall road trips and transportation',
    location: 'Nashik',
    relevanceScore: 8.5,
    opportunityScore: 72.0,
    confidenceLevel: 'Medium',
    priorityTier: 'P3 (Medium)',
    isTruncated: false,
    isBookmarked: false,
    suggestedPageType: 'Transit & Proximity Guide',
    suggestedUrlSlug: '/waterfalls-near-nashik-road-railway-station/',
    notes: 'Transit-specific search by travelers arriving at Nashik Road Railway Station looking for closest cascades without traversing the entire city.',
    source: 'Screenshot'
  },
  {
    id: 'wf-kw-11',
    phrase: 'Waterfalls of Nashik',
    volume: 0,
    volumeDisplay: '0',
    keywordDifficulty: 'Unknown',
    intent: 'Informational',
    cluster: 'Waterfalls near Nashik',
    location: 'Nashik',
    relevanceScore: 9.0,
    opportunityScore: 68.0,
    confidenceLevel: 'High',
    priorityTier: 'P3 (Medium)',
    isTruncated: false,
    isBookmarked: false,
    suggestedPageType: 'Secondary Synonym Anchor',
    suggestedUrlSlug: '/waterfalls-of-nashik-scenic-guide/',
    notes: 'Semantic synonym for "waterfalls in Nashik". Great candidate for H2 secondary headings and image alt-text variations.',
    source: 'Screenshot'
  },
  {
    id: 'wf-kw-12',
    phrase: 'Nashik waterfalls name',
    volume: 0,
    volumeDisplay: '0',
    keywordDifficulty: 'Unknown',
    intent: 'Informational',
    cluster: 'Famous waterfalls in Nashik district',
    location: 'Nashik',
    relevanceScore: 8.5,
    opportunityScore: 69.5,
    confidenceLevel: 'High',
    priorityTier: 'P3 (Medium)',
    isTruncated: false,
    isBookmarked: false,
    suggestedPageType: 'Quick Reference Table / FAQ Snippet',
    suggestedUrlSlug: '/names-of-all-waterfalls-in-nashik/',
    notes: 'Entity search: Devotees and travelers seeking exact names: Someshwar, Dugarwadi, Vihigaon (Ashoka), Pahine, Bhavali, Bhandardara.',
    source: 'Screenshot'
  },
  {
    id: 'wf-kw-13',
    phrase: 'How many waterfalls in Nashik',
    volume: 0,
    volumeDisplay: '0',
    keywordDifficulty: 'Unknown',
    intent: 'Informational',
    cluster: 'Famous waterfalls in Nashik district',
    location: 'Nashik',
    relevanceScore: 8.5,
    opportunityScore: 71.0,
    confidenceLevel: 'High',
    priorityTier: 'P2 (High)',
    isTruncated: false,
    isBookmarked: false,
    suggestedPageType: 'FAQ Snippet & Overview',
    suggestedUrlSlug: '/how-many-waterfalls-in-nashik-faq/',
    notes: 'Zero stated volume is a classic long-tail artifact. Prime candidate for winning Google Featured Snippet and People Also Ask (PAA) box.',
    source: 'Screenshot'
  },
  {
    id: 'wf-kw-14',
    phrase: 'Hidden waterfalls in Nashik',
    volume: 0,
    volumeDisplay: '0',
    keywordDifficulty: 'Unknown',
    intent: 'Informational',
    cluster: 'Hidden waterfalls near Nashik',
    location: 'Nashik District / Ghats',
    relevanceScore: 9.5,
    opportunityScore: 84.0,
    confidenceLevel: 'High',
    priorityTier: 'P1 (Critical)',
    isTruncated: false,
    isBookmarked: true,
    suggestedPageType: 'Adventure Travel / Offbeat Guide',
    suggestedUrlSlug: '/hidden-secret-waterfalls-near-nashik/',
    notes: 'High viral intent. Uncrowded spots like Pahine secret streams, Deori waterfalls, and hidden Igatpuri cascades that appeal to backpackers and photographers.',
    source: 'Screenshot'
  }
];

export const WATERFALL_CLUSTERS: ClusterInfo[] = [
  {
    id: 'wf-cl-1',
    name: 'Waterfalls near Nashik',
    description: 'The master head cluster capturing tourists looking for scenic cascades within 10 to 60 km of Nashik city center.',
    primaryKeyword: 'Waterfall near Nashik',
    supportingKeywords: ['Best waterfalls near Nashik', 'Waterfalls of Nashik', 'Waterfalls near me Nashik', 'Weekend waterfalls near Nashik'],
    searchIntent: 'Commercial Investigation',
    existingVolume: 730,
    contentType: 'Comprehensive Pillar Page (3,500+ words)',
    recommendedPriority: 'P1 (Critical)',
    suggestedInternalLinks: ['/someshwar-dudhsagar-waterfall-nashik-guide/', '/dugarwadi-waterfall-how-to-reach-guide/', '/best-monsoon-waterfalls-near-nashik/'],
    strategicRole: 'Anchor Pillar Page. Ranks for high-volume commercial queries and distributes link equity across individual waterfall deep dives.'
  },
  {
    id: 'wf-cl-2',
    name: 'Famous waterfalls in Nashik district',
    description: 'Broad exploratory list queries seeking verified names, locations, and rankings of the most renowned waterfalls.',
    primaryKeyword: 'Nashik waterfall list',
    supportingKeywords: ['Waterfalls in Nashik district', 'Nashik waterfalls name', 'How many waterfalls in Nashik', 'Top waterfalls in Nashik'],
    searchIntent: 'Informational',
    existingVolume: 270,
    contentType: 'Ranked Top 10 Listicle with Distance Matrix',
    recommendedPriority: 'P1 (Critical)',
    suggestedInternalLinks: ['/best-waterfalls-near-nashik-travel-guide/', '/hidden-secret-waterfalls-near-nashik/'],
    strategicRole: 'Top-of-Funnel Listicle. Captures users who are still discovering options and routes them into dedicated destination pages.'
  },
  {
    id: 'wf-cl-3',
    name: 'Hidden waterfalls near Nashik',
    description: 'Offbeat, secluded, and lesser-known cascades away from heavy tourist commercialization and crowded picnic buses.',
    primaryKeyword: 'Hidden waterfalls in Nashik',
    supportingKeywords: ['Secret waterfalls near Nashik', 'Offbeat waterfalls Igatpuri', 'Uncrowded monsoon waterfalls Nashik'],
    searchIntent: 'Informational',
    existingVolume: 0,
    contentType: 'Adventure Discovery Feature with GPS Coordinates',
    recommendedPriority: 'P1 (Critical)',
    suggestedInternalLinks: ['/waterfall-treks-near-nashik-adventure/', '/best-monsoon-waterfalls-near-nashik/'],
    strategicRole: 'Social & Backlink Magnet. High shareability among travel influencers, trekking clubs, and weekend driving enthusiasts.'
  },
  {
    id: 'wf-cl-4',
    name: 'Monsoon waterfalls',
    description: 'Peak season content capturing monsoon tourists when Western Ghats cascades are in their fullest, thunderous glory.',
    primaryKeyword: 'Best monsoon waterfalls near Nashik',
    supportingKeywords: ['Monsoon waterfalls Maharashtra', 'Nashik waterfalls in July August', 'Rainy season waterfalls near Nashik'],
    searchIntent: 'Commercial Investigation',
    existingVolume: 0,
    contentType: 'Seasonal Travel Guide with Safety Advisories',
    recommendedPriority: 'P1 (Critical)',
    suggestedInternalLinks: ['/best-waterfalls-near-nashik-travel-guide/', '/reverse-waterfall-near-nashik-monsoon-guide/'],
    strategicRole: 'Seasonal Traffic Surge. Generates 80% of annual niche traffic between late June and late September.'
  },
  {
    id: 'wf-cl-5',
    name: 'Summer waterfall destinations',
    description: 'Critical search query addressing dry season realities and highlighting the few perennial dam overflow spots.',
    primaryKeyword: 'Summer waterfall near Nashik',
    supportingKeywords: ['Waterfalls in Nashik in April May', 'Perennial waterfalls near Nashik', 'Bhandardara waterfalls summer'],
    searchIntent: 'Informational',
    existingVolume: 40,
    contentType: 'Realistic Guide & Perennial Reservoir Guide',
    recommendedPriority: 'P2 (High)',
    suggestedInternalLinks: ['/someshwar-dudhsagar-waterfall-nashik-guide/', '/nashik-waterfall-road-trip-routes-stops/'],
    strategicRole: 'E-E-A-T Trust Builder. Prevents user disappointment by truthfully explaining which falls dry up versus which river spots remain flowing.'
  },
  {
    id: 'wf-cl-6',
    name: 'Reverse waterfalls near Nashik',
    description: 'High-curiosity search term capturing the natural aerodynamic phenomenon where strong gale-force valley winds blow waterfall streams upward.',
    primaryKeyword: 'Reverse waterfall near Nashik',
    supportingKeywords: ['Reverse waterfall Maharashtra', 'Anjaneri reverse waterfall', 'Naneghat reverse waterfall distance from Nashik'],
    searchIntent: 'Informational',
    existingVolume: 10,
    contentType: 'Phenomenon Explanation & Trekking Guide',
    recommendedPriority: 'P2 (High)',
    suggestedInternalLinks: ['/waterfall-treks-near-nashik-adventure/', '/best-monsoon-waterfalls-near-nashik/'],
    strategicRole: 'Viral & Curiosity Driver. Highly engaging visual content that attracts curious road trippers during heavy monsoon squalls.'
  },
  {
    id: 'wf-cl-7',
    name: 'Waterfall trekking and adventure',
    description: 'Combines hiking through Sahyadri forested trails, rock-cut steps, and river stream crossings with waterfall rewards.',
    primaryKeyword: 'Waterfall treks near Nashik',
    supportingKeywords: ['Dugarwadi waterfall trek route', 'Vihigaon waterfall rappelling', 'Monsoon trekking in Nashik district'],
    searchIntent: 'Informational',
    existingVolume: 0,
    contentType: 'Adventure Trekking & Route Guide with Difficulty Ratings',
    recommendedPriority: 'P2 (High)',
    suggestedInternalLinks: ['/dugarwadi-waterfall-how-to-reach-guide/', '/hidden-secret-waterfalls-near-nashik/'],
    strategicRole: 'Adventure Tourism Positioning. Attracts active hikers and adventure operators offering waterfall rappelling and guided trails.'
  },
  {
    id: 'wf-cl-8',
    name: 'Family-friendly waterfall trips',
    description: 'Safe, easily accessible waterfalls with shallow pools, paved stairways, nearby facilities, and zero treacherous cliff drops.',
    primaryKeyword: 'Safe waterfalls near Nashik for family',
    supportingKeywords: ['Family friendly waterfalls near Nashik', 'Someshwar waterfall for kids', 'Waterfalls near Nashik with car parking'],
    searchIntent: 'Commercial Investigation',
    existingVolume: 0,
    contentType: 'Family Travel Safety Guide with Facilities Checklist',
    recommendedPriority: 'P2 (High)',
    suggestedInternalLinks: ['/someshwar-dudhsagar-waterfall-nashik-guide/', '/waterfalls-near-nashik-for-one-day-trip/'],
    strategicRole: 'High-Conversion Intent. Appeals to families with elderly parents or small children seeking safe weekend outings.'
  },
  {
    id: 'wf-cl-9',
    name: 'Waterfall road trips and transportation',
    description: 'Detailed driving routes, scenic state highways, bike routes, public bus connections, and rental taxi logistics.',
    primaryKeyword: 'Nashik waterfall road trip routes',
    supportingKeywords: ['Waterfall near Nashik road', 'How to reach Dugarwadi by car', 'Bike trip to Igatpuri waterfalls from Nashik'],
    searchIntent: 'Commercial Investigation',
    existingVolume: 10,
    contentType: 'Turn-by-Turn Driving Route & Pitstop Guide',
    recommendedPriority: 'P2 (High)',
    suggestedInternalLinks: ['/best-waterfalls-near-nashik-travel-guide/', '/waterfalls-near-nashik-for-one-day-trip/'],
    strategicRole: 'Practical Utility. Directly answers transit queries from travelers arriving by train or car.'
  },
  {
    id: 'wf-cl-10',
    name: 'Waterfall itineraries and nearby attractions',
    description: 'Full-day and weekend plans pairing waterfall visits with Nashik’s vineyards, temples, and historic forts.',
    primaryKeyword: 'Waterfall Nashik tourist places',
    supportingKeywords: ['Nashik one day waterfall itinerary', 'Waterfalls and vineyards Nashik weekend trip', 'Trimbakeshwar and Dugarwadi combined plan'],
    searchIntent: 'Commercial Investigation',
    existingVolume: 260,
    contentType: 'Structured Day & Weekend Itineraries',
    recommendedPriority: 'P1 (Critical)',
    suggestedInternalLinks: ['/best-waterfalls-near-nashik-travel-guide/', '/someshwar-dudhsagar-waterfall-nashik-guide/'],
    strategicRole: 'Core Travel Planner. Keeps readers on-site by showing how waterfalls fit into wider Nashik sightseeing.'
  },
  {
    id: 'wf-cl-11',
    name: 'Out of Scope / Irrelevant Geo',
    description: 'Irrelevant geographic keyword spillover (e.g. Chennai, Hosur, Tamil Nadu) filtered out from Nashik campaigns to prevent topic dilution.',
    primaryKeyword: 'Near Chennai waterfalls',
    supportingKeywords: ['Chennai waterfalls list', 'Waterfalls near Hosur'],
    searchIntent: 'Local / Near Me',
    existingVolume: 3600,
    contentType: 'Negative / Discarded Keywords',
    recommendedPriority: 'Excluded (Out of Scope)',
    suggestedInternalLinks: [],
    strategicRole: 'Negative Geo-Filter. Demonstrates professional SEO rigor by excluding high-volume non-local keywords that would dilute local domain authority.',
    isGeoExcluded: true
  }
];

export const NASHIK_WATERFALL_CONTENT_PLAN: WaterfallContentPlanArticle[] = [
  {
    id: 'plan-1',
    orderNumber: 1,
    title: 'Best Waterfalls Near Nashik: A Complete Travel Guide',
    primaryKeyword: 'Waterfall near Nashik',
    supportingKeywords: ['Best waterfalls near Nashik', 'Waterfalls of Nashik', 'Scenic waterfalls Maharashtra'],
    searchIntent: 'Commercial Investigation',
    suggestedUrlSlug: '/best-waterfalls-near-nashik-travel-guide/',
    metaDescription: 'Discover the most breathtaking waterfalls near Nashik. From thunderous Dugarwadi to family-friendly Someshwar, explore distances, best season, and route maps.',
    format: 'Complete destination guide',
    cluster: 'Waterfalls near Nashik',
    priority: 'P1 (Critical)',
    outline: [
      'The Magic of Monsoon in the Northern Western Ghats',
      'At a Glance: Distance Matrix & Quick Comparison Table',
      'Top 7 Must-Visit Waterfalls Around Nashik',
      'Best Time to Plan Your Waterfall Trip: Month-by-Month Breakdown',
      'Essential Safety Rules & Packing Checklist for Monsoon Travelers'
    ],
    recommendedInternalLinks: [
      '/famous-waterfalls-in-nashik-district-list/',
      '/dugarwadi-waterfall-how-to-reach-guide/',
      '/someshwar-dudhsagar-waterfall-nashik-guide/'
    ],
    status: 'Ready to Publish'
  },
  {
    id: 'plan-2',
    orderNumber: 2,
    title: 'Famous Waterfalls in Nashik District: Ranked with Distances & Maps',
    primaryKeyword: 'Nashik waterfall list',
    supportingKeywords: ['Waterfalls in Nashik district', 'Nashik waterfalls name', 'Famous waterfalls Maharashtra'],
    searchIntent: 'Informational',
    suggestedUrlSlug: '/famous-waterfalls-in-nashik-district-list/',
    metaDescription: 'The definitive list of waterfalls in Nashik district. Compare Dugarwadi, Someshwar, Vihigaon, Pahine, and Randha falls with verified travel times and locations.',
    format: 'Top 10 listicle',
    cluster: 'Famous waterfalls in Nashik district',
    priority: 'P1 (Critical)',
    outline: [
      'Comprehensive Directory of All Major Nashik District Falls',
      '1. Someshwar (Dudhsagar) Falls: The Urban Riverside Cascade',
      '2. Dugarwadi Waterfall: The Roaring Trimbakeshwar Canyon',
      '3. Vihigaon (Ashoka) Falls: The Movie-Famous Igatpuri Cascade',
      '4. Pahine Waterfalls: The Verdant Trimbak-Ghoti Roadside Haven',
      '5. Bhandardara (Randha & Umbrella) Falls: The Giant Pravara River Drop',
      'Summary Table: Best For Families vs Trekkers'
    ],
    recommendedInternalLinks: [
      '/best-waterfalls-near-nashik-travel-guide/',
      '/dugarwadi-waterfall-how-to-reach-guide/'
    ],
    status: 'Ready to Publish'
  },
  {
    id: 'plan-3',
    orderNumber: 3,
    title: 'Dugarwadi Waterfall: How to Reach, Best Time to Visit and Travel Tips',
    primaryKeyword: 'How to reach Dugarwadi Waterfall from Nashik city',
    supportingKeywords: ['Dugarwadi waterfall distance from Nashik', 'Dugarwadi waterfall trek', 'Dugarwadi safety tips'],
    searchIntent: 'Informational',
    suggestedUrlSlug: '/dugarwadi-waterfall-how-to-reach-guide/',
    metaDescription: 'Complete visitor guide to Dugarwadi Waterfall near Trimbakeshwar. Learn exact driving directions, 20-minute gorge hike details, safety warnings, and timings.',
    format: 'How-to travel guide',
    cluster: 'Waterfall trekking and adventure',
    priority: 'P1 (Critical)',
    outline: [
      'Why Dugarwadi is Nashik’s Most Spectacular & Intimidating Waterfall',
      'Exact Driving Directions from Nashik Central (via Trimbak-Jawhar Road)',
      'The Hike Down the Valley: Trail Conditions, Slippery Basalt & Steps',
      'Crucial Safety Warning: Flash Floods, Strong Whirlpools & Deep Currents',
      'What to Eat Nearby: Authentic Misal Pav & Village Pithla Bhakri'
    ],
    recommendedInternalLinks: [
      '/best-waterfalls-near-nashik-travel-guide/',
      '/waterfall-treks-near-nashik-adventure/'
    ],
    status: 'Ready to Publish'
  },
  {
    id: 'plan-4',
    orderNumber: 4,
    title: 'Reverse Waterfall Near Nashik: What Makes It Special & Where to Find It',
    primaryKeyword: 'Reverse waterfall near Nashik',
    supportingKeywords: ['Reverse waterfall Maharashtra', 'Anjaneri reverse waterfall', 'Monsoon reverse waterfall phenomenon'],
    searchIntent: 'Informational',
    suggestedUrlSlug: '/reverse-waterfall-near-nashik-monsoon-guide/',
    metaDescription: 'Where does water fly upward into the sky? Discover the reverse waterfall phenomenon near Nashik at Anjaneri hills and Samrad valley during peak monsoon.',
    format: 'Monsoon travel guide',
    cluster: 'Reverse waterfalls near Nashik',
    priority: 'P2 (High)',
    outline: [
      'The Science Behind the Spectacle: Aerodynamic Updrafts in Western Ghats',
      'Top Locations to Witness the Reverse Waterfall Around Nashik (Anjaneri & Samrad)',
      'Best Weather Conditions: When Strong Winds Align with Heavy Downpours',
      'Photography & Video Tips: Capturing Water Flying Upward',
      'Trek Route Details and Windbreaker Recommendations'
    ],
    recommendedInternalLinks: [
      '/best-monsoon-waterfalls-near-nashik/',
      '/waterfall-treks-near-nashik-adventure/'
    ],
    status: 'Planned'
  },
  {
    id: 'plan-5',
    orderNumber: 5,
    title: 'Best Monsoon Waterfalls Near Nashik: When to Visit & Safety Guide',
    primaryKeyword: 'Best monsoon waterfalls near Nashik',
    supportingKeywords: ['Monsoon waterfall trips Nashik', 'Nashik waterfalls in July August', 'Rainy season waterfalls Maharashtra'],
    searchIntent: 'Commercial Investigation',
    suggestedUrlSlug: '/best-monsoon-waterfalls-near-nashik/',
    metaDescription: 'Plan your ultimate rainy season road trip. Discover the best monsoon waterfalls near Nashik with month-by-month water levels, safety guidelines, and scenic pit stops.',
    format: 'Monsoon travel guide',
    cluster: 'Monsoon waterfalls',
    priority: 'P1 (Critical)',
    outline: [
      'The Transformation of the Sahyadris: July to September Peak Flow',
      'Top 5 Thunderous Monsoon Spots: Dugarwadi, Pahine, Vihigaon & Bhandardara',
      'Road Conditions During Heavy Rains: Fog, Ghat Curves & Landslide Alerts',
      'Essential Monsoon Gear: Waterproof Backpacks, Grip Shoes & Dry Bags',
      'Hot Bhutta & Steaming Chai: Best Highway Monsoon Food Stalls'
    ],
    recommendedInternalLinks: [
      '/best-waterfalls-near-nashik-travel-guide/',
      '/nashik-waterfall-road-trip-routes-stops/'
    ],
    status: 'Planned'
  },
  {
    id: 'plan-6',
    orderNumber: 6,
    title: 'Waterfall Treks Near Nashik for Adventure Lovers: Routes & Difficulty',
    primaryKeyword: 'Waterfall treks near Nashik',
    supportingKeywords: ['Monsoon waterfall trekking Maharashtra', 'Dugarwadi trek route', 'Vihigaon waterfall rappelling Nashik'],
    searchIntent: 'Informational',
    suggestedUrlSlug: '/waterfall-treks-near-nashik-adventure/',
    metaDescription: 'Hike through misty forests and gushing streams. The top 5 waterfall treks in and around Nashik district with trail maps, difficulty grades, and gear advice.',
    format: 'Trekking guide',
    cluster: 'Waterfall trekking and adventure',
    priority: 'P2 (High)',
    outline: [
      'Trail Ratings: Easy Nature Walks vs Challenging River Gorges',
      '1. Dugarwadi Valley Hike (Moderate, 45 mins descent through forest)',
      '2. Vihigaon Forest Stream Crossing (Easy to Moderate, Adventure Rappelling)',
      '3. Pahine Village Ridge Trails (Easy nature walks among wildflowers)',
      '4. Harihar Fort Base Stream Treks (Moderate hiking along boulder paths)',
      'Safety Protocols: Crossing Fast-Moving Currents & Avoiding Wet Moss Basalt'
    ],
    recommendedInternalLinks: [
      '/dugarwadi-waterfall-how-to-reach-guide/',
      '/hidden-secret-waterfalls-near-nashik/'
    ],
    status: 'Planned'
  },
  {
    id: 'plan-7',
    orderNumber: 7,
    title: 'Hidden Waterfalls Near Nashik Worth Exploring: Secret Spots Away from Crowds',
    primaryKeyword: 'Hidden waterfalls in Nashik',
    supportingKeywords: ['Secret waterfalls near Nashik', 'Offbeat waterfalls Igatpuri', 'Uncrowded waterfall spots Maharashtra'],
    searchIntent: 'Informational',
    suggestedUrlSlug: '/hidden-secret-waterfalls-near-nashik/',
    metaDescription: 'Escape the tourist rush. Discover 5 secret, offbeat waterfalls tucked inside deep Sahyadri valleys around Trimbakeshwar and Igatpuri with accurate trail notes.',
    format: 'Complete destination guide',
    cluster: 'Hidden waterfalls near Nashik',
    priority: 'P1 (Critical)',
    outline: [
      'Why Crowded Spots Ruin the Experience: The Joys of Offbeat Discovery',
      '1. Pahine Deep Valley Cascades: Tucked Behind Agricultural Meadows',
      '2. Deori Waterfall near Igatpuri: A Secluded Jungle Pool',
      '3. Upper Vaitarna Catchment Streams: Quiet Lakeside Forest Brooks',
      'Leave No Trace Ethics: Keeping Pristine Forest Cascades Plastic-Free',
      'GPS Coordinates and Local Villager Guide Recommendations'
    ],
    recommendedInternalLinks: [
      '/best-waterfalls-near-nashik-travel-guide/',
      '/waterfalls-near-nashik-for-one-day-trip/'
    ],
    status: 'Planned'
  },
  {
    id: 'plan-8',
    orderNumber: 8,
    title: 'Waterfalls Near Nashik for a One-Day Trip: Easy Weekend Escapes',
    primaryKeyword: 'Waterfalls near Nashik for a one-day trip',
    supportingKeywords: ['One day waterfall trip from Nashik', 'Day trip waterfalls from Mumbai Pune', 'Quick waterfall picnic spots Nashik'],
    searchIntent: 'Commercial Investigation',
    suggestedUrlSlug: '/waterfalls-near-nashik-for-one-day-trip/',
    metaDescription: 'Short on time? Here are the best waterfalls near Nashik reachable in under 1 hour from the city. Perfect for families, couples, and day-trippers.',
    format: 'One-day itinerary',
    cluster: 'Family-friendly waterfall trips',
    priority: 'P2 (High)',
    outline: [
      'The 1-Day Waterfall Blueprint: Start at 8 AM, Return by 6 PM',
      'Option A: The Gangapur-Someshwar Wine & Waterfall Day Out',
      'Option B: The Trimbakeshwar-Dugarwadi Sacred Nature Day Out',
      'Where to Stop for Breakfast: Famous Nashik Misal Joint Recommendations',
      'Timing Your Return to Avoid Weekend Highway Toll Traffic'
    ],
    recommendedInternalLinks: [
      '/someshwar-dudhsagar-waterfall-nashik-guide/',
      '/nashik-waterfalls-and-tourist-places-itinerary/'
    ],
    status: 'Planned'
  },
  {
    id: 'plan-9',
    orderNumber: 9,
    title: 'Summer Waterfall Destinations Near Nashik: What to Expect & Alternatives',
    primaryKeyword: 'Summer waterfall near Nashik',
    supportingKeywords: ['Waterfalls in Nashik in summer', 'Perennial waterfalls Maharashtra', 'Nashik summer travel destinations'],
    searchIntent: 'Informational',
    suggestedUrlSlug: '/summer-waterfall-destinations-near-nashik/',
    metaDescription: 'Do waterfalls flow in Nashik during summer? Read our honest seasonal guide on dry waterfalls, reservoir backwaters, and where to cool off from March to May.',
    format: 'How-to travel guide',
    cluster: 'Summer waterfall destinations',
    priority: 'P2 (High)',
    outline: [
      'The Harsh Reality: Why Most Sahyadri Falls Are Completely Bone-Dry by April',
      'Perennial Water Exceptions: Someshwar (Godavari Dam Regulated Flow)',
      'Alternative Cool Escapes: Gangapur Dam Backwaters & Igatpuri Lake Resorts',
      'Summer Vineyard Tours & Water Parks as Family Alternatives',
      'Planning Ahead for the Upcoming Monsoon Season: When Do Falls Start Flowing?'
    ],
    recommendedInternalLinks: [
      '/best-waterfalls-near-nashik-travel-guide/',
      '/someshwar-dudhsagar-waterfall-nashik-guide/'
    ],
    status: 'Planned'
  },
  {
    id: 'plan-10',
    orderNumber: 10,
    title: 'Nashik Waterfall Road Trip: Scenic Routes, Pitstops and Driving Maps',
    primaryKeyword: 'Nashik waterfall road trip routes and stops',
    supportingKeywords: ['Waterfall near Nashik road', 'Nashik to Dugarwadi driving route', 'Scenic drives Nashik waterfalls'],
    searchIntent: 'Commercial Investigation',
    suggestedUrlSlug: '/nashik-waterfall-road-trip-routes-stops/',
    metaDescription: 'Take the scenic wheel. Discover the two most picturesque driving routes around Nashik connecting waterfalls, misty ghats, dhabas, and viewpoint stops.',
    format: 'Weekend itinerary',
    cluster: 'Waterfall road trips and transportation',
    priority: 'P2 (High)',
    outline: [
      'Route 1: The Trimbak - Dugarwadi - Jawhar Ghat Circuit (45 km)',
      'Route 2: The Gangapur - Someshwar - Vaitarna Loop (60 km)',
      'Vehicle Preparation: Tires, Wipers, and Brakes for Wet Mountain Ghats',
      'Best Highway Dhabas for Pithla Bhakri, Thecha & Sweet Corn',
      'Downloadable Offline Google Map Route Links'
    ],
    recommendedInternalLinks: [
      '/best-waterfalls-near-nashik-travel-guide/',
      '/dugarwadi-waterfall-how-to-reach-guide/'
    ],
    status: 'Planned'
  }
];

export const LOCAL_DESTINATION_FACTS: Record<string, LocalTravelFacts> = {
  'Someshwar (Dudhsagar) Waterfall': {
    destinationName: 'Someshwar (Dudhsagar) Waterfall',
    geographicLocation: 'Gangapur Road, Near Someshwar Temple, Nashik',
    distanceFromNashikCity: '8.5 km from CBS / City Center',
    estimatedTravelTime: '20 to 25 minutes by car or auto-rickshaw',
    bestSeason: 'July to October (Monsoon and post-monsoon peak flow)',
    accessRouteInfo: 'Directly accessible via paved Gangapur Road. Parking available near Someshwar Mahadev Temple; short 3-minute paved walk to river railing.',
    entryFee: 'Free entry for all visitors',
    openingHours: '6:00 AM – 7:00 PM daily (Well lit during daylight hours)',
    safetyConsiderations: [
      'Do not venture past safety barriers or attempt swimming in the deep Godavari churning pool.',
      'Basalt rock edges get slippery with algae during continuous rain.',
      'Suitable for elderly family members and children from the fenced observation deck.'
    ],
    nearbyAttractions: [
      'Ancient Someshwar Mahadev Temple (200 meters)',
      'Balaji Temple, Gangapur (1 km)',
      'Sula Vineyards & York Winery (6 km further along Gangapur Road)'
    ],
    lastVerifiedDate: 'October 2026',
    status: 'Verified'
  },
  'Dugarwadi Waterfall': {
    destinationName: 'Dugarwadi Waterfall',
    geographicLocation: 'Near Sapgaon village, Trimbakeshwar - Jawhar Road, Nashik District',
    distanceFromNashikCity: '36 km west of Nashik city (8 km past Trimbakeshwar)',
    estimatedTravelTime: '55 minutes to 1 hour 15 minutes by private vehicle',
    bestSeason: 'July to September for thunderous cascades; early October for clear skies',
    accessRouteInfo: 'Drive along Trimbak-Jawhar Road (NH-848), turn onto Sapgaon village road. Park vehicle at plateau parking, followed by a 1.5 km (~25-minute) moderate forest trail descent into the valley gorge.',
    entryFee: 'Nominal village parking fee (~₹30 for bikes, ₹60 for cars); No official entry ticket (Needs verification)',
    openingHours: 'Daylight hours only (7:00 AM – 5:30 PM). Forest department closes entry before dusk.',
    safetyConsiderations: [
      'STRICT SAFETY WARNING: Never attempt swimming near the base pool. Multiple fatal whirlpool accidents have occurred due to underwater pressure.',
      'Flash floods can trap visitors in the gorge within minutes during heavy cloudbursts in the hills.',
      'Mobile network connectivity (Jio, Airtel) drops significantly in the deep gorge.',
      'Wear sturdy trekking shoes with aggressive tread; avoid flip-flops.'
    ],
    nearbyAttractions: [
      'Trimbakeshwar Shiva Jyotirlinga Temple (8 km)',
      'Brahmagiri Mountain Trek & Godavari Origin (9 km)',
      'Anjaneri Hills (16 km)'
    ],
    lastVerifiedDate: 'October 2026',
    status: 'Verified'
  },
  'Vihigaon (Ashoka) Waterfall': {
    destinationName: 'Vihigaon (Ashoka) Waterfall',
    geographicLocation: 'Vihigaon village, Near Kasara / Igatpuri, Nashik-Thane border',
    distanceFromNashikCity: '58 km via NH-160 (Mumbai-Nashik Expressway)',
    estimatedTravelTime: '1 hour 20 minutes from Nashik; 2.5 hours from Mumbai',
    bestSeason: 'July to October (Popular adventure rappelling season)',
    accessRouteInfo: 'Take Mumbai-Nashik Expressway to Kasara, turn toward Jawhar route to Vihigaon village. Short 10-minute walk down muddy village steps.',
    entryFee: '₹20-₹30 village maintenance fee (Needs verification)',
    openingHours: '7:00 AM – 6:00 PM',
    safetyConsiderations: [
      'Adventure operators run certified waterfall rappelling during weekends; always use certified harness gear.',
      'Natural pool is deep in the center; wear life jackets if entering water.',
      'Heavy crowds on monsoon weekends.'
    ],
    nearbyAttractions: [
      'Igatpuri hill station & fog viewpoints (14 km)',
      'Bhavali Dam backwaters (18 km)',
      'Tringalwadi Fort (22 km)'
    ],
    lastVerifiedDate: 'October 2026',
    status: 'Verified'
  },
  'Pahine Waterfalls & Valley': {
    destinationName: 'Pahine Waterfalls & Valley',
    geographicLocation: 'Trimbakeshwar - Ghoti Road, Nashik District',
    distanceFromNashikCity: '32 km from Nashik CBS',
    estimatedTravelTime: '45 to 55 minutes drive',
    bestSeason: 'July to September (Lush green wildflower blooming season)',
    accessRouteInfo: 'Scenic drive along Trimbak-Ghoti bypass. Waterfalls cascade directly adjacent to the mountain road and roadside meadows.',
    entryFee: 'Free roadside access',
    openingHours: 'Open 24/7 (Recommended 7:00 AM – 6:00 PM for road safety)',
    safetyConsiderations: [
      'Narrow mountain road with dense monsoon fog; drive with low-beam fog lights.',
      'Avoid parking on sharp blind hairpin bends.',
      'Safe shallow roadside streams for dipping feet, but avoid climbing wet mossy ledges.'
    ],
    nearbyAttractions: [
      'Trimbakeshwar Temple (12 km)',
      'Anjaneri Hills (20 km)',
      'Dugarwadi Waterfall (18 km via Trimbak connect)'
    ],
    lastVerifiedDate: 'October 2026',
    status: 'Verified'
  }
};

export const LOCAL_TRAVEL_FACTS = LOCAL_DESTINATION_FACTS;
