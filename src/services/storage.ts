import { Room, HotelService, GalleryItem, BookingRequest, HotelSettings } from '../types';
import { ASSET_IMAGES, resolveHotelImage } from '../assets/images';

export { ASSET_IMAGES, resolveHotelImage };

export const DEFAULT_SETTINGS: HotelSettings = {
  name: 'Jugurtha Palace Hotel',
  category: 'Hôtel de prestige 5 étoiles',
  stars: 5,
  address: 'B.P. 10, Gafsa 2112, Tunisie',
  phone: '+216 76 211 200',
  whatsappNumber: '21676211200',
  email: '', // Not provided officially; configurable in admin dashboard
  googleMapsQuery: 'CPPV+8G, Gafsa, Tunisia',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13144.974955741364!2d8.7753175!3d34.425833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f8976b00000001%3A0x8e50b86a014e7a8!2sHotel%20Jugurtha%20Palace!5e0!3m2!1sfr!2stn!4v1700000000000!5m2!1sfr!2stn',
  googleRating: {
    score: 3.6,
    totalReviews: 629,
  },
  heroHeadingFr: 'Bienvenue au Jugurtha Palace Hotel',
  heroHeadingEn: 'Welcome to Jugurtha Palace Hotel',
  heroHeadingAr: 'مرحباً بكم في فندق قصر يوغرطة',
  heroSubtitleFr: 'Votre séjour d’exception au cœur de Gafsa',
  heroSubtitleEn: 'Your exceptional stay in the heart of Gafsa',
  heroSubtitleAr: 'إقامتكم الاستثنائية في قلب قفصة',
  heroImage: ASSET_IMAGES.hero,
  currency: 'TND',
  announcement: {
    enabled: true,
    textFr: 'Réservation directe facilitée : envoyez votre demande en un clic par WhatsApp ou E-mail.',
    textEn: 'Direct booking request made easy: submit in one click via WhatsApp or Email.',
    textAr: 'طلب الحجز المباشر بكل سهولة: أرسل طلبك بنقرة واحدة عبر واتساب أو البريد الإلكتروني.',
  },
};

