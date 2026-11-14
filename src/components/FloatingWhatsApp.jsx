import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { PHONE_DISPLAY_1, WHATSAPP_NUMBER } from '../data/landingData';

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour, je souhaite un devis GPS pour mon véhicule.")}`;

  return (
    <>
      {/* Desktop Floating WhatsApp Button */}
      <div className="hidden sm:block fixed bottom-6 right-6 z-40">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discuter sur WhatsApp avec GPS Tracking"
          className="inline-flex items-center gap-2.5 min-h-[48px] px-5 py-2.5 rounded-full bg-[#16144F] hover:bg-[#0E0D33] text-white border border-white/20 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl font-bold text-sm select-none"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse"></span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
          <span>WhatsApp</span>
        </a>
      </div>

      {/* Mobile Streamlined Bottom Fixed Bar (Épurée & Optimisée) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#16144F]/95 backdrop-blur-md border-t border-white/10 px-4 py-2.5 pb-[max(10px,env(safe-area-inset-bottom))] flex items-center gap-2.5 shadow-2xl">
        <a
          href={`tel:${PHONE_DISPLAY_1.replace(/\s+/g, '')}`}
          className="flex-1 min-h-[44px] rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 border border-white/10"
        >
          <Phone className="w-3.5 h-3.5 text-[#FF6B35]" />
          <span>Appeler</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[2] min-h-[44px] rounded-xl bg-[#FF6B35] hover:bg-[#F25A22] text-[#0E0D33] font-extrabold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md shadow-[#FF6B35]/20"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Devis WhatsApp</span>
        </a>
      </div>
    </>
  );
}
