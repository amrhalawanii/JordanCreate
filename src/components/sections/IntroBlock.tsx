import { getIntroBlock } from "@/content/repository";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { GradientButton } from "@/components/shared/GradientButton";

// The master prompt's spec calls "One of the largest Creator Economy
// events" the section's "heading", but the live site's computed styles
// show it rendered as a small eyebrow-style caption (Inter 14px, gray) —
// the real visual emphasis in this section is the Host Grotesk 20px prose
// below it, not this line. Rebuilt to match the live rendering rather than
// the master prompt's paraphrase.
export async function IntroBlock() {
  const intro = await getIntroBlock();

  return (
    <section className="bg-canvas px-5 py-16 md:px-10">
      <Reveal className="mx-auto flex max-w-(--container-primary) flex-col items-center gap-6 text-center">
        <Eyebrow>{intro.heading}</Eyebrow>
        <div className="flex max-w-2xl flex-col gap-3">
          {intro.paras.map((p, i) => (
            <p key={i} className="font-body text-xl leading-[1.2] text-text-primary">
              {p}
            </p>
          ))}
        </div>
        <GradientButton href={intro.cta.href}>{intro.cta.label}</GradientButton>
      </Reveal>
    </section>
  );
}
