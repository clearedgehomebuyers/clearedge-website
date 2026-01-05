import { createClient } from '@sanity/client';
import { config } from 'dotenv';

config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const newLocations = [
  {
    _type: 'location',
    city: 'Kingston',
    state: 'PA',
    county: 'Luzerne County',
    slug: { _type: 'slug', current: 'kingston' },
    metaTitle: 'Sell Your House Fast in Kingston, PA | Cash Offer in 24 Hours',
    metaDescription: 'We buy houses in Kingston, PA for cash. Get a fair offer in 24 hours. No repairs, no fees, no commissions. Close in as little as 7 days. Call 570-904-2059.',
    heroHeadline: 'Sell Your Kingston House Fast for Cash',
    heroSubheadline: 'Get a fair cash offer in 24 hours. Close in as little as 7 days. No repairs, no fees, no hassle.',
    nearbyTowns: ['Wilkes-Barre', 'Plymouth', 'Edwardsville', 'Forty Fort', 'Swoyersville', 'Luzerne'],
    neighborhoods: ['Kingston Corners', 'Pringle', 'Dorranceton', 'Forty Fort'],
    problemStatement: [
      {
        _type: 'block',
        _key: 'kingston1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'kingston1a',
            marks: [],
            text: "Kingston is a charming borough in Luzerne County with a rich history and tight-knit community. But if you own a property here that you need to sell quickly, the traditional real estate process can be frustrating.\n\nWhether you're dealing with an inherited property, facing financial challenges, or simply need to relocate, ClearEdge Home Buyers offers a fast, hassle-free solution. We buy houses in Kingston and throughout the Wyoming Valley for cash, in any condition. As part of our Eastern Pennsylvania service area, we know this market well and can close on your timeline."
          }
        ]
      }
    ],
    faqs: [
      { _key: 'kfaq1', question: 'How fast can I sell my house in Kingston, PA?', answer: 'We can close on your Kingston property in as little as 7 days. Most deals close within 2-3 weeks, but we work on your timeline.' },
      { _key: 'kfaq2', question: 'Do you buy houses in any condition in Kingston?', answer: 'Yes! We buy houses in any condition throughout Kingston and Luzerne County. No repairs needed.' },
      { _key: 'kfaq3', question: 'Are there any fees when selling to ClearEdge?', answer: 'None. We don\'t charge fees or commissions, and we pay typical closing costs.' }
    ]
  },
  {
    _type: 'location',
    city: 'Dunmore',
    state: 'PA',
    county: 'Lackawanna County',
    slug: { _type: 'slug', current: 'dunmore' },
    metaTitle: 'Sell Your House Fast in Dunmore, PA | Cash Offer in 24 Hours',
    metaDescription: 'We buy houses in Dunmore, PA for cash. Get a fair offer in 24 hours. No repairs, no fees, no commissions. Close in as little as 7 days. Call 570-904-2059.',
    heroHeadline: 'Sell Your Dunmore House Fast for Cash',
    heroSubheadline: 'Get a fair cash offer in 24 hours. Close in as little as 7 days. No repairs, no fees, no hassle.',
    nearbyTowns: ['Scranton', 'Throop', 'Jessup', 'Olyphant', 'Blakely', 'Dickson City'],
    neighborhoods: ['Dunmore Corners', 'Greenwood', 'Boulevard Section'],
    problemStatement: [
      {
        _type: 'block',
        _key: 'dunmore1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'dunmore1a',
            marks: [],
            text: "Dunmore is a welcoming borough adjacent to Scranton with excellent schools and a strong sense of community. But selling a house here through traditional methods can take months.\n\nIf you need to sell your Dunmore property quickly — whether due to inheritance, relocation, divorce, or any other reason — ClearEdge Home Buyers can help. We buy houses in Dunmore and throughout Lackawanna County for cash, regardless of condition. We're local experts serving all of Eastern Pennsylvania."
          }
        ]
      }
    ],
    faqs: [
      { _key: 'dfaq1', question: 'How fast can I sell my house in Dunmore?', answer: 'We can close in as little as 7 days, or on your preferred timeline.' },
      { _key: 'dfaq2', question: 'Do you buy houses that need repairs?', answer: 'Absolutely. We buy houses as-is in any condition.' },
      { _key: 'dfaq3', question: 'What areas near Dunmore do you serve?', answer: 'We serve all of Lackawanna County including Scranton, Throop, Jessup, Olyphant, and surrounding areas.' }
    ]
  },
  {
    _type: 'location',
    city: 'Bloomsburg',
    state: 'PA',
    county: 'Columbia County',
    slug: { _type: 'slug', current: 'bloomsburg' },
    metaTitle: 'Sell Your House Fast in Bloomsburg, PA | Cash Offer in 24 Hours',
    metaDescription: 'We buy houses in Bloomsburg, PA for cash. Get a fair offer in 24 hours. No repairs, no fees, no commissions. Close in as little as 7 days. Call 570-904-2059.',
    heroHeadline: 'Sell Your Bloomsburg House Fast for Cash',
    heroSubheadline: 'Get a fair cash offer in 24 hours. Close in as little as 7 days. No repairs, no fees, no hassle.',
    nearbyTowns: ['Danville', 'Berwick', 'Catawissa', 'Orangeville', 'Benton', 'Millville'],
    neighborhoods: ['Downtown Bloomsburg', 'Iron Street', 'Town Park Area'],
    problemStatement: [
      {
        _type: 'block',
        _key: 'bloom1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'bloom1a',
            marks: [],
            text: "Bloomsburg is the only incorporated town in Pennsylvania and home to Bloomsburg University. Whether you're a landlord tired of managing rental properties near campus or a homeowner needing to sell quickly, the traditional market isn't always the answer.\n\nClearEdge Home Buyers purchases houses in Bloomsburg and Columbia County for cash. We're part of your Eastern PA community and understand the local market. No repairs needed, no agent commissions, and we can close on your schedule."
          }
        ]
      }
    ],
    faqs: [
      { _key: 'bfaq1', question: 'Do you buy rental properties in Bloomsburg?', answer: 'Yes! We buy rental properties, including those with tenants, throughout Bloomsburg and the surrounding area.' },
      { _key: 'bfaq2', question: 'How quickly can you close?', answer: 'We can close in as little as 7 days. Most transactions complete within 2-3 weeks.' },
      { _key: 'bfaq3', question: 'Are there any fees?', answer: 'No fees or commissions. We also cover typical closing costs.' }
    ]
  },
  {
    _type: 'location',
    city: 'Pottsville',
    state: 'PA',
    county: 'Schuylkill County',
    slug: { _type: 'slug', current: 'pottsville' },
    metaTitle: 'Sell Your House Fast in Pottsville, PA | Cash Offer in 24 Hours',
    metaDescription: 'We buy houses in Pottsville, PA for cash. Get a fair offer in 24 hours. No repairs, no fees, no commissions. Close in as little as 7 days. Call 570-904-2059.',
    heroHeadline: 'Sell Your Pottsville House Fast for Cash',
    heroSubheadline: 'Get a fair cash offer in 24 hours. Close in as little as 7 days. No repairs, no fees, no hassle.',
    nearbyTowns: ['Minersville', 'Saint Clair', 'Port Carbon', 'Schuylkill Haven', 'Orwigsburg', 'Tamaqua'],
    neighborhoods: ['Downtown Pottsville', 'Lawtons Hill', 'Mount Carbon', 'Greenwood'],
    problemStatement: [
      {
        _type: 'block',
        _key: 'potts1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'potts1a',
            marks: [],
            text: "Pottsville, the county seat of Schuylkill County, has a proud coal region heritage. Many properties here are older homes that may need significant updates to sell on the traditional market.\n\nIf you own a Pottsville property and need to sell fast — whether it needs repairs, you've inherited it, or you're facing any challenging situation — ClearEdge Home Buyers is here to help. We buy houses throughout Schuylkill County for cash, in any condition. We're part of your Eastern Pennsylvania community."
          }
        ]
      }
    ],
    faqs: [
      { _key: 'pfaq1', question: 'Do you buy older homes in Pottsville?', answer: 'Yes! We buy houses of any age or condition throughout Pottsville and Schuylkill County.' },
      { _key: 'pfaq2', question: 'How fast can I get an offer?', answer: 'We provide cash offers within 24 hours of learning about your property.' },
      { _key: 'pfaq3', question: 'What if my house has code violations?', answer: 'No problem. We buy houses with code violations, liens, and other issues.' }
    ]
  },
  {
    _type: 'location',
    city: 'Pocono Pines',
    state: 'PA',
    county: 'Monroe County',
    slug: { _type: 'slug', current: 'pocono-pines' },
    metaTitle: 'Sell Your House Fast in Pocono Pines, PA | Cash Offer in 24 Hours',
    metaDescription: 'We buy houses in Pocono Pines, PA for cash. Get a fair offer in 24 hours. No repairs, no fees, no commissions. Close in as little as 7 days. Call 570-904-2059.',
    heroHeadline: 'Sell Your Pocono Pines House Fast for Cash',
    heroSubheadline: 'Get a fair cash offer in 24 hours. Close in as little as 7 days. No repairs, no fees, no hassle.',
    nearbyTowns: ['Blakeslee', 'Tobyhanna', 'Lake Harmony', 'Tannersville', 'Mount Pocono', 'Stroudsburg'],
    neighborhoods: ['Lake Naomi', 'Pinecrest Lake', 'Locust Lake Village', 'Stillwater'],
    problemStatement: [
      {
        _type: 'block',
        _key: 'ppines1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'ppines1a',
            marks: [],
            text: "Pocono Pines is a beautiful vacation destination with many seasonal and rental properties. But managing a Poconos property from a distance or dealing with an aging vacation home can become a burden.\n\nWhether you own a cabin, chalet, or single-family home in Pocono Pines, ClearEdge Home Buyers can provide a fast cash solution. We buy properties throughout the Pocono region — vacation homes, rentals, and primary residences alike. We're local to Eastern PA and understand the unique Poconos market."
          }
        ]
      }
    ],
    faqs: [
      { _key: 'ppfaq1', question: 'Do you buy vacation homes in Pocono Pines?', answer: 'Yes! We buy vacation homes, cabins, and chalets throughout the Poconos.' },
      { _key: 'ppfaq2', question: 'Can you buy my property if I live out of state?', answer: 'Absolutely. We work with many out-of-state owners selling Poconos properties.' },
      { _key: 'ppfaq3', question: 'What about HOA properties?', answer: 'We buy properties in HOA communities, including Lake Naomi and other Pocono communities.' }
    ]
  },
  {
    _type: 'location',
    city: 'Tannersville',
    state: 'PA',
    county: 'Monroe County',
    slug: { _type: 'slug', current: 'tannersville' },
    metaTitle: 'Sell Your House Fast in Tannersville, PA | Cash Offer in 24 Hours',
    metaDescription: 'We buy houses in Tannersville, PA for cash. Get a fair offer in 24 hours. No repairs, no fees, no commissions. Close in as little as 7 days. Call 570-904-2059.',
    heroHeadline: 'Sell Your Tannersville House Fast for Cash',
    heroSubheadline: 'Get a fair cash offer in 24 hours. Close in as little as 7 days. No repairs, no fees, no hassle.',
    nearbyTowns: ['Stroudsburg', 'East Stroudsburg', 'Mount Pocono', 'Bartonsville', 'Scotrun', 'Pocono Pines'],
    neighborhoods: ['Camelback Area', 'Pocono Township', 'The Crossings'],
    problemStatement: [
      {
        _type: 'block',
        _key: 'tann1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'tann1a',
            marks: [],
            text: "Tannersville, home to Camelback Resort, is a hub for Poconos tourism. The area features a mix of vacation rentals, year-round homes, and investment properties. But selling here isn't always easy, especially for older properties or those needing updates.\n\nClearEdge Home Buyers purchases houses in Tannersville and throughout Monroe County for cash. Whether you own a vacation rental, inherited a property, or need to sell for any reason, we can help. We're Eastern PA locals who know the Poconos market well."
          }
        ]
      }
    ],
    faqs: [
      { _key: 'tfaq1', question: 'Do you buy properties near Camelback?', answer: 'Yes! We buy properties throughout Tannersville and the Camelback area.' },
      { _key: 'tfaq2', question: 'How fast can you close?', answer: 'We can close in as little as 7 days, or whenever works best for you.' },
      { _key: 'tfaq3', question: 'Do you buy rental properties?', answer: 'Absolutely. We buy vacation rentals and long-term rental properties.' }
    ]
  },
  {
    _type: 'location',
    city: 'Lehigh Valley',
    state: 'PA',
    county: 'Lehigh & Northampton Counties',
    slug: { _type: 'slug', current: 'lehigh-valley' },
    metaTitle: 'Sell Your House Fast in Lehigh Valley, PA | Cash Offer in 24 Hours',
    metaDescription: 'We buy houses in the Lehigh Valley for cash. Allentown, Bethlehem, Easton & more. Get a fair offer in 24 hours. No repairs, no fees. Call 570-904-2059.',
    heroHeadline: 'Sell Your Lehigh Valley House Fast for Cash',
    heroSubheadline: 'Get a fair cash offer in 24 hours. Close in as little as 7 days. No repairs, no fees, no hassle.',
    nearbyTowns: ['Allentown', 'Bethlehem', 'Easton', 'Emmaus', 'Whitehall', 'Northampton', 'Catasauqua', 'Hellertown'],
    neighborhoods: ['South Allentown', 'West Bethlehem', 'Downtown Easton', 'Fountain Hill', 'Freemansburg'],
    problemStatement: [
      {
        _type: 'block',
        _key: 'lv1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'lv1a',
            marks: [],
            text: "The Lehigh Valley — encompassing Allentown, Bethlehem, Easton, and surrounding communities — is one of Pennsylvania's fastest-growing regions. But a competitive market doesn't help if you need to sell quickly or your property needs work.\n\nClearEdge Home Buyers serves the entire Lehigh Valley area. Whether you're in Lehigh County, Northampton County, or anywhere in between, we buy houses for cash in any condition. As Eastern PA specialists, we understand your local market and can close on your timeline."
          }
        ]
      }
    ],
    faqs: [
      { _key: 'lvfaq1', question: 'What Lehigh Valley areas do you serve?', answer: 'We serve all of Lehigh and Northampton Counties, including Allentown, Bethlehem, Easton, Emmaus, Whitehall, and all surrounding areas.' },
      { _key: 'lvfaq2', question: 'How fast can you buy my house?', answer: 'We provide offers within 24 hours and can close in as little as 7 days.' },
      { _key: 'lvfaq3', question: 'Do you buy houses that need major repairs?', answer: 'Yes! We buy houses in any condition — no repairs or cleaning needed.' }
    ]
  },
  {
    _type: 'location',
    city: 'Poconos',
    state: 'PA',
    county: 'Monroe, Pike & Wayne Counties',
    slug: { _type: 'slug', current: 'poconos' },
    metaTitle: 'Sell Your House Fast in the Poconos, PA | Cash Offer in 24 Hours',
    metaDescription: 'We buy houses in the Poconos for cash. Monroe, Pike & Wayne Counties. Get a fair offer in 24 hours. No repairs, no fees. Call 570-904-2059.',
    heroHeadline: 'Sell Your Poconos House Fast for Cash',
    heroSubheadline: 'Get a fair cash offer in 24 hours. Close in as little as 7 days. No repairs, no fees, no hassle.',
    nearbyTowns: ['Stroudsburg', 'East Stroudsburg', 'Mount Pocono', 'Tannersville', 'Pocono Pines', 'Tobyhanna', 'Milford', 'Honesdale'],
    neighborhoods: ['Lake Naomi', 'Camelback', 'Big Boulder', 'Jack Frost', 'Skytop', 'Bushkill'],
    problemStatement: [
      {
        _type: 'block',
        _key: 'poc1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'poc1a',
            marks: [],
            text: "The Pocono Mountains region spans Monroe, Pike, and Wayne Counties, featuring thousands of vacation homes, cabins, and year-round residences. Managing a Poconos property — especially from out of state — can be challenging and expensive.\n\nClearEdge Home Buyers specializes in buying Poconos properties for cash. Whether you own a lakefront cabin, ski chalet, timeshare, or traditional home, we can help. We buy in any condition and handle all the details. We're your local Eastern PA home buyers who know the Poconos market inside and out."
          }
        ]
      }
    ],
    faqs: [
      { _key: 'pocfaq1', question: 'What Poconos areas do you cover?', answer: 'We buy houses throughout Monroe, Pike, and Wayne Counties — all Pocono communities.' },
      { _key: 'pocfaq2', question: 'Do you buy vacation homes and cabins?', answer: 'Yes! We buy all property types including vacation homes, cabins, chalets, and primary residences.' },
      { _key: 'pocfaq3', question: 'I live out of state. Can you still buy my property?', answer: 'Absolutely. We work with many out-of-state owners and handle everything remotely.' },
      { _key: 'pocfaq4', question: 'What about properties in communities with HOA fees?', answer: 'We buy properties in HOA communities, even those with back dues.' }
    ]
  }
];

