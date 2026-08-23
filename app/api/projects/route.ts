import { NextRequest, NextResponse } from "next/server";
import { getProjects, addProject } from "@/lib/blob-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  if (!name || typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Nom de projet requis." }, { status: 400 });
  }
  const project = await addProject(name.trim());
  return NextResponse.json(project, { status: 201 });
}
