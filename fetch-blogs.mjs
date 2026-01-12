import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'd78o4wq2',
  dataset: 'production',
  apiVersion: '2026-01-02',
  useCdn: false,
});

const posts = await client.fetch(`
  *[_type == "blogPost"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    category,
    author,
    content
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

console.log(`Found ${posts.length} blog posts:\n`);

posts.forEach((post, index) => {
  console.log(`${'='.repeat(80)}`);
  console.log(`BLOG ${index + 1}: ${post.title}`);
  console.log(`${'='.repeat(80)}`);
  console.log(`Slug: ${post.slug}`);
  console.log(`Category: ${post.category || 'None'}`);
  console.log(`Published: ${post.publishedAt || 'Not set'}`);

  const bodyText = extractText(post.content);
  const wordCount = bodyText.split(/\s+/).length;
  const truncatedBody = bodyText.length > 1500
    ? bodyText.substring(0, 1500) + '...[TRUNCATED]'
    : bodyText;

  console.log(`Word count: ~${wordCount}`);
  console.log(`\nExcerpt: ${post.excerpt || 'None'}`);
  console.log(`\n--- CONTENT PREVIEW ---`);
  console.log(truncatedBody || 'No content');
  console.log('\n');
});
