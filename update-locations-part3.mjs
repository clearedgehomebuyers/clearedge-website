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

// Helper to convert text with markdown links to Portable Text
function textToPortableText(text) {
  const paragraphs = text.split('\n\n').filter(p => p.trim());

  return paragraphs.map((paragraph, pIndex) => {
    // Check if this is a link-only paragraph (starts with [Read:)
    if (paragraph.trim().startsWith('[Read:')) {
      const linkMatch = paragraph.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        const linkKey = `link_${pIndex}_0`;
        return {
          _type: 'block',
          _key: `block_${pIndex}`,
          style: 'normal',
          markDefs: [{
            _type: 'link',
            _key: linkKey,
            href: linkMatch[2]
          }],
          children: [{
            _type: 'span',
            _key: `span_${pIndex}_0`,
            marks: [linkKey],
            text: linkMatch[1]
          }]
        };
      }
    }

    // Regular paragraph - check for inline links
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    const markDefs = [];
    let lastIndex = 0;
    let match;
    let linkIndex = 0;

    while ((match = linkRegex.exec(paragraph)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push({
          _type: 'span',
          _key: `span_${pIndex}_${parts.length}`,
          marks: [],
          text: paragraph.substring(lastIndex, match.index)
        });
      }

      // Add the link
      const linkKey = `link_${pIndex}_${linkIndex}`;
      markDefs.push({
        _type: 'link',
        _key: linkKey,
        href: match[2]
      });
      parts.push({
        _type: 'span',
        _key: `span_${pIndex}_${parts.length}`,
        marks: [linkKey],
        text: match[1]
      });

      lastIndex = match.index + match[0].length;
      linkIndex++;
    }

    // Add remaining text after last link
    if (lastIndex < paragraph.length) {
      parts.push({
        _type: 'span',
        _key: `span_${pIndex}_${parts.length}`,
        marks: [],
        text: paragraph.substring(lastIndex)
      });
    }

    // If no links found, just create a simple text span
    if (parts.length === 0) {
      parts.push({
        _type: 'span',
        _key: `span_${pIndex}_0`,
        marks: [],
        text: paragraph
      });
    }

    return {
      _type: 'block',
      _key: `block_${pIndex}`,
      style: 'normal',
      markDefs,
      children: parts
    };
  });
}

// Fetch situation IDs by slugs
async function getSituationIds(slugs) {
  const situations = await client.fetch(`
    *[_type == "situation" && slug.current in $slugs] {
      _id,
      "slug": slug.current
    }
  `, { slugs });

  const idMap = {};
  situations.forEach(s => {
    idMap[s.slug] = s._id;
  });
  return idMap;
}

