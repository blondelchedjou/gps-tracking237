import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/landingData';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#F8F9FC] border-b border-[#E2E5F0]">
      <div className="max-w-[1120px] mx-auto px-5">
        
        {/* Section Head */}
        <div className="max-w-[640px] mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16144F] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF6B35]"></span>
            Questions fréquentes
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111033] tracking-tight mb-3">
            Tout ce qu’il faut savoir avant d’équiper votre véhicule.
          </h2>
        </div>

        {/* Accordion List */}
        <div className="max-w-[780px] space-y-3">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E2E5F0] hover:border-[#CBD0E2] rounded-2xl p-5 sm:p-6 transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 text-left font-bold text-sm sm:text-base text-[#111033] cursor-pointer hover:text-[#16144F] transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#525570] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#16144F]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="mt-3.5 pt-3.5 border-t border-[#E2E5F0] text-sm text-[#525570] leading-relaxed animate-in fade-in duration-150">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
