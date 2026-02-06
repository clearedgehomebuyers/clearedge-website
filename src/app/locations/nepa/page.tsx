import { Metadata } from 'next'
import { RegionalHubPage } from '@/components/RegionalHubPage'
import { nepaHubData } from '@/lib/regional-hub-data'

export const metadata: Metadata = {
  title: nepaHubData.metaTitle,
  description: nepaHubData.metaDescription,
  openGraph: {
    title: nepaHubData.metaTitle,
    description: nepaHubData.metaDescription,
    url: 'https://www.clearedgehomebuyers.com/locations/nepa',
    siteName: 'ClearEdge Home Buyers',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.clearedgehomebuyers.com/locations/nepa',
  },
}

// FAQ Schema for SEO
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: nepaHubData.faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function NEPAHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RegionalHubPage data={nepaHubData} />
    </>
  )
}
