import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | ClearEdge Home Buyers | (570) 904-2059',
  description: 'Contact ClearEdge Home Buyers for a free cash offer on your house. Call (570) 904-2059 or fill out our form. We serve Eastern Pennsylvania and respond within 24 hours.',
  openGraph: {
    title: 'Contact Us | ClearEdge Home Buyers',
    description: 'Get in touch for a free, no-obligation cash offer on your house. Available 24/7.',
    url: 'https://clearedgehomebuyers.com/contact',
    siteName: 'ClearEdge Home Buyers',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://clearedgehomebuyers.com/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
