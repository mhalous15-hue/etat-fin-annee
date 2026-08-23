import { NextRequest, NextResponse } from "next/server";
import { getProjects, addProject } from "@/lib/blob-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (err) {
    console.error("GET /api/projects failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur serveur inconnue." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Nom de projet requis." }, { status: 400 });
    }
    const project = await addProject(name.trim());
    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    console.error("POST /api/projects failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur serveur inconnue." },
      { status: 500 }
    );
  }
}
