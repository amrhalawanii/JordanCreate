import type { CTA } from "../schemas/nav";

// Home page intro block ("One of the largest Creator Economy events").
export const introBlock = {
  heading: "One of the largest Creator Economy events",
  paras: [
    "Jordan Create brings together content creators, artists, musicians, marketers, brands, and platforms into one experience focused on learning, networking, and collaboration. It takes place annually in Jordan, and it exists because Jordan's creative people never had one place to come together.",
    "Jordan Create is that place.",
  ],
  cta: { label: "Count Me In", href: "https://tally.so/r/2EyNej" } satisfies CTA,
};

// Shared "Don't hear about it. Be in the room." CTA band, reused on every page.
export const finalCta = {
  heading: "Don't hear about it. Be in the room.",
  body: "Last year, people left saying it changed how they think about creating. The biggest creators in the region were in that room. This year will be bigger, louder, and harder to get into.",
  cta: { label: "Count Me In", href: "https://tally.so/r/kdK1Lj" } satisfies CTA,
  backgroundImage: "/assets/cta/room-background.png",
};

// About Us — "Our story" (live: text-only split + scroll color reveal)
export const ourStory = {
  eyebrow: "OUR STORY",
  body: "Creators, agencies, and brands were operating in parallel universes. No central hub. Visibility without access. Energy without continuity. Jordan Create changed that.",
  highlightSuffix: "changed that.",
  closingLine: "Jordan's creative community finally had a home",
};

// About Us — Mission / Vision / Value (live layout: mission text-only,
// vision image-left, value image-right — two distinct photos)
export const missionVisionValue = [
  {
    id: "mission",
    heading: "MISSION",
    eyebrow: "MORE ABOUT US",
    body: "Jordan Create is a platform built to help creative people get better at what they do. We gather the best minds from creators and marketers to business owners to share what works, collaborate, and expand their networks.",
    layout: "text-only" as const,
    image: undefined as string | undefined,
  },
  {
    id: "vision",
    heading: "VISION",
    body: "We are more than a talk or a panel. We are an experience where you get the inspiration, the education, the opportunities, and the connections you need to take your work to the next level.",
    layout: "image-left" as const,
    image: "/assets/about/vision.jpg",
  },
  {
    id: "value",
    heading: "VALUE",
    body: "Jordan Create is the home of Jordan's creative community the place where creators, marketers, business owners, and tech leaders meet to turn big ideas into reality. This is where the next big projects, partnerships, and trends start.",
    layout: "image-right" as const,
    image: "/assets/about/value.jpg",
  },
].map((b) => ({
  ...b,
  cta: { label: "Join Us", href: "https://tally.so/r/kdK1Lj" } satisfies CTA,
}));

// About Us — team section intro copy
export const meetTheCrewIntro = {
  eyebrow: "JORDAN CREATE TEAM",
  heading: "MEET THE CREW",
  sub: "The people behind the event, the community, and everything in between. We're a small team that builds big rooms.",
};

// Partner with us — "WHO YOU'RE REACHING"
export const whoYoureReaching = {
  eyebrow: "WHO YOU'RE REACHING",
  heading: "YOUR BRAND. THEIR WORLD",
};

// Partner with us — "WHAT PARTNERS GET"
export const whatPartnersGet = {
  eyebrow: "WHAT PARTNERS GET",
  headingLine1: "NOT A PACKAGE A PLATFORM",
  headingLine2: "BE PART OF THE MOVEMENT",
};

// Agenda page — schedule section header. "LAST SET" is the highlighted
// (orange) portion of the heading on the live site; the component splits it
// out directly, same as every other partial-color heading on this site
// (there's no highlight-span concept in the content model).
export const agendaIntro = {
  eyebrow: "AGENDA",
  headingLine1: "FROM THE FIRST SPEAKER",
  headingLine2Plain: "TO THE ",
  headingLine2Highlight: "LAST SET",
  sub: "From the first session to the last toast, every pillar, every speaker, every moment mapped out so you never miss what matters.",
};

// Partner with us — "IMPACT"
export const partnerImpact = {
  eyebrow: "IMPACT",
  heading: "THE LARGEST CREATORS AUDIENCE IN JORDAN",
  sub: "Direct access to 350+ creators, marketers, and brands, plus a community that stays active year-round.",
  video: "/assets/partners/impact-loop.mp4",
  mediaCaption: "Shared Their Expertise",
};

// 404 page
export const notFoundContent = {
  heading: "PAGE IS LOCKED",
  sub: "SEE YOU IN NOVEMBER!",
  cta: { label: "RETURN HOME", href: "/" } satisfies CTA,
};
