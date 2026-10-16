# Jugurtha Palace Hotel — Site Web 5 Étoiles (Gafsa, Tunisie)

Site web officiel, moderne, élégant et responsive pour le **Jugurtha Palace Hotel**, hôtel de prestige 5 étoiles situé à Gafsa, Tunisie.

---

## 🌟 Présentation & Caractéristiques

- **Identité Visuelle Luxe** : Palette or, ivoire, blanc cassé, bleu nuit profond et ardoise, typographie avec empattements (*Playfair Display* & *Amiri* pour l'arabe, *Plus Jakarta Sans* pour le corps de texte).
- **Trilingue (FR, EN, AR)** : Français par défaut, anglais, et arabe avec prise en charge complète du mode RTL (`dir="rtl"`).
- **Système de Réservation Directe (WhatsApp + E-mail)** :
  - Génération de message WhatsApp pré-formaté et soigné pour `+216 76 211 200` (`https://wa.me/21676211200`).
  - Génération de courriel pré-rempli (`mailto:`) avec courriel configurable depuis l'administration.
  - Formulaire de demande avec validation stricte de la date de départ (> date d'arrivée).
  - Mention légale obligatoire en conformité avec les directives hôtelières : *« Votre demande sera transmise à l’hôtel. La réservation sera confirmée uniquement après validation par l’établissement. »*
- **Catalogue Chambres & Suites** :
  - Fiches détaillées, galeries d'images, capacités (adultes/enfants), superficies, équipements et tarifs configurables.
- **Services Vérifiés** :
  - Piscine extérieure oasis, Wi-Fi haut débit, petit-déjeuner buffet, climatisation intégrale, parking privé sécurisé, accessibilité PMR, réception 24h/24.
- **Galerie Photographique & Visionneuse** :
  - Visionneuse plein écran (Lightbox) avec navigation tactile / clavier (précédent, suivant, zoom).
  - Filtrage par catégories (Extérieur, Piscine, Chambres, Restauration, Installations).
- **Découvrir Gafsa** :
  - Guide culturel valorisant les piscines romaines antiques, les gorges de Selja, la palmeraie millénaire et le musée archéologique.
- **Espace d'Administration (/admin)** :
  - Statistiques en direct sur les demandes locales et le contenu du site.
  - Ajout, modification et suppression des chambres et tarifs.
  - Gestion des services et de la galerie photo.
  - Modification des numéros officiels (téléphone, WhatsApp direct), courriel et textes d'accroche.
  - Sauvegarde et restauration des données au format JSON.

---

## ⚙️ Stack Technique

- **Framework** : React 19 + TypeScript
- **Bundler** : Vite 8
- **Routage** : React Router DOM
- **Style** : Tailwind CSS v4
- **Icônes** : Lucide React
- **Persistance** : `localStorage` (aucun backend, ni Firebase, ni Supabase)

---

## 🚀 Installation & Démarrage Local

### Prérequis
- Node.js (version 18+ recommandée)
- npm ou pnpm

### Commandes

```bash
# 1. Cloner ou télécharger le dépôt
git clone <url-du-depot>
cd jugurtha-palace-hotel

# 2. Installer les dépendances
npm install

# 3. Démarrer le serveur de développement
npm run dev

# Le site est accessible à l'adresse : http://localhost:3000
```

---

## 📦 Compilation & Déploiement

### Compilation pour la production :
```bash
npm run build
```
Les fichiers statiques prêts pour la production sont générés dans le dossier `dist/`.

### Déploiement sur Vercel :
Le projet est entièrement statique (Client-Side Rendering) et prêt pour un déploiement instantané sur Vercel :
1. Créez un nouveau projet sur le tableau de bord Vercel.
2. Liez votre dépôt Git.
3. Vercel détecte automatiquement le framework Vite.
4. Framework Preset : **Vite**
5. Build Command : `npm run build`
6. Output Directory : `dist`
7. Pour assurer la gestion correcte des routes côté client sur Vercel, un fichier de réécriture SPA peut être inclus dans `vercel.json` :
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 🔐 Limitations Architecturales & Avertissement Technique (Admin)

1. **Persistance locale (`localStorage`)** :
   En conformité avec le cahier des charges, le site ne possède ni backend ni base de données distante. Toute modification effectuée dans l'administration (ajout de chambre, mise à jour de tarif, enregistrement d'une demande) est conservée dans le stockage local (`localStorage`) du navigateur courant.
2. **Réception des réservations** :
   Les demandes envoyées par WhatsApp ou par e-mail atterrissent directement sur le téléphone ou la boîte de l'hôtel. Seules les demandes soumises via le formulaire local sont enregistrées dans le journal de l'administration du navigateur.
3. **Authentification de démonstration** :
   L'accès à `/admin/login` est un portail de démonstration front-end (mot de passe par défaut : `admin`). Il ne constitue pas un système d'authentification cryptographique sécurisé pour stocker des données confidentielles en production.
4. **Sauvegarde JSON** :
   Utilisez l'onglet **Paramètres & Sauvegardes** pour télécharger un fichier JSON de sauvegarde de vos configurations et le réimporter si vous changez d'ordinateur ou de navigateur.

---

## 📍 Coordonnées de l'Hôtel
- **Établissement** : Jugurtha Palace Hotel (5 étoiles)
- **Adresse** : B.P. 10, Gafsa 2112, Tunisie
- **Téléphone** : +216 76 211 200
- **WhatsApp** : +216 76 211 200
- **Repère Google Maps** : CPPV+8G, Gafsa, Tunisie
- **Note Google** : 3.6 / 5 (629 avis vérifiés)
