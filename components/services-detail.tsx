import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowUpRight, Camera, Aperture } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/data";

// Real work images tied to the Design Graphique section — reused from the
// existing portfolio, since that's the only service with confirmed content.
const DESIGN_IMAGES = [
  { src: "/images/atlas-support-physique.jpg", alt: "Supports physiques — Atlas Mountain View" },
  { src: "/images/assafaa-social-media.jpg", alt: "Réseaux sociaux — Assafaa Bayt" },
  { src: "/images/kech-social-media.jpg", alt: "Réseaux sociaux — Kech Fitness" },
];

const designService = services.find((s) => s.id === "graphic-design")!;
const pageServices = services.filter((s) => s.linkType === "page");

const TEASER_ICONS = { progress: Camera, event: Aperture } as const;

export function ServicesDetail() {
  return (
    <section id="services" className="relative bg-secondary py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          eyebrow="Le Détail"
          title="Services"
          description="Chaque icône du portrait renvoie vers l'une de ces trois sections."
        />

        {/* Design Graphique — real content, stays on the homepage */}
        <div className="mt-16 border-t border-white/10 py-16">
          <div id={designService.id}>
            <Reveal>
              <span className="font-display text-6xl leading-none text-transparent text-outline sm:text-7xl">
                01
              </span>
              <h3 className="mt-4 font-display text-4xl leading-[0.95] tracking-tightest text-ink sm:text-5xl">
                {designService.title}
              </h3>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
                {designService.summary}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {designService.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {DESIGN_IMAGES.map((img) => (
                  <div
                    key={img.src}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 640px) 30vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Photos d'Avancement & Event Photography — now dedicated pages */}
        <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-16 sm:grid-cols-2">
          {pageServices.map((service, i) => {
            const Icon = TEASER_ICONS[service.icon as "progress" | "event"];
            return (
              <Reveal key={service.id} delay={i * 0.1}>
                <Link
                  href={service.href}
                  className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-card p-8 transition-colors hover:border-accent"
                >
                  <div>
                    <Icon className="text-accent" size={28} />
                    <h3 className="mt-5 font-display text-2xl tracking-tightest text-ink sm:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {service.summary}
                    </p>
                  </div>
                  <span className="mt-6 flex items-center gap-2 font-eyebrow text-sm tracking-widest2 text-ink uppercase transition-colors group-hover:text-accent">
                    Ouvrir
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
