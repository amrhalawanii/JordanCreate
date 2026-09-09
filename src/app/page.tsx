import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* Remaining home sections (Get to know us, Numbers, Speakers strip,
            Pillars, Gallery, FinalCTA, FAQ) land in Phase 3, built and
            verified section by section against the Phase 0 reference. */}
      </main>
      <Footer />
    </>
  );
}
