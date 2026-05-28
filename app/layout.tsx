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
  applicationName: "Vivid In2erio",
  title: {
    default: "Vivid In2erio | Premium & luxury interiors",
    template: "%s | Vivid In2erio",
  },
  description:
    "Premium & luxury interiors in Hyderabad and Bhubaneswar — design to delivery for homes and workspaces: curated materials, modular kitchens & wardrobes, 3D sign-off, and studio-led execution.",
  keywords: [
    "Vivid In2erio",
    "interior design Hyderabad",
    "interior design Bhubaneswar",
    "luxury interiors",
    "modular kitchen",
    "premium interiors",
    "design studio Secunderabad",
    "Odisha interiors",
  ],
  authors: [{ name: "Vivid In2erio" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Vivid In2erio",
    title: "Vivid In2erio | Premium & luxury interiors",
    description:
      "Hyderabad & Bhubaneswar studios — bespoke residential and commercial interiors from consultation through handover.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Vivid In2erio — premium and luxury interiors in Hyderabad and Bhubaneswar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivid In2erio | Premium & luxury interiors",
    description:
      "Hyderabad & Bhubaneswar — luxury interiors, modular systems, and design-to-delivery execution.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
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
