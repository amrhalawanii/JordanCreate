/**
 * Speakers page hero collage — measured from live jordancreate.com/speakers
 * at 1440×900 (Framer desktop ≥1200px). Positions are % of the hero viewport.
 */
export type SpeakersHeroCollageItem = {
  id: string;
  src: string;
  alt: string;
  /** Desktop absolute placement (% of hero) */
  left: number;
  top: number;
  width: number;
  height: number;
};

export const speakersHeroCollage: SpeakersHeroCollageItem[] = [
  {
    id: "woman-mic",
    src: "/assets/speakers-hero/F9PVxVMZkY47In7hyTOi5kzfBY.jpg",
    alt: "",
    left: 28.42,
    top: 23.1,
    width: 10.56,
    height: 24.67,
  },
  {
    id: "man-mic",
    src: "/assets/speakers-hero/jLwY19JNbRzgHUHE8ZDGGYLsLQ.jpg",
    alt: "",
    left: 62.19,
    top: 26.92,
    width: 11.94,
    height: 24.67,
  },
  {
    id: "umbrella",
    src: "/assets/speakers-hero/GGYESnWngomdkx2hjMf8GH73xM.jpg",
    alt: "",
    left: -0.1,
    top: 36.74,
    width: 15.07,
    height: 17.33,
  },
  {
    id: "cuts-cart",
    src: "/assets/speakers-hero/D7OkcSr12TLglvc98ceGtEjQx0.jpg",
    alt: "",
    left: 84.92,
    top: 44.34,
    width: 12.29,
    height: 14.11,
  },
  {
    id: "night-crowd",
    src: "/assets/speakers-hero/S3LChc8hoGyoQlf01DtYpgz681c.jpg",
    alt: "",
    left: 4.27,
    top: 61.84,
    width: 15.07,
    height: 24.67,
  },
  {
    id: "audience-phone",
    src: "/assets/speakers-hero/W0A90e0MzSFeq7hZ58cRgPg4MI8.jpg",
    alt: "",
    left: 78.86,
    top: 72.04,
    width: 9.51,
    height: 20.22,
  },
  {
    id: "beanbags",
    src: "/assets/speakers-hero/xUf3Tas6FLNHEfPt1fXXvMQbnmo.jpg",
    alt: "",
    left: 52.65,
    top: 73.77,
    width: 13.19,
    height: 17.11,
  },
  {
    id: "outdoor-group",
    src: "/assets/speakers-hero/soxAgn4kSZyymXd89oG1U8MKhGc.jpg",
    alt: "",
    left: 29.47,
    top: 79.26,
    width: 12.29,
    height: 14.11,
  },
];

/** Mobile/tablet grid order from live Framer (top-left → bottom-right). */
export const speakersHeroCollageMobileOrder = [
  "audience-phone",
  "beanbags",
  "outdoor-group",
  "night-crowd",
  "cuts-cart",
  "man-mic",
  "woman-mic",
  "umbrella",
] as const;
