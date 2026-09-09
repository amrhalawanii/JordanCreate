import type { FAQEntry } from "../schemas/faq";

// Verbatim answers captured via scripted click-through — see
// reference/faq-answers.json and scripts/faq-extract.ts (Phase 0). These
// answers are not present in the live site's initial DOM at all; Framer
// mounts them lazily on first expand.
export const faqEntries: FAQEntry[] = [
  {
    id: "what-is-jordan-create",
    question: "What is Jordan Create?",
    answer:
      "Jordan Create is the largest creator economy event in the Levant region. It brings together content creators, artists, musicians, marketers, brands, and platforms into one experience focused on learning, networking, and collaboration. It takes place annually in Jordan.",
    order: 0,
  },
  {
    id: "who-should-attend",
    question: "Who should attend Jordan Create?",
    answer:
      "Jordan Create is for content creators of all levels, marketers, brand managers, agency professionals, artists, musicians, designers, entrepreneurs, and anyone working in or interested in the creator economy.",
    order: 1,
  },
  {
    id: "what-happens",
    question: "What happens at Jordan Create?",
    answer:
      "The event features keynotes, panels, workshops, live content breakdowns, brand and creator networking, live music, and entertainment. It is built around three tracks: Creation, Marketing, and Technology.",
    order: 2,
  },
  {
    id: "only-for-big-creators",
    question: "Is Jordan Create only for big creators?",
    answer:
      "No. Jordan Create is for creators at every level — from people just starting to established creators with large audiences. The event is also designed for marketers, brands, and creative professionals.",
    order: 3,
  },
  {
    id: "three-tracks",
    question: "What are the three tracks at Jordan Create?",
    answer:
      "Creation — for creators, artists, and anyone who builds content or creative work. Marketing — for marketers, agencies, and brands looking to understand creator-driven campaigns. Technology — for anyone exploring how AI and digital tools are changing content, marketing, and media.",
    order: 4,
  },
  {
    id: "who-speaks",
    question: "Who speaks at Jordan Create?",
    answer:
      "Jordan Create features creators, industry leaders, marketers, and platform executives from across the region. Speaker announcements are made on the official Jordan Create channels.",
    order: 5,
  },
  {
    id: "who-founded",
    question: "Who founded Jordan Create?",
    answer:
      "Jordan Create was founded by Mohammed Almashhadani in 2025 to give Jordan's creative community a central place to connect, learn, and grow.",
    order: 6,
  },
  {
    id: "what-makes-different",
    question: "What makes Jordan Create different from other events?",
    answer:
      "Jordan Create combines education, networking, and entertainment into one experience. It is not a traditional conference — it features live music, brand activations, and community-driven moments alongside high-value sessions and panels.",
    order: 7,
  },
];