export const DEFAULT_ROOMS: Room[] = [
  {
    id: 'room-1',
    slug: 'suite-royale-jugurtha',
    name: 'Suite Royale Jugurtha',
    nameEn: 'Jugurtha Royal Suite',
    nameAr: 'الجناح الملكي يوغرطة',
    type: 'Suite Deluxe',
    description: 'Une suite majestueuse alliant l’architecture arabo-andalouse et le confort 5 étoiles moderne. Espace salon raffiné, lit King-size, salle de bains en marbre et balcon panoramique avec vue sur les jardins et la palmeraie.',
    descriptionEn: 'A magnificent suite combining Arab-Andalusian architecture with contemporary 5-star comfort. Refined lounge area, King bed, marble bathroom, and panoramic balcony over the gardens and palm groves.',
    descriptionAr: 'جناح فخم يجمع بين الطراز المعماري الأندلسي والراحة العصرية من فئة 5 نجوم. صالون راقٍ، سرير ملكي، حمام رخامي وشرفة تطل على الحدائق والواحة.',
    pricePerNight: 320,
    capacity: {
      adults: 2,
      children: 2,
      maxGuests: 4,
    },
    bedType: '1 Grand Lit King-Size',
    sizeM2: 65,
    amenities: [
      'Climatisation individuelle',
      'Wi-Fi haut débit gratuit',
      'Balcon privé vue piscine/jardin',
      'Coin salon privé',
      'Télévision écran plat satellite',
      'Mini-bar réfrigéré',
      'Coffre-fort électronique',
      'Salle de bains en marbre avec baignoire',
    ],
    images: [
      ASSET_IMAGES.suite,
      ASSET_IMAGES.pool,
      ASSET_IMAGES.hero,
    ],
    featured: true,
  },
  {
    id: 'room-2',
    slug: 'chambre-superieure-oasis',
    name: 'Chambre Supérieure Vue Oasis',
    nameEn: 'Superior Oasis View Room',
    nameAr: 'غرفة سوبريور مطلة على الواحة',
    type: 'Chambre Supérieure',
    description: 'Chambre élégante et baignée de lumière naturelle, idéale pour les couples et voyageurs d’affaires. Literie haut de gamme, bureau de travail, climatisation et vue imprenable sur le parc paysager.',
    descriptionEn: 'Elegant room bathed in natural light, ideal for couples and business travelers. High-end bedding, dedicated work desk, air conditioning, and peaceful garden views.',
    descriptionAr: 'غرفة أنيقة مضاءة بنور طبيعي دافئ، مثالية للأزواج ورجال الأعمال. أسرّة فاخرة، مكتب عمل، تكييف وإطلالة هادئة على الحديقة.',
    pricePerNight: 190,
    capacity: {
      adults: 2,
      children: 1,
      maxGuests: 3,
    },
    bedType: '1 Grand Lit Queen ou 2 Lits Jumeaux',
    sizeM2: 38,
    amenities: [
      'Climatisation individuelle',
      'Wi-Fi gratuit',
      'Balcon ou terrasse',
      'Bureau de travail',
      'Télévision par satellite',
      'Salle de douche privée',
      'Articles de toilette',
    ],
    images: [
      ASSET_IMAGES.suite,
      ASSET_IMAGES.hero,
    ],
    featured: true,
  },
  {
    id: 'room-3',
    slug: 'chambre-deluxe-familiale',
    name: 'Chambre Familiale Grand Confort',
    nameEn: 'Grand Comfort Family Room',
    nameAr: 'غرفة عائلية فسيحة ومريحة',
    type: 'Chambre Familiale',
    description: 'Espace généreux conçu pour accueillir confortablement les familles. Composée de deux espaces de repos communicants, avec rangements spacieux et ambiance sereine.',
    descriptionEn: 'Generous space designed to comfortably accommodate families. Features interconnected resting spaces, ample storage, and a serene ambiance.',
    descriptionAr: 'مساحة فسيحة صممت لتوفير أقصى درجات الراحة للعائلات، مع مساحات نوم متكاملة وأجواء هادئة ومريحة.',
    pricePerNight: 260,
    capacity: {
      adults: 2,
      children: 2,
      maxGuests: 4,
    },
    bedType: '1 Lit Double + 2 Lits Simples',
    sizeM2: 50,
    amenities: [
      'Climatisation & Chauffage',
      'Wi-Fi gratuit',
      'Télévision écran plat',
      'Espace salon familial',
      'Deux salles de douche/bain',
      'Sèche-cheveux',
      'Service en chambre',
    ],
    images: [
      ASSET_IMAGES.suite,
      ASSET_IMAGES.pool,
    ],
    featured: true,
  },
  {
    id: 'room-4',
    slug: 'suite-junior-prestige',
    name: 'Suite Junior Prestige',
    nameEn: 'Prestige Junior Suite',
    nameAr: 'جناح جونيور بريستيج',
    type: 'Suite Junior',
    description: 'Une harmonie subtile entre tradition tunisienne et raffinement moderne. Comprend une alcôve salon, un lit King luxueux et un balcon ouvrant sur le ciel azur de Gafsa.',
    descriptionEn: 'A subtle harmony between Tunisian heritage and modern refinement. Includes an alcove lounge, luxurious King bed, and private balcony opening to Gafsa’s azure skies.',
    descriptionAr: 'تناغم دقيق بين التراث التونسي والأناقة الحديثة. يضم ركن صالون أنيق وسرير ملكي وشرفة خاصة.',
    pricePerNight: 240,
    capacity: {
      adults: 2,
      children: 1,
      maxGuests: 3,
    },
    bedType: '1 Lit King-Size',
    sizeM2: 45,
    amenities: [
      'Climatisation',
      'Wi-Fi haut débit',
      'Balcon privé',
      'Coin salon relaxant',
      'Peignoirs & Chaussons',
      'Salle de bains privative',
    ],
    images: [
      ASSET_IMAGES.suite,
      ASSET_IMAGES.dining,
    ],
    featured: false,
  },
];

