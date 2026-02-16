// Cache bust: 1767730000 - PNG favicon
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { FloatingTextButton } from "@/components/FloatingTextButton";
import { TrafficSourceProvider } from "@/components/TrafficSourceProvider";
import { ScrollAnimationProvider } from "@/components/ScrollAnimationProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "optional",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "optional",
});

export const metadata: Metadata = {
  title: {
    default: "ClearEdge Home Buyers | Sell Your House Fast for Cash in PA",
    template: "%s",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* GA4 Analytics - Production only, lazy loaded for performance */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-1H6CPZVB8D"
              strategy="lazyOnload"
            />
            <Script id="ga4-init" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-1H6CPZVB8D');
              `}
            </Script>
          </>
        )}
        {/* WebSite Schema - appears on every page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "ClearEdge Home Buyers",
            "alternateName": "ClearEdge",
            "url": "https://www.clearedgehomebuyers.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.clearedgehomebuyers.com/?s={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}}
        />
        {/* Preload hero image (280w is inlined base64 in v0-hero, larger variants via network) */}
        <link
          rel="preload"
          as="image"
          type="image/webp"
          imageSrcSet="/properties/scranton-pa-cash-home-buyers-clearedge-1-mobile-2x.webp 560w, /properties/scranton-pa-cash-home-buyers-clearedge-1-320w.webp 320w, /properties/scranton-pa-cash-home-buyers-clearedge-1-2x.webp 640w"
          imageSizes="(max-width: 768px) 280px, 380px"
          fetchPriority="high"
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <TrafficSourceProvider>
          <ScrollAnimationProvider>
            {children}
          </ScrollAnimationProvider>
          <FloatingTextButton />
        </TrafficSourceProvider>
      </body>
    </html>
  );
}