import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sell Your House Fast for Cash | ClearEdge Home Buyers",
    template: "%s | ClearEdge Home Buyers",
  },
  description: "Get a fair cash offer in 24 hours. We buy houses in any condition throughout Eastern Pennsylvania. No repairs, no fees, no commissions. Close in as little as 7 days.",
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
  ],
  authors: [{ name: 'ClearEdge Home Buyers' }],
  creator: 'ClearEdge Home Buyers',
  publisher: 'ClearEdge Home Buyers',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.clearedgehomebuyers.com',
    siteName: 'ClearEdge Home Buyers',
    title: 'Sell Your House Fast for Cash | ClearEdge Home Buyers',
    description: 'Get a fair cash offer in 24 hours. We buy houses in any condition throughout Eastern Pennsylvania. No repairs, no fees, no commissions. Close in as little as 7 days.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ClearEdge Home Buyers - Sell Your House Fast for Cash',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sell Your House Fast for Cash | ClearEdge Home Buyers',
    description: 'Get a fair cash offer in 24 hours. We buy houses in any condition throughout Eastern Pennsylvania. No repairs, no fees, no commissions.',
    images: ['/og-image.png'],
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
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <style dangerouslySetInnerHTML={{ __html: `
          /* Critical CSS for hero section - eliminates render delay */
          .hero-critical{position:relative;padding-top:7rem;padding-bottom:6rem;padding-left:1rem;padding-right:1rem;background:linear-gradient(to bottom right,#1e3a5f,#162d4d,#1e3a5f);overflow:hidden}
          .nav-critical{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(255,255,255,0.98);backdrop-filter:blur(12px);border-bottom:1px solid #f1f5f9;box-shadow:0 1px 2px 0 rgba(0,0,0,0.05)}
          .hero-text-critical{color:#fff;font-size:3rem;line-height:1.1;font-weight:800;letter-spacing:-0.025em}
          .hero-subtext-critical{color:rgba(255,255,255,0.9);font-size:1.25rem;line-height:1.75}
          @media(min-width:1024px){.hero-text-critical{font-size:3.75rem}}
        ` }} />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            setTimeout(function() {
              var script = document.createElement('script');
              script.src = 'https://www.googletagmanager.com/gtag/js?id=G-1H6CPZVB8D';
              script.async = true;
              document.head.appendChild(script);
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', 'G-1H6CPZVB8D');
            }, 3000);
          `}
        </Script>
      </head>
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}