import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Comparison from './components/Comparison';
import Features from './components/Features';
import Pricing from './components/Pricing';
import HowItWorks from './components/HowItWorks';
import QuoteForm from './components/QuoteForm';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero with interactive simulator */}
        <Hero />

        {/* Cameroon terrain reality: Before / After */}
        <Comparison />

        {/* Advanced Features & Hardware Quality */}
        <Features />

        {/* Transparent Pricing Cards */}
        <Pricing />

        {/* 3 Simple Steps */}
        <HowItWorks />

        {/* Lead Quote Form with WhatsApp scoring */}
        <section className="py-20 bg-slate-950 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <QuoteForm />
          </div>
        </section>

        {/* Social Proof & Customer Reviews */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <Faq />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating CTA buttons */}
      <FloatingWhatsApp />
    </div>
  );
}

