import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Décrivez votre besoin",
      desc: "Choisissez votre type de véhicule et répondez aux 5 questions rapides ci-dessous."
    },
    {
      num: "02",
      title: "Recevez votre offre sur WhatsApp",
      desc: "Notre équipe vous confirme le tarif exact, les modalités et le créneau d’installation."
    },
    {
      num: "03",
      title: "Installez et gardez le contrôle",
      desc: "Le traceur est posé discrètement. Vous suivez votre véhicule dès la première minute."
    }
  ];

  return (
    <section id="etapes" className="py-16 sm:py-24 bg-[#F8F9FC] border-b border-[#E2E5F0]">
      <div className="max-w-[1120px] mx-auto px-5">
        
        {/* Section Head */}
        <div className="max-w-[640px] mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16144F] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF6B35]"></span>
            Comment ça marche
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111033] tracking-tight mb-3">
            Trois étapes simples pour sécuriser votre véhicule.
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E5F0] hover:border-[#CBD0E2] rounded-2xl p-7 sm:p-8 card-hover-effect"
            >
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-[10px] bg-[#F1F3F9] text-[#16144F] font-extrabold text-sm mb-5">
                {st.num}
              </span>
              <h3 className="text-lg font-bold text-[#111033] mb-2">{st.title}</h3>
              <p className="text-sm text-[#525570] leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
