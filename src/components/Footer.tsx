import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, Star, Mail, Shield, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHotel } from '../context/HotelContext';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const { settings } = useHotel();

  const cleanPhone = settings.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsApp = (settings.whatsappNumber || '21676211200').replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#0B132B] text-slate-300 border-t border-[#C5A880]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                Jugurtha Palace
              </span>
              <span className="text-xs tracking-widest uppercase font-serif text-[#C5A880] block mt-0.5">
                ★★★★★ · Gafsa, Tunisie
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t('footer_about')}
            </p>
            {/* Google Rating with zero-pill typography */}
            <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <div className="flex items-center text-[#C5A880]">
                <Star className="w-4 h-4 fill-[#C5A880]" />
                <span className="font-semibold text-white ml-1 tabular-nums">
                  {settings.googleRating.score}
                </span>
                <span className="text-slate-500 text-[11px] ml-0.5">/5</span>
              </div>
              <span className="text-slate-600">·</span>
              <span className="tabular-nums">{settings.googleRating.totalReviews} {language === 'ar' ? 'تقييم على جوجل' : 'avis Google'}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white mb-4">
              {language === 'ar' ? 'روابط سريعة' : language === 'en' ? 'Quick Links' : 'Navigation'}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-[#C5A880] transition-colors">
                  {t('nav_home')}
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="hover:text-[#C5A880] transition-colors">
                  {t('nav_rooms')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#C5A880] transition-colors">
                  {t('nav_services')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#C5A880] transition-colors">
                  {t('nav_gallery')}
                </Link>
              </li>
              <li>
                <Link to="/discover-gafsa" className="hover:text-[#C5A880] transition-colors">
                  {t('nav_gafsa')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C5A880] transition-colors">
                  {t('nav_contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Coordinates & Contact */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white mb-4">
              {t('nav_contact')}
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a
                  href={`tel:${cleanPhone}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${cleanWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>WhatsApp direct</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              {settings.email ? (
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <a
                    href={`mailto:${settings.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {settings.email}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          {/* Col 4: Reservation & Transparency Notice */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white mb-4">
              {t('reservation_notice_title')}
            </h4>
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded text-xs text-slate-400 space-y-2 leading-relaxed">
              <p>
                {t('reservation_disclaimer_text')}
              </p>
              <p className="text-[11px] text-slate-500">
                {language === 'ar'
                  ? 'يتم تحديد الأسعار وتأكيد التوفر النهائي مباشرة مع مكتب الاستقبال.'
                  : 'Les tarifs et la disponibilité finale sont confirmés directement avec la réception de l\'hôtel.'}
              </p>
            </div>
            <Link
              to="/booking"
              className="inline-flex items-center justify-center w-full px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-900 bg-[#C5A880] hover:bg-[#d5ba94] rounded transition-colors text-center"
            >
              {t('nav_book_now')}
            </Link>
          </div>
        </div>

        {/* Bottom hairline row */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Jugurtha Palace Hotel. {t('footer_rights')}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.google.com/maps/search/?api=1&query=CPPV%2B8G%2C+Gafsa%2C+Tunisia"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-400 transition-colors flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Google Maps (CPPV+8G)</span>
            </a>
            <Link
              to="/admin/login"
              className="hover:text-slate-400 transition-colors flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{t('footer_admin_link')}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
