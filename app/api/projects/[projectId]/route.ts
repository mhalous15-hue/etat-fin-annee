import { NextRequest, NextResponse } from "next/server";
import { getProject, deleteProject } from "@/lib/blob-store";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  const project = await getProject(params.projectId);
  if (!project) {
    return NextResponse.json({ error: "Projet introuvable." }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  await deleteProject(params.projectId);
  return NextResponse.json({ success: true });
}
