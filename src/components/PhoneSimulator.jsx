import React, { useState, useEffect } from 'react';
import { 
  Power, 
  MapPin, 
  ShieldCheck, 
  Activity, 
  Navigation, 
  RotateCcw, 
  AlertTriangle,
  BatteryCharging,
  Wifi,
  Radio
} from 'lucide-react';

export default function PhoneSimulator() {
  const [engineCutoff, setEngineCutoff] = useState(false);
  const [speed, setSpeed] = useState(54);
  const [activeTab, setActiveTab] = useState('live'); // 'live' | 'history' | 'geofence'
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    let interval;
    if (!engineCutoff) {
      interval = setInterval(() => {
        setSpeed(prev => Math.max(38, Math.min(65, prev + Math.floor(Math.random() * 7) - 3)));
      }, 2000);
    } else {
      setSpeed(0);
    }
    return () => clearInterval(interval);
  }, [engineCutoff]);

  const handleToggleEngine = () => {
    if (!engineCutoff) {
      setEngineCutoff(true);
      setAlertMessage("🛑 COMMANDE ENVOYÉE : Moteur coupé instantanément à distance ! Redémarrage bloqué.");
      setTimeout(() => setAlertMessage(null), 6000);
    } else {
      setEngineCutoff(false);
      setAlertMessage("⚡ Contact réactivé avec succès. Le conducteur peut redémarrer.");
      setTimeout(() => setAlertMessage(null), 4000);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[360px] select-none">
      {/* Decorative Glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-emerald-500/20 to-blue-500/20 rounded-[50px] blur-xl opacity-70"></div>

      {/* Phone Case Outer */}
      <div className="relative bg-slate-900 rounded-[44px] p-3 shadow-2xl border-4 border-slate-700/80 ring-1 ring-white/10">
        
        {/* Speaker / Notch */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-full flex items-center justify-center gap-2 z-30">
          <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700"></div>
        </div>

        {/* Screen */}
        <div className="relative bg-slate-950 rounded-[34px] overflow-hidden border border-slate-800 text-slate-100 flex flex-col h-[560px]">
          
          {/* Top Status Bar */}
          <div className="pt-3 px-6 pb-2 flex justify-between items-center text-[11px] font-semibold text-slate-400 bg-slate-900/90 border-b border-slate-800/80">
            <span>12:45</span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              GPS SAT 12/12
            </span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Wifi className="w-3 h-3 text-emerald-400" />
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          {/* App Header */}
          <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold text-xs">
                GPS
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  Toyota RAV4 · LT 482 EK
                  <span className={`w-2 h-2 rounded-full ${engineCutoff ? 'bg-red-500 ring-2 ring-red-500/30' : 'bg-emerald-500 ring-2 ring-emerald-500/30'}`}></span>
                </div>
                <div className="text-[10px] text-slate-400">Akwa, Douala · En ligne</div>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${engineCutoff ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                {engineCutoff ? 'MOTEUR COUPÉ' : 'EN ROUTE'}
              </span>
            </div>
          </div>

          {/* Live Map Area */}
          <div className="relative flex-1 bg-slate-900/70 overflow-hidden">
            {/* Stylized Vector Map */}
            <svg className="w-full h-full object-cover" viewBox="0 0 320 280">
              {/* Land / District colors */}
              <rect width="320" height="280" fill="#0f172a" />
              <path d="M 0,40 Q 90,80 180,60 T 320,30 L 320,0 L 0,0 Z" fill="#1e293b" opacity="0.6" />
              <path d="M 60,280 Q 140,200 240,240 T 320,220 L 320,280 Z" fill="#1e293b" opacity="0.4" />
              
              {/* River Wouri / Coast representation */}
              <path d="M -20,120 C 60,110 100,160 140,190 C 200,230 260,200 340,250" stroke="#0284c7" strokeWidth="18" fill="none" opacity="0.3" />
              
              {/* Roads (Douala Akwa / Bonanjo grid) */}
              <path d="M 0,90 L 320,110" stroke="#334155" strokeWidth="4" />
              <path d="M 0,160 L 320,170" stroke="#334155" strokeWidth="5" />
              <path d="M 120,0 L 140,280" stroke="#334155" strokeWidth="4" />
              <path d="M 230,0 L 210,280" stroke="#475569" strokeWidth="6" />
              <path d="M 40,220 L 290,50" stroke="#334155" strokeWidth="3" strokeDasharray="6 4" />

              {/* Vehicle Trajectory Line */}
              <path 
                d="M 50,180 Q 120,165 170,120 T 230,85" 
                stroke="#f97316" 
                strokeWidth="3.5" 
                fill="none" 
                strokeDasharray="5 4" 
              />

              {/* Map Landmarks */}
              <text x="18" y="82" fill="#94a3b8" fontSize="8" fontWeight="600">Bd de la Liberté</text>
              <text x="150" y="24" fill="#94a3b8" fontSize="8" fontWeight="600">Rond-point Deïdo</text>
              <text x="235" y="160" fill="#94a3b8" fontSize="8" fontWeight="600">Avenue Castelnau</text>

              {/* Vehicle Marker */}
              <g className={`transition-transform duration-700 ${engineCutoff ? '' : 'translate-x-1 -translate-y-1'}`}>
                {/* Geofence or radar pulse */}
                {!engineCutoff && (
                  <circle cx="215" cy="98" r="24" fill="#f97316" opacity="0.25" className="animate-ping" style={{ transformOrigin: '215px 98px' }} />
                )}
                <circle cx="215" cy="98" r="16" fill={engineCutoff ? "#ef4444" : "#f97316"} opacity="0.3" />
                <circle cx="215" cy="98" r="8" fill={engineCutoff ? "#dc2626" : "#ea580c"} stroke="#ffffff" strokeWidth="2.5" />
                <circle cx="215" cy="98" r="3" fill="#ffffff" />
              </g>
            </svg>

            {/* Floating Telemetry Box inside map */}
            <div className="absolute top-2 left-2 right-2 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-700/60 shadow-lg">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Vitesse</span>
                  <span className={`font-extrabold text-sm ${engineCutoff ? 'text-red-400' : 'text-orange-400'}`}>
                    {speed} <span className="text-[10px] font-normal text-slate-400">km/h</span>
                  </span>
                </div>
                <div className="border-x border-slate-700/60 px-1">
                  <span className="text-[10px] text-slate-400 block">Aujourd'hui</span>
                  <span className="font-extrabold text-sm text-slate-200">
                    42.8 <span className="text-[10px] font-normal text-slate-400">km</span>
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Batterie</span>
                  <span className="font-extrabold text-sm text-emerald-400">
                    13.9 <span className="text-[10px] font-normal text-slate-400">V</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Live interactive notification when cutoff is pressed */}
            {alertMessage && (
              <div className="absolute bottom-3 left-2 right-2 bg-red-950/95 border border-red-500/80 rounded-xl p-2.5 shadow-xl text-left animate-bounce">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] leading-tight font-medium text-red-200">{alertMessage}</p>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Simulation Controls */}
          <div className="p-3.5 bg-slate-900 border-t border-slate-800 space-y-2.5">
            <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
              <span>Testez le simulateur en direct :</span>
              <span className="text-[10px] text-orange-400 flex items-center gap-1">
                <Radio className="w-3 h-3 animate-pulse" /> Démo interactive
              </span>
            </div>

            {/* Big Cutoff Action Button */}
            <button
              onClick={handleToggleEngine}
              type="button"
              className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer ${
                engineCutoff 
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40 ring-2 ring-emerald-400/50' 
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/50 ring-2 ring-red-400/40 animate-pulse'
              }`}
            >
              <Power className="w-4 h-4" />
              {engineCutoff ? "⚡ Rétablir le contact moteur" : "⏻ Couper le moteur à distance"}
            </button>

            {/* Quick action bar */}
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <button 
                type="button" 
                onClick={() => alert("📍 Zone de sécurité active : Périmètre de 15 km autour d'Akwa et Bonanjo configuré. Alerte SMS immédiate si le véhicule sort.")}
                className="py-1.5 px-1 text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 text-center transition flex flex-col items-center gap-0.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                Zone Géofence
              </button>
              <button 
                type="button" 
                onClick={() => alert("🕘 Historique 90 jours : Retrouvez tous les arrêts, trajets et excès de vitesse enregistrés.")}
                className="py-1.5 px-1 text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 text-center transition flex flex-col items-center gap-0.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                Rejouer Trajet
              </button>
              <button 
                type="button" 
                onClick={() => alert("📊 Rapport journalier : 42.8 km parcourus, 4 arrêts, vitesse moyenne 34 km/h.")}
                className="py-1.5 px-1 text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 text-center transition flex flex-col items-center gap-0.5"
              >
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                Rapport Km
              </button>
            </div>
          </div>

          {/* Bottom Home Indicator */}
          <div className="py-2 flex justify-center bg-slate-900">
            <div className="w-24 h-1 bg-slate-700 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <p className="text-xs text-slate-400 font-medium">
          👆 <strong className="text-orange-400">Cliquez sur le bouton rouge</strong> pour voir la coupure moteur en action.
        </p>
      </div>
    </div>
  );
}

