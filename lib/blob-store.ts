import { put, del, list } from "@vercel/blob";

// ---------------------------------------------------------------------------
// Cloud storage for Photos d'Avancement and the Event Photography gallery,
// backed by Vercel Blob. This runs on the SERVER ONLY (API routes) — it
// needs the BLOB_READ_WRITE_TOKEN environment variable, which Vercel
// injects automatically once a Blob store is connected to this project.
//
// There is no separate database: all structured data (projects, visits,
// photo metadata) lives in a single JSON file ("manifest.json") stored in
// the same Blob store, alongside the photo files themselves. This keeps
// the whole system to one service instead of two.
// ---------------------------------------------------------------------------

export type Project = {
  id: string;
  name: string;
  createdAt: number;
};

export type Visit = {
  id: string;
  projectId: string;
  date: string; // ISO date string, e.g. "2026-08-15"
  createdAt: number;
};

export type Photo = {
  id: string;
  parentId: string; // visitId for progress photos, or EVENT_GALLERY_ID
  dataUrl: string; // permanent hosted URL of the photo (name kept for compatibility with existing UI)
  name: string;
  createdAt: number;
};

type Manifest = {
  projects: Project[];
  visits: Visit[];
  photos: Photo[];
};

export const EVENT_GALLERY_ID = "event-gallery";

const MANIFEST_PATH = "data/manifest.json";

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

async function readManifest(): Promise<Manifest> {
  const { blobs } = await list({ prefix: MANIFEST_PATH, limit: 1 });
  if (blobs.length === 0) {
    return { projects: [], visits: [], photos: [] };
  }
  const res = await fetch(blobs[0].url, { cache: "no-store" });
  if (!res.ok) return { projects: [], visits: [], photos: [] };
  return res.json();
}

async function writeManifest(manifest: Manifest): Promise<void> {
  await put(MANIFEST_PATH, JSON.stringify(manifest), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

// ---------- Projects ----------

export async function getProjects(): Promise<Project[]> {
  const m = await readManifest();
  return m.projects.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getProject(id: string): Promise<Project | undefined> {
  const m = await readManifest();
  return m.projects.find((p) => p.id === id);
}

export async function addProject(name: string): Promise<Project> {
  const m = await readManifest();
  const project: Project = { id: newId(), name, createdAt: Date.now() };
  m.projects.push(project);
  await writeManifest(m);
  return project;
}

export async function deleteProject(id: string): Promise<void> {
  const m = await readManifest();
  const visitIds = m.visits.filter((v) => v.projectId === id).map((v) => v.id);
  const photosToDelete = m.photos.filter((p) => visitIds.includes(p.parentId));

  await Promise.all(photosToDelete.map((p) => del(p.dataUrl)));

  m.projects = m.projects.filter((p) => p.id !== id);
  m.visits = m.visits.filter((v) => v.projectId !== id);
  m.photos = m.photos.filter((p) => !visitIds.includes(p.parentId));
  await writeManifest(m);
}

// ---------- Visits ----------

export async function getVisits(projectId: string): Promise<Visit[]> {
  const m = await readManifest();
  return m.visits
    .filter((v) => v.projectId === projectId)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function getVisit(id: string): Promise<Visit | undefined> {
  const m = await readManifest();
  return m.visits.find((v) => v.id === id);
}

export async function addVisit(projectId: string, date: string): Promise<Visit> {
  const m = await readManifest();
  const visit: Visit = { id: newId(), projectId, date, createdAt: Date.now() };
  m.visits.push(visit);
  await writeManifest(m);
  return visit;
}

export async function deleteVisit(id: string): Promise<void> {
  const m = await readManifest();
  const photosToDelete = m.photos.filter((p) => p.parentId === id);
  await Promise.all(photosToDelete.map((p) => del(p.dataUrl)));

  m.visits = m.visits.filter((v) => v.id !== id);
  m.photos = m.photos.filter((p) => p.parentId !== id);
  await writeManifest(m);
}

// ---------- Photos ----------

export async function getPhotos(parentId: string): Promise<Photo[]> {
  const m = await readManifest();
  return m.photos
    .filter((p) => p.parentId === parentId)
    .sort((a, b) => a.createdAt - b.createdAt);
}

export async function addPhoto(
  parentId: string,
  file: File
): Promise<Photo> {
  const blob = await put(`photos/${newId()}-${file.name}`, file, {
    access: "public",
  });
  const m = await readManifest();
  const photo: Photo = {
    id: newId(),
    parentId,
    dataUrl: blob.url,
    name: file.name,
    createdAt: Date.now(),
  };
  m.photos.push(photo);
  await writeManifest(m);
  return photo;
}

export async function deletePhoto(id: string): Promise<void> {
  const m = await readManifest();
  const photo = m.photos.find((p) => p.id === id);
  if (!photo) return;
  await del(photo.dataUrl);
  m.photos = m.photos.filter((p) => p.id !== id);
  await writeManifest(m);
}
