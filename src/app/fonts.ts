import { Inter } from "next/font/google";

/**
 * Product type stack — aligned with jordan-create-dsv1 / mobile app.
 * Display: Georgia (system serif, same as nativeTheme.font.display)
 * UI / body / label / utility: Inter
 *
 * Components never import this file for class names — they use Tailwind
 * roles (font-display, font-body, font-label, font-utility) wired through
 * CSS variables in globals.css.
 */
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
