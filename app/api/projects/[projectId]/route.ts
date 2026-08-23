import { NextRequest, NextResponse } from "next/server";
import { getProject, deleteProject } from "@/lib/blob-store";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const project = await getProject(params.projectId);
    if (!project) {
      return NextResponse.json({ error: "Projet introuvable." }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (err) {
    console.error("GET /api/projects/[projectId] failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur serveur inconnue." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    await deleteProject(params.projectId);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/projects/[projectId] failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur serveur inconnue." },
      { status: 500 }
    );
  }
}
