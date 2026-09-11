import localFont from "next/font/local";
import { Inter } from "next/font/google";

/**
 * Display: TT Ramillas (live jordancreate.com / Framer marketing type)
 * UI / body / label / utility: Inter
 *
 * Components use Tailwind roles (font-display, font-body, …) via CSS vars
 * in globals.css — do not import these classNames directly in sections.
 */
export const ttRamillas = localFont({
  src: [
    {
      path: "../../public/fonts/tt-ramillas-trl-variable-roman.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/tt-ramillas-trl-variable-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-tt-ramillas",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
