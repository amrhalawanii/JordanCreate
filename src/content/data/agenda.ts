import type { AgendaSession } from "../schemas/agenda";

// Extracted verbatim from the live /agenda page (added to jordancreate.com after
// Phase 0) via scripts/extract-agenda.ts, and cross-checked against the Figma
// redesign (node 16:4183) for layout -- the copy and speaker images below are the
// live site's real content, reproduced as-is including its inconsistent time-range
// formatting (e.g. "04:10 PM" vs "4:10 PM", en-dash vs hyphen, no-space dashes).
export const agendaSessions: AgendaSession[] = [
  {
    id: "registration",
    time: "2:00 PM – 3:00 PM",
    title: "Registration and Check-In",
    body: "",
    speakerImages: [],
    highlight: true,
    order: 0,
  },
  {
    id: "session-1",
    time: "3:00 PM - 3:20 PM",
    title: "Human vs. AI: Who Makes Better Content?",
    body: "How is AI really changing content creation? This panel brings together two creators with opposite approaches, one who builds AI into his workflow, one who keeps his fully human, to unpack what AI adds, what it costs, and where it belongs in creative work.",
    speakerImages: [
      "/assets/agenda/speakers/Qe7gakr1pFEFQAfWdj8DR9un4uA.png",
      "/assets/agenda/speakers/AAykfeZa9PTlYstxPrcXM1LjU.png",
      "/assets/agenda/speakers/rY0NBeriVq0sX0DQD8ioTHh1P0.png"
    ],
    highlight: false,
    order: 1,
  },
  {
    id: "session-2",
    time: "3:25 PM– 3:40 PM",
    title: "Fireside: The Power of Being Relatable",
    body: "The biggest content in the region isn't the most produced, it's the most familiar. Leila and Nasser built millions of followers on moments people recognize as their own. In this fireside, they break down how relatability actually works, and why feeling close to your audience beats impressing them.",
    speakerImages: [
      "/assets/agenda/speakers/txqH5NFtF6d3u2UJrygUr2r3vCE.png",
      "/assets/agenda/speakers/vouzEpwg0RDB0ILpFJX25uWa4.png"
    ],
    highlight: false,
    order: 2,
  },
  {
    id: "session-3",
    time: "3:45 PM - 4:05 PM",
    title: "Your Career Is Not Your Brand",
    body: "Nobody trusts a logo, people trust a face. Yazeed Habiba and Dr Mohamad Laban put theirs on the line, and their businesses grew. This panel is the owner's side of content: what showing up publicly does for trust, sales, and hiring, and why staying invisible is now the bigger risk.",
    speakerImages: [
      "/assets/agenda/speakers/5oS4YsfHfzxsJ9TUYMzZJUDeNo.png",
      "/assets/agenda/speakers/zSxlmbV4CfKAtWie7i4lG8YHE.png",
      "/assets/agenda/speakers/HrKPeGguCaTV8TRQPWuo4l6SUwo.png"
    ],
    highlight: false,
    order: 3,
  },
  {
    id: "session-4",
    time: "04:10 PM – 04:30 PM",
    title: "Short Form vs. Long Form: Who Wins?",
    body: "Short form gets the reach. Long form gets the loyalty. Yazan Abu Ajweh and Mohanad Syoof built their careers on YouTube's hardest format, and in this panel they take on the biggest argument in content: which format actually wins, on attention, on money, and on building an audience that stays. Pick a side before it starts.",
    speakerImages: [
      "/assets/agenda/speakers/9JVXlRH3EBtJG4neOlqyLndMwI.png",
      "/assets/agenda/speakers/kUmMyZ4LNV7e1TkdRlSlGFoIvTI.png",
      "/assets/agenda/speakers/tFYdVn9rvPtt2hHN1SSFWr5TI.png"
    ],
    highlight: false,
    order: 4,
  },
  {
    id: "session-5",
    time: "04:35 PM – 05:00 PM",
    title: "How Creators Actually Make Money",
    body: "How much does a creator actually make? Everyone asks, nobody answers. This session does, the real income streams, how brand deals happen from first message to payment, and what it takes to turn content into a career.",
    speakerImages: [
      "/assets/agenda/speakers/cS0dIRVM2o58yES3Excy9TST8HY.png",
      "/assets/agenda/speakers/DlZDtpZ7vcLi5jv5E4ME2WP5xas.png",
      "/assets/agenda/speakers/xc1PsIOzeRAwiIZbbVD57ghR0A.png",
      "/assets/agenda/speakers/uHPAtmKE7EscXfHcrprRfvaT5pk.png"
    ],
    highlight: false,
    order: 5,
  },
  {
    id: "session-6",
    time: "05:05 PM – 05:30 PM",
    title: "How to Go Viral (According to People Who Actually Did)",
    body: "What do the most-watched videos in the region have in common? They're funny. These four have the receipts, hundreds of millions of views built on comedy. In the most chaotic session of the day, they break down what actually makes people share a video.",
    speakerImages: [
      "/assets/agenda/speakers/YgyWHheZxeba0u8Rr4vVpJPTk.png",
      "/assets/agenda/speakers/gJyOWBKOTlNXnhQYLf6hBAZPs.png",
      "/assets/agenda/speakers/3mCmXcb1U4ITMJuA7ESaswYvNs.png"
    ],
    highlight: false,
    order: 6,
  },
  {
    id: "session-7",
    time: "05:35 PM – 06:00 PM",
    title: "Where Cooking Ends and Art Begins",
    body: "What if food is the new art form? Our panel treats the kitchen as a studio, dishes designed to be seen, videos built like short films. This panel unpacks how creativity works in food, and what it takes to stand out in the most crowded content lane there is.",
    speakerImages: [
      "/assets/agenda/speakers/Sx1SSJrqwOakV7djNCBf0zwIYY.png",
      "/assets/agenda/speakers/2GOCMb0ZO4lpzCRDT4lENelxJZw.png",
      "/assets/agenda/speakers/mKBObu2f7SpCHrjAZdO7gypWk0.png",
      "/assets/agenda/speakers/5YqxM3QnXjSVMKXcWdqHVzGKM.png"
    ],
    highlight: false,
    order: 7,
  },
  {
    id: "session-8",
    time: "6:05 PM – 06:30 PM",
    title: "How to Stay Authentic on Social Media",
    body: "Every creator says \"just be yourself\" , nobody explains how, when the algorithm rewards trends and brands want scripts. Our panel built loyal audiences without performing a character, and they get honest about what that actually takes.",
    speakerImages: [
      "/assets/agenda/speakers/VEAI83tc6Y0yt1lHHrjYSMfNWI.png",
      "/assets/agenda/speakers/1kmE6t8HVPrgMDrbGptB8TCP6k.png",
      "/assets/agenda/speakers/bgSX5j7K3RbAtwo938Dup13Tc.png",
      "/assets/agenda/speakers/jgX36EtMANgdSuISVzAeZvjP9bY.png"
    ],
    highlight: false,
    order: 8,
  },
  {
    id: "session-9",
    time: "6:40 PM – 7:00 PM",
    title: "Keynote: The Neuroscience of Retention",
    body: "You didn't finish the last video you opened, almost nobody does. Views are easy, retention is the whole game. Omar Aburob kept millions watching long videos in a short-video world, and this keynote explains how, the hooks, loops, and payoffs that hold attention, built into content on purpose.",
    speakerImages: [
      "/assets/agenda/speakers/r6aTRBPZC9KhstC0SpuNcHg7gfw.png"
    ],
    highlight: false,
    order: 9,
  },
  {
    id: "session-10",
    time: "7:55 PM - 8:10 PM",
    title: "Founders Speech",
    body: "",
    speakerImages: [
      "/assets/agenda/speakers/pFAHTL6wul9NNaLB7CUJND92Yk.png",
      "/assets/agenda/speakers/5UffrNEw0DDPLbh2bu49lfonDUw.png"
    ],
    highlight: false,
    order: 10,
  },
  {
    id: "session-11",
    time: "8:15 PM - 8:40 PM",
    title: "Your Life Is the Content",
    body: "No script, no studio, no character. Moh Nabil crosses the Arab world by car and films it. Dolly turns her trips into content that proves anyone can travel. Rozzah's daily life is watched by millions across every platform. This panel is about the creators who turned living into a career, what gets filmed, what stays private, and what happens when your life becomes your job.",
    speakerImages: [
      "/assets/agenda/speakers/1fS2TM9jlIT2O166pirqtdXZx6c.png",
      "/assets/agenda/speakers/OpGKlf29MHrFCY3Fvi1ZFZbeTc.png",
      "/assets/agenda/speakers/YRO6UqRFgWpL1JyVFjP8HkY0By8.png",
      "/assets/agenda/speakers/ziqiTJkEarKD8aGyQxASp9eTt4Y.png"
    ],
    highlight: false,
    order: 11,
  },
  {
    id: "session-12",
    time: "8:45 PM - 9:05 PM",
    title: "Turn Facts Into Content People Watch",
    body: "Most people don't open social media to learn something. Yet our panel built their audiences by teaching people who never asked to be taught. This panel unpacks how they choose their topics, structure their videos, and hold attention long enough for value to land, in a feed built for entertainment.",
    speakerImages: [
      "/assets/agenda/speakers/FtvGPSTjyEFQxvYGEStOYNxDE.png",
      "/assets/agenda/speakers/Heq2IQzze6yL0wg2Eom9lgO00.png",
      "/assets/agenda/speakers/pFAHTL6wul9NNaLB7CUJND92Yk.png"
    ],
    highlight: false,
    order: 12,
  },
  {
    id: "session-13",
    time: "9:10 PM - 9:30 PM",
    title: "Does Influencer Marketing Actually Work?",
    body: "Mohamad Laban is a surgeon. Mahmoud Abuqalbain is a consultant on mega projects. Both built successful careers before they ever posted online, so why did they start? This panel is about personal branding: why your name matters as much as your work, and how to build it without losing focus on your job.",
    speakerImages: [
      "/assets/agenda/speakers/vouzEpwg0RDB0ILpFJX25uWa4.png",
      "/assets/agenda/speakers/sOqr9urHFC1O7Ay0WcsRW6s.png",
      "/assets/agenda/speakers/5UffrNEw0DDPLbh2bu49lfonDUw.png"
    ],
    highlight: false,
    order: 13,
  },
];
