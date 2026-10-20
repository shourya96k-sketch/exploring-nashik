import React, { useState } from 'react';
import { ITINERARIES } from '../data/itineraries';
import { Article } from '../types/blog';
import { X, Calendar, Clock, MapPin, Sparkles, ArrowRight, Lightbulb } from 'lucide-react';

interface TravelPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const TravelPlannerModal: React.FC<TravelPlannerModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [selectedItineraryId, setSelectedItineraryId] = useState(ITINERARIES[0].id);

  if (!isOpen) return null;

  const currentItinerary = ITINERARIES.find(it => it.id === selectedItineraryId) || ITINERARIES[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 relative z-10">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
          
          {/* Header */}
          <div className="p-6 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-editorial text-2xl font-bold text-stone-100 flex items-center gap-2">
                  <span>Curated Nashik Itineraries</span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </h2>
                <p className="text-xs text-stone-400">
                  Carefully timed schedules connecting our 10 iconic visiting spots
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Itinerary Selection Tabs */}
          <div className="p-4 bg-stone-100 border-b border-stone-200 flex gap-2 overflow-x-auto">
            {ITINERARIES.map((it) => (
              <button
                key={it.id}
                onClick={() => setSelectedItineraryId(it.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedItineraryId === it.id
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-900/20'
                    : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                {it.title}
              </button>
            ))}
          </div>

          {/* Itinerary Details Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-8">
            {/* Summary Banner */}
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  {currentItinerary.duration} • Ideal For: {currentItinerary.idealFor}
                </span>
                <h3 className="font-editorial text-xl font-bold text-stone-900 mt-1">
                  {currentItinerary.title}
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  {currentItinerary.subtitle}
                </p>
              </div>
            </div>

            {/* Days Breakdown */}
            <div className="space-y-8">
              {currentItinerary.days.map((day) => (
                <div key={day.dayNumber} className="border border-stone-200 rounded-2xl p-5 sm:p-6 bg-white shadow-xs">
                  <div className="flex items-center gap-2 mb-2 pb-3 border-b border-stone-100">
                    <span className="px-2.5 py-0.5 rounded-md bg-stone-900 text-amber-300 font-bold text-xs uppercase">
                      Day {day.dayNumber}
                    </span>
                    <h4 className="font-editorial text-lg font-bold text-stone-900">
                      {day.dayTitle}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-500 mb-6 italic">
                    {day.description}
                  </p>

                  {/* Timeline Spots */}
                  <div className="space-y-6 relative before:absolute before:left-3 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-amber-200">
                    {day.spots.map((spot, sIdx) => {
                      const matchedArticle = spot.articleId 
                        ? articles.find(a => a.id === spot.articleId)
                        : undefined;

                      return (
                        <div key={sIdx} className="relative pl-8 sm:pl-10">
                          {/* Dot */}
                          <div className="absolute left-1.5 sm:left-2 top-1.5 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white shadow-xs" />

                          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/80 hover:border-amber-400 transition-all">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                              <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {spot.time}
                              </span>

                              {matchedArticle && (
                                <button
                                  onClick={() => {
                                    onSelectArticle(matchedArticle);
                                    onClose();
                                  }}
                                  className="text-[11px] font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 hover:underline cursor-pointer"
                                >
                                  Read Spot Guide
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              )}
                            </div>

                            <h5 className="font-editorial text-base font-bold text-stone-900 flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              {spot.spotTitle}
                            </h5>

                            <p className="text-xs sm:text-sm text-stone-700 mt-1 leading-relaxed">
                              {spot.activity}
                            </p>

                            {spot.tip && (
                              <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-start gap-1.5 text-xs text-stone-500">
                                <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                                <span><strong className="text-stone-700">Local Pro Tip:</strong> {spot.tip}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors"
            >
              Done Exploring
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
