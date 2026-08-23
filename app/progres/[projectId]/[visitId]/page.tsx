"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ImageIcon, Trash2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { PhotoUpload } from "@/components/photo-upload";
import { Lightbox } from "@/components/lightbox";
import {
  addPhotos,
  deletePhoto,
  getPhotos,
  getProject,
  getVisit,
  type Photo,
  type Project,
  type Visit,
} from "@/lib/api-client";

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function VisitPage() {
  const params = useParams<{ projectId: string; visitId: string }>();
  const { projectId, visitId } = params;

  const [project, setProject] = useState<Project | null>(null);
  const [visit, setVisit] = useState<Visit | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  async function refresh() {
    setProject((await getProject(projectId)) ?? null);
    setVisit((await getVisit(visitId)) ?? null);
    setPhotos(await getPhotos(visitId));
    setLoading(false);
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, visitId]);

  async function handleUpload(files: FileList) {
    await addPhotos(visitId, files);
    refresh();
  }

  async function handleDelete(photo: Photo) {
    await deletePhoto(photo.id);
    setLightboxIndex(null);
    refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen pb-24 pt-32">
        <div className="container-page">
          <p className="text-sm text-muted">Chargement...</p>
        </div>
      </main>
    );
  }

  if (!project || !visit) {
    return (
      <main className="min-h-screen pb-24 pt-32">
        <div className="container-page">
          <p className="text-sm text-muted">Visite introuvable.</p>
          <Link href="/progres" className="mt-4 inline-block text-accent">
            Retour aux projets
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-24 pt-32">
      <div className="container-page">
        <Link
          href={`/progres/${projectId}`}
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={16} /> {project.name}
        </Link>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="font-eyebrow text-sm tracking-widest2 text-accent uppercase">
              {project.name}
            </span>
            <h1 className="mt-3 font-display text-4xl leading-[0.9] tracking-tightest text-ink sm:text-5xl">
              {formatDate(visit.date)}
            </h1>
          </div>
          <PhotoUpload onUpload={handleUpload} label="Ajouter des photos" />
        </div>

        <div className="mt-12">
          {photos.length === 0 ? (
            <div className="max-w-lg rounded-3xl border border-dashed border-white/15 p-10 text-muted">
              <ImageIcon className="mb-3 text-muted" size={22} />
              <p className="text-sm leading-relaxed">
                Aucune photo pour cette visite. Utilisez le bouton
                &quot;Ajouter des photos&quot; ci-dessus — vous pouvez en
                sélectionner plusieurs à la fois.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {photos.map((photo, i) => (
                <Reveal key={photo.id} delay={i * 0.03}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setLightboxIndex(i)}
                    className="group relative block aspect-square w-full overflow-hidden rounded-xl border border-white/10"
                  >
                    <img
                      src={photo.dataUrl}
                      alt={photo.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
