import { Metadata } from 'next'
import { RegionalHubPage } from '@/components/RegionalHubPage'
import { lehighValleyHubData } from '@/lib/regional-hub-data'

export const metadata: Metadata = {
  title: lehighValleyHubData.metaTitle,
  description: lehighValleyHubData.metaDescription,
  openGraph: {
    title: lehighValleyHubData.metaTitle,
    description: lehighValleyHubData.metaDescription,
    url: 'https://www.clearedgehomebuyers.com/locations/lehigh-valley',
    siteName: 'ClearEdge Home Buyers',
    type: 'website',
    images: [
      {
        url: 'https://www.clearedgehomebuyers.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ClearEdge Home Buyers - Cash Home Buyers in Lehigh Valley',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.clearedgehomebuyers.com/locations/lehigh-valley',
  },
}

// FAQ Schema for SEO
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: lehighValleyHubData.faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function LehighValleyHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RegionalHubPage data={lehighValleyHubData} />
    </>
  )
}
