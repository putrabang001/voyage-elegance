import type { Metadata } from "next";
import { Playfair_Display, Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-accent",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Voyage Elegance | Discover the Ocean's Finest Treasures",
    template: "%s | Voyage Elegance",
  },
  description:
    "Experience breathtaking underwater worlds, pristine beaches, and unforgettable adventures across the most beautiful ocean destinations on Earth.",
  keywords: [
    "ocean travel",
    "tour packages",
    "diving",
    "beach vacation",
    "island hopping",
    "marine adventure",
    "Maldives",
    "Raja Ampat",
    "Bora Bora",
  ],
  authors: [{ name: "Voyage Elegance" }],
  creator: "Voyage Elegance",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR", "id_ID"],
    siteName: "Voyage Elegance",
    title: "Voyage Elegance | Discover the Ocean's Finest Treasures",
    description:
      "Experience breathtaking underwater worlds, pristine beaches, and unforgettable adventures across the most beautiful ocean destinations on Earth.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Voyage Elegance - Ocean Adventures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voyage Elegance | Discover the Ocean's Finest Treasures",
    description:
      "Experience breathtaking underwater worlds, pristine beaches, and unforgettable adventures.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} ${cinzel.variable} h-full antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
