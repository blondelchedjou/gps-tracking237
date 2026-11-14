import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Shield, Phone } from 'lucide-react';
import { PHONE_DISPLAY_1 } from '../data/landingData';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Le risque", href: "#risque" },
    { label: "Fonctionnalités", href: "#fonctionnalites" },
    { label: "Tarifs", href: "#tarifs" },
    { label: "En situation", href: "#situation" },
    { label: "Comment ça marche", href: "#etapes" },
    { label: "FAQ", href: "#faq" }
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#F8F9FC]/92 backdrop-blur-md shadow-sm border-b border-[#E2E5F0]' 
            : 'bg-[#F8F9FC] border-b border-[#E2E5F0]'
        }`}
      >
        <div className="max-w-[1120px] mx-auto px-5 h-[72px] sm:h-[80px] flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#top" className="inline-flex items-center gap-2.5 text-[#16144F] font-extrabold text-lg sm:text-xl tracking-tight select-none group">
            <div className="w-9 h-9 rounded-[10px] bg-[#16144F] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M16 7.5C12.96 7.5 10.5 9.96 10.5 13C10.5 17.25 16 23.5 16 23.5C16 23.5 21.5 17.25 21.5 13C21.5 9.96 19.04 7.5 16 7.5Z" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="16" cy="13" r="2.4" fill="#FF6B35"/>
              </svg>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-[#16144F]">GPS Tracking</span>
              <span className="text-xs font-semibold text-[#525570] hidden xs:inline">Cameroun</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[0.93rem] font-semibold text-[#525570]">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href}
                className="hover:text-[#16144F] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF6B35] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a 
              href={`tel:${PHONE_DISPLAY_1.replace(/\s+/g, '')}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#16144F] bg-[#F1F3F9] hover:bg-[#E2E5F0] px-3 py-2 rounded-lg transition"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>{PHONE_DISPLAY_1}</span>
            </a>

            <a
              href="#devis"
              className="inline-flex items-center justify-center min-h-[42px] px-4 sm:px-5 rounded-[10px] bg-[#FF6B35] hover:bg-[#F25A22] text-[#0E0D33] font-bold text-sm transition-all duration-200 active:scale-95 shadow-sm"
            >
              Devis gratuit
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#16144F] hover:bg-[#F1F3F9] transition"
              aria-label="Ouvrir le menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Refined Navigation Overlay / Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F8F9FC] border-b border-[#E2E5F0] px-6 py-5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="flex items-center justify-between py-2.5 text-base font-bold text-[#16144F] border-b border-[#E2E5F0]/60 active:text-[#FF6B35]"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#525570]" />
                </a>
              ))}
            </div>

            <div className="pt-5 flex flex-col gap-3">
              <a
                href="#devis"
                onClick={handleLinkClick}
                className="w-full text-center py-3.5 bg-[#FF6B35] text-[#0E0D33] font-extrabold text-sm rounded-xl shadow-md"
              >
                Obtenir mon devis en 1 minute
              </a>
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#525570] pt-1">
                <span>📍 Yaoundé & Douala</span>
                <span>•</span>
                <span>Garantie 1 an</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
