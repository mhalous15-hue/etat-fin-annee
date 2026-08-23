# Mohamed Halous — État de Fin d'Année

Un site en français, format rapport d'activité annuel, construit sur la
même base technique que le portfolio (Next.js 14 + TypeScript + Tailwind +
Framer Motion).

## Concept

- Le hero affiche "ÉTAT DE FIN D'ANNÉE" en immense arrière-plan, avec un
  portrait circulaire entouré de 3 icônes cliquables (Design Graphique,
  Photos d'Avancement, Event Photography).
- L'icône Design Graphique fait défiler la page jusqu'à la section
  correspondante. Les icônes Photos d'Avancement et Event Photography
  ouvrent chacune une page dédiée.
- Une section "Marques" liste les entreprises/projets avec lesquels
  Mohamed a travaillé.

## Pages

- `/` — page d'accueil (hero, services, marques, contact)
- `/progres` — liste des projets photographiés (archive de chantier)
- `/progres/[projectId]` — liste des visites datées pour un projet
- `/progres/[projectId]/[visitId]` — photos d'une visite précise
- `/evenementiel` — galerie Event Photography

## Stockage des photos — IMPORTANT

Il n'y a pas de base de données dans ce projet. Les projets, les dates de
visite et les photos sont enregistrés dans **IndexedDB, directement dans
le navigateur** (voir `lib/db.ts`). Cela veut dire :

- Aucune installation supplémentaire n'est nécessaire — tout fonctionne
  dès `npm run dev` ou une fois déployé sur Vercel.
- **Les données ne sont pas partagées entre appareils ou navigateurs.**
  Si vous ajoutez des photos sur votre ordinateur, elles n'apparaîtront
  pas sur votre téléphone, et inversement.
- **Vider le cache / les données de site du navigateur effacera tout.**
  Pensez à garder une copie des photos importantes ailleurs.
- Pour une vraie solution multi-appareils (photos stockées "dans le
  cloud", accessibles de partout), il faudrait ajouter un vrai backend
  (base de données + stockage de fichiers) — c'est une étape possible
  plus tard si besoin.

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Notes de contenu — réel vs. placeholder

- **Design Graphique** : contenu réel, réutilisé du portfolio existant
  (Assafaa Bayt, Atlas Mountain View, Kech Fitness, etc.).
- **Photos d'Avancement** : structure complète et fonctionnelle
  (Projets → Visites datées → Photos), mais commence vide — aucun nom de
  projet n'a été pré-rempli, comme demandé. Ajoutez vos 19 projets
  directement depuis `/progres`.
- **Event Photography** : galerie fonctionnelle, vide pour l'instant —
  ajoutez les photos directement depuis `/evenementiel`.
- **Marques** : réutilise les 5 marques confirmées du portfolio
  (Assafaa Bayt, Atlas Mountain View, Ferma Group, Kech Fitness, Kech
  Food).

## Structure

```
app/
  page.tsx                              → Page d'accueil
  progres/page.tsx                      → Liste des projets
  progres/[projectId]/page.tsx          → Visites d'un projet
  progres/[projectId]/[visitId]/page.tsx→ Photos d'une visite
  evenementiel/page.tsx                 → Galerie événementielle
components/        → Hero, ServicesDetail, Marques, Contact, Footer, Navbar
components/lightbox.tsx    → Visionneuse plein écran réutilisable
components/photo-upload.tsx→ Bouton d'ajout de photos réutilisable
components/ui/     → Button, Reveal, Magnetic, SectionHeading (partagés)
lib/data.ts         → Contenu du site (profil, services, marques)
lib/db.ts            → Stockage local (IndexedDB) des projets/visites/photos
public/images/       → Portrait + visuels réutilisés du portfolio
```

