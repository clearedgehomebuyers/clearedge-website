import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home Sale Calculator: Cash Offer vs. Realtor in PA | ClearEdge Home Buyers',
  description: 'Compare your estimated net proceeds: selling your PA house with a realtor vs. accepting a cash offer. Free calculator with real PA market data.',
  keywords: ['home sale calculator', 'net proceeds calculator PA', 'cost to sell house PA', 'cash offer calculator', 'realtor vs cash buyer calculator'],
  openGraph: {
    title: 'Home Sale Calculator: Cash Offer vs. Realtor in PA | ClearEdge Home Buyers',
    description: 'Compare your estimated net proceeds: selling your PA house with a realtor vs. accepting a cash offer. Free calculator with real PA market data.',
    url: 'https://www.clearedgehomebuyers.com/calculator',
    siteName: 'ClearEdge Home Buyers',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.clearedgehomebuyers.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Home Sale Calculator - ClearEdge Home Buyers',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.clearedgehomebuyers.com/calculator',
  },
}

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
