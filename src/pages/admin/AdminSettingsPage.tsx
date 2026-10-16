import React, { useState } from 'react';
import { 
  Save, 
  Download, 
  Upload, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  FileCode
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { HotelSettings } from '../../types';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings, exportDataJson, importDataJson, resetAllDefaults } = useHotel();

  // Local form state
  const [phone, setPhone] = useState(settings.phone);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [email, setEmail] = useState(settings.email || '');
  const [address, setAddress] = useState(settings.address);
  const [heroHeadingFr, setHeroHeadingFr] = useState(settings.heroHeadingFr);
  const [heroSubtitleFr, setHeroSubtitleFr] = useState(settings.heroSubtitleFr);
  const [heroHeadingEn, setHeroHeadingEn] = useState(settings.heroHeadingEn);
  const [heroSubtitleEn, setHeroSubtitleEn] = useState(settings.heroSubtitleEn);
  const [heroHeadingAr, setHeroHeadingAr] = useState(settings.heroHeadingAr);
  const [heroSubtitleAr, setHeroSubtitleAr] = useState(settings.heroSubtitleAr);

  // Announcement
  const [announcementEnabled, setAnnouncementEnabled] = useState(Boolean(settings.announcement?.enabled));
  const [announcementTextFr, setAnnouncementTextFr] = useState(settings.announcement?.textFr || '');
  const [announcementTextEn, setAnnouncementTextEn] = useState(settings.announcement?.textEn || '');
  const [announcementTextAr, setAnnouncementTextAr] = useState(settings.announcement?.textAr || '');

  // Feedback states
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [importMessage, setImportMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: HotelSettings = {
      ...settings,
      phone: phone.trim(),
      whatsappNumber: whatsappNumber.trim(),
      email: email.trim(),
      address: address.trim(),
      heroHeadingFr: heroHeadingFr.trim(),
      heroSubtitleFr: heroSubtitleFr.trim(),
      heroHeadingEn: heroHeadingEn.trim(),
      heroSubtitleEn: heroSubtitleEn.trim(),
      heroHeadingAr: heroHeadingAr.trim(),
      heroSubtitleAr: heroSubtitleAr.trim(),
      announcement: {
        enabled: announcementEnabled,
        textFr: announcementTextFr.trim(),
        textEn: announcementTextEn.trim(),
        textAr: announcementTextAr.trim(),
      },
    };

    updateSettings(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExport = () => {
    const jsonString = exportDataJson();
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `jugurtha-palace-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    setImportMessage(null);
    if (!jsonInput.trim()) {
      setImportMessage({ type: 'error', text: 'Veuillez coller le code JSON de sauvegarde ci-dessous.' });
      return;
    }

    const success = importDataJson(jsonInput);
    if (success) {
      setImportMessage({ type: 'success', text: 'Sauvegarde importée avec succès ! Les données ont été actualisées.' });
      setJsonInput('');
    } else {
      setImportMessage({ type: 'error', text: 'Le format JSON est invalide. Vérifiez le contenu et réessayez.' });
    }
  };

  const handleReset = () => {
    if (window.confirm('Voulez-vous réinitialiser tous les contenus aux valeurs par défaut de l’hôtel ?')) {
      resetAllDefaults();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-10 max-w-4xl">
      {/* Title */}
      <div>
        <h1 className="font-serif text-2xl font-bold text-stone-900">
          Paramètres du Site & Sauvegardes
        </h1>
        <p className="text-xs text-stone-600 mt-1">
          Personnalisez les coordonnées, les textes d'accueil, le numéro WhatsApp et exportez vos données.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Paramètres enregistrés avec succès dans le stockage local !</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm space-y-6 text-xs">
        <h3 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
          Coordonnées de l’Établissement & Canaux Directs
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-stone-700 uppercase mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Numéro de téléphone principal *</span>
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 uppercase mb-1 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Numéro WhatsApp direct (sans signe +) *</span>
            </label>
            <input
              type="text"
              required
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="Ex. 21676211200"
              className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-stone-700 uppercase mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-stone-500" />
              <span>Courriel de réception officiel (optionnel)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex. reception@jugurthapalace.com"
              className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none"
            />
            <p className="text-[11px] text-stone-500 mt-1">
              Utilisé pour préremplir le lien d'envoi d'e-mail des réservations.
            </p>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 uppercase mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-500" />
              <span>Adresse postale *</span>
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none"
            />
          </div>
        </div>

        {/* Hero Section Copy */}
        <h3 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-2 pt-4">
          Textes d'Accroche de la Page d'Accueil
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 uppercase mb-1">
                Titre principal (Français)
              </label>
              <input
                type="text"
                value={heroHeadingFr}
                onChange={(e) => setHeroHeadingFr(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 uppercase mb-1">
                Sous-titre (Français)
              </label>
              <input
                type="text"
                value={heroSubtitleFr}
                onChange={(e) => setHeroSubtitleFr(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 uppercase mb-1">
                Titre (Anglais)
              </label>
              <input
                type="text"
                value={heroHeadingEn}
                onChange={(e) => setHeroHeadingEn(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 uppercase mb-1">
                Sous-titre (Anglais)
              </label>
              <input
                type="text"
                value={heroSubtitleEn}
                onChange={(e) => setHeroSubtitleEn(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 uppercase mb-1">
                العنوان الرئيسي (العربية)
              </label>
              <input
                type="text"
                dir="rtl"
                value={heroHeadingAr}
                onChange={(e) => setHeroHeadingAr(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 uppercase mb-1">
                الوصف الفرعي (العربية)
              </label>
              <input
                type="text"
                dir="rtl"
                value={heroSubtitleAr}
                onChange={(e) => setHeroSubtitleAr(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Announcement Banner */}
        <h3 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-2 pt-4">
          Bandeau d'Annonce Supérieur
        </h3>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="ann-check"
              checked={announcementEnabled}
              onChange={(e) => setAnnouncementEnabled(e.target.checked)}
              className="w-4 h-4 text-[#C5A880] rounded border-stone-300"
            />
            <label htmlFor="ann-check" className="font-semibold text-stone-800">
              Activer le bandeau d'annonce en haut du site
            </label>
          </div>

          {announcementEnabled && (
            <div className="space-y-3 pt-2">
              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">
                  Message en Français
                </label>
                <input
                  type="text"
                  value={announcementTextFr}
                  onChange={(e) => setAnnouncementTextFr(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded outline-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 uppercase mb-1">
                    Message en Anglais
                  </label>
                  <input
                    type="text"
                    value={announcementTextEn}
                    onChange={(e) => setAnnouncementTextEn(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 uppercase mb-1">
                    النص بالعربية
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={announcementTextAr}
                    onChange={(e) => setAnnouncementTextAr(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-stone-200 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0B132B] hover:bg-[#1E293B] text-white font-semibold uppercase tracking-wider rounded transition-colors"
          >
            <Save className="w-4 h-4 text-[#C5A880]" />
            <span>Enregistrer les paramètres</span>
          </button>
        </div>
      </form>

      {/* Backup Export and Import */}
      <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm space-y-6 text-xs">
        <h3 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-2 flex items-center gap-2">
          <FileCode className="w-4 h-4 text-[#C5A880]" />
          <span>Sauvegarde & Restauration (JSON Backup)</span>
        </h3>

        <div className="space-y-4">
          <p className="text-stone-600 leading-relaxed">
            Étant donné que le site utilise le stockage local (localStorage) de votre navigateur, vous pouvez exporter à tout moment l'intégralité du contenu (chambres, services, photos, paramètres) sous forme de fichier JSON et le restaurer sur un autre ordinateur ou navigateur.
          </p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded font-medium transition-colors"
            >
              <Download className="w-4 h-4 text-[#C5A880]" />
              <span>Télécharger la sauvegarde JSON</span>
            </button>
          </div>

          {/* Import JSON block */}
          <div className="pt-4 border-t border-stone-200 space-y-2">
            <label className="block font-semibold text-stone-700 uppercase">
              Restaurer une sauvegarde JSON existante
            </label>
            <textarea
              rows={4}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Collez ici le contenu JSON complet de sauvegarde..."
              className="w-full px-3 py-2 border border-stone-300 rounded font-mono text-[11px] outline-none"
            />
            {importMessage && (
              <div
                className={`p-3 rounded text-xs flex items-center gap-2 ${
                  importMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {importMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                )}
                <span>{importMessage.text}</span>
              </div>
            )}
            <button
              type="button"
              onClick={handleImport}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium rounded border border-stone-300 transition-colors"
            >
              <Upload className="w-4 h-4 text-stone-600" />
              <span>Importer et appliquer les données</span>
            </button>
          </div>

          {/* Reset button */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
            <span className="text-stone-500">
              Revenir aux données initiales d'origine de l’hôtel ?
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-stone-600 hover:text-red-700 text-xs font-semibold hover:bg-red-50 rounded transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser par défaut</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
