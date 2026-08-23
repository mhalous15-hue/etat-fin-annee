import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { brands } from "@/lib/data";

export function Marques() {
  const marqueeItems = [...brands, ...brands]; // dupliqué pour un défilement continu

  return (
    <section id="marques" className="relative py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          eyebrow="Collaborations"
          title="Marques"
          description="Les entreprises et projets avec lesquels j'ai travaillé cette année."
        />
      </div>

      <div className="relative mt-14 overflow-hidden border-y border-white/10 bg-secondary py-6">
        <div className="flex w-max animate-marquee items-center gap-16">
          {marqueeItems.map((b, i) => (
            <span
              key={`${b.name}-${i}`}
              className="flex items-center gap-4 font-display text-2xl tracking-tightest text-muted/60 sm:text-3xl"
            >
              {b.name}
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: b.color }}
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
      </div>

      <div className="container-page mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((b, i) => (
          <Reveal key={b.name} delay={i * 0.06}>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-card p-6">
              <div>
                <p className="font-display text-xl tracking-tightest text-ink">
                  {b.name}
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest2 text-muted">
                  {b.category}
                </p>
              </div>
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: b.color }}
                aria-hidden="true"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
