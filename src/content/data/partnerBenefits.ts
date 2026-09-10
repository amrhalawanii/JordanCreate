import type { PartnerBenefit, ImpactItem } from "../schemas/partnerBenefit";

// "WHAT PARTNERS GET" cards — copy is verbatim, typos included deliberately
// (sesssions, Organioc, Activiations, exerpiences, aross, wiht) per the
// master prompt's replicate-then-log rule. See FIDELITY-NOTES.md.
export const partnerBenefits: PartnerBenefit[] = [
  {
    id: "strong-presence",
    title: "Strong Presence",
    body: "Logo placement, social mentions, and event presence. Your brand in the room where Jordan's creators gather.",
    image: "/assets/partners/strong-presence.jpg",
    order: 0,
  },
  {
    id: "creator-content",
    title: "Creator Content",
    body: "Speaking slots, branded sesssions, and moments that put your message in front of the room.",
    image: "/assets/partners/creator-content.jpg",
    order: 1,
  },
  {
    id: "brand-activations",
    title: "Brand Activiations",
    body: "Organioc content created by attending creators, featuring your brand naturally, not forced.",
    image: "/assets/partners/brand-activations.jpg",
    order: 2,
  },
  {
    id: "digital-visibility",
    title: "Digital Visibility",
    body: "Pre-event, during and post exposure aross all jordan create channels and creator networks",
    image: "/assets/partners/digital-visibility.jpg",
    order: 3,
  },
  {
    id: "digital-access",
    title: "Digital Access",
    body: "Meet creators. Build relationships. Turn a Sponsorship into long term partnership that drive results",
    image: "/assets/partners/digital-access.jpg",
    order: 4,
  },
  {
    id: "exclusive-community",
    title: "Exclusive Community",
    body: "Custom exerpiences on the ground interactive, shareable, designed to make your brand remember",
    image: "/assets/partners/exclusive-community.jpg",
    order: 5,
  },
];

export const impactItems: ImpactItem[] = [
  {
    id: "first-of-its-kind",
    title: "First of Its Kind",
    body: "The first event in Jordan fully dedicated to creators. No event has ever gathered the entire creative ecosystem, creators, marketers, brands, and platforms into one room. This is where it starts.",
    icon: "/assets/partners/impact-icon-1.svg",
    order: 0,
  },
  {
    id: "creative-ecosystem",
    title: "1,000+ From the Creative Ecosystem",
    body: "Not a random crowd. Every person in the room creates, markets, or builds in the digital space. These are the people shaping culture in Jordan and they're all in one place.",
    icon: "/assets/partners/impact-icon-2.svg",
    order: 1,
  },
  {
    id: "movement-not-moment",
    title: "A Movement, Not a Moment",
    body: "Jordan Create isn't a one-day thing. It's building Jordan's creative economy from the ground up. Early partners don't just sponsor an event, they become part of the foundation.",
    icon: "/assets/partners/impact-icon-3.svg",
    order: 2,
  },
  {
    id: "activations-not-panels",
    title: "Activations, Not Just Panels",
    body: "We don't do logos on banners. We build brand experiences on-ground activations, creator collaborations, and content moments that make your brand part of the story, not the background.",
    icon: "/assets/partners/impact-icon-4.svg",
    order: 3,
  },
];
