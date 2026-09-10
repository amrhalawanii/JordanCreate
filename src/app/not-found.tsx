import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getNotFoundContent } from "@/content/repository";

export default async function NotFound() {
  const content = await getNotFoundContent();

  return (
    <>
      <Header />
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 bg-canvas px-5 py-24 text-center">
        <h1 className="font-display text-[36px] italic leading-tight text-text-primary uppercase sm:text-[48px]">
          {content.heading}
        </h1>
        <p className="font-body text-base text-text-gray-light">{content.sub}</p>
        <Link
          href={content.cta.href}
          style={{ backgroundImage: "var(--gradient-brand-orange)" }}
          className="inline-flex items-center justify-center rounded-(--radius-pill-lg) border-2 border-white/20 px-8 py-3 font-body text-base font-medium leading-[1.2] text-on-orange transition-transform duration-150 hover:scale-[1.02]"
        >
          {content.cta.label}
        </Link>
      </main>
      <Footer />
    </>
  );
}
