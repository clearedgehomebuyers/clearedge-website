import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'd78o4wq2',
  dataset: 'production',
  apiVersion: '2026-01-02',
  useCdn: false,
});

const locations = await client.fetch(`
  *[_type == "location"] | order(city asc) {
    city,
    state,
    county,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    heroHeadline,
    heroSubheadline,
    problemStatement,
    neighborhoods,
    nearbyTowns,
    faqs,
    "relatedSituations": relatedSituations[]->{title, "slug": slug.current}
  }
`);

// Helper to extract text from Portable Text blocks
function extractText(blocks) {
  if (!blocks) return '';
  return blocks
    .filter(block => block._type === 'block')
    .map(block => {
      if (block.children) {
        return block.children
          .filter(child => child._type === 'span')
          .map(span => span.text)
          .join('');
      }
      return '';
    })
    .join('\n\n');
}

console.log(`Found ${locations.length} locations:\n`);

locations.forEach((loc, index) => {
  console.log(`${'='.repeat(80)}`);
  console.log(`LOCATION ${index + 1}: ${loc.city}, ${loc.state}`);
  console.log(`${'='.repeat(80)}`);
  console.log(`Slug: ${loc.slug}`);
  console.log(`County: ${loc.county || 'Not set'}`);
  console.log(`\nMeta Title: ${loc.metaTitle || 'NOT SET'}`);
  console.log(`Meta Description: ${loc.metaDescription || 'NOT SET'}`);
  console.log(`\nHero Headline: ${loc.heroHeadline || 'NOT SET'}`);
  console.log(`Hero Subheadline: ${loc.heroSubheadline || 'NOT SET'}`);

  const problemText = extractText(loc.problemStatement);
  console.log(`\nProblem Statement: ${problemText ? problemText.substring(0, 500) + (problemText.length > 500 ? '...' : '') : 'NOT SET'}`);

  console.log(`\nNeighborhoods: ${loc.neighborhoods && loc.neighborhoods.length > 0 ? loc.neighborhoods.join(', ') : 'NOT SET'}`);
  console.log(`Nearby Towns: ${loc.nearbyTowns && loc.nearbyTowns.length > 0 ? loc.nearbyTowns.join(', ') : 'NOT SET'}`);

  console.log(`\nFAQs: ${loc.faqs && loc.faqs.length > 0 ? loc.faqs.length + ' questions' : 'NOT SET'}`);
  if (loc.faqs && loc.faqs.length > 0) {
    loc.faqs.forEach((faq, i) => {
      console.log(`  ${i + 1}. Q: ${faq.question}`);
      console.log(`     A: ${faq.answer ? faq.answer.substring(0, 150) + (faq.answer.length > 150 ? '...' : '') : 'No answer'}`);
    });
  }

  console.log(`\nRelated Situations: ${loc.relatedSituations && loc.relatedSituations.length > 0 ? loc.relatedSituations.map(s => s.slug).join(', ') : 'NOT SET'}`);
  console.log('\n');
});

// Summary table
console.log('\n' + '='.repeat(80));
console.log('SUMMARY TABLE');
console.log('='.repeat(80));
console.log('Location | Meta | Hero | Problem | Neighborhoods | FAQs | Related');
console.log('-'.repeat(80));
locations.forEach(loc => {
  const hasMeta = loc.metaTitle ? '✓' : '✗';
  const hasHero = loc.heroHeadline ? '✓' : '✗';
  const hasProblem = loc.problemStatement ? '✓' : '✗';
  const hasNeighborhoods = loc.neighborhoods && loc.neighborhoods.length > 0 ? '✓' : '✗';
  const hasFaqs = loc.faqs && loc.faqs.length > 0 ? loc.faqs.length : '✗';
  const hasRelated = loc.relatedSituations && loc.relatedSituations.length > 0 ? loc.relatedSituations.length : '✗';
  console.log(`${loc.slug.padEnd(20)} | ${hasMeta.padEnd(4)} | ${hasHero.padEnd(4)} | ${hasProblem.padEnd(7)} | ${hasNeighborhoods.padEnd(13)} | ${String(hasFaqs).padEnd(4)} | ${hasRelated}`);
});
