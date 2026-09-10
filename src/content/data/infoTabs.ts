import type { InfoTab } from "../schemas/tab";

// "GET TO KNOW US" tabbed panel on the home page.
export const infoTabs: InfoTab[] = [
  {
    id: "what-is-jordan-create",
    trigger: "What is Jordan Create?",
    body: "Jordan Create brings content creators, artists, musicians, marketers, brands, and platforms into one experience focused on learning, networking, and collaboration.",
    cta: { label: "Count Me In", href: "https://tally.so/r/2EyNej" },
    image: "/assets/tabs/what-is-jordan-create.jpg",
    order: 0,
  },
  {
    id: "who-should-attend",
    trigger: "Who Should Attend?",
    body: "Creators. Marketers. Founders. CEOs. If you make the content or build the businesses, budgets, and tools behind it, this event is for you. This is your room.",
    cta: { label: "Count Me In", href: "https://tally.so/r/2EyNej" },
    image: "/assets/tabs/who-should-attend.jpg",
    order: 1,
  },
  {
    id: "what-happens",
    trigger: "What Happens?",
    body: "Learn from top creators, marketers, and founders through panels and keynotes, meet new people who are into content creation, and enjoy great music and entertainment throughout the day. You'll leave with new ideas, new connections, and real commercial opportunities from brands and agencies to collaborations with other creators.",
    cta: { label: "Count Me In", href: "https://tally.so/r/2EyNej" },
    image: "/assets/tabs/what-happens.jpg",
    order: 2,
  },
];
