import React, { useState, useEffect } from 'react';
import { 
  X, Plus, Trash2, Printer, MessageCircle, Save, Check, 
  Shield, FileText, ArrowRight, DollarSign, Calendar, MapPin, Car 
} from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/landingData';

export default function InvoiceModal({ isOpen, onClose, initialData, onSaveInvoice }) {
  if (!isOpen) return null;

  const [docType, setDocType] = useState('Facture'); // 'Facture', 'Devis Pro-forma', 'Reçu de paiement'
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCity, setClientCity] = useState('Douala');
  const [vehicleInfo, setVehicleInfo] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Orange Money / MTN Mobile Money');
  const [paymentStatus, setPaymentStatus] = useState('payé'); // 'payé', 'acompte', 'en attente'
  const [depositAmount, setDepositAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [items, setItems] = useState([
    {
      description: 'Traceur GPS 4G LTE étanche + Relais de coupure moteur à distance',
      qty: 1,
      unitPrice: 50000
    },
    {
      description: 'Installation discrète & paramétrage application smartphone (Yaoundé / Douala)',
      qty: 1,
      unitPrice: 0
    },
    {
      description: 'Garantie matérielle 1 an incluse (remplacement direct en cas de panne)',
      qty: 1,
      unitPrice: 0
    }
  ]);
  const [notes, setNotes] = useState('Matériel certifié 100% neuf. Assistance technique 24h/24.');
  const [viewMode, setViewMode] = useState('edit'); // 'edit' | 'preview'
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      if (initialData.invoiceNumber) {
        // Editing existing invoice
        setInvoiceNumber(initialData.invoiceNumber);
        setDocType(initialData.docType || 'Facture');
        setClientName(initialData.clientName || '');
        setClientPhone(initialData.clientPhone || '');
        setClientCity(initialData.clientCity || 'Douala');
        setVehicleInfo(initialData.vehicleInfo || '');
        setPaymentStatus(initialData.status || 'payé');
        setPaymentMethod(initialData.paymentMethod || 'Orange Money / MTN Mobile Money');
        setDepositAmount(initialData.depositAmount || 0);
        setDiscountAmount(initialData.discountAmount || 0);
        if (initialData.items && initialData.items.length > 0) setItems(initialData.items);
        if (initialData.notes) setNotes(initialData.notes);
      } else if (initialData.clientName) {
        // Creating from quote
        const rnd = Math.floor(1000 + Math.random() * 9000);
        setInvoiceNumber(`GPS-2026-${rnd}`);
        setClientName(initialData.clientName);
        setClientPhone(initialData.clientPhone);
        setClientCity(initialData.cityName || 'Douala');
        setVehicleInfo(`${initialData.vehicleLabel} (${initialData.qty} véhicule(s))`);
        const uPrice = initialData.unitPrice || 50000;
        const q = initialData.qty || 1;
        setItems([
          {
            description: `Traceur GPS 4G LTE étanche pour ${initialData.vehicleLabel} + Relais coupure`,
            qty: q,
            unitPrice: uPrice
          },
          {
            description: `Installation à domicile à ${initialData.cityName || 'Douala/Yaoundé'} & configuration application`,
            qty: q,
            unitPrice: 0
          },
          {
            description: 'Garantie complète 1 an (assistance 24h/24 incluse)',
            qty: q,
            unitPrice: 0
          }
        ]);
      }
    } else {
      const rnd = Math.floor(1000 + Math.random() * 9000);
      setInvoiceNumber(`GPS-2026-${rnd}`);
    }
  }, [initialData]);

  // Calculations
  const subtotal = items.reduce((acc, it) => acc + (Number(it.qty) * Number(it.unitPrice)), 0);
  const totalAmount = Math.max(0, subtotal - Number(discountAmount));
  const remainingBalance = Math.max(0, totalAmount - Number(depositAmount));

  const formatPrice = (val) => {
    return (val || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " FCFA";
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      { description: 'Option supplémentaire (ex: micro espion / SIM data)', qty: 1, unitPrice: 10000 }
    ]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const invoicePayload = {
      invoiceNumber,
      docType,
      invoiceDate,
      clientName,
      clientPhone,
      clientCity,
      vehicleInfo,
      items,
      subtotal,
      discountAmount: Number(discountAmount),
      totalAmount,
      depositAmount: Number(depositAmount),
      amountPaid: paymentStatus === 'payé' ? totalAmount : Number(depositAmount),
      remainingBalance: paymentStatus === 'payé' ? 0 : remainingBalance,
      status: paymentStatus,
      paymentMethod,
      notes,
      updatedAt: new Date(),
    };

    if (initialData?.id) {
      invoicePayload.id = initialData.id;
    }

    await onSaveInvoice(invoicePayload);
    setIsSaving(false);
    onClose();
  };

  // WhatsApp send text generator
  const generateWhatsAppMessage = () => {
    const itemsList = items
      .map(it => `• ${it.description} (x${it.qty}) : ${formatPrice(it.qty * it.unitPrice)}`)
      .join('\n');

    const msg = 
`*GPS TRACKING CAMEROUN*
*${docType.toUpperCase()} N° ${invoiceNumber}*
Date : ${invoiceDate}

*Client :* ${clientName} (${clientCity})
*Véhicule :* ${vehicleInfo || 'Non spécifié'}

*Détail des prestations :*
${itemsList}

---------------------------------
*Montant Total :* ${formatPrice(totalAmount)}
${depositAmount > 0 ? `*Acompte reçu :* ${formatPrice(depositAmount)}\n*Reste à payer :* ${formatPrice(remainingBalance)}\n` : ''}*Statut :* ${paymentStatus === 'payé' ? '✅ Réglé en totalité' : paymentStatus === 'acompte' ? '🟡 Acompte versé' : '⏳ En attente de règlement'}
*Mode de règlement :* ${paymentMethod}

*Garantie :* 1 an pièces et main d'œuvre.
Pour toute question, contactez nos techniciens au +237 656 73 75 41 / +237 672 97 18 39. Merci pour votre confiance !`;

    return msg;
  };

  const handleSendWhatsApp = () => {
    const cleanPhone = (clientPhone || '').replace(/\D/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(generateWhatsAppMessage())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[95vh] flex flex-col border border-[#E2E5F0] shadow-2xl overflow-hidden my-auto">
        
        {/* Top Navbar Modal */}
        <div className="p-4 sm:p-6 border-b border-[#E2E5F0] flex items-center justify-between bg-[#F8F9FC] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#16144F] text-white flex items-center justify-center font-bold">
              <FileText className="w-5 h-5 text-[#FF6B35]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#111033]">
                {docType} {invoiceNumber}
              </h3>
              <p className="text-xs text-[#6B7280]">
                {viewMode === 'edit' ? 'Éditeur de document & calculs' : 'Aperçu officiel avant impression'}
              </p>
            </div>
          </div>

          {/* View Toggles & Close */}
          <div className="flex items-center gap-2">
            <div className="bg-[#E2E5F0] p-1 rounded-xl flex items-center gap-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setViewMode('edit')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'edit' ? 'bg-white text-[#111033] shadow-xs' : 'text-[#6B7280]'
                }`}
              >
                Édition
              </button>
              <button
                type="button"
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'preview' ? 'bg-white text-[#111033] shadow-xs' : 'text-[#6B7280]'
                }`}
              >
                Aperçu A4
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#6B7280] hover:bg-[#E2E5F0] rounded-xl transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          
          {viewMode === 'edit' ? (
            /* ================= EDIT MODE ================= */
            <div className="space-y-6">
              
              {/* Type and Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#111033] mb-1.5">Type de document</label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full p-2.5 bg-[#F8F9FC] border border-[#CBD0E2] rounded-xl text-xs sm:text-sm font-semibold"
                  >
                    <option value="Facture">Facture d'installation</option>
                    <option value="Devis Pro-forma">Devis Pro-forma</option>
                    <option value="Reçu de paiement">Reçu de paiement (Reca)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#111033] mb-1.5">Numéro de document</label>
                  <input
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="w-full p-2.5 bg-[#F8F9FC] border border-[#CBD0E2] rounded-xl text-xs sm:text-sm font-semibold font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#111033] mb-1.5">Date</label>
                  <input
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="w-full p-2.5 bg-[#F8F9FC] border border-[#CBD0E2] rounded-xl text-xs sm:text-sm font-semibold"
                  />
                </div>
              </div>

              {/* Client Details Section */}
              <div className="bg-[#F8F9FC] p-4 sm:p-5 rounded-2xl border border-[#E2E5F0] space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#16144F] block">
                  Informations du Client &amp; Véhicule
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#525570] mb-1">Nom du client</label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ex: M. Jean-Paul Mbida"
                      className="w-full p-2.5 bg-white border border-[#CBD0E2] rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#525570] mb-1">Téléphone WhatsApp</label>
                    <input
                      type="text"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+237 6..."
                      className="w-full p-2.5 bg-white border border-[#CBD0E2] rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#525570] mb-1">Ville / Quartier</label>
                    <input
                      type="text"
                      value={clientCity}
                      onChange={(e) => setClientCity(e.target.value)}
                      placeholder="Ex: Douala, Akwa"
                      className="w-full p-2.5 bg-white border border-[#CBD0E2] rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#525570] mb-1">Véhicule(s) &amp; Immatriculation</label>
                    <input
                      type="text"
                      value={vehicleInfo}
                      onChange={(e) => setVehicleInfo(e.target.value)}
                      placeholder="Ex: Toyota RAV4 (LT 482 AB)"
                      className="w-full p-2.5 bg-white border border-[#CBD0E2] rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Line items table */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#16144F]">
                    Prestations &amp; Équipements inclus
                  </span>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#FF6B35] hover:text-[#F25A22] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ajouter une ligne</span>
                  </button>
                </div>

                <div className="border border-[#E2E5F0] rounded-xl overflow-hidden divide-y divide-[#E2E5F0]">
                  {items.map((item, idx) => (
                    <div key={idx} className="p-3 bg-white flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                        placeholder="Description"
                        className="flex-1 p-2 bg-[#F8F9FC] border border-[#CBD0E2] rounded-lg text-xs sm:text-sm font-medium"
                      />
                      <div className="flex items-center gap-2">
                        <div className="w-20">
                          <input
                            type="number"
                            min="1"
                            value={item.qty}
                            onChange={(e) => handleItemChange(idx, 'qty', parseInt(e.target.value) || 1)}
                            className="w-full p-2 bg-[#F8F9FC] border border-[#CBD0E2] rounded-lg text-xs sm:text-sm text-center font-bold"
                          />
                        </div>
                        <div className="w-32">
                          <input
                            type="number"
                            step="1000"
                            value={item.unitPrice}
                            onChange={(e) => handleItemChange(idx, 'unitPrice', parseInt(e.target.value) || 0)}
                            className="w-full p-2 bg-[#F8F9FC] border border-[#CBD0E2] rounded-lg text-xs sm:text-sm font-bold text-right"
                          />
                        </div>
                        <div className="w-28 text-right font-extrabold text-xs sm:text-sm text-[#111033]">
                          {formatPrice(item.qty * item.unitPrice)}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                          title="Supprimer la ligne"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals & Payment Config */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E2E5F0]">
                {/* Payment options */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#111033] mb-1.5">Statut de paiement</label>
                    <select
                      value={paymentStatus}
                      onChange={(e) => setPaymentStatus(e.target.value)}
                      className="w-full p-2.5 bg-[#F8F9FC] border border-[#CBD0E2] rounded-xl text-xs sm:text-sm font-semibold"
                    >
                      <option value="payé">🟢 Réglé en totalité</option>
                      <option value="acompte">🟡 Acompte versé</option>
                      <option value="en attente">⏳ En attente de paiement</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#111033] mb-1.5">Mode de règlement</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full p-2.5 bg-[#F8F9FC] border border-[#CBD0E2] rounded-xl text-xs sm:text-sm font-semibold"
                    >
                      <option value="Orange Money / MTN Mobile Money">Orange Money / MTN Mobile Money</option>
                      <option value="Espèces à l'installation">Espèces à l'installation</option>
                      <option value="Virement Bancaire">Virement Bancaire</option>
                      <option value="Chèque d'entreprise">Chèque d'entreprise</option>
                    </select>
                  </div>
                </div>

                {/* Numbers calculation card */}
                <div className="bg-[#16144F] text-white p-5 rounded-2xl space-y-3">
                  <div className="flex justify-between text-xs text-[#CBD0E2]">
                    <span>Sous-total HT</span>
                    <span className="font-bold text-white">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs items-center">
                    <span className="text-[#CBD0E2]">Remise commerciale</span>
                    <div className="w-28">
                      <input
                        type="number"
                        value={discountAmount}
                        onChange={(e) => setDiscountAmount(parseInt(e.target.value) || 0)}
                        className="w-full p-1 bg-white/10 border border-white/20 rounded text-right text-xs font-bold text-[#FF6B35]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base font-extrabold border-t border-white/15 pt-2">
                    <span>Net à payer</span>
                    <span className="text-[#FF6B35] text-lg">{formatPrice(totalAmount)}</span>
                  </div>
                  {paymentStatus === 'acompte' && (
                    <div className="pt-2 border-t border-white/10 space-y-1.5">
                      <div className="flex justify-between text-xs items-center">
                        <span className="text-[#CBD0E2]">Acompte reçu</span>
                        <div className="w-28">
                          <input
                            type="number"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(parseInt(e.target.value) || 0)}
                            className="w-full p-1 bg-white/10 border border-white/20 rounded text-right text-xs font-bold text-emerald-300"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between text-xs font-bold text-amber-300">
                        <span>Solde restant</span>
                        <span>{formatPrice(remainingBalance)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ) : (
            /* ================= PREVIEW / A4 PRINT MODE ================= */
            <div id="print-area" className="bg-white p-6 sm:p-10 max-w-3xl mx-auto border border-[#CBD0E2] rounded-2xl shadow-sm space-y-8 font-sans">
              
              {/* Header Invoice */}
              <div className="flex justify-between items-start border-b border-[#CBD0E2] pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-extrabold text-2xl tracking-tight text-[#16144F]">
                      GPS<span className="text-[#FF6B35]">Tracking</span>
                    </span>
                    <span className="text-xs bg-[#16144F] text-white px-2 py-0.5 rounded font-bold uppercase">
                      Cameroun
                    </span>
                  </div>
                  <p className="text-xs text-[#525570]">Sécurité &amp; Géolocalisation par Satellite 24h/24</p>
                  <p className="text-xs text-[#525570]">Yaoundé &amp; Douala · Cameroun</p>
                  <p className="text-xs text-[#525570]">Tél / WhatsApp : +237 656 73 75 41 / +237 672 97 18 39</p>
                </div>

                <div className="text-right">
                  <div className="text-xl font-extrabold text-[#111033] uppercase">
                    {docType}
                  </div>
                  <div className="text-sm font-mono font-bold text-[#FF6B35]">
                    N° {invoiceNumber}
                  </div>
                  <div className="text-xs text-[#525570] mt-1">
                    Date : <strong>{invoiceDate}</strong>
                  </div>
                </div>
              </div>

              {/* Client & Vehicle Card */}
              <div className="grid grid-cols-2 gap-6 bg-[#F8F9FC] p-4 rounded-xl border border-[#E2E5F0]">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#6B7280] block mb-1">Destinataire (Client)</span>
                  <div className="font-extrabold text-[#111033] text-sm">{clientName || 'Client'}</div>
                  <div className="text-xs text-[#525570]">{clientCity}</div>
                  <div className="text-xs text-[#525570]">{clientPhone}</div>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#6B7280] block mb-1">Équipement Concerne</span>
                  <div className="font-extrabold text-[#111033] text-sm">{vehicleInfo || 'Véhicule'}</div>
                  <div className="text-xs text-emerald-700 font-bold mt-1">🛡️ Garantie 1 an complète incluse</div>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#16144F] text-[11px] font-bold uppercase text-[#16144F]">
                    <th className="py-2.5">Désignation</th>
                    <th className="py-2.5 text-center">Qté</th>
                    <th className="py-2.5 text-right">Prix Unitaire</th>
                    <th className="py-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E5F0] text-xs">
                  {items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="py-3 font-semibold text-[#111033]">{it.description}</td>
                      <td className="py-3 text-center font-bold">{it.qty}</td>
                      <td className="py-3 text-right">{formatPrice(it.unitPrice)}</td>
                      <td className="py-3 text-right font-extrabold">{formatPrice(it.qty * it.unitPrice)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals Summary */}
              <div className="flex justify-end pt-4">
                <div className="w-64 space-y-2 text-xs">
                  <div className="flex justify-between text-[#525570]">
                    <span>Sous-total HT :</span>
                    <span className="font-bold text-[#111033]">{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Remise accordée :</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-extrabold text-[#16144F] border-t-2 border-[#16144F] pt-2">
                    <span>Net à payer :</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                  {depositAmount > 0 && (
                    <>
                      <div className="flex justify-between text-xs text-[#525570]">
                        <span>Acompte versé :</span>
                        <span className="font-bold text-emerald-600">-{formatPrice(depositAmount)}</span>
                      </div>
                      <div className="flex justify-between text-xs font-extrabold text-amber-700 pt-1">
                        <span>Reste à payer :</span>
                        <span>{formatPrice(remainingBalance)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Footer legal & Signature */}
              <div className="border-t border-[#CBD0E2] pt-6 flex justify-between items-end text-xs text-[#6B7280]">
                <div>
                  <p className="font-bold text-[#111033]">Mode de règlement : {paymentMethod}</p>
                  <p className="mt-1 text-[11px] leading-relaxed max-w-sm">
                    {notes}
                  </p>
                </div>
                <div className="text-right">
                  <div className="h-16 flex items-end justify-end">
                    <span className="text-[11px] italic font-semibold text-[#16144F] border-b border-[#16144F] pb-1 px-4">
                      Cachet &amp; Signature Direction
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer with Action Buttons */}
        <div className="p-4 sm:p-5 border-t border-[#E2E5F0] bg-[#F8F9FC] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#CBD0E2] bg-white hover:bg-[#F1F3F9] text-[#16144F] font-bold text-xs sm:text-sm transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer / PDF</span>
            </button>
            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Envoyer Reca au client (WhatsApp)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-[#6B7280] hover:bg-[#E2E5F0] rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer"
            >
              Fermer
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF6B35] hover:bg-[#F25A22] text-[#0E0D33] font-extrabold text-xs sm:text-sm transition shadow-md shadow-[#FF6B35]/20 cursor-pointer disabled:opacity-75"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Enregistrement..." : "Enregistrer la Facture"}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
