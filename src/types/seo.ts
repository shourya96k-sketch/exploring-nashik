export type SearchIntent = 
  | 'Informational'
  | 'Navigational'
  | 'Commercial Investigation'
  | 'Transactional'
  | 'Local / Near Me'
  | 'Comparison / Educational'
  | string;

export type PriorityTier = 
  | 'P1 (Critical)' 
  | 'P2 (High)' 
  | 'P3 (Medium)' 
  | 'P4 (Low)' 
  | 'P4 (Long-term)' 
  | 'Excluded (Out of Scope)'
  | string;

export type WaterfallCluster =
  | 'Waterfalls near Nashik'
  | 'Famous waterfalls in Nashik district'
  | 'Hidden waterfalls near Nashik'
  | 'Monsoon waterfalls'
  | 'Summer waterfall destinations'
  | 'Reverse waterfalls near Nashik'
  | 'Waterfall trekking and adventure'
  | 'Family-friendly waterfall trips'
  | 'Waterfall road trips and transportation'
  | 'Waterfall itineraries and nearby attractions'
  | 'Out of Scope / Irrelevant Geo'
  | string;

export type ClusterCategory = string;

export type ArticleFormat =
  | 'Complete destination guide'
  | 'Top 10 listicle'
  | 'How-to travel guide'
  | 'Monsoon travel guide'
  | 'Trekking guide'
  | 'Family travel guide'
  | 'One-day itinerary'
  | 'Weekend itinerary'
  | 'Comparison article'
  | 'Frequently asked questions'
  | string;

export interface KeywordItem {
  id: string;
  phrase: string;
  volume: number;
  volumeDisplay?: string;
  volumeRawDisplay?: string;
  keywordDifficulty?: number | 'Unknown' | string;
  intent: SearchIntent;
  cluster: WaterfallCluster;
  location?: 'Nashik' | 'Nashik District / Ghats' | 'Maharashtra' | 'Irrelevant (Chennai/Other)' | string;
  relevanceScore: number;
  opportunityScore: number;
  rankingFeasibility?: number;
  priorityScore?: number;
  confidenceLevel?: 'High' | 'Medium' | 'Low' | string;
  priorityTier: PriorityTier;
  isTruncated: boolean;
  isBookmarked?: boolean;
  suggestedPageType: string;
  suggestedUrlSlug: string;
  notes: string;
  source: 'Screenshot' | 'Manual' | 'CSV Upload' | 'AI OCR' | 'User Added' | string;
}

export interface ClusterInfo {
  id: string;
  name: WaterfallCluster;
  description: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  searchIntent: SearchIntent;
  existingVolume: number;
  contentType: string;
  recommendedPriority: PriorityTier;
  suggestedInternalLinks: string[];
  strategicRole: string;
  isGeoExcluded?: boolean;
}

export interface KeywordCluster {
  id?: string;
  name?: string;
  description?: string;
  role?: string;
  targetKeywords?: string[];
  searchIntent?: string;
  totalSearchVolume?: number;
  targetFormat?: string;
  suggestedUrl?: string;
  strategicNote?: string;
  [key: string]: any;
}

export interface ContentCalendarEntry {
  day?: number;
  week?: number;
  title?: string;
  cluster?: string;
  primaryKeyword?: string;
  format?: string;
  targetUrl?: string;
  metaSummary?: string;
  status?: string;
  [key: string]: any;
}

export interface ContentBrief {
  id?: string;
  title?: string;
  format?: string;
  cluster?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  searchIntent?: string;
  targetAudience?: string;
  targetWordCount?: string;
  recommendedWordCount?: string;
  suggestedUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  outline?: any[];
  faqs?: any[];
  internalLinks?: any[];
  imageAltDirectives?: any[];
  contentIntegrityRules?: string[];
  [key: string]: any;
}

export interface SeoStrategyDeliverable {
  title?: string;
  executiveSummary?: string;
  pillars?: any[];
  competitorSerpAnalysis?: any;
  [key: string]: any;
}

export interface LocalTravelFacts {
  destinationName: string;
  geographicLocation: string;
  distanceFromNashikCity: string;
  estimatedTravelTime: string;
  bestSeason: string;
  accessRouteInfo: string;
  entryFee: string;
  openingHours: string;
  safetyConsiderations: string[];
  nearbyAttractions: string[];
  lastVerifiedDate: string;
  status: 'Verified' | 'Needs verification';
}

export interface GeneratedArticle {
  id: string;
  primaryKeyword: string;
  topic: string;
  format: ArticleFormat;
  seoTitle: string;
  metaDescription: string;
  urlSlug: string;
  h1: string;
  introduction: string;
  headingsOutline: {
    heading: string;
    subheadings?: string[];
  }[];
  contentSections: {
    heading: string;
    body: string[];
  }[];
  travelFacts: LocalTravelFacts;
  faqs: {
    question: string;
    answer: string;
  }[];
  imageSuggestions: {
    placement: string;
    description: string;
    altText: string;
  }[];
  internalLinking: {
    targetArticle: string;
    anchorText: string;
    context: string;
  }[];
  relatedKeywords: string[];
  schemaMarkup: string;
  callToAction: string;
  generatedDate: string;
}

export interface WaterfallContentPlanArticle {
  id: string;
  orderNumber: number;
  title: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  searchIntent: SearchIntent;
  suggestedUrlSlug: string;
  metaDescription: string;
  format: ArticleFormat;
  cluster: WaterfallCluster;
  priority: PriorityTier;
  outline: string[];
  recommendedInternalLinks: string[];
  status: 'Drafted' | 'Ready to Publish' | 'Planned';
}
