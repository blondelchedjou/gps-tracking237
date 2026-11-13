import React from 'react';
import { ClipboardList, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: ClipboardList,
      title: "Remplissez le devis en 1 minute",
      desc: "Indiquez votre type de véhicule et votre ville. Notre conseiller vous confirme le tarif exact et planifie un créneau d'installation à votre convenance."
    },
    {
      num: "02",
      icon: Wrench,
      title: "Installation discrète en 45 minutes",
      desc: "Nos techniciens électriciens se déplacent à votre domicile, parking ou bureau à Yaoundé et Douala. Le boîtier est invisible sous le tableau de bord."
    },
    {
      num: "03",
      icon: ShieldCheck,
      title: "Prenez le contrôle 24h/24",
      desc: "Nous installons l'application sur votre smartphone et vous montrons comment localiser, couper le moteur en direct et définir vos alertes de sécurité."
    }
  ];

  return (
    <section className="py-20 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full inline-block mb-3">
            ⚡ Processus Simple & Rapide
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Protégez votre véhicule en 3 étapes faciles
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            Zéro tracas technique. Notre équipe s'occupe de tout, de la configuration au paramétrage sur votre téléphone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-7 relative transition hover:border-slate-700 hover:bg-slate-900/90"
              >
                <div className="text-5xl font-black text-slate-800 mb-4 select-none">
                  {st.num}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

