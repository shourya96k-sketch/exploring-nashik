export type Category = 
  | 'All'
  | 'Heritage & Spiritual'
  | 'Wine & Leisure'
  | 'Adventure & Treks'
  | 'Ancient Caves & History'
  | 'Nature & Escapes';

export interface ArticleSection {
  id: string;
  heading: string;
  content: string[]; // Multiple paragraphs
  quote?: string;
  image?: {
    url: string;
    caption: string;
  };
}

export interface PracticalInfo {
  bestTime: string;
  timings: string;
  entryFee: string;
  recommendedDuration: string;
  distanceFromCBS: string; // Central Bus Stand Nashik
  nearestRailwayStation: string;
  difficultyOrVibe: string;
  dressCodeOrRequirement?: string;
  recommendedEatsNearby: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: Category;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedDate: string;
  readTime: string;
  featured?: boolean;
  excerpt: string;
  introduction: string;
  sections: ArticleSection[];
  conclusion: string;
  practicalInfo: PracticalInfo;
  highlights: string[];
  tags: string[];
}

export interface UserComment {
  id: string;
  articleId: string;
  author: string;
  city: string;
  text: string;
  createdAt: string;
  rating?: number;
}

export interface ItineraryDay {
  dayNumber: number;
  dayTitle: string;
  description: string;
  spots: {
    time: string;
    spotTitle: string;
    articleId?: string;
    activity: string;
    tip: string;
  }[];
}

export interface Itinerary {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  idealFor: string;
  days: ItineraryDay[];
}
