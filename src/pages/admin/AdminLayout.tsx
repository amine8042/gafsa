import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BedDouble, 
  Sparkles, 
  Image, 
  ClipboardList, 
  Settings, 
  LogOut, 
  AlertTriangle,
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { StorageService } from '../../services/storage';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!StorageService.isAdminAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    StorageService.setAdminAuthenticated(false);
    navigate('/');
  };

  const navItems = [
    { path: '/admin', label: 'Vue d’ensemble', icon: LayoutDashboard, exact: true },
    { path: '/admin/rooms', label: 'Chambres & Suites', icon: BedDouble },
    { path: '/admin/services', label: 'Services de l’hôtel', icon: Sparkles },
    { path: '/admin/gallery', label: 'Galerie Photos', icon: Image },
    { path: '/admin/booking-requests', label: 'Demandes reçues', icon: ClipboardList },
    { path: '/admin/settings', label: 'Paramètres & Sauvegardes', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans">
      {/* Top Banner reminding of localStorage limitations */}
      <div className="bg-amber-100 border-b border-amber-200 px-4 py-2 text-xs text-amber-900 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 truncate">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
          <span className="truncate">
            <strong>Mode Démonstration & Stockage Local :</strong> Les modifications sont enregistrées dans le navigateur local (localStorage). Aucun serveur ou base de données externe n’est connecté.
          </span>
        </div>
        <Link
          to="/"
          className="text-amber-950 font-semibold hover:underline whitespace-nowrap shrink-0 flex items-center gap-1 text-[11px]"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Voir le site public</span>
        </Link>
      </div>

      {/* Main Admin Navigation Bar */}
      <header className="bg-[#0B132B] text-white border-b border-stone-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className="font-serif text-lg font-bold tracking-tight text-white">
                Jugurtha Palace
              </span>
              <span className="text-xs text-[#C5A880] border-l border-stone-700 pl-3 hidden sm:inline">
                Portail Administration
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-300 hover:text-white border border-stone-700 hover:border-stone-500 rounded transition-colors"
              >
                <LogOut className="w-3.5 h-3.5 text-stone-400" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto py-2 border-t border-stone-800 text-xs">
            {navItems.map((item) => {
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-[#C5A880] text-stone-950 font-semibold'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Admin Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-stone-200 py-4 text-center text-xs text-stone-500">
        Administration Jugurtha Palace Hotel · Stockage Local (localStorage)
      </footer>
    </div>
  );
};
