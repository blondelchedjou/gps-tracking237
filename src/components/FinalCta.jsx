import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function FinalCta() {
  return (
    <section className="bg-[#16144F] text-white text-center py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-[1120px] mx-auto px-5 relative z-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white max-w-[20ch] mx-auto mb-4 tracking-tight leading-tight">
          N’attendez pas qu’il soit trop tard pour protéger votre véhicule.
        </h2>
        <p className="text-base text-[#D7D9EE] mb-7 max-w-[42ch] mx-auto">
          Profitez du tarif promotionnel en vigueur avant la fin de l’offre.
        </p>
        <a
          href="#devis"
          className="inline-flex items-center justify-center gap-2 min-h-[50px] px-8 py-3.5 rounded-xl bg-[#FF6B35] hover:bg-[#F25A22] text-[#0E0D33] font-bold text-base transition-all duration-200 active:scale-95 shadow-lg shadow-[#FF6B35]/25 cursor-pointer"
        >
          <span>Je protège mon véhicule maintenant</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </a>
      </div>
    </section>
  );
}
