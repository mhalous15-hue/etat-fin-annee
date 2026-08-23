import { NextRequest, NextResponse } from "next/server";
import { getVisit, deleteVisit } from "@/lib/blob-store";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { visitId: string } }
) {
  const visit = await getVisit(params.visitId);
  if (!visit) {
    return NextResponse.json({ error: "Visite introuvable." }, { status: 404 });
  }
  return NextResponse.json(visit);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { visitId: string } }
) {
  await deleteVisit(params.visitId);
  return NextResponse.json({ success: true });
}
