import type { Stat } from "../schemas/stat";
import type { ReachStat } from "../schemas/partnerBenefit";

// Home page "THE NUMBERS SPEAK FOR THEMSELVES" section.
export const homeStats: Stat[] = [
  { id: "attendees", label: "Attendees", value: "350+", sublabel: "Creators, Marketeers & Enablers", order: 0 },
  { id: "speakers", label: "Speakers", value: "15", sublabel: "We brought you the best of the best", order: 1 },
  { id: "impact-sessions", label: "Impact Sessions", value: "3", sublabel: "We promise you insightful talks that will change your life", order: 2 },
  { id: "total-followers", label: "Speakers Total Followers", value: "70M+", sublabel: "The credibility is there", order: 3 },
];

// Partner-with-us "YOUR BRAND. THEIR WORLD" section — note these numbers
// (910+ / 10M+) differ from the home page's 350+/70M+ and from the master
// prompt's earlier notes (800+/2M+); the live site itself is inconsistent
// across pages, replicated deliberately (see FIDELITY-NOTES.md).
export const reachStats: ReachStat[] = [
  { id: "attendees", value: "910+", label: "ATTENDEES", body: "Attendees, creators, marketers, and brands", order: 0 },
  { id: "combined-reach", value: "10M+", label: "COMBINED REACH", body: "Applications from creators and fans to attend", order: 1 },
  { id: "online-offline", value: "∞", label: "ONLINE & OFFLINE", body: "Speakers from different industries, disciplines, and passions", order: 2 },
];
