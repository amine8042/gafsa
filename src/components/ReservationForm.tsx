import React, { useState } from 'react';
import { MessageSquare, Mail, Calendar, Users, AlertCircle, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { useLanguage } from '../context/LanguageContext';
import { generateWhatsAppLink, generateMailtoLink } from '../utils/booking';

interface ReservationFormProps {
  initialRoomId?: string;
  onSuccess?: () => void;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({ initialRoomId, onSuccess }) => {
  const { rooms, settings, addBookingRequest } = useHotel();
  const { t, language } = useLanguage();

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomId, setRoomId] = useState(initialRoomId || (rooms.length > 0 ? rooms[0].id : ''));
  const [specialRequests, setSpecialRequests] = useState('');

  // Validation & feedback state
  const [error, setError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    fullName: string;
    email: string;
    phone: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    roomName: string;
    specialRequests?: string;
  } | null>(null);

  // Set min dates for check-in and check-out
  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!fullName.trim()) {
      setError(language === 'ar' ? 'يرجى إدخال الاسم الكامل.' : 'Veuillez saisir votre nom complet.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError(language === 'ar' ? 'يرجى إدخال عنوان بريد إلكتروني صحيح.' : 'Veuillez saisir une adresse e-mail valide.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setError(language === 'ar' ? 'يرجى إدخال رقم هاتف صحيح.' : 'Veuillez saisir un numéro de téléphone valide.');
      return;
    }
    if (!checkIn) {
      setError(language === 'ar' ? 'يرجى تحديد تاريخ الوصول.' : 'Veuillez sélectionner la date d\'arrivée.');
      return;
    }
    if (!checkOut) {
      setError(language === 'ar' ? 'يرجى تحديد تاريخ المغادرة.' : 'Veuillez sélectionner la date de départ.');
      return;
    }

    // Check-out must be after check-in
    const dCheckIn = new Date(checkIn);
    const dCheckOut = new Date(checkOut);
    if (dCheckOut <= dCheckIn) {
      setError(
        language === 'ar'
          ? 'يجب أن يكون تاريخ المغادرة لاحقاً لتاريخ الوصول.'
          : 'La date de départ doit être strictement postérieure à la date d\'arrivée.'
      );
      return;
    }

    const selectedRoom = rooms.find((r) => r.id === roomId);
    const roomName = selectedRoom ? selectedRoom.name : 'Chambre / Suite';

    const payload = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      checkIn,
      checkOut,
      adults: Number(adults),
      children: Number(children),
      roomId,
      roomName,
      specialRequests: specialRequests.trim(),
      submittedVia: 'form' as const,
    };

    // Save locally into localStorage for Admin management
    addBookingRequest(payload);

    setSubmittedData(payload);
    if (onSuccess) onSuccess();
  };

  const selectedRoomObj = rooms.find((r) => r.id === roomId);
  const currentRoomName = selectedRoomObj ? selectedRoomObj.name : 'Chambre / Suite';

  return (
    <div className="bg-white border border-stone-200/90 rounded-lg p-6 sm:p-8 shadow-sm">
      {!submittedData ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              {t('reservation_form_title')}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              {t('reservation_form_subtitle')}
            </p>
          </div>

          {/* Validation Error Banner */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                {t('form_fullname')} *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex. Mohamed Ben Salah"
                className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                {t('form_email')} *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@exemple.com"
                className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                {t('form_phone')} *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+216 XX XXX XXX"
                className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] outline-none transition-all"
              />
            </div>
          </div>

          {/* Dates & Room Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{t('quick_checkin')} *</span>
              </label>
              <input
                type="date"
                required
                min={todayStr}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{t('quick_checkout')} *</span>
              </label>
              <input
                type="date"
                required
                min={checkIn || todayStr}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] outline-none transition-all"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                {t('quick_room_type')}
              </label>
              <select
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] outline-none transition-all bg-white"
              >
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} — {r.pricePerNight} TND / nuit
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Guests count */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-stone-400" />
                <span>{t('quick_adults')}</span>
              </label>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded focus:border-[#C5A880] outline-none bg-white"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'adulte' : 'adultes'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-stone-400" />
                <span>{t('quick_children')}</span>
              </label>
              <select
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded focus:border-[#C5A880] outline-none bg-white"
              >
                {[0, 1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num} {num <= 1 ? 'enfant' : 'enfants'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              {t('form_requests')}
            </label>
            <textarea
              rows={2}
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Ex. Heure d'arrivée estimée à 15h00, préférence pour chambre avec vue jardin..."
              className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] outline-none transition-all"
            />
          </div>

          {/* Compulsory Hotel Notice */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded text-xs text-stone-600 space-y-1">
            <div className="flex items-center gap-2 font-semibold text-stone-800">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>{t('reservation_notice_title')}</span>
            </div>
            <p className="leading-relaxed">
              {t('reservation_disclaimer_text')}
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 text-sm font-semibold uppercase tracking-wider text-white bg-[#0B132B] hover:bg-[#1E293B] border border-[#C5A880]/60 rounded shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>{t('form_send')}</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </button>
        </form>
      ) : (
        /* Post-Submission Actions View: WhatsApp + Email */
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded flex items-start gap-3 text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm">
                {language === 'ar' ? 'تم تجهيز طلبكم بنجاح!' : 'Votre demande est prête à être transmise !'}
              </h4>
              <p className="text-xs text-emerald-800 mt-1">
                {t('reservation_disclaimer_text')}
              </p>
            </div>
          </div>

          {/* Summary Recap Box */}
          <div className="p-5 bg-stone-50 border border-stone-200 rounded space-y-2 text-xs text-stone-700">
            <div className="font-serif text-sm font-bold text-stone-900 border-b border-stone-200 pb-2">
              {submittedData.roomName}
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <span className="text-stone-500">Arrivée :</span>{' '}
                <span className="font-semibold">{submittedData.checkIn}</span>
              </div>
              <div>
                <span className="text-stone-500">Départ :</span>{' '}
                <span className="font-semibold">{submittedData.checkOut}</span>
              </div>
              <div>
                <span className="text-stone-500">Hôte :</span>{' '}
                <span className="font-semibold">{submittedData.fullName}</span>
              </div>
              <div>
                <span className="text-stone-500">Voyageurs :</span>{' '}
                <span className="font-semibold">
                  {submittedData.adults} ad. {submittedData.children > 0 ? `, ${submittedData.children} enf.` : ''}
                </span>
              </div>
            </div>
            {submittedData.specialRequests && (
              <div className="pt-2 border-t border-stone-200 text-stone-600">
                <span className="text-stone-500">Remarques :</span> {submittedData.specialRequests}
              </div>
            )}
          </div>

          <p className="text-xs text-stone-500 text-center">
            {language === 'ar'
              ? 'اختر وسيلة الإرسال المفضلة لتوجيه التفاصيل مباشرة إلى إدارة الفندق:'
              : 'Choisissez votre canal privilégié pour transmettre instantanément les détails à l’équipe de réception :'}
          </p>

          {/* Action 1: WhatsApp */}
          <a
            href={generateWhatsAppLink(settings.whatsappNumber, submittedData)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded font-medium text-sm flex items-center justify-center gap-2.5 shadow-sm transition-all"
          >
            <MessageSquare className="w-5 h-5" />
            <span>{t('reservation_whatsapp_btn')}</span>
          </a>

          {/* Action 2: Email */}
          <a
            href={generateMailtoLink(settings.email, submittedData)}
            className="w-full py-3 px-4 bg-[#0B132B] hover:bg-[#1E293B] text-white rounded font-medium text-sm flex items-center justify-center gap-2.5 border border-slate-700 transition-all"
          >
            <Mail className="w-5 h-5 text-[#C5A880]" />
            <span>{t('reservation_email_btn')}</span>
          </a>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setSubmittedData(null)}
              className="text-xs text-stone-500 hover:text-stone-800 underline"
            >
              {language === 'ar' ? 'تعديل البيانات أو تقديم طلب جديد' : 'Modifier les informations ou faire une nouvelle demande'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
