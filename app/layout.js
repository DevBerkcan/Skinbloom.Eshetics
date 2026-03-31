// app/layout.js
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
// Font Awesome
import "@fortawesome/fontawesome-svg-core/styles.css";
// Local Fonts
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.skinbloom-aesthetics.ch";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Skinbloom Aesthetics Basel",
    template: "%s | Skinbloom Aesthetics",
  },
  description:
    "Skinbloom Aesthetics in Basel: professionelle Behandlungen für natürliche Ergebnisse bei Anti-Aging, Hyaluron und Ästhetik.",
  keywords: [
    "Skinbloom Aesthetics",
    "Ästhetik Basel",
    "Hyaluron Basel",
    "Anti Aging Basel",
    "Lippenunterspritzung Basel",
    "Beauty Klinik Basel",
    "Faltenbehandlung Basel",
    "PRP Basel",
    "Microneedling Basel",
    "Kosmetik Basel",
    "Mesotherapie Basel",
    "HIFU Basel",
    "Skinbooster Basel",
    "Carboxytherapie Basel",
    "Radiofrequenz Basel",
  ],
  icons: {
    icon: "/assets/images/logo.png",
    apple: "/assets/images/logo.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: SITE_URL,
    siteName: "Skinbloom Aesthetics",
    title: "Skinbloom Aesthetics Basel",
    description:
      "Professionelle Anti-Aging- und Ästhetik-Behandlungen in Basel mit individueller Beratung.",
    images: [
      {
        url: "/assets/images/banner-bg.png",
        width: 1200,
        height: 630,
        alt: "Skinbloom Aesthetics Basel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skinbloom Aesthetics Basel",
    description:
      "Professionelle Anti-Aging- und Ästhetik-Behandlungen in Basel mit individueller Beratung.",
    images: ["/assets/images/banner-bg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de-CH">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Montserrat:wght@400;700&family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
