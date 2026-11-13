import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { PHONE_DISPLAY_1, WHATSAPP_NUMBER } from '../data/landingData';

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour GPS Tracking Cameroun, je souhaite un devis gratuit pour mon véhicule.")}`;

  return (
    <>
      {/* Desktop Floating WhatsApp Button */}
      <div className="hidden sm:block fixed bottom-6 right-6 z-50">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="group relative flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-sm px-4 py-3 rounded-full shadow-2xl shadow-emerald-950/60 transition-all duration-300 hover:scale-105 active:scale-95 border border-emerald-400/40"
        >
          {/* Pulsing ring */}
          <span className="absolute -inset-1 rounded-full bg-emerald-500/40 animate-ping pointer-events-none"></span>
          
          <MessageSquare className="w-5 h-5 fill-white" />
          <span>Devis WhatsApp Direct</span>
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
        </a>
      </div>

      {/* Mobile Bottom Sticky Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2.5 px-4 flex items-center gap-2.5 shadow-2xl">
        <a
          href={`tel:${PHONE_DISPLAY_1.replace(/\s+/g, '')}`}
          className="flex-1 py-3 px-3 bg-slate-900 border border-slate-700/80 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition"
        >
          <Phone className="w-3.5 h-3.5 text-orange-400" />
          <span>Appeler</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-[2] py-3 px-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 active:scale-95 transition"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span>Devis WhatsApp en 1 min</span>
        </a>
      </div>
    </>
  );
}

