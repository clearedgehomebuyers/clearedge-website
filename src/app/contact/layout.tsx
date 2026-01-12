import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact ClearEdge Home Buyers | Get Your Cash Offer Today',
  description: 'Ready to sell your Pennsylvania house fast? Contact ClearEdge for a no-obligation cash offer. Call Tyler at (570) 904-2059 or fill out our quick form.',
  openGraph: {
    title: 'Contact ClearEdge Home Buyers | Get Your Cash Offer Today',
    description: 'Ready to sell your Pennsylvania house fast? Contact ClearEdge for a no-obligation cash offer.',
    url: 'https://www.clearedgehomebuyers.com/contact',
    siteName: 'ClearEdge Home Buyers',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.clearedgehomebuyers.com/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
