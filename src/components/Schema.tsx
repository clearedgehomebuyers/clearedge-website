export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ClearEdge Home Buyers",
    "description": "We buy houses for cash in Eastern Pennsylvania. Get a fair cash offer in 24 hours. No repairs, no fees, no commissions.",
    "url": "https://www.clearedgehomebuyers.com",
    "telephone": "+1-570-904-2059",
    "priceRange": "$$",
    "image": "https://www.clearedgehomebuyers.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "PA",
      "addressCountry": "US"
    },
    "areaServed": [
      { "@type": "City", "name": "Scranton, PA" },
      { "@type": "City", "name": "Wilkes-Barre, PA" },
      { "@type": "City", "name": "Allentown, PA" },
      { "@type": "City", "name": "Bethlehem, PA" },
      { "@type": "City", "name": "Hazleton, PA" },
      { "@type": "City", "name": "Stroudsburg, PA" }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "6"
    },
    "sameAs": [
      "https://www.google.com/maps/place/ClearEdge+Home+Buyers/@40.8549077,-77.1384215,8z/data=!3m1!4b1!4m6!3m5!1s0x86c99f735e7188af:0x29be5485d539b1f9!8m2!3d40.8603424!4d-75.8193544!16s%2Fg%2F11l299ntxm"
    ]
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