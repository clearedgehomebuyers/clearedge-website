import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'd78o4wq2',
  dataset: 'production',
  apiVersion: '2026-01-02',
  useCdn: false,
});

const situations = await client.fetch(`
  *[_type == "situation"] | order(title asc) {
    title,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    heroHeadline,
    heroSubheadline,
    problemDescription,
    benefits,
    faqs,
    "relatedLocations": relatedLocations[]->{city, state, "slug": slug.current}
  }
`);

console.log(JSON.stringify(situations, null, 2));
