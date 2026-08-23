import { NextRequest, NextResponse } from "next/server";
import { getVisits, addVisit } from "@/lib/blob-store";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const visits = await getVisits(params.projectId);
    return NextResponse.json(visits);
  } catch (err) {
    console.error("GET visits failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur serveur inconnue." },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { date } = await req.json();
    if (!date || typeof date !== "string") {
      return NextResponse.json({ error: "Date requise." }, { status: 400 });
    }
    const visit = await addVisit(params.projectId, date);
    return NextResponse.json(visit, { status: 201 });
  } catch (err) {
    console.error("POST visits failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur serveur inconnue." },
      { status: 500 }
    );
  }
}
