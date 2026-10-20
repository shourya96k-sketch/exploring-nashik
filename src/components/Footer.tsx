import React, { useState } from 'react';
import { Compass, Heart, Send, Check } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { Article } from '../types/blog';

interface FooterProps {
  onSelectArticle: (article: Article) => void;
  onOpenItineraries: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectArticle,
  onOpenItineraries,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-rose-700 flex items-center justify-center">
                <Compass className="w-5 h-5 text-amber-100" />
              </div>
              <span className="font-editorial text-2xl font-bold text-white tracking-tight">
                Nashik Wanderlust
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              An independent, meticulously curated digital travel journal honoring the timeless spiritual heritage, scenic Sahyadri heights, and vibrant wine culture of Nashik, Maharashtra.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400 block mb-2">
                Subscribe for Seasonal Deccan Travel Guides
              </span>
              {subscribed ? (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Thank you! You are subscribed to our Nashik travel dispatches.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Join</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* 10 Visiting Spots Column 1 */}
          <div className="space-y-3">
            <h4 className="font-editorial text-sm font-bold text-stone-100 tracking-wider uppercase">
              Visiting Spots (1–5)
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {ARTICLES.slice(0, 5).map((art) => (
                <li key={art.id}>
                  <button
                    onClick={() => {
                      onSelectArticle(art);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 text-left transition-colors cursor-pointer"
                  >
                    {art.title.split(':')[0]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 10 Visiting Spots Column 2 */}
          <div className="space-y-3">
            <h4 className="font-editorial text-sm font-bold text-stone-100 tracking-wider uppercase">
              Visiting Spots (6–10)
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {ARTICLES.slice(5, 10).map((art) => (
                <li key={art.id}>
                  <button
                    onClick={() => {
                      onSelectArticle(art);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 text-left transition-colors cursor-pointer"
                  >
                    {art.title.split(':')[0]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Travel Resources */}
          <div className="space-y-3">
            <h4 className="font-editorial text-sm font-bold text-stone-100 tracking-wider uppercase">
              Planning Tools
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={onOpenItineraries}
                  className="hover:text-amber-300 text-left transition-colors cursor-pointer"
                >
                  1-Day Heritage Express
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenItineraries}
                  className="hover:text-amber-300 text-left transition-colors cursor-pointer"
                >
                  2-Day Wine & Trek Escape
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenItineraries}
                  className="hover:text-amber-300 text-left transition-colors cursor-pointer"
                >
                  3-Day Grand Expedition
                </button>
              </li>
              <li>
                <span className="block text-stone-500">Kumbh Mela Heritage Archive</span>
              </li>
              <li>
                <span className="block text-stone-500">Sahyadri Mountain Safety Rules</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Nashik Wanderlust. Dedicated to promoting responsible tourism in Maharashtra.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for lovers of heritage, wine & Sahyadri trails</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
