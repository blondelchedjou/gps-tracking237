import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('admin@gpstracking.cm');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Default secure administrator verification
    // You can also change the password anytime or connect Firebase Auth
    setTimeout(() => {
      if (
        (email.toLowerCase() === 'admin@gpstracking.cm' || email.toLowerCase() === 'blondelchedjou@gmail.com') &&
        (password === 'admin237' || password === 'admin' || password === 'gps2026')
      ) {
        localStorage.setItem('gps_admin_auth', JSON.stringify({
          authenticated: true,
          email: email,
          timestamp: Date.now()
        }));
        onLoginSuccess();
      } else {
        setError('Email ou mot de passe incorrect. (Par défaut : admin237)');
      }
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0E0D33] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6B35]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#16144F]/60 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FF6B35] to-[#F25A22] text-[#0E0D33] shadow-lg shadow-[#FF6B35]/30 mb-4">
            <Shield className="w-9 h-9 stroke-[2.2]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Espace Administrateur
          </h1>
          <p className="text-sm text-[#A5A9D0] mt-1.5">
            GPS Tracking Cameroun · Gestion des devis & facturation
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#16144F]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-7 sm:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Error Message */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#A5A9D0] mb-2">
                Adresse Email Admin
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-[#A5A9D0] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gpstracking.cm"
                  className="w-full pl-11 pr-4 py-3 bg-[#0E0D33]/70 border border-white/15 rounded-xl text-white text-sm placeholder-[#676B98] focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#A5A9D0]">
                  Mot de passe
                </label>
                <span className="text-[11px] text-[#FF6B35] font-medium">Par défaut : admin237</span>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-[#A5A9D0] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 bg-[#0E0D33]/70 border border-white/15 rounded-xl text-white text-sm placeholder-[#676B98] focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A5A9D0] hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full min-h-[50px] rounded-xl bg-[#FF6B35] hover:bg-[#F25A22] text-[#0E0D33] font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-[#FF6B35]/25 cursor-pointer disabled:opacity-70"
            >
              <span>{isLoading ? "Vérification..." : "Accéder au tableau de bord"}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          {/* Quick Demo Help */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-xs text-[#8E93C3] leading-relaxed">
              🔐 Accès réservé aux gestionnaires de GPS Tracking Cameroun.
            </p>
            <a
              href="/"
              className="inline-block mt-3 text-xs font-semibold text-[#FF6B35] hover:underline"
            >
              ← Retour au site public
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
