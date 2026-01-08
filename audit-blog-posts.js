const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'd78o4wq2',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2024-01-01',
});

async function auditBlogPosts() {
  const posts = await client.fetch(`
    *[_type == 'blogPost'] | order(publishedAt desc) {
      _id,
      title,
      'slug': slug.current,
      publishedAt,
      category,
      author,
      authorTitle,
      metaTitle,
      metaDescription,
      excerpt,
      'relatedLocations': relatedLocations[]->{ city, 'slug': slug.current },
      'contentBlockCount': count(content),
      'hasFaqs': defined(faqs) && count(faqs) > 0,
      'faqCount': count(faqs)
    }
  `);

  console.log('╔══════════════════════════════════════════════════════════════════╗');
  console.log('║           SANITY CMS BLOG CONTENT AUDIT - January 2026           ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`Total Blog Posts: ${posts.length}`);
  console.log('');

  // Category breakdown
  const categories = {};
  posts.forEach(p => {
    const cat = p.category || 'uncategorized';
    categories[cat] = (categories[cat] || 0) + 1;
  });
  console.log('Category Breakdown:');
  Object.entries(categories).forEach(([cat, count]) => {
    console.log(`  - ${cat}: ${count} posts`);
  });
  console.log('');

  // Location coverage
  const locationCounts = {};
  posts.forEach(p => {
    (p.relatedLocations || []).forEach(loc => {
      locationCounts[loc.city] = (locationCounts[loc.city] || 0) + 1;
    });
  });
  console.log('Location Coverage:');
  Object.entries(locationCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([loc, count]) => {
      console.log(`  - ${loc}: ${count} posts`);
    });
  console.log('');

  // Quality metrics
  const withMetaTitle = posts.filter(p => p.metaTitle).length;
  const withMetaDesc = posts.filter(p => p.metaDescription).length;
  const withFaqs = posts.filter(p => p.hasFaqs).length;
  const withLocations = posts.filter(p => p.relatedLocations && p.relatedLocations.length > 0).length;

  console.log('Quality Metrics:');
  console.log(`  - Posts with Meta Title: ${withMetaTitle}/${posts.length} (${Math.round(withMetaTitle/posts.length*100)}%)`);
  console.log(`  - Posts with Meta Description: ${withMetaDesc}/${posts.length} (${Math.round(withMetaDesc/posts.length*100)}%)`);
  console.log(`  - Posts with FAQs: ${withFaqs}/${posts.length} (${Math.round(withFaqs/posts.length*100)}%)`);
  console.log(`  - Posts with Location Tags: ${withLocations}/${posts.length} (${Math.round(withLocations/posts.length*100)}%)`);
  console.log('');

  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('DETAILED POST LIST');
  console.log('═══════════════════════════════════════════════════════════════════');

  posts.forEach((post, i) => {
    console.log('');
    console.log(`${i + 1}. ${post.title}`);
    console.log(`   URL: /blog/${post.slug}`);
    console.log(`   Published: ${post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'NOT SET'}`);
    console.log(`   Category: ${post.category || 'NOT SET'}`);
    console.log(`   Author: ${post.author || 'NOT SET'}`);
    console.log(`   Content Blocks: ${post.contentBlockCount || 0}`);
    console.log(`   FAQs: ${post.faqCount || 0} questions`);
    console.log(`   Locations: ${post.relatedLocations?.map(l => l.city).join(', ') || 'NONE'}`);

    // Quality flags
    const issues = [];
    if (!post.metaTitle) issues.push('Missing meta title');
    if (!post.metaDescription) issues.push('Missing meta description');
    if (!post.excerpt) issues.push('Missing excerpt');
    if (!post.relatedLocations || post.relatedLocations.length === 0) issues.push('No location tags');
    if (!post.hasFaqs) issues.push('No FAQs');

    if (issues.length > 0) {
      console.log(`   ⚠️  Issues: ${issues.join(', ')}`);
    } else {
      console.log(`   ✅ All fields complete`);
    }
  });

  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('END OF AUDIT');
  console.log('═══════════════════════════════════════════════════════════════════');
}

auditBlogPosts().catch(console.error);
