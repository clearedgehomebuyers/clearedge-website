import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PA Home Sale Calculator | Compare Net Proceeds | ClearEdge',
  description: "Free PA calculator: model an agent-sale net and compare it with a written cash offer using transparent, editable cost and repair assumptions.",
  keywords: ['home sale calculator PA', 'net proceeds calculator Pennsylvania', 'cost to sell house PA', 'cash offer calculator', 'realtor vs cash buyer calculator', 'PA closing costs calculator', 'home selling costs Pennsylvania'],
  openGraph: {
    title: 'PA Home Sale Calculator | Compare Net Proceeds | ClearEdge',
    description: "Free PA calculator: model an agent-sale net and compare it with a written cash offer using transparent, editable cost and repair assumptions.",
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
