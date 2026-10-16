import React from 'react';
import { 
  Waves, 
  Wifi, 
  Coffee, 
  Wind, 
  Car, 
  Accessibility, 
  Clock, 
  UtensilsCrossed, 
  ShieldCheck, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const ICON_MAP: Record<string, React.ElementType> = {
  Waves,
  Wifi,
  Coffee,
  Wind,
  Car,
  Accessibility,
  Clock,
  UtensilsCrossed,
};

export const ServicesPage: React.FC = () => {
  const { services, settings } = useHotel();
  const { t, language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#C5A880] mb-2">
          {language === 'ar' ? 'وسائل الراحة والخدمات' : 'Hospitalité 5 Étoiles'}
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
          {t('services_title')}
        </h1>
        <p className="text-base text-stone-600 mt-4 leading-relaxed">
          {t('services_subtitle')}
        </p>
      </div>

      {/* Services Grid with anti-slop zero-pill design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => {
          const IconComponent = ICON_MAP[service.iconName] || Sparkles;
          const title =
            language === 'ar'
              ? service.titleAr
              : language === 'en'
              ? service.titleEn
              : service.title;
          const desc =
            language === 'ar'
              ? service.descriptionAr
              : language === 'en'
              ? service.descriptionEn
              : service.description;

          return (
            <div
              key={service.id}
              className="bg-white border border-stone-200/90 rounded-lg p-6 flex flex-col justify-between hover:border-[#C5A880]/70 transition-colors shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-stone-100 text-[#8C6D3F] rounded">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  {service.isVerified && (
                    <span className="text-[11px] font-medium text-emerald-800 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{language === 'ar' ? 'خدمة متوفرة' : 'Service vérifié'}</span>
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 text-[11px] text-stone-500">
                Jugurtha Palace Hotel · Gafsa
              </div>
            </div>
          );
        })}
      </div>

      {/* Important Transparency Notice */}
      <div className="p-6 bg-stone-50 border border-stone-200 rounded-lg max-w-4xl mx-auto space-y-2 text-xs text-stone-600">
        <div className="flex items-center gap-2 font-semibold text-stone-800">
          <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
          <span>Information & Transparence</span>
        </div>
        <p className="leading-relaxed">
          {t('services_disclaimer')}
        </p>
      </div>

      {/* Callout to Reception */}
      <div className="text-center bg-[#0B132B] text-white p-10 rounded-xl space-y-4 max-w-3xl mx-auto">
        <h3 className="font-serif text-2xl font-bold">
          {language === 'ar' ? 'هل لديكم أي استفسار حول خدماتنا؟' : 'Une demande spécifique pour votre séjour ?'}
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto">
          Notre équipe de réception à Gafsa est à votre disposition 24h/24 pour répondre à vos questions et organiser votre accueil.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
            className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0B132B] bg-[#C5A880] hover:bg-[#d5ba94] rounded transition-colors inline-flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{settings.phone}</span>
          </a>
          <Link
            to="/contact"
            className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white border border-white/30 hover:border-white/70 rounded transition-colors"
          >
            {t('nav_contact')}
          </Link>
        </div>
      </div>
    </div>
  );
};
