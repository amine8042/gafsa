import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, AlertTriangle, ArrowLeft } from 'lucide-react';
import { StorageService } from '../../services/storage';

export const AdminLoginPage: React.FC = () => {
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend-only demo authentication
    if (password.trim() === 'admin' || password.trim().length > 0) {
      StorageService.setAdminAuthenticated(true);
      navigate('/admin');
    } else {
      setError('Veuillez entrer le mot de passe de démonstration.');
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <span className="font-serif text-3xl font-bold tracking-tight text-white block">
            Jugurtha Palace
          </span>
          <span className="text-xs font-serif uppercase tracking-widest text-[#C5A880] block mt-1">
            ★★★★★ · Gafsa, Tunisie
          </span>
          <h2 className="mt-6 text-xl font-bold text-stone-100">
            Espace d’Administration
          </h2>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-xl rounded-lg sm:px-10 border border-stone-200 space-y-6">
          {/* Important Transparency Callout */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 space-y-1.5 leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-amber-950">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Avertissement Technique</span>
            </div>
            <p>
              Cette interface de connexion est une démonstration front-end sans serveur ni base de données. Elle ne constitue pas une authentification sécurisée et ne protège pas de données sensibles en production.
            </p>
            <p className="text-[11px] text-amber-800">
              Mot de passe de démonstration pré-rempli : <strong>admin</strong>
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Mot de passe de démonstration
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded focus:border-[#C5A880] outline-none"
                  placeholder="admin"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute right-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#0B132B] hover:bg-[#1E293B] border border-[#C5A880]/70 rounded shadow transition-all text-center"
            >
              Accéder au tableau de bord
            </button>
          </form>

          <div className="pt-2 text-center border-t border-stone-100">
            <Link
              to="/"
              className="text-xs text-stone-600 hover:text-stone-900 inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour au site public de l’hôtel</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
