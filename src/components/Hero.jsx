import React, { useState } from 'react';
import { Check, ArrowRight, Shield, MapPin, Zap, Power, AlertCircle } from 'lucide-react';

export default function Hero() {
  const [engineCutoff, setEngineCutoff] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleToggleEngine = () => {
    setEngineCutoff(!engineCutoff);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <section className="bg-white border-b border-[#E2E5F0] py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="max-w-[1120px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Promo Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1F3F9] border border-[#E2E5F0] text-[#16144F] text-xs sm:text-sm font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse"></span>
              <span>Offre du mois : <strong className="text-[#C2410C]">jusqu’à −37,5 % sur l’équipement</strong></span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold text-[#111033] tracking-tight leading-[1.12]">
              Retrouvez votre véhicule même en cas de vol, <span className="text-[#16144F] underline decoration-[#FF6B35]/40 decoration-4 underline-offset-4">depuis votre smartphone.</span>
            </h1>

            {/* Lead text */}
            <p className="text-base sm:text-lg text-[#525570] leading-relaxed max-w-[50ch]">
              Suivez la position exacte de votre voiture, moto ou camion en direct et coupez le moteur à distance en un geste.
            </p>

            {/* CTAs & Trust Row */}
            <div className="space-y-5 pt-1">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <a
                  href="#devis"
                  className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-7 py-3.5 rounded-xl bg-[#FF6B35] hover:bg-[#F25A22] text-[#0E0D33] font-bold text-base transition-all duration-200 active:scale-95 shadow-md shadow-[#FF6B35]/20 cursor-pointer"
                >
                  <span>Obtenir mon devis en 1 minute</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </a>

                <a
                  href="#situation"
                  className="inline-flex items-center justify-center gap-2 min-h-[50px] px-5 py-3 rounded-xl border border-[#CBD0E2] bg-white hover:bg-[#F8F9FC] text-[#16144F] font-bold text-sm transition"
                >
                  Voir en situation réelle ↓
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs sm:text-sm font-semibold text-[#525570] pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#16144F] stroke-[2.5]" />
                  Garantie 1 an
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#16144F] stroke-[2.5]" />
                  Yaoundé &amp; Douala
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#16144F] stroke-[2.5]" />
                  Suivi temps réel dès 45 000 FCFA
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Phone Mockup Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[320px] bg-white border border-[#CBD0E2] rounded-[36px] p-3 shadow-xl transition-transform hover:-translate-y-1 duration-300">
              <div className="bg-[#F8F9FC] border border-[#E2E5F0] rounded-[26px] overflow-hidden shadow-inner">
                
                {/* Phone Topbar */}
                <div className="bg-[#16144F] text-white px-4 py-3.5 flex items-center justify-between text-xs font-semibold">
                  <span className="tracking-wide">Mon véhicule</span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-white bg-white/15 px-2.5 py-0.5 rounded-full font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-live-dot"></span>
                    En direct
                  </span>
                </div>

                {/* Map Canvas with Animated Tracker */}
                <div className="relative bg-[#EDF0F7] border-b border-[#E2E5F0] overflow-hidden">
                  <svg className="w-full h-auto block" viewBox="0 0 280 200" fill="none" aria-hidden="true">
                    <rect width="280" height="200" fill="#EDF0F7"/>
                    {/* Simulated city roads */}
                    <path d="M-10 140 L290 80" stroke="#FFFFFF" strokeWidth="14"/>
                    <path d="M75 -10 L110 210" stroke="#FFFFFF" strokeWidth="12"/>
                    <path d="M190 -10 L215 210" stroke="#FFFFFF" strokeWidth="10"/>
                    <path d="M0 45 L280 20" stroke="#FFFFFF" strokeWidth="8"/>
                    
                    {/* Trajectory line */}
                    <path d="M52 152 C100 132, 128 112, 186 72" stroke="#16144F" strokeWidth="3" strokeDasharray="6 5" strokeLinecap="round"/>
                    
                    {/* Moving Tracker Pin */}
                    <g className={engineCutoff ? '' : 'animate-drive'}>
                      <circle className="animate-radar-ping" cx="116" cy="118" r="16" fill="#FF6B35" opacity="0.25"/>
                      <circle cx="116" cy="118" r="8" fill="#16144F" stroke="#FFFFFF" strokeWidth="3"/>
                      <circle cx="116" cy="118" r="2.5" fill="#FF6B35"/>
                    </g>
                  </svg>

                  {/* Toast Alert overlay when clicked */}
                  {showToast && (
                    <div className="absolute top-2 left-2 right-2 bg-[#16144F] text-white text-[10px] p-2 rounded-lg font-bold shadow-md flex items-center gap-1.5 animate-in fade-in duration-150">
                      <AlertCircle className="w-3.5 h-3.5 text-[#FF6B35] shrink-0" />
                      <span>{engineCutoff ? "⚠️ Moteur coupé par commande satellite !" : "✅ Contact rétabli, démarrage autorisé."}</span>
                    </div>
                  )}
                </div>

                {/* Telemetry info */}
                <div className="p-3.5 bg-white space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#F8F9FC] border border-[#E2E5F0] rounded-[10px] p-2.5">
                      <span className="block text-[11px] font-semibold text-[#525570]">Distance du jour</span>
                      <span className="text-[13px] font-bold text-[#111033]">48,4 km</span>
                    </div>
                    <div className="bg-[#F8F9FC] border border-[#E2E5F0] rounded-[10px] p-2.5">
                      <span className="block text-[11px] font-semibold text-[#525570]">Zone sécurité</span>
                      <span className="text-[13px] font-bold text-[#111033]">Active (100 km)</span>
                    </div>
                  </div>

                  {/* Interactive Cutoff button in simulator */}
                  <div className="flex items-center justify-between p-2.5 rounded-[10px] border border-[#E2E5F0] bg-[#F1F3F9]">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${engineCutoff ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                      <span className="text-xs font-bold text-[#16144F]">
                        {engineCutoff ? "Moteur : Coupé" : "Moteur : Actif"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleToggleEngine}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-full transition-all active:scale-95 cursor-pointer flex items-center gap-1 ${
                        engineCutoff 
                          ? 'bg-emerald-600 text-white hover:bg-emerald-500' 
                          : 'bg-[#FF6B35] text-[#0E0D33] hover:bg-[#F25A22]'
                      }`}
                    >
                      <Power className="w-3 h-3" />
                      <span>{engineCutoff ? "Rétablir" : "Couper à distance"}</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
