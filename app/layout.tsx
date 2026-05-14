import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
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

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Vivid In2erio | Premium & luxury interiors",
    template: "%s | Vivid In2erio",
  },
  description:
    "Premium & luxury interiors in Hyderabad and Bhubaneswar. We design more than spaces — we curate refined lifestyles: timeless aesthetics, intelligent planning, and flawless execution for discerning homeowners and businesses.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/icon.svg",
  },
};

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
