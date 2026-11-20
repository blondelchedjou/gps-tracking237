import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Printer, MessageCircle, FileText, 
  CheckCircle2, Clock, Trash2, Edit3, DollarSign, Download 
} from 'lucide-react';

export default function InvoicesTab({ invoices, onOpenCreateInvoice, onOpenEditInvoice, onDeleteInvoice }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const formatPrice = (val) => {
    return (val || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " FCFA";
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch = 
      (inv.invoiceNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inv.clientName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inv.clientPhone || '').includes(searchTerm) ||
      (inv.vehicleInfo || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate totals
  const totalBilled = invoices.reduce((acc, inv) => acc + (inv.totalAmount || 0), 0);
  const totalCollected = invoices.reduce((acc, inv) => acc + (inv.amountPaid || 0), 0);
  const totalPending = invoices.reduce((acc, inv) => acc + (inv.remainingBalance || 0), 0);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'payé':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800">● Réglé 100%</span>;
      case 'acompte':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800">● Acompte</span>;
      case 'en attente':
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800">● En attente</span>;
    }
  };

  const handleSendWhatsApp = (inv) => {
    const cleanPhone = (inv.clientPhone || '').replace(/\D/g, '');
    const itemsList = (inv.items || [])
      .map(it => `• ${it.description} (x${it.qty}) : ${formatPrice(it.qty * it.unitPrice)}`)
      .join('\n');

    const msg = 
`*GPS TRACKING CAMEROUN*
*${(inv.docType || 'FACTURE').toUpperCase()} N° ${inv.invoiceNumber}*
Date : ${inv.invoiceDate}

*Client :* ${inv.clientName} (${inv.clientCity || 'Cameroun'})
*Véhicule :* ${inv.vehicleInfo || 'Non spécifié'}

*Détail :*
${itemsList}

---------------------------------
*Montant Total :* ${formatPrice(inv.totalAmount)}
${inv.depositAmount > 0 ? `*Acompte reçu :* ${formatPrice(inv.depositAmount)}\n*Reste à payer :* ${formatPrice(inv.remainingBalance)}\n` : ''}*Statut :* ${inv.status === 'payé' ? '✅ Réglé en totalité' : inv.status === 'acompte' ? '🟡 Acompte versé' : '⏳ En attente'}

*Garantie :* 1 an pièces et main d'œuvre.
Tél : +237 656 73 75 41 / +237 672 97 18 39. Merci !`;

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Summary KPI Cards for Invoicing */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E5F0] shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Total Facturé</span>
          <div className="text-2xl font-extrabold text-[#111033] mt-2">
            {formatPrice(totalBilled)}
          </div>
          <span className="text-xs text-[#6B7280] mt-1 block">{invoices.length} factures / reçus émis</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E5F0] shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Total Encaissé</span>
          <div className="text-2xl font-extrabold text-emerald-700 mt-2">
            {formatPrice(totalCollected)}
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">Règlements effectifs perçus</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E5F0] shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Restant à Recouvrer</span>
          <div className="text-2xl font-extrabold text-amber-700 mt-2">
            {formatPrice(totalPending)}
          </div>
          <span className="text-xs text-[#6B7280] mt-1 block">Soldes des acomptes &amp; en attente</span>
        </div>
      </div>

      {/* Action Header & Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E5F0] shadow-xs">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par N° facture, client, téléphone..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FC] border border-[#CBD0E2] rounded-xl text-xs sm:text-sm text-[#111033] placeholder-[#94A3B8] focus:outline-none focus:border-[#FF6B35]"
          />
        </div>

        {/* Filters and New Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: 'Toutes' },
              { id: 'payé', label: 'Réglées' },
              { id: 'acompte', label: 'Acomptes' },
              { id: 'en attente', label: 'En attente' },
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

          <button
            onClick={onOpenCreateInvoice}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF6B35] hover:bg-[#F25A22] text-[#0E0D33] font-extrabold text-xs sm:text-sm transition shadow-md shadow-[#FF6B35]/20 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Nouvelle Facture</span>
          </button>
        </div>

      </div>

      {/* Invoices List Table */}
      <div className="bg-white rounded-2xl border border-[#E2E5F0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#E2E5F0] text-[11px] font-extrabold uppercase tracking-wider text-[#6B7280]">
                <th className="py-3.5 px-5">Numéro &amp; Date</th>
                <th className="py-3.5 px-4">Client</th>
                <th className="py-3.5 px-4">Véhicule</th>
                <th className="py-3.5 px-4">Montant Total</th>
                <th className="py-3.5 px-4">Reste Dû</th>
                <th className="py-3.5 px-4">Statut</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E5F0] text-sm">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#6B7280]">
                    Aucune facture enregistrée pour le moment. Cliquez sur "Nouvelle Facture" pour en créer une !
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[#F8F9FC] transition">
                    
                    {/* Number and Date */}
                    <td className="py-4 px-5">
                      <div className="font-mono font-extrabold text-[#111033] flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-[#FF6B35]" />
                        <span>{inv.invoiceNumber}</span>
                      </div>
                      <div className="text-xs text-[#6B7280] mt-0.5">
                        {inv.invoiceDate || 'Aujourd\'hui'} · {inv.docType || 'Facture'}
                      </div>
                    </td>

                    {/* Client */}
                    <td className="py-4 px-4">
                      <div className="font-extrabold text-[#111033]">{inv.clientName}</div>
                      <div className="text-xs text-[#6B7280]">{inv.clientPhone}</div>
                    </td>

                    {/* Vehicle */}
                    <td className="py-4 px-4 font-semibold text-[#525570]">
                      {inv.vehicleInfo || '-'}
                    </td>

                    {/* Total Amount */}
                    <td className="py-4 px-4 font-extrabold text-[#111033]">
                      {formatPrice(inv.totalAmount)}
                    </td>

                    {/* Remaining */}
                    <td className="py-4 px-4 font-bold text-amber-700">
                      {inv.remainingBalance > 0 ? formatPrice(inv.remainingBalance) : <span className="text-emerald-600 font-semibold text-xs">Soldé (0 F)</span>}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      {getStatusBadge(inv.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleSendWhatsApp(inv)}
                          title="Envoyer Reca sur WhatsApp"
                          className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onOpenEditInvoice(inv)}
                          title="Modifier / Imprimer"
                          className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Supprimer la facture ${inv.invoiceNumber} ?`)) {
                              onDeleteInvoice(inv.id);
                            }
                          }}
                          title="Supprimer"
                          className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
