import React from 'react';
import { VEHICLE_OPTIONS } from '../data/landingData';

export default function Pricing({ onSelectVehicle }) {
  const formatPrice = (val) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " FCFA";
  };

  const handleSelect = (val) => {
    if (onSelectVehicle) {
      onSelectVehicle(val);
    }
    const target = document.getElementById('devis');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="tarifs" className="py-16 sm:py-24 bg-[#F8F9FC] border-b border-[#E2E5F0]">
      <div className="max-w-[1120px] mx-auto px-5">
        
        {/* Section Head */}
        <div className="max-w-[640px] mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16144F] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF6B35]"></span>
            Tarifs promotionnels
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111033] tracking-tight mb-3">
            Un tarif transparent selon votre véhicule.
          </h2>
          <p className="text-base sm:text-lg text-[#525570] leading-relaxed">
            Boîtier GPS avec garantie d’un an incluse. Sélectionnez votre catégorie pour pré-remplir votre devis.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VEHICLE_OPTIONS.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative transition-all duration-200 ${
                item.popular
                  ? 'border-2 border-[#16144F] shadow-md sm:-translate-y-1'
                  : 'border border-[#E2E5F0] hover:border-[#16144F] shadow-xs'
              }`}
            >
              {item.popular && (
                <span className="absolute -top-3 left-5 bg-[#16144F] text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-sm">
                  Le plus demandé
                </span>
              )}

              <div>
                {/* Vehicle SVG Icon */}
                <div className="w-11 h-11 rounded-[10px] bg-[#F1F3F9] text-[#16144F] flex items-center justify-center mb-4">
                  {item.id === 'moto' && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h2l2 4.5-3.5 3H9L6 10h6.5"/><path d="M9 17.5 12 10"/></svg>
                  )}
                  {item.id === 'voiture' && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
                  )}
                  {item.id === 'suv' && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 17h2v-5l-2.5-1.5L16 6H5L3 10.5V17h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M9 17h6"/></svg>
                  )}
                  {item.id === 'camion' && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
                  )}
                </div>

                <h3 className="text-lg font-bold text-[#111033] mb-1">{item.name}</h3>
                
                {/* Price block */}
                <div className="text-xs text-[#525570] line-through min-h-[20px] mt-2 font-medium">
                  {item.oldPrice ? formatPrice(item.oldPrice) : <span className="opacity-0">&nbsp;</span>}
                </div>
                
                <div className="text-2xl font-extrabold text-[#111033] tracking-tight mb-3">
                  {item.basePrice.toLocaleString('fr-FR')}{" "}
                  <span className="text-sm font-semibold text-[#525570]">FCFA</span>
                </div>

                <p className="text-xs text-[#525570] leading-relaxed mb-6 flex-grow">
                  {item.meta}
                </p>
              </div>

              {/* Action Link */}
              <button
                type="button"
                onClick={() => handleSelect(item.value)}
                className={`w-full min-h-[44px] rounded-[10px] font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-all cursor-pointer ${
                  item.popular
                    ? 'bg-[#FF6B35] hover:bg-[#F25A22] text-[#0E0D33] shadow-xs'
                    : 'bg-white border border-[#CBD0E2] text-[#16144F] hover:bg-[#F1F3F9] hover:border-[#16144F]'
                }`}
              >
                Choisir {item.name}
              </button>
            </div>
          ))}
        </div>

        {/* Pricing Fleet Note */}
        <p className="mt-8 text-sm text-[#525570]">
          Vous équipez une flotte de 6 véhicules ou plus ? Bénéficiez d’un tarif dégressif sur mesure dans le formulaire ci-dessous.
        </p>

      </div>
    </section>
  );
}
