import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Star, 
  MapPin, 
  Phone, 
  Waves, 
  Wifi, 
  Coffee, 
  Wind, 
  Car, 
  ShieldCheck, 
  ArrowRight,
  Compass,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { useLanguage } from '../context/LanguageContext';
import { RoomCard } from '../components/RoomCard';
import { ASSET_IMAGES, resolveHotelImage } from '../assets/images';

export const HomePage: React.FC = () => {
  const { settings, rooms, gallery, services } = useHotel();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Quick booking bar state
  const todayStr = new Date().toISOString().split('T')[0];
  const [quickCheckIn, setQuickCheckIn] = useState(todayStr);
  const [quickCheckOut, setQuickCheckOut] = useState('');
  const [quickAdults, setQuickAdults] = useState(2);
  const [quickRoomId, setQuickRoomId] = useState(rooms.length > 0 ? rooms[0].id : '');

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      checkIn: quickCheckIn,
      checkOut: quickCheckOut,
      adults: quickAdults.toString(),
      room: quickRoomId,
    });
    navigate(`/booking?${query.toString()}`);
  };

  const heroHeading =
    language === 'ar'
      ? settings.heroHeadingAr
      : language === 'en'
      ? settings.heroHeadingEn
      : settings.heroHeadingFr;

  const heroSubtitle =
    language === 'ar'
      ? settings.heroSubtitleAr
      : language === 'en'
      ? settings.heroSubtitleEn
      : settings.heroSubtitleFr;

  const featuredRooms = rooms.filter((r) => r.featured).slice(0, 3);
  const displayRooms = featuredRooms.length > 0 ? featuredRooms : rooms.slice(0, 3);

  return (
    <div className="space-y-20 lg:space-y-28">
      {/* 1. CINEMATIC LUXURY HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-950">
        {/* Background Image with Measured Contrast Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={resolveHotelImage(settings.heroImage) || ASSET_IMAGES.hero}
            alt="Jugurtha Palace Hotel Gafsa"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-100 animate-in fade-in zoom-in-105 duration-1000"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = ASSET_IMAGES.hero;
            }}
          />
          {/* Gradients ensuring WCAG 4.5:1 legibility across all viewport positions */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
          <div className="absolute inset-0 bg-stone-950/30" />
        </div>

        {/* Hero Text Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-24 sm:py-32">
          {/* Subtle luxury kicker with zero pills */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium tracking-widest uppercase text-[#C5A880] mb-6">
            <span>{t('hero_stars')}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto [text-wrap:balance]">
            {heroHeading}
          </h1>

          <p className="text-base sm:text-xl text-stone-300 font-normal max-w-2xl mx-auto mb-10 leading-relaxed font-sans [text-wrap:balance]">
            {heroSubtitle}
          </p>

          {/* Action CTAs: Primary + Secondary */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/booking"
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0B132B] bg-[#C5A880] hover:bg-[#d5ba94] rounded shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              {t('hero_cta_book')}
            </Link>
            <a
              href="#about-hotel"
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-black/40 hover:bg-black/60 border border-white/30 hover:border-white/60 rounded backdrop-blur-sm transition-all"
            >
              {t('hero_cta_discover')}
            </a>
          </div>
        </div>
      </section>

      {/* 2. QUICK BOOKING STRIP */}
      <section className="-mt-16 sm:-mt-20 relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-stone-200/90 rounded-lg shadow-xl p-5 sm:p-6 lg:p-8">
          <form onSubmit={handleQuickBook} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{t('quick_checkin')}</span>
              </label>
              <input
                type="date"
                required
                min={todayStr}
                value={quickCheckIn}
                onChange={(e) => setQuickCheckIn(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded focus:border-[#C5A880] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{t('quick_checkout')}</span>
              </label>
              <input
                type="date"
                required
                min={quickCheckIn || todayStr}
                value={quickCheckOut}
                onChange={(e) => setQuickCheckOut(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded focus:border-[#C5A880] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-stone-400" />
                <span>{t('quick_adults')}</span>
              </label>
              <select
                value={quickAdults}
                onChange={(e) => setQuickAdults(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded focus:border-[#C5A880] outline-none bg-white"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Adulte' : 'Adultes'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                {t('quick_room_type')}
              </label>
              <select
                value={quickRoomId}
                onChange={(e) => setQuickRoomId(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded focus:border-[#C5A880] outline-none bg-white truncate"
              >
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#0B132B] hover:bg-[#1E293B] text-white text-xs font-semibold uppercase tracking-wider rounded border border-[#C5A880]/70 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{t('quick_check_availability')}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 3. TRUST & LOCATION METRICS ROW (Strictly truthful attribution) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-stone-200/80 rounded-lg flex items-start gap-4">
            <div className="p-3 bg-amber-50 text-[#C5A880] rounded">
              <Star className="w-6 h-6 fill-[#C5A880]" />
            </div>
            <div>
              <div className="font-serif text-lg font-bold text-stone-900">
                {t('trust_rating_title')}
              </div>
              <p className="text-xs text-stone-500 mt-1">
                {t('trust_rating_desc')}
              </p>
            </div>
          </div>

          <div className="p-6 bg-white border border-stone-200/80 rounded-lg flex items-start gap-4">
            <div className="p-3 bg-stone-100 text-stone-800 rounded">
              <MapPin className="w-6 h-6 text-[#C5A880]" />
            </div>
            <div>
              <div className="font-serif text-lg font-bold text-stone-900">
                {t('trust_location_title')}
              </div>
              <p className="text-xs text-stone-500 mt-1">
                {settings.address}
              </p>
            </div>
          </div>

          <div className="p-6 bg-white border border-stone-200/80 rounded-lg flex items-start gap-4">
            <div className="p-3 bg-stone-100 text-stone-800 rounded">
              <ShieldCheck className="w-6 h-6 text-[#C5A880]" />
            </div>
            <div>
              <div className="font-serif text-lg font-bold text-stone-900">
                {t('trust_amenities_title')}
              </div>
              <p className="text-xs text-stone-500 mt-1">
                {t('trust_amenities_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT & OASIS ARCHITECTURE SECTION */}
      <section id="about-hotel" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#C5A880]">
              {language === 'ar' ? 'فخامة وأصالة' : 'Hôtellerie de Prestige'}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight [text-wrap:balance]">
              {t('oasis_title')}
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed">
              <p>{t('oasis_p1')}</p>
              <p>{t('oasis_p2')}</p>
            </div>

            {/* Reported amenities icons bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-stone-700">
                <Waves className="w-4 h-4 text-[#C5A880]" />
                <span>Piscine Extérieure</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-stone-700">
                <Wifi className="w-4 h-4 text-[#C5A880]" />
                <span>Wi-Fi Gratuit</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-stone-700">
                <Coffee className="w-4 h-4 text-[#C5A880]" />
                <span>Petit-déjeuner</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-stone-700">
                <Car className="w-4 h-4 text-[#C5A880]" />
                <span>Parking Sécurisé</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-stone-700">
                <Wind className="w-4 h-4 text-[#C5A880]" />
                <span>Climatisation</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-stone-700">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Accès PMR</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0B132B] hover:text-[#8C6D3F] transition-colors"
              >
                <span>{t('nav_services')}</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </Link>
            </div>
          </div>

          {/* Luxury Photography Frame */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl border border-stone-200">
            <img
              src={ASSET_IMAGES.pool}
              alt="Piscine de l'Hôtel Jugurtha Palace"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 5. FEATURED ROOMS & SUITES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#C5A880] mb-2">
              {language === 'ar' ? 'الإقامة والراحة' : 'Séjour d’Exception'}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              {t('featured_rooms_title')}
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-xl">
              {t('featured_rooms_subtitle')}
            </p>
          </div>
          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0B132B] hover:text-[#8C6D3F] whitespace-nowrap shrink-0 transition-colors"
          >
            <span>{t('view_all_rooms')}</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      {/* 6. FINE DINING & GASTRONOMY RESTAURANT */}
      <section className="bg-stone-900 text-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 relative aspect-[4/3] rounded-lg overflow-hidden border border-stone-800 shadow-xl">
              <img
                src={ASSET_IMAGES.dining}
                alt="Restaurant Jugurtha Palace Hotel"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#C5A880]">
                {language === 'ar' ? 'المذاق التونسي الأصيل' : 'Gastronomie & Saveurs'}
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                {t('dining_title')}
              </h2>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                {t('dining_p1')}
              </p>
              <div className="p-4 bg-stone-950/60 border border-stone-800 rounded text-xs text-stone-400 space-y-1">
                <span className="font-semibold text-[#C5A880] block">Buffet & Service</span>
                <p>Petit-déjeuner buffet matinal, déjeuners et dîners servis dans un cadre spacieux et chaleureux.</p>
              </div>
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0B132B] bg-[#C5A880] hover:bg-[#d5ba94] rounded transition-colors"
              >
                <span>{t('hero_cta_book')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#C5A880] mb-2">
              {t('nav_gallery')}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              {language === 'ar' ? 'لمحة عن فندق قصر يوغرطة' : 'Aperçu du Jugurtha Palace'}
            </h2>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0B132B] hover:text-[#8C6D3F] transition-colors"
          >
            <span>{t('nav_gallery')}</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {gallery.slice(0, 4).map((item) => (
            <Link
              key={item.id}
              to="/gallery"
              className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 border border-stone-200"
            >
              <img
                src={resolveHotelImage(item.imageUrl)}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = ASSET_IMAGES.hero;
                }}
              />
              <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 text-white text-xs font-medium">
                <span className="truncate">{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. DISCOVER GAFSA TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-xl overflow-hidden bg-stone-950 border border-stone-800">
          <div className="absolute inset-0 z-0">
            <img
              src={ASSET_IMAGES.oasis}
              alt="Oasis et reliefs de Gafsa"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl text-white space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#C5A880]">
              <Compass className="w-4 h-4" />
              <span>{t('nav_gafsa')}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              {t('gafsa_hero_title')}
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              {t('gafsa_hero_subtitle')}
            </p>
            <div className="pt-2">
              <Link
                to="/discover-gafsa"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0B132B] bg-[#C5A880] hover:bg-[#d5ba94] rounded transition-colors"
              >
                <span>{language === 'ar' ? 'استكشف المعالم والأنشطة' : 'Explorer les curiosités de Gafsa'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CONTACT & RESERVATION CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white border border-stone-200/90 rounded-xl p-8 sm:p-12 shadow-sm text-center max-w-3xl mx-auto space-y-6">
          <div className="w-12 h-12 bg-[#0B132B] text-[#C5A880] rounded-full flex items-center justify-center mx-auto">
            <Phone className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            {language === 'ar' ? 'هل تخطط لإقامتك في قفصة؟' : 'Préparez votre séjour à Gafsa'}
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed [text-wrap:balance]">
            {t('reservation_disclaimer_text')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/booking"
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0B132B] hover:bg-[#1E293B] border border-[#C5A880] rounded transition-colors"
            >
              {t('hero_cta_book')}
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-stone-800 bg-stone-100 hover:bg-stone-200 rounded transition-colors"
            >
              {t('nav_contact')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