async function createLocations() {
  console.log('Creating 8 new location pages in Sanity...\n');

  for (const location of newLocations) {
    try {
      const result = await client.create(location);
      console.log(`✓ Created: ${location.city} (${location.slug.current})`);
    } catch (error) {
      console.error(`✗ Failed to create ${location.city}:`, error.message);
    }
  }

  console.log('\nDone! Remember to rebuild/redeploy your site to see the new pages.');
}

async function findAndDeleteDuplicate() {
  console.log('\nChecking for duplicate wilkes-barre entries...');

  const duplicates = await client.fetch(
    `*[_type == "location" && slug.current == "wilkes-barre"] | order(_createdAt asc) { _id, city, _createdAt }`
  );

  if (duplicates.length > 1) {
    console.log(`Found ${duplicates.length} wilkes-barre entries. Deleting duplicate...`);
    // Keep the first (oldest), delete the rest
    for (let i = 1; i < duplicates.length; i++) {
      await client.delete(duplicates[i]._id);
      console.log(`✓ Deleted duplicate: ${duplicates[i]._id}`);
    }
  } else {
    console.log('No duplicates found.');
  }
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('Error: SANITY_API_TOKEN not found in .env.local');
    console.error('Add your Sanity API token to .env.local and try again.');
    process.exit(1);
  }

  await createLocations();
  await findAndDeleteDuplicate();
}

main().catch(console.error);
