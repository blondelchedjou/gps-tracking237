import React, { useState } from 'react';
import { Shield, Phone, MessageSquare, Menu, X, Radio } from 'lucide-react';
import { WHATSAPP_NUMBER, PHONE_DISPLAY_1 } from '../data/landingData';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Flash Announcement Bar */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white text-[11px] sm:text-xs font-bold py-2 px-4 text-center border-b border-orange-500/30 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-full text-[10px] tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Offre du mois
        </span>
        <span>Jusqu'à -37% sur les traceurs GPS + Installation offerte à Yaoundé & Douala !</span>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5">
                GPS<span className="text-orange-500">TRACKING</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 font-bold px-1.5 py-0.2 rounded border border-slate-700">237</span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Yaoundé · Douala · Cameroun
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#demo" className="hover:text-orange-400 transition flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              Simulateur
            </a>
            <a href="#avantages" className="hover:text-orange-400 transition">Fonctionnalités</a>
            <a href="#tarifs" className="hover:text-orange-400 transition">Tarifs Promo</a>
            <a href="#temoignages" className="hover:text-orange-400 transition">Avis Clients</a>
            <a href="#faq" className="hover:text-orange-400 transition">FAQ</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href={`tel:${PHONE_DISPLAY_1.replace(/\s+/g, '')}`}
              className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
            >
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span>{PHONE_DISPLAY_1}</span>
            </a>
            <a 
              href="#devis"
              className="text-xs font-extrabold bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white px-4 py-2.5 rounded-xl shadow-lg shadow-orange-500/25 transition active:scale-95"
            >
              Devis Gratuit
            </a>
          </div>

          {/* Mobile hamburger */}
          <button 
            type="button" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
            <a 
              href="#demo" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-200 border-b border-slate-800/60"
            >
              Simulateur de coupure moteur
            </a>
            <a 
              href="#avantages" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-200 border-b border-slate-800/60"
            >
              Fonctionnalités & Sécurité
            </a>
            <a 
              href="#tarifs" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-200 border-b border-slate-800/60"
            >
              Tarifs & Véhicules
            </a>
            <a 
              href="#temoignages" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-200 border-b border-slate-800/60"
            >
              Témoignages réels
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-200 border-b border-slate-800/60"
            >
              Questions fréquentes
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <a 
                href="#devis" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-orange-500 text-white rounded-xl font-bold text-sm"
              >
                Mon devis gratuit en 1 min
              </a>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                target="_blank" 
                rel="noreferrer"
                className="w-full text-center py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Discuter sur WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

