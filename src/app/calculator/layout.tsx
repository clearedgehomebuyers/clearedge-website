import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home Sale Calculator — Compare Net Proceeds | ClearEdge Home Buyers',
  description: 'Free PA home sale calculator. Compare net proceeds: traditional sale vs. cash offer with county-specific closing costs and real contractor repair pricing.',
  keywords: ['home sale calculator PA', 'net proceeds calculator Pennsylvania', 'cost to sell house PA', 'cash offer calculator', 'realtor vs cash buyer calculator', 'PA closing costs calculator', 'home selling costs Pennsylvania'],
  openGraph: {
    title: 'Home Sale Calculator — Compare Net Proceeds | ClearEdge Home Buyers',
    description: 'Free PA home sale calculator. Compare net proceeds: traditional sale vs. cash offer with county-specific closing costs and real contractor repair pricing.',
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
