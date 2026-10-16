import React, { useState } from 'react';
import { 
  ClipboardList, 
  Search, 
  Trash2, 
  CheckCircle, 
  Archive, 
  AlertTriangle, 
  X, 
  Phone, 
  Mail, 
  Calendar, 
  Users, 
  MessageSquare,
  ExternalLink
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { BookingRequest } from '../../types';

export const AdminBookingRequestsPage: React.FC = () => {
  const { bookingRequests, updateBookingStatus, deleteBookingRequest } = useHotel();
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'reviewed' | 'archived'>('all');
  const [search, setSearch] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null);

  const filtered = bookingRequests.filter((req) => {
    if (filterStatus !== 'all' && req.status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        req.fullName.toLowerCase().includes(q) ||
        req.email.toLowerCase().includes(q) ||
        req.phone.includes(q) ||
        req.roomName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Supprimer définitivement la demande de "${name}" du stockage local ?`)) {
      deleteBookingRequest(id);
      if (selectedRequest?.id === id) setSelectedRequest(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold text-stone-900">
          Demandes de Réservation Enregistrées Localement
        </h1>
        <p className="text-xs text-stone-600 mt-1">
          Consultez et suivez l’historique des demandes générées dans ce navigateur.
        </p>
      </div>

      {/* Mandatory localStorage Disclaimer Banner */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Rappel technique d’architecture :</strong> En l’absence de serveur ou de base de données (backend / Firebase / Supabase), ce panneau reflète uniquement les demandes stockées dans le <code>localStorage</code> de cet appareil. Les demandes transmises par WhatsApp ou par courriel arrivent directement sur le téléphone ou la boîte de l’hôtel.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto">
          {(['all', 'new', 'reviewed', 'archived'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                filterStatus === st
                  ? 'bg-[#0B132B] text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {st === 'all'
                ? 'Toutes'
                : st === 'new'
                ? 'Nouvelles'
                : st === 'reviewed'
                ? 'Traitées'
                : 'Archivées'}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom, chambre..."
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-stone-300 rounded focus:border-[#C5A880] outline-none"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden">
        {filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Nom de l’hôte</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Hébergement</th>
                  <th className="py-3 px-4">Séjour</th>
                  <th className="py-3 px-4">Statut</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-800">
                {filtered.map((req) => (
                  <tr key={req.id} className="hover:bg-stone-50">
                    <td className="py-3 px-4 text-stone-500 tabular-nums whitespace-nowrap">
                      {new Date(req.createdAt).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-3 px-4 font-semibold text-stone-900 whitespace-nowrap">
                      {req.fullName}
                    </td>
                    <td className="py-3 px-4 text-stone-600">
                      <div>{req.phone}</div>
                      <div className="text-[11px] text-stone-400 truncate max-w-[150px]">{req.email}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-stone-800">
                      {req.roomName}
                    </td>
                    <td className="py-3 px-4 tabular-nums whitespace-nowrap">
                      {req.checkIn} → {req.checkOut}
                      <span className="block text-[10px] text-stone-400">
                        {req.adults} ad. {req.children > 0 ? `, ${req.children} enf.` : ''}
                      </span>
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
                        {req.status === 'new'
                          ? 'Nouvelle'
                          : req.status === 'reviewed'
                          ? 'Traitée'
                          : 'Archivée'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap space-x-1">
                      <button
                        type="button"
                        onClick={() => setSelectedRequest(req)}
                        className="px-2 py-1 text-[11px] font-medium bg-stone-100 hover:bg-stone-200 rounded text-stone-800"
                      >
                        Détails
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(req.id, req.fullName)}
                        className="p-1 text-red-600 hover:text-red-800 rounded hover:bg-red-50"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-stone-500">
            Aucune demande de réservation trouvée dans cette vue.
          </div>
        )}
      </div>

      {/* Request Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-stone-200 max-w-lg w-full p-6 space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                  Demande de réservation #{selectedRequest.id.substring(4, 12)}
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  {selectedRequest.fullName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 bg-stone-50 p-4 rounded border border-stone-200/80">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-stone-500 block">Hébergement :</span>
                  <span className="font-semibold text-stone-900">{selectedRequest.roomName}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Voyageurs :</span>
                  <span className="font-semibold text-stone-900">
                    {selectedRequest.adults} adulte(s), {selectedRequest.children} enfant(s)
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block">Date d'arrivée :</span>
                  <span className="font-semibold text-stone-900 tabular-nums">{selectedRequest.checkIn}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Date de départ :</span>
                  <span className="font-semibold text-stone-900 tabular-nums">{selectedRequest.checkOut}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Téléphone :</span>
                  <a href={`tel:${selectedRequest.phone}`} className="font-semibold text-[#8C6D3F] hover:underline">
                    {selectedRequest.phone}
                  </a>
                </div>
                <div>
                  <span className="text-stone-500 block">E-mail :</span>
                  <a href={`mailto:${selectedRequest.email}`} className="font-semibold text-[#8C6D3F] hover:underline truncate block">
                    {selectedRequest.email}
                  </a>
                </div>
              </div>

              {selectedRequest.specialRequests && (
                <div className="pt-2 border-t border-stone-200">
                  <span className="text-stone-500 block mb-0.5">Demandes particulières :</span>
                  <p className="text-stone-800 italic bg-white p-2 rounded border border-stone-200">
                    "{selectedRequest.specialRequests}"
                  </p>
                </div>
              )}
            </div>

            {/* Quick response actions */}
            <div className="space-y-2">
              <span className="font-semibold text-stone-700 block">Actions rapides :</span>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${selectedRequest.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Bonjour ${selectedRequest.fullName}, nous faisons suite à votre demande de réservation au Jugurtha Palace Hotel Gafsa pour ${selectedRequest.roomName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Répondre par WhatsApp</span>
                </a>
                <a
                  href={`mailto:${selectedRequest.email}?subject=${encodeURIComponent(
                    `Votre réservation - Jugurtha Palace Hotel`
                  )}`}
                  className="p-2.5 bg-[#0B132B] hover:bg-[#1E293B] text-white rounded font-medium flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Répondre par Email</span>
                </a>
              </div>
            </div>

            {/* Status Changer */}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <span className="text-stone-500">Changer le statut :</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    updateBookingStatus(selectedRequest.id, 'reviewed');
                    setSelectedRequest({ ...selectedRequest, status: 'reviewed' });
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium ${
                    selectedRequest.status === 'reviewed'
                      ? 'bg-blue-600 text-white'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  Marquer traitée
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateBookingStatus(selectedRequest.id, 'archived');
                    setSelectedRequest({ ...selectedRequest, status: 'archived' });
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium ${
                    selectedRequest.status === 'archived'
                      ? 'bg-stone-800 text-white'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  Archiver
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
