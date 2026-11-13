import React from 'react';
import { Check, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { VEHICLE_OPTIONS, WHATSAPP_NUMBER } from '../data/landingData';

export default function Pricing() {
  const formatFcfa = (val) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " FCFA";
  };

  return (
    <section id="tarifs" className="py-20 bg-slate-900/70 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-wider text-orange-400 bg-orange-950/60 border border-orange-800/60 px-3 py-1 rounded-full inline-block mb-3">
            💰 Tarifs Clairs Sans Surprise
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Un tarif accessible selon votre véhicule
          </h2>
          <p className="text-base text-slate-300 mt-4">
            Tarifs promotionnels à durée limitée. Matériel garanti 1 an avec assistance technique locale 7j/7.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VEHICLE_OPTIONS.map((v) => (
            <div
              key={v.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all relative ${
                v.popular
                  ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-orange-500 shadow-2xl shadow-orange-500/10 scale-100 lg:-translate-y-2'
                  : 'bg-slate-950/80 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {v.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Choix Recommandé
                </div>
              )}

              <div>
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="text-xl font-bold text-white mb-1">{v.name}</h3>
                <p className="text-xs text-slate-400 mb-6">{v.description}</p>

                {/* Price block */}
                <div className="mb-6 pb-6 border-b border-slate-800">
                  {v.oldPrice && (
                    <div className="text-xs text-slate-500 line-through mb-1">
                      {formatFcfa(v.oldPrice)}
                    </div>
                  )}
                  <div className="text-3xl font-extrabold text-white flex items-baseline gap-1">
                    <span className={v.popular ? "text-orange-400" : "text-white"}>
                      {formatFcfa(v.basePrice)}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-semibold block mt-1">
                    Paiement unique · Zéro mensualité
                  </span>
                </div>

                {/* Feature checklist */}
                <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Boîtier GPS 4G étanche & dissimulé</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Relais de coupure moteur à distance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Application mobile iPhone / Android</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Alerte vibration & sabotage batterie</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Garantie 1 an pièce et main d'œuvre</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-orange-300 font-medium">Installation à domicile offerte</span>
                  </li>
                </ul>
              </div>

              {/* Action Button */}
              <a
                href="#devis"
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-center transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  v.popular
                    ? 'bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                <span>Commander ce pack</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

            </div>
          ))}
        </div>

        {/* Corporate fleet note */}
        <div className="mt-12 bg-slate-900 border border-slate-700/80 rounded-2xl p-6 text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-orange-400" />
              Vous gérez une flotte de plus de 5 véhicules ?
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Profitez d'un audit personnalisé gratuit, d'une formation de vos équipes et de tarifs grossistes exclusifs.
            </p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour, je souhaite un devis flotte pour équiper plusieurs véhicules.")}`}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-600 transition"
          >
            Devis Flotte Entreprise
          </a>
        </div>

      </div>
    </section>
  );
}

