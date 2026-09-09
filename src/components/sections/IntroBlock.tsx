import { getIntroBlock } from "@/content/repository";
import { Reveal } from "@/components/shared/Reveal";

export async function IntroBlock() {
  const intro = await getIntroBlock();

  return (
    <section className="bg-canvas px-5 py-16 md:px-10">
      <Reveal className="mx-auto flex max-w-(--container-primary) flex-col items-center gap-6 text-center">
        <h2 className="max-w-2xl font-display text-[28px] italic leading-tight text-text-primary sm:text-[36px]">
          {intro.heading}
        </h2>
        <div className="flex max-w-2xl flex-col gap-3">
          {intro.paras.map((p, i) => (
            <p key={i} className="font-body text-base leading-relaxed text-text-gray-light">
              {p}
            </p>
          ))}
        </div>
        <a
          href={intro.cta.href}
          target="_blank"
          rel="noreferrer"
          className="rounded-(--radius-pill-lg) bg-brand-orange px-8 py-3 font-label text-xs font-medium uppercase tracking-wide text-on-orange transition-colors duration-100 ease-[cubic-bezier(0,0,1,1)] hover:bg-brand-orange-hot"
        >
          {intro.cta.label}
        </a>
      </Reveal>
    </section>
  );
}
