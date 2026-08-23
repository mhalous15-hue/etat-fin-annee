"use client";

import type { Project, Visit, Photo } from "@/lib/blob-store";

export type { Project, Visit, Photo };

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Erreur ${res.status}`);
  }
  return res.json();
}

// ---------- Projects ----------

export async function getProjects(): Promise<Project[]> {
  return json(await fetch("/api/projects", { cache: "no-store" }));
}

export async function getProject(id: string): Promise<Project | undefined> {
  const res = await fetch(`/api/projects/${id}`, { cache: "no-store" });
  if (res.status === 404) return undefined;
  return json(res);
}

export async function addProject(name: string): Promise<Project> {
  return json(
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
  );
}

export async function deleteProject(id: string): Promise<void> {
  await fetch(`/api/projects/${id}`, { method: "DELETE" });
}

// ---------- Visits ----------

export async function getVisits(projectId: string): Promise<Visit[]> {
  return json(await fetch(`/api/projects/${projectId}/visits`, { cache: "no-store" }));
}

export async function getVisit(id: string): Promise<Visit | undefined> {
  const res = await fetch(`/api/visits/${id}`, { cache: "no-store" });
  if (res.status === 404) return undefined;
  return json(res);
}

export async function addVisit(projectId: string, date: string): Promise<Visit> {
  return json(
    await fetch(`/api/projects/${projectId}/visits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date }),
    })
  );
}

export async function deleteVisit(id: string): Promise<void> {
  await fetch(`/api/visits/${id}`, { method: "DELETE" });
}

// ---------- Photos ----------

export async function getPhotos(parentId: string): Promise<Photo[]> {
  return json(
    await fetch(`/api/photos?parentId=${encodeURIComponent(parentId)}`, {
      cache: "no-store",
    })
  );
}

export async function addPhotos(parentId: string, files: FileList | File[]): Promise<Photo[]> {
  const formData = new FormData();
  formData.append("parentId", parentId);
  Array.from(files).forEach((file) => formData.append("files", file));
  return json(await fetch("/api/photos", { method: "POST", body: formData }));
}

export async function deletePhoto(id: string): Promise<void> {
  await fetch(`/api/photos/${id}`, { method: "DELETE" });
}

export const EVENT_GALLERY_ID = "event-gallery";
