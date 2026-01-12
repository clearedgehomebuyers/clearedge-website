import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'd78o4wq2',
  dataset: 'production',
  apiVersion: '2026-01-02',
  useCdn: false,
});

const targetSlugs = ['scranton', 'allentown', 'stroudsburg', 'wilkes-barre', 'carbondale'];

const locations = await client.fetch(`
  *[_type == "location" && slug.current in $slugs] | order(city asc) {
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
`, { slugs: targetSlugs });

// Helper to extract text from Portable Text blocks, preserving links
function extractText(blocks) {
  if (!blocks) return 'NOT SET';
  return blocks
    .map(block => {
      if (block._type === 'block' && block.children) {
        let text = '';
        const linkDefs = block.markDefs || [];

        block.children.forEach(child => {
          if (child._type === 'span') {
            // Check if this span has a link mark
            const hasLink = child.marks && child.marks.some(mark =>
              linkDefs.find(def => def._key === mark && def._type === 'link')
            );
            if (hasLink) {
              const linkDef = linkDefs.find(def => child.marks.includes(def._key));
              text += `[${child.text}](${linkDef?.href || ''})`;
            } else {
              text += child.text;
            }
          }
        });
        return text;
      }
      return '';
    })
    .filter(t => t)
    .join('\n\n');
}

locations.forEach((loc) => {
  console.log('\n' + '='.repeat(100));
  console.log(`LOCATION: ${loc.city}, ${loc.state}`);
  console.log('='.repeat(100));

  console.log(`\nSlug: ${loc.slug}`);
  console.log(`County: ${loc.county || 'NOT SET'}`);

  console.log('\n--- META ---');
  console.log(`metaTitle: ${loc.metaTitle || 'NOT SET'}`);
  console.log(`\nmetaDescription: ${loc.metaDescription || 'NOT SET'}`);

  console.log('\n--- HERO ---');
  console.log(`heroHeadline: ${loc.heroHeadline || 'NOT SET'}`);
  console.log(`\nheroSubheadline: ${loc.heroSubheadline || 'NOT SET'}`);

  console.log('\n--- PROBLEM STATEMENT (FULL) ---');
  console.log(extractText(loc.problemStatement));

  console.log('\n--- NEIGHBORHOODS ---');
  if (loc.neighborhoods && loc.neighborhoods.length > 0) {
    loc.neighborhoods.forEach((n, i) => console.log(`  ${i + 1}. ${n}`));
  } else {
    console.log('NOT SET');
  }

  console.log('\n--- NEARBY TOWNS ---');
  if (loc.nearbyTowns && loc.nearbyTowns.length > 0) {
    loc.nearbyTowns.forEach((t, i) => console.log(`  ${i + 1}. ${t}`));
  } else {
    console.log('NOT SET');
  }

  console.log('\n--- FAQS ---');
  if (loc.faqs && loc.faqs.length > 0) {
    loc.faqs.forEach((faq, i) => {
      console.log(`\n  FAQ ${i + 1}:`);
      console.log(`  Q: ${faq.question}`);
      console.log(`  A: ${faq.answer}`);
    });
  } else {
    console.log('NOT SET');
  }

  console.log('\n--- RELATED SITUATIONS ---');
  if (loc.relatedSituations && loc.relatedSituations.length > 0) {
    loc.relatedSituations.forEach((s, i) => console.log(`  ${i + 1}. ${s.title} (${s.slug})`));
  } else {
    console.log('NOT SET');
  }

  console.log('\n');
});
