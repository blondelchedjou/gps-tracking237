import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/landingData';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-slate-950 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700/80 text-orange-400 px-3 py-1 rounded-full text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Réponses à vos Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Questions Fréquentes
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Tout ce que vous devez savoir avant d'équiper votre véhicule.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-5 text-left font-bold text-sm sm:text-base text-white flex items-center justify-between gap-4 cursor-pointer hover:text-orange-400 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-orange-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra Contact question */}
        <div className="mt-10 p-6 bg-slate-900/40 border border-slate-800 rounded-2xl text-center">
          <p className="text-xs sm:text-sm text-slate-300">
            Vous avez une question spécifique sur votre modèle de véhicule ?
          </p>
          <a
            href="#devis"
            className="inline-block mt-3 text-xs font-extrabold text-orange-400 hover:text-orange-300 transition underline underline-offset-4"
          >
            Posez-la directement à notre technicien sur WhatsApp →
          </a>
        </div>

      </div>
    </section>
  );
}

