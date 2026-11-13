import React from 'react';
import { Star, ShieldCheck, Quote, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../data/landingData';

export default function Testimonials() {
  return (
    <section id="temoignages" className="py-20 bg-slate-900/50 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/60 px-3 py-1 rounded-full inline-block mb-3">
            ⭐ Retours d'Expérience Réels
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ils ont évité le vol grâce à GPS Tracking Cameroun
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3">
            Découvrez comment nos clients à Douala et Yaoundé protègent leurs investissements au quotidien.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl relative hover:border-slate-700 transition"
            >
              <div>
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Client Vérifié
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-orange-500/50"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{t.name}</h4>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                  <p className="text-[10px] text-orange-400 flex items-center gap-1 font-medium mt-0.5">
                    <MapPin className="w-2.5 h-2.5" /> {t.city}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="mt-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Score de satisfaction client : <strong>4.9 / 5</strong> sur plus de 380 avis collectés à Douala et Yaoundé.</span>
        </div>

      </div>
    </section>
  );
}

