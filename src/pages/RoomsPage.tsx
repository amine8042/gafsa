import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { useLanguage } from '../context/LanguageContext';
import { RoomCard } from '../components/RoomCard';
import { Users, Filter, Sparkles, ShieldAlert } from 'lucide-react';

export const RoomsPage: React.FC = () => {
  const { rooms } = useHotel();
  const { t, language } = useLanguage();
  const [guestFilter, setGuestFilter] = useState<'all' | '1-2' | '3-4'>('all');

  const filteredRooms = rooms.filter((r) => {
    if (guestFilter === '1-2') return r.capacity.maxGuests <= 2;
    if (guestFilter === '3-4') return r.capacity.maxGuests >= 3;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#C5A880] mb-2">
          {language === 'ar' ? 'أماكن الإقامة والراحة' : 'Hébergements 5 Étoiles'}
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
          {t('nav_rooms')}
        </h1>
        <p className="text-base text-stone-600 mt-4 leading-relaxed">
          {t('featured_rooms_subtitle')}
        </p>

        {/* Essential transparency callout */}
        <div className="mt-4 p-3 bg-stone-50 border border-stone-200/90 rounded text-xs text-stone-600 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
          <span>
            {t('reservation_disclaimer_text')}
          </span>
        </div>
      </div>

      {/* Interactive Filter Tabs (Strictly functional buttons with zero-pill styling) */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-4">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'تصفية حسب السعة :' : 'Capacité :'}</span>
        </span>
        <button
          onClick={() => setGuestFilter('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
            guestFilter === 'all'
              ? 'bg-[#0B132B] text-white'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          {language === 'ar' ? 'جميع الغرف' : 'Tous les hébergements'}
        </button>
        <button
          onClick={() => setGuestFilter('1-2')}
          className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
            guestFilter === '1-2'
              ? 'bg-[#0B132B] text-white'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          1 à 2 personnes
        </button>
        <button
          onClick={() => setGuestFilter('3-4')}
          className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
            guestFilter === '3-4'
              ? 'bg-[#0B132B] text-white'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          3 personnes et plus
        </button>
      </div>

      {/* Rooms Grid */}
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-stone-200 rounded-lg">
          <p className="text-stone-500 text-sm">
            {language === 'ar'
              ? 'لا توجد غرف تطابق هذا المعيار حالياً.'
              : 'Aucun hébergement ne correspond à ce filtre.'}
          </p>
          <button
            onClick={() => setGuestFilter('all')}
            className="mt-3 text-xs font-semibold text-[#8C6D3F] underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};
