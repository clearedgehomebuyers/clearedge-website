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
        {/* LCP Optimization: Preload hero image FIRST before any other resources */}
        <link rel="preload" as="image" href="/properties/scranton-pa-cash-home-buyers-clearedge-1-mobile.webp" fetchPriority="high" />
        {/* Google Fonts preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        {/* Critical CSS - inlined for instant first paint */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Reset & Base */
          *,*::before,*::after{box-sizing:border-box}
          body{margin:0;font-family:var(--font-inter),system-ui,sans-serif;-webkit-font-smoothing:antialiased}

          /* Header Critical Styles */
          header{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(255,255,255,0.95);backdrop-filter:blur(8px)}
          header.scrolled{background:rgba(255,255,255,0.98);box-shadow:0 1px 3px rgba(0,0,0,0.1)}

          /* Hero Section Critical Styles */
          .bg-\\[\\#FAF8F5\\]{background:#FAF8F5}
          section{position:relative}
          .pt-32{padding-top:8rem}
          .pb-10{padding-bottom:2.5rem}
          .px-4{padding-left:1rem;padding-right:1rem}
          .overflow-hidden{overflow:hidden}
          .max-w-7xl{max-width:80rem}
          .mx-auto{margin-left:auto;margin-right:auto}
          .w-full{width:100%}
          .grid{display:grid}
          .grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}
          .gap-6{gap:1.5rem}
          .items-center{align-items:center}
          .text-center{text-align:center}
          .font-serif{font-family:var(--font-playfair),Georgia,serif}
          .text-4xl{font-size:2.25rem;line-height:2.5rem}
          .font-medium{font-weight:500}
          .tracking-tight{letter-spacing:-0.025em}
          .mb-5{margin-bottom:1.25rem}
          .leading-\\[1\\.1\\]{line-height:1.1}
          .text-lg{font-size:1.125rem;line-height:1.75rem}
          .max-w-2xl{max-width:42rem}
          .mb-6{margin-bottom:1.5rem}
          .leading-relaxed{line-height:1.625}
          .font-light{font-weight:300}
          .flex{display:flex}
          .flex-col{flex-direction:column}
          .justify-center{justify-content:center}
          .rounded-full{border-radius:9999px}
          .bg-\\[\\#008a29\\]{background:#008a29}
          .text-white{color:#fff}
          .shadow-lg{box-shadow:0 10px 15px -3px rgba(0,0,0,0.1)}
          .h-full{height:100%}
          .bg-white{background:#fff}
          .rounded-xl{border-radius:0.75rem}
          .shadow-xl{box-shadow:0 20px 25px -5px rgba(0,0,0,0.1)}
          .aspect-\\[4\\/3\\]{aspect-ratio:4/3}
          .object-cover{object-fit:cover}
          .relative{position:relative}
          .absolute{position:absolute}
          .inset-0{inset:0}

          /* Video aspect ratio - prevent layout shift */
          .aspect-video{aspect-ratio:16/9;width:100%}

          @media(min-width:640px){.sm\\:text-5xl{font-size:3rem;line-height:1}}
          @media(min-width:1024px){.lg\\:text-6xl{font-size:3.75rem;line-height:1}.lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.lg\\:w-\\[320px\\]{width:320px}}
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