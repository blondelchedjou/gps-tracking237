import React, { useState } from 'react';
import { 
  Search, Filter, Phone, MessageCircle, FileText, CheckCircle2, 
  Clock, AlertCircle, Trash2, Edit3, Save, X, Calendar, MapPin, 
  Car, Shield, Check, DollarSign 
} from 'lucide-react';

export default function QuotesTab({ quotes, onUpdateStatus, onSaveNotes, onDeleteQuote, onCreateInvoiceFromQuote }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Filtered quotes
  const filteredQuotes = quotes.filter((q) => {
    const matchesSearch = 
      (q.clientName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.clientPhone || '').includes(searchTerm) ||
      (q.cityName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.vehicleLabel || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenDetail = (quote) => {
    setSelectedQuote(quote);
    setEditingNotes(quote.notes || '');
  };

  const handleSaveNotes = async () => {
    if (!selectedQuote) return;
    setIsSavingNotes(true);
    await onSaveNotes(selectedQuote.id, editingNotes);
    setSelectedQuote(prev => ({ ...prev, notes: editingNotes }));
    setIsSavingNotes(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'nouveau':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800">● Nouveau</span>;
      case 'contacté':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800">● Contacté</span>;
      case 'rdv':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-purple-100 text-purple-800">● RDV Planifié</span>;
      case 'installé':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800">● Installé &amp; Payé</span>;
      case 'annulé':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-slate-100 text-slate-600">● Annulé</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-gray-100 text-gray-700">● {status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E5F0] shadow-xs">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par nom, téléphone, ville, véhicule..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FC] border border-[#CBD0E2] rounded-xl text-xs sm:text-sm text-[#111033] placeholder-[#94A3B8] focus:outline-none focus:border-[#FF6B35]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-bold text-[#6B7280] flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filtre :</span>
          </span>
          {[
            { id: 'all', label: 'Tous' },
            { id: 'nouveau', label: 'Nouveaux' },
            { id: 'contacté', label: 'Contactés' },
            { id: 'rdv', label: 'RDV' },
            { id: 'installé', label: 'Installés' },
            { id: 'annulé', label: 'Annulés' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                statusFilter === f.id
                  ? 'bg-[#16144F] text-white shadow-xs'
                  : 'bg-[#F1F3F9] hover:bg-[#E2E5F0] text-[#525570]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-[#E2E5F0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#E2E5F0] text-[11px] font-extrabold uppercase tracking-wider text-[#6B7280]">
                <th className="py-3.5 px-5">Prospect / Client</th>
                <th className="py-3.5 px-4">Véhicule &amp; Qté</th>
                <th className="py-3.5 px-4">Ville</th>
                <th className="py-3.5 px-4">Urgence</th>
                <th className="py-3.5 px-4">Estimation</th>
                <th className="py-3.5 px-4">Statut</th>
                <th className="py-3.5 px-5 text-right">Actions rapides</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E5F0] text-sm">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#6B7280]">
                    Aucun devis trouvé pour ces critères.
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((quote) => {
                  const cleanPhone = (quote.clientPhone || '').replace(/\D/g, '');
                  const waMsg = encodeURIComponent(
                    `Bonjour ${quote.clientName}, c'est GPS Tracking Cameroun. J'ai bien reçu votre demande de devis pour ${quote.vehicleLabel} (${quote.qty} véhicule(s)) à ${quote.cityName}. Je suis disponible pour convenir d'un rendez-vous d'installation à votre domicile ou bureau.`
                  );
                  const waUrl = `https://wa.me/${cleanPhone}?text=${waMsg}`;

                  return (
                    <tr 
                      key={quote.id} 
                      className="hover:bg-[#F8F9FC] transition cursor-pointer"
                      onClick={() => handleOpenDetail(quote)}
                    >
                      {/* Name & Phone */}
                      <td className="py-4 px-5">
                        <div className="font-extrabold text-[#111033] flex items-center gap-2">
                          <span>{quote.clientName}</span>
                          {quote.leadTag && (
                            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                              quote.leadTag === 'CHAUD' ? 'bg-red-100 text-red-700' :
                              quote.leadTag === 'FLOTTE' ? 'bg-purple-100 text-purple-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {quote.leadTag}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[#6B7280] mt-0.5 font-medium">
                          {quote.clientPhone}
                        </div>
                      </td>

                      {/* Vehicle */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-[#111033]">{quote.vehicleLabel}</div>
                        <div className="text-xs text-[#6B7280]">Qté : <strong>{quote.qty}</strong></div>
                      </td>

                      {/* City */}
                      <td className="py-4 px-4 font-semibold text-[#525570]">
                        {quote.cityName}
                      </td>

                      {/* Urgency */}
                      <td className="py-4 px-4 text-xs font-semibold text-[#525570]">
                        {quote.timeframe}
                      </td>

                      {/* Estimation */}
                      <td className="py-4 px-4">
                        <span className="font-extrabold text-[#FF6B35]">
                          {quote.estimationText || '-'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={quote.status || 'nouveau'}
                          onChange={(e) => onUpdateStatus(quote.id, e.target.value)}
                          className="text-xs font-bold py-1.5 px-2.5 rounded-lg border border-[#CBD0E2] bg-white text-[#111033] focus:outline-none focus:border-[#FF6B35] cursor-pointer"
                        >
                          <option value="nouveau">🟡 Nouveau</option>
                          <option value="contacté">🔵 Contacté</option>
                          <option value="rdv">🟣 RDV fixé</option>
                          <option value="installé">🟢 Installé &amp; Payé</option>
                          <option value="annulé">⚪ Annulé</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Ouvrir WhatsApp"
                            className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                          <a
                            href={`tel:${quote.clientPhone}`}
                            title="Appeler"
                            className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => onCreateInvoiceFromQuote(quote)}
                            title="Créer Facture / Reca"
                            className="p-2 rounded-lg bg-[#FF6B35]/15 hover:bg-[#FF6B35]/25 text-[#FF6B35] transition cursor-pointer"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E2E5F0] shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-[#E2E5F0] flex items-center justify-between bg-[#F8F9FC] rounded-t-3xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Fiche Prospect N° {selectedQuote.id.slice(0, 8)}</span>
                <h3 className="text-xl font-extrabold text-[#111033] mt-0.5">{selectedQuote.clientName}</h3>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-2 rounded-xl text-[#6B7280] hover:bg-[#E2E5F0] transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              
              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-3 bg-[#F8F9FC] rounded-xl border border-[#E2E5F0]">
                  <span className="text-[11px] font-bold text-[#6B7280] block">Téléphone WhatsApp</span>
                  <span className="text-sm font-extrabold text-[#111033]">{selectedQuote.clientPhone}</span>
                </div>
                <div className="p-3 bg-[#F8F9FC] rounded-xl border border-[#E2E5F0]">
                  <span className="text-[11px] font-bold text-[#6B7280] block">Ville d'installation</span>
                  <span className="text-sm font-extrabold text-[#111033]">{selectedQuote.cityName}</span>
                </div>
                <div className="p-3 bg-[#F8F9FC] rounded-xl border border-[#E2E5F0]">
                  <span className="text-[11px] font-bold text-[#6B7280] block">Véhicule &amp; Quantité</span>
                  <span className="text-sm font-extrabold text-[#111033]">{selectedQuote.vehicleLabel} × {selectedQuote.qty}</span>
                </div>
                <div className="p-3 bg-[#F8F9FC] rounded-xl border border-[#E2E5F0]">
                  <span className="text-[11px] font-bold text-[#6B7280] block">Besoin principal</span>
                  <span className="text-sm font-extrabold text-[#111033]">{selectedQuote.mainNeed}</span>
                </div>
                <div className="p-3 bg-[#F8F9FC] rounded-xl border border-[#E2E5F0]">
                  <span className="text-[11px] font-bold text-[#6B7280] block">Délai souhaité</span>
                  <span className="text-sm font-extrabold text-[#111033]">{selectedQuote.timeframe}</span>
                </div>
                <div className="p-3 bg-[#FFF2ED] rounded-xl border border-[#FF6B35]/30">
                  <span className="text-[11px] font-bold text-[#FF6B35] block">Montant Estimé</span>
                  <span className="text-sm font-extrabold text-[#111033]">{selectedQuote.estimationText}</span>
                </div>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-bold text-[#111033] mb-2">
                  Changer le statut du prospect :
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'nouveau', label: '🟡 Nouveau' },
                    { id: 'contacté', label: '🔵 Contacté' },
                    { id: 'rdv', label: '🟣 RDV Fixé' },
                    { id: 'installé', label: '🟢 Installé' },
                    { id: 'annulé', label: '⚪ Annulé' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        onUpdateStatus(selectedQuote.id, s.id);
                        setSelectedQuote(prev => ({ ...prev, status: s.id }));
                      }}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                        selectedQuote.status === s.id
                          ? 'border-[#16144F] bg-[#16144F] text-white'
                          : 'border-[#CBD0E2] bg-white text-[#525570] hover:bg-[#F8F9FC]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#111033]">
                    Notes internes sur ce client (adresse exacte, plaque, remarques) :
                  </label>
                  <button
                    onClick={handleSaveNotes}
                    disabled={isSavingNotes}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#FF6B35] hover:text-[#F25A22] cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSavingNotes ? "Enregistrement..." : "Enregistrer notes"}</span>
                  </button>
                </div>
                <textarea
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  rows={3}
                  placeholder="Ex: Rendez-vous convenu pour samedi 10h à Douala Bonapriso. Plaque LT 482 AB..."
                  className="w-full p-3 bg-[#F8F9FC] border border-[#CBD0E2] rounded-xl text-xs sm:text-sm text-[#111033] focus:outline-none focus:border-[#FF6B35]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E2E5F0] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${selectedQuote.clientPhone.replace(/\D/g, '')}?text=${encodeURIComponent(`Bonjour ${selectedQuote.clientName}, c'est GPS Tracking Cameroun...`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Contacter sur WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${selectedQuote.clientPhone}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#CBD0E2] bg-white hover:bg-[#F8F9FC] text-[#16144F] font-bold text-xs sm:text-sm transition"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Appeler</span>
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const q = selectedQuote;
                      setSelectedQuote(null);
                      onCreateInvoiceFromQuote(q);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6B35] hover:bg-[#F25A22] text-[#0E0D33] font-extrabold text-xs sm:text-sm transition shadow-md shadow-[#FF6B35]/20 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 stroke-[2.5]" />
                    <span>Générer Facture / Reca</span>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Êtes-vous sûr de vouloir supprimer ce devis ?")) {
                        onDeleteQuote(selectedQuote.id);
                        setSelectedQuote(null);
                      }
                    }}
                    className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition cursor-pointer"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
