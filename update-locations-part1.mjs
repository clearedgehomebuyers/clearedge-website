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

// Location data for Part 1 (7 locations)
const locationUpdates = [
  {
    slug: 'scranton',
    metaTitle: 'Sell Your House Fast in Scranton, PA | Cash Offer in 24 Hours | ClearEdge',
    metaDescription: 'Need to sell your Scranton house fast? ClearEdge buys homes as-is for cash — no repairs, no fees, no inspections. We started here on Birch Street in 2016. Call Tyler: (570) 904-2059.',
    heroHeadline: 'We Buy Houses in Scranton — And We Started Right Here',
    heroSubheadline: 'ClearEdge was born on Birch Street in 2016. We know this city — from the Hill Section to South Side, from Green Ridge to West Scranton. When you\'re ready to sell fast without the hassle, you\'re working with neighbors, not strangers.',
    problemStatement: `Scranton's real estate market has its own rhythm — and its own challenges. If you've tried to sell a house here recently, you already know: it's not as simple as putting up a sign and waiting for offers.

The city's new code enforcement push isn't slowing down. As of January 2026, Pennsylvania adopted the 2021 International Construction Code, and Scranton's inspectors are using it. Properties that sat untouched for years are suddenly getting violation notices. The city's IPMC 2015 standards mean peeling paint, broken railings, or overgrown yards can trigger fines of $1,000 to $10,000 per day — and if the city handles abatement, they're charging $75 an hour plus materials.

If you're a landlord, you're already juggling the rental licensing requirements. The September 15 and March 15 deadlines don't care about your other problems, and with over 1,200 active rental licenses in the system, the city has plenty of properties to inspect. Miss your three-year cycle and you're looking at fines, delays, and headaches.

Then there's the older housing stock. Scranton was built in the coal boom, and a lot of these homes are 80, 100, even 120 years old. Foundation issues from mine subsidence. Outdated electrical. Plumbing that's been patched for decades. Traditional buyers need financing, and lenders don't like properties with structural questions.

Maybe you inherited a house in Green Ridge and you live out of state. Maybe you're behind on payments and watching the Lackawanna County sheriff sale calendar. Maybe you're just done dealing with tenants in the Plot section and want out.

We get it. We've bought houses in every neighborhood in this city — from the grand old homes in Hill Section to the duplexes along Capouse Avenue to the workers' cottages in Bellevue. We understand the local quirks, the inspection process, and what it takes to close fast in this market.

You don't need to fix the violations, update the wiring, or clean out decades of belongings. You just need a fair offer and a clear path to closing.

[Read: How to Avoid Foreclosure in Scranton, PA](/blog/avoid-foreclosure-scranton-pa)

[Read: Scranton Structural Damage Disclosure Requirements](/blog/scranton-pa-major-structural-damage-disclosure-law-2026)`,
    neighborhoods: ['Hill Section', 'Green Ridge', 'South Side', 'West Scranton', 'North Scranton', 'Pine Brook', 'Minooka', 'Plot', 'Bellevue', 'Providence', 'Tripp Park', 'Keyser Valley'],
    nearbyTowns: ['Dunmore', 'Clarks Summit', 'Dickson City', 'Taylor', 'Old Forge', 'Moosic', 'Throop'],
    faqs: [
      {
        _key: 'faq1',
        question: 'How fast can you close on a house in Scranton?',
        answer: 'We can close in as little as 7-14 days if title is clear. Compare that to 45-90 days for a traditional sale — and that\'s if nothing falls through. If you\'re facing a sheriff sale or foreclosure deadline, speed matters.'
      },
      {
        _key: 'faq2',
        question: 'Do you buy houses with code violations in Scranton?',
        answer: 'Yes. Scranton\'s IPMC enforcement has ramped up significantly, and we\'ve bought plenty of properties with active violations. We handle resolution after closing — you don\'t need to fix anything or pay fines before selling to us.'
      },
      {
        _key: 'faq3',
        question: 'What about houses with mine subsidence issues?',
        answer: 'Lackawanna County has areas with underground mine voids that cause foundation problems. Traditional buyers often can\'t get financing for these properties. We buy them as-is and factor the condition into our offer.'
      },
      {
        _key: 'faq4',
        question: 'Will you buy my rental property with tenants still in it?',
        answer: 'Yes. We buy tenant-occupied properties regularly. You don\'t need to evict anyone — the lease transfers with the sale and we handle tenant relations after closing.'
      },
      {
        _key: 'faq5',
        question: 'How is your offer calculated?',
        answer: 'We look at what the property will be worth after repairs, subtract the renovation costs and our operating margin, and offer you the remainder. We\'ll walk you through the math so you understand exactly how we arrived at the number.'
      }
    ],
    relatedSituationSlugs: ['foreclosure', 'inherited-property', 'major-repairs', 'tax-liens-code-violations', 'tired-landlord', 'vacant-property']
  },
  {
    slug: 'allentown',
    metaTitle: 'Sell Your House Fast in Allentown, PA | Skip the Pre-Sale Inspection | ClearEdge',
    metaDescription: 'Allentown\'s pre-sale inspection slowing you down? ClearEdge buys houses as-is for cash — no repairs, no city inspection required. Get a fair offer in 24 hours. Call Tyler: (570) 904-2059.',
    heroHeadline: 'Sell Your Allentown House Without the Inspection Headache',
    heroSubheadline: 'Allentown\'s pre-sale inspection requirement stops most traditional sales before they start. We buy houses as-is — no city inspection, no violation repairs, no waiting.',
    problemStatement: `If you've tried to sell a house in Allentown through traditional channels, you've probably already met the Housing Bureau at 641 South 10th Street. That pre-sale inspection requirement isn't optional — and it catches a lot of homeowners off guard.

Here's how it usually goes: you list the property, find a buyer, feel good about the deal — then the city inspector arrives. Suddenly you're looking at a punch list of violations. Handrails. Smoke detectors. Chipped paint if your home was built before 1978 (that's a lead paint disclosure issue). Electrical panels that haven't been updated since the Carter administration. Each violation needs to be fixed before closing, and the clock is ticking on your buyer's patience.

Allentown's housing stock makes this worse. These beautiful old row homes along Hamilton Street and throughout the West End have character — but character doesn't satisfy code inspectors. Stone foundations shift. Plaster walls crack. Windows don't seal properly. What looks like minor deferred maintenance to you looks like a violation list to the city.

And if you're a landlord dealing with the rental inspection program? Double the headaches. The city tracks everything now, and properties that slipped through cracks a decade ago are suddenly on the radar.

Maybe you inherited a property in the Old Fairgrounds neighborhood and you live in New Jersey. Maybe you've got a rental in the 7th Ward with tenants who aren't paying and repairs you can't afford. Maybe you're just done with a house in South Allentown that's been bleeding money.

We've been buying houses throughout the Lehigh Valley since 2016. We know the Allentown inspection process inside and out — and here's the thing: when you sell to us, you skip it entirely. Cash sale. As-is condition. No city inspection required. You don't fix the violations because we handle everything after closing.

[Read: Sell Your House Fast in Allentown](/blog/sell-my-house-fast-allentown)

[Read: Selling a House with IPMC Violations in Bethlehem](/blog/selling-house-international-property-maintenance-code-violations-bethlehem)`,
    neighborhoods: ['West End', 'Center City', 'Old Fairgrounds', 'South Allentown', 'East Side', '7th Ward', 'Midway Manor', 'Jordan Heights', 'Rittersville'],
    nearbyTowns: ['Bethlehem', 'Whitehall Township', 'Emmaus', 'Catasauqua', 'Coplay', 'Fountain Hill'],
    faqs: [
      {
        _key: 'faq1',
        question: 'Can I sell without going through Allentown\'s pre-sale inspection?',
        answer: 'Yes. When you sell directly to us for cash, the city\'s pre-sale inspection requirement doesn\'t apply. We buy as-is and handle any code issues after closing — you never deal with the Housing Bureau.'
      },
      {
        _key: 'faq2',
        question: 'What if I have code violations already on file?',
        answer: 'We buy properties with active violations. Allentown\'s code enforcement has gotten aggressive in recent years, and we\'ve purchased many homes with outstanding violation notices. Those become our responsibility at closing.'
      },
      {
        _key: 'faq3',
        question: 'How does selling to you compare to listing with an agent?',
        answer: 'With an agent, you\'re looking at 60-90 days minimum — plus the inspection process, potential repairs, buyer financing contingencies, and the risk of deals falling through. We close in 7-14 days with cash, no contingencies.'
      },
      {
        _key: 'faq4',
        question: 'Do you buy houses in all Allentown neighborhoods?',
        answer: 'Yes. West End, Center City, South Allentown, East Side — we buy throughout the city. Neighborhood doesn\'t affect whether we\'re interested; it just factors into the offer.'
      },
      {
        _key: 'faq5',
        question: 'What\'s the catch?',
        answer: 'No catch. Our offer will be below retail market value because we\'re taking on the risk, repairs, and holding costs. But you\'re getting speed, certainty, and zero hassle. For many sellers, that trade-off makes sense.'
      }
    ],
    relatedSituationSlugs: ['foreclosure', 'inherited-property', 'major-repairs', 'tax-liens-code-violations', 'tired-landlord', 'divorce']
  },
  {
    slug: 'stroudsburg',
    metaTitle: 'Sell Your House Fast in Stroudsburg, PA | Poconos Cash Home Buyer | ClearEdge',
    metaDescription: 'Need to sell your Stroudsburg house fast? ClearEdge buys Pocono properties as-is for cash — vacation homes, rentals, inherited cabins. No repairs, no fees. Call Tyler: (570) 904-2059.',
    heroHeadline: 'Selling a House in the Poconos Doesn\'t Have to Mean Waiting for Summer',
    heroSubheadline: 'Stroudsburg\'s market swings with the seasons — but we buy year-round. Whether it\'s a vacation home you never use, a rental that\'s become a headache, or a property you inherited, we\'ll make you a fair cash offer.',
    problemStatement: `The Poconos real estate market plays by different rules. If you own property in Stroudsburg, you already know: this isn't like selling a house in the suburbs.

The seasonal swings are brutal for sellers. List your house in November and you're competing against ski season rentals. List in April and you're waiting for the summer buyers who may or may not show up. Traditional sales can drag on for months while you keep paying taxes, insurance, and maintenance on a property that sits empty.

And if your property is a rental — whether long-term or vacation — you're dealing with Monroe County's GovOS registration system and the tightening regulations around short-term rentals. The rules keep changing, the fees keep climbing, and one bad review from a guest can tank your booking calendar.

Then there's the physical reality of Pocono properties. These homes take a beating. Harsh winters mean frozen pipes in vacant houses. Ice dams damage roofs. Seasonal tenants don't treat properties the way owners do. What started as a vacation investment or family cabin can become a money pit that's two hours away from your real life.

Maybe you inherited a house on a private road near Stroud Township and you live in Philadelphia. Maybe you bought a vacation place twenty years ago and haven't used it in five. Maybe you're a tired landlord done with managing a property from out of state.

We buy houses throughout the Poconos — Stroudsburg, East Stroudsburg, Pocono Pines, Tannersville, and everywhere in between. We understand the seasonal market, the rental regulations, and what it costs to maintain a property in this climate. You don't need to wait for peak season. You don't need to fix the damage from last winter. You just need a fair offer and a fast closing.

[Read: How to Stop GovOS Fines on Your Poconos House](/blog/stop-govos-fines-poconos-house)

[Read: Sell Your House Fast in the Poconos](/blog/sell-my-house-fast-poconos-pa)`,
    neighborhoods: ['Downtown Stroudsburg', 'Stroud Township', 'East Stroudsburg (border areas)', 'McMichaels', 'Prospect Park', 'Glen Brook', 'Arlington Heights', 'Stokes Mill'],
    nearbyTowns: ['East Stroudsburg', 'Delaware Water Gap', 'Marshalls Creek', 'Bartonsville', 'Tannersville', 'Pocono Pines'],
    faqs: [
      {
        _key: 'faq1',
        question: 'Do you buy vacation homes and cabins?',
        answer: 'Yes. A significant portion of our Pocono purchases are vacation properties — houses that owners no longer use or can\'t afford to maintain. Seasonal homes, cabins, chalets — we buy them all.'
      },
      {
        _key: 'faq2',
        question: 'What if my property has winter damage?',
        answer: 'Frozen pipes, roof damage, mold from ice dams — we see it regularly in the Poconos. We buy as-is and factor repair costs into our offer. You don\'t need to fix anything.'
      },
      {
        _key: 'faq3',
        question: 'Can you buy my short-term rental property?',
        answer: 'Yes. Whether it\'s registered in GovOS or not, whether it has active bookings or violations, we can purchase it. We handle the regulatory transition after closing.'
      },
      {
        _key: 'faq4',
        question: 'I live out of state — is that a problem?',
        answer: 'Not at all. Many Pocono property owners live in New Jersey, New York, or Philadelphia. We handle the entire process remotely — virtual walkthroughs, electronic documents, mobile notary for closing.'
      },
      {
        _key: 'faq5',
        question: 'Why would I sell to you instead of listing in summer when the market is hot?',
        answer: 'Summer does bring more buyers — but also more competition and more uncertainty. Our offer is guaranteed. There\'s no waiting, no showings, no deals falling through. For many sellers, the certainty of a fast cash sale outweighs the possibility of a higher price months from now.'
      }
    ],
    relatedSituationSlugs: ['inherited-property', 'vacant-property', 'tired-landlord', 'major-repairs', 'job-relocation']
  },
  {
    slug: 'wilkes-barre',
    metaTitle: 'Sell Your House Fast in Wilkes-Barre, PA | Cash Offer in 24 Hours | ClearEdge',
    metaDescription: 'Need to sell your Wilkes-Barre house fast? ClearEdge buys homes as-is for cash — flood zone, code violations, mine subsidence, doesn\'t matter. No repairs, no fees. Call Tyler: (570) 904-2059.',
    heroHeadline: 'Sell Your Wilkes-Barre House Fast — Without the Wyoming Valley Hassles',
    heroSubheadline: 'From the Heights to South Wilkes-Barre, we buy houses in any condition. Flood zone? Code violations? Mine subsidence? Doesn\'t matter. Fair cash offer, fast closing, zero repairs.',
    problemStatement: `Wilkes-Barre homeowners face challenges that people outside the Wyoming Valley don't understand. The history of this city is written in coal dust and floodwater — and that history shows up in every real estate transaction.

Start with the flood zones. The 1972 Agnes flood reshaped this valley, and the resulting FEMA maps still control what buyers can and can't finance. If your property sits in a designated flood zone, traditional buyers need expensive flood insurance — and many lenders won't touch the deal at all. You're left with a smaller buyer pool and longer time on market.

Then there's what's underneath. The anthracite mines that built this region left behind a maze of underground voids. Mine subsidence isn't a theoretical risk in Luzerne County — it's a present reality. Foundations crack. Walls shift. Insurance claims get complicated. Traditional buyers run from these properties, and the ones who don't can't get conventional financing.

The city's code enforcement has teeth now, too. Wilkes-Barre's rental registration program requires inspections, and the housing inspectors are working through decades of deferred maintenance across the city. Violations that went unnoticed for years are suddenly generating fines. Properties in Parsons, the North End, and Rolling Mill Hill are getting notices that owners can't afford to address.

Maybe you inherited a house on the Heights from a parent who lived there for fifty years. Maybe you're watching the sheriff sale calendar at the Luzerne County Courthouse and running out of time. Maybe you've been a landlord in South Wilkes-Barre for years and you're done — done with the tenant calls, done with the code letters, done with writing checks for a property that never cash flows.

We've been buying houses in Wilkes-Barre since we expanded from Scranton. We know the flood maps, understand the mine subsidence risks, and have closed deals with every type of title complication this city can produce. You don't need to fix the violations. You don't need to resolve the flood insurance situation. You just need someone who'll make a fair offer and actually close.

[Read: Selling a House with Code Violations in Wilkes-Barre](/blog/sell-house-wilkes-barre-code-violations)

[Read: Luzerne County Rental Property Registration Requirements](/blog/luzerne-county-rental-property-registration-inspection-requirements-2026)

[Read: Sell Your House Fast in Luzerne County](/blog/sell-my-house-fast-luzerne-county-pa)`,
    neighborhoods: ['The Heights', 'South Wilkes-Barre', 'Parsons', 'North End', 'Rolling Mill Hill', 'Miners Mills', 'East End', 'Mayflower', 'Georgetown', 'Brookside'],
    nearbyTowns: ['Kingston', 'Plains Township', 'Hanover Township', 'Bear Creek', 'Ashley', 'Sugar Notch', 'Edwardsville'],
    faqs: [
      {
        _key: 'faq1',
        question: 'Do you buy houses in Wilkes-Barre flood zones?',
        answer: 'Yes. Flood zone properties are difficult to sell traditionally because buyers struggle with flood insurance requirements and lender restrictions. We buy with cash, so those financing barriers don\'t apply. We factor flood risk into our offer and handle insurance transfers after closing.'
      },
      {
        _key: 'faq2',
        question: 'What about houses with mine subsidence damage?',
        answer: 'Luzerne County has significant mine subsidence risk from the anthracite mining era. We buy properties with existing subsidence damage — cracked foundations, shifting walls, whatever the condition. Traditional buyers can\'t finance these; we pay cash and take on the risk.'
      },
      {
        _key: 'faq3',
        question: 'How fast can you close in Wilkes-Barre?',
        answer: 'Typically 7-14 days if title is clear. If there are liens, code violations, or title issues, it may take 14-30 days while we coordinate with the city and title company. Either way, faster than the 60-90+ days for a traditional sale.'
      },
      {
        _key: 'faq4',
        question: 'Can you buy my rental property with Wilkes-Barre code violations?',
        answer: 'Yes. The city\'s rental registration program has caught many landlords with violation notices they can\'t afford to address. We buy properties with active violations — they become our responsibility after closing, not yours.'
      },
      {
        _key: 'faq5',
        question: 'What if I\'m behind on property taxes?',
        answer: 'Tax liens get paid off at closing through the title company. As long as there\'s equity remaining after the lien payoff, we can move forward. If the liens exceed the property value, we may still be able to help through negotiation with the tax claim bureau.'
      }
    ],
    relatedSituationSlugs: ['foreclosure', 'inherited-property', 'major-repairs', 'tax-liens-code-violations', 'tired-landlord', 'vacant-property']
  },
  {
    slug: 'bethlehem',
    metaTitle: 'Sell Your House Fast in Bethlehem, PA | Cash Offer, No Inspections | ClearEdge',
    metaDescription: 'Selling a house in Bethlehem, PA? ClearEdge buys homes as-is for cash — skip the city inspection, skip the repairs. Historic home or fixer-upper, we buy it all. Call Tyler: (570) 904-2059.',
    heroHeadline: 'Sell Your Bethlehem Home Without the Steel City Red Tape',
    heroSubheadline: 'From the historic row homes of South Side to the tree-lined streets of West Bethlehem, we buy houses as-is. No city inspections, no violation repairs, no waiting for the perfect buyer.',
    problemStatement: `Bethlehem wears its steel heritage proudly — but that heritage comes with 100-year-old houses that weren't built for modern code requirements.

The city's inspection process can derail a traditional sale fast. You find a buyer, schedule the inspection, and suddenly you're staring at a list of violations: outdated electrical panels, missing handrails, windows that don't meet egress requirements, lead paint concerns in anything built before 1978. Each item needs to be addressed before closing, and contractors in the Lehigh Valley are booked out for weeks.

South Bethlehem's row homes are particularly challenging. These properties have character — original hardwood, detailed millwork, solid bones — but they also have shared walls that complicate repairs, basement moisture issues from century-old foundations, and electrical systems that were state-of-the-art when Bethlehem Steel was still pouring ingots. Traditional buyers love the aesthetic until they see the inspection report.

The market here doesn't help either. Bethlehem attracts buyers who want move-in ready, especially with the South Side arts scene and Musikfest driving tourism interest. If your house needs work, you're competing against renovated properties and losing.

Maybe you inherited a row home on Third Street and you live in Maryland. Maybe you've owned a rental near Lehigh University for years and you're tired of student turnover and maintenance calls. Maybe you bought in West Bethlehem thinking you'd renovate, but life happened and now it's been sitting half-finished.

We buy houses throughout Bethlehem — both the Northampton County side and the slice that crosses into Lehigh County. We've bought historic row homes with knob-and-tube wiring, ranches in Hanover Township with foundation issues, and investment properties with tenants who haven't paid in months. You don't need to pass the city inspection. You don't need to update anything. We buy it as it sits.

[Read: Selling a House with IPMC Violations in Bethlehem](/blog/selling-house-international-property-maintenance-code-violations-bethlehem)

[Read: Selling a House with Tax Liens in Bethlehem](/blog/sell-my-house-fast-bethlehem-pa-18015-tax-lien)

[Read: Sell Your House Fast in the Lehigh Valley](/blog/sell-my-house-fast-lehigh-valley)`,
    neighborhoods: ['South Bethlehem', 'South Side (Historic District)', 'West Bethlehem', 'Center City', 'North Side', 'Pembroke Village', 'Fountain Hill (border)', 'Hanover Township (border)', 'Five Points'],
    nearbyTowns: ['Allentown', 'Easton', 'Hellertown', 'Freemansburg', 'Fountain Hill', 'Hanover Township'],
    faqs: [
      {
        _key: 'faq1',
        question: 'Do I need to pass Bethlehem\'s housing inspection to sell to you?',
        answer: 'No. When you sell directly to us for cash, the city inspection requirement for traditional sales doesn\'t apply. We buy as-is and handle any code compliance issues after we take ownership.'
      },
      {
        _key: 'faq2',
        question: 'Do you buy historic homes in South Bethlehem?',
        answer: 'Yes. We\'ve purchased many of the classic row homes in South Side and the historic district. Age, condition, outdated systems — none of that disqualifies a property. We appreciate the character and understand what it takes to renovate these homes.'
      },
      {
        _key: 'faq3',
        question: 'What if my house has lead paint issues?',
        answer: 'Any home built before 1978 potentially has lead paint, and Bethlehem has a lot of older housing stock. We\'re experienced with lead paint disclosure requirements and factor remediation costs into our offer. It\'s not a dealbreaker.'
      },
      {
        _key: 'faq4',
        question: 'Can you buy my rental property near Lehigh University?',
        answer: 'Yes. Student rentals come with unique wear and tear, and tenant turnover can leave properties in rough shape. We buy investment properties regardless of condition and can close with or without tenants in place.'
      },
      {
        _key: 'faq5',
        question: 'How is your offer different from a traditional sale?',
        answer: 'We offer less than you\'d get on the open market — but you\'re trading that difference for speed, certainty, and zero hassle. No repairs, no inspections, no 60-day closing windows, no deals falling through. For many sellers, especially those with properties that need work, the trade-off makes sense.'
      }
    ],
    relatedSituationSlugs: ['inherited-property', 'major-repairs', 'tax-liens-code-violations', 'tired-landlord', 'divorce', 'foreclosure']
  },
  {
    slug: 'hazleton',
    metaTitle: 'Sell Your House Fast in Hazleton, PA | Cash Buyer for Any Condition | ClearEdge',
    metaDescription: 'Need to sell your Hazleton house fast? ClearEdge buys homes as-is — skip the occupancy inspection, avoid the violation fines. Cash offer in 24 hours. Call Tyler: (570) 904-2059.',
    heroHeadline: 'Sell Your Hazleton Property Fast — Skip the Inspection Hassle',
    heroSubheadline: 'Hazleton\'s rental market has changed. If you\'re ready to cash out — whether it\'s a rental with code issues or a house you inherited — we buy as-is, close fast, and handle the complications.',
    problemStatement: `Hazleton's real estate market has transformed faster than almost anywhere in Pennsylvania. What was once a quiet coal town has become one of the most active rental markets in the region — and with that activity came a wave of regulations that catch property owners off guard.

The city's Residential Occupancy Permit process isn't optional. Before any property changes hands or tenants, it needs to pass inspection. And Hazleton's inspectors aren't rubber-stamping anything. They're looking at electrical, plumbing, structural integrity, smoke detectors, egress windows — the full list. Properties that rented for years without issues are suddenly generating violation notices.

The older housing stock makes compliance expensive. Hazleton was built for coal miners, and these houses are 80 to 120 years old. Original wiring. Galvanized plumbing. Foundations that have shifted over decades. Bringing a property up to current code can cost more than the house is worth, especially in neighborhoods where values haven't kept pace with renovation costs.

If you're a landlord, you've watched the math change. Maybe you bought investment properties when prices were low, and now you're dealing with turnover, damage, and inspection requirements that make each transition expensive. Maybe you've got a tenant who isn't paying and a property that won't pass inspection even after they're gone.

Or maybe you inherited a house in the Heights or along Alter Street from a relative who held it for decades. You don't live here. You don't want to be a landlord. You just want to convert the property to cash and move on with your life.

We've been buying in Hazleton since we expanded from Scranton, and we've seen every situation this market produces. Occupied rentals with non-paying tenants. Vacant houses with open violations. Properties that haven't been updated since the 1970s. You don't need to evict anyone, fix anything, or pass any inspection. We buy as-is and handle everything after closing.

[Read: Hazleton Residential Occupancy Inspection Checklist](/blog/hazleton-residential-occupancy-inspection-checklist)

[Read: Luzerne County Rental Property Registration Requirements](/blog/luzerne-county-rental-property-registration-inspection-requirements-2026)`,
    neighborhoods: ['The Heights', 'Downtown Hazleton', 'South Side', 'North Side', 'Alter Street area', 'Cranberry (East Side)', 'Hollywood', 'Japantown'],
    nearbyTowns: ['West Hazleton', 'Hazle Township', 'Freeland', 'Drums', 'Conyngham', 'McAdoo', 'Weatherly'],
    faqs: [
      {
        _key: 'faq1',
        question: 'Do I need a Hazleton Occupancy Permit to sell to you?',
        answer: 'No. The Residential Occupancy Permit is required for traditional sales and tenant changes, but when you sell directly to us for cash, you skip that process. We handle permits and inspections after we take ownership.'
      },
      {
        _key: 'faq2',
        question: 'Will you buy my rental with tenants who aren\'t paying?',
        answer: 'Yes. Non-paying tenants are a common reason landlords call us. We buy the property as-is, and the tenant situation — whether they\'re paying, behind, or in eviction proceedings — transfers with the sale. You don\'t need to resolve it first.'
      },
      {
        _key: 'faq3',
        question: 'What if my property has multiple code violations?',
        answer: 'We buy properties with active violations regularly. Hazleton\'s inspection program has generated a lot of violation notices citywide. Those violations become our responsibility after closing — you walk away clean.'
      },
      {
        _key: 'faq4',
        question: 'How do you determine your offer?',
        answer: 'We calculate what the property will be worth after renovation, subtract repair costs and our margin, and offer you the difference. In Hazleton, where renovation costs often rival or exceed property values, this math is especially important — and we\'ll walk you through it transparently.'
      },
      {
        _key: 'faq5',
        question: 'Can you close before my next inspection deadline?',
        answer: 'Usually, yes. We can close in 7-14 days if title is clear. If you\'re facing a compliance deadline or accumulating fines, let us know your timeline and we\'ll work to beat it.'
      }
    ],
    relatedSituationSlugs: ['tired-landlord', 'tax-liens-code-violations', 'inherited-property', 'vacant-property', 'major-repairs', 'foreclosure']
  },
  {
    slug: 'easton',
    metaTitle: 'Sell Your House Fast in Easton, PA | Cash Buyer, No Repairs | ClearEdge',
    metaDescription: 'Need to sell your Easton house fast? ClearEdge buys homes as-is for cash — skip the rental inspection, skip the repairs. Victorian, row home, or fixer-upper. Call Tyler: (570) 904-2059.',
    heroHeadline: 'Sell Your Easton House Fast — Historic Charm, Modern Hassles, Simple Solution',
    heroSubheadline: 'Easton\'s beautiful old homes come with century-old problems. We buy houses as-is throughout the city — no inspections, no repairs, no waiting for a buyer who can handle the work.',
    problemStatement: `Easton sits at the meeting of two rivers and two centuries of housing stock. The downtown revival has brought new restaurants and galleries to the historic district, but a few blocks away, homeowners are dealing with properties that haven't been updated since Eisenhower was president.

The city's rental inspection program has teeth. If you're a landlord — or trying to sell to someone who'll rent the property — you're looking at compliance requirements that can stop a deal cold. Easton's inspectors check everything: electrical capacity, plumbing condition, structural integrity, egress windows, smoke and carbon monoxide detectors. A property that's been rented for twenty years without issues can suddenly generate a violation list that costs more to fix than the house is worth.

The historic housing stock makes this worse. Easton's West Ward and College Hill neighborhoods have beautiful Victorian homes with original details — but original also means knob-and-tube wiring, galvanized pipes that are rusting from the inside, stone foundations that weep moisture, and windows that don't meet modern egress requirements. These aren't cosmetic issues. They're expensive, and traditional buyers need financing that lenders won't provide for properties with structural questions.

Then there's the Lafayette College rental market. Student housing has been a steady income source for decades, but it comes with wear and tear that accumulates fast. When you're ready to exit, you're selling a property that's seen hundreds of tenants and shows every year of it.

Maybe you inherited a row home on Northampton Street and live in New York. Maybe you've owned a rental near the college for years and you're done dealing with September move-ins and May move-outs. Maybe you bought a Victorian in West Ward planning to restore it, but the project overwhelmed you.

We buy houses throughout Easton — from the historic district to the West Ward to South Side. We've purchased properties with active violations, open permits, tenant damage, and decades of deferred maintenance. You don't need to pass inspection. You don't need to evict anyone. You just need a buyer who understands what these properties require and will pay cash anyway.

[Read: Easton PA Rental Inspection Checklist 2026](/blog/easton-pa-rental-inspection-checklist-2026)

[Read: Sell Your House Fast in the Lehigh Valley](/blog/sell-my-house-fast-lehigh-valley)`,
    neighborhoods: ['Downtown Easton', 'West Ward', 'South Side', 'College Hill', 'Palmer Township (border)', 'Forks Township (border)', 'Wilson Borough (border)', 'Northampton Heights'],
    nearbyTowns: ['Phillipsburg, NJ', 'Palmer Township', 'Wilson Borough', 'Forks Township', 'Bethlehem', 'Nazareth'],
    faqs: [
      {
        _key: 'faq1',
        question: 'Do I need to pass Easton\'s rental inspection to sell to you?',
        answer: 'No. When you sell directly to us for cash, you bypass the rental inspection process entirely. We buy as-is and handle any compliance issues after closing — you never deal with the inspection checklist.'
      },
      {
        _key: 'faq2',
        question: 'Do you buy the old Victorian homes in Easton?',
        answer: 'Yes. We\'ve purchased many of Easton\'s historic properties — Victorians, row homes, workers\' cottages. Age and condition don\'t disqualify a property. We understand what it costs to renovate these homes and factor that into our offer.'
      },
      {
        _key: 'faq3',
        question: 'What if I have a rental near Lafayette College with tenant damage?',
        answer: 'Student rentals take a beating — we know that. We buy properties with tenant damage, deferred maintenance, and the wear that comes from years of turnover. You don\'t need to repair anything before selling.'
      },
      {
        _key: 'faq4',
        question: 'How fast can you close in Easton?',
        answer: 'Typically 7-14 days if title is clear. If there are liens, violations, or title complications, it may take 14-30 days while we coordinate resolution. Either way, much faster than the traditional 60-90 day timeline.'
      },
      {
        _key: 'faq5',
        question: 'Why would I sell to you instead of fixing up the property and listing it?',
        answer: 'Renovation in Easton\'s older housing stock is expensive and unpredictable. You might spend $50,000 bringing a property up to code and only increase its value by $30,000. We take on that risk and uncertainty — you get a guaranteed cash offer and close in weeks, not months.'
      }
    ],
    relatedSituationSlugs: ['inherited-property', 'tired-landlord', 'major-repairs', 'tax-liens-code-violations', 'divorce', 'vacant-property']
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
  console.log('Part 1 of 3 complete! Updated 7 locations:');
  locationUpdates.forEach(loc => console.log(`  - ${loc.slug}`));
  console.log('\nWaiting for Parts 2 and 3 before deployment.');
}

updateLocations().catch(console.error);
