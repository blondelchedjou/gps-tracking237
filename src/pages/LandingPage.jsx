import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import ProofSection from '../components/ProofSection';
import HowItWorks from '../components/HowItWorks';
import QuoteForm from '../components/QuoteForm';
import Faq from '../components/Faq';
import FinalCta from '../components/FinalCta';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

export default function LandingPage() {
  const [selectedVehicle, setSelectedVehicle] = useState('Voiture|50000');

  useEffect(() => {
    // Intersection observer for progressive scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = document.querySelectorAll('.reveal-item');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#111033] flex flex-col font-sans antialiased selection:bg-[#FF6B35] selection:text-[#0E0D33]">
      {/* Sleek Header & Mobile Navigation */}
      <Header />

      {/* Main Content */}
      <main id="top" className="flex-1">
        {/* Hero with interactive phone mockup */}
        <Hero />

        {/* Le risque réel (Problème terrain) */}
        <Problem />

        {/* Fonctionnalités & Contrôle */}
        <Features />

        {/* Tarifs promotionnels */}
        <Pricing onSelectVehicle={setSelectedVehicle} />

        {/* Visuels en situation réelle (Nouveau & Convaincant) */}
        <ProofSection />

        {/* 3 étapes simples */}
        <HowItWorks />

        {/* Formulaire de qualification 5 questions & Sticky estimation */}
        <QuoteForm 
          selectedVehicle={selectedVehicle} 
          setSelectedVehicle={setSelectedVehicle} 
        />

        {/* Questions Fréquentes */}
        <Faq />

        {/* Appel à l'action final */}
        <FinalCta />
      </main>

      {/* Footer with subtle admin link */}
      <Footer />

      {/* Floating CTA WhatsApp & Mobile Fixed Bar */}
      <FloatingWhatsApp />
    </div>
  );
}
