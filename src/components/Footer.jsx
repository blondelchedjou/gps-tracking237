import React from 'react';
import { PHONE_DISPLAY_1, PHONE_DISPLAY_2, EMAIL_DISPLAY, SOCIAL_HANDLE } from '../data/landingData';

export default function Footer() {
  return (
    <footer className="bg-[#0E0D33] text-[#C7CAE2] py-12 pb-28 sm:pb-14 text-sm border-t border-white/10">
      <div className="max-w-[1120px] mx-auto px-5">
        <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-8 items-start sm:items-center">
          
          {/* Left Info */}
          <div className="space-y-1.5 leading-relaxed">
            <strong className="text-white font-extrabold text-base block">
              GPS Tracking Cameroun
            </strong>
            <p className="text-xs sm:text-sm text-[#A5A9CC]">
              Traceurs GPS, alarmes antivol, coupure moteur et caméras de recul.<br />
              Yaoundé &amp; Douala, Cameroun · <a href={`tel:${PHONE_DISPLAY_1.replace(/\s+/g, '')}`} className="text-white hover:text-[#FF6B35] transition">{PHONE_DISPLAY_1}</a> · <a href={`tel:${PHONE_DISPLAY_2.replace(/\s+/g, '')}`} className="text-white hover:text-[#FF6B35] transition">{PHONE_DISPLAY_2}</a>
            </p>
          </div>

          {/* Right Info */}
          <div className="text-left sm:text-right space-y-1 text-xs sm:text-sm text-[#A5A9CC]">
            <a href={`mailto:${EMAIL_DISPLAY}`} className="hover:text-white transition block">
              {EMAIL_DISPLAY}
            </a>
            <p>
              Facebook &amp; Instagram : <span className="text-white font-semibold">{SOCIAL_HANDLE}</span>
            </p>
            <p className="text-[11px] text-[#71769F] pt-1">
              © {new Date().getFullYear()} GPS Tracking Cameroun. Tous droits réservés.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
