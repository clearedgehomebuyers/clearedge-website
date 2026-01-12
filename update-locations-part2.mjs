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

// Location data for Part 2 (7 locations: 8-14)
const locationUpdates = [
  {
    slug: 'reading',
    metaTitle: 'Sell Your House Fast in Reading, PA | Stop Judicial Sale | ClearEdge',
    metaDescription: 'Facing foreclosure or code violations in Reading? ClearEdge buys houses as-is for cash — stop the judicial sale, skip the repairs. Any condition, any situation. Call Tyler: (570) 904-2059.',
    heroHeadline: 'Sell Your Reading House Fast — Before the Judicial Sale, Before the Violations Pile Up',
    heroSubheadline: 'Reading homeowners face tough choices. We offer a simple one: fair cash offer, fast closing, no repairs. From Hampden Heights to South Reading, we buy houses the traditional market won\'t touch.',
    problemStatement: `Reading's real estate market doesn't work like the suburbs. Properties here face challenges that buyers from outside Berks County don't understand — and the city's enforcement mechanisms don't wait for you to figure it out.

If you're behind on payments, you're watching the Berks County judicial sale calendar. Pennsylvania's judicial foreclosure process gives homeowners some time, but that time runs out. Once your property is scheduled for sale at the Berks County Courthouse, traditional listing isn't realistic. You need speed, and real estate agents can't guarantee that.

The city's code enforcement has intensified. Reading's housing stock is old — block after block of row homes and twins built for factory workers a century ago. Deferred maintenance that went unnoticed for years is suddenly generating violation notices. Properties in lower South Reading, Oakbrook, and parts of Glenside are getting cited for issues that would cost more to fix than the houses are worth on the open market.

Then there are the situations that traditional buyers simply can't handle. Maybe you're dealing with a parent's estate and the house is full — forty years of accumulation that overwhelms you every time you visit. Maybe you inherited a property from a relative who hoarded, and you can't imagine how to even begin clearing it out, let alone making repairs.

Reading's economics make all of this harder. Property values in some neighborhoods haven't kept pace with renovation costs. Spending $40,000 to update a house that might sell for $60,000 doesn't make sense — but traditional buyers need those updates to get financing.

We've been buying houses in Reading and throughout Berks County for years. We've purchased properties days before judicial sale. We've bought hoarder houses without requiring cleanout. We've closed on rentals with non-paying tenants and homes with violation lists longer than the settlement statement. You don't need to fix anything, clean anything, or resolve anything. We buy as-is and handle the complications after closing.

[Read: How to Stop a Berks County Judicial Sale](/blog/how-to-stop-berks-county-judicial-sale-2026)

[Read: Sell a Hoarder House in Reading Without Cleanout](/blog/sell-hoarder-house-reading-pa-without-cleanout)

[Read: Cash Home Buyers in Berks County](/blog/cash-home-buyers-berks-county)`,
    neighborhoods: ['Hampden Heights', 'South Reading', 'Glenside', 'Oakbrook', 'Pendora Park', 'Centre Park', 'West Reading (border)', 'Shillington (border)', 'Kenhorst (border)', 'Cotton Street area'],
    nearbyTowns: ['West Reading', 'Shillington', 'Wyomissing', 'Kenhorst', 'Muhlenberg Township', 'Spring Township', 'Sinking Spring'],
    faqs: [
      {
        _key: 'faq1',
        question: 'Can you buy my house before the Berks County judicial sale?',
        answer: 'Yes, if there\'s enough time. Berks County uses judicial foreclosure, and once your sale date is set, the clock is ticking. We can often close in 7-14 days if title is workable. The sooner you call, the more options we have.'
      },
      {
        _key: 'faq2',
        question: 'Do you buy hoarder houses in Reading?',
        answer: 'Yes. We\'ve bought many properties in Reading with severe hoarding situations. You don\'t need to clean out anything — we purchase with contents included and handle disposal after closing. No judgment, no cleanout required.'
      },
      {
        _key: 'faq3',
        question: 'What if my house isn\'t worth much after repairs?',
        answer: 'This is common in Reading. Some properties cost more to renovate than they\'ll ever be worth. We factor that reality into our offer and still buy. Traditional buyers need properties to appraise — we don\'t.'
      },
      {
        _key: 'faq4',
        question: 'Will you buy my rental with code violations?',
        answer: 'Yes. Reading\'s code enforcement has ramped up, and many landlords are facing violations they can\'t afford to address. We buy properties with active violations — they become our responsibility after closing.'
      },
      {
        _key: 'faq5',
        question: 'How does your offer compare to market value?',
        answer: 'Our offers are below retail market value because we\'re taking on all the risk, repairs, and uncertainty. But in Reading, where many properties need significant work and traditional buyers are scarce, a guaranteed cash offer often makes more sense than hoping for a retail sale that may never come.'
      }
    ],
    relatedSituationSlugs: ['foreclosure', 'inherited-property', 'major-repairs', 'tax-liens-code-violations', 'tired-landlord', 'vacant-property']
  },
  {
    slug: 'east-stroudsburg',
    metaTitle: 'Sell Your House Fast in East Stroudsburg, PA | Cash Buyer | ClearEdge',
    metaDescription: 'Need to sell your East Stroudsburg house fast? ClearEdge buys homes as-is — student rentals, vacation properties, inherited houses. No repairs, no GovOS hassle. Call Tyler: (570) 904-2059.',
    heroHeadline: 'Sell Your East Stroudsburg Property Without the University-Town Hassles',
    heroSubheadline: 'Student rentals, vacation homes, inherited properties — East Stroudsburg real estate comes with complications. We buy as-is, close fast, and take the hassle off your hands.',
    problemStatement: `East Stroudsburg runs on two economies: the university and the Poconos vacation market. If you own property here, you're caught between student tenants who cycle through every semester and vacation renters who expect hotel-quality amenities. Either way, your property takes a beating.

The student rental market around ESU is relentless. Every August brings move-in damage. Every May brings move-out damage. In between, you're handling maintenance calls from tenants who don't own the problem and don't treat the property like they do. After a few years, even well-maintained houses show serious wear — and that wear makes traditional sales complicated.

Vacation properties have their own challenges. Monroe County's GovOS registration system tracks short-term rentals now, and the regulations keep tightening. What was once passive income has become a compliance headache with fees, inspections, and rules that change faster than you can keep up. Meanwhile, the property sits empty for months, accumulating carrying costs while you wait for peak season.

Then there's the physical reality of Pocono winters. Frozen pipes in unoccupied houses. Ice dam damage on roofs. Mold from condensation in homes that aren't properly heated. Seasonal properties age faster than year-round homes, and the repair bills stack up.

Maybe you inherited a house near the university from a parent who rented to students for decades. Maybe you bought a vacation place ten years ago and haven't visited in three. Maybe you're a landlord who's done — done with the tenant turnover, done with the seasonal vacancy, done with managing a property from Philadelphia or New Jersey.

We buy houses throughout East Stroudsburg and the surrounding Poconos. We've purchased student rentals with holes in every wall, vacation homes with winter damage, and inherited properties that families didn't know what to do with. You don't need to fix anything, evict anyone, or deal with GovOS. We buy as-is and handle everything after closing.

[Read: How to Stop GovOS Fines on Your Poconos House](/blog/stop-govos-fines-poconos-house)

[Read: Sell Your House Fast in the Poconos](/blog/sell-my-house-fast-poconos-pa)`,
    neighborhoods: ['Downtown East Stroudsburg', 'University area (ESU campus surroundings)', 'Smithfield Township', 'Middle Smithfield Township', 'Resica Falls area', 'Minisink Hills', 'Shawnee area', 'Marshalls Creek (border)'],
    nearbyTowns: ['Stroudsburg', 'Delaware Water Gap', 'Marshalls Creek', 'Shawnee on Delaware', 'Bushkill', 'Milford (Pike County)'],
    faqs: [
      {
        _key: 'faq1',
        question: 'Do you buy student rental properties near ESU?',
        answer: 'Yes. We\'ve purchased many student rentals in East Stroudsburg. The wear and tear from years of student tenants doesn\'t scare us off — we factor it into our offer and handle renovations after closing.'
      },
      {
        _key: 'faq2',
        question: 'What if my vacation property isn\'t registered with GovOS?',
        answer: 'We buy properties regardless of their GovOS status. Whether you\'re registered, non-compliant, or never registered at all, it doesn\'t affect our ability to purchase. We handle registration and compliance after we take ownership.'
      },
      {
        _key: 'faq3',
        question: 'Can you buy my property if it has winter damage?',
        answer: 'Yes. Frozen pipes, roof damage, mold from improper winterization — we see this regularly in the Poconos. We buy as-is and factor repair costs into our offer. You don\'t need to fix anything.'
      },
      {
        _key: 'faq4',
        question: 'I live out of state — is that a problem?',
        answer: 'Not at all. Many East Stroudsburg property owners live in New Jersey, New York, or Philadelphia. We handle everything remotely — virtual walkthroughs, electronic documents, mobile notary. You never need to make the drive.'
      },
      {
        _key: 'faq5',
        question: 'Why sell to you instead of waiting for summer when more buyers are looking?',
        answer: 'Summer brings more buyers but also more competition and uncertainty. You\'ll spend months paying carrying costs with no guarantee of a sale. Our cash offer is guaranteed — you know exactly what you\'re getting and when. For many sellers, the certainty is worth more than the possibility of a higher price later.'
      }
    ],
    relatedSituationSlugs: ['tired-landlord', 'inherited-property', 'vacant-property', 'major-repairs', 'job-relocation']
  },
  {
    slug: 'carbondale',
    metaTitle: 'Sell Your House Fast in Carbondale, PA | Cash Buyer, Any Condition | ClearEdge',
    metaDescription: 'Need to sell your Carbondale house fast? ClearEdge buys homes as-is — mine subsidence, foundation issues, any condition. Cash offer in 24 hours. Call Tyler: (570) 904-2059.',
    heroHeadline: 'Sell Your Carbondale House Fast — Even When Traditional Buyers Won\'t Touch It',
    heroSubheadline: 'The Pioneer City built anthracite mining, but that history left challenges underground. We buy houses as-is — mine subsidence, foundation issues, outdated everything. Fair cash offer, no repairs required.',
    problemStatement: `Carbondale was Pennsylvania's first mining boomtown, and that history is still shaping real estate transactions 150 years later.

The mines are closed, but what's underneath hasn't gone away. Carbondale sits atop some of the most extensively mined ground in Lackawanna County. Mine subsidence isn't a theoretical risk here — it's why foundations crack, walls shift, and traditional buyers can't get financing. When a lender orders a mine subsidence report and sees the void maps, the deal dies. It happens constantly.

The housing stock compounds the problem. Most of Carbondale was built between 1880 and 1920 for mine workers and their families. These houses have character — but they also have century-old foundations, original plumbing, electrical systems that predate modern code, and layouts that don't match what today's buyers want. Renovation costs often exceed what the property will be worth when you're done.

The traditional market here is thin. Carbondale doesn't attract the buyer traffic that Scranton or the Lehigh Valley sees. Properties sit for months. Price drops don't generate offers. Meanwhile, you're paying taxes, insurance, and maintenance on a house that's slowly deteriorating.

Maybe you inherited a house on Main Street or Brooklyn Street from a parent who lived there for fifty years. Maybe you've been renting a property and the inspection requirements finally caught up with you. Maybe you bought years ago thinking you'd renovate, but the project never happened and now you just want out.

We've been buying houses in Carbondale and the surrounding Lackawanna County communities since we started. We understand the mine subsidence maps, the housing stock, and what it actually costs to renovate these properties. You don't need to find a buyer who can get financing. You don't need to fix the foundation issues. You just need a fair cash offer from someone who knows this market.

[Read: Selling a House with Mine Subsidence in Dunmore](/blog/sell-my-house-fast-dunmore-mine-subsidence)

[Read: Cash Home Buyers in Lackawanna County — No Fees](/blog/cash-home-buyers-lackawanna-county-no-fees)`,
    neighborhoods: ['Downtown Carbondale', 'Brooklyn Street area', 'South Main Street', 'North Main Street', 'Powderly', 'Mayfield (border)', 'Jermyn (border)', 'Simpson (border)'],
    nearbyTowns: ['Mayfield', 'Jermyn', 'Archbald', 'Simpson', 'Fell Township', 'Scott Township', 'Vandling'],
    faqs: [
      {
        _key: 'faq1',
        question: 'Do you buy houses with mine subsidence issues?',
        answer: 'Yes. Carbondale sits on extensively mined ground, and many properties here have foundation issues related to underground voids. Traditional buyers can\'t finance these homes. We pay cash and take on the risk — no mine subsidence report needed for our purchase.'
      },
      {
        _key: 'faq2',
        question: 'What if my house hasn\'t been updated since it was built?',
        answer: 'That\'s most of Carbondale\'s housing stock. Original wiring, galvanized plumbing, coal-era foundations — we\'ve seen it all and bought it all. We factor the renovation scope into our offer and handle updates after closing.'
      },
      {
        _key: 'faq3',
        question: 'Why is it so hard to sell traditionally in Carbondale?',
        answer: 'Limited buyer pool, financing challenges from mine subsidence, and renovation costs that often exceed property values. Traditional sales can take 6-12 months here — if they happen at all. We close in 7-14 days with cash.'
      },
      {
        _key: 'faq4',
        question: 'How do you calculate your offer?',
        answer: 'We estimate what the property will be worth after renovation, subtract repair costs and our margin, and offer you the difference. In Carbondale, where renovation costs are significant and after-repair values are modest, we\'re transparent about how the math works.'
      },
      {
        _key: 'faq5',
        question: 'Can you buy my rental property?',
        answer: 'Yes. Whether it\'s occupied or vacant, current on inspections or facing violations, we buy rental properties as-is. Tenant situations transfer with the sale — you don\'t need to evict anyone first.'
      }
    ],
    relatedSituationSlugs: ['inherited-property', 'major-repairs', 'vacant-property', 'tired-landlord', 'tax-liens-code-violations']
  },
  {
    slug: 'pittston',
    metaTitle: 'Sell Your House Fast in Pittston, PA | Flood Zone, Any Condition | ClearEdge',
    metaDescription: 'Need to sell your Pittston house fast? ClearEdge buys homes as-is — flood zone, mine subsidence, code violations. Cash offer in 24 hours, close in 7-14 days. Call Tyler: (570) 904-2059.',
    heroHeadline: 'Sell Your Pittston House Fast — Flood Zone, Mine Issues, Doesn\'t Matter',
    heroSubheadline: 'Greater Pittston properties come with unique challenges — river flooding, underground mines, older housing stock. We buy as-is, pay cash, and close fast. No repairs, no inspections, no hassle.',
    problemStatement: `Greater Pittston sits in the shadow of two forces that still shape every real estate deal: the Susquehanna River and the abandoned mines underneath.

The flood zones here aren't abstract. Agnes in 1972 and Lee in 2011 proved what the river can do, and FEMA's maps reflect that reality. Properties along the river and in low-lying areas require flood insurance that can cost more than the mortgage payment. Traditional buyers see the flood zone designation and walk away. Lenders see it and tighten requirements. Your buyer pool shrinks before you even list.

Then there's what's underground. The Knox Mine Disaster of 1959 literally flooded the mines beneath this region, but the tunnels and voids remain. Pittston, Pittston Township, and West Pittston all have areas where mine subsidence is a documented risk. Foundations crack. Walls show diagonal stress fractures. And when a buyer's lender orders a mine subsidence review, deals fall apart.

The housing stock adds another layer. Most of Pittston was built for coal workers and their families between 1880 and 1930. These row homes and twins have the solid construction of that era, but also the wiring, plumbing, and layouts of that era. Bringing them to modern code is expensive — often more expensive than makes financial sense.

Maybe you inherited a house on Main Street from a grandparent and you live in New Jersey. Maybe you've got a rental in Pittston Township that's been nothing but headaches since the last flood. Maybe you're watching property taxes stack up on a vacant house you can't sell traditionally because of the flood zone.

We buy houses throughout Greater Pittston — the city, the townships, West Pittston. We understand the flood maps, the mine subsidence risks, and the reality of selling in a market where traditional buyers face financing obstacles. You don't need to find a buyer who can get a loan. You don't need flood zone variances. You just need someone who'll pay cash and close.

[Read: Selling a House with Mine Subsidence in Dunmore](/blog/sell-my-house-fast-dunmore-mine-subsidence)

[Read: Luzerne County Rental Property Registration Requirements](/blog/luzerne-county-rental-property-registration-inspection-requirements-2026)`,
    neighborhoods: ['Downtown Pittston', 'Main Street corridor', 'Pittston Township', 'West Pittston', 'Hughestown', 'Port Griffith', 'Avoca (border)', 'Dupont (border)'],
    nearbyTowns: ['West Pittston', 'Dupont', 'Avoca', 'Duryea', 'Old Forge', 'Yatesville', 'Jenkins Township'],
    faqs: [
      {
        _key: 'faq1',
        question: 'Do you buy houses in Pittston\'s flood zones?',
        answer: 'Yes. Flood zone properties are difficult to sell traditionally because of insurance costs and lender requirements. We pay cash, so those financing barriers don\'t apply. We factor flood risk into our offer and handle insurance after closing.'
      },
      {
        _key: 'faq2',
        question: 'What about properties with mine subsidence damage?',
        answer: 'Greater Pittston has documented mine subsidence risk from the anthracite era. We buy properties with existing damage — cracked foundations, shifted walls, settling. Traditional buyers can\'t finance these; we pay cash.'
      },
      {
        _key: 'faq3',
        question: 'Do you buy in Pittston Township and West Pittston too?',
        answer: 'Yes. We buy throughout Greater Pittston — the city, both townships, and surrounding areas. The municipal boundaries don\'t affect our interest in a property.'
      },
      {
        _key: 'faq4',
        question: 'How fast can you close?',
        answer: 'Typically 7-14 days if title is clear. Flood zone or mine subsidence properties often have title complications or special insurance situations that add a week or two to resolve, but we handle all that coordination.'
      },
      {
        _key: 'faq5',
        question: 'What if I inherited a property and don\'t live locally?',
        answer: 'That\'s common. Many Pittston properties pass to heirs who moved away years ago. We handle everything remotely — virtual walkthroughs, electronic documents, mobile notary. You don\'t need to make multiple trips to the area.'
      }
    ],
    relatedSituationSlugs: ['inherited-property', 'major-repairs', 'vacant-property', 'tired-landlord', 'foreclosure']
  },
  {
    slug: 'kingston',
    metaTitle: 'Sell Your House Fast in Kingston, PA | Cash Buyer, No Repairs | ClearEdge',
    metaDescription: 'Need to sell your Kingston house fast? ClearEdge buys homes as-is for cash — any condition, any situation. Close in 7-14 days, no repairs needed. Call Tyler: (570) 904-2059.',
    heroHeadline: 'Sell Your Kingston House Fast — Skip the Showings, Skip the Repairs',
    heroSubheadline: 'Just across the river from Wilkes-Barre, Kingston properties deserve buyers who understand the Wyoming Valley market. We buy houses as-is — fair cash offer, fast closing, no hassle.',
    problemStatement: `Kingston has always lived in Wilkes-Barre's shadow, but that doesn't mean selling here is simple. The borough has its own character — from the stately homes along Wyoming Avenue to the working-class neighborhoods that housed generations of valley families. And it has its own challenges.

The 1972 Agnes flood reshaped this community, and FEMA hasn't forgotten. Depending on where your property sits, you may be dealing with flood zone designations that complicate traditional sales. Buyers need flood insurance. Lenders add requirements. What should be a straightforward sale becomes a negotiation over maps and coverage.

The housing stock is a mixed bag. Kingston has beautiful early 1900s homes that have been well-maintained for generations. It also has properties that haven't been updated since the Eisenhower administration. Traditional buyers want move-in ready — and when they see knob-and-tube wiring, galvanized plumbing, or original coal-era heating systems, they ask for concessions or walk away.

If you're a landlord, you're dealing with Luzerne County's rental landscape — inspections, registrations, and tenants who don't always treat properties the way owners would. After years of managing from a distance or dealing with turnover, the appeal of cashing out grows stronger.

Maybe you inherited a house on Rutter Avenue from parents who raised you there. Selling it feels complicated — emotionally and logistically. Maybe you've got a rental on Third Avenue that's been more trouble than it's worth. Maybe you bought thinking you'd renovate, but the project stalled and now the property sits.

We buy houses throughout Kingston — from Wyoming Avenue to the neighborhoods along the Forty Fort border. We understand the flood maps, the housing stock, and what it takes to close quickly in this market. You don't need to renovate. You don't need to stage for showings. You just need a fair offer and a buyer who'll actually close.

[Read: Luzerne County Rental Property Registration Requirements](/blog/luzerne-county-rental-property-registration-inspection-requirements-2026)

[Read: Sell Your House Fast in Luzerne County](/blog/sell-my-house-fast-luzerne-county-pa)`,
    neighborhoods: ['Wyoming Avenue corridor', 'Third Avenue area', 'Rutter Avenue', 'Pringle', 'Forty Fort (border)', 'Edwardsville (border)'],
    nearbyTowns: ['Wilkes-Barre', 'Forty Fort', 'Edwardsville', 'Swoyersville', 'Luzerne Borough', 'Plymouth'],
    faqs: [
      {
        _key: 'faq1',
        question: 'How is Kingston\'s market different from Wilkes-Barre?',
        answer: 'Kingston tends to have slightly higher property values and more well-maintained housing stock, but it shares the same regional challenges — older homes, flood zones in some areas, and a buyer pool that wants move-in ready. We buy in both markets and understand the differences.'
      },
      {
        _key: 'faq2',
        question: 'Do you buy houses in Kingston\'s flood zones?',
        answer: 'Yes. Some Kingston properties are in flood zones from the Susquehanna\'s reach. We pay cash, so flood insurance requirements don\'t complicate our purchase. We factor flood risk into our offer.'
      },
      {
        _key: 'faq3',
        question: 'What if I inherited a house and feel conflicted about selling?',
        answer: 'That\'s completely normal. Many Kingston properties have been in families for generations, and selling feels complicated. We try to make the transaction part easy so you can focus on what matters. No pressure, no judgment — just a fair offer when you\'re ready.'
      },
      {
        _key: 'faq4',
        question: 'How fast can you close in Kingston?',
        answer: 'Typically 7-14 days if title is clear. We\'ve closed faster when sellers needed it. The timeline depends on title work and any liens or complications, but we move as quickly as the situation allows.'
      },
      {
        _key: 'faq5',
        question: 'Will you buy my rental property?',
        answer: 'Yes. Kingston has a significant rental market, and we buy investment properties regularly — occupied or vacant, good condition or deferred maintenance. You don\'t need to evict tenants or make repairs before selling.'
      }
    ],
    relatedSituationSlugs: ['inherited-property', 'tired-landlord', 'major-repairs', 'vacant-property', 'divorce', 'foreclosure']
  },
  {
    slug: 'dunmore',
    metaTitle: 'Sell Your House Fast in Dunmore, PA | Mine Subsidence Experts | ClearEdge',
    metaDescription: 'Mine subsidence making your Dunmore house unsellable? ClearEdge buys homes as-is for cash — foundation issues, structural damage, any condition. Close in 7-14 days. Call Tyler: (570) 904-2059.',
    heroHeadline: 'Sell Your Dunmore House Fast — Even With Mine Subsidence Issues',
    heroSubheadline: 'Dunmore\'s underground past doesn\'t have to trap you. We buy houses with foundation problems, structural damage, and conditions that scare off traditional buyers. Cash offer, fast closing, no repairs.',
    problemStatement: `Dunmore residents know something outsiders don't: the ground beneath this borough has a history, and that history still affects every real estate transaction.

The anthracite mines that built this region left behind tunnels, voids, and unstable ground. Dunmore has some of the most documented mine subsidence risk in Lackawanna County. When foundations crack, walls shift, or floors become uneven, the cause isn't always a mystery — it's often what's sixty feet underground. And when traditional buyers try to get financing, lenders order subsidence reports that kill deals before they start.

This isn't theoretical. We've bought houses in Dunmore where subsidence had been progressing for decades. Properties where the owners patched cracks, leveled floors, and hoped for the best. Eventually, they needed to sell — and no traditional buyer would touch it.

The housing stock adds to the challenge. Dunmore was built during the coal boom, and most of these homes are 80 to 100 years old. Original stone foundations. Outdated electrical. Plumbing that's been repaired rather than replaced. Even without subsidence, these properties need work that exceeds what many buyers can handle.

Maybe you inherited a house on Drinker Street from parents who lived there for fifty years. The foundation has issues you can't afford to address. Maybe you've been watching cracks widen in a house on Green Ridge Street and wondering if it's time to cut your losses. Maybe you're a landlord dealing with tenant complaints about doors that won't close and floors that slope.

We started buying houses in Scranton and quickly expanded to Dunmore. We understand the subsidence maps, the housing stock, and the reality of selling when traditional financing isn't an option. You don't need to stabilize the foundation. You don't need to fix the cracks. You just need a buyer who'll pay cash regardless of what's happening underground.

[Read: Selling a House with Mine Subsidence in Dunmore](/blog/sell-my-house-fast-dunmore-mine-subsidence)

[Read: Cash Home Buyers in Lackawanna County — No Fees](/blog/cash-home-buyers-lackawanna-county-no-fees)`,
    neighborhoods: ['Dunmore Corners', 'Throop border area', 'Green Ridge Street corridor', 'Drinker Street area', 'Boulevard Avenue', 'Keyser Valley (Scranton border)'],
    nearbyTowns: ['Scranton', 'Throop', 'Dickson City', 'Olyphant', 'Jessup', 'Blakely'],
    faqs: [
      {
        _key: 'faq1',
        question: 'How bad can mine subsidence be for you to still buy?',
        answer: 'We\'ve purchased properties with significant structural movement — cracked foundations, walls separating from floors, doors and windows that no longer function properly. If the house is standing, we\'re interested. The severity affects our offer, but it doesn\'t disqualify the property.'
      },
      {
        _key: 'faq2',
        question: 'Why can\'t traditional buyers get financing for subsidence properties?',
        answer: 'Lenders require properties to be structurally sound and insurable. Mine subsidence creates uncertainty about both. When a lender\'s appraiser or inspector flags subsidence risk, most conventional and FHA loans become unavailable. That\'s why cash buyers like us exist.'
      },
      {
        _key: 'faq3',
        question: 'Do you buy houses without subsidence issues too?',
        answer: 'Absolutely. Not every Dunmore property has subsidence problems, and we buy houses in all conditions — move-in ready, needs work, or anywhere in between. Subsidence is just one of many situations we handle.'
      },
      {
        _key: 'faq4',
        question: 'How do you determine your offer on a subsidence property?',
        answer: 'We estimate what the property would be worth if it were stable, subtract the cost of stabilization and repairs (which can be significant), and factor in our margin. We\'ll explain the math so you understand how we arrived at the number.'
      },
      {
        _key: 'faq5',
        question: 'How fast can you close?',
        answer: 'Typically 7-14 days. Subsidence properties sometimes have title complications or insurance situations that add a week, but we handle all coordination. Either way, much faster than trying to find a traditional buyer who can\'t get financing.'
      }
    ],
    relatedSituationSlugs: ['inherited-property', 'major-repairs', 'vacant-property', 'tax-liens-code-violations', 'tired-landlord']
  },
  {
    slug: 'nanticoke',
    metaTitle: 'Sell Your House Fast in Nanticoke, PA | Cash Buyer, Any Condition | ClearEdge',
    metaDescription: 'Need to sell your Nanticoke house fast? ClearEdge buys homes as-is — foundation issues, code violations, any condition. Cash offer in 24 hours. Call Tyler: (570) 904-2059.',
    heroHeadline: 'Sell Your Nanticoke House Fast — When Traditional Sales Aren\'t Working',
    heroSubheadline: 'Nanticoke\'s market is tough. Traditional listings sit for months while you keep paying. We buy houses as-is for cash — no repairs, no waiting, no uncertainty.',
    problemStatement: `Nanticoke was built on coal and industry, and when those industries left, they left behind a housing stock that doesn't always match what today's market demands.

The traditional real estate market here is thin. Properties can sit for six months, a year, longer — especially if they need work. Price drops don't always generate offers when the buyer pool is limited to begin with. Meanwhile, you're paying taxes, insurance, and maintenance on a house that may never sell through conventional channels.

The housing stock makes this harder. Most of Nanticoke was built for workers and their families between 1880 and 1940. These houses have solid bones, but they also have systems that haven't been updated in decades. Galvanized plumbing. Original electrical panels. Foundations that have settled over a century. Bringing them up to modern standards costs more than the after-repair value often justifies.

And like everywhere in the anthracite region, there's what's underground. Nanticoke has documented mine subsidence risk. Properties that have been stable for generations can suddenly show signs of movement. Traditional buyers see the subsidence reports and walk away.

Maybe you inherited a house on Main Street from a parent who worked the mines sixty years ago. Maybe you've been renting a property on Market Street and the tenant situation has deteriorated. Maybe you bought hoping to flip the property, but the renovation budget exploded and now you're underwater.

We've been buying houses in Nanticoke and throughout Luzerne County for years. We understand what these properties are worth, what they cost to renovate, and why traditional sales stall here. You don't need to find a buyer who loves the location. You don't need to fix the foundation issues. You just need someone who'll make a fair offer and actually close.

[Read: Luzerne County Rental Property Registration Requirements](/blog/luzerne-county-rental-property-registration-inspection-requirements-2026)

[Read: Sell Your House Fast in Luzerne County](/blog/sell-my-house-fast-luzerne-county-pa)`,
    neighborhoods: ['Downtown Nanticoke', 'Main Street corridor', 'Market Street area', 'Hanover Section', 'Glen Lyon (Greater Nanticoke)', 'Newport Township (border)', 'Plymouth (border)', 'Warrior Run (border)'],
    nearbyTowns: ['Plymouth', 'Newport Township', 'Glen Lyon', 'Warrior Run', 'Shickshinny', 'Hanover Township'],
    faqs: [
      {
        _key: 'faq1',
        question: 'Why is it so hard to sell traditionally in Nanticoke?',
        answer: 'Limited buyer pool, older housing stock that needs significant updates, and mine subsidence risk that complicates financing. These factors combine to create long market times and low offers. We pay cash and bypass those obstacles.'
      },
      {
        _key: 'faq2',
        question: 'Do you buy houses with foundation problems?',
        answer: 'Yes. Nanticoke has many properties with settlement issues, subsidence damage, or foundations that need significant work. We buy as-is and factor repair costs into our offer.'
      },
      {
        _key: 'faq3',
        question: 'What if my house needs everything?',
        answer: 'We buy houses that need complete renovation — new electrical, new plumbing, new roof, structural work, everything. The scope of needed repairs affects our offer, but it doesn\'t disqualify the property.'
      },
      {
        _key: 'faq4',
        question: 'How do you calculate your offer in Nanticoke?',
        answer: 'We estimate what the property will be worth after renovation, subtract repair costs and our margin. In markets like Nanticoke, where renovation costs can approach or exceed after-repair values, we\'re transparent about the math. Sometimes the numbers work; sometimes they don\'t — but we\'ll always explain our reasoning.'
      },
      {
        _key: 'faq5',
        question: 'Can you buy my rental with tenants still in place?',
        answer: 'Yes. We buy tenant-occupied properties regularly. The lease transfers with the sale, and we handle tenant relations after closing. You don\'t need to evict anyone or wait for the property to be vacant.'
      }
    ],
    relatedSituationSlugs: ['inherited-property', 'major-repairs', 'tired-landlord', 'vacant-property', 'tax-liens-code-violations', 'foreclosure']
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
  console.log('Part 2 of 3 complete! Updated 7 locations:');
  locationUpdates.forEach(loc => console.log(`  - ${loc.slug}`));
  console.log('\nWaiting for Part 3 before deployment.');
}

updateLocations().catch(console.error);
