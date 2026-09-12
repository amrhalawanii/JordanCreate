import Image from "next/image";
import { getFinalCta } from "@/content/repository";
import { GradientButton } from "./GradientButton";

/**
 * Shared closing CTA band. Background matched to live `#final-cta`:
 * full-opacity cityscape + bottom fade overlay (not a flat dark wash).
 * No scroll-reveal wrapper — tall-page IO was leaving this at opacity 0.
 */
export async function FinalCTA() {
  const cta = await getFinalCta();

  return (
    <section className="section-shell bg-canvas">
      <div className="relative mx-auto max-w-(--container-primary) overflow-hidden rounded-(--radius-media) border border-white/10">
        <div className="absolute inset-0">
          <Image
            src={cta.backgroundImage}
            alt=""
            fill
            sizes="(min-width: 1128px) 1128px, 100vw"
            className="object-cover"
          />
          {/* Live Framer Overlay: transparent → 50% black from 42% down */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0) 42%, rgba(0, 0, 0, 0.5) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 flex max-w-lg flex-col items-start gap-6 p-8 sm:p-12">
          <h2 className="font-display text-[28px] leading-[1.1] tracking-[-0.84px] text-text-primary sm:text-[36px] sm:tracking-[-1.08px]">
            {cta.heading}
          </h2>
          <p className="font-body text-base leading-[1.2] text-text-primary">{cta.body}</p>
          <GradientButton href={cta.cta.href}>{cta.cta.label}</GradientButton>
        </div>
      </div>
    </section>
  );
}
