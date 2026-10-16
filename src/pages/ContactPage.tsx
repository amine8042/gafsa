import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { useLanguage } from '../context/LanguageContext';

export const ContactPage: React.FC = () => {
  const { settings } = useHotel();
  const { t, language } = useLanguage();

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cleanPhone = settings.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsApp = (settings.whatsappNumber || '21676211200').replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(
        language === 'ar'
          ? 'يرجى ملء جميع الحقول المطلوبة.'
          : 'Veuillez remplir tous les champs obligatoires.'
      );
      return;
    }

    // Save message locally into localStorage for management inspection
    try {
      const existing = JSON.parse(localStorage.getItem('jugurtha_contact_messages') || '[]');
      existing.unshift({
        id: 'msg-' + Date.now(),
        name,
        email,
        phone,
        subject: subject || 'Contact général',
        message,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('jugurtha_contact_messages', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#C5A880] mb-2">
          {language === 'ar' ? 'يسعدنا تواصلكم' : 'À Votre Écoute'}
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
          {t('contact_title')}
        </h1>
        <p className="text-base text-stone-600 mt-4 leading-relaxed">
          {t('contact_subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Coordinates & Direct Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white border border-stone-200/90 rounded-lg p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-100 pb-3">
              {language === 'ar' ? 'معلومات الاتصال المباشرة' : 'Coordonnées de l’établissement'}
            </h3>

            <div className="space-y-4 text-sm text-stone-700">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-stone-100 text-[#8C6D3F] rounded shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-0.5">
                    {t('contact_address_label')}
                  </span>
                  <span className="font-medium text-stone-900">{settings.address}</span>
                  <p className="text-xs text-stone-500 mt-0.5">Repère Google Maps : CPPV+8G, Gafsa</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-stone-100 text-[#8C6D3F] rounded shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-0.5">
                    {t('contact_phone_label')}
                  </span>
                  <a
                    href={`tel:${cleanPhone}`}
                    className="font-medium text-stone-900 hover:text-[#8C6D3F] transition-colors"
                  >
                    {settings.phone}
                  </a>
                  <p className="text-xs text-stone-500 mt-0.5">Accueil & réception téléphonique</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-0.5">
                    {t('contact_whatsapp_label')}
                  </span>
                  <a
                    href={`https://wa.me/${cleanWhatsApp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-emerald-700 hover:text-emerald-800 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>+{settings.whatsappNumber || '21676211200'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-xs text-stone-500 mt-0.5">Assistance rapide par messagerie</p>
                </div>
              </div>

              {/* Email if configured */}
              {settings.email && (
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-stone-100 text-[#8C6D3F] rounded shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-0.5">
                      Courriel officiel
                    </span>
                    <a
                      href={`mailto:${settings.email}`}
                      className="font-medium text-stone-900 hover:text-[#8C6D3F] transition-colors"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>
              )}

              {/* Reception Hours */}
              <div className="flex items-start gap-3 pt-2 border-t border-stone-100">
                <div className="p-2.5 bg-stone-100 text-stone-600 rounded shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-0.5">
                    Horaires de Réception
                  </span>
                  <span className="font-medium text-stone-900">24 heures sur 24, 7 jours sur 7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location details card */}
          <div className="p-6 bg-stone-50 border border-stone-200 rounded-lg space-y-3 text-xs text-stone-600">
            <span className="font-semibold text-stone-800 block">Accès & Situation</span>
            <p>
              L'hôtel Jugurtha Palace est situé à l'entrée de Gafsa sur la route principale, facilitant l'accès depuis l'aéroport international de Gafsa-Ksar et les grands axes du centre et du sud tunisien.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=CPPV%2B8G%2C+Gafsa%2C+Tunisia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-stone-900 font-semibold hover:text-[#8C6D3F] pt-1"
            >
              <span>Ouvrir dans Google Maps (CPPV+8G)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-stone-200/90 rounded-lg p-6 sm:p-8 shadow-sm">
          <div className="border-b border-stone-100 pb-4 mb-6">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              {language === 'ar' ? 'إرسال رسالة مباشرة' : 'Envoyer un message à l’hôtel'}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              {language === 'ar'
                ? 'سنرد على استفساركم في أقرب وقت ممكن.'
                : 'Notre équipe s’engage à vous répondre dans les plus brefs délais.'}
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 space-y-3 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-serif text-lg font-bold">
                {language === 'ar' ? 'تم استلام رسالتكم بنجاح' : 'Message transmis avec succès !'}
              </h4>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                {language === 'ar'
                  ? 'شكراً لتواصلكم مع فندق قصر يوغرطة. تم حفظ رسالتكم وسيتواصل معكم فريقنا قريباً.'
                  : 'Merci de votre intérêt pour le Jugurtha Palace Hotel. Votre demande a bien été enregistrée et notre équipe y donnera suite avec attention.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setPhone('');
                  setSubject('');
                  setMessage('');
                }}
                className="mt-4 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-900 border border-emerald-300 rounded hover:bg-emerald-100 transition-colors"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    {t('form_fullname')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom complet"
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded focus:border-[#C5A880] outline-none transition-all"
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
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded focus:border-[#C5A880] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    {t('form_phone')}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+216 XX XXX XXX"
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded focus:border-[#C5A880] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Sujet de votre message
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Renseignement, banquet, groupe..."
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded focus:border-[#C5A880] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Votre message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Écrivez-nous votre question ou demande ici..."
                  className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded focus:border-[#C5A880] outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-[#0B132B] hover:bg-[#1E293B] border border-[#C5A880]/60 rounded shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#C5A880]" />
                <span>{t('contact_form_send_btn')}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
