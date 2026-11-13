import React from 'react';
import { ShieldCheck, Zap, Star, MapPin, Lock, ArrowRight, MessageSquare } from 'lucide-react';
import PhoneSimulator from './PhoneSimulator';
import { WHATSAPP_NUMBER } from '../data/landingData';

export default function Hero() {
  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Sales Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Social proof pill */}
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-full px-3.5 py-1.5 shadow-sm">
              <div className="flex -space-x-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-5 h-5 rounded-full bg-slate-700 border border-slate-900 flex items-center justify-center text-[9px] font-bold text-orange-400">
                    ★
                  </div>
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-300">
                <strong className="text-white">520+ véhicules</strong> protégés à Yaoundé & Douala
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Votre véhicule est volé ? <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
                Coupez le moteur en 1 clic
              </span> et sachez exactement où il est.
            </h1>

            {/* Subtitle with strong pain killer */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Traceur GPS antivol invisible de haute précision pour voiture, moto, taxi et camion. 
              Localisez en direct sur Google Maps, coupez le contact depuis votre téléphone et retrouvez votre bien sans négociation.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#devis"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-extrabold text-base shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2.5 transition active:scale-95 cursor-pointer"
              >
                <span>Calculer mon tarif promo en 1 min</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour GPS Tracking, je souhaite sécuriser mon véhicule. Pouvez-vous me renseigner ?")}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base border border-slate-700/80 flex items-center justify-center gap-2.5 transition cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Conseiller WhatsApp direct</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-300">Garantie 1 an</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-300">Yaoundé & Douala</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-300">Pose en 45 min</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-300">Dès 45 000 FCFA</span>
              </div>
            </div>

          </div>

          {/* Right Column: Phone Simulator */}
          <div id="demo" className="lg:col-span-5 flex justify-center">
            <PhoneSimulator />
          </div>

        </div>
      </div>
    </section>
  );
}

