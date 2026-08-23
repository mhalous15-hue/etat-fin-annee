import { NextRequest, NextResponse } from "next/server";
import { getVisits, addVisit } from "@/lib/blob-store";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  const visits = await getVisits(params.projectId);
  return NextResponse.json(visits);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  const { date } = await req.json();
  if (!date || typeof date !== "string") {
    return NextResponse.json({ error: "Date requise." }, { status: 400 });
  }
  const visit = await addVisit(params.projectId, date);
  return NextResponse.json(visit, { status: 201 });
}
