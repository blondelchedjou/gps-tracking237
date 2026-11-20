import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, FileText, Receipt, LogOut, 
  ExternalLink, Shield, RefreshCw, AlertCircle, Menu, X 
} from 'lucide-react';
import { db } from '../firebase';
import { 
  collection, query, orderBy, onSnapshot, doc, updateDoc, 
  deleteDoc, addDoc, setDoc, serverTimestamp 
} from 'firebase/firestore';
import AdminLogin from './AdminLogin';
import DashboardTab from './DashboardTab';
import QuotesTab from './QuotesTab';
import InvoicesTab from './InvoicesTab';
import InvoiceModal from './InvoiceModal';

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'quotes' | 'invoices'
  const [quotes, setQuotes] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Invoice modal state
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [invoiceModalData, setInvoiceModalData] = useState(null);

  // Check existing login session on mount
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem('gps_admin_auth');
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        // Session valid for 7 days
        if (parsed.authenticated && (Date.now() - parsed.timestamp < 7 * 24 * 60 * 60 * 1000)) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('gps_admin_auth');
        }
      }
    } catch (e) {
      localStorage.removeItem('gps_admin_auth');
    }
  }, []);

  // Listen to Firestore 'devis' and 'factures' collections in real-time
  useEffect(() => {
    if (!isAuthenticated) return;

    setIsLoading(true);

    // 1. Quotes listener
    const quotesQuery = query(collection(db, 'devis'));
    const unsubQuotes = onSnapshot(quotesQuery, (snapshot) => {
      const fetched = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      // Sort in memory by date (handling serverTimestamp)
      fetched.sort((a, b) => {
        const timeA = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : new Date(a.createdAt || 0).getTime();
        const timeB = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : new Date(b.createdAt || 0).getTime();
        return timeB - timeA;
      });
      setQuotes(fetched);
      setIsLoading(false);
    }, (error) => {
      console.error("Firestore devis error:", error);
      setIsLoading(false);
    });

    // 2. Invoices listener
    const invoicesQuery = query(collection(db, 'factures'));
    const unsubInvoices = onSnapshot(invoicesQuery, (snapshot) => {
      const fetched = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      fetched.sort((a, b) => {
        const timeA = a.updatedAt?.seconds ? a.updatedAt.seconds * 1000 : new Date(a.updatedAt || 0).getTime();
        const timeB = b.updatedAt?.seconds ? b.updatedAt.seconds * 1000 : new Date(b.updatedAt || 0).getTime();
        return timeB - timeA;
      });
      setInvoices(fetched);
    }, (error) => {
      console.error("Firestore factures error:", error);
    });

    return () => {
      unsubQuotes();
      unsubInvoices();
    };
  }, [isAuthenticated]);

  // Actions
  const handleUpdateQuoteStatus = async (quoteId, newStatus) => {
    try {
      const docRef = doc(db, 'devis', quoteId);
      await updateDoc(docRef, { 
        status: newStatus,
        updatedAt: serverTimestamp() 
      });
    } catch (err) {
      console.error("Erreur mise à jour statut devis:", err);
      alert("Erreur de mise à jour : " + err.message);
    }
  };

  const handleSaveQuoteNotes = async (quoteId, notes) => {
    try {
      const docRef = doc(db, 'devis', quoteId);
      await updateDoc(docRef, { 
        notes: notes,
        updatedAt: serverTimestamp() 
      });
    } catch (err) {
      console.error("Erreur sauvegarde notes:", err);
      alert("Erreur d'enregistrement : " + err.message);
    }
  };

  const handleDeleteQuote = async (quoteId) => {
    try {
      await deleteDoc(doc(db, 'devis', quoteId));
    } catch (err) {
      console.error("Erreur suppression devis:", err);
      alert("Erreur de suppression : " + err.message);
    }
  };

  const handleSaveInvoice = async (invoicePayload) => {
    try {
      if (invoicePayload.id) {
        const docRef = doc(db, 'factures', invoicePayload.id);
        const { id, ...dataToSave } = invoicePayload;
        await setDoc(docRef, dataToSave, { merge: true });
      } else {
        await addDoc(collection(db, 'factures'), invoicePayload);
      }
    } catch (err) {
      console.error("Erreur sauvegarde facture:", err);
      alert("Erreur enregistrement facture : " + err.message);
    }
  };

  const handleDeleteInvoice = async (invoiceId) => {
    try {
      await deleteDoc(doc(db, 'factures', invoiceId));
    } catch (err) {
      console.error("Erreur suppression facture:", err);
      alert("Erreur suppression facture : " + err.message);
    }
  };

  const handleCreateInvoiceFromQuote = (quote) => {
    setInvoiceModalData(quote);
    setInvoiceModalOpen(true);
  };

  const handleOpenEditInvoice = (invoice) => {
    setInvoiceModalData(invoice);
    setInvoiceModalOpen(true);
  };

  const handleOpenNewInvoice = () => {
    setInvoiceModalData(null);
    setInvoiceModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('gps_admin_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const newQuotesCount = quotes.filter(q => q.status === 'nouveau').length;

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#111033] flex flex-col font-sans">
      
      {/* Top Navbar */}
      <header className="bg-[#16144F] text-white border-b border-[#252270] sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                GPS<span className="text-[#FF6B35]">Tracking</span>
              </span>
              <span className="text-[10px] font-extrabold bg-[#FF6B35] text-[#0E0D33] px-2 py-0.5 rounded-full uppercase tracking-wider">
                Admin
              </span>
            </div>
          </div>

          {/* Desktop Tab Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-white/15 text-white shadow-inner'
                  : 'text-[#CBD0E2] hover:bg-white/10 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#FF6B35]" />
              <span>Tableau de bord</span>
            </button>

            <button
              onClick={() => setActiveTab('quotes')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer relative ${
                activeTab === 'quotes'
                  ? 'bg-white/15 text-white shadow-inner'
                  : 'text-[#CBD0E2] hover:bg-white/10 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 text-[#38bdf8]" />
              <span>Devis &amp; Prospects</span>
              {newQuotesCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-[#FF6B35] text-[#0E0D33]">
                  {newQuotesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('invoices')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === 'invoices'
                  ? 'bg-white/15 text-white shadow-inner'
                  : 'text-[#CBD0E2] hover:bg-white/10 hover:text-white'
              }`}
            >
              <Receipt className="w-4 h-4 text-emerald-400" />
              <span>Facturation &amp; Reca</span>
              {invoices.length > 0 && (
                <span className="ml-1 text-[11px] text-[#A5A9D0]">
                  ({invoices.length})
                </span>
              )}
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/20 text-xs font-bold text-white hover:bg-white/10 transition"
              title="Voir la landing page publique"
            >
              <span>Voir le site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold transition cursor-pointer"
              title="Déconnexion"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 px-4 py-3 bg-[#111033] space-y-1">
            <button
              onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold ${
                activeTab === 'dashboard' ? 'bg-[#FF6B35] text-[#0E0D33]' : 'text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span>Tableau de bord</span>
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('quotes'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold ${
                activeTab === 'quotes' ? 'bg-[#FF6B35] text-[#0E0D33]' : 'text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Devis &amp; Prospects</span>
              </span>
              {newQuotesCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {newQuotesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab('invoices'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold ${
                activeTab === 'invoices' ? 'bg-[#FF6B35] text-[#0E0D33]' : 'text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <Receipt className="w-4 h-4" />
                <span>Facturation &amp; Reca</span>
              </span>
              <span className="text-[11px] opacity-75">({invoices.length})</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Admin View Container */}
      <main className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1">
        {activeTab === 'dashboard' && (
          <DashboardTab
            quotes={quotes}
            invoices={invoices}
            onSelectTab={setActiveTab}
            onOpenQuote={(quote) => {
              setActiveTab('quotes');
            }}
          />
        )}

        {activeTab === 'quotes' && (
          <QuotesTab
            quotes={quotes}
            onUpdateStatus={handleUpdateQuoteStatus}
            onSaveNotes={handleSaveQuoteNotes}
            onDeleteQuote={handleDeleteQuote}
            onCreateInvoiceFromQuote={handleCreateInvoiceFromQuote}
          />
        )}

        {activeTab === 'invoices' && (
          <InvoicesTab
            invoices={invoices}
            onOpenCreateInvoice={handleOpenNewInvoice}
            onOpenEditInvoice={handleOpenEditInvoice}
            onDeleteInvoice={handleDeleteInvoice}
          />
        )}
      </main>

      {/* Invoice Modal for Creation & A4 Preview */}
      <InvoiceModal
        isOpen={invoiceModalOpen}
        onClose={() => setInvoiceModalOpen(false)}
        initialData={invoiceModalData}
        onSaveInvoice={handleSaveInvoice}
      />

    </div>
  );
}
