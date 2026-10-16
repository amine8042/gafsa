import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface Translations {
  [key: string]: {
    fr: string;
    en: string;
    ar: string;
  };
}

export const TRANSLATIONS: Translations = {
  // Navigation
  nav_home: { fr: 'Accueil', en: 'Home', ar: 'الرئيسية' },
  nav_rooms: { fr: 'Chambres & Suites', en: 'Rooms & Suites', ar: 'الغرف والأجنحة' },
  nav_services: { fr: 'Services & Confort', en: 'Services', ar: 'الخدمات' },
  nav_gallery: { fr: 'Galerie', en: 'Gallery', ar: 'معرض الصور' },
  nav_gafsa: { fr: 'Découvrir Gafsa', en: 'Discover Gafsa', ar: 'اكتشف قفصة' },
  nav_contact: { fr: 'Contact', en: 'Contact', ar: 'اتصل بنا' },
  nav_book_now: { fr: 'Réserver', en: 'Book Now', ar: 'احجز الآن' },
  nav_admin: { fr: 'Administration', en: 'Admin', ar: 'الإدارة' },

  // Hero
  hero_cta_book: { fr: 'Réserver votre séjour', en: 'Reserve Your Stay', ar: 'احجز إقامتك' },
  hero_cta_discover: { fr: 'Découvrir l’hôtel', en: 'Discover The Hotel', ar: 'اكتشف الفندق' },
  hero_stars: { fr: 'Hôtel 5 Étoiles · Gafsa, Tunisie', en: '5-Star Hotel · Gafsa, Tunisia', ar: 'فندق 5 نجوم · قفصة، تونس' },

  // Quick booking bar
  quick_checkin: { fr: 'Arrivée', en: 'Check-in', ar: 'تاريخ الوصول' },
  quick_checkout: { fr: 'Départ', en: 'Check-out', ar: 'تاريخ المغادرة' },
  quick_adults: { fr: 'Adultes', en: 'Adults', ar: 'البالغين' },
  quick_children: { fr: 'Enfants', en: 'Children', ar: 'الأطفال' },
  quick_room_type: { fr: 'Type d’hébergement', en: 'Room Type', ar: 'نوع الغرفة' },
  quick_check_availability: { fr: 'Vérifier la disponibilité', en: 'Check Availability', ar: 'طلب الحجز' },

  // Trust markers
  trust_rating_title: { fr: '3.6 / 5 sur Google', en: '3.6 / 5 on Google', ar: '3.6 / 5 على جوجل' },
  trust_rating_desc: { fr: 'Basé sur 629 avis vérifiés', en: 'Based on 629 verified reviews', ar: 'استناداً إلى 629 تقييم حقيقي' },
  trust_location_title: { fr: 'Situation Privilégiée', en: 'Prime Oasis Location', ar: 'موقع مميز' },
  trust_location_desc: { fr: 'CPPV+8G, Gafsa, Tunisie', en: 'CPPV+8G, Gafsa, Tunisia', ar: 'قفصة، الجمهورية التونسية' },
  trust_amenities_title: { fr: 'Prestations 5 Étoiles', en: '5-Star Hospitality', ar: 'خدمات 5 نجوم' },
  trust_amenities_desc: { fr: 'Piscine, Wi-Fi, Parking, Restaurant', en: 'Pool, Wi-Fi, Parking, Restaurant', ar: 'مسبح، إنترنت، موقف، مطعم' },

  // Sections
  featured_rooms_title: { fr: 'Chambres & Suites d’Exception', en: 'Rooms & Signature Suites', ar: 'أجنحة وغرف فاخرة' },
  featured_rooms_subtitle: { fr: 'Chaque chambre allie charme architectural tunisien et commodités haut de gamme.', en: 'Every room combines Tunisian architectural charm with upscale amenities.', ar: 'تجمع كل غرفة بين سحر المعمار التونسي ووسائل الراحة الراقية.' },
  view_all_rooms: { fr: 'Voir tous les hébergements', en: 'View All Accommodations', ar: 'عرض جميع الغرف والأجنحة' },
  per_night: { fr: 'la nuit', en: 'per night', ar: 'في الليلة' },
  guests: { fr: 'personnes', en: 'guests', ar: 'ضيوف' },
  view_details: { fr: 'Voir détails', en: 'View Details', ar: 'التفاصيل' },
  book_this_room: { fr: 'Demander cette chambre', en: 'Request This Room', ar: 'طلب هذا الجناح' },

  // Services section
  services_title: { fr: 'Services & Équipements de l’Hôtel', en: 'Hotel Amenities & Services', ar: 'خدمات وتجهيزات الفندق' },
  services_subtitle: { fr: 'Des prestations soignées pour un séjour mémorable à Gafsa.', en: 'Thoughtfully curated amenities for a memorable stay in Gafsa.', ar: 'خدمات متكاملة لإقامة مميزة في قفصة.' },
  services_disclaimer: { fr: 'Certains services et horaires peuvent varier selon la saison. Contactez la réception pour toute demande spécifique.', en: 'Certain services and hours may vary seasonally. Contact reception for specific inquiries.', ar: 'قد تختلف بعض الخدمات وساعات العمل وفقاً للموسم. يرجى مراجعة الاستقبال للتفاصيل.' },

  // Oasis & Pool section
  oasis_title: { fr: 'Une Oasis de Sérénité & Piscine Extérieure', en: 'An Oasis of Serenity & Outdoor Pool', ar: 'واحة من الهدوء ومسبح خارجي' },
  oasis_p1: { fr: 'Niché à l’entrée du grand sud tunisien, le Jugurtha Palace Hotel vous accueille dans un domaine arboré de palmiers dattiers, propice au repos et au dépaysement.', en: 'Nestled at the gateway to the Tunisian south, Jugurtha Palace Hotel welcomes you to palm-shaded grounds designed for rest and inspiration.', ar: 'يقع فندق قصر يوغرطة عند بوابة الجنوب التونسي، ويرحب بكم في محيط هادئ محاط بالنخيل للاسترخاء التام.' },
  oasis_p2: { fr: 'Profitez de notre vaste piscine extérieure et détendez-vous sur nos bains de soleil sous le climat ensoleillé de Gafsa.', en: 'Enjoy our expansive outdoor swimming pool and relax on sun loungers under Gafsa’s warm climate.', ar: 'استمتع بمسبحنا الخارجي الواسع واسترخِ تحت أشعة شمس قفصة الدافئة.' },

  // Dining section
  dining_title: { fr: 'Gastronomie & Hospitalité Sud-Tunisienne', en: 'Gastronomy & Southern Hospitality', ar: 'المطعم والأصالة التونسية' },
  dining_p1: { fr: 'Découvrez des saveurs méditerranéennes et régionales préparées avec soin dans notre salle de restauration aux voûtes majestueuses.', en: 'Discover Mediterranean and regional flavors prepared with care in our grand dining room.', ar: 'اكتشف أشهى الأطباق التونسية والمتوسطية في قاعة طعام ذات طراز معماري فخم.' },

  // Reservation notice & disclaimer
  reservation_notice_title: { fr: 'Avis Important sur les Réservations', en: 'Important Reservation Notice', ar: 'تنبيه هام حول الحجوزات' },
  reservation_disclaimer_text: {
    fr: 'Votre demande sera transmise à l’hôtel. La réservation sera confirmée uniquement après validation par l’établissement.',
    en: 'Your request will be transmitted to the hotel. The reservation will be confirmed only after validation by the establishment.',
    ar: 'سيتم إرسال طلبكم إلى الفندق. لن يتم تأكيد الحجز إلا بعد مراجعته والموافقة عليه من قبل إدارة الفندق.'
  },
  reservation_whatsapp_btn: { fr: 'Envoyer la demande via WhatsApp', en: 'Send Request via WhatsApp', ar: 'إرسال الطلب عبر واتساب' },
  reservation_email_btn: { fr: 'Envoyer la demande par E-mail', en: 'Send Request via Email', ar: 'إرسال الطلب عبر البريد الإلكتروني' },
  reservation_form_title: { fr: 'Demande de Réservation en Ligne', en: 'Online Reservation Request', ar: 'طلب حجز إقامة' },
  reservation_form_subtitle: { fr: 'Remplissez le formulaire ci-dessous pour transmettre directement vos dates et souhaits.', en: 'Fill out the form below to directly share your dates and preferences.', ar: 'يرجى ملء النموذج لإرسال تفاصيل ومواعيد إقامتكم مباشرة.' },

  // Form fields
  form_fullname: { fr: 'Nom complet', en: 'Full Name', ar: 'الاسم الكامل' },
  form_email: { fr: 'Adresse e-mail', en: 'Email Address', ar: 'البريد الإلكتروني' },
  form_phone: { fr: 'Numéro de téléphone', en: 'Phone Number', ar: 'رقم الهاتف' },
  form_requests: { fr: 'Demandes particulières (heure d’arrivée, lit bébé, etc.)', en: 'Special Requests (arrival time, crib, etc.)', ar: 'طلبات خاصة (موعد الوصول، سرير إضافي، إلخ)' },
  form_send: { fr: 'Générer ma demande de réservation', en: 'Generate My Reservation Request', ar: 'توليد طلب الحجز' },

  // Discover Gafsa
  gafsa_hero_title: { fr: 'Gafsa, Terre d’Histoire & Portes du Sud', en: 'Gafsa, Land of History & Gateway to the South', ar: 'قفصة، أرض التاريخ وبوابة الجنوب' },
  gafsa_hero_subtitle: { fr: 'Une cité millénaire riche de ses piscines romaines, de ses gorges spectaculaires et de sa palmeraie ancestrale.', en: 'An ancient crossroads famed for its Roman pools, dramatic gorges, and historical oasis.', ar: 'مدينة عريقة تشتهر بأحواضها الرومانية ومضايقها الطبيعية وواحتها التاريخية.' },

  // Contact
  contact_title: { fr: 'Contactez le Jugurtha Palace Hotel', en: 'Contact Jugurtha Palace Hotel', ar: 'تواصل مع فندق قصر يوغرطة' },
  contact_subtitle: { fr: 'Notre équipe est à votre écoute pour vous renseigner et préparer votre séjour.', en: 'Our team is at your disposal to answer questions and prepare your visit.', ar: 'فريقنا في خدمتكم للإجابة على جميع استفساراتكم والترحيب بكم.' },
  contact_phone_label: { fr: 'Téléphone', en: 'Phone', ar: 'الهاتف' },
  contact_address_label: { fr: 'Adresse', en: 'Address', ar: 'العنوان' },
  contact_whatsapp_label: { fr: 'WhatsApp Direct', en: 'Direct WhatsApp', ar: 'واتساب مباشر' },
  contact_form_send_btn: { fr: 'Envoyer le message', en: 'Send Message', ar: 'إرسال الرسالة' },

  // Footer
  footer_about: {
    fr: 'Hôtel 5 étoiles à Gafsa, Tunisie. Un cadre authentique associant architecture traditionnelle et confort d’exception.',
    en: '5-star hotel in Gafsa, Tunisia. An authentic setting combining traditional architecture with refined comfort.',
    ar: 'فندق 5 نجوم في قفصة، تونس. طراز أصيل يجمع بين روعة المعمار ووسائل الراحة الفاخرة.'
  },
  footer_rights: { fr: 'Tous droits réservés.', en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' },
  footer_admin_link: { fr: 'Espace Gestion & Administration', en: 'Management & Admin Portal', ar: 'بوابة الإدارة' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('jugurtha_lang') as Language;
      if (saved && ['fr', 'en', 'ar'].includes(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'fr'; // French as default per user specification
  });

  const isRTL = language === 'ar';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('jugurtha_lang', lang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  const t = (key: string): string => {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[language] || entry.fr || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