export const DEFAULT_SERVICES: HotelService[] = [
  {
    id: 'srv-pool',
    title: 'Piscine Extérieure Oasis',
    titleEn: 'Outdoor Oasis Swimming Pool',
    titleAr: 'مسبح خارجي وسط الواحة',
    description: 'Une somptueuse piscine extérieure au cœur d’un parc arboré de palmiers, avec transats et parasols pour vous rafraîchir sous le soleil du sud tunisien.',
    descriptionEn: 'A magnificent outdoor swimming pool surrounded by towering date palms, with sun loungers and parasols to refresh under the southern Tunisian sun.',
    descriptionAr: 'مسبح خارجي فسيح محاط بالنخيل والحدائق، مع كراسي استرخاء ومظلات لقضاء أوقات منعشة وممتعة.',
    iconName: 'Waves',
    category: 'wellness',
    isVerified: true,
  },
  {
    id: 'srv-wifi',
    title: 'Wi-Fi Haut Débit',
    titleEn: 'High-Speed Wi-Fi',
    titleAr: 'إنترنت عالي السرعة مجاني',
    description: 'Connexion Internet sans fil disponible pour tous nos hôtes dans les chambres, suites et espaces de vie de l’hôtel.',
    descriptionEn: 'Wireless high-speed internet connection available for all guests throughout rooms, suites, and common areas.',
    descriptionAr: 'خدمة إنترنت لاسلكي سريعة ومجانية متوفرة لجميع النزلاء في الغرف والأجنحة والمساحات المشتركة.',
    iconName: 'Wifi',
    category: 'practical',
    isVerified: true,
  },
  {
    id: 'srv-breakfast',
    title: 'Petit-Déjeuner Buffet',
    titleEn: 'Buffet Breakfast',
    titleAr: 'إفطار صباحي بوفيه',
    description: 'Un généreux buffet de petit-déjeuner chaque matin proposant viennoiseries, spécialités tunisiennes, fruits frais, boissons chaudes et jus.',
    descriptionEn: 'A generous morning breakfast buffet featuring fresh pastries, local Tunisian specialties, fresh seasonal fruits, hot drinks, and juices.',
    descriptionAr: 'بوفيه إفطار صباحي يومي يضم أشهى المخبوزات والأطباق التونسية والعالمية والعصائر الطازجة.',
    iconName: 'Coffee',
    category: 'dining',
    isVerified: true,
  },
  {
    id: 'srv-ac',
    title: 'Climatisation Intégrale',
    titleEn: 'Air Conditioning & Climate Control',
    titleAr: 'تكييف هواء فردي',
    description: 'Système de climatisation et de chauffage individuel pour assurer une température agréable en toute saison.',
    descriptionEn: 'Individual air conditioning and heating system ensuring optimal indoor climate in all seasons.',
    descriptionAr: 'نظام تكييف وتدفئة مستقل يضمن درجة حرارة مثالية طوال فصول السنة.',
    iconName: 'Wind',
    category: 'comfort',
    isVerified: true,
  },
  {
    id: 'srv-parking',
    title: 'Parking Privé Sécurisé',
    titleEn: 'Secure On-Site Parking',
    titleAr: 'موقف سيارات مجاني آمن',
    description: 'Stationnement spacieux et accessible gratuitement pour les véhicules de nos clients résidents.',
    descriptionEn: 'Spacious and easily accessible parking available free of charge for our staying hotel guests.',
    descriptionAr: 'موقف سيارات فسيح ومجاني وآمن متاح لنزلاء الفندق.',
    iconName: 'Car',
    category: 'practical',
    isVerified: true,
  },
  {
    id: 'srv-accessibility',
    title: 'Accessibilité PMR',
    titleEn: 'Guest Accessibility',
    titleAr: 'مرافق مجهزة لذوي الاحتياجات',
    description: 'Aménagements et rampes conçus pour faciliter l’accès des personnes à mobilité réduite aux espaces principaux.',
    descriptionEn: 'Facilities and access ramps designed to facilitate easy access for guests with reduced mobility.',
    descriptionAr: 'مداخل ومرافق مصممة لتسهيل حركة وراحة الضيوف من ذوي الحركة المحدودة.',
    iconName: 'Accessibility',
    category: 'comfort',
    isVerified: true,
  },
  {
    id: 'srv-reception',
    title: 'Réception & Accueil 24h/24',
    titleEn: '24/7 Front Desk & Hospitality',
    titleAr: 'استقبال وخدمة 24/24 ساعة',
    description: 'Une équipe attentive à votre disposition à tout moment pour votre accueil, vos départs et vos renseignements.',
    descriptionEn: 'An attentive hospitality team available around the clock for your arrivals, departures, and inquiries.',
    descriptionAr: 'فريق عمل مضياف في خدمتكم على مدار الساعة لتسهيل إجراءات الوصول والمغادرة وتقديم المساعدة.',
    iconName: 'Clock',
    category: 'practical',
    isVerified: true,
  },
  {
    id: 'srv-dining',
    title: 'Restaurant & Gastronomie',
    titleEn: 'Restaurant & Fine Dining',
    titleAr: 'مطعم وخدمات طعام راقية',
    description: 'Une salle de restauration spacieuse célébrant les délices culinaires du sud et de la Méditerranée.',
    descriptionEn: 'A refined dining room celebrating the culinary delicacies of southern Tunisia and the Mediterranean.',
    descriptionAr: 'قاعة طعام أنيقة تقدم أشهى المأكولات التونسية والمتوسطية.',
    iconName: 'UtensilsCrossed',
    category: 'dining',
    isVerified: true,
  },
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Façade Majestueuse du Jugurtha Palace',
    category: 'exterior',
    imageUrl: ASSET_IMAGES.hero,
    caption: 'L’architecture majestueuse inspirée des palais arabo-berbères de Gafsa au crépuscule.',
  },
  {
    id: 'gal-2',
    title: 'Piscine & Palmeraie Oasis',
    category: 'pool',
    imageUrl: ASSET_IMAGES.pool,
    caption: 'La grande piscine extérieure bordée de palmiers et d’espaces de détente.',
  },
  {
    id: 'gal-3',
    title: 'Suite d’Exception & Décoration Raffinée',
    category: 'rooms',
    imageUrl: ASSET_IMAGES.suite,
    caption: 'Chambre et suite de grand confort avec balcon et boiseries artisanales.',
  },
  {
    id: 'gal-4',
    title: 'Salle de Restaurant Gastronomique',
    category: 'dining',
    imageUrl: ASSET_IMAGES.dining,
    caption: 'Cadre chaleureux sous les voûtes de pierre pour savourer nos dîners et buffets.',
  },
  {
    id: 'gal-5',
    title: 'Paysages et Oasis de Gafsa',
    category: 'exterior',
    imageUrl: ASSET_IMAGES.oasis,
    caption: 'Panorama sur la palmeraie millénaire et les montagnes ocres entourant Gafsa.',
  },
];

