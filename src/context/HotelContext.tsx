import React, { createContext, useContext, useState, useEffect } from 'react';
import { Room, HotelService, GalleryItem, BookingRequest, HotelSettings } from '../types';
import { StorageService } from '../services/storage';

interface HotelContextType {
  settings: HotelSettings;
  rooms: Room[];
  services: HotelService[];
  gallery: GalleryItem[];
  bookingRequests: BookingRequest[];
  updateSettings: (newSettings: HotelSettings) => void;
  // Rooms
  addRoom: (room: Omit<Room, 'id' | 'slug'>) => Room;
  updateRoom: (room: Room) => void;
  deleteRoom: (id: string) => void;
  // Services
  addService: (service: Omit<HotelService, 'id'>) => HotelService;
  updateService: (service: HotelService) => void;
  deleteService: (id: string) => void;
  // Gallery
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => GalleryItem;
  updateGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  // Bookings
  addBookingRequest: (req: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => BookingRequest;
  updateBookingStatus: (id: string, status: 'new' | 'reviewed' | 'archived') => void;
  deleteBookingRequest: (id: string) => void;
  // Backup
  exportDataJson: () => string;
  importDataJson: (json: string) => boolean;
  resetAllDefaults: () => void;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<HotelSettings>(() => StorageService.getSettings());
  const [rooms, setRooms] = useState<Room[]>(() => StorageService.getRooms());
  const [services, setServices] = useState<HotelService[]>(() => StorageService.getServices());
  const [gallery, setGallery] = useState<GalleryItem[]>(() => StorageService.getGallery());
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>(() => StorageService.getBookingRequests());

  // Listen to storage events if multiple tabs are opened
  useEffect(() => {
    const handleStorage = () => {
      setSettings(StorageService.getSettings());
      setRooms(StorageService.getRooms());
      setServices(StorageService.getServices());
      setGallery(StorageService.getGallery());
      setBookingRequests(StorageService.getBookingRequests());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const updateSettings = (newSettings: HotelSettings) => {
    setSettings(newSettings);
    StorageService.saveSettings(newSettings);
  };

  const addRoom = (roomData: Omit<Room, 'id' | 'slug'>): Room => {
    const slug = roomData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'room-' + Date.now();
    const newRoom: Room = {
      ...roomData,
      id: 'room-' + Date.now(),
      slug,
    };
    const updated = [...rooms, newRoom];
    setRooms(updated);
    StorageService.saveRooms(updated);
    return newRoom;
  };

  const updateRoom = (updatedRoom: Room) => {
    const updated = rooms.map((r) => (r.id === updatedRoom.id ? updatedRoom : r));
    setRooms(updated);
    StorageService.saveRooms(updated);
  };

  const deleteRoom = (id: string) => {
    const updated = rooms.filter((r) => r.id !== id);
    setRooms(updated);
    StorageService.saveRooms(updated);
  };

  const addService = (serviceData: Omit<HotelService, 'id'>): HotelService => {
    const newService: HotelService = {
      ...serviceData,
      id: 'srv-' + Date.now(),
    };
    const updated = [...services, newService];
    setServices(updated);
    StorageService.saveServices(updated);
    return newService;
  };

  const updateService = (updatedService: HotelService) => {
    const updated = services.map((s) => (s.id === updatedService.id ? updatedService : s));
    setServices(updated);
    StorageService.saveServices(updated);
  };

  const deleteService = (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    StorageService.saveServices(updated);
  };

  const addGalleryItem = (itemData: Omit<GalleryItem, 'id'>): GalleryItem => {
    const newItem: GalleryItem = {
      ...itemData,
      id: 'gal-' + Date.now(),
    };
    const updated = [newItem, ...gallery];
    setGallery(updated);
    StorageService.saveGallery(updated);
    return newItem;
  };

  const updateGalleryItem = (updatedItem: GalleryItem) => {
    const updated = gallery.map((g) => (g.id === updatedItem.id ? updatedItem : g));
    setGallery(updated);
    StorageService.saveGallery(updated);
  };

  const deleteGalleryItem = (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    StorageService.saveGallery(updated);
  };

  const addBookingRequest = (req: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>): BookingRequest => {
    const created = StorageService.addBookingRequest(req);
    setBookingRequests((prev) => [created, ...prev]);
    return created;
  };

  const updateBookingStatus = (id: string, status: 'new' | 'reviewed' | 'archived') => {
    const updated = bookingRequests.map((b) => (b.id === id ? { ...b, status } : b));
    setBookingRequests(updated);
    StorageService.saveBookingRequests(updated);
  };

  const deleteBookingRequest = (id: string) => {
    const updated = bookingRequests.filter((b) => b.id !== id);
    setBookingRequests(updated);
    StorageService.saveBookingRequests(updated);
  };

  const exportDataJson = (): string => {
    return StorageService.exportBackupJson();
  };

  const importDataJson = (json: string): boolean => {
    const success = StorageService.importBackupJson(json);
    if (success) {
      setSettings(StorageService.getSettings());
      setRooms(StorageService.getRooms());
      setServices(StorageService.getServices());
      setGallery(StorageService.getGallery());
      setBookingRequests(StorageService.getBookingRequests());
    }
    return success;
  };

  const resetAllDefaults = () => {
    StorageService.resetToDefaults();
    setSettings(StorageService.getSettings());
    setRooms(StorageService.getRooms());
    setServices(StorageService.getServices());
    setGallery(StorageService.getGallery());
  };

  return (
    <HotelContext.Provider
      value={{
        settings,
        rooms,
        services,
        gallery,
        bookingRequests,
        updateSettings,
        addRoom,
        updateRoom,
        deleteRoom,
        addService,
        updateService,
        deleteService,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addBookingRequest,
        updateBookingStatus,
        deleteBookingRequest,
        exportDataJson,
        importDataJson,
        resetAllDefaults,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = (): HotelContextType => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
