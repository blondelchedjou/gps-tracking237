import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, Check, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/landingData';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function QuoteForm({ selectedVehicle, setSelectedVehicle }) {
  const [qty, setQty] = useState(1);
  const [mainNeed, setMainNeed] = useState("Protéger contre le vol");
  const [timeframe, setTimeframe] = useState("Cette semaine");
  const [cityName, setCityName] = useState("Yaoundé");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const formatPrice = (val) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " FCFA";
  };

  // Calculate estimate
  let estMainText = "Sélectionnez un véhicule";
  let estSubText = "Tarif promo affiché en direct.";
  let unitPrice = 0;
  let vehicleLabel = "";

  if (selectedVehicle) {
    const parts = selectedVehicle.split("|");
    vehicleLabel = parts[0];
    unitPrice = parseInt(parts[1], 10);

    if (qty >= 6) {
      estMainText = "Tarif flotte sur mesure";
      estSubText = `${vehicleLabel} × ${qty} véhicules · Remise flotte appliquée sur WhatsApp.`;
    } else {
      estMainText = formatPrice(unitPrice * qty);
      estSubText = qty > 1 
        ? `${vehicleLabel} · ${qty} × ${formatPrice(unitPrice)}`
        : `${vehicleLabel} · Tarif promotionnel unitaire`;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedVehicle) {
      setErrorMessage("Veuillez choisir votre type de véhicule.");
      return;
    }
    if (!mainNeed) {
      setErrorMessage("Veuillez indiquer votre besoin principal.");
      return;
    }
    if (!timeframe) {
      setErrorMessage("Veuillez préciser quand vous souhaitez installer le GPS.");
      return;
    }
    if (!clientName.trim()) {
      setErrorMessage("Veuillez saisir votre prénom.");
      return;
    }
    const cleanPhone = clientPhone.replace(/[^\d+]/g, "");
    if (cleanPhone.replace(/\D/g, "").length < 9) {
      setErrorMessage("Veuillez saisir un numéro WhatsApp valide (9 chiffres minimum).");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    const leadTag = qty >= 6 ? "FLOTTE" : (timeframe === "Cette semaine" ? "CHAUD" : "TIÈDE");
    const estimationText = qty >= 6 ? "flotte, devis sur mesure" : formatPrice(unitPrice * qty);

    try {
      // Enregistrement sécurisé en temps réel dans Cloud Firestore
      await addDoc(collection(db, "devis"), {
        clientName: clientName.trim(),
        clientPhone: cleanPhone,
        cityName: cityName,
        vehicleLabel: vehicleLabel,
        qty: Number(qty),
        unitPrice: Number(unitPrice),
        mainNeed: mainNeed,
        timeframe: timeframe,
        estimationText: estimationText,
        leadTag: leadTag,
        status: "nouveau",
        createdAt: serverTimestamp(),
      });

      setSubmitSuccess(true);
    } catch (err) {
      console.error("Erreur d'enregistrement Firestore:", err);
    } finally {
      setIsSubmitting(false);
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 85,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#FF6B35', '#16144F', '#F8F9FC', '#0E0D33']
      });
    } catch (err) {}

    const message = 
`Bonjour GPS Tracking, je suis ${clientName} (${cityName}).
Véhicule : ${vehicleLabel} × ${qty}
Besoin : ${mainNeed}
Équipement : ${timeframe}
Estimation : ${estimationText}
Mon WhatsApp : ${cleanPhone}
[Prospect ${leadTag}]`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="devis" className="py-16 sm:py-24 bg-white border-b border-[#E2E5F0] scroll-mt-14">
      <div className="max-w-[1120px] mx-auto px-5">
        
        {/* Section Head */}
        <div className="max-w-[640px] mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16144F] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF6B35]"></span>
            Devis gratuit en 1 minute
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111033] tracking-tight mb-3">
            Calculez votre tarif et recevez votre offre sur WhatsApp.
          </h2>
          <p className="text-base sm:text-lg text-[#525570] leading-relaxed">
            Remplissez ces 5 points pour obtenir une réponse immédiate et adaptée à votre véhicule.
          </p>
        </div>

        {/* 2-Column Form & Sticky Summary Layout */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" novalidate>
          
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-8 bg-[#F8F9FC] border border-[#E2E5F0] rounded-2xl p-6 sm:p-9 space-y-7">
            
            {/* Q1: Vehicle Selection */}
            <div>
              <span className="block font-bold text-sm sm:text-base text-[#111033] mb-3">
                <span className="text-[#525570] mr-1">01.</span> Quel véhicule voulez-vous protéger ?
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    value: "Moto|45000",
                    label: "Moto (45 000 F)",
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h2l2 4.5-3.5 3H9L6 10h6.5"/><path d="M9 17.5 12 10"/></svg>
                    )
                  },
                  {
                    value: "Voiture|50000",
                    label: "Voiture (50 000 F)",
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
                    )
                  },
                  {
                    value: "SUV / Pickup|55000",
                    label: "SUV / Pickup (55 000 F)",
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 17h2v-5l-2.5-1.5L16 6H5L3 10.5V17h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M9 17h6"/></svg>
                    )
                  },
                  {
                    value: "Camion|70000",
                    label: "Camion (70 000 F)",
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
                    )
                  }
                ].map((opt) => (
                  <label
                    key={opt.value}
                    onClick={() => {
                      setSelectedVehicle(opt.value);
                      setErrorMessage("");
                    }}
                    className={`flex items-center gap-2.5 min-h-[48px] px-4 py-3 rounded-xl border text-sm font-semibold cursor-pointer transition-all duration-150 ${
                      selectedVehicle === opt.value
                        ? 'bg-white border-2 border-[#16144F] text-[#16144F] shadow-xs'
                        : 'bg-white border-[#CBD0E2] text-[#111033] hover:border-[#16144F]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="vehicle"
                      value={opt.value}
                      checked={selectedVehicle === opt.value}
                      onChange={() => setSelectedVehicle(opt.value)}
                      className="sr-only"
                    />
                    <span className={selectedVehicle === opt.value ? 'text-[#16144F]' : 'text-[#525570]'}>
                      {opt.icon}
                    </span>
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Q2: Quantity */}
            <div>
              <span className="block font-bold text-sm sm:text-base text-[#111033] mb-3">
                <span className="text-[#525570] mr-1">02.</span> Combien de véhicules souhaitez-vous équiper ?
              </span>
              <div className="inline-flex items-center bg-white border border-[#CBD0E2] rounded-xl p-1 gap-2 shadow-xs">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-11 h-11 rounded-[9px] bg-[#F1F3F9] hover:bg-[#E2E5F0] text-[#16144F] font-bold text-lg flex items-center justify-center transition active:scale-95 cursor-pointer"
                  aria-label="Diminuer la quantité"
                >
                  −
                </button>
                <output className="min-w-[44px] text-center font-extrabold text-lg text-[#111033]">
                  {qty}
                </output>
                <button
                  type="button"
                  onClick={() => setQty(Math.min(50, qty + 1))}
                  className="w-11 h-11 rounded-[9px] bg-[#F1F3F9] hover:bg-[#E2E5F0] text-[#16144F] font-bold text-lg flex items-center justify-center transition active:scale-95 cursor-pointer"
                  aria-label="Augmenter la quantité"
                >
                  +
                </button>
              </div>
            </div>

            {/* Q3: Main Need */}
            <div>
              <span className="block font-bold text-sm sm:text-base text-[#111033] mb-3">
                <span className="text-[#525570] mr-1">03.</span> Quel est votre besoin principal ?
              </span>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Protéger contre le vol",
                  "Suivre ma flotte / mes chauffeurs",
                  "Couper le moteur à distance"
                ].map((item) => (
                  <label
                    key={item}
                    onClick={() => setMainNeed(item)}
                    className={`inline-flex items-center min-h-[44px] px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer transition-all ${
                      mainNeed === item
                        ? 'bg-white border-2 border-[#16144F] text-[#16144F] shadow-xs'
                        : 'bg-white border-[#CBD0E2] text-[#111033] hover:border-[#16144F]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="need"
                      value={item}
                      checked={mainNeed === item}
                      onChange={() => setMainNeed(item)}
                      className="sr-only"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Q4: Timeframe */}
            <div>
              <span className="block font-bold text-sm sm:text-base text-[#111033] mb-3">
                <span className="text-[#525570] mr-1">04.</span> Quand souhaitez-vous installer le traceur ?
              </span>
              <div className="flex flex-wrap gap-2.5">
                {["Cette semaine", "Ce mois-ci", "Je me renseigne"].map((item) => (
                  <label
                    key={item}
                    onClick={() => setTimeframe(item)}
                    className={`inline-flex items-center min-h-[44px] px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer transition-all ${
                      timeframe === item
                        ? 'bg-white border-2 border-[#16144F] text-[#16144F] shadow-xs'
                        : 'bg-white border-[#CBD0E2] text-[#111033] hover:border-[#16144F]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="timeframe"
                      value={item}
                      checked={timeframe === item}
                      onChange={() => setTimeframe(item)}
                      className="sr-only"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Q5: Contact info */}
            <div>
              <span className="block font-bold text-sm sm:text-base text-[#111033] mb-3">
                <span className="text-[#525570] mr-1">05.</span> Vos coordonnées
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Votre prénom"
                  className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-[#CBD0E2] bg-white text-sm text-[#111033] focus:outline-none focus:border-[#16144F] focus:ring-2 focus:ring-[#16144F]/10 transition"
                  required
                />
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="Numéro WhatsApp (ex. 656...)"
                  className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-[#CBD0E2] bg-white text-sm text-[#111033] focus:outline-none focus:border-[#16144F] focus:ring-2 focus:ring-[#16144F]/10 transition"
                  required
                />
              </div>

              {/* City Choice */}
              <div className="flex flex-wrap gap-2.5">
                {["Yaoundé", "Douala", "Autre ville"].map((c) => (
                  <label
                    key={c}
                    onClick={() => setCityName(c)}
                    className={`inline-flex items-center min-h-[40px] px-3.5 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      cityName === c
                        ? 'bg-white border-2 border-[#16144F] text-[#16144F] shadow-xs'
                        : 'bg-white border-[#CBD0E2] text-[#111033] hover:border-[#16144F]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="city"
                      value={c}
                      checked={cityName === c}
                      onChange={() => setCityName(c)}
                      className="sr-only"
                    />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Summary Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <aside className="bg-[#16144F] text-white rounded-2xl p-7 sm:p-8 shadow-xl">
              <div className="text-[11px] uppercase tracking-wider text-[#BFC3E6] font-bold mb-2.5">
                Votre estimation
              </div>

              <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1.5 tracking-tight leading-tight">
                {estMainText}
              </div>

              <div className="text-xs text-[#D7D9EE] mb-6 min-h-[20px]">
                {estSubText}
              </div>

              {/* Guarantees checklist */}
              <ul className="border-y border-white/15 py-4 mb-6 space-y-2.5 text-xs text-[#E6E8F8]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6B35] stroke-[2.5] shrink-0" />
                  <span>Garantie boîtier 1 an incluse</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6B35] stroke-[2.5] shrink-0" />
                  <span>Installation à Yaoundé et Douala</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6B35] stroke-[2.5] shrink-0" />
                  <span>Application smartphone incluse</span>
                </li>
              </ul>

              {/* Error box */}
              {errorMessage && (
                <div className="text-xs font-semibold text-[#FFD1C2] mb-3 flex items-center gap-1.5 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#FF6B35]" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Success box */}
              {submitSuccess && (
                <div className="text-xs font-semibold text-emerald-300 mb-3 flex items-center gap-1.5 animate-in fade-in bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Demande enregistrée ! Ouverture de WhatsApp...</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[50px] rounded-xl bg-[#FF6B35] hover:bg-[#F25A22] text-[#0E0D33] font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-[#FF6B35]/25 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#0E0D33]" />
                    <span>Enregistrement en cours...</span>
                  </>
                ) : (
                  <>
                    <span>Recevoir mon offre sur WhatsApp</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>

              <p className="mt-3 text-[11px] text-[#BFC3E6] text-center leading-relaxed">
                Sans engagement. Vos informations servent uniquement à vous répondre sur WhatsApp.
              </p>
            </aside>
          </div>

        </form>

      </div>
    </section>
  );
}
