import Image from "next/image";
import { getFinalCta } from "@/content/repository";

export async function FinalCTA() {
  const cta = await getFinalCta();

  return (
    <section className="relative overflow-hidden bg-canvas-deep px-5 py-24 text-center md:px-10">
      <div className="absolute inset-0">
        <Image
          src={cta.backgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas-deep via-canvas-deep/70 to-canvas-deep/40" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center gap-6">
        <h2 className="font-display text-[36px] italic leading-tight text-text-primary uppercase">
          {cta.heading}
        </h2>
        <p className="font-body text-sm leading-relaxed text-text-gray-light">{cta.body}</p>
        <a
          href={cta.cta.href}
          target="_blank"
          rel="noreferrer"
          className="rounded-(--radius-pill-lg) bg-brand-orange px-8 py-3 font-label text-xs font-medium uppercase tracking-wide text-on-orange transition-colors duration-100 ease-[cubic-bezier(0,0,1,1)] hover:bg-brand-orange-hot"
        >
          {cta.cta.label}
        </a>
      </div>
    </section>
  );
}
