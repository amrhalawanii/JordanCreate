import type { PageHero } from "../schemas/tab";

export const speakersHero: PageHero = {
  id: "speakers-hero",
  heading: "SPEAKERS",
  subheading: "Built for people who move Jordan's creative industry forward",
  cta: { label: "Count Me In", href: "https://tally.so/r/pbR6xP" },
  backgroundImage: "/assets/about/page-hero-bg.png",
};

export const partnerHero: PageHero = {
  id: "partner-hero",
  heading: "PARTNER WITH US",
  subheading: "We're building the biggest creator gathering in Jordan. You should be in it.",
  backgroundImage: "/assets/about/page-hero-bg.png",
};

export const aboutHero: PageHero = {
  id: "about-hero",
  heading: "About Us",
  subheading: "",
  backgroundImage: "/assets/about/page-hero-bg.png",
};
