import type { PageHero } from "../schemas/tab";

export const speakersHero: PageHero = {
  id: "speakers-hero",
  heading: "SPEAKERS",
  headingSizeDesktop: 166,
  subheading: "Built for people who move Jordan's creative industry forward",
  cta: { label: "Count Me In", href: "https://tally.so/r/pbR6xP" },
  backgroundImage: "/assets/about/page-hero-bg.png",
};

export const partnerHero: PageHero = {
  id: "partner-hero",
  heading: "PARTNER WITH US",
  headingSizeDesktop: 100,
  subheading: "We're building the biggest creator gathering in Jordan. You should be in it.",
  backgroundImage: "/assets/about/page-hero-bg.png",
};

export const aboutHero: PageHero = {
  id: "about-hero",
  heading: "About Us",
  headingSizeDesktop: 166,
  subheading: "",
  backgroundImage: "/assets/about/page-hero-bg.png",
};

// Same background image as the other three page heroes (confirmed: identical
// bytes, md5-verified against the live /agenda page's own hero image URL —
// Framer just re-hosts it under a different hash there). No subheading/CTA
// on this hero; the live page puts its subcopy in the section header below.
export const agendaHero: PageHero = {
  id: "agenda-hero",
  heading: "AGENDA",
  headingSizeDesktop: 100,
  subheading: "",
  backgroundImage: "/assets/about/page-hero-bg.png",
};
