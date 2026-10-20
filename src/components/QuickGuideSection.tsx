import React from 'react';
import { Utensils, Sun, Compass, MapPin, Wine, ShieldCheck } from 'lucide-react';

export const QuickGuideSection: React.FC = () => {
  return (
    <section className="py-16 bg-stone-100 border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            Traveler’s Cheat Sheet
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-900 mt-3">
            Nashik Travel Essentials
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Key insights on culinary legends, best seasons, and getting around the city.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: The Legendary Misal Pav Trail */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-5">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-stone-900">
                The Legendary Misal Trail
              </h3>
              <p className="text-xs text-stone-500 mt-1 mb-4">
                Nashik is the undisputed Misal capital of Maharashtra. Don't leave without tasting:
              </p>
              
              <ul className="space-y-3 text-xs text-stone-700">
                <li className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/80">
                  <strong className="text-stone-900 block font-semibold">1. Sadhana Chulivarchi Misal</strong>
                  <span>Cooked over rustic woodfire chulhas, served with jalebi and chilled curd at Gangapur.</span>
                </li>
                <li className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/80">
                  <strong className="text-stone-900 block font-semibold">2. Hotel Shamsundar (Satpur)</strong>
                  <span>A connoisseur’s classic, beloved for its fiery, deeply spiced red tarri and crunch.</span>
                </li>
                <li className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/80">
                  <strong className="text-stone-900 block font-semibold">3. Hotel Ambika (Panchavati)</strong>
                  <span>Distinctive black gravy (kala masala) misal cooked with sprouted moth beans.</span>
                </li>
              </ul>
            </div>

            <div className="mt-5 pt-3 border-t border-stone-100 text-[11px] text-amber-800 font-medium">
              💡 Tip: Always ask for extra "rassa / tarri" in a small copper bowl!
            </div>
          </div>

          {/* Card 2: Best Seasons to Plan Your Visit */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center mb-5">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-stone-900">
                When to Visit Nashik
              </h3>
              <p className="text-xs text-stone-500 mt-1 mb-4">
                Every season brings a radically distinct charm to the Deccan valley:
              </p>

              <div className="space-y-3 text-xs text-stone-700">
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/80">
                  <strong className="text-emerald-800 block font-semibold">July – September (Monsoon Magic)</strong>
                  <span>Sahyadri waterfalls roar, Brahmagiri & Harihar are shrouded in mist, and hills turn fluorescent emerald.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/80">
                  <strong className="text-indigo-800 block font-semibold">October – February (Pleasant Winter)</strong>
                  <span>Crisp, cool 14°C evenings; ideal for outdoor heritage walks, temple visits, and fort trekking.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/80">
                  <strong className="text-rose-800 block font-semibold">January – March (Grape Harvest)</strong>
                  <span>Vineyards are heavy with juicy grapes; wineries host grape-stomping sessions and harvest fests.</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-stone-100 text-[11px] text-rose-800 font-medium">
              🍇 SulaFest & harvest celebrations peak in late January & February!
            </div>
          </div>

          {/* Card 3: Getting Around & Smart Tips */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-stone-900">
                Getting Around & Local Tips
              </h3>
              <p className="text-xs text-stone-500 mt-1 mb-4">
                Practical logistics for seamless sightseeing across all 10 spots:
              </p>

              <ul className="space-y-3 text-xs text-stone-700">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>CBS Hub:</strong> Nashik Central Bus Stand (CBS) connects directly to Trimbakeshwar (buses every 15 mins).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Wine className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Winery Corridor:</strong> Hire an auto or day cab for Gangapur Road to hit Sula, York, and Someshwar together.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>Trek Safety:</strong> Start Harihar and Brahmagiri before 7:00 AM to avoid mid-day heat and descending crowds.</span>
                </li>
              </ul>
            </div>

            <div className="mt-5 pt-3 border-t border-stone-100 text-[11px] text-emerald-800 font-medium">
              🛍️ Don’t forget to buy fresh raisins, goda masala, and Paithani silk!
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
