import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env.local') });

const client = createClient({
  projectId: 'd78o4wq2',
  dataset: 'production',
  apiVersion: '2026-01-02',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function fixBlogLink() {
  console.log('Fetching blog post: sell-my-house-fast-dunmore-mine-subsidence...');

  const post = await client.fetch(`
    *[_type == "blogPost" && slug.current == "sell-my-house-fast-dunmore-mine-subsidence"][0] {
      _id,
      title,
      content
    }
  `);

  if (!post) {
    console.log('Blog post not found!');
    return;
  }

  console.log(`Found post: ${post.title}`);

  // Find and fix links in the content
  let linkFixed = false;
  const updatedContent = post.content.map(block => {
    if (block._type === 'block' && block.markDefs) {
      const updatedMarkDefs = block.markDefs.map(markDef => {
        if (markDef._type === 'link' && markDef.href === '/locations/lackawanna-county') {
          console.log(`  Found broken link: ${markDef.href} -> /locations/scranton`);
          linkFixed = true;
          return { ...markDef, href: '/locations/scranton' };
        }
        return markDef;
      });
      return { ...block, markDefs: updatedMarkDefs };
    }
    return block;
  });

  if (!linkFixed) {
    console.log('No broken links found in this post.');
    return;
  }

  // Update the document
  try {
    await client.patch(post._id)
      .set({ content: updatedContent })
      .commit();

    console.log('SUCCESS: Blog post updated!');
    console.log('  Changed: /locations/lackawanna-county -> /locations/scranton');
  } catch (err) {
    console.log('ERROR:', err.message);
  }
}

fixBlogLink().catch(console.error);
