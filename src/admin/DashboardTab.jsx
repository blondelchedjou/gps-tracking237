import React from 'react';
import { 
  Users, DollarSign, TrendingUp, CheckCircle2, Clock, 
  MapPin, Car, Phone, MessageCircle, AlertCircle, ArrowUpRight 
} from 'lucide-react';

export default function DashboardTab({ quotes, invoices, onSelectTab, onOpenQuote }) {
  // Helpers
  const formatPrice = (val) => {
    return (val || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " FCFA";
  };

  const totalQuotes = quotes.length;
  const newQuotes = quotes.filter(q => q.status === 'nouveau').length;
  const installedQuotes = quotes.filter(q => q.status === 'installé').length;
  const conversionRate = totalQuotes > 0 ? Math.round((installedQuotes / totalQuotes) * 100) : 0;

  // Potential revenue from active quotes
  const potentialRevenue = quotes.reduce((acc, q) => {
    if (q.status !== 'annulé') {
      const price = q.unitPrice && q.qty ? q.unitPrice * q.qty : 0;
      return acc + price;
    }
    return acc;
  }, 0);

  // Paid revenue from invoices
  const paidInvoicesRevenue = invoices.reduce((acc, inv) => {
    return acc + (inv.amountPaid || (inv.status === 'payé' ? inv.totalAmount : 0) || 0);
  }, 0);

  // Breakdown by city
  const doualaCount = quotes.filter(q => (q.cityName || '').toLowerCase().includes('douala')).length;
  const yaoundeCount = quotes.filter(q => (q.cityName || '').toLowerCase().includes('yaoundé') || (q.cityName || '').toLowerCase().includes('yaounde')).length;
  const otherCityCount = Math.max(0, totalQuotes - doualaCount - yaoundeCount);

  // Breakdown by vehicle type
  const vehicleStats = quotes.reduce((acc, q) => {
    const label = (q.vehicleLabel || 'Autre').split(' ')[0];
    acc[label] = (acc[label] || 0) + (q.qty || 1);
    return acc;
  }, {});

  // High priority leads (Hot or Fleet)
  const priorityLeads = quotes
    .filter(q => q.status === 'nouveau' || q.leadTag === 'CHAUD' || q.leadTag === 'FLOTTE')
    .slice(0, 5);

  return (
    <div className="space-y-8">
      
      {/* Top Welcome & Notification Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-[#16144F] to-[#252270] text-white p-6 rounded-2xl border border-white/10 shadow-lg">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Vue d'ensemble de l'activité
          </h2>
          <p className="text-sm text-[#CBD0E2] mt-1">
            Données synchronisées en temps réel depuis Cloud Firestore
          </p>
        </div>
        {newQuotes > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF6B35] text-[#0E0D33] text-sm font-extrabold shadow-md animate-pulse">
            <AlertCircle className="w-4 h-4 stroke-[2.5]" />
            <span>{newQuotes} nouveau{newQuotes > 1 ? 'x' : ''} devis à traiter</span>
          </div>
        )}
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Quotes */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E5F0] shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Total Devis</span>
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#16144F] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#111033]">{totalQuotes}</span>
            {newQuotes > 0 && (
              <span className="text-xs font-bold text-[#FF6B35] bg-[#FFF2ED] px-2 py-0.5 rounded-full">
                {newQuotes} en attente
              </span>
            )}
          </div>
          <div className="mt-2 text-xs text-[#6B7280]">
            Demandes générées via la landing page
          </div>
        </div>

        {/* Chiffre d'Affaires Encaissé */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E5F0] shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">CA Facturé / Encaissé</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-[1.7rem] font-extrabold text-[#111033]">
              {formatPrice(paidInvoicesRevenue)}
            </span>
          </div>
          <div className="mt-2 text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Paiements confirmés via factures</span>
          </div>
        </div>

        {/* Chiffre d'Affaires Potentiel */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E5F0] shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">CA Potentiel Estimé</span>
            <div className="w-10 h-10 rounded-xl bg-[#FFF2ED] text-[#FF6B35] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-[1.7rem] font-extrabold text-[#111033]">
              {formatPrice(potentialRevenue)}
            </span>
          </div>
          <div className="mt-2 text-xs text-[#6B7280]">
            Sur l'ensemble des devis actifs
          </div>
        </div>

        {/* Taux de Conversion */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E5F0] shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Taux de Clôture</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#111033]">{conversionRate}%</span>
            <span className="text-xs text-[#6B7280]">({installedQuotes} poses finies)</span>
          </div>
          <div className="mt-2 text-xs text-[#6B7280]">
            De la visite à l'installation confirmée
          </div>
        </div>

      </div>

      {/* Middle Section: Geographic and Vehicle Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Ville Repartition */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E5F0] shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-extrabold text-[#111033] text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FF6B35]" />
              <span>Répartition Géographique</span>
            </h3>
            <span className="text-xs text-[#6B7280] font-medium">{totalQuotes} localisations</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-[#111033] mb-1.5">
                <span>Douala (Capitale économique)</span>
                <span>{doualaCount} devis ({totalQuotes > 0 ? Math.round((doualaCount / totalQuotes) * 100) : 0}%)</span>
              </div>
              <div className="w-full h-3 bg-[#F1F3F9] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#16144F] rounded-full transition-all duration-500" 
                  style={{ width: `${totalQuotes > 0 ? (doualaCount / totalQuotes) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#111033] mb-1.5">
                <span>Yaoundé (Centre & Environs)</span>
                <span>{yaoundeCount} devis ({totalQuotes > 0 ? Math.round((yaoundeCount / totalQuotes) * 100) : 0}%)</span>
              </div>
              <div className="w-full h-3 bg-[#F1F3F9] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#FF6B35] rounded-full transition-all duration-500" 
                  style={{ width: `${totalQuotes > 0 ? (yaoundeCount / totalQuotes) * 100 : 0}%` }}
                />
              </div>
            </div>

            {otherCityCount > 0 && (
              <div>
                <div className="flex justify-between text-xs font-bold text-[#111033] mb-1.5">
                  <span>Autres villes (Bafoussam, Kribi, etc.)</span>
                  <span>{otherCityCount} devis ({totalQuotes > 0 ? Math.round((otherCityCount / totalQuotes) * 100) : 0}%)</span>
                </div>
                <div className="w-full h-3 bg-[#F1F3F9] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#94A3B8] rounded-full transition-all duration-500" 
                    style={{ width: `${(otherCityCount / totalQuotes) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Vehicle Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E5F0] shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-extrabold text-[#111033] text-base flex items-center gap-2">
              <Car className="w-4 h-4 text-[#16144F]" />
              <span>Demande par Type de Véhicule</span>
            </h3>
            <span className="text-xs text-[#6B7280] font-medium">Quantités cumulées</span>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div className="p-3.5 bg-[#F8F9FC] border border-[#E2E5F0] rounded-xl">
              <span className="block text-xs font-bold text-[#6B7280]">Berline / Taxi</span>
              <span className="text-xl font-extrabold text-[#111033] mt-1 block">
                {vehicleStats['Berline'] || vehicleStats['Voiture'] || 0}
              </span>
            </div>
            <div className="p-3.5 bg-[#F8F9FC] border border-[#E2E5F0] rounded-xl">
              <span className="block text-xs font-bold text-[#6B7280]">SUV &amp; 4x4</span>
              <span className="text-xl font-extrabold text-[#111033] mt-1 block">
                {vehicleStats['SUV'] || 0}
              </span>
            </div>
            <div className="p-3.5 bg-[#F8F9FC] border border-[#E2E5F0] rounded-xl">
              <span className="block text-xs font-bold text-[#6B7280]">Moto / Tricycle</span>
              <span className="text-xl font-extrabold text-[#111033] mt-1 block">
                {vehicleStats['Moto'] || 0}
              </span>
            </div>
            <div className="p-3.5 bg-[#F8F9FC] border border-[#E2E5F0] rounded-xl">
              <span className="block text-xs font-bold text-[#6B7280]">Camion / Poids lourd</span>
              <span className="text-xl font-extrabold text-[#111033] mt-1 block">
                {vehicleStats['Camion'] || 0}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Priority Action Table: Hot Prospects */}
      <div className="bg-white rounded-2xl border border-[#E2E5F0] shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-[#E2E5F0] flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-[#111033] text-base sm:text-lg">
              Prospects Prioritaires à Contacter
            </h3>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Demandes récentes marquées comme "Cette semaine" ou projets de flotte
            </p>
          </div>
          <button
            onClick={() => onSelectTab('quotes')}
            className="text-xs font-bold text-[#FF6B35] hover:text-[#F25A22] flex items-center gap-1 cursor-pointer"
          >
            <span>Voir tous les devis ({totalQuotes})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {priorityLeads.length === 0 ? (
          <div className="p-10 text-center text-[#6B7280] text-sm">
            Aucun prospect prioritaire en attente. Félicitations, tout est à jour !
          </div>
        ) : (
          <div className="divide-y divide-[#E2E5F0] overflow-x-auto">
            {priorityLeads.map((lead) => {
              const waText = encodeURIComponent(
                `Bonjour ${lead.clientName}, c'est GPS Tracking Cameroun. J'ai bien reçu votre demande de devis pour votre ${lead.vehicleLabel} (${lead.qty} véhicule(s)) à ${lead.cityName}. Quand seriez-vous disponible pour que notre technicien passe faire l'installation ?`
              );
              const waUrl = `https://wa.me/${lead.clientPhone.replace(/\D/g, '')}?text=${waText}`;

              return (
                <div key={lead.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#F8F9FC] transition">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#16144F] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                      {(lead.clientName || 'C')[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-[#111033] text-sm sm:text-base">
                          {lead.clientName}
                        </span>
                        {lead.leadTag && (
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            lead.leadTag === 'CHAUD' ? 'bg-red-100 text-red-700' :
                            lead.leadTag === 'FLOTTE' ? 'bg-purple-100 text-purple-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {lead.leadTag}
                          </span>
                        )}
                        <span className="text-[11px] font-semibold text-[#6B7280]">
                          · {lead.cityName}
                        </span>
                      </div>
                      <div className="text-xs text-[#525570] mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span><strong>{lead.vehicleLabel}</strong> × {lead.qty}</span>
                        <span>· Besoin : <em>{lead.mainNeed}</em></span>
                        <span className="text-[#FF6B35] font-bold">· {lead.estimationText}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={`tel:${lead.clientPhone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#CBD0E2] bg-white hover:bg-[#F1F3F9] text-[#16144F] text-xs font-bold transition"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Appeler</span>
                    </a>
                    <button
                      onClick={() => onOpenQuote(lead)}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#F1F3F9] hover:bg-[#E2E5F0] text-[#111033] text-xs font-bold transition cursor-pointer"
                    >
                      <span>Fiche</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
