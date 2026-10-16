import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardList, 
  BedDouble, 
  Sparkles, 
  Image, 
  Settings, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileDown
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export const AdminDashboardPage: React.FC = () => {
  const { rooms, services, gallery, bookingRequests, settings } = useHotel();

  const newRequestsCount = bookingRequests.filter((b) => b.status === 'new').length;

  return (
    <div className="space-y-8">
      {/* Title & Introduction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Tableau de Bord
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Gestion du contenu, des hébergements et des demandes locales du Jugurtha Palace Hotel.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/settings"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded hover:bg-stone-50 transition-colors"
          >
            <Settings className="w-3.5 h-3.5 text-stone-500" />
            <span>Paramètres généraux</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards (Tabular numerals, zero-pill discipline) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-lg border border-stone-200/90 shadow-sm flex items-start justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-stone-500 block mb-1">
              Demandes Locales
            </span>
            <div className="text-2xl font-bold text-stone-900 font-serif tabular-nums">
              {bookingRequests.length}
            </div>
            <span className="text-xs text-amber-700 font-medium mt-1 inline-block">
              {newRequestsCount} nouvelle(s) à traiter
            </span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-800 rounded">
            <ClipboardList className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-stone-200/90 shadow-sm flex items-start justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-stone-500 block mb-1">
              Hébergements
            </span>
            <div className="text-2xl font-bold text-stone-900 font-serif tabular-nums">
              {rooms.length}
            </div>
            <span className="text-xs text-stone-500 mt-1 inline-block">
              Chambres & Suites actives
            </span>
          </div>
          <div className="p-3 bg-stone-100 text-[#8C6D3F] rounded">
            <BedDouble className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-stone-200/90 shadow-sm flex items-start justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-stone-500 block mb-1">
              Services de l’Hôtel
            </span>
            <div className="text-2xl font-bold text-stone-900 font-serif tabular-nums">
              {services.length}
            </div>
            <span className="text-xs text-stone-500 mt-1 inline-block">
              {services.filter((s) => s.isVerified).length} vérifiés
            </span>
          </div>
          <div className="p-3 bg-stone-100 text-stone-700 rounded">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-stone-200/90 shadow-sm flex items-start justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-stone-500 block mb-1">
              Photos Galerie
            </span>
            <div className="text-2xl font-bold text-stone-900 font-serif tabular-nums">
              {gallery.length}
            </div>
            <span className="text-xs text-stone-500 mt-1 inline-block">
              Images en ligne
            </span>
          </div>
          <div className="p-3 bg-stone-100 text-stone-700 rounded">
            <Image className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Hotel Configuration Status Notice */}
      <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm space-y-4">
        <h3 className="font-serif text-lg font-bold text-stone-900">
          État des Canaux de Réservation Directe
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-stone-50 border border-stone-200/70 rounded space-y-1">
            <span className="text-stone-500 uppercase tracking-wider font-semibold block">Téléphone officiel</span>
            <span className="font-bold text-stone-900 block text-sm">{settings.phone}</span>
            <span className="text-emerald-700 font-medium">Actif sur le site public</span>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200/70 rounded space-y-1">
            <span className="text-stone-500 uppercase tracking-wider font-semibold block">Numéro WhatsApp</span>
            <span className="font-bold text-stone-900 block text-sm">+{settings.whatsappNumber || '21676211200'}</span>
            <span className="text-emerald-700 font-medium">Message pré-rempli opérationnel</span>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200/70 rounded space-y-1">
            <span className="text-stone-500 uppercase tracking-wider font-semibold block">Courriel de réception</span>
            <span className="font-bold text-stone-900 block text-sm truncate">
              {settings.email || 'Non configuré (optionnel)'}
            </span>
            <span className={settings.email ? 'text-emerald-700 font-medium' : 'text-stone-500'}>
              {settings.email ? 'Prêt pour l\'envoi mailto' : 'Configurable dans les paramètres'}
            </span>
          </div>
        </div>
      </div>

      {/* Recent Local Booking Requests Section */}
      <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Dernières Demandes Enregistrées Localement
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Demandes soumises depuis ce navigateur lors du processus de réservation
            </p>
          </div>
          <Link
            to="/admin/booking-requests"
            className="text-xs font-semibold text-[#8C6D3F] hover:underline flex items-center gap-1"
          >
            <span>Voir toutes les demandes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {bookingRequests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Date de demande</th>
                  <th className="py-3 px-4">Nom de l'hôte</th>
                  <th className="py-3 px-4">Hébergement</th>
                  <th className="py-3 px-4">Dates séjour</th>
                  <th className="py-3 px-4">Occupants</th>
                  <th className="py-3 px-4">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-800">
                {bookingRequests.slice(0, 5).map((req) => (
                  <tr key={req.id} className="hover:bg-stone-50">
                    <td className="py-3 px-4 text-stone-500 tabular-nums">
                      {new Date(req.createdAt).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-3 px-4 font-semibold text-stone-900">{req.fullName}</td>
                    <td className="py-3 px-4">{req.roomName}</td>
                    <td className="py-3 px-4 tabular-nums">
                      {req.checkIn} → {req.checkOut}
                    </td>
                    <td className="py-3 px-4 tabular-nums">
                      {req.adults} ad. {req.children > 0 ? `, ${req.children} enf.` : ''}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          req.status === 'new'
                            ? 'bg-amber-100 text-amber-800'
                            : req.status === 'reviewed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {req.status === 'new' ? 'Nouvelle' : req.status === 'reviewed' ? 'Traitée' : 'Archivée'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-stone-500">
            Aucune demande de réservation n’a encore été enregistrée dans ce navigateur.
          </div>
        )}
      </div>
    </div>
  );
};
