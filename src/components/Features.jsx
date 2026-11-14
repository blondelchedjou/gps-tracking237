import React from 'react';
import { Power, MapPin, Clock, BarChart3, ShieldCheck } from 'lucide-react';

export default function Features() {
  return (
    <section id="fonctionnalites" className="py-16 sm:py-24 bg-white border-b border-[#E2E5F0]">
      <div className="max-w-[1120px] mx-auto px-5">
        
        {/* Section Head */}
        <div className="max-w-[640px] mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16144F] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF6B35]"></span>
            Fonctionnalités
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111033] tracking-tight mb-3">
            Le contrôle complet dans votre poche.
          </h2>
          <p className="text-base sm:text-lg text-[#525570] leading-relaxed">
            Une application claire pour surveiller un véhicule personnel ou piloter toute une flotte.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Primary High-Impact Card (Span 2) */}
          <article className="md:col-span-2 bg-[#16144F] text-white rounded-2xl p-7 sm:p-9 flex flex-col justify-between shadow-lg relative overflow-hidden group">
            <div className="space-y-4 relative z-10">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#FF6B35]">
                Protection décisive
              </span>
              
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#FF6B35]">
                <Power className="w-6 h-6 stroke-[2.2]" />
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Arrêt et redémarrage du moteur à distance
              </h3>

              <p className="text-sm sm:text-base text-[#D7D9EE] max-w-[54ch] leading-relaxed">
                En cas de braquage ou d’utilisation suspecte, coupez l’alimentation moteur directement depuis votre smartphone. Le véhicule ne peut plus repartir sans votre autorisation.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#BFC3E6]">
              <span>Contrôle par application & SMS de secours</span>
              <span className="text-[#FF6B35] font-bold">100% Inclus</span>
            </div>
          </article>

          {/* Feature 2: Suivi en temps réel */}
          <article className="bg-[#F8F9FC] border border-[#E2E5F0] hover:border-[#CBD0E2] rounded-2xl p-7 flex flex-col justify-between card-hover-effect">
            <div>
              <div className="w-11 h-11 rounded-xl bg-white border border-[#E2E5F0] flex items-center justify-center text-[#16144F] mb-5 shadow-xs">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#111033] mb-2">Suivi en temps réel</h3>
              <p className="text-sm text-[#525570] leading-relaxed">
                Visualisez les déplacements sur la carte seconde par seconde avec l’adresse exacte affichée.
              </p>
            </div>
          </article>

          {/* Feature 3: Historique */}
          <article className="bg-[#F8F9FC] border border-[#E2E5F0] hover:border-[#CBD0E2] rounded-2xl p-7 flex flex-col justify-between card-hover-effect">
            <div>
              <div className="w-11 h-11 rounded-xl bg-white border border-[#E2E5F0] flex items-center justify-center text-[#16144F] mb-5 shadow-xs">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#111033] mb-2">Historique des déplacements</h3>
              <p className="text-sm text-[#525570] leading-relaxed">
                Consultez les itinéraires empruntés, les arrêts effectués et les horaires détaillés.
              </p>
            </div>
          </article>

          {/* Feature 4: Kilométrage */}
          <article className="bg-[#F8F9FC] border border-[#E2E5F0] hover:border-[#CBD0E2] rounded-2xl p-7 flex flex-col justify-between card-hover-effect">
            <div>
              <div className="w-11 h-11 rounded-xl bg-white border border-[#E2E5F0] flex items-center justify-center text-[#16144F] mb-5 shadow-xs">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#111033] mb-2">Kilométrage jour, semaine et an</h3>
              <p className="text-sm text-[#525570] leading-relaxed">
                Suivez la distance parcourue pour maîtriser votre carburant et planifier l’entretien.
              </p>
            </div>
          </article>

          {/* Feature 5: Zone de sécurité */}
          <article className="bg-[#F8F9FC] border border-[#E2E5F0] hover:border-[#CBD0E2] rounded-2xl p-7 flex flex-col justify-between card-hover-effect">
            <div>
              <div className="w-11 h-11 rounded-xl bg-white border border-[#E2E5F0] flex items-center justify-center text-[#16144F] mb-5 shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#111033] mb-2">Zone de sécurité jusqu’à 100 km</h3>
              <p className="text-sm text-[#525570] leading-relaxed">
                Délimitez un périmètre autorisé autour d’un point et soyez alerté dès qu’il est franchi.
              </p>
            </div>
          </article>

        </div>

      </div>
    </section>
  );
}
