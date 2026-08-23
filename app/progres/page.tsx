"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FolderOpen, Plus, ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import {
  addProject,
  deleteProject,
  getProjects,
  type Project,
} from "@/lib/api-client";

export default function ProgresPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);

  async function refresh() {
    setProjects(await getProjects());
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    setAdding(true);
    await addProject(name);
    setNewName("");
    setAdding(false);
    refresh();
  }

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Supprimer le projet "${name}" et toutes ses photos ?`)) return;
    await deleteProject(id);
    refresh();
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

        <div className="mt-8 max-w-2xl">
          <span className="font-eyebrow text-sm tracking-widest2 text-accent uppercase">
            Suivi de Chantier
          </span>
          <h1 className="mt-3 font-display text-5xl leading-[0.9] tracking-tightest text-ink sm:text-6xl">
            Photos d&apos;Avancement
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Chaque projet est une archive photo organisée par date de visite.
            Créez un projet, puis ajoutez une visite à chaque passage sur le
            terrain pour suivre l&apos;avancement dans le temps.
          </p>
        </div>

        {/* Add project form */}
        <form
          onSubmit={handleAdd}
          className="mt-10 flex max-w-lg flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nom du projet — ex. PALM SOURCE GH1"
            className="h-12 flex-1 rounded-full border border-white/15 bg-card px-5 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
          <Button type="submit" disabled={adding || !newName.trim()}>
            <Plus size={18} /> Ajouter le projet
          </Button>
        </form>

        {/* Projects list */}
        <div className="mt-14">
          {loading ? (
            <p className="text-sm text-muted">Chargement...</p>
          ) : projects.length === 0 ? (
            <div className="max-w-lg rounded-3xl border border-dashed border-white/15 p-10 text-muted">
              <p className="text-sm leading-relaxed">
                Aucun projet pour le moment. Ajoutez votre premier projet
                ci-dessus — vous pourrez ensuite y ajouter des visites datées
                et des photos.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <Reveal key={project.id} delay={i * 0.04}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-card p-6"
                  >
                    <Link href={`/progres/${project.id}`} className="block">
                      <FolderOpen className="text-accent" size={24} />
                      <p className="mt-4 font-display text-xl tracking-tightest text-ink">
                        {project.name}
                      </p>
                    </Link>
                    <button
                      aria-label={`Supprimer ${project.name}`}
                      onClick={() => handleDelete(project.id, project.name)}
                      className="absolute right-4 top-4 text-muted opacity-0 transition-opacity hover:text-accent group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          )}
        </div>

        <p className="mt-14 max-w-lg text-xs leading-relaxed text-muted">
          Les projets, visites et photos sont enregistrés dans ce navigateur
          (stockage local). Ils ne sont pas synchronisés entre appareils —
          utilisez toujours le même navigateur pour retrouver vos archives.
        </p>
      </div>
    </main>
  );
}
