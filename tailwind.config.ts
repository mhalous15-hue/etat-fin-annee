import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Core palette — pulled 1:1 from the design brief.
        primary: "#0D0D0D", // page background
        secondary: "#171717", // alternate section background
        accent: "#E63946", // signal red — CTAs, highlights, active states
        ink: "#FFFFFF", // primary text on dark
        muted: "#A0A0A0", // secondary / supporting text
        card: "#1B1B1B", // elevated surfaces (project cards, panels)
        // Real brand colors lifted from the actual projects inside the
        // portfolio — used sparingly as accent chips so the site itself
        // tells the story of the work.
        ferma: "#3A7739",
        kech: "#F8EA4C",
      },
      fontFamily: {
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        eyebrow: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        widest2: "0.35em",
      },
      backgroundImage: {
        "noise": "url('/images/noise.svg')",
        "radial-fade":
          "radial-gradient(circle at 50% 0%, rgba(230,57,70,0.15), transparent 60%)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.97)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        blob: "blob 14s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
