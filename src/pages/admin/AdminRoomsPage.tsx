import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, BedDouble, AlertCircle } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { Room } from '../../types';
import { ASSET_IMAGES } from '../../services/storage';

export const AdminRoomsPage: React.FC = () => {
  const { rooms, addRoom, updateRoom, deleteRoom } = useHotel();
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [type, setType] = useState('Chambre Supérieure');
  const [description, setDescription] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [pricePerNight, setPricePerNight] = useState(200);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [maxGuests, setMaxGuests] = useState(3);
  const [bedType, setBedType] = useState('1 Grand Lit King-Size');
  const [sizeM2, setSizeM2] = useState(40);
  const [amenitiesString, setAmenitiesString] = useState('Climatisation, Wi-Fi gratuit, Balcon');
  const [imagesString, setImagesString] = useState(ASSET_IMAGES.suite);
  const [featured, setFeatured] = useState(false);

  const openAddModal = () => {
    setEditingRoom(null);
    setName('');
    setNameEn('');
    setNameAr('');
    setType('Chambre Supérieure');
    setDescription('');
    setDescriptionEn('');
    setDescriptionAr('');
    setPricePerNight(220);
    setAdults(2);
    setChildren(1);
    setMaxGuests(3);
    setBedType('1 Grand Lit King-Size');
    setSizeM2(42);
    setAmenitiesString('Climatisation, Wi-Fi gratuit, Balcon, Télévision satellite, Mini-bar');
    setImagesString(ASSET_IMAGES.suite);
    setFeatured(false);
    setIsAdding(true);
  };

  const openEditModal = (room: Room) => {
    setEditingRoom(room);
    setName(room.name);
    setNameEn(room.nameEn);
    setNameAr(room.nameAr);
    setType(room.type);
    setDescription(room.description);
    setDescriptionEn(room.descriptionEn);
    setDescriptionAr(room.descriptionAr);
    setPricePerNight(room.pricePerNight);
    setAdults(room.capacity.adults);
    setChildren(room.capacity.children);
    setMaxGuests(room.capacity.maxGuests);
    setBedType(room.bedType);
    setSizeM2(room.sizeM2);
    setAmenitiesString(room.amenities.join(', '));
    setImagesString(room.images.join('\n'));
    setFeatured(Boolean(room.featured));
    setIsAdding(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const amenities = amenitiesString
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const images = imagesString
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (images.length === 0) {
      images.push(ASSET_IMAGES.suite);
    }

    const roomPayload = {
      name,
      nameEn: nameEn || name,
      nameAr: nameAr || name,
      type,
      description,
      descriptionEn: descriptionEn || description,
      descriptionAr: descriptionAr || description,
      pricePerNight: Number(pricePerNight),
      capacity: {
        adults: Number(adults),
        children: Number(children),
        maxGuests: Number(maxGuests),
      },
      bedType,
      sizeM2: Number(sizeM2),
      amenities,
      images,
      featured,
    };

    if (editingRoom) {
      updateRoom({
        ...editingRoom,
        ...roomPayload,
      });
    } else {
      addRoom(roomPayload);
    }

    setIsAdding(false);
    setEditingRoom(null);
  };

  const handleDelete = (id: string, roomName: string) => {
    if (window.confirm(`Confirmez-vous la suppression de l’hébergement "${roomName}" ?`)) {
      deleteRoom(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">
            Gestion des Chambres & Suites
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Modifiez les tarifs, descriptifs, photos et caractéristiques des hébergements affichés sur le site.
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0B132B] hover:bg-[#1E293B] border border-[#C5A880] rounded transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C5A880]" />
          <span>Ajouter une chambre</span>
        </button>
      </div>

      {/* Rooms Table */}
      <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Hébergement</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Capacité</th>
                <th className="py-3 px-4">Superficie</th>
                <th className="py-3 px-4">Tarif (TND / nuit)</th>
                <th className="py-3 px-4">En vedette</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-800">
              {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-stone-50">
                  <td className="py-3 px-4 font-semibold text-stone-900 flex items-center gap-3">
                    {room.images && room.images.length > 0 ? (
                      <img
                        src={room.images[0]}
                        alt=""
                        className="w-10 h-8 object-cover rounded shrink-0 border border-stone-200"
                      />
                    ) : (
                      <div className="w-10 h-8 bg-stone-200 rounded shrink-0" />
                    )}
                    <div>
                      <span>{room.name}</span>
                      <span className="block text-[11px] text-stone-400 font-normal">{room.slug}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{room.type}</td>
                  <td className="py-3 px-4 tabular-nums">
                    {room.capacity.maxGuests} pers. ({room.capacity.adults} ad. / {room.capacity.children} enf.)
                  </td>
                  <td className="py-3 px-4 tabular-nums">{room.sizeM2} m²</td>
                  <td className="py-3 px-4 font-bold text-stone-900 tabular-nums">
                    {room.pricePerNight} TND
                  </td>
                  <td className="py-3 px-4">
                    {room.featured ? (
                      <span className="text-[10px] font-semibold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        Oui
                      </span>
                    ) : (
                      <span className="text-stone-400 text-[11px]">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(room)}
                      className="p-1.5 text-stone-600 hover:text-stone-900 rounded hover:bg-stone-100 transition-colors"
                      title="Modifier"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(room.id, room.name)}
                      className="p-1.5 text-red-600 hover:text-red-800 rounded hover:bg-red-50 transition-colors"
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
      </div>

      {/* Add / Edit Room Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl border border-stone-200 max-w-2xl w-full my-8 max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                {editingRoom ? `Modifier : ${editingRoom.name}` : 'Ajouter un nouvel hébergement'}
              </h3>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 uppercase mb-1">
                    Nom (Français) *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 uppercase mb-1">
                    Catégorie / Type *
                  </label>
                  <input
                    type="text"
                    required
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="Ex. Suite Deluxe, Chambre Supérieure"
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 uppercase mb-1">
                    Nom (Arabe)
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={nameAr}
                    onChange={(e) => setNameAr(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 uppercase mb-1">
                    Nom (Anglais)
                  </label>
                  <input
                    type="text"
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 uppercase mb-1">
                    Prix (TND) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={pricePerNight}
                    onChange={(e) => setPricePerNight(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 uppercase mb-1">
                    Superficie (m²)
                  </label>
                  <input
                    type="number"
                    min="10"
                    value={sizeM2}
                    onChange={(e) => setSizeM2(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 uppercase mb-1">
                    Adultes
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 uppercase mb-1">
                    Enfants
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="4"
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">
                  Type de literie
                </label>
                <input
                  type="text"
                  value={bedType}
                  onChange={(e) => setBedType(e.target.value)}
                  placeholder="Ex. 1 Grand Lit King-Size"
                  className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">
                  Description (Français) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">
                  Équipements (séparés par des virgules)
                </label>
                <input
                  type="text"
                  value={amenitiesString}
                  onChange={(e) => setAmenitiesString(e.target.value)}
                  placeholder="Climatisation, Wi-Fi, Balcon, Coffre-fort..."
                  className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">
                  URLs des photos (une par ligne)
                </label>
                <textarea
                  rows={2}
                  value={imagesString}
                  onChange={(e) => setImagesString(e.target.value)}
                  placeholder="https://... ou chemin local"
                  className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#C5A880] rounded border-stone-300"
                />
                <label htmlFor="featured-check" className="font-semibold text-stone-700">
                  Afficher en vedette sur la page d'accueil
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
