import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReservationForm } from '../components/ReservationForm';
import { useHotel } from '../context/HotelContext';
import { useLanguage } from '../context/LanguageContext';
import { ShieldAlert, Phone, MessageSquare, Check, Sparkles } from 'lucide-react';

export const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialRoomId = searchParams.get('room') || undefined;
  const { settings } = useHotel();
  const { t, language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#C5A880] mb-2">
          {language === 'ar' ? 'حجز مباشر' : 'Demande Directe d’Hébergement'}
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
          {t('hero_cta_book')}
        </h1>
        <p className="text-base text-stone-600 mt-4 leading-relaxed">
          Transmettez vos dates et préférences en quelques clics. Vous pourrez envoyer instantanément votre demande par WhatsApp pré-rempli ou par e-mail direct à la réception du Jugurtha Palace Hotel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Main Form (8 cols) */}
        <div className="lg:col-span-8">
          <ReservationForm initialRoomId={initialRoomId} />
        </div>

        {/* Side Guidance & Terms (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Transparency Card */}
          <div className="p-6 bg-[#FAF9F6] border border-stone-200 rounded-lg space-y-4">
            <div className="flex items-center gap-2 font-serif text-base font-bold text-stone-900">
              <ShieldAlert className="w-5 h-5 text-[#C5A880]" />
              <span>{t('reservation_notice_title')}</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t('reservation_disclaimer_text')}
            </p>
            <div className="pt-2 border-t border-stone-200 text-xs text-stone-600 space-y-2">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Aucun paiement en ligne requis sur ce site</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Réponse personnalisée par téléphone ou WhatsApp</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Tarifs et conditions arrêtés par l’établissement</span>
              </div>
            </div>
          </div>

          {/* Quick Direct Help */}
          <div className="p-6 bg-white border border-stone-200/90 rounded-lg space-y-3 shadow-sm">
            <h4 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wider">
              {language === 'ar' ? 'الاتصال المباشر' : 'Contact Téléphonique'}
            </h4>
            <p className="text-xs text-stone-600">
              Pour une réponse immédiate sur les disponibilités du jour ou pour un groupe :
            </p>
            <div className="space-y-2 pt-1 font-medium text-xs">
              <a
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-2 text-stone-900 hover:text-[#8C6D3F]"
              >
                <Phone className="w-4 h-4 text-[#C5A880]" />
                <span>{settings.phone}</span>
              </a>
              <a
                href={`https://wa.me/${(settings.whatsappNumber || '21676211200').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#25D366] hover:underline"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp : +{settings.whatsappNumber || '21676211200'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
