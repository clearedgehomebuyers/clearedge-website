import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'd78o4wq2',
  dataset: 'production',
  apiVersion: '2026-01-02',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Helper to create a Portable Text block with a link
function createLinkBlock(beforeText, linkText, href, keyPrefix) {
  const linkKey = `link-${keyPrefix}`;
  return {
    _type: 'block',
    _key: `block-${keyPrefix}-${Date.now()}`,
    style: 'normal',
    markDefs: [{
      _type: 'link',
      _key: linkKey,
      href: href,
    }],
    children: [
      {
        _type: 'span',
        _key: `span-before-${keyPrefix}`,
        marks: [],
        text: beforeText,
      },
      {
        _type: 'span',
        _key: `span-link-${keyPrefix}`,
        marks: [linkKey],
        text: linkText,
      },
    ],
  };
}

// Define blog links to add for each situation
const blogLinksToAdd = {
  'foreclosure': [
    { beforeText: '', linkText: 'Read: How to Stop a Berks County Judicial Sale', href: '/blog/how-to-stop-berks-county-judicial-sale-2026' },
  ],
  'inherited-property': [
    { beforeText: '', linkText: 'Read: How to Sell a Hoarder House in PA Without Cleanout', href: '/blog/sell-hoarder-house-reading-pa-without-cleanout' },
  ],
  'divorce': [
    { beforeText: '', linkText: 'Read: How to Sell Your House Fast During Divorce in Lehigh County', href: '/blog/sell-house-fast-during-divorce-lehigh-county-pa' },
  ],
  'job-relocation': [
    { beforeText: '', linkText: 'Read: Pennsylvania Job Relocation Home Buyout Guide', href: '/blog/pennsylvania-job-relocation-home-buyout-fast-equity-release-2026' },
  ],
  'major-repairs': [
    { beforeText: '', linkText: 'Read: Selling a House with Mine Subsidence in Dunmore', href: '/blog/sell-my-house-fast-dunmore-mine-subsidence' },
    { beforeText: '', linkText: 'Read: Selling a Water-Damaged House with Mold Issues', href: '/blog/selling-water-damaged-house-18102-mold-issues' },
    { beforeText: '', linkText: 'Read: Scranton Structural Damage Disclosure Requirements', href: '/blog/scranton-pa-major-structural-damage-disclosure-law-2026' },
  ],
  'tax-liens-code-violations': [
    { beforeText: '', linkText: 'Read: Selling a House with Code Violations in Wilkes-Barre', href: '/blog/sell-house-wilkes-barre-code-violations' },
    { beforeText: '', linkText: 'Read: Selling a House with Tax Liens in Bethlehem', href: '/blog/sell-my-house-fast-bethlehem-pa-18015-tax-lien' },
    { beforeText: '', linkText: 'Read: Understanding PA Act 135 Blighted Property Conservatorship', href: '/blog/pennsylvania-act-135-blighted-property-conservatorship-help-owner-rights' },
    { beforeText: '', linkText: 'Read: How to Stop GovOS Fines on Your Poconos House', href: '/blog/stop-govos-fines-poconos-house' },
    { beforeText: '', linkText: 'Read: Selling a House with IPMC Violations in Bethlehem', href: '/blog/selling-house-international-property-maintenance-code-violations-bethlehem' },
  ],
  'tired-landlord': [
    { beforeText: '', linkText: 'Read: Luzerne County Rental Property Registration Requirements', href: '/blog/luzerne-county-rental-property-registration-inspection-requirements-2026' },
    { beforeText: '', linkText: 'Read: Easton PA Rental Inspection Checklist 2026', href: '/blog/easton-pa-rental-inspection-checklist-2026' },
    { beforeText: '', linkText: 'Read: Hazleton Residential Occupancy Inspection Checklist', href: '/blog/hazleton-residential-occupancy-inspection-checklist' },
  ],
  'vacant-property': [
    { beforeText: '', linkText: 'Read: Sell Your House Fast in the Poconos', href: '/blog/sell-my-house-fast-poconos-pa' },
  ],
};

async function addBlogLinks() {
  console.log('Adding blog links to situation problemDescriptions...\n');

  for (const [slug, links] of Object.entries(blogLinksToAdd)) {
    console.log(`Processing: ${slug}`);

    // Fetch current situation
    const situation = await client.fetch(
      `*[_type == "situation" && slug.current == $slug][0]{ _id, problemDescription }`,
      { slug }
    );

    if (!situation) {
      console.log(`  WARNING: No situation found with slug "${slug}"`);
      continue;
    }

    // Get current problemDescription blocks
    const currentBlocks = situation.problemDescription || [];

    // Create new link blocks
    const newLinkBlocks = links.map((link, i) =>
      createLinkBlock(link.beforeText, link.linkText, link.href, `${slug}-new-${i}`)
    );

    // Combine: existing blocks + new link blocks
    const updatedBlocks = [...currentBlocks, ...newLinkBlocks];

    // Update the document
    try {
      await client.patch(situation._id)
        .set({ problemDescription: updatedBlocks })
        .commit();

      console.log(`  ✓ Added ${links.length} blog link(s) to ${slug}`);
      links.forEach(link => {
        console.log(`    - ${link.href}`);
      });
    } catch (error) {
      console.error(`  ✗ Error updating ${slug}:`, error.message);
    }
  }

  console.log('\n✓ All blog links added!');
}

addBlogLinks().catch(console.error);
