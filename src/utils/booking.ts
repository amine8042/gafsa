import { BookingRequest } from '../types';

export function formatReservationFrenchMessage(req: {
  fullName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomName: string;
  specialRequests?: string;
}): string {
  const lines = [
    '✨ *DEMANDE DE RÉSERVATION - JUGURTHA PALACE HOTEL*',
    '----------------------------------------',
    `👤 *Nom complet :* ${req.fullName}`,
    `📧 *E-mail :* ${req.email}`,
    `📞 *Téléphone :* ${req.phone}`,
    '----------------------------------------',
    `🏨 *Hébergement :* ${req.roomName}`,
    `📅 *Date d'arrivée :* ${req.checkIn}`,
    `📅 *Date de départ :* ${req.checkOut}`,
    `👥 *Occupants :* ${req.adults} adulte(s)${req.children > 0 ? `, ${req.children} enfant(s)` : ''}`,
    req.specialRequests ? `📝 *Demandes particulières :* ${req.specialRequests}` : '',
    '----------------------------------------',
    '⚠️ *Note :* Cette demande est soumise à la confirmation et validation de l\'établissement selon disponibilités.',
    'Merci pour votre accueil et à bientôt au Jugurtha Palace Hotel Gafsa !',
  ].filter(Boolean);

  return lines.join('\n');
}

export function generateWhatsAppLink(
  whatsappNumber: string,
  req: {
    fullName: string;
    email: string;
    phone: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    roomName: string;
    specialRequests?: string;
  }
): string {
  // Clean phone number (remove +, spaces, hyphens)
  const cleanNumber = (whatsappNumber || '21676211200').replace(/[^0-9]/g, '');
  const message = formatReservationFrenchMessage(req);
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function generateMailtoLink(
  hotelEmail: string,
  req: {
    fullName: string;
    email: string;
    phone: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    roomName: string;
    specialRequests?: string;
  }
): string {
  const recipient = hotelEmail ? encodeURIComponent(hotelEmail) : '';
  const subject = encodeURIComponent(`Demande de réservation - ${req.roomName} - ${req.fullName}`);
  const body = encodeURIComponent(
    `Bonjour Jugurtha Palace Hotel,\n\n` +
    `Je souhaite vous adresser une demande de réservation avec les informations suivantes :\n\n` +
    `• Nom complet : ${req.fullName}\n` +
    `• E-mail : ${req.email}\n` +
    `• Téléphone : ${req.phone}\n` +
    `• Hébergement souhaité : ${req.roomName}\n` +
    `• Date d'arrivée : ${req.checkIn}\n` +
    `• Date de départ : ${req.checkOut}\n` +
    `• Nombre d'adultes : ${req.adults}\n` +
    `• Nombre d'enfants : ${req.children}\n` +
    (req.specialRequests ? `• Demandes particulières : ${req.specialRequests}\n` : '') +
    `\nJe note que cette demande sera confirmée uniquement après validation par votre établissement selon les disponibilités.\n\n` +
    `Dans l'attente de votre retour,\n` +
    `${req.fullName}`
  );

  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}
