// Cache bust: 1767730000 - PNG favicon
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { FloatingTextButton } from "@/components/FloatingTextButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ClearEdge Home Buyers | Sell Your House Fast for Cash in PA",
    template: "%s | ClearEdge Home Buyers",
  },
  description: "Sell your house fast for cash in Eastern PA. No repairs, no fees, no commissions. Get a fair cash offer in 24 hours. Serving NEPA, Lehigh Valley & Poconos.",
  applicationName: "ClearEdge Home Buyers",
  metadataBase: new URL('https://www.clearedgehomebuyers.com'),
  keywords: [
    'sell house fast',
    'cash home buyers',
    'we buy houses',
    'sell my house fast',
    'cash for houses',
    'sell house as is',
    'Pennsylvania home buyers',
    'Scranton house buyers',
    'sell inherited house',
    'avoid foreclosure',
    'NEPA home buyers',
    'Lehigh Valley cash home buyers',
    'Poconos house buyers',
  ],
  authors: [{ name: 'ClearEdge Home Buyers' }],
  creator: 'ClearEdge Home Buyers',
  publisher: 'ClearEdge Home Buyers',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.clearedgehomebuyers.com',
    siteName: 'ClearEdge Home Buyers',
    title: 'ClearEdge Home Buyers | Sell Your House Fast for Cash',
    description: 'Sell your house fast for cash in Eastern Pennsylvania. No repairs, no fees, no commissions. Get a fair cash offer in 24 hours.',
    images: [
      {
        url: 'https://www.clearedgehomebuyers.com/og-image.png?v=2',
        width: 1200,
        height: 630,
        alt: 'ClearEdge Home Buyers - Sell Your House Fast for Cash in Eastern PA',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClearEdge Home Buyers | Sell Your House Fast for Cash',
    description: 'Sell your house fast for cash in Eastern Pennsylvania. No repairs, no fees, no commissions.',
    images: ['https://www.clearedgehomebuyers.com/og-image.png?v=2'],
    creator: '@clearedgehome',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* LCP Optimization: Preload hero image with responsive srcset (WebP) */}
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="/properties/scranton-pa-cash-home-buyers-clearedge-1.webp"
          imageSrcSet="/properties/scranton-pa-cash-home-buyers-clearedge-1-mobile.webp 280w, /properties/scranton-pa-cash-home-buyers-clearedge-1-mobile-2x.webp 560w, /properties/scranton-pa-cash-home-buyers-clearedge-1.webp 320w, /properties/scranton-pa-cash-home-buyers-clearedge-1-2x.webp 640w"
          imageSizes="(max-width: 768px) 280px, 320px"
          fetchPriority="high"
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <style dangerouslySetInnerHTML={{ __html: `
          /* Critical CSS for hero section - v0 design with cream background */
          .hero-critical{position:relative;padding-top:7rem;padding-bottom:6rem;padding-left:1rem;padding-right:1rem;background:#FAF8F5;overflow:hidden}
          .nav-critical{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(250,248,245,0.98);backdrop-filter:blur(12px);border-bottom:1px solid rgba(26,31,26,0.05)}
          .hero-text-critical{color:#1a1f1a;font-size:3rem;line-height:1.1;font-weight:700;letter-spacing:-0.025em}
          .hero-subtext-critical{color:rgba(26,31,26,0.7);font-size:1.25rem;line-height:1.75}
          @media(min-width:1024px){.hero-text-critical{font-size:3.75rem}}
        ` }} />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1H6CPZVB8D"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1H6CPZVB8D');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
        <FloatingTextButton />
      </body>
    </html>
  );
}