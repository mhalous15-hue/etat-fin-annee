import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ServicesDetail } from "@/components/services-detail";
import { Marques } from "@/components/marques";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ServicesDetail />
      <Marques />
      <Contact />
      <Footer />
    </main>
  );
}
