export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ClearEdge Home Buyers",
    "alternateName": "ClearEdge",
    "url": "https://www.clearedgehomebuyers.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.clearedgehomebuyers.com/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ClearEdge Home Buyers",
    "legalName": "ClearEdge Properties LLC",
    "url": "https://www.clearedgehomebuyers.com",
    "logo": "https://www.clearedgehomebuyers.com/logo.webp",
    "telephone": "+1-610-904-8526",
    "email": "info@clearedgehomebuyers.com",
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61578297005995",
      "https://www.instagram.com/clearedge_home_buyers/",
      "https://www.google.com/maps/place/ClearEdge+Home+Buyers/@40.8603424,-75.8193544,8z/data=!3m1!4b1!4m6!3m5!1s0x86c99f735e7188af:0x29be5485d539b1f9!8m2!3d40.8603424!4d-75.8193544!16s%2Fg%2F11l299ntxm",
      "https://www.bbb.org/us/ny/long-is-city/profile/real-estate/clearedge-properties-llc-0121-87169161"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ClearEdge Home Buyers",
    "description": "We buy houses for cash in Eastern Pennsylvania. Get a fair cash offer in 24 hours. No repairs, no fees, no commissions.",
    "url": "https://www.clearedgehomebuyers.com",
    "telephone": "+1-610-904-8526",
    "email": "info@clearedgehomebuyers.com",
    "priceRange": "$$",
    "image": "https://www.clearedgehomebuyers.com/logo.webp",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "PA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.8603424,
      "longitude": -75.8193544
    },
    "areaServed": [
      { "@type": "City", "name": "Scranton" },
      { "@type": "City", "name": "Wilkes-Barre" },
      { "@type": "City", "name": "Allentown" },
      { "@type": "City", "name": "Bethlehem" },
      { "@type": "City", "name": "Easton" },
      { "@type": "City", "name": "Reading" },
      { "@type": "City", "name": "Hazleton" },
      { "@type": "City", "name": "Stroudsburg" },
      { "@type": "City", "name": "East Stroudsburg" },
      { "@type": "City", "name": "Honesdale" },
      { "@type": "City", "name": "Carbondale" },
      { "@type": "City", "name": "Pittston" },
      { "@type": "City", "name": "Kingston" },
      { "@type": "City", "name": "Nanticoke" },
      { "@type": "City", "name": "Dunmore" },
      { "@type": "City", "name": "Bloomsburg" },
      { "@type": "City", "name": "Pottsville" },
      { "@type": "City", "name": "Pocono Pines" },
      { "@type": "City", "name": "Tannersville" },
      { "@type": "Place", "name": "Lehigh Valley" },
      { "@type": "Place", "name": "Poconos" },
      { "@type": "AdministrativeArea", "name": "Lackawanna County" },
      { "@type": "AdministrativeArea", "name": "Luzerne County" },
      { "@type": "AdministrativeArea", "name": "Lehigh County" },
      { "@type": "AdministrativeArea", "name": "Northampton County" },
      { "@type": "AdministrativeArea", "name": "Berks County" },
      { "@type": "AdministrativeArea", "name": "Monroe County" },
      { "@type": "AdministrativeArea", "name": "Wayne County" },
      { "@type": "AdministrativeArea", "name": "Columbia County" },
      { "@type": "AdministrativeArea", "name": "Schuylkill County" },
      { "@type": "AdministrativeArea", "name": "Carbon County" },
      { "@type": "AdministrativeArea", "name": "Pike County" },
      { "@type": "State", "name": "Pennsylvania" },
      { "@type": "Place", "name": "Eastern Pennsylvania" },
      { "@type": "Place", "name": "Northeastern Pennsylvania" }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "6"
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61578297005995",
      "https://www.instagram.com/clearedge_home_buyers/",
      "https://www.google.com/maps/place/ClearEdge+Home+Buyers/@40.8603424,-75.8193544,8z/data=!3m1!4b1!4m6!3m5!1s0x86c99f735e7188af:0x29be5485d539b1f9!8m2!3d40.8603424!4d-75.8193544!16s%2Fg%2F11l299ntxm",
      "https://www.bbb.org/us/ny/long-is-city/profile/real-estate/clearedge-properties-llc-0121-87169161"
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
