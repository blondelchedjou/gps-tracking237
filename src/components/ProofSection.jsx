import React from 'react';

export default function ProofSection() {
  return (
    <section id="situation" className="py-16 sm:py-24 bg-white border-b border-[#E2E5F0]">
      <div className="max-w-[1120px] mx-auto px-5">
        
        {/* Section Head */}
        <div className="max-w-[640px] mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16144F] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF6B35]"></span>
            En situation réelle
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111033] tracking-tight mb-3">
            Une solution adaptée au terrain à Yaoundé &amp; Douala.
          </h2>
          <p className="text-base sm:text-lg text-[#525570] leading-relaxed">
            Pose discrète sur tout type de véhicule, gestion multi-flotte et contrôle instantané depuis votre téléphone.
          </p>
        </div>

        {/* 3 Real-World Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Installation discrète */}
          <article className="bg-[#F8F9FC] border border-[#E2E5F0] hover:border-[#CBD0E2] rounded-2xl p-5 flex flex-col gap-4 card-hover-effect">
            <div className="rounded-xl overflow-hidden border border-[#E2E5F0] bg-white shadow-xs">
              <svg viewBox="0 0 360 225" fill="none" className="w-full h-auto block" role="img" aria-label="Schéma d’installation discrète du boîtier GPS sous le tableau de bord">
                <rect width="360" height="225" fill="#F1F3F9"/>
                <path d="M0 176 H360" stroke="#DCE0EE" strokeWidth="1.5"/>
                <rect x="16" y="16" width="142" height="26" rx="13" fill="#FFFFFF" stroke="#DCE0EE"/>
                <circle cx="29" cy="29" r="4" fill="#FF6B35"/>
                <text x="40" y="33" fill="#16144F" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11" fontWeight="700">Pose invisible · 45 min</text>

                {/* Car silhouette */}
                <path d="M74 150 L74 124 Q74 115 86 112 L126 105 L155 77 Q163 70 176 70 L228 70 Q240 70 248 79 L271 106 L286 112 Q294 115 294 125 L294 150 Q294 156 285 156 L269 156 A21 21 0 0 0 227 156 L143 156 A21 21 0 0 0 101 156 L83 156 Q74 156 74 150 Z" fill="#FFFFFF" stroke="#16144F" strokeWidth="2.2" strokeLinejoin="round"/>
                <path d="M160 79 L137 104 L189 104 L189 79 Z" fill="#E8ECF7"/>
                <path d="M198 79 L198 104 L256 104 L239 79 Z" fill="#E8ECF7"/>
                <circle cx="122" cy="156" r="17" fill="#16144F"/>
                <circle cx="122" cy="156" r="7" fill="#FFFFFF"/>
                <circle cx="248" cy="156" r="17" fill="#16144F"/>
                <circle cx="248" cy="156" r="7" fill="#FFFFFF"/>

                {/* Concealed GPS unit highlight */}
                <circle cx="152" cy="121" r="22" fill="#FF6B35" fillOpacity="0.14" stroke="#FF6B35" strokeWidth="1.5" strokeDasharray="4 3"/>
                <rect x="142" y="114" width="20" height="14" rx="3" fill="#FF6B35"/>
                <circle cx="152" cy="121" r="2.5" fill="#16144F"/>
                <path d="M144 95 Q152 89 160 95" stroke="#FF6B35" strokeWidth="1.8" strokeLinecap="round"/>

                <rect x="160" y="185" width="184" height="26" rx="13" fill="#16144F"/>
                <text x="252" y="202" textAnchor="middle" fill="#FFFFFF" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11" fontWeight="600">Boîtier dissimulé · Garantie 1 an</text>
              </svg>
            </div>
            
            <div className="px-1 py-1 space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#16144F]">
                Particuliers · Yaoundé
              </span>
              <h3 className="text-lg font-bold text-[#111033]">Installation discrète</h3>
              <p className="text-sm text-[#525570] leading-relaxed">
                Le boîtier est posé hors de vue sous le tableau de bord en moins d’une heure, sans perturber l’électronique d’origine.
              </p>
            </div>
          </article>

          {/* Card 2 : Flotte & Taxis Douala */}
          <article className="bg-[#F8F9FC] border border-[#E2E5F0] hover:border-[#CBD0E2] rounded-2xl p-5 flex flex-col gap-4 card-hover-effect">
            <div className="rounded-xl overflow-hidden border border-[#E2E5F0] bg-white shadow-xs">
              <svg viewBox="0 0 360 225" fill="none" className="w-full h-auto block" role="img" aria-label="Carte de suivi simultané de 3 véhicules sur une flotte à Douala">
                <rect width="360" height="225" fill="#EDF0F7"/>
                <path d="M0 164 Q82 146 122 225 L0 225 Z" fill="#D8E4F4"/>
                <path d="M-10 124 L370 64" stroke="#FFFFFF" strokeWidth="12"/>
                <path d="M92 -10 L132 235" stroke="#FFFFFF" strokeWidth="10"/>
                <path d="M230 -10 L256 235" stroke="#FFFFFF" strokeWidth="9"/>
                <path d="M0 54 L360 24" stroke="#FFFFFF" strokeWidth="7"/>

                <rect x="16" y="16" width="166" height="26" rx="13" fill="#16144F"/>
                <text x="99" y="33" textAnchor="middle" fill="#FFFFFF" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11" fontWeight="700">Flotte Douala · 3/3 en ligne</text>

                {/* Vehicle 1 */}
                <circle cx="108" cy="100" r="10" fill="#16144F" stroke="#FFFFFF" strokeWidth="3"/>
                <circle cx="108" cy="100" r="3" fill="#FF6B35"/>
                <rect x="122" y="88" width="84" height="24" rx="6" fill="#FFFFFF" stroke="#DCE0EE"/>
                <text x="164" y="104" textAnchor="middle" fill="#111033" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10.5" fontWeight="700">Taxi 01 · 38 km/h</text>

                {/* Vehicle 2 */}
                <circle cx="234" cy="70" r="10" fill="#16144F" stroke="#FFFFFF" strokeWidth="3"/>
                <circle cx="234" cy="70" r="3" fill="#FF6B35"/>
                <rect x="248" y="58" width="94" height="24" rx="6" fill="#FFFFFF" stroke="#DCE0EE"/>
                <text x="295" y="74" textAnchor="middle" fill="#111033" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10.5" fontWeight="700">Pickup · 51 km/h</text>

                {/* Vehicle 3 */}
                <circle cx="186" cy="164" r="10" fill="#16144F" stroke="#FFFFFF" strokeWidth="3"/>
                <circle cx="186" cy="164" r="3" fill="#FFFFFF"/>
                <rect x="200" y="152" width="102" height="24" rx="6" fill="#FFFFFF" stroke="#DCE0EE"/>
                <text x="251" y="168" textAnchor="middle" fill="#525570" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10.5" fontWeight="700">Camion · À l’arrêt</text>
              </svg>
            </div>

            <div className="px-1 py-1 space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#16144F]">
                Taxis &amp; Flottes · Douala
              </span>
              <h3 className="text-lg font-bold text-[#111033]">Suivi multi-véhicules</h3>
              <p className="text-sm text-[#525570] leading-relaxed">
                Contrôlez simultanément vos taxis, livreurs ou camions sur une seule carte pour éviter les trajets non autorisés.
              </p>
            </div>
          </article>

          {/* Card 3 : Interface de contrôle mobile */}
          <article className="bg-[#F8F9FC] border border-[#E2E5F0] hover:border-[#CBD0E2] rounded-2xl p-5 flex flex-col gap-4 card-hover-effect">
            <div className="rounded-xl overflow-hidden border border-[#E2E5F0] bg-white shadow-xs">
              <svg viewBox="0 0 360 225" fill="none" className="w-full h-auto block" role="img" aria-label="Capture d’interface montrant l’adresse en direct et le bouton de coupure moteur">
                <rect width="360" height="225" fill="#F1F3F9"/>
                <rect x="24" y="16" width="312" height="193" rx="14" fill="#FFFFFF" stroke="#DCE0EE" strokeWidth="1.5"/>

                <path d="M24 30 Q24 16 38 16 H322 Q336 16 336 30 V56 H24 Z" fill="#16144F"/>
                <text x="40" y="40" fill="#FFFFFF" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="12" fontWeight="700">Tableau de bord · En direct</text>
                <rect x="262" y="25" width="58" height="21" rx="10.5" fill="#FFFFFF" fillOpacity="0.16"/>
                <circle cx="274" cy="35.5" r="3" fill="#FF6B35"/>
                <text x="282" y="39" fill="#FFFFFF" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10" fontWeight="600">Actif</text>

                {/* Location Row */}
                <circle cx="47" cy="76" r="8" fill="#F1F3F9"/>
                <circle cx="47" cy="76" r="3" fill="#16144F"/>
                <text x="63" y="80" fill="#111033" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11.5" fontWeight="700">Bastos, Yaoundé · 14:32</text>

                {/* 3 Telemetry Boxes */}
                <rect x="40" y="96" width="88" height="50" rx="8" fill="#F8F9FC" stroke="#E2E5F0"/>
                <text x="50" y="114" fill="#525570" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9.5" fontWeight="600">Aujourd’hui</text>
                <text x="50" y="134" fill="#111033" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="13" fontWeight="800">48 km</text>

                <rect x="136" y="96" width="88" height="50" rx="8" fill="#F8F9FC" stroke="#E2E5F0"/>
                <text x="146" y="114" fill="#525570" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9.5" fontWeight="600">Vitesse</text>
                <text x="146" y="134" fill="#111033" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="13" fontWeight="800">34 km/h</text>

                <rect x="232" y="96" width="88" height="50" rx="8" fill="#F8F9FC" stroke="#E2E5F0"/>
                <text x="242" y="114" fill="#525570" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9.5" fontWeight="600">Zone sûre</text>
                <text x="242" y="134" fill="#111033" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="13" fontWeight="800">100 km</text>

                {/* Engine Cut-Off Action */}
                <rect x="40" y="158" width="280" height="38" rx="9" fill="#F8F9FC" stroke="#E2E5F0"/>
                <text x="52" y="181" fill="#16144F" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11" fontWeight="700">Moteur : En marche</text>
                <rect x="192" y="164" width="120" height="26" rx="7" fill="#FF6B35"/>
                <text x="252" y="181" textAnchor="middle" fill="#0E0D33" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10.5" fontWeight="700">Couper à distance</text>
              </svg>
            </div>

            <div className="px-1 py-1 space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#16144F]">
                Application mobile
              </span>
              <h3 className="text-lg font-bold text-[#111033]">Contrôle instantané</h3>
              <p className="text-sm text-[#525570] leading-relaxed">
                Consultez l’adresse exacte, le kilométrage parcouru et immobilisez le moteur à distance en cas d’urgence.
              </p>
            </div>
          </article>

        </div>

      </div>
    </section>
  );
}
