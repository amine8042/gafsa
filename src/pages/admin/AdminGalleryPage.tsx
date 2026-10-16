import React, { useState } from 'react';
import { Plus, Trash2, Edit2, X, Image as ImageIcon } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { GalleryItem } from '../../types';
import { ASSET_IMAGES, resolveHotelImage } from '../../assets/images';

export const AdminGalleryPage: React.FC = () => {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useHotel();
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'rooms' | 'exterior' | 'pool' | 'dining' | 'facilities'>('exterior');
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');

  const openAddModal = () => {
    setEditingItem(null);
    setTitle('');
    setCategory('exterior');
    setImageUrl(ASSET_IMAGES.hero);
    setCaption('');
    setIsAdding(true);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setImageUrl(item.imageUrl);
    setCaption(item.caption || '');
    setIsAdding(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;

    if (editingItem) {
      updateGalleryItem({
        ...editingItem,
        title,
        category,
        imageUrl: imageUrl.trim(),
        caption: caption.trim() || undefined,
      });
    } else {
      addGalleryItem({
        title,
        category,
        imageUrl: imageUrl.trim(),
        caption: caption.trim() || undefined,
      });
    }

    setIsAdding(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string, itemTitle: string) => {
    if (window.confirm(`Supprimer la photo "${itemTitle}" de la galerie ?`)) {
      deleteGalleryItem(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">
            Gestion de la Galerie Photographique
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Ajoutez, éditez ou retirez des photographies de l’établissement par catégorie.
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0B132B] hover:bg-[#1E293B] border border-[#C5A880] rounded transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C5A880]" />
          <span>Ajouter une photo</span>
        </button>
      </div>

      {/* Grid of gallery items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-stone-200 rounded-lg overflow-hidden flex flex-col justify-between shadow-sm"
          >
            <div className="relative aspect-[4/3] bg-stone-100">
              <img
                src={resolveHotelImage(item.imageUrl)}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = ASSET_IMAGES.hero;
                }}
              />
              <span className="absolute top-2 left-2 bg-stone-950/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] uppercase font-semibold">
                {item.category}
              </span>
            </div>

            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-semibold text-xs text-stone-900 truncate">{item.title}</h4>
                {item.caption && (
                  <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5">{item.caption}</p>
                )}
              </div>

              <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-end gap-1">
                <button
                  type="button"
                  onClick={() => openEditModal(item)}
                  className="p-1 text-stone-600 hover:text-stone-900 rounded hover:bg-stone-100"
                  title="Modifier"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-1 text-red-600 hover:text-red-800 rounded hover:bg-red-50"
                  title="Supprimer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-stone-200 max-w-md w-full p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif text-base font-bold text-stone-900">
                {editingItem ? 'Modifier la photo' : 'Ajouter une photo'}
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
                  Titre de la photo *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex. Terrasse de la piscine"
                  className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">
                  Catégorie
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 border border-stone-300 rounded outline-none bg-white"
                >
                  <option value="exterior">Extérieur & Façade</option>
                  <option value="pool">Piscine & Oasis</option>
                  <option value="rooms">Chambres & Suites</option>
                  <option value="dining">Restauration</option>
                  <option value="facilities">Espaces & Installations</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">
                  URL de l'image *
                </label>
                <input
                  type="text"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://... ou /src/assets/..."
                  className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">
                  Légende descriptive (optionnelle)
                </label>
                <textarea
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Brève description de la scène..."
                  className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#C5A880] outline-none"
                />
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
