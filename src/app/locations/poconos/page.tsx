import { Metadata } from 'next'
import { RegionalHubPage } from '@/components/RegionalHubPage'
import { poconosHubData } from '@/lib/regional-hub-data'

export const metadata: Metadata = {
  title: poconosHubData.metaTitle,
  description: poconosHubData.metaDescription,
  openGraph: {
    title: poconosHubData.metaTitle,
    description: poconosHubData.metaDescription,
    url: 'https://www.clearedgehomebuyers.com/locations/poconos',
    siteName: 'ClearEdge Home Buyers',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.clearedgehomebuyers.com/locations/poconos',
  },
}

// FAQ Schema for SEO
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: poconosHubData.faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function PoconosHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RegionalHubPage data={poconosHubData} />
    </>
  )
}
