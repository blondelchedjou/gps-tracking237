import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminPortal from './admin/AdminPortal';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Administration Portal (Dashboard, Leads, Invoices & Reca) */}
        <Route path="/admin" element={<AdminPortal />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
