import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Sparkles, ShieldCheck } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { HotelService } from '../../types';

export const AdminServicesPage: React.FC = () => {
  const { services, addService, updateService, deleteService } = useHotel();
  const [editingService, setEditingService] = useState<HotelService | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form fields
  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [iconName, setIconName] = useState('Sparkles');
  const [category, setCategory] = useState<'comfort' | 'wellness' | 'dining' | 'practical'>('comfort');
  const [isVerified, setIsVerified] = useState(true);

  const openAddModal = () => {
    setEditingService(null);
    setTitle('');
    setTitleEn('');
    setTitleAr('');
    setDescription('');
    setDescriptionEn('');
    setDescriptionAr('');
    setIconName('Sparkles');
    setCategory('comfort');
    setIsVerified(true);
    setIsAdding(true);
  };

  const openEditModal = (service: HotelService) => {
    setEditingService(service);
    setTitle(service.title);
    setTitleEn(service.titleEn);
    setTitleAr(service.titleAr);
    setDescription(service.description);
    setDescriptionEn(service.descriptionEn);
    setDescriptionAr(service.descriptionAr);
    setIconName(service.iconName);
    setCategory(service.category);
    setIsVerified(service.isVerified);
    setIsAdding(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      titleEn: titleEn || title,
      titleAr: titleAr || title,
      description,
      descriptionEn: descriptionEn || description,
      descriptionAr: descriptionAr || description,
      iconName,
      category,
      isVerified,
    };

    if (editingService) {
      updateService({
        ...editingService,
        ...payload,
      });
    } else {
      addService(payload);
    }

    setIsAdding(false);
    setEditingService(null);
  };

  const handleDelete = (id: string, srvTitle: string) => {
    if (window.confirm(`Confirmez-vous la suppression du service "${srvTitle}" ?`)) {
      deleteService(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">
            Gestion des Services & Prestations
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Gérez les équipements vérifiés (Piscine, Wi-Fi, Petit-déjeuner, Climatisation, Parking, PMR).
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0B132B] hover:bg-[#1E293B] border border-[#C5A880] rounded transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C5A880]" />
          <span>Ajouter un service</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Catégorie</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Vérifié</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-800">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-stone-50">
                  <td className="py-3 px-4 font-semibold text-stone-900">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 bg-stone-100 rounded text-stone-700">
                        <Sparkles className="w-3.5 h-3.5" />
                      </span>
                      <span>{service.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 capitalize">{service.category}</td>
                  <td className="py-3 px-4 text-stone-600 max-w-md truncate">
                    {service.description}
                  </td>
                  <td className="py-3 px-4">
                    {service.isVerified ? (
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 w-max">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Vérifié</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-stone-500">Non vérifié</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(service)}
                      className="p-1.5 text-stone-600 hover:text-stone-900 rounded hover:bg-stone-100"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(service.id, service.title)}
                      className="p-1.5 text-red-600 hover:text-red-800 rounded hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-stone-200 max-w-lg w-full p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif text-base font-bold text-stone-900">
                {editingService ? `Modifier : ${editingService.title}` : 'Ajouter un service'}
              </h3>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">
                  Titre du service (Français) *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 uppercase mb-1">
                    Catégorie
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-stone-300 rounded outline-none bg-white"
                  >
                    <option value="comfort">Confort</option>
                    <option value="wellness">Bien-être & Piscine</option>
                    <option value="dining">Restauration</option>
                    <option value="practical">Pratique</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 uppercase mb-1">
                    Icône (Lucide)
                  </label>
                  <select
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded outline-none bg-white"
                  >
                    <option value="Waves">Waves (Piscine)</option>
                    <option value="Wifi">Wifi (Internet)</option>
                    <option value="Coffee">Coffee (Petit-déjeuner)</option>
                    <option value="Wind">Wind (Climatisation)</option>
                    <option value="Car">Car (Parking)</option>
                    <option value="Accessibility">Accessibility (PMR)</option>
                    <option value="Clock">Clock (Réception 24h)</option>
                    <option value="UtensilsCrossed">UtensilsCrossed (Restaurant)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="verified-check"
                  checked={isVerified}
                  onChange={(e) => setIsVerified(e.target.checked)}
                  className="w-4 h-4 text-[#C5A880] rounded border-stone-300"
                />
                <label htmlFor="verified-check" className="font-semibold text-stone-700">
                  Service garanti et vérifié par l’établissement
                </label>
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded hover:bg-stone-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B132B] text-white font-semibold rounded hover:bg-[#1E293B]"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
