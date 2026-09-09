import type { Metadata } from "next";
import { display, dmSans, hostGrotesk, inter } from "./fonts";
import { JsonLd } from "@/components/shared/JsonLd";
import { SmoothScrollProvider } from "@/components/shared/SmoothScrollProvider";
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
    <html lang="en" className={`${display.variable} ${dmSans.variable} ${hostGrotesk.variable} ${inter.variable}`}>
      <body>
        <JsonLd />
        <SmoothScrollProvider />
        {children}
      </body>
    </html>
  );
}
