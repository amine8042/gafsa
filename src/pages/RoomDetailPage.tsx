import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Bed, 
  Check, 
  Calendar, 
  ArrowLeft, 
  ShieldAlert, 
  Maximize2, 
  Sparkles,
  Phone,
  MessageSquare
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { useLanguage } from '../context/LanguageContext';
import { ReservationForm } from '../components/ReservationForm';
import { ImageLightbox } from '../components/ImageLightbox';
import { GalleryItem } from '../types';

export const RoomDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { rooms, settings } = useHotel();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const room = rooms.find((r) => r.slug === slug || r.id === slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!room) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-stone-900 mb-4">
          Hébergement introuvable
        </h2>
        <p className="text-sm text-stone-600 mb-8">
          La chambre ou suite demandée n'existe pas ou a été modifiée.
        </p>
        <Link
          to="/rooms"
          className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0B132B] rounded"
        >
          Retour aux chambres
        </Link>
      </div>
    );
  }

  const title =
    language === 'ar' ? room.nameAr : language === 'en' ? room.nameEn : room.name;
  const description =
    language === 'ar'
      ? room.descriptionAr
      : language === 'en'
      ? room.descriptionEn
      : room.description;

  const currentImage = room.images && room.images.length > 0 ? room.images[activeImageIndex] : '';

  const lightboxItem: GalleryItem | null = currentImage
    ? {
        id: room.id,
        title: title,
        category: 'rooms',
        imageUrl: currentImage,
        caption: `${room.type} · ${room.sizeM2} m² · Jugurtha Palace Hotel`,
      }
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* Breadcrumb / Back Link */}
      <div>
        <Link
          to="/rooms"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#8C6D3F] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('view_all_rooms')}</span>
        </Link>
      </div>

      {/* Main Grid: Left Gallery + Details; Right Booking Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Left Column: Gallery & Details (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Photo Stage */}
          <div className="relative aspect-[16/10] bg-stone-100 rounded-lg overflow-hidden border border-stone-200">
            {currentImage ? (
              <img
                src={currentImage}
                alt={title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              />
            ) : null}

            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="absolute bottom-3 right-3 p-2 bg-black/60 hover:bg-black/80 text-white rounded backdrop-blur-sm transition-colors text-xs flex items-center gap-1.5"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Agrandir</span>
            </button>
          </div>

          {/* Thumbnails Row */}
          {room.images && room.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {room.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-16 rounded overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#C5A880] ring-1 ring-[#C5A880]'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Title & Metadata */}
          <div className="border-b border-stone-200 pb-6 space-y-3">
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <span>{room.type}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{room.sizeM2} m²</span>
              <span aria-hidden="true">·</span>
              <span>
                {room.capacity.maxGuests} {t('guests')}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              {title}
            </h1>

            <div className="text-xl font-bold text-stone-900 font-serif">
              <span className="text-[#8C6D3F] tabular-nums">{room.pricePerNight} TND</span>{' '}
              <span className="text-xs font-sans text-stone-500 font-normal">
                / {t('per_night')}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              {language === 'ar' ? 'وصف الغرفة' : 'Description du logement'}
            </h3>
            <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
              {description}
            </p>
          </div>

          {/* Key Specs: Bed & Capacity */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-stone-50 border border-stone-200/90 rounded text-xs text-stone-700">
            <div>
              <span className="text-stone-500 block mb-0.5">Configuration du lit :</span>
              <span className="font-semibold text-stone-900">{room.bedType}</span>
            </div>
            <div>
              <span className="text-stone-500 block mb-0.5">Capacité maximale :</span>
              <span className="font-semibold text-stone-900">
                {room.capacity.adults} adultes + {room.capacity.children} enfants (max {room.capacity.maxGuests})
              </span>
            </div>
          </div>

          {/* Amenities checklist */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              {language === 'ar' ? 'تجهيزات ومرافق الغرفة' : 'Équipements inclus'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-stone-700">
              {room.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Reservation Request Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-6">
            <ReservationForm initialRoomId={room.id} />

            {/* Direct Hotel Assistance Box */}
            <div className="p-5 bg-[#FAF9F6] border border-stone-200 rounded-lg text-xs text-stone-600 space-y-3">
              <span className="font-semibold text-stone-800 uppercase tracking-wider block">
                {language === 'ar' ? 'مساعدة فورية' : 'Assistance & Réservation'}
              </span>
              <p>
                Vous préférez échanger directement avec la réception ? Appelez-nous ou envoyez un message :
              </p>
              <div className="space-y-1.5 font-medium text-stone-800">
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-2 hover:text-[#8C6D3F] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{settings.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${(settings.whatsappNumber || '21676211200').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#25D366] hover:underline"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp direct (+216 76 211 200)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox for large viewing */}
      {lightboxOpen && lightboxItem && (
        <ImageLightbox
          item={lightboxItem}
          onClose={() => setLightboxOpen(false)}
          onNext={() => {
            if (room.images && room.images.length > 1) {
              setActiveImageIndex((prev) => (prev + 1) % room.images.length);
            }
          }}
          onPrev={() => {
            if (room.images && room.images.length > 1) {
              setActiveImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
            }
          }}
        />
      )}
    </div>
  );
};
