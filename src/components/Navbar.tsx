import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Calendar, Phone, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHotel } from '../context/HotelContext';
import { Language } from '../types';

export const Navbar: React.FC = () => {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const { settings } = useHotel();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { path: '/', label: t('nav_home') },
    { path: '/rooms', label: t('nav_rooms') },
    { path: '/services', label: t('nav_services') },
    { path: '/gallery', label: t('nav_gallery') },
    { path: '/discover-gafsa', label: t('nav_gafsa') },
    { path: '/contact', label: t('nav_contact') },
  ];

  const handleLangChange = (lang: Language) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  const currentLangLabel = {
    fr: 'FR',
    en: 'EN',
    ar: 'العربية',
  }[language];

  return (
    <>
      {/* Optional Top Announcement Ribbon */}
      {settings.announcement?.enabled && (
        <div className="bg-[#0B132B] text-[#FAF9F6] text-xs py-2 px-4 border-b border-[#C5A880]/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 truncate">
              <span className="text-[#C5A880] text-[10px] uppercase tracking-wider font-semibold">Jugurtha Palace</span>
              <span className="text-white/40">·</span>
              <span className="truncate text-white/90">
                {language === 'ar'
                  ? settings.announcement.textAr
                  : language === 'en'
                  ? settings.announcement.textEn
                  : settings.announcement.textFr}
              </span>
            </div>
            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#C5A880] hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{settings.phone}</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Top Navigation conforming to strict Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#C5A880]/25 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-20">
            {/* Zone 1: Single text element wordmark */}
            <Link
              to="/"
              className="flex items-baseline gap-2 group whitespace-nowrap shrink-0 focus:outline-none"
            >
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#0B132B] group-hover:text-[#8C6D3F] transition-colors">
                Jugurtha Palace
              </span>
              <span className="text-xs tracking-widest uppercase font-serif text-[#C5A880]">
                ★★★★★
              </span>
            </Link>

            {/* Zone 2: 4–6 concise single-line navigation links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-700">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`whitespace-nowrap shrink-0 py-1 transition-colors relative ${
                      isActive
                        ? 'text-[#0B132B] font-semibold'
                        : 'text-slate-600 hover:text-[#8C6D3F]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A880]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Zone 3: 1 primary action + Language switch */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              {/* Language Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 border border-slate-300 rounded hover:border-[#C5A880] transition-colors focus:outline-none"
                  aria-label="Change language"
                  aria-expanded={langDropdownOpen}
                >
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span>{currentLangLabel}</span>
                </button>

                {langDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg border border-slate-200 py-1 z-50">
                    <button
                      onClick={() => handleLangChange('fr')}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between ${
                        language === 'fr' ? 'bg-[#FAF9F6] text-[#8C6D3F] font-semibold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>Français</span>
                      <span className="text-[10px] text-slate-400">FR</span>
                    </button>
                    <button
                      onClick={() => handleLangChange('en')}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between ${
                        language === 'en' ? 'bg-[#FAF9F6] text-[#8C6D3F] font-semibold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>English</span>
                      <span className="text-[10px] text-slate-400">EN</span>
                    </button>
                    <button
                      onClick={() => handleLangChange('ar')}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between ${
                        language === 'ar' ? 'bg-[#FAF9F6] text-[#8C6D3F] font-semibold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>العربية</span>
                      <span className="text-[10px] text-slate-400">AR</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Primary CTA button */}
              <Link
                to="/booking"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0B132B] hover:bg-[#1E293B] border border-[#C5A880]/60 rounded shadow-sm transition-all whitespace-nowrap shrink-0 hover:border-[#C5A880]"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{t('nav_book_now')}</span>
              </Link>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF9F6] border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
            <div className="flex flex-col space-y-2">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-base font-medium rounded transition-colors ${
                    location.pathname === item.path
                      ? 'bg-[#C5A880]/15 text-[#0B132B] font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <Link
                  to="/booking"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white bg-[#0B132B] rounded text-center border border-[#C5A880]"
                >
                  <Calendar className="w-4 h-4 text-[#C5A880]" />
                  <span>{t('nav_book_now')}</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
