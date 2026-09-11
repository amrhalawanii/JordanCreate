import Image from "next/image";
import { getTeamMembers, getMeetTheCrewIntro } from "@/content/repository";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";

export async function MeetTheCrew() {
  const [team, intro] = await Promise.all([getTeamMembers(), getMeetTheCrewIntro()]);
  const words = intro.heading.split(" ");
  const lastWord = words.at(-1);
  const leadWords = words.slice(0, -1).join(" ");

  return (
    <section className="section-shell bg-canvas">
      <div className="mx-auto max-w-(--container-primary)">
        <Reveal>
          <Eyebrow>{intro.eyebrow}</Eyebrow>
          {/* "CREW" is a 50%-opacity fade on the live site, not a color
              change (confirmed via computed styles) — different treatment
              from the orange-highlight headings elsewhere on the site. */}
          <h2 className="mt-3 max-w-lg font-display text-[40px] italic leading-[1] tracking-[-0.8px] text-text-primary uppercase sm:text-[56px] sm:tracking-[-1.12px]">
            {leadWords} <span className="opacity-50">{lastWord}</span>
          </h2>
          <p className="mt-3 max-w-md font-body text-xl leading-[1.6] tracking-[-0.4px] text-text-gray-light">
            {intro.sub}
          </p>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {team.map((member) => (
            <StaggerItem key={member.id}>
              <a
                href={`https://instagram.com/${member.instagramHandle}`}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col gap-3"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-(--radius-media) bg-surface">
                  <Image
                    src={member.portrait}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div>
                  <p className="font-display text-xl italic leading-[1.6] tracking-[-0.6px] text-text-primary transition-colors duration-150 group-hover:text-brand-orange">
                    {member.name}
                  </p>
                  <p className="font-body text-base leading-[1.4] text-text-gray-light">
                    {member.role}
                  </p>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