// Location data for Part 3 (7 locations: 15-21)
const locationUpdates = [
  {
    slug: 'honesdale',
    metaTitle: 'Sell Your House Fast in Honesdale, PA | Wayne County Cash Buyer | ClearEdge',
    metaDescription: 'Need to sell your Honesdale house fast? ClearEdge buys homes as-is for cash — older properties, estates, any condition. No repairs, no realtor delays. Call Tyler: (570) 904-2059.',
    heroHeadline: 'Sell Your Honesdale Property Fast — Country Character, City-Speed Closing',
    heroSubheadline: 'Wayne County real estate moves at its own pace. When you need to sell faster than the local market allows, we buy houses as-is for cash. No repairs, no waiting for the right buyer.',
    problemStatement: `Honesdale has small-town charm that the Lehigh Valley and NEPA cities can't match. But that charm doesn't translate to fast real estate transactions.

The buyer pool here is genuinely limited. Wayne County doesn't have the population density that generates quick sales. Properties sit on the market for months, sometimes longer. If your house needs work — or if it's priced above what local buyers can finance — you're looking at a long wait with no guarantee of a sale.

Rural properties come with complications that suburban buyers don't face. Well water systems that need updates. Septic tanks that haven't been inspected in years. Heating systems sized for 1950s energy costs running on 2020s fuel prices. When a buyer's home inspection uncovers these issues, deals fall apart.

Then there's the inheritance situation. Honesdale and Wayne County have families who've owned the same properties for generations. When that property passes to heirs who moved away decades ago, they're stuck managing a house from Philadelphia or New Jersey — or further. You can't keep driving three hours every time something needs attention, but you also can't find a buyer who'll pay what the property is worth.

Maybe you inherited a farmhouse on a county road and have no idea what to do with it. Maybe you've got a property near the Stourbridge Lion replica that needs more work than you can afford. Maybe you bought a weekend place years ago and haven't visited in five.

We buy houses throughout Wayne County — Honesdale, the townships, and the rural areas in between. We understand well and septic issues, rural property complications, and what it takes to close when the local market isn't producing buyers. You don't need to update the well system. You don't need to pump the septic. You just need a fair offer from someone who'll actually close.

[Read: Sell Your House Fast in the Poconos](/blog/sell-my-house-fast-poconos-pa)

[Read: Cash Home Buyers in Lackawanna County — No Fees](/blog/cash-home-buyers-lackawanna-county-no-fees)`,
    neighborhoods: ['Downtown Honesdale', 'Main Street corridor', 'Church Street area', 'Texas Township', 'Dyberry Township', 'Berlin Township', 'Cherry Ridge', 'Bethany (border)', 'Prompton area', 'White Mills'],
    nearbyTowns: ['Hawley', 'Lakeville', 'Waymart', 'Bethany', 'Prompton', 'Lake Ariel', 'Hamlin'],
    faqs: [
      {
        _key: 'faq1',
        question: 'Do you buy rural properties with acreage?',
        answer: 'Yes. We buy properties ranging from village lots to houses with several acres. The acreage and location affect our offer, but we\'re interested in all types of Wayne County properties.'
      },
      {
        _key: 'faq2',
        question: 'What about properties with well and septic issues?',
        answer: 'Well and septic systems are standard in rural Wayne County, and we buy properties regardless of their condition. Failed septic, low-yield wells, outdated systems — we factor these into our offer and handle repairs after closing.'
      },
      {
        _key: 'faq3',
        question: 'Why is selling traditionally so slow in Honesdale?',
        answer: 'Limited buyer pool and rural property complications. Wayne County doesn\'t have the population to generate quick sales, and many buyers struggle to finance properties with well/septic issues or significant repair needs. We pay cash and bypass those obstacles.'
      },
      {
        _key: 'faq4',
        question: 'Can you buy inherited properties with title complications?',
        answer: 'Yes. Properties that have been in families for generations sometimes have title issues — old easements, unclear boundaries, estate complications. We work through these issues as part of the closing process.'
      },
      {
        _key: 'faq5',
        question: 'I live far away — is that a problem?',
        answer: 'Not at all. Many Wayne County properties are owned by people who live elsewhere. We handle everything remotely — virtual walkthroughs, electronic documents, mobile notary for closing. You don\'t need to make multiple trips.'
      }
    ],
    relatedSituationSlugs: ['inherited-property', 'vacant-property', 'major-repairs', 'job-relocation', 'tired-landlord']
  },
  {
    slug: 'pottsville',
    metaTitle: 'Sell Your House Fast in Pottsville, PA | Schuylkill County Cash Buyer | ClearEdge',
    metaDescription: 'Need to sell your Pottsville house fast? ClearEdge buys homes as-is for cash — mine subsidence, foundation issues, any condition. No repairs, no waiting. Call Tyler: (570) 904-2059.',
    heroHeadline: 'Sell Your Pottsville House Fast — Coal Country Challenges, Simple Solution',
    heroSubheadline: 'Schuylkill County\'s mining legacy complicates real estate, but it doesn\'t have to complicate your sale. We buy houses as-is for cash — foundation issues, outdated systems, any condition.',
    problemStatement: `Pottsville is Schuylkill County's heart, but the anthracite industry that built this city left behind challenges that still shape every real estate transaction.

Start with what's underground. The mines that made this region prosperous also left a maze of tunnels, voids, and unstable ground. Mine subsidence isn't theoretical in Pottsville — it's why foundations crack, walls shift, and traditional buyers can't get financing. When a lender's appraiser sees subsidence risk on the report, the deal dies. It happens constantly in coal country.

The housing stock tells the same story. Pottsville's Victorian homes and row houses were built during the coal boom — 1870s through 1920s. They have architectural character you can't replicate today, but they also have century-old foundations, original wiring, galvanized plumbing, and heating systems designed for a different era. Traditional buyers want move-in ready. What they see in Pottsville often requires renovation budgets that exceed the after-repair value.

The local market compounds everything. Schuylkill County doesn't have the buyer traffic of the Lehigh Valley or even Scranton. Properties sit for months. Price reductions don't generate offers when there aren't enough buyers to begin with. You're stuck paying taxes and insurance on a house that may never sell conventionally.

Maybe you inherited a row home on Mahantongo Street from a grandparent who lived there for sixty years. Maybe you've owned a rental on Market Street that's been more headache than income. Maybe you bought one of the beautiful Victorians on Howard Avenue planning to restore it, but the project overwhelmed you.

We've been buying houses in Pottsville and throughout Schuylkill County for years. We understand the subsidence maps, the housing stock, and what properties actually sell for in this market. You don't need to stabilize the foundation. You don't need to find a buyer who can get financing. You just need a fair cash offer and a buyer who'll actually close.

[Read: Cash Home Buyers in Pottsville, PA](/blog/cash-home-buyers-pottsville-pa)

[Read: Selling a House with Mine Subsidence in Dunmore](/blog/sell-my-house-fast-dunmore-mine-subsidence)`,
    neighborhoods: ['Downtown Pottsville', 'Mahantongo Street corridor', 'Market Street area', 'Howard Avenue (Victorian district)', 'Greenwood Hill', 'Lawton\'s Hill', 'Mount Carbon (border)', 'Palo Alto (border)'],
    nearbyTowns: ['Minersville', 'Saint Clair', 'Port Carbon', 'Schuylkill Haven', 'Orwigsburg', 'Mount Carbon', 'Cressona'],
    faqs: [
      {
        _key: 'faq1',
        question: 'Do you buy houses with mine subsidence in Pottsville?',
        answer: 'Yes. Schuylkill County has extensive underground mining, and many Pottsville properties have subsidence-related damage. Traditional buyers can\'t finance these homes. We pay cash and take on the risk — no subsidence report required for our purchase.'
      },
      {
        _key: 'faq2',
        question: 'Why is the Pottsville market so slow?',
        answer: 'Limited buyer pool, older housing stock that needs significant updates, and mine subsidence that complicates financing. These factors create long market times. We bypass those obstacles with cash purchases.'
      },
      {
        _key: 'faq3',
        question: 'What about the historic Victorian homes?',
        answer: 'We appreciate Pottsville\'s architectural heritage. We\'ve bought Victorians on Howard Avenue, row homes downtown, and everything in between. Age and condition don\'t disqualify a property — they just factor into our offer.'
      },
      {
        _key: 'faq4',
        question: 'How do you calculate your offer?',
        answer: 'We estimate after-repair value, subtract renovation costs and our margin. In Pottsville, where renovation costs often approach property values, we\'re transparent about the math. Sometimes the numbers work; sometimes they\'re tight — but we\'ll always explain our reasoning.'
      },
      {
        _key: 'faq5',
        question: 'Can you buy my rental property with tenants?',
        answer: 'Yes. We buy tenant-occupied properties regularly. The lease transfers with the sale, and we handle tenant relations after closing. You don\'t need to evict anyone first.'
      }
    ],
    relatedSituationSlugs: ['inherited-property', 'major-repairs', 'vacant-property', 'tired-landlord', 'tax-liens-code-violations', 'foreclosure']
  },
  {
    slug: 'bloomsburg',
    metaTitle: 'Sell Your House Fast in Bloomsburg, PA | Flood Zone, Any Condition | ClearEdge',
    metaDescription: 'Need to sell your Bloomsburg house fast? ClearEdge buys homes as-is — flood zone, student rental damage, any condition. Cash offer, no repairs needed. Call Tyler: (570) 904-2059.',
    heroHeadline: 'Sell Your Bloomsburg Property Fast — Skip the Flood Zone Hassles',
    heroSubheadline: 'Whether it\'s a student rental near BU or a family home in a flood zone, we buy houses as-is for cash. No repairs, no flood insurance complications, no waiting for the right buyer.',
    problemStatement: `Bloomsburg runs on two forces: the university and the river. If you own property here, you're navigating student tenant cycles, flood zone complications, or both.

Tropical Storm Lee in 2011 rewrote the flood maps. Properties that never flooded suddenly found themselves in high-risk zones with mandatory flood insurance requirements. Traditional buyers see the designation and walk away — or can't get affordable financing once insurance costs are factored in. What was once a straightforward sale now requires explaining flood history, insurance costs, and mitigation measures to every potential buyer.

The university creates its own dynamics. Student rentals generate income, but they also generate wear. Every August brings move-in damage. Every May brings move-out surprises. After a few years, even well-maintained properties show the effects of constant turnover. And when you're ready to sell, you're marketing a house that needs work to buyers who want move-in ready.

Bloomsburg's housing stock spans everything from historic downtown properties to post-war development. The older homes have charm but need updates — wiring, plumbing, roofing, windows. The renovated ones compete with newer construction. Finding the right buyer in a market this size takes time.

Maybe you inherited a house on Market Street and live in New Jersey. Maybe you've been renting to students near the university for a decade and you're done managing from a distance. Maybe you bought after the 2011 flood thinking values would recover, and they haven't.

We buy houses throughout Bloomsburg — flood zone or not, student rental or family home, good condition or needs everything. We understand the flood insurance complications, the rental market dynamics, and what it takes to close quickly. You don't need to resolve the flood zone issues. You don't need to renovate after the tenants leave. You just need a fair offer and a buyer who'll close.

[Read: Sell Your House Fast in Luzerne County](/blog/sell-my-house-fast-luzerne-county-pa)

[Read: How to Stop a Berks County Judicial Sale](/blog/how-to-stop-berks-county-judicial-sale-2026)`,
    neighborhoods: ['Downtown Bloomsburg', 'Market Street corridor', 'University area (BU campus surroundings)', 'Iron Street area', 'Town Hill', 'Espy (border)', 'Scott Township (border)'],
    nearbyTowns: ['Berwick', 'Danville', 'Espy', 'Catawissa', 'Millville', 'Orangeville', 'Benton'],
    faqs: [
      {
        _key: 'faq1',
        question: 'Do you buy houses in Bloomsburg\'s flood zones?',
        answer: 'Yes. The 2011 flood rezoned many Bloomsburg properties, and flood insurance requirements complicate traditional sales. We pay cash, so lender requirements don\'t apply. We factor flood risk into our offer and handle insurance transitions after closing.'
      },
      {
        _key: 'faq2',
        question: 'Will you buy my student rental near Bloomsburg University?',
        answer: 'Yes. We\'ve purchased many student rentals and understand the wear that comes with constant turnover. Holes in walls, stained carpets, outdated appliances — we buy as-is and factor condition into our offer.'
      },
      {
        _key: 'faq3',
        question: 'What if my property flooded in 2011?',
        answer: 'Flood history affects traditional buyer perception, but it doesn\'t disqualify a property for us. We buy houses with flood history, previous damage, or ongoing flood zone complications. We\'ll assess the situation and make a fair offer.'
      },
      {
        _key: 'faq4',
        question: 'How fast can you close?',
        answer: 'Typically 7-14 days if title is clear. Flood zone properties sometimes have insurance or title complications that add a week, but we handle all coordination. Either way, faster than waiting for a traditional buyer in this market.'
      },
      {
        _key: 'faq5',
        question: 'I live out of state — can you handle everything remotely?',
        answer: 'Yes. Many Bloomsburg property owners — especially those who inherited or those who own rentals — live elsewhere. We handle virtual walkthroughs, electronic documents, and mobile notary for closing. You don\'t need to travel.'
      }
    ],
    relatedSituationSlugs: ['tired-landlord', 'inherited-property', 'major-repairs', 'vacant-property', 'foreclosure']
  },
  {
    slug: 'pocono-pines',
    metaTitle: 'Sell Your House Fast in Pocono Pines, PA | Vacation Home Cash Buyer | ClearEdge',
    metaDescription: 'Tired of paying for a Pocono Pines vacation home you never use? ClearEdge buys houses as-is for cash — community association properties, winter damage, any condition. Call Tyler: (570) 904-2059.',
    heroHeadline: 'Sell Your Pocono Pines Property — Stop Paying for a Vacation You Never Take',
    heroSubheadline: 'Community association fees, winter maintenance, seasonal headaches — vacation home ownership adds up fast. We buy Pocono properties as-is for cash. No repairs, no HOA drama, no waiting.',
    problemStatement: `Pocono Pines seemed like a great idea when you bought. Lake access. Mountain views. A weekend escape from the city. But vacation home ownership has a way of becoming a burden instead of a retreat.

The community association fees never stop. Whether it's Lake Naomi, Pinecrest, Locust Lake Village, or one of the other communities in the Pocono Pines area, you're paying monthly or quarterly dues for amenities you may not use. And those fees climb every year while your visits decline.

Then there's the property itself. Seasonal homes take a beating. Pipes freeze in vacant houses. Ice dams damage roofs. Decks rot from years of snow and rain. What started as a weekend project to maintain becomes a money pit that's two hours away from your real life.

The vacation rental math has changed too. Monroe County's GovOS registration system tracks short-term rentals now. Regulations keep tightening. What was once passive income has become a compliance headache — and after management fees, cleaning costs, and vacancy gaps, the returns may not justify the hassle.

Maybe you inherited a place in Pinecrest from parents who bought it in the 1980s. Maybe you haven't visited your Lake Naomi house in three years but you're still paying dues, taxes, and insurance. Maybe you tried the rental route and realized it's more work than you expected.

We buy vacation properties throughout the Pocono Pines area — community association homes, standalone cabins, chalets, whatever you have. We understand the HOA complications, the seasonal maintenance issues, and what these properties are actually worth. You don't need to bring the property up to community standards. You don't need to resolve outstanding violations. You just need a buyer who'll pay cash and take it off your hands.

[Read: How to Stop GovOS Fines on Your Poconos House](/blog/stop-govos-fines-poconos-house)

[Read: Sell Your House Fast in the Poconos](/blog/sell-my-house-fast-poconos-pa)`,
    neighborhoods: ['Lake Naomi', 'Pinecrest Lake', 'Locust Lake Village', 'Arrowhead Lakes', 'Pocono Farms', 'Emerald Lakes', 'Stillwater Lakes', 'Thornhurst Township'],
    nearbyTowns: ['Blakeslee', 'Tobyhanna', 'Pocono Summit', 'Tannersville', 'Long Pond', 'Gouldsboro', 'Lake Harmony'],
    faqs: [
      {
        _key: 'faq1',
        question: 'Do you buy houses in community associations like Lake Naomi?',
        answer: 'Yes. We buy in gated communities, lake communities, and HOA-governed developments throughout the Pocono Pines area. Community association properties often have complications — outstanding dues, rule violations, resale restrictions — and we work through all of it.'
      },
      {
        _key: 'faq2',
        question: 'What if I\'m behind on HOA fees?',
        answer: 'HOA arrears are paid at closing from the sale proceeds. As long as there\'s enough equity to cover outstanding dues, we can move forward. We coordinate with the association as part of the closing process.'
      },
      {
        _key: 'faq3',
        question: 'What about properties with winter damage?',
        answer: 'Frozen pipes, roof damage, mold from poor winterization — we see this constantly in vacation homes that sit empty during winter. We buy as-is and factor repair costs into our offer.'
      },
      {
        _key: 'faq4',
        question: 'I live in New York/New Jersey — is that a problem?',
        answer: 'Not at all. Most Pocono Pines property owners live out of state. We handle everything remotely — virtual walkthroughs, electronic documents, mobile notary. You never need to make the drive unless you want to.'
      },
      {
        _key: 'faq5',
        question: 'Why sell to you instead of listing with a local agent?',
        answer: 'Vacation properties in this market can sit for months, especially if they need work or have HOA complications. We offer guaranteed cash and close in weeks. For sellers who want certainty and speed over maximum possible price, that trade-off makes sense.'
      }
    ],
    relatedSituationSlugs: ['vacant-property', 'inherited-property', 'tired-landlord', 'job-relocation', 'major-repairs']
  },
  {
    slug: 'tannersville',
    metaTitle: 'Sell Your House Fast in Tannersville, PA | Ski Property Cash Buyer | ClearEdge',
    metaDescription: 'Tired of your Tannersville ski property sitting empty? ClearEdge buys vacation homes as-is for cash — Camelback area, any condition. No repairs, no seasonal waiting. Call Tyler: (570) 904-2059.',
    heroHeadline: 'Sell Your Tannersville Ski Property — Without Waiting for Peak Season',
    heroSubheadline: 'Camelback-area vacation homes come with year-round costs and seasonal headaches. We buy as-is for cash — no waiting for ski season, no repairs, no resort-area complications.',
    problemStatement: `Tannersville sits in Camelback's shadow, and that proximity drives everything about the local real estate market. If you own property here, you bought into the ski lifestyle — but lifestyle and investment don't always align.

The seasonal economics are brutal. Your property generates interest during ski season and maybe summer weekends. The rest of the year? It sits empty while you pay mortgage, taxes, HOA fees, and maintenance. The math that worked when you bought may not work anymore — especially as Camelback has expanded and competition for rental income has intensified.

Vacation properties in the Tannersville area take punishment. Renters don't treat ski houses like their own homes. Winter access means salt and ice damage. Pipes freeze in houses that aren't properly winterized. Decks and siding weather faster at elevation. After a few years, even well-built properties show significant wear.

The rental registration requirements have tightened too. Monroe County's GovOS system tracks vacation rentals, and what was once casual income now requires compliance, fees, and inspections. For owners who live in New York or New Jersey, managing these requirements from a distance adds another layer of hassle.

Maybe you bought a place in The Crossings or one of the other Tannersville developments thinking you'd use it every winter weekend. Maybe you inherited a ski cabin from parents who bought when Camelback was just a local hill. Maybe you tried the rental route and discovered that after management fees, cleaning, and vacancy, the returns don't justify the headaches.

We buy vacation properties throughout the Tannersville and Camelback area. We understand the seasonal market dynamics, the HOA complications, and what these properties actually cost to maintain. You don't need to wait for ski season to list. You don't need to renovate after years of rental wear. You just need a buyer who'll pay cash year-round.

[Read: How to Stop GovOS Fines on Your Poconos House](/blog/stop-govos-fines-poconos-house)

[Read: Sell Your House Fast in the Poconos](/blog/sell-my-house-fast-poconos-pa)`,
    neighborhoods: ['Camelback Mountain area', 'The Crossings at Big Creek', 'Camelot Forest', 'Buck Hill area', 'Pocono Township', 'Paradise Township (border)'],
    nearbyTowns: ['Stroudsburg', 'Mount Pocono', 'Scotrun', 'Swiftwater', 'Bartonsville', 'Cresco'],
    faqs: [
      {
        _key: 'faq1',
        question: 'Do you buy ski properties in the Camelback area?',
        answer: 'Yes. We buy vacation homes throughout Tannersville and the Camelback resort area — condos, townhomes, chalets, standalone houses. The property type doesn\'t matter; we buy them all.'
      },
      {
        _key: 'faq2',
        question: 'What if my property has significant rental wear?',
        answer: 'Vacation rentals take a beating, and ski properties especially so. Damaged floors, worn carpets, outdated kitchens — we buy as-is and factor the condition into our offer. You don\'t need to renovate before selling.'
      },
      {
        _key: 'faq3',
        question: 'Do I have to wait for ski season to get a good offer?',
        answer: 'No. Traditional sales may time better with peak season, but our offers are based on property fundamentals, not seasonal buyer traffic. We pay the same in July as we do in January.'
      },
      {
        _key: 'faq4',
        question: 'What about properties in HOA communities like The Crossings?',
        answer: 'We buy in community association developments regularly. Outstanding dues, rule violations, resale complications — we work through all of it as part of the closing process.'
      },
      {
        _key: 'faq5',
        question: 'I live in New York — can you handle everything remotely?',
        answer: 'Absolutely. Most Tannersville property owners live out of state. We handle virtual walkthroughs, electronic documents, and mobile notary for closing. You never need to make the trip unless you want to.'
      }
    ],
    relatedSituationSlugs: ['vacant-property', 'inherited-property', 'tired-landlord', 'major-repairs', 'job-relocation']
  },
  {
    slug: 'lehigh-valley',
    metaTitle: 'Sell Your House Fast in the Lehigh Valley | Allentown, Bethlehem, Easton | ClearEdge',
    metaDescription: 'Need to sell your Lehigh Valley house fast? ClearEdge buys homes as-is across Allentown, Bethlehem, Easton & beyond. No repairs, no inspections, no fees. Call Tyler: (570) 904-2059.',
    heroHeadline: 'Sell Your Lehigh Valley House Fast — From Allentown to Easton',
    heroSubheadline: 'The Lehigh Valley\'s diverse housing market means diverse challenges. We buy houses as-is throughout the region — urban row homes, suburban ranches, historic Victorians. Fair cash offer, fast closing.',
    problemStatement: `The Lehigh Valley stretches from Allentown's urban core to Easton's riverfront to the suburban townships in between. Each community has its own character — and its own complications for sellers.

In Allentown, the pre-sale inspection requirement catches homeowners off guard. You find a buyer, schedule closing, and suddenly you're staring at a violation list from the Housing Bureau. Repairs that should take a week take a month. Buyers get impatient. Deals fall apart. What should be a straightforward sale becomes a project.

Bethlehem's historic housing stock creates different challenges. Those beautiful South Side row homes have character you can't replicate — but they also have century-old systems that don't pass modern inspections. Lead paint concerns in anything pre-1978. Electrical panels that need upgrading. Windows that don't meet egress requirements. The renovation scope overwhelms traditional buyers.

Easton's college-town dynamics add another layer. Student rentals near Lafayette generate income but also generate wear. After years of turnover, properties need work that exceeds what the local market will pay for.

And throughout the valley, the older housing stock tells the same story. Row homes in the cities, twins in the boroughs, postwar ranches in the townships — most of what's here was built 50 to 100 years ago. What traditional buyers want often doesn't match what's available without significant renovation.

Maybe you own a rental in Allentown's 7th Ward that's become more trouble than it's worth. Maybe you inherited a row home in South Bethlehem and live in Virginia. Maybe you've got a property in Easton's West Ward that's sat empty since your last tenant left.

We buy houses throughout the Lehigh Valley — Allentown, Bethlehem, Easton, and all the surrounding communities. We understand the municipal inspection requirements, the housing stock, and what these properties cost to renovate. You don't need to pass any inspection. You don't need to make repairs. You just need a fair cash offer and a buyer who closes.

[Read: Sell Your House Fast in Allentown](/blog/sell-my-house-fast-allentown)

[Read: Sell Your House Fast in the Lehigh Valley](/blog/sell-my-house-fast-lehigh-valley)

[Read: Selling a House with IPMC Violations in Bethlehem](/blog/selling-house-international-property-maintenance-code-violations-bethlehem)

[Read: Easton PA Rental Inspection Checklist 2026](/blog/easton-pa-rental-inspection-checklist-2026)`,
    neighborhoods: ['Allentown', 'Bethlehem', 'Easton', 'Whitehall Township', 'Emmaus', 'Catasauqua', 'Northampton', 'Hellertown', 'Fountain Hill', 'Wilson Borough'],
    nearbyTowns: ['Berks County (Reading area)', 'Monroe County (Poconos)', 'Carbon County', 'Bucks County', 'Montgomery County'],
    faqs: [
      {
        _key: 'faq1',
        question: 'Do you buy houses throughout the entire Lehigh Valley?',
        answer: 'Yes. We buy in Allentown, Bethlehem, Easton, and all surrounding communities — Whitehall, Emmaus, Catasauqua, the townships, everywhere. The specific municipality affects certain logistics but not our interest in purchasing.'
      },
      {
        _key: 'faq2',
        question: 'How do the different city inspection requirements affect selling to you?',
        answer: 'They don\'t. Allentown\'s pre-sale inspection, Bethlehem\'s housing requirements, Easton\'s rental inspections — when you sell directly to us for cash, you bypass all of it. We handle compliance after closing.'
      },
      {
        _key: 'faq3',
        question: 'What types of properties do you buy in the Lehigh Valley?',
        answer: 'Everything — urban row homes, historic Victorians, suburban ranches, twins, multi-family rentals, vacant properties. The property type affects our valuation approach but not our interest.'
      },
      {
        _key: 'faq4',
        question: 'How does your offer compare to listing with an agent?',
        answer: 'Our offers are below retail market value because we\'re taking on risk, repairs, and holding costs. But you\'re getting speed (7-14 days vs. 60-90+), certainty (no contingencies, no deals falling through), and zero hassle (no repairs, no inspections, no showings). For many sellers, especially those with properties that need work, that trade-off makes sense.'
      },
      {
        _key: 'faq5',
        question: 'Can you buy my rental property with tenants?',
        answer: 'Yes. We buy tenant-occupied properties throughout the Lehigh Valley. The lease transfers with the sale, and we handle tenant relations after closing. You don\'t need to evict anyone first.'
      }
    ],
    relatedSituationSlugs: ['foreclosure', 'inherited-property', 'divorce', 'major-repairs', 'tax-liens-code-violations', 'tired-landlord']
  },
  {
    slug: 'poconos',
    metaTitle: 'Sell Your Pocono House Fast | Vacation Home & Cabin Cash Buyer | ClearEdge',
    metaDescription: 'Need to sell your Pocono property fast? ClearEdge buys vacation homes, cabins & rentals as-is for cash — any condition, any situation. No repairs, no waiting. Call Tyler: (570) 904-2059.',
    heroHeadline: 'Sell Your Pocono Property Fast — Vacation Homes, Cabins, Rentals',
    heroSubheadline: 'From Stroudsburg to Lake Wallenpaupack, we buy Pocono properties as-is. No seasonal waiting, no community association hassles, no repairs. Cash offer, fast closing.',
    problemStatement: `The Poconos promise weekend escapes and mountain getaways. But for many property owners, that promise has become a burden.

Vacation homes cost money whether you use them or not. Property taxes. Insurance. Community association fees. Utilities to keep pipes from freezing. Maintenance to keep the place from deteriorating. When your visits drop from monthly to yearly to 'we really should get up there sometime,' the math stops making sense.

The rental market has changed too. GovOS registration requirements track short-term rentals across Monroe County now. What was once informal income requires compliance, fees, and inspections. After platform fees, cleaning costs, management expenses, and vacancy gaps, many owners discover they're working hard to break even.

Pocono properties take physical punishment. Harsh winters mean frozen pipes in unoccupied houses. Ice dams damage roofs. Seasonal temperature swings stress foundations and decks. Properties that look fine in summer reveal problems in spring. And repairs at mountain elevations cost more than in the valley — if you can find contractors who'll make the drive.

The community associations add another layer. Lake Naomi, Pocono Farms, Locust Lake Village, Arrowhead Lakes — each has its own rules, fees, and resale complications. Outstanding dues, architectural violations, access restrictions. Traditional buyers struggle to navigate the requirements.

Maybe you inherited a cabin in Wayne County and haven't visited in years. Maybe you bought a ski place near Camelback and realized you're not ski people. Maybe you've been renting a place in East Stroudsburg to students and tourists, and you're done managing from Philadelphia.

We buy properties throughout the Poconos — Monroe County, Pike County, Wayne County. Vacation homes, year-round residences, rental properties, cabins, chalets, lake houses. We understand the seasonal dynamics, the community association complications, and what these properties cost to maintain. You don't need to time the market. You don't need to fix the winter damage. You just need a fair offer and a buyer who closes year-round.

[Read: Sell Your House Fast in the Poconos](/blog/sell-my-house-fast-poconos-pa)

[Read: How to Stop GovOS Fines on Your Poconos House](/blog/stop-govos-fines-poconos-house)`,
    neighborhoods: ['Stroudsburg', 'East Stroudsburg', 'Pocono Pines', 'Tannersville', 'Mount Pocono', 'Tobyhanna', 'Blakeslee', 'Lake Harmony', 'Milford', 'Honesdale', 'Hawley', 'Lake Wallenpaupack area'],
    nearbyTowns: ['Monroe County', 'Pike County', 'Wayne County', 'Carbon County (partial)'],
    faqs: [
      {
        _key: 'faq1',
        question: 'Do you buy all types of Pocono properties?',
        answer: 'Yes. Cabins, chalets, lakefront homes, ski condos, townhomes, year-round residences, multi-family rentals — we buy them all. The property type affects valuation but not our interest.'
      },
      {
        _key: 'faq2',
        question: 'What about properties in gated communities or lake associations?',
        answer: 'We buy in community associations throughout the Poconos. Outstanding dues, rule violations, resale restrictions, transfer fees — we navigate all of it as part of closing. You don\'t need to resolve issues before selling.'
      },
      {
        _key: 'faq3',
        question: 'Do I have to wait for summer or ski season to sell?',
        answer: 'No. Traditional sales may benefit from seasonal buyer traffic, but our offers are based on property fundamentals. We buy year-round and our offers don\'t fluctuate with the seasons.'
      },
      {
        _key: 'faq4',
        question: 'What if my property has winter damage?',
        answer: 'Frozen pipes, roof damage, mold, foundation issues from freeze-thaw cycles — we see this regularly in Pocono properties. We buy as-is and factor repair costs into our offer. You don\'t need to fix anything.'
      },
      {
        _key: 'faq5',
        question: 'I live out of state — is that a problem?',
        answer: 'Not at all. The majority of Pocono property owners live in New York, New Jersey, or Pennsylvania\'s eastern suburbs. We handle everything remotely — virtual walkthroughs, electronic documents, mobile notary. You never need to make the drive.'
      }
    ],
    relatedSituationSlugs: ['vacant-property', 'inherited-property', 'tired-landlord', 'major-repairs', 'job-relocation', 'divorce']
  }
];

