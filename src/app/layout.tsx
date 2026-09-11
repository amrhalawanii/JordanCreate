import type { Metadata } from "next";
import { inter, ttRamillas } from "./fonts";
import { JsonLd } from "@/components/shared/JsonLd";
import { SmoothScrollProvider } from "@/components/shared/SmoothScrollProvider";
import { SkipLink } from "@/components/shared/SkipLink";
import "./globals.css";

const description =
  "A community-powered event bringing together musicians, influencers, content creators, and agencies from across the Kingdom, a creative explosion built to inspire generations.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jordancreate.com"),
  title: "Jordan Create Official",
  description,
  alternates: { canonical: "/" },
  robots: "max-image-preview:large",
  openGraph: {
    type: "website",
    title: "Jordan Create Official",
    description,
    url: "https://www.jordancreate.com/",
    images: ["/assets/og/share-card.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jordan Create Official",
    description,
    images: ["/assets/og/share-card.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${ttRamillas.variable}`}>
      <body>
        <SkipLink />
        <JsonLd />
        <SmoothScrollProvider />
        {children}
      </body>
    </html>
  );
}
