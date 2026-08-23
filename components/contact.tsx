"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]" />

      <div className="container-page relative">
        <Reveal className="text-center">
          <span className="font-eyebrow text-sm tracking-widest2 text-accent uppercase">
            Contact
          </span>
          <h2 className="mx-auto mt-4 max-w-4xl font-display text-[13vw] leading-[0.85] tracking-tightest text-ink sm:text-[9vw] lg:text-[7vw]">
            Discutons de
            <br />
            Votre Projet
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-muted">
            Pour toute question sur ce rapport ou une collaboration.
          </p>
        </Reveal>

        <div className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-8 border-t border-white/10 pt-10 text-center sm:grid-cols-3">
          <Reveal delay={0.1}>
            <div className="flex flex-col items-center gap-3">
              <Mail className="text-accent" size={20} />
              <a
                href={`mailto:${profile.email}`}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {profile.email}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="flex flex-col items-center gap-3">
              <Phone className="text-accent" size={20} />
              <a
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {profile.phone}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="flex flex-col items-center gap-3">
              <MapPin className="text-accent" size={20} />
              <span className="text-sm text-muted">{profile.location}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
