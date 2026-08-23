"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Plus, ArrowLeft, Trash2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import {
  addVisit,
  deleteVisit,
  getProject,
  getVisits,
  getPhotos,
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

export default function ProjectPage() {
  const params = useParams<{ projectId: string }>();
  const projectId = params.projectId;

  const [project, setProject] = useState<Project | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [photoCounts, setPhotoCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [newDate, setNewDate] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    try {
      const p = await getProject(projectId);
      const v = await getVisits(projectId);
      setProject(p ?? null);
      setVisits(v);
      const counts: Record<string, number> = {};
      for (const visit of v) {
        counts[visit.id] = (await getPhotos(visit.id)).length;
      }
      setPhotoCounts(counts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de chargement.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newDate) return;
    setAdding(true);
    setError(null);
    try {
      await addVisit(projectId, newDate);
      setNewDate("");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de l'ajout de la visite.");
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: string, date: string) {
    if (!window.confirm(`Supprimer la visite du ${formatDate(date)} et ses photos ?`)) return;
    try {
      await deleteVisit(id);
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de la suppression.");
    }
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

  if (!project) {
    return (
      <main className="min-h-screen pb-24 pt-32">
        <div className="container-page">
          <p className="text-sm text-muted">Projet introuvable.</p>
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
          href="/progres"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={16} /> Tous les projets
        </Link>

        <div className="mt-8 max-w-2xl">
          <span className="font-eyebrow text-sm tracking-widest2 text-accent uppercase">
            Projet
          </span>
          <h1 className="mt-3 font-display text-5xl leading-[0.9] tracking-tightest text-ink sm:text-6xl">
            {project.name}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Ajoutez une nouvelle visite à chaque passage sur le terrain.
            Chaque date regroupe les photos prises ce jour-là.
          </p>
        </div>

        {/* Add visit form */}
        <form
          onSubmit={handleAdd}
          className="mt-10 flex max-w-lg flex-col gap-3 sm:flex-row"
        >
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="h-12 flex-1 rounded-full border border-white/15 bg-card px-5 text-sm text-ink focus:border-accent focus:outline-none"
          />
          <Button type="submit" disabled={adding || !newDate}>
            <Plus size={18} /> Ajouter la visite
          </Button>
        </form>

        {error && (
          <p className="mt-4 max-w-lg rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
            {error}
          </p>
        )}

        {/* Visits list */}
        <div className="mt-14">
          {visits.length === 0 ? (
            <div className="max-w-lg rounded-3xl border border-dashed border-white/15 p-10 text-muted">
              <p className="text-sm leading-relaxed">
                Aucune visite pour ce projet. Ajoutez une date ci-dessus pour
                commencer à archiver les photos d&apos;avancement.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {visits.map((visit, i) => (
                <Reveal key={visit.id} delay={i * 0.04}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="group relative flex items-center justify-between rounded-2xl border border-white/10 bg-card px-6 py-5"
                  >
                    <Link
                      href={`/progres/${projectId}/${visit.id}`}
                      className="flex flex-1 items-center gap-4"
                    >
                      <Calendar className="text-accent" size={20} />
                      <div>
                        <p className="font-display text-lg tracking-tightest text-ink">
                          {formatDate(visit.date)}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                          <ImageIcon size={12} />
                          {photoCounts[visit.id] ?? 0} photo
                          {(photoCounts[visit.id] ?? 0) !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </Link>
                    <button
                      aria-label="Supprimer la visite"
                      onClick={() => handleDelete(visit.id, visit.date)}
                      className="text-muted opacity-0 transition-opacity hover:text-accent group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
