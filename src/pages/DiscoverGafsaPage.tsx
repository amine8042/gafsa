import React from 'react';
import { Compass, MapPin, Landmark, Mountain, Sun, Info, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { ASSET_IMAGES } from '../assets/images';

export const DiscoverGafsaPage: React.FC = () => {
  const { t, language } = useLanguage();

  const attractions = [
    {
      title: 'Les Piscines Romaines de Gafsa',
      titleAr: 'الأحواض الرومانية بقفصة',
      titleEn: 'The Roman Pools of Gafsa',
      category: 'Patrimoine Antique',
      description:
        'Situées au cœur de la ville historique, ces deux bassins monumentaux construits à l’époque romaine captent une source d’eau thermale chaude jaillissant des profondeurs rocheuses. Un témoignage exceptionnel de l’ingénierie hydraulique antique.',
      practical: 'Accessible en centre-ville de Gafsa · Visite libre',
    },
    {
      title: 'Les Gorges de Selja',
      titleAr: 'مضايق سيلجة الطبيعية',
      titleEn: 'Selja Gorges',
      category: 'Merveille Géologique',
      description:
        'Un défilé impressionnant creusé par les eaux à travers de hautes falaises calcaires ocres et pourpres. Ce canyon naturel offre l’un des panoramas les plus spectaculaires de l’ouest tunisien.',
      practical: 'Situé dans la région de Métlaoui · Accès par piste ou train touristique selon ouvertures',
    },
    {
      title: 'La Palmeraie Ancestrale de Gafsa',
      titleAr: 'واحة قفصة التاريخية',
      titleEn: 'Historic Oasis of Gafsa',
      category: 'Oasis & Nature',
      description:
        'Cultivée depuis des millénaires selon la tradition capsienne, l’oasis de Gafsa déploie des milliers de palmiers dattiers, grenadiers et oliviers alimentés par un réseau d’irrigation séculaire.',
      practical: 'Balades pédestres au cœur de la ceinture verte de Gafsa',
    },
    {
      title: 'Le Musée Archéologique de Gafsa',
      titleAr: 'متحف قفصة الأثري',
      titleEn: 'Gafsa Archaeological Museum',
      category: 'Histoire & Culture',
      description:
        'Ce musée met à l’honneur la civilisation capsienne (mésolithique) dont Gafsa (Capsa) est l’éponyme, ainsi qu’une riche collection de mosaïques romaines et d’objets d’époque byzantine découverts dans le gouvernorat.',
      practical: 'Centre-ville de Gafsa · Ouvert du mardi au dimanche',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
      {/* Hero Header */}
      <div className="relative rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={ASSET_IMAGES.oasis}
            alt="Paysages de Gafsa"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = ASSET_IMAGES.oasis;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
        </div>

        <div className="relative z-10 p-8 sm:p-14 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C5A880]">
            <Compass className="w-4 h-4" />
            <span>{t('nav_gafsa')}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
            {t('gafsa_hero_title')}
          </h1>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            {t('gafsa_hero_subtitle')}
          </p>
        </div>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="p-4 sm:p-5 bg-amber-50/70 border border-amber-200/90 rounded-lg text-xs text-amber-900 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <span className="font-semibold block">
            {language === 'ar' ? 'معلومات إقليمية استكشافية' : 'Recommandations régionales indépendantes'}
          </span>
          <p>
            {language === 'ar'
              ? 'يقدم فندق قصر يوغرطة هذه المعالم كدليل سياحي لتعريف النزلاء بروعة المنطقة. الفندق لا ينظم رحلات استكشافية رسمية ما لم يتم التأكيد المباشر مسبقاً مع إدارة الفندق.'
              : 'Ces sites sont présentés à titre d’inspiration pour vos visites personnelles dans la région de Gafsa. Le Jugurtha Palace Hotel ne garantit ni n’organise directement d’excursions sans confirmation préalable auprès de l’établissement.'}
          </p>
        </div>
      </div>

      {/* Attractions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {attractions.map((att, idx) => {
          const title =
            language === 'ar' ? att.titleAr : language === 'en' ? att.titleEn : att.title;

          return (
            <div
              key={idx}
              className="bg-white border border-stone-200/90 rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[#C5A880]/60 transition-colors"
            >
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#8C6D3F]">
                  {att.category}
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  {title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {att.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-500">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <span>{att.practical}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Callout section */}
      <div className="p-8 sm:p-10 bg-white border border-stone-200 rounded-xl text-center max-w-3xl mx-auto space-y-4 shadow-sm">
        <h3 className="font-serif text-2xl font-bold text-stone-900">
          {language === 'ar' ? 'استمتع بإقامة هادئة بعد جولاتك' : 'Séjournez au cœur de votre découverte'}
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Après une journée d’exploration des gorges et du patrimoine de Gafsa, retrouvez la quiétude de nos suites et la fraîcheur de notre piscine extérieure.
        </p>
        <div className="pt-2">
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#0B132B] hover:bg-[#1E293B] border border-[#C5A880] rounded transition-colors"
          >
            <Calendar className="w-4 h-4 text-[#C5A880]" />
            <span>{t('hero_cta_book')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
