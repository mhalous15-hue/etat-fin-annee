"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { PhotoUpload } from "@/components/photo-upload";
import { Lightbox } from "@/components/lightbox";
import { addPhotos, deletePhoto, getPhotos, EVENT_GALLERY_ID, type Photo } from "@/lib/api-client";

export default function EvenementielPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    try {
      setPhotos(await getPhotos(EVENT_GALLERY_ID));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de chargement.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleUpload(files: FileList) {
    setError(null);
    try {
      await addPhotos(EVENT_GALLERY_ID, files);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de l'envoi des photos.");
    }
  }

  async function handleDelete(photo: Photo) {
    try {
      await deletePhoto(photo.id);
      setLightboxIndex(null);
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de la suppression.");
    }
  }

  return (
    <main className="min-h-screen pb-24 pt-32">
      <div className="container-page">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={16} /> Retour à l&apos;accueil
        </Link>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-eyebrow text-sm tracking-widest2 text-accent uppercase">
              Galerie
            </span>
            <h1 className="mt-3 font-display text-5xl leading-[0.9] tracking-tightest text-ink sm:text-6xl">
              Event Photography
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Couverture photo des événements de marque.
            </p>
          </div>
          {!loading && <PhotoUpload onUpload={handleUpload} label="Ajouter des photos" />}
        </div>

        {error && (
          <p className="mt-4 max-w-lg rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
            {error}
          </p>
        )}

        <div className="mt-14">
          {loading ? (
            <p className="text-sm text-muted">Chargement...</p>
          ) : photos.length === 0 ? (
            <div className="max-w-lg rounded-3xl border border-dashed border-white/15 p-10 text-muted">
              <ImageIcon className="mb-3 text-muted" size={22} />
              <p className="text-sm leading-relaxed">
                La galerie est vide pour le moment. Utilisez le bouton
                &quot;Ajouter des photos&quot; ci-dessus pour commencer à la
                remplir.
              </p>
            </div>
          ) : (
            <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
              {photos.map((photo, i) => (
                <Reveal key={photo.id} delay={Math.min(i * 0.03, 0.4)}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setLightboxIndex(i)}
                    className="group relative block w-full overflow-hidden rounded-xl border border-white/10"
                  >
                    <img
                      src={photo.dataUrl}
                      alt={photo.name}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </motion.button>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
}
