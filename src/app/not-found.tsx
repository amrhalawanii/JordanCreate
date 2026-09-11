import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GradientButton } from "@/components/shared/GradientButton";
import { getNotFoundContent } from "@/content/repository";

export default async function NotFound() {
  const content = await getNotFoundContent();

  return (
    <>
      <Header />
      <main id="main-content" className="flex min-h-[60vh] flex-col items-center justify-center gap-6 bg-canvas px-5 py-24 text-center md:px-10">
        <h1 className="max-w-xl font-display text-[32px] italic leading-tight text-text-primary uppercase sm:text-[48px]">
          {content.heading}
        </h1>
        <p className="max-w-md font-body text-base text-text-gray-light sm:text-lg">{content.sub}</p>
        <GradientButton href={content.cta.href} external={false} className="px-8 py-3">
          {content.cta.label}
        </GradientButton>
      </main>
      <Footer />
    </>
  );
}
