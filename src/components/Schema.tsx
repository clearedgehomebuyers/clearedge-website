export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ClearEdge Home Buyers",
    "description": "We buy houses for cash in Eastern Pennsylvania. Get a fair cash offer in 24 hours. No repairs, no fees, no commissions.",
    "url": "https://clearedgehomebuyers.com",
    "telephone": "+1-570-904-2059",
    "priceRange": "$$",
    "image": "https://clearedgehomebuyers.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "PA",
      "addressCountry": "US"
    },
    "areaServed": [
      { "@type": "City", "name": "Scranton", "addressRegion": "PA" },
      { "@type": "City", "name": "Wilkes-Barre", "addressRegion": "PA" },
      { "@type": "City", "name": "Allentown", "addressRegion": "PA" },
      { "@type": "City", "name": "Bethlehem", "addressRegion": "PA" },
      { "@type": "City", "name": "Hazleton", "addressRegion": "PA" },
      { "@type": "City", "name": "Stroudsburg", "addressRegion": "PA" }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "6"
    },
    "sameAs": []
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}