import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Send, 
  CheckCircle2, 
  ShieldAlert, 
  Car, 
  Bike, 
  Truck, 
  MapPin, 
  User, 
  Phone, 
  Sparkles,
  HelpCircle,
  Clock
} from 'lucide-react';
import { VEHICLE_OPTIONS, WHATSAPP_NUMBER } from '../data/landingData';

export default function QuoteForm() {
  const [selectedVehicle, setSelectedVehicle] = useState('voiture');
  const [quantity, setQuantity] = useState(1);
  const [mainNeed, setMainNeed] = useState('Protéger contre le vol');
  const [timeframe, setTimeframe] = useState('Cette semaine');
  const [city, setCity] = useState('Douala');
  const [fullName, setFullName] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const vehicleObj = VEHICLE_OPTIONS.find(v => v.id === selectedVehicle) || VEHICLE_OPTIONS[1];

  // Dynamic pricing calculation
  const calculateTotal = () => {
    if (quantity >= 6) {
      return { isFleet: true, total: null, unitPrice: null };
    }
    const unitPrice = quantity >= 3 ? Math.round(vehicleObj.basePrice * 0.9) : vehicleObj.basePrice;
    const total = unitPrice * quantity;
    return { isFleet: false, total, unitPrice, discountApplied: quantity >= 3 };
  };

  const pricing = calculateTotal();

  const formatFcfa = (val) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " FCFA";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setErrorMessage("Veuillez saisir votre prénom ou nom complet.");
      return;
    }

    const cleanPhone = whatsappPhone.replace(/[^\d+]/g, '');
    if (cleanPhone.replace(/\D/g, '').length < 9) {
      setErrorMessage("Veuillez entrer un numéro WhatsApp camerounais valide (ex: 656 73 75 41).");
      return;
    }

    setErrorMessage('');

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#f97316', '#22c55e', '#3b82f6', '#ffffff']
      });
    } catch (err) {
      // safe fallback
    }

    // Lead scoring
    let leadBadge = "TIÈDE 💡";
    if (quantity >= 6) {
      leadBadge = "FLOTTE PROFESSIONNELLE 🚛💼";
    } else if (timeframe === "Cette semaine") {
      leadBadge = "URGENT / CHAUD 🔥";
    }

    const priceText = pricing.isFleet 
      ? `Flotte ${quantity} véhicules - Devis Grand Compte`
      : `${formatFcfa(pricing.total)} (${quantity}x ${formatFcfa(pricing.unitPrice)})`;

    const message = 
`Bonjour GPS Tracking Cameroun,
Je viens de faire une estimation en ligne pour sécuriser mes véhicules :

👤 *Nom :* ${fullName}
📍 *Ville :* ${city}
📱 *WhatsApp :* ${cleanPhone}
🚗 *Véhicule :* ${vehicleObj.name}
🔢 *Quantité :* ${quantity} véhicule(s)
🎯 *Besoin :* ${mainNeed}
⏳ *Délai souhaité :* ${timeframe}
💰 *Estimation :* ${priceText}
⭐ *Statut prospect :* [${leadBadge}]

Pouvez-vous me confirmer la disponibilité et planifier l'installation ? Merci !`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    setIsSuccess(true);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div id="devis" className="relative scroll-mt-24">
      {/* Decorative gradient glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/30 via-emerald-500/20 to-blue-600/30 rounded-3xl blur-2xl opacity-60"></div>

      <div className="relative bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
        
        {/* Header inside form */}
        <div className="max-w-2xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Devis Express Gratuit · Réponse en 5 minutes
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Configurez votre traceur & recevez votre devis sur WhatsApp
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            Répondez à ces quelques questions : nous calculons votre prix promo avec installation offerte et vous répondons immédiatement sur WhatsApp.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-7">
          
          {/* Step 1: Vehicle selection */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-200 flex items-center justify-between">
              <span>1. Quel type de véhicule voulez-vous équiper ?</span>
              <span className="text-xs text-orange-400 font-semibold">Garantie 1 an incluse</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {VEHICLE_OPTIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedVehicle(item.id)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer relative ${
                    selectedVehicle === item.id
                      ? 'bg-orange-500/15 border-orange-500 ring-2 ring-orange-500/40 text-white'
                      : 'bg-slate-800/80 border-slate-700/80 hover:border-slate-600 text-slate-300'
                  }`}
                >
                  {item.popular && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                      Promo
                    </span>
                  )}
                  <span className="text-2xl block mb-1">{item.icon}</span>
                  <span className="text-xs font-bold block">{item.name.split(' ')[0]}</span>
                  <span className="text-[11px] text-orange-400 font-semibold block mt-1">
                    {formatFcfa(item.basePrice)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Quantity */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-200 block">
              2. Nombre de véhicules à équiper :
            </label>
            <div className="flex items-center gap-4 bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80">
              <button
                type="button"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="w-10 h-10 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-extrabold text-lg flex items-center justify-center transition active:scale-95 cursor-pointer"
              >
                −
              </button>
              <div className="flex-1 text-center">
                <span className="text-2xl font-extrabold text-white">{quantity}</span>
                <span className="text-xs text-slate-400 block">
                  {quantity > 1 ? 'véhicules' : 'véhicule'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setQuantity(prev => Math.min(50, prev + 1))}
                className="w-10 h-10 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-extrabold text-lg flex items-center justify-center transition active:scale-95 cursor-pointer"
              >
                +
              </button>
            </div>
            {quantity >= 3 && quantity < 6 && (
              <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Remise multi-véhicules de 10% appliquée automatiquement !
              </p>
            )}
            {quantity >= 6 && (
              <p className="text-xs text-blue-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Option Grand Compte / Flotte : Tarif négocié et audit de flotte offert.
              </p>
            )}
          </div>

          {/* Step 3: Main Need */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-200 block">
              3. Quel est votre besoin prioritaire ?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { label: "Sécurité antivol & braquage", icon: "🛡️" },
                { label: "Surveillance chauffeurs & taxis", icon: "👀" },
                { label: "Coupure moteur & contrôle km", icon: "⏻" }
              ].map((need, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMainNeed(need.label)}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center gap-2.5 transition cursor-pointer ${
                    mainNeed === need.label
                      ? 'bg-slate-800 border-orange-500 text-white shadow-sm ring-1 ring-orange-500'
                      : 'bg-slate-800/50 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-base">{need.icon}</span>
                  <span>{need.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Urgency / Timeframe */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-200 block">
              4. Dans quel délai souhaitez-vous l'installation ?
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {["Cette semaine", "Ce mois-ci", "Simple renseignement"].map((tf, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTimeframe(tf)}
                  className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition cursor-pointer ${
                    timeframe === tf
                      ? 'bg-orange-500/20 border-orange-500 text-orange-300 ring-1 ring-orange-500/30'
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Step 5: Contact Info & City */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-200 block">
              5. Vos coordonnées pour recevoir l'offre :
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Votre nom ou prénom"
                  className="w-full bg-slate-800/90 border border-slate-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition"
                  required
                />
              </div>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  placeholder="Numéro WhatsApp (ex: 656 73 75 41)"
                  className="w-full bg-slate-800/90 border border-slate-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition"
                  required
                />
              </div>
            </div>

            {/* City choice */}
            <div className="flex flex-wrap gap-2 pt-1">
              {["Douala", "Yaoundé", "Autre ville (Cameroun)"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCity(c)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                    city === c
                      ? 'bg-slate-700 border-slate-500 text-white'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <MapPin className="w-3 h-3 text-orange-400" />
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Estimation Card */}
          <div className="bg-gradient-to-r from-slate-800/90 to-slate-800/50 border border-slate-700/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
                Estimation immédiate
              </span>
              {pricing.isFleet ? (
                <div>
                  <span className="text-xl sm:text-2xl font-extrabold text-blue-400">
                    Tarif Flotte Sur Mesure
                  </span>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    Remise volume jusqu'à −25% + Formation équipe offerte
                  </span>
                </div>
              ) : (
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-orange-400">
                      {formatFcfa(pricing.total)}
                    </span>
                    {quantity > 1 && (
                      <span className="text-xs text-slate-400">
                        ({quantity} × {formatFcfa(pricing.unitPrice)})
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-emerald-400 font-medium block mt-0.5">
                    ✔ Boîtier + Pose discrète + App mobile à vie sans abonnement
                  </span>
                </div>
              )}
            </div>

            <div className="text-right sm:text-right w-full sm:w-auto">
              <span className="text-[11px] text-slate-400 bg-slate-900/60 px-2.5 py-1 rounded-md border border-slate-700 inline-block">
                📍 Déplacement gratuit à {city.includes('Autre') ? 'convenir' : city}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-red-200 text-xs font-medium flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-base sm:text-lg shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <Send className="w-5 h-5" />
              <span>Recevoir mon offre & réserver sur WhatsApp</span>
            </button>
            <p className="text-center text-xs text-slate-400 mt-2.5">
              🔒 100% sans engagement. Vos données ne sont jamais partagées à des tiers.
            </p>
          </div>
        </form>

        {isSuccess && (
          <div className="mt-6 p-4 bg-emerald-950/70 border border-emerald-500/40 rounded-2xl text-center max-w-xl mx-auto">
            <p className="text-xs sm:text-sm text-emerald-200 font-medium">
              ✅ Redirection vers WhatsApp en cours... Si la fenêtre ne s'ouvre pas automatiquement, 
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                target="_blank" 
                rel="noreferrer"
                className="underline font-bold text-white ml-1 hover:text-emerald-300"
              >
                cliquez ici pour ouvrir WhatsApp
              </a>.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

