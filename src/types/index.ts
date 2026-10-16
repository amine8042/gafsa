export interface Room {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  nameAr: string;
  type: string;
  description: string;
  descriptionEn: string;
  descriptionAr: string;
  pricePerNight: number; // in TND (Tunisian Dinar)
  capacity: {
    adults: number;
    children: number;
    maxGuests: number;
  };
  bedType: string;
  sizeM2: number;
  amenities: string[];
  images: string[];
  featured?: boolean;
}

export interface HotelService {
  id: string;
  title: string;
  titleEn: string;
  titleAr: string;
  description: string;
  descriptionEn: string;
  descriptionAr: string;
  iconName: string;
  category: 'comfort' | 'wellness' | 'dining' | 'practical';
  isVerified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'rooms' | 'exterior' | 'pool' | 'dining' | 'facilities';
  imageUrl: string;
  caption?: string;
}

export interface BookingRequest {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomId: string;
  roomName: string;
  specialRequests?: string;
  status: 'new' | 'reviewed' | 'archived';
  submittedVia?: 'whatsapp' | 'email' | 'form';
}

export interface HotelSettings {
  name: string;
  category: string;
  stars: number;
  address: string;
  phone: string;
  whatsappNumber: string; // e.g. "21676211200"
  email: string; // admin configurable email
  googleMapsQuery: string;
  googleMapsEmbedUrl: string;
  googleRating: {
    score: number;
    totalReviews: number;
  };
  heroHeadingFr: string;
  heroHeadingEn: string;
  heroHeadingAr: string;
  heroSubtitleFr: string;
  heroSubtitleEn: string;
  heroSubtitleAr: string;
  heroImage: string;
  currency: string;
  announcement: {
    enabled: boolean;
    textFr: string;
    textEn: string;
    textAr: string;
  };
}

export type Language = 'fr' | 'en' | 'ar';
