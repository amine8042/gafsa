/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { HotelProvider } from './context/HotelContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Public Pages
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { RoomDetailPage } from './pages/RoomDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { DiscoverGafsaPage } from './pages/DiscoverGafsaPage';
import { ContactPage } from './pages/ContactPage';
import { BookingPage } from './pages/BookingPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminRoomsPage } from './pages/admin/AdminRoomsPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage';
import { AdminBookingRequestsPage } from './pages/admin/AdminBookingRequestsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Scroll to top automatically when location changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
};

// Layout wrapper for public website
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-stone-900 selection:bg-[#C5A880]/30 selection:text-stone-900">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <HotelProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Pages */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <HomePage />
                </PublicLayout>
              }
            />
            <Route
              path="/rooms"
              element={
                <PublicLayout>
                  <RoomsPage />
                </PublicLayout>
              }
            />
            <Route
              path="/rooms/:slug"
              element={
                <PublicLayout>
                  <RoomDetailPage />
                </PublicLayout>
              }
            />
            <Route
              path="/services"
              element={
                <PublicLayout>
                  <ServicesPage />
                </PublicLayout>
              }
            />
            <Route
              path="/gallery"
              element={
                <PublicLayout>
                  <GalleryPage />
                </PublicLayout>
              }
            />
            <Route
              path="/discover-gafsa"
              element={
                <PublicLayout>
                  <DiscoverGafsaPage />
                </PublicLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <PublicLayout>
                  <ContactPage />
                </PublicLayout>
              }
            />
            <Route
              path="/booking"
              element={
                <PublicLayout>
                  <BookingPage />
                </PublicLayout>
              }
            />

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Admin Dashboard Protected Layout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="rooms" element={<AdminRoomsPage />} />
              <Route path="services" element={<AdminServicesPage />} />
              <Route path="gallery" element={<AdminGalleryPage />} />
              <Route path="booking-requests" element={<AdminBookingRequestsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            {/* Fallback */}
            <Route
              path="*"
              element={
                <PublicLayout>
                  <HomePage />
                </PublicLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </HotelProvider>
    </LanguageProvider>
  );
}
