import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { useLanguage } from '../context/LanguageContext';
import { ImageLightbox } from '../components/ImageLightbox';
import { GalleryItem } from '../types';
import { Maximize2, Camera } from 'lucide-react';
import { resolveHotelImage, ASSET_IMAGES } from '../assets/images';

export const GalleryPage: React.FC = () => {
  const { gallery } = useHotel();
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: language === 'ar' ? 'الكل' : 'Toutes les photos' },
    { id: 'exterior', label: language === 'ar' ? 'المعمار والواجهة' : 'Extérieur & Façade' },
    { id: 'pool', label: language === 'ar' ? 'المسبح والواحة' : 'Piscine & Jardins' },
    { id: 'rooms', label: language === 'ar' ? 'الغرف والأجنحة' : 'Chambres & Suites' },
    { id: 'dining', label: language === 'ar' ? 'المطعم' : 'Gastronomie' },
    { id: 'facilities', label: language === 'ar' ? 'المرافق' : 'Espaces de vie' },
  ];

  const filteredGallery = gallery.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const activeItem: GalleryItem | null =
    activeLightboxIndex !== null && filteredGallery[activeLightboxIndex]
      ? filteredGallery[activeLightboxIndex]
      : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#C5A880] mb-2">
          {language === 'ar' ? 'استكشف الفندق' : 'Galerie Photographique'}
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
          {t('nav_gallery')}
        </h1>
        <p className="text-base text-stone-600 mt-4 leading-relaxed">
          {language === 'ar'
            ? 'جولة مصورة تسلط الضوء على سحر المعمار التونسي الأصيل ومرافق فندق قصر يوغرطة الفاخرة.'
            : 'Explorez en images les suites raffinées, la somptueuse piscine extérieure et les espaces d’exception du Jugurtha Palace Hotel.'}
        </p>
      </div>

      {/* Category Tabs (Interactive buttons) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors ${
              selectedCategory === cat.id
                ? 'bg-[#0B132B] text-white shadow-sm'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filteredGallery.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, index) => (
            <div
              key={item.id}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shadow-sm cursor-pointer"
              onClick={() => setActiveLightboxIndex(index)}
            >
              <img
                src={resolveHotelImage(item.imageUrl)}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = ASSET_IMAGES.hero;
                }}
              />

              {/* Hover overlay with title & zoom icon */}
              <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-5 text-white">
                <div className="flex justify-end">
                  <span className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold truncate">{item.title}</h3>
                  {item.caption && (
                    <p className="text-xs text-stone-300 mt-1 line-clamp-2">{item.caption}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white border border-stone-200 rounded-lg space-y-3">
          <Camera className="w-8 h-8 text-stone-400 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-stone-800">
            {language === 'ar' ? 'لا توجد صور في هذه الفئة' : 'Aucune photo dans cette catégorie'}
          </h3>
          <p className="text-xs text-stone-500">
            Vous pouvez ajouter de nouvelles photos via l’espace d’administration du site.
          </p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-xs font-semibold text-[#8C6D3F] underline"
          >
            Afficher toutes les photos
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      {activeItem && (
        <ImageLightbox
          item={activeItem}
          onClose={() => setActiveLightboxIndex(null)}
          onNext={() => {
            if (activeLightboxIndex !== null) {
              setActiveLightboxIndex((activeLightboxIndex + 1) % filteredGallery.length);
            }
          }}
          onPrev={() => {
            if (activeLightboxIndex !== null) {
              setActiveLightboxIndex(
                (activeLightboxIndex - 1 + filteredGallery.length) % filteredGallery.length
              );
            }
          }}
        />
      )}
    </div>
  );
};
