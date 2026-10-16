import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../types';

interface ImageLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({ item, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 animate-in fade-in duration-200"
    >
      {/* Top Bar with title & close */}
      <div className="flex items-center justify-between text-white max-w-7xl w-full mx-auto pb-4">
        <div className="truncate pr-4">
          <h4 className="font-serif text-lg font-bold text-white truncate">{item.title}</h4>
          {item.caption && <p className="text-xs text-stone-400 truncate">{item.caption}</p>}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-stone-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center max-w-7xl w-full mx-auto overflow-hidden">
        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="absolute left-2 md:left-4 z-10 p-3 text-white/80 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <img
          src={item.imageUrl}
          alt={item.title}
          referrerPolicy="no-referrer"
          className="max-h-[80vh] max-w-full object-contain rounded select-none shadow-2xl"
        />

        {onNext && (
          <button
            type="button"
            onClick={onNext}
            className="absolute right-2 md:right-4 z-10 p-3 text-white/80 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom caption hint */}
      <div className="text-center text-xs text-stone-500 py-2">
        Jugurtha Palace Hotel · Gafsa
      </div>
    </div>
  );
};
