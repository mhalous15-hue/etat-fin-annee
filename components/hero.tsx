"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Palette, Camera, Aperture, ArrowDown, type LucideIcon } from "lucide-react";
import { profile, services, stats, type ServiceIcon, type Service } from "@/lib/data";

const ICONS: Record<ServiceIcon, LucideIcon> = {
  design: Palette,
  progress: Camera,
  event: Aperture,
};

// Fixed orbit positions around the portrait — top, bottom-left, bottom-right.
const ORBIT_POSITION: Record<ServiceIcon, string> = {
  design: "-top-4 left-1/2 -translate-x-1/2 sm:-top-6",
  progress: "bottom-6 -left-4 sm:bottom-10 sm:-left-8",
  event: "bottom-6 -right-4 sm:bottom-10 sm:-right-8",
};

export function Hero() {
  const router = useRouter();

  function goToService(service: Service) {
    if (service.linkType === "anchor") {
      document.querySelector(service.href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(service.href);
    }
  }

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24"
    >
      {/* Oversized bleeding background wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 select-none text-center"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-b from-accent via-[#8a1620] to-transparent bg-clip-text font-display leading-[0.88] tracking-tightest text-transparent text-[13vw] sm:text-[9vw] lg:text-[7.5vw]"
        >
          ÉTAT DE FIN
          <br />
          D&apos;ANNÉE
        </motion.h1>
      </div>

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-lg text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-eyebrow text-sm tracking-widest2 text-accent uppercase"
          >
            Rapport d&apos;activité
          </motion.span>

          {/* Circular portrait with orbiting service icons */}
          <div className="relative mx-auto mt-8 h-56 w-56 sm:h-64 sm:w-64">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full overflow-hidden rounded-full border-2 border-accent/40 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)]"
            >
              <Image
                src="/images/portrait.jpg"
                alt={`Portrait de ${profile.name}`}
                fill
                priority
                sizes="16rem"
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
            </motion.div>

            {/* Orbiting service icons */}
            {services.map((service, i) => {
              const Icon = ICONS[service.icon];
              return (
                <motion.button
                  key={service.id}
                  type="button"
                  onClick={() => goToService(service)}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Aller à la section ${service.title}`}
                  className={`group absolute ${ORBIT_POSITION[service.icon]} flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-card/90 text-ink backdrop-blur transition-colors hover:border-accent hover:text-accent sm:h-16 sm:w-16`}
                >
                  <Icon size={22} />
                  <span className="pointer-events-none absolute -bottom-7 left-1/2 w-max -translate-x-1/2 rounded-full bg-primary/90 px-3 py-1 text-[10px] uppercase tracking-widest2 text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {service.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-10 font-display text-4xl leading-[0.95] tracking-tightest text-ink sm:text-5xl"
          >
            {profile.name}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.7 }}
            className="mt-2 font-eyebrow text-base tracking-widest2 text-accent uppercase"
          >
            {profile.role}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.56, duration: 0.7 }}
            className="mt-3 text-sm text-muted"
          >
            Touchez une icône pour voir le détail de chaque activité.
          </motion.p>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="relative z-10 mx-auto mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl text-ink sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest2 text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted"
      >
        <ArrowDown size={20} />
      </motion.div>
    </section>
  );
}
