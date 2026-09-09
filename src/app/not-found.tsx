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
          className="rounded-(--radius-pill-lg) bg-brand-orange px-8 py-3 font-label text-xs font-medium uppercase tracking-wide text-on-orange transition-colors duration-100 ease-[cubic-bezier(0,0,1,1)] hover:bg-brand-orange-hot"
        >
          {content.cta.label}
        </Link>
      </main>
      <Footer />
    </>
  );
}
