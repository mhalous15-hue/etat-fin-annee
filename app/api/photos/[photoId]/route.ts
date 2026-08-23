import { NextRequest, NextResponse } from "next/server";
import { deletePhoto } from "@/lib/blob-store";

export const dynamic = "force-dynamic";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { photoId: string } }
) {
  try {
    await deletePhoto(params.photoId);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/photos/[photoId] failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur serveur inconnue." },
      { status: 500 }
    );
  }
}
