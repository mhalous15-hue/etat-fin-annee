import { NextRequest, NextResponse } from "next/server";
import { getVisit, deleteVisit } from "@/lib/blob-store";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { visitId: string } }
) {
  try {
    const visit = await getVisit(params.visitId);
    if (!visit) {
      return NextResponse.json({ error: "Visite introuvable." }, { status: 404 });
    }
    return NextResponse.json(visit);
  } catch (err) {
    console.error("GET /api/visits/[visitId] failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur serveur inconnue." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { visitId: string } }
) {
  try {
    await deleteVisit(params.visitId);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/visits/[visitId] failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur serveur inconnue." },
      { status: 500 }
    );
  }
}
