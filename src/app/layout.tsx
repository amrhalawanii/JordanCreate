import type { Metadata } from "next";
import { display, dmSans, hostGrotesk, inter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jordan Create Official",
  description:
    "A community-powered event bringing together musicians, influencers, content creators, and agencies from across the Kingdom, a creative explosion built to inspire generations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${dmSans.variable} ${hostGrotesk.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
