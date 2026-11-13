import React from 'react';
import { XCircle, CheckCircle, AlertOctagon, TrendingDown, ArrowRight } from 'lucide-react';

export default function Comparison() {
  return (
    <section className="py-16 bg-slate-900/60 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider text-red-400 bg-red-950/60 border border-red-800/60 px-3 py-1 rounded-full inline-block mb-3">
            ⚠️ Réalité du terrain au Cameroun
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Un vol de véhicule se règle en moins de 15 minutes.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3">
            Sans traceur, vous découvrez la disparition au petit matin quand la voiture est déjà démontée ou en route vers une frontière. Avec GPS Tracking, vous reprenez le contrôle immédiatement.
          </p>
        </div>

        {/* Comparison grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          
          {/* Card: SANS GPS */}
          <div className="bg-slate-950/80 border border-red-900/50 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-950 border border-red-800/80 flex items-center justify-center text-red-400">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Sans Traceur GPS</h3>
                <span className="text-xs text-red-400 font-medium">Vous êtes totalement aveugle</span>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-0.5">✕</span>
                <span><strong>Perte sèche de plusieurs millions :</strong> Voiture, moto ou camion définitivement introuvable.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-0.5">✕</span>
                <span><strong>Détours et abus des chauffeurs :</strong> Vos chauffeurs de taxi ou livreurs utilisent votre carburant pour des courses personnelles.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-0.5">✕</span>
                <span><strong>Plainte sans issue :</strong> La police et la gendarmerie ne peuvent rien faire sans aucune piste ni localisation.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-0.5">✕</span>
                <span><strong>Arrêt immédiat de votre gagne-pain :</strong> Vos revenus s'effondrent du jour au lendemain.</span>
              </li>
            </ul>

            <div className="mt-8 p-3.5 bg-red-950/40 border border-red-900/40 rounded-xl text-xs text-red-300 font-semibold text-center">
              Coût estimé d'un vol : <span className="text-white font-extrabold underline">3 500 000 à 25 000 000 FCFA</span>
            </div>
          </div>

          {/* Card: AVEC GPS TRACKING */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/50 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl ring-1 ring-emerald-500/30">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-600/80 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Avec GPS Tracking</h3>
                <span className="text-xs text-emerald-400 font-medium">Contrôle absolu 24h/24 dans votre poche</span>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-slate-200">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span><strong>Coupure moteur à distance :</strong> Vous bloquez le véhicule en un clic sur votre smartphone. Le voleur ne peut plus rouler.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span><strong>Position satellite en direct :</strong> Rues, quartiers (Douala/Yaoundé) et vitesse affichés en temps réel.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span><strong>Intervention rapide facilitée :</strong> Vous donnez les coordonnées GPS exactes aux forces de l'ordre pour intercepter le véhicule.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span><strong>Baisse des coûts de carburant :</strong> Jusqu'à 25% d'économie grâce à l'historique complet des trajets.</span>
              </li>
            </ul>

            <div className="mt-8 p-3.5 bg-emerald-950/60 border border-emerald-600/50 rounded-xl text-xs text-emerald-300 font-bold text-center flex items-center justify-between">
              <span>Investissement unique dès :</span>
              <span className="text-white text-sm font-extrabold bg-emerald-600 px-2.5 py-0.5 rounded-md">
                45 000 FCFA
              </span>
            </div>
          </div>

        </div>

        {/* CTA banner below */}
        <div className="text-center mt-10">
          <a
            href="#devis"
            className="inline-flex items-center gap-2 text-sm font-extrabold text-orange-400 hover:text-orange-300 transition"
          >
            <span>Ne prenez plus ce risque inutilement — Protégez votre véhicule maintenant</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}

