import React from 'react';
import { 
  Power, 
  MapPin, 
  ShieldAlert, 
  RotateCcw, 
  Compass, 
  Mic, 
  Smartphone,
  Gauge
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Power,
      color: "text-red-400 bg-red-950/60 border-red-800/80",
      glow: "from-red-500/10",
      title: "Coupure & Redémarrage du Moteur à Distance",
      badge: "Fonction Clé Antivol",
      desc: "Un voleur s'empare de votre clé ou braque votre véhicule ? Appuyez sur un bouton dans votre appli mobile : le relais coupe l'injection en toute sécurité. Impossible de redémarrer sans votre feu vert."
    },
    {
      icon: MapPin,
      color: "text-orange-400 bg-orange-950/60 border-orange-800/80",
      glow: "from-orange-500/10",
      title: "Géolocalisation Satellite en Temps Réel",
      badge: "Précision 5 mètres",
      desc: "Visualisez votre véhicule en direct se déplaçant sur les cartes détaillées de Douala, Yaoundé et tout le Cameroun, avec le nom des rues, les carrefours et la vitesse exacte."
    },
    {
      icon: ShieldAlert,
      color: "text-emerald-400 bg-emerald-950/60 border-emerald-800/80",
      glow: "from-emerald-500/10",
      title: "Batterie Interne de Secours & Alerte Débranchement",
      badge: "Anti-Sabotage",
      desc: "Si le voleur coupe les fils de la batterie principale de la voiture, le traceur bascule automatiquement sur sa batterie interne autonome et vous envoie une alerte immédiate sur votre téléphone."
    },
    {
      icon: RotateCcw,
      color: "text-blue-400 bg-blue-950/60 border-blue-800/80",
      glow: "from-blue-500/10",
      title: "Relecture & Historique des Trajets sur 90 Jours",
      badge: "Contrôle Chauffeurs",
      desc: "Rejouez en accéléré chaque déplacement : où le chauffeur s'est garé, combien de temps le moteur est resté allumé à l'arrêt, et les kilomètres réels effectués pour stopper les fausses factures."
    },
    {
      icon: Compass,
      color: "text-purple-400 bg-purple-950/60 border-purple-800/80",
      glow: "from-purple-500/10",
      title: "Périmètre de Sécurité (Geofence)",
      badge: "Alerte Sortie de Zone",
      desc: "Définissez une frontière virtuelle (ex: Bonanjo, Bastos ou la sortie de la ville). Dès que le véhicule franchit cette ligne, vous recevez une notification sonore d'alerte."
    },
    {
      icon: Mic,
      color: "text-amber-400 bg-amber-950/60 border-amber-800/80",
      glow: "from-amber-500/10",
      title: "Écoute Discrète de l'Habitacle",
      badge: "Option Premium",
      desc: "Micro espion miniature haute sensibilité dissimulé dans l'habitacle. Appelez le numéro du traceur pour écouter discrètement en direct ce qui se dit dans la voiture."
    }
  ];

  return (
    <section id="avantages" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700/80 text-orange-400 px-3 py-1 rounded-full text-xs font-bold mb-3">
            <Smartphone className="w-3.5 h-3.5" /> Technologie Discrète & Redoutable
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Tout le contrôle de votre véhicule directement dans votre poche
          </h2>
          <p className="text-base text-slate-300 mt-4 leading-relaxed">
            Nos traceurs GPS professionnels sont équipés des composants les plus fiables du marché pour garantir une localisation sans faille, même en sous-sol ou en zone reculée.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div 
                key={index} 
                className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/5 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${feat.color} shadow-lg transition-transform group-hover:scale-110`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700/80 px-2.5 py-1 rounded-full">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 leading-snug group-hover:text-orange-400 transition">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                  <span>Application Android & iOS</span>
                  <span className="text-emerald-400 font-semibold">100% Inclus</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

