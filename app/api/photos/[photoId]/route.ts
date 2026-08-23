import { NextRequest, NextResponse } from "next/server";
import { deletePhoto } from "@/lib/blob-store";

export const dynamic = "force-dynamic";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { photoId: string } }
) {
  await deletePhoto(params.photoId);
  return NextResponse.json({ success: true });
}
