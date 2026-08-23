"use client";

import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-page flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="font-eyebrow text-sm tracking-widest2 text-muted">
          © {new Date().getFullYear()} {profile.name}. Tous droits réservés.
        </p>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Retour en haut"
          className="group flex items-center gap-2 font-eyebrow text-sm tracking-widest2 text-muted transition-colors hover:text-ink"
        >
          Retour en haut
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-accent group-hover:text-accent">
            <ArrowUp size={14} />
          </span>
        </button>
      </div>
    </footer>
  );
}
