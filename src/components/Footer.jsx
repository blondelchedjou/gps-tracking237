import React from 'react';
import { Shield, Phone, Mail, MapPin, MessageSquare, Globe } from 'lucide-react';
import { PHONE_DISPLAY_1, PHONE_DISPLAY_2, WHATSAPP_NUMBER } from '../data/landingData';

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-28 sm:pb-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">
                GPS<span className="text-orange-500">TRACKING</span> 237
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Le leader de la sécurité antivol et géolocalisation de véhicules au Cameroun. Suivi en temps réel et coupure du moteur par satellite.
            </p>
            <div className="flex items-center gap-3 pt-1 text-slate-300">
              <span className="text-xs font-semibold text-slate-400">Réseaux :</span>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-orange-400 hover:border-orange-500 transition"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-orange-400 hover:border-orange-500 transition"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Services & Solutions */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#tarifs" className="hover:text-orange-400 transition">Traceur Moto & Tricycle</a></li>
              <li><a href="#tarifs" className="hover:text-orange-400 transition">Traceur Véhicule Particulier</a></li>
              <li><a href="#tarifs" className="hover:text-orange-400 transition">Gestion Flotte Taxi & VTC</a></li>
              <li><a href="#tarifs" className="hover:text-orange-400 transition">Traceur Camion & Engins BTP</a></li>
              <li><a href="#avantages" className="hover:text-orange-400 transition">Coupure Moteur Anti-Braquage</a></li>
            </ul>
          </div>

          {/* Col 3: Coverage & Locations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Zones Couvertes</h4>
            <p className="text-slate-400 leading-relaxed">
              Intervention à domicile et au bureau 7j/7 :
            </p>
            <ul className="space-y-1.5 text-slate-300">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span><strong>Douala :</strong> Akwa, Bonanjo, Bonapriso, Bassa, Deïdo, Makepe, Bonamoussadi</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span><strong>Yaoundé :</strong> Bastos, Biyem-Assi, Omnisports, Mendong, Nsam, Centre</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>Régions :</strong> Expédition express Bafoussam, Kribi, Bamenda</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Hotline */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact & Urgences</h4>
            <div className="space-y-2">
              <a 
                href={`tel:${PHONE_DISPLAY_1.replace(/\s+/g, '')}`} 
                className="flex items-center gap-2 text-white font-bold hover:text-orange-400 transition"
              >
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{PHONE_DISPLAY_1}</span>
              </a>
              <a 
                href={`tel:${PHONE_DISPLAY_2.replace(/\s+/g, '')}`} 
                className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition"
              >
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{PHONE_DISPLAY_2}</span>
              </a>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>WhatsApp Assistance 24/7</span>
              </a>
            </div>
            <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-[11px] text-slate-400 mt-2">
              🛡️ Équipement certifié avec garantie contractuelle de 12 mois.
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-500">
          <p>© {new Date().getFullYear()} GPS Tracking Cameroun. Tous droits réservés.</p>
          <p>Traceurs GPS, alarmes antivol, coupure moteur et caméras de recul au Cameroun.</p>
        </div>

      </div>
    </footer>
  );
}
