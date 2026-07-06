import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { buildRootLayoutMetadata } from "@/lib/seo/metadata";
import { getSiteUrl } from "@/lib/site-url";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = buildRootLayoutMetadata(getSiteUrl());

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-dvh overflow-x-hidden">
        {/* Content above grain so blend modes / compositing cannot hide the page */}
        <div className="relative z-10 min-h-dvh">
          <SmoothScroll>{children}</SmoothScroll>
        </div>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
