import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Bed, ArrowRight, Check } from 'lucide-react';
import { Room } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface RoomCardProps {
  room: Room;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const { language, t } = useLanguage();

  const title =
    language === 'ar' ? room.nameAr : language === 'en' ? room.nameEn : room.name;
  const description =
    language === 'ar'
      ? room.descriptionAr
      : language === 'en'
      ? room.descriptionEn
      : room.description;

  const imageSrc = room.images && room.images.length > 0 ? room.images[0] : '';

  return (
    <article className="group bg-white border border-stone-200/80 rounded-lg overflow-hidden flex flex-col hover:border-[#C5A880]/60 transition-all duration-300 hover:shadow-lg">
      {/* Image container with subtle aspect ratio */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-200 text-stone-500 font-serif">
            Jugurtha Palace
          </div>
        )}

        {/* Price overlay on image with luxury styling */}
        <div className="absolute bottom-3 left-3 bg-[#0B132B]/85 backdrop-blur-sm text-white px-3 py-1.5 rounded text-xs font-medium">
          <span className="font-serif text-sm font-bold text-[#C5A880] tabular-nums">
            {room.pricePerNight}
          </span>{' '}
          <span className="text-[11px] text-slate-300">TND / {t('per_night')}</span>
        </div>
      </div>

      {/* Content block */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed metadata line with typographic separators */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span>{room.type}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{room.sizeM2} m²</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-stone-400" />
              <span>
                {room.capacity.maxGuests} {t('guests')}
              </span>
            </span>
          </div>

          <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#8C6D3F] transition-colors mb-2.5">
            <Link to={`/rooms/${room.slug}`}>{title}</Link>
          </h3>

          <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed mb-4">
            {description}
          </p>

          {/* Key amenities list */}
          <div className="space-y-1.5 mb-6 text-xs text-stone-600">
            {room.amenities.slice(0, 3).map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <span className="truncate">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
          <Link
            to={`/rooms/${room.slug}`}
            className="text-xs font-semibold text-stone-700 hover:text-[#8C6D3F] transition-colors flex items-center gap-1 group/btn"
          >
            <span>{t('view_details')}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>

          <Link
            to={`/booking?room=${room.id}`}
            className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0B132B] hover:text-white bg-transparent hover:bg-[#0B132B] border border-[#0B132B] rounded transition-colors whitespace-nowrap"
          >
            {t('nav_book_now')}
          </Link>
        </div>
      </div>
    </article>
  );
};
