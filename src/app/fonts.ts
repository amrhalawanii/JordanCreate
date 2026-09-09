import { DM_Sans, Host_Grotesk, Cormorant_Garamond, Inter } from "next/font/google";

// Display serif: the live site uses TT Ramillas (a commercial typeface —
// licensing unresolved, see EXTRACTION.md §1). Cormorant Garamond stands in
// here provisionally, matching the open-font substitution the sibling
// Jordan-Create-App-V1 project already made for the same reason. Swap this
// one declaration once TT Ramillas is licensed — every component reads the
// role via the `--font-display` CSS variable, not this file directly.
export const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display-serif",
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-label-sans",
  display: "swap",
});

export const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-body-sans",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-fallback-sans",
  display: "swap",
});
