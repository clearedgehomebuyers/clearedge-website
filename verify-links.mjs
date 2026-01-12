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
    problemDescription
  }
`);

console.log('Blog links per situation:\n');

situations.forEach(s => {
  // Count blocks that have blog links
  const blogLinks = [];
  if (s.problemDescription) {
    s.problemDescription.forEach(block => {
      if (block.markDefs) {
        block.markDefs.forEach(mark => {
          if (mark.href && mark.href.startsWith('/blog/')) {
            blogLinks.push(mark.href);
          }
        });
      }
    });
  }

  console.log(`${s.slug}: ${blogLinks.length} blog links`);
  blogLinks.forEach(link => console.log(`  - ${link}`));
});
