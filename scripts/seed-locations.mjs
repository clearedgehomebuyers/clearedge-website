import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'd78o4wq2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const locations = [
  {
    _type: 'location',
    city: 'Wilkes-Barre',
    state: 'PA',
    county: 'Luzerne County',
    slug: { _type: 'slug', current: 'wilkes-barre' },
    metaTitle: 'Sell Your House Fast in Wilkes-Barre, PA | Cash Home Buyers',
    metaDescription: 'Get a fair cash offer for your Wilkes-Barre home in 24 hours. We buy houses in any condition in Luzerne County. No repairs, no fees, close in 7-14 days.',
    heroHeadline: 'Sell Your House Fast in',
    heroSubheadline: 'Get a fair cash offer for your Wilkes-Barre home in 24 hours. We buy houses in any condition throughout Luzerne County—no repairs, no fees, no hassle.',
    nearbyTowns: ['Kingston', 'Edwardsville', 'Plains', 'Hanover Township', 'Ashley', 'Sugar Notch', 'Forty Fort'],
    problemStatement: [
      {
        _type: 'block',
        _key: 'wb1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'wb1s', text: 'Wilkes-Barre has seen its share of challenges over the years. From flood damage along the Susquehanna River to aging housing stock in established neighborhoods, many homeowners find themselves with properties that need more work than they can afford—or want to deal with.' }]
      },
      {
        _type: 'block',
        _key: 'wb2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'wb2s', text: 'The traditional real estate market in Luzerne County can be slow, especially for homes that need updates. Buyers expect move-in ready properties, and anything less can sit on the market for months while you continue paying mortgage, taxes, and maintenance costs.' }]
      },
      {
        _type: 'block',
        _key: 'wb3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'wb3s', text: 'Whether you\'re dealing with an inherited property in the Heights, a rental gone wrong in South Wilkes-Barre, or just need to sell quickly, we offer a straightforward solution. No repairs, no showings, no uncertainty—just a fair cash offer and a closing date that works for you.' }]
      }
    ],
    neighborhoods: ['The Heights', 'South Wilkes-Barre', 'North End', 'Rolling Mill Hill', 'Miners Mills', 'Parsons', 'East End', 'Brookside', 'Mayflower'],
    faqs: [
      { _key: 'f1', question: 'How fast can you close on a house in Wilkes-Barre?', answer: 'We can close in as little as 7-14 days. If you need more time, we\'re flexible and can work around your schedule.' },
      { _key: 'f2', question: 'Do you buy houses in flood zones in Luzerne County?', answer: 'Yes. We buy properties in flood zones throughout Wilkes-Barre and Luzerne County, including homes with previous flood damage.' },
      { _key: 'f3', question: 'What areas of Wilkes-Barre do you serve?', answer: 'We buy houses throughout Wilkes-Barre including The Heights, South Wilkes-Barre, North End, Parsons, and all surrounding neighborhoods and townships.' },
      { _key: 'f4', question: 'Will you buy my house if it needs major repairs?', answer: 'Absolutely. We buy houses in any condition—fire damage, foundation issues, roof problems, you name it. No repairs needed on your part.' },
      { _key: 'f5', question: 'Are there any fees or commissions when selling to you?', answer: 'None. We don\'t charge fees or commissions, and we pay all closing costs. The cash offer you accept is the amount you receive.' }
    ]
  },
  {
    _type: 'location',
    city: 'Allentown',
    state: 'PA',
    county: 'Lehigh County',
    slug: { _type: 'slug', current: 'allentown' },
    metaTitle: 'Sell Your House Fast in Allentown, PA | Cash Home Buyers',
    metaDescription: 'Get a fair cash offer for your Allentown home in 24 hours. We buy houses in any condition in Lehigh County. No repairs, no fees, close in 7-14 days.',
    heroHeadline: 'Sell Your House Fast in',
    heroSubheadline: 'Get a fair cash offer for your Allentown home in 24 hours. We buy houses in any condition throughout Lehigh County—no repairs, no fees, no hassle.',
    nearbyTowns: ['Bethlehem', 'Emmaus', 'Whitehall', 'Catasauqua', 'Coplay', 'Fullerton', 'Macungie'],
    problemStatement: [
      {
        _type: 'block',
        _key: 'al1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'al1s', text: 'Allentown\'s housing market moves fast for updated homes, but properties that need work often struggle to find buyers. With the city\'s mix of historic row homes and older single-family houses, many homeowners face expensive repairs just to get their property market-ready.' }]
      },
      {
        _type: 'block',
        _key: 'al2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'al2s', text: 'Whether it\'s an older property in Center City that needs updating, a rental in the West End that\'s become more trouble than it\'s worth, or a house anywhere in Lehigh County that you simply need to sell fast, the traditional listing process isn\'t always the best option.' }]
      },
      {
        _type: 'block',
        _key: 'al3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'al3s', text: 'We buy houses throughout Allentown and the Lehigh Valley in any condition. No need to make repairs, clean out the property, or wait months for a buyer. Get a fair cash offer and close on your timeline.' }]
      }
    ],
    neighborhoods: ['Center City', 'West End', 'East Side', 'South Side', 'Midway Manor', 'West Park', 'Old Allentown', 'Fountain Hill', 'Salisbury Township'],
    faqs: [
      { _key: 'f1', question: 'How quickly can you buy my Allentown house?', answer: 'We can make you a cash offer within 24 hours and close in as little as 7-14 days, depending on your needs.' },
      { _key: 'f2', question: 'Do you buy row homes in Allentown?', answer: 'Yes. We buy all property types in Allentown including row homes, twins, single-family homes, and multi-family properties.' },
      { _key: 'f3', question: 'What if my Allentown property has code violations?', answer: 'We buy properties with code violations regularly. We\'ll handle resolving them after purchase—you don\'t need to fix anything.' },
      { _key: 'f4', question: 'Do you serve all of Lehigh County?', answer: 'Yes. We buy houses throughout Lehigh County including Allentown, Emmaus, Whitehall, Catasauqua, and all surrounding areas.' },
      { _key: 'f5', question: 'How do you determine your offer price?', answer: 'We evaluate the property\'s condition, location, and current market values in Allentown to make a fair, competitive cash offer.' }
    ]
  },
  {
    _type: 'location',
    city: 'Bethlehem',
    state: 'PA',
    county: 'Northampton County',
    slug: { _type: 'slug', current: 'bethlehem' },
    metaTitle: 'Sell Your House Fast in Bethlehem, PA | Cash Home Buyers',
    metaDescription: 'Get a fair cash offer for your Bethlehem home in 24 hours. We buy houses in any condition in Northampton County. No repairs, no fees, close in 7-14 days.',
    heroHeadline: 'Sell Your House Fast in',
    heroSubheadline: 'Get a fair cash offer for your Bethlehem home in 24 hours. We buy houses in any condition throughout Northampton County—no repairs, no fees, no hassle.',
    nearbyTowns: ['Easton', 'Hellertown', 'Freemansburg', 'Nazareth', 'Fountain Hill', 'Hanover Township', 'Lower Saucon'],
    problemStatement: [
      {
        _type: 'block',
        _key: 'be1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'be1s', text: 'Bethlehem\'s rich history means beautiful architecture, but also aging homes that can require significant investment to maintain. From the historic South Side to established neighborhoods on the North Side, many properties need updates that traditional buyers aren\'t willing to take on.' }]
      },
      {
        _type: 'block',
        _key: 'be2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'be2s', text: 'The Lehigh Valley market is competitive for move-in ready homes, but properties needing work can sit for months. If you\'re facing costly repairs, dealing with an inherited property, or simply need to sell quickly, waiting for the right traditional buyer may not be realistic.' }]
      },
      {
        _type: 'block',
        _key: 'be3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'be3s', text: 'We specialize in buying Bethlehem homes as-is. Whether your property is in historic South Bethlehem, the West Side, or anywhere in Northampton County, we\'ll make a fair cash offer and close when you\'re ready.' }]
      }
    ],
    neighborhoods: ['South Side', 'North Side', 'West Side', 'Center City', 'Pembroke Village', 'Edgeboro', 'Saucon Valley', 'Five Points', 'Yosko Park'],
    faqs: [
      { _key: 'f1', question: 'Do you buy historic homes in Bethlehem?', answer: 'Yes. We buy all types of properties in Bethlehem including historic homes. We understand the unique challenges these properties can present.' },
      { _key: 'f2', question: 'How fast can you close on a Bethlehem property?', answer: 'We typically close in 7-14 days, but we can work with your timeline if you need more or less time.' },
      { _key: 'f3', question: 'What areas of Bethlehem do you buy in?', answer: 'We buy throughout Bethlehem including South Side, North Side, West Side, and all Northampton County communities.' },
      { _key: 'f4', question: 'Will you buy my house if it has foundation issues?', answer: 'Yes. Foundation problems, roof issues, water damage—we buy houses with any type of repair need.' },
      { _key: 'f5', question: 'Is there any obligation if I request an offer?', answer: 'None at all. Our cash offers are completely no-obligation. You\'re free to accept, decline, or think it over.' }
    ]
  },
  {
    _type: 'location',
    city: 'Hazleton',
    state: 'PA',
    county: 'Luzerne County',
    slug: { _type: 'slug', current: 'hazleton' },
    metaTitle: 'Sell Your House Fast in Hazleton, PA | Cash Home Buyers',
    metaDescription: 'Get a fair cash offer for your Hazleton home in 24 hours. We buy houses in any condition in the Hazleton area. No repairs, no fees, close in 7-14 days.',
    heroHeadline: 'Sell Your House Fast in',
    heroSubheadline: 'Get a fair cash offer for your Hazleton home in 24 hours. We buy houses in any condition throughout the Greater Hazleton area—no repairs, no fees, no hassle.',
    nearbyTowns: ['West Hazleton', 'Freeland', 'McAdoo', 'Weatherly', 'Conyngham', 'Drums', 'Sugarloaf'],
    problemStatement: [
      {
        _type: 'block',
        _key: 'hz1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'hz1s', text: 'Hazleton\'s housing market presents unique challenges. Many properties date back to the coal mining era and require significant updates. With a changing local economy, some homeowners find themselves stuck with properties they can\'t afford to renovate or sell through traditional channels.' }]
      },
      {
        _type: 'block',
        _key: 'hz2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'hz2s', text: 'Traditional home sales in Hazleton can take months, especially for properties that aren\'t move-in ready. Bank-financed buyers often can\'t purchase homes that don\'t meet strict appraisal requirements, limiting your pool of potential buyers.' }]
      },
      {
        _type: 'block',
        _key: 'hz3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'hz3s', text: 'We buy houses throughout Greater Hazleton regardless of condition. Whether you\'re in downtown Hazleton, West Hazleton, or surrounding communities, we offer a fast, simple alternative to the traditional selling process.' }]
      }
    ],
    neighborhoods: ['Downtown Hazleton', 'North Hazleton', 'South Side', 'West Hazleton', 'Hazle Township', 'East Side', 'Hollywood', 'Lattimer'],
    faqs: [
      { _key: 'f1', question: 'Do you buy houses in the Greater Hazleton area?', answer: 'Yes. We buy throughout Hazleton, West Hazleton, Freeland, McAdoo, and all surrounding Luzerne County communities.' },
      { _key: 'f2', question: 'What if my Hazleton property needs a lot of work?', answer: 'That\'s exactly when we can help. We buy properties in any condition and handle all repairs ourselves after purchase.' },
      { _key: 'f3', question: 'How do I get a cash offer for my Hazleton home?', answer: 'Simply contact us with your property details. We\'ll evaluate your home and provide a no-obligation cash offer within 24 hours.' },
      { _key: 'f4', question: 'Can you buy my house if I owe back taxes?', answer: 'Yes. We can work with properties that have tax liens. The liens are typically paid from the sale proceeds at closing.' },
      { _key: 'f5', question: 'Will you buy houses with mine subsidence issues?', answer: 'We understand mining area challenges. We buy properties with subsidence concerns and factor any issues into our offer.' }
    ]
  },
  {
    _type: 'location',
    city: 'Stroudsburg',
    state: 'PA',
    county: 'Monroe County',
    slug: { _type: 'slug', current: 'stroudsburg' },
    metaTitle: 'Sell Your House Fast in Stroudsburg, PA | Cash Home Buyers',
    metaDescription: 'Get a fair cash offer for your Stroudsburg home in 24 hours. We buy houses in any condition in Monroe County. No repairs, no fees, close in 7-14 days.',
    heroHeadline: 'Sell Your House Fast in',
    heroSubheadline: 'Get a fair cash offer for your Stroudsburg home in 24 hours. We buy houses in any condition throughout Monroe County—no repairs, no fees, no hassle.',
    nearbyTowns: ['East Stroudsburg', 'Tannersville', 'Marshalls Creek', 'Delaware Water Gap', 'Bartonsville', 'Scotrun', 'Mount Pocono'],
    problemStatement: [
      {
        _type: 'block',
        _key: 'st1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'st1s', text: 'The Poconos real estate market can be unpredictable. While vacation properties draw interest, year-round homes in Stroudsburg and Monroe County don\'t always sell quickly—especially those needing updates or repairs that vacation-home seekers aren\'t interested in tackling.' }]
      },
      {
        _type: 'block',
        _key: 'st2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'st2s', text: 'Many Monroe County homeowners commute to New Jersey or New York for work. When job situations change or life circumstances require a quick sale, waiting months for a traditional buyer simply isn\'t practical.' }]
      },
      {
        _type: 'block',
        _key: 'st3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'st3s', text: 'Whether you own a home in downtown Stroudsburg, a property in the surrounding townships, or anywhere in Monroe County, we can make you a fair cash offer and close quickly. Skip the uncertainty of traditional listings.' }]
      }
    ],
    neighborhoods: ['Downtown Stroudsburg', 'Stroud Township', 'Glen Brook', 'McMichaels', 'Cherry Valley', 'Prospect Park', 'Stony Hollow', 'Indian Hills'],
    faqs: [
      { _key: 'f1', question: 'Do you buy vacation homes in the Poconos?', answer: 'Yes. We buy all property types in Monroe County including primary residences, vacation homes, and investment properties.' },
      { _key: 'f2', question: 'How fast can you close in Stroudsburg?', answer: 'We can close in as little as 7-14 days. This is especially helpful for out-of-area owners who can\'t manage a lengthy sale process.' },
      { _key: 'f3', question: 'What if my Stroudsburg house has been sitting vacant?', answer: 'Vacant properties are no problem. We buy houses in any condition and can close quickly to end your carrying costs.' },
      { _key: 'f4', question: 'Do you buy properties throughout Monroe County?', answer: 'Yes. We serve all of Monroe County including Stroudsburg, East Stroudsburg, Mount Pocono, Tannersville, and surrounding areas.' },
      { _key: 'f5', question: 'Can I sell if I live out of state?', answer: 'Absolutely. Many of our Monroe County sellers live elsewhere. We can handle everything remotely including a mobile notary closing.' }
    ]
  },
  {
    _type: 'location',
    city: 'Easton',
    state: 'PA',
    county: 'Northampton County',
    slug: { _type: 'slug', current: 'easton' },
    metaTitle: 'Sell Your House Fast in Easton, PA | Cash Home Buyers',
    metaDescription: 'Get a fair cash offer for your Easton home in 24 hours. We buy houses in any condition in Northampton County. No repairs, no fees, close in 7-14 days.',
    heroHeadline: 'Sell Your House Fast in',
    heroSubheadline: 'Get a fair cash offer for your Easton home in 24 hours. We buy houses in any condition throughout Northampton County—no repairs, no fees, no hassle.',
    nearbyTowns: ['Phillipsburg', 'Wilson', 'Palmer Township', 'Forks Township', 'Nazareth', 'Stockertown', 'Tatamy'],
    problemStatement: [
      {
        _type: 'block',
        _key: 'ea1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'ea1s', text: 'Easton has experienced a revitalization in recent years, but not all properties have kept pace. Many homes in established neighborhoods need significant updates, and homeowners often face the choice between expensive renovations or selling at a discount after months on the market.' }]
      },
      {
        _type: 'block',
        _key: 'ea2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'ea2s', text: 'The mix of historic row homes, older single-family houses, and properties with deferred maintenance means many Easton homes don\'t qualify for traditional financing. This dramatically limits your buyer pool and extends time on market.' }]
      },
      {
        _type: 'block',
        _key: 'ea3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'ea3s', text: 'We buy houses throughout Easton and Northampton County in any condition. From downtown properties to College Hill to the West Ward, we offer fair cash offers and fast closings without the hassle of traditional sales.' }]
      }
    ],
    neighborhoods: ['Downtown Easton', 'College Hill', 'West Ward', 'South Side', 'Palmer Township', 'Wilson Borough', 'Forks Township', 'Marx Park'],
    faqs: [
      { _key: 'f1', question: 'Do you buy houses in downtown Easton?', answer: 'Yes. We buy throughout Easton including downtown, College Hill, West Ward, South Side, and all surrounding areas.' },
      { _key: 'f2', question: 'What if my Easton property has been condemned?', answer: 'We can often still purchase condemned properties. Contact us with the details and we\'ll let you know if we can help.' },
      { _key: 'f3', question: 'How does your process work in Easton?', answer: 'Contact us, we\'ll evaluate your property, make a cash offer within 24 hours, and close in as little as 7-14 days if you accept.' },
      { _key: 'f4', question: 'Do you work with properties near the Delaware River?', answer: 'Yes. We buy properties in flood zones and can work with homes that have had previous flood issues.' },
      { _key: 'f5', question: 'Can you buy my Easton house if it\'s a rental with tenants?', answer: 'Yes. We purchase tenant-occupied properties regularly and can take over the landlord responsibilities.' }
    ]
  },
  {
    _type: 'location',
    city: 'Pittston',
    state: 'PA',
    county: 'Luzerne County',
    slug: { _type: 'slug', current: 'pittston' },
    metaTitle: 'Sell Your House Fast in Pittston, PA | Cash Home Buyers',
    metaDescription: 'Get a fair cash offer for your Pittston home in 24 hours. We buy houses in any condition in the Greater Pittston area. No repairs, no fees, close fast.',
    heroHeadline: 'Sell Your House Fast in',
    heroSubheadline: 'Get a fair cash offer for your Pittston home in 24 hours. We buy houses in any condition throughout Greater Pittston—no repairs, no fees, no hassle.',
    nearbyTowns: ['West Pittston', 'Dupont', 'Duryea', 'Avoca', 'Hughestown', 'Yatesville', 'Jenkins Township'],
    problemStatement: [
      {
        _type: 'block',
        _key: 'pi1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'pi1s', text: 'Greater Pittston\'s coal mining heritage left behind charming communities—but also aging housing stock and unique challenges like mine subsidence. Many homeowners find themselves with properties that need more investment than they can justify, or that traditional buyers simply won\'t touch.' }]
      },
      {
        _type: 'block',
        _key: 'pi2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'pi2s', text: 'Flood history along the Susquehanna has affected property values and insurance costs in parts of Pittston. Combined with an older housing stock that often needs significant updates, selling through traditional channels can be frustrating and time-consuming.' }]
      },
      {
        _type: 'block',
        _key: 'pi3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'pi3s', text: 'We understand the Greater Pittston market and buy houses in any condition. Whether your home is in Pittston City, West Pittston, Dupont, or surrounding areas, we\'ll make you a fair cash offer without requiring repairs or waiting for uncertain buyers.' }]
      }
    ],
    neighborhoods: ['Downtown Pittston', 'West Pittston', 'Dupont', 'Duryea', 'Hughestown', 'Pittston Township', 'Jenkins Township', 'Avoca'],
    faqs: [
      { _key: 'f1', question: 'Do you buy houses with mine subsidence issues in Pittston?', answer: 'Yes. We\'re familiar with mining area challenges and buy properties with subsidence history or concerns.' },
      { _key: 'f2', question: 'What areas around Pittston do you serve?', answer: 'We buy throughout Greater Pittston including Pittston City, West Pittston, Dupont, Duryea, Avoca, and all surrounding communities.' },
      { _key: 'f3', question: 'Can you buy my house if it\'s been flood damaged?', answer: 'Yes. We buy properties with flood history or damage. You don\'t need to make any repairs before selling to us.' },
      { _key: 'f4', question: 'How quickly can you close in the Pittston area?', answer: 'We can typically close in 7-14 days, though we\'re flexible if you need more or less time.' },
      { _key: 'f5', question: 'Will you buy my Pittston house if it\'s vacant?', answer: 'Absolutely. Vacant properties are no problem. We can close quickly to help you stop paying carrying costs.' }
    ]
  },
  {
    _type: 'location',
    city: 'Carbondale',
    state: 'PA',
    county: 'Lackawanna County',
    slug: { _type: 'slug', current: 'carbondale' },
    metaTitle: 'Sell Your House Fast in Carbondale, PA | Cash Home Buyers',
    metaDescription: 'Get a fair cash offer for your Carbondale home in 24 hours. We buy houses in any condition in Lackawanna County. No repairs, no fees, close in 7-14 days.',
    heroHeadline: 'Sell Your House Fast in',
    heroSubheadline: 'Get a fair cash offer for your Carbondale home in 24 hours. We buy houses in any condition throughout Lackawanna County—no repairs, no fees, no hassle.',
    nearbyTowns: ['Mayfield', 'Jermyn', 'Archbald', 'Blakely', 'Simpson', 'Fell Township', 'Scott Township'],
    problemStatement: [
      {
        _type: 'block',
        _key: 'cb1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'cb1s', text: 'Carbondale\'s historic downtown and surrounding neighborhoods feature beautiful older homes, but maintaining century-old properties isn\'t cheap. Many homeowners find themselves facing major repair bills they can\'t afford, or holding onto properties that don\'t make financial sense to keep.' }]
      },
      {
        _type: 'block',
        _key: 'cb2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'cb2s', text: 'The traditional real estate market in Carbondale can move slowly. Properties that need work often sit for months, and buyers using financing may not qualify for homes that don\'t meet strict lender requirements.' }]
      },
      {
        _type: 'block',
        _key: 'cb3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'cb3s', text: 'We buy houses throughout Carbondale and northern Lackawanna County. Whether you have a property in need of repairs, an inherited home you don\'t want, or simply need to sell fast, we offer a straightforward cash solution.' }]
      }
    ],
    neighborhoods: ['Downtown Carbondale', 'North Main', 'South Main', 'Mayfield', 'Jermyn', 'Fell Township', 'Scott Township', 'Greenfield Township'],
    faqs: [
      { _key: 'f1', question: 'Do you buy houses in northern Lackawanna County?', answer: 'Yes. We serve Carbondale, Mayfield, Jermyn, Archbald, and all surrounding northern Lackawanna County communities.' },
      { _key: 'f2', question: 'What if my Carbondale house is very old and needs everything?', answer: 'We specialize in buying properties that need work. Old houses, major repairs, complete renovations needed—we buy them all.' },
      { _key: 'f3', question: 'How do I start the process to sell my Carbondale home?', answer: 'Simply contact us with your property information. We\'ll evaluate it and provide a no-obligation cash offer, typically within 24 hours.' },
      { _key: 'f4', question: 'Can you close quickly on a Carbondale property?', answer: 'Yes. We can close in as little as 7-14 days, which is much faster than a traditional sale.' },
      { _key: 'f5', question: 'Do I need to clean out the house before selling?', answer: 'No. Leave whatever you don\'t want. We buy houses with contents included and handle cleanouts ourselves.' }
    ]
  },
  {
    _type: 'location',
    city: 'East Stroudsburg',
    state: 'PA',
    county: 'Monroe County',
    slug: { _type: 'slug', current: 'east-stroudsburg' },
    metaTitle: 'Sell Your House Fast in East Stroudsburg, PA | Cash Home Buyers',
    metaDescription: 'Get a fair cash offer for your East Stroudsburg home in 24 hours. We buy houses in any condition in Monroe County. No repairs, no fees, close fast.',
    heroHeadline: 'Sell Your House Fast in',
    heroSubheadline: 'Get a fair cash offer for your East Stroudsburg home in 24 hours. We buy houses in any condition throughout Monroe County—no repairs, no fees, no hassle.',
    nearbyTowns: ['Stroudsburg', 'Marshalls Creek', 'Bushkill', 'Shawnee', 'Delaware Water Gap', 'Brodheadsville', 'Pocono Township'],
    problemStatement: [
      {
        _type: 'block',
        _key: 'es1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'es1s', text: 'East Stroudsburg sits at the gateway to the Poconos, attracting both year-round residents and seasonal visitors. However, the local housing market can be challenging—older homes near the university may need updates, while properties further out may struggle to attract traditional buyers.' }]
      },
      {
        _type: 'block',
        _key: 'es2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'es2s', text: 'Many East Stroudsburg homeowners purchased during the early 2000s boom and now face properties worth less than expected, needing repairs they didn\'t anticipate. The long commute to New Jersey or New York makes quick sales important when job or life situations change.' }]
      },
      {
        _type: 'block',
        _key: 'es3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'es3s', text: 'We buy houses throughout East Stroudsburg and Monroe County. Whether you\'re dealing with a rental that\'s become a burden, an inherited property, or just need to relocate quickly, we offer fair cash offers and fast closings.' }]
      }
    ],
    neighborhoods: ['Downtown East Stroudsburg', 'Smithfield Township', 'Middle Smithfield', 'Price Township', 'Bushkill', 'Shawnee', 'Resica Falls', 'Minisink Hills'],
    faqs: [
      { _key: 'f1', question: 'Do you buy investment properties near ESU?', answer: 'Yes. We buy all types of properties including student rentals and investment properties near East Stroudsburg University.' },
      { _key: 'f2', question: 'What if I live out of state and own an East Stroudsburg property?', answer: 'No problem. Many of our sellers are remote. We handle everything and can close via mobile notary wherever you are.' },
      { _key: 'f3', question: 'How fast can you buy my East Stroudsburg house?', answer: 'We can make an offer within 24 hours and close in as little as 7-14 days if that timeline works for you.' },
      { _key: 'f4', question: 'Do you buy houses in the Pocono communities around East Stroudsburg?', answer: 'Yes. We serve all of Monroe County including East Stroudsburg, Stroudsburg, Mount Pocono, and all Pocono communities.' },
      { _key: 'f5', question: 'What condition does my house need to be in?', answer: 'Any condition. We buy houses that need major repairs, minor updates, or are completely move-in ready.' }
    ]
  },
  {
    _type: 'location',
    city: 'Nanticoke',
    state: 'PA',
    county: 'Luzerne County',
    slug: { _type: 'slug', current: 'nanticoke' },
    metaTitle: 'Sell Your House Fast in Nanticoke, PA | Cash Home Buyers',
    metaDescription: 'Get a fair cash offer for your Nanticoke home in 24 hours. We buy houses in any condition in the Greater Nanticoke area. No repairs, no fees, close fast.',
    heroHeadline: 'Sell Your House Fast in',
    heroSubheadline: 'Get a fair cash offer for your Nanticoke home in 24 hours. We buy houses in any condition throughout Greater Nanticoke—no repairs, no fees, no hassle.',
    nearbyTowns: ['Glen Lyon', 'Shickshinny', 'Plymouth', 'Larksville', 'Newport Township', 'Hanover Township', 'Plymouth Township'],
    problemStatement: [
      {
        _type: 'block',
        _key: 'na1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'na1s', text: 'Nanticoke\'s coal mining past shaped the community, but it also left behind an aging housing stock. Many homes require significant updates—new roofs, updated electrical, foundation repairs—that can cost more than the property is worth to fix for a traditional sale.' }]
      },
      {
        _type: 'block',
        _key: 'na2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'na2s', text: 'Selling a home in Nanticoke through traditional channels can take months, especially for properties that don\'t meet modern buyer expectations. Bank financing requirements often disqualify older homes, leaving sellers with few options.' }]
      },
      {
        _type: 'block',
        _key: 'na3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'na3s', text: 'We understand the Nanticoke market and buy houses in any condition. Whether your property is in downtown Nanticoke, Glen Lyon, or surrounding Newport Township, we offer fair cash prices and can close quickly without requiring any repairs.' }]
      }
    ],
    neighborhoods: ['Downtown Nanticoke', 'Hanover Section', 'Glen Lyon', 'Newport Township', 'Plymouth Township', 'Honey Pot', 'Wanamie', 'Alden'],
    faqs: [
      { _key: 'f1', question: 'Do you buy houses in Glen Lyon and Newport Township?', answer: 'Yes. We serve all of Greater Nanticoke including Glen Lyon, Newport Township, Wanamie, and all surrounding areas.' },
      { _key: 'f2', question: 'What if my Nanticoke property has mine subsidence issues?', answer: 'We buy properties with mine subsidence history. This is common in the area and we\'re equipped to handle it.' },
      { _key: 'f3', question: 'How much will you pay for my Nanticoke house?', answer: 'We make fair offers based on condition and market values. Contact us for a free, no-obligation cash offer on your specific property.' },
      { _key: 'f4', question: 'Can you buy my house if I\'m behind on payments?', answer: 'Yes. We can often help homeowners avoid foreclosure by purchasing quickly. We\'ll pay off your mortgage at closing.' },
      { _key: 'f5', question: 'Do I need to be present at closing?', answer: 'Not necessarily. We can arrange mobile notary services if you can\'t be there in person.' }
    ]
  }
]

async function seedLocations() {
  console.log('Starting to seed locations...')

  for (const location of locations) {
    try {
      const result = await client.create(location)
      console.log(`Created: ${location.city} (${result._id})`)
    } catch (error) {
      console.error(`Failed to create ${location.city}:`, error.message)
    }
  }

  console.log('Done seeding locations!')
}

seedLocations()
