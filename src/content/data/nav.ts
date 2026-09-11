import type { NavItem, SiteSettings } from "../schemas/nav";

// Desktop nav. The live site added a genuine, distinct /agenda page after
// Phase 0 extraction — "AGENDA" pointing at /speakers was a documented dup
// at the time, but is no longer accurate and is fixed here.
export const desktopNavItems: NavItem[] = [
  { id: "home", label: "Home", href: "/", order: 0 },
  { id: "agenda", label: "AGENDA", href: "/agenda", order: 1 },
  { id: "speakers", label: "Speakers", href: "/speakers", order: 2 },
  { id: "partner", label: "Partner with Us", href: "/partner-with-us", order: 3 },
  { id: "about", label: "About Us", href: "/about-us", order: 4 },
];

// Mobile overlay menu — note the live site labels this item "For Partners"
// here even though the desktop nav and footer both say "Partner with Us" /
// "Partner With Us" for the same link. Replicated deliberately.
export const mobileNavItems: NavItem[] = [
  { id: "home", label: "Home", href: "/", order: 0 },
  { id: "agenda", label: "AGENDA", href: "/agenda", order: 1 },
  { id: "speakers", label: "Speakers", href: "/speakers", order: 2 },
  { id: "partner", label: "For Partners", href: "/partner-with-us", order: 3 },
  { id: "about", label: "About Us", href: "/about-us", order: 4 },
  { id: "contact", label: "Contact Us", href: "https://tally.so/r/kdK1Lj", order: 5 },
];

export const footerNavItems: NavItem[] = [
  { id: "home", label: "Home", href: "/", order: 0 },
  { id: "agenda", label: "Agenda", href: "/agenda", order: 1 },
  { id: "speakers", label: "Speakers", href: "/speakers", order: 2 },
  { id: "partner", label: "Partner With Us", href: "/partner-with-us", order: 3 },
  { id: "about", label: "About Us", href: "/about-us", order: 4 },
  { id: "contact", label: "Contact Us", href: "https://tally.so/r/kdK1Lj", order: 5 },
];

export const siteSettings: SiteSettings = {
  siteName: "Jordan Create",
  tagline: "A collision of art, sound & bold ideas.",
  instagramUrl: "https://www.instagram.com/jordancreateofficial/",
  contactCta: { label: "Contact us", href: "https://tally.so/r/kdK1Lj" },
};
