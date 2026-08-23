import type { Metadata } from "next";
import { Anton, Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";

// Oversized editorial display face — used for the huge hero/section headlines.
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

// Condensed uppercase face reserved for eyebrows, labels and the marquee.
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

// Clean, modern body face for paragraphs and UI text.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — État de Fin d'Année`,
  description: `Rapport d'activité annuel de ${profile.name}, ${profile.role}.`,
  keywords: [
    "graphiste",
    "créateur vidéo",
    "identité de marque",
    "Maroc",
    "Marrakech",
    "état de fin d'année",
    profile.name,
  ],
  openGraph: {
    title: `${profile.name} — État de Fin d'Année`,
    description: `Rapport d'activité annuel de ${profile.name}, ${profile.role}.`,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${anton.variable} ${bebas.variable} ${inter.variable}`}>
      <body className="font-body bg-primary text-ink antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