async function updateLocations() {
  console.log('Fetching situation IDs for references...');

  // Get all unique situation slugs
  const allSituationSlugs = [...new Set(locationUpdates.flatMap(loc => loc.relatedSituationSlugs))];
  const situationIds = await getSituationIds(allSituationSlugs);

  console.log('Found situation IDs:', situationIds);
  console.log('\n' + '='.repeat(80));

  for (const loc of locationUpdates) {
    console.log(`\nUpdating ${loc.slug}...`);

    // Get the location document ID
    const location = await client.fetch(`
      *[_type == "location" && slug.current == $slug][0] {
        _id
      }
    `, { slug: loc.slug });

    if (!location) {
      console.log(`  ERROR: Location "${loc.slug}" not found in Sanity!`);
      continue;
    }

    // Build relatedSituations references
    const relatedSituations = loc.relatedSituationSlugs
      .filter(slug => situationIds[slug])
      .map(slug => ({
        _type: 'reference',
        _ref: situationIds[slug],
        _key: `ref_${slug}`
      }));

    // Convert problemStatement to Portable Text
    const problemStatementBlocks = textToPortableText(loc.problemStatement);

    // Update the document
    try {
      await client.patch(location._id)
        .set({
          metaTitle: loc.metaTitle,
          metaDescription: loc.metaDescription,
          heroHeadline: loc.heroHeadline,
          heroSubheadline: loc.heroSubheadline,
          problemStatement: problemStatementBlocks,
          neighborhoods: loc.neighborhoods,
          nearbyTowns: loc.nearbyTowns,
          faqs: loc.faqs,
          relatedSituations: relatedSituations
        })
        .commit();

      console.log(`  SUCCESS: Updated ${loc.slug}`);
      console.log(`    - metaTitle: ${loc.metaTitle.substring(0, 50)}...`);
      console.log(`    - heroHeadline: ${loc.heroHeadline.substring(0, 50)}...`);
      console.log(`    - problemStatement: ${problemStatementBlocks.length} blocks`);
      console.log(`    - neighborhoods: ${loc.neighborhoods.length} items`);
      console.log(`    - nearbyTowns: ${loc.nearbyTowns.length} items`);
      console.log(`    - faqs: ${loc.faqs.length} questions`);
      console.log(`    - relatedSituations: ${relatedSituations.length} references`);
    } catch (err) {
      console.log(`  ERROR updating ${loc.slug}:`, err.message);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('Part 3 of 3 complete! Updated 7 locations:');
  locationUpdates.forEach(loc => console.log(`  - ${loc.slug}`));
  console.log('\nALL 21 LOCATIONS UPDATED! Ready for build and deployment.');
}

updateLocations().catch(console.error);
