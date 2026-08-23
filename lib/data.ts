// ---------------------------------------------------------------------------
// Contenu — État de fin d'année (rapport d'évaluation)
// Les informations de profil et marques réutilisent les faits réels déjà
// vérifiés (CV + portfolio de Mohamed Halous).
//
// "Design Graphique" reste une section sur la page d'accueil (contenu réel,
// réutilisé du portfolio). "Photos d'Avancement" et "Event Photography"
// sont désormais des pages dédiées (/progres et /evenementiel) avec leur
// propre interface d'ajout de projets, de visites datées et de photos —
// voir lib/db.ts.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Mohamed Halous",
  role: "Graphiste & Créateur Vidéo",
  email: "mhalous15@gmail.com",
  phone: "+212 762 597 616",
  location: "Marrakech, Maroc",
  currentRole: "Graphiste chez Assafaa Bayt, depuis avril 2024",
  period: "2+ Ans d'Expérience",
};

export type ServiceIcon = "design" | "progress" | "event";

export type Service = {
  id: string;
  icon: ServiceIcon;
  label: string;
  title: string;
  summary: string;
  deliverables: string[];
  hasRealContent: boolean;
  /** Where the hero orbit icon sends the visitor. */
  href: string;
  /** "anchor" scrolls on the homepage; "page" navigates to a dedicated route. */
  linkType: "anchor" | "page";
};

export const services: Service[] = [
  {
    id: "graphic-design",
    icon: "design",
    label: "Graphic Design",
    title: "Design Graphique",
    summary:
      "Identité de marque, supports imprimés et campagnes social media pour Assafaa Bayt, Atlas Mountain View, Ferma Group et Kech Fitness.",
    deliverables: [
      "Logos & identités de marque",
      "Roll-up, kakemonos, flyers & brochures",
      "Stands d'exposition",
      "Campagnes réseaux sociaux",
      "Mockups & merchandising",
    ],
    hasRealContent: true,
    href: "#graphic-design",
    linkType: "anchor",
  },
  {
    id: "photos-avancement",
    icon: "progress",
    label: "Photos d'Avancement",
    title: "Photos d'Avancement",
    summary:
      "Archive photo par projet et par date de visite, pour suivre l'avancement de chaque chantier dans le temps.",
    deliverables: [],
    hasRealContent: false,
    href: "/progres",
    linkType: "page",
  },
  {
    id: "event-photography",
    icon: "event",
    label: "Event Photography",
    title: "Event Photography",
    summary:
      "Couverture photo des événements de marque, dans une galerie moderne.",
    deliverables: [],
    hasRealContent: false,
    href: "/evenementiel",
    linkType: "page",
  },
];

export type Brand = {
  name: string;
  category: string;
  color: string;
};

export const brands: Brand[] = [
  { name: "Assafaa Bayt", category: "Financement Immobilier", color: "#E63946" },
  { name: "Atlas Mountain View", category: "Immobilier & Hôtellerie", color: "#E63946" },
  { name: "Ferma Group", category: "Identité de Marque", color: "#3A7739" },
  { name: "Kech Fitness", category: "Fitness & Lifestyle", color: "#F8EA4C" },
  { name: "Kech Food", category: "Restauration", color: "#A0A0A0" },
];

export const stats = [
  { value: "5", label: "Marques" },
  { value: "2+", label: "Ans d'Expérience" },
  { value: "3", label: "Domaines d'Activité" },
];