const STORAGE_KEYS = {
  SETTINGS: 'jugurtha_settings_v1',
  ROOMS: 'jugurtha_rooms_v1',
  SERVICES: 'jugurtha_services_v1',
  GALLERY: 'jugurtha_gallery_v1',
  REQUESTS: 'jugurtha_booking_requests_v1',
  AUTH: 'jugurtha_admin_auth_v1',
};

export const StorageService = {
  getSettings(): HotelSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (data) {
        const parsed: HotelSettings = JSON.parse(data);
        return {
          ...parsed,
          heroImage: resolveHotelImage(parsed.heroImage),
        };
      }
    } catch (e) {
      console.warn('Error reading settings from localStorage', e);
    }
    return DEFAULT_SETTINGS;
  },

  saveSettings(settings: HotelSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  getRooms(): Room[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ROOMS);
      if (data) {
        const parsed: Room[] = JSON.parse(data);
        return parsed.map((room) => ({
          ...room,
          images: (room.images && room.images.length > 0 ? room.images : [ASSET_IMAGES.suite]).map((img) =>
            resolveHotelImage(img)
          ),
        }));
      }
    } catch (e) {
      console.warn('Error reading rooms from localStorage', e);
    }
    return DEFAULT_ROOMS;
  },

  saveRooms(rooms: Room[]): void {
    localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
  },

  getServices(): HotelService[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SERVICES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Error reading services from localStorage', e);
    }
    return DEFAULT_SERVICES;
  },

  saveServices(services: HotelService[]): void {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  },

  getGallery(): GalleryItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GALLERY);
      if (data) {
        const parsed: GalleryItem[] = JSON.parse(data);
        return parsed.map((item) => ({
          ...item,
          imageUrl: resolveHotelImage(item.imageUrl),
        }));
      }
    } catch (e) {
      console.warn('Error reading gallery from localStorage', e);
    }
    return DEFAULT_GALLERY;
  },

  saveGallery(gallery: GalleryItem[]): void {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
  },

  getBookingRequests(): BookingRequest[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REQUESTS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Error reading requests from localStorage', e);
    }
    return [];
  },

  saveBookingRequests(requests: BookingRequest[]): void {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
  },

  addBookingRequest(req: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>): BookingRequest {
    const current = this.getBookingRequests();
    const newRequest: BookingRequest = {
      ...req,
      id: 'req-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    const updated = [newRequest, ...current];
    this.saveBookingRequests(updated);
    return newRequest;
  },

  exportBackupJson(): string {
    const backup = {
      exportedAt: new Date().toISOString(),
      version: '1.0',
      settings: this.getSettings(),
      rooms: this.getRooms(),
      services: this.getServices(),
      gallery: this.getGallery(),
      bookingRequests: this.getBookingRequests(),
    };
    return JSON.stringify(backup, null, 2);
  },

  importBackupJson(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.settings) this.saveSettings(parsed.settings);
      if (parsed.rooms && Array.isArray(parsed.rooms)) this.saveRooms(parsed.rooms);
      if (parsed.services && Array.isArray(parsed.services)) this.saveServices(parsed.services);
      if (parsed.gallery && Array.isArray(parsed.gallery)) this.saveGallery(parsed.gallery);
      if (parsed.bookingRequests && Array.isArray(parsed.bookingRequests)) this.saveBookingRequests(parsed.bookingRequests);
      return true;
    } catch (e) {
      console.error('Failed to import backup JSON', e);
      return false;
    }
  },

  resetToDefaults(): void {
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.ROOMS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.GALLERY);
    // keep booking requests or reset upon user discretion
  },

  isAdminAuthenticated(): boolean {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  },

  setAdminAuthenticated(auth: boolean): void {
    if (auth) {
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  },
};
