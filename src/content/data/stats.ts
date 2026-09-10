import type { Stat } from "../schemas/stat";
import type { ReachStat } from "../schemas/partnerBenefit";

// Home page "THE NUMBERS SPEAK FOR THEMSELVES" section. Values match the
// Sept 2026 Figma redesign (400+/34/12/100M+), which is HIGHER than the
// live site's current 350+/15/3/70M+ at the time of Phase 0 extraction —
// the Figma file is a newer iteration the user pointed to explicitly as
// the source of truth for the home page. See FIDELITY-NOTES.md.
export const homeStats: Stat[] = [
  { id: "attendees", label: "Attendees", value: "400+", sublabel: "Creators,Marketeers & Enablers", order: 0 },
  { id: "speakers", label: "Speakers", value: "34", sublabel: "We brought you the best of the best", order: 1 },
  { id: "impact-sessions", label: "Impact Sessions", value: "12", sublabel: "We promise you insightful talks that will change your life", order: 2 },
  { id: "total-followers", label: "Speakers Total Followers", value: "100M+", sublabel: "The credibility is there", order: 3 },
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
