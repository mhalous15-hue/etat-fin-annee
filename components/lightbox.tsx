"use client";

import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import type { Photo } from "@/lib/api-client";

export function Lightbox({
  photos,
  index,
  onClose,
  onIndexChange,
  onDelete,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  onDelete?: (photo: Photo) => void;
}) {
  const photo = photos[index];

  const goPrev = useCallback(() => {
    onIndexChange((index - 1 + photos.length) % photos.length);
  }, [index, photos.length, onIndexChange]);

  const goNext = useCallback(() => {
    onIndexChange((index + 1) % photos.length);
  }, [index, photos.length, onIndexChange]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary/95 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        aria-label="Fermer"
        onClick={onClose}
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-ink hover:border-accent hover:text-accent"
      >
        <X size={20} />
      </button>

      {onDelete && (
        <button
          aria-label="Supprimer la photo"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(photo);
          }}
          className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-ink hover:border-accent hover:text-accent"
        >
          <Trash2 size={18} />
        </button>
      )}

      {photos.length > 1 && (
        <button
          aria-label="Photo précédente"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 text-ink hover:border-accent hover:text-accent sm:left-8"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      <img
        src={photo.dataUrl}
        alt={photo.name}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[92vw] rounded-lg object-contain shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
      />

      {photos.length > 1 && (
        <button
          aria-label="Photo suivante"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 text-ink hover:border-accent hover:text-accent sm:right-8"
        >
          <ChevronRight size={22} />
        </button>
      )}

      <p className="mt-4 text-xs uppercase tracking-widest2 text-muted">
        {index + 1} / {photos.length}
      </p>
    </div>
  );
}
