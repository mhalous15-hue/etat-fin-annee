import { NextRequest, NextResponse } from "next/server";
import { getPhotos, addPhoto } from "@/lib/blob-store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const parentId = req.nextUrl.searchParams.get("parentId");
    if (!parentId) {
      return NextResponse.json({ error: "parentId requis." }, { status: 400 });
    }
    const photos = await getPhotos(parentId);
    return NextResponse.json(photos);
  } catch (err) {
    console.error("GET /api/photos failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur serveur inconnue." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const parentId = formData.get("parentId");
    const files = formData.getAll("files") as File[];

    if (!parentId || typeof parentId !== "string") {
      return NextResponse.json({ error: "parentId requis." }, { status: 400 });
    }
    if (!files || files.length === 0) {
      return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
    }

    const photos = await Promise.all(files.map((file) => addPhoto(parentId, file)));
    return NextResponse.json(photos, { status: 201 });
  } catch (err) {
    console.error("POST /api/photos failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur serveur inconnue." },
      { status: 500 }
    );
  }
}
