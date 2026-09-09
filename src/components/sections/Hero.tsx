import Image from "next/image";
import { getHomeHero } from "@/content/repository";

export async function Hero() {
  const hero = await getHomeHero();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-canvas-deeper px-5 text-center"
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-70">
        <Image
          src="/assets/hero/home-hero.png"
          alt=""
          width={840}
          height={1014}
          priority
          className="h-full max-h-[900px] w-auto object-contain"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <h1 className="font-display text-[56px] leading-none font-normal uppercase text-text-primary sm:text-[66px]">
          {hero.heading}
        </h1>
        <p className="max-w-md font-body text-[17px] leading-snug text-text-primary">
          {hero.subheading}
        </p>
        <a
          href={hero.cta.href}
          target="_blank"
          rel="noreferrer"
          className="rounded-(--radius-pill-lg) bg-brand-orange px-8 py-3 font-label text-xs font-medium uppercase tracking-wide text-on-orange transition-colors duration-100 ease-[cubic-bezier(0,0,1,1)] hover:bg-brand-orange-hot"
        >
          {hero.cta.label}
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-label text-xs uppercase tracking-wide text-brand-orange">
        {hero.scrollHint}
      </div>
    </section>
  );
}
