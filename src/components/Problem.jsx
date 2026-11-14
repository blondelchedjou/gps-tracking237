import React from 'react';
import { AlertCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function Problem() {
  const risks = [
    "Perdre un véhicule représentant plusieurs millions de FCFA sans aucune piste.",
    "Subir des trajets non autorisés ou des détours non justifiés de vos chauffeurs.",
    "Paralyser votre activité de taxi, de livraison ou de transport de marchandises."
  ];

  return (
    <section id="risque" className="py-16 sm:py-20 bg-[#F8F9FC] border-b border-[#E2E5F0]">
      <div className="max-w-[1120px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          {/* Left Text */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16144F]">
              <span className="w-2 h-2 rounded-full bg-[#FF6B35]"></span>
              Le risque réel
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111033] tracking-tight leading-tight">
              Un vol se joue en quelques minutes.
            </h2>
            <p className="text-base text-[#525570] leading-relaxed">
              Sans traceur GPS, vous constatez la disparition lorsqu’il est déjà trop tard. Avec GPS Tracking, vous gardez l’avantage : vous localisez votre véhicule immédiatement et vous immobilisez le moteur à distance.
            </p>
          </div>

          {/* Right Risk Card */}
          <div className="bg-white border border-[#E2E5F0] rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-base font-bold text-[#16144F] mb-5 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#FF6B35]" />
              <span>Ce que vous évitez dès l’installation :</span>
            </h3>
            
            <ul className="space-y-3.5 text-sm text-[#525570]">
              {risks.map((risk, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FF6B35]/10 text-[#C2410C] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✕
                  </div>
                  <span className="leading-snug">{risk}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
