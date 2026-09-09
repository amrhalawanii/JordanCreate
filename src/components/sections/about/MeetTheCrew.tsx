import Image from "next/image";
import { getTeamMembers, getMeetTheCrewIntro } from "@/content/repository";

export async function MeetTheCrew() {
  const [team, intro] = await Promise.all([getTeamMembers(), getMeetTheCrewIntro()]);

  return (
    <section className="bg-canvas px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-(--container-primary)">
        <p className="font-label text-xs uppercase tracking-wide text-brand-orange">
          {intro.eyebrow}
        </p>
        <h2 className="mt-3 max-w-lg font-display text-[36px] italic leading-tight text-text-primary uppercase sm:text-[48px]">
          {intro.heading}
        </h2>
        <p className="mt-3 max-w-md font-body text-sm text-text-gray-light">{intro.sub}</p>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {team.map((member) => (
            <a
              key={member.id}
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
                <p className="font-label text-sm font-medium text-text-primary">{member.name}</p>
                <p className="font-label text-xs text-text-gray-light">{member.role}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
