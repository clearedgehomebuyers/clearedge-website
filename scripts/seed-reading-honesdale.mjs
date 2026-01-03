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
    city: 'Reading',
    state: 'PA',
    county: 'Berks County',
    slug: { _type: 'slug', current: 'reading' },
    metaTitle: 'Sell Your House Fast in Reading, PA | Cash Home Buyers',
    metaDescription: 'Get a fair cash offer for your Reading home in 24 hours. We buy houses in any condition in Berks County. No repairs, no fees, close in 7-14 days.',
    heroHeadline: 'Sell Your House Fast in',
    heroSubheadline: 'Get a fair cash offer for your Reading home in 24 hours. We buy houses in any condition throughout Berks County—no repairs, no fees, no hassle.',
    nearbyTowns: ['West Reading', 'Wyomissing', 'Shillington', 'Sinking Spring', 'Kenhorst', 'Mohnton', 'Birdsboro'],
    problemStatement: [
      {
        _type: 'block',
        _key: 'rd1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'rd1s', text: 'Reading\'s rich industrial history gave rise to beautiful row homes and established neighborhoods, but many of these properties now require significant investment to maintain. With an older housing stock and changing market conditions, homeowners often find themselves with properties that need more work than they can afford—or that traditional buyers simply won\'t consider.' }]
      },
      {
        _type: 'block',
        _key: 'rd2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'rd2s', text: 'The Berks County real estate market can be challenging for homes that aren\'t move-in ready. Bank-financed buyers often can\'t qualify for properties with deferred maintenance, code violations, or structural issues. This leaves many Reading homeowners stuck waiting months for a buyer who may never come.' }]
      },
      {
        _type: 'block',
        _key: 'rd3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'rd3s', text: 'Whether you own a row home downtown, a property in Pendora Park, or a house anywhere in Berks County that needs work, we offer a straightforward solution. No repairs needed, no waiting for traditional buyers, no uncertainty—just a fair cash offer and a closing date that works for you.' }]
      }
    ],
    neighborhoods: ['Downtown Reading', 'Pendora Park', 'Glenside', 'Hampden Heights', 'Mount Penn', 'West Reading', 'Wyomissing', 'Centre Park', 'Oakbrook', 'Alsace Manor'],
    faqs: [
      { _key: 'f1', question: 'How fast can you close on a house in Reading?', answer: 'We can close in as little as 7-14 days. If you need more time to relocate, we\'re flexible and can work around your schedule.' },
      { _key: 'f2', question: 'Do you buy row homes in Reading?', answer: 'Yes. We buy all property types throughout Reading including row homes, twins, single-family homes, and multi-family properties in any condition.' },
      { _key: 'f3', question: 'What areas of Reading do you serve?', answer: 'We buy houses throughout Reading including Downtown, Pendora Park, Glenside, Mount Penn, and all surrounding Berks County communities.' },
      { _key: 'f4', question: 'Will you buy my Reading house if it has code violations?', answer: 'Absolutely. We regularly purchase properties with code violations and handle resolving them after the sale. You don\'t need to fix anything.' },
      { _key: 'f5', question: 'Are there any fees when selling my Reading house to you?', answer: 'None. We don\'t charge fees or commissions, and we pay all closing costs. The cash offer you accept is the amount you receive at closing.' }
    ]
  },
  {
    _type: 'location',
    city: 'Honesdale',
    state: 'PA',
    county: 'Wayne County',
    slug: { _type: 'slug', current: 'honesdale' },
    metaTitle: 'Sell Your House Fast in Honesdale, PA | Cash Home Buyers',
    metaDescription: 'Get a fair cash offer for your Honesdale home in 24 hours. We buy houses in any condition in Wayne County. No repairs, no fees, close in 7-14 days.',
    heroHeadline: 'Sell Your House Fast in',
    heroSubheadline: 'Get a fair cash offer for your Honesdale home in 24 hours. We buy houses in any condition throughout Wayne County—no repairs, no fees, no hassle.',
    nearbyTowns: ['Hawley', 'Lake Ariel', 'Waymart', 'Carbondale', 'Hamlin', 'Lakeville', 'White Mills'],
    problemStatement: [
      {
        _type: 'block',
        _key: 'hd1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'hd1s', text: 'Wayne County\'s scenic beauty and rural character attract those seeking a quieter lifestyle, but the local real estate market can be unpredictable. Many Honesdale properties were built generations ago and require updates that today\'s traditional buyers aren\'t willing to undertake. Seasonal fluctuations and limited buyer pools can make selling through conventional methods frustrating and time-consuming.' }]
      },
      {
        _type: 'block',
        _key: 'hd2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'hd2s', text: 'Whether you\'ve inherited a family property in the borough, own a lakeside home that\'s become a burden, or have a house in Texas Township that needs more repairs than you can manage, the traditional listing process often isn\'t the best solution. Rural properties can sit on the market for months, and bank financing requirements can disqualify homes that need work.' }]
      },
      {
        _type: 'block',
        _key: 'hd3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'hd3s', text: 'We buy houses throughout Honesdale and Wayne County in any condition. From downtown properties to homes in surrounding townships, we understand the local market and offer fair cash prices without requiring repairs, cleanouts, or months of waiting for the right buyer.' }]
      }
    ],
    neighborhoods: ['Downtown Honesdale', 'Texas Township', 'Cherry Ridge', 'Dyberry Township', 'Berlin Township', 'Oregon Township', 'Damascus Township', 'Hawley Borough', 'Lake Ariel', 'Lakeville'],
    faqs: [
      { _key: 'f1', question: 'Do you buy houses in rural Wayne County?', answer: 'Yes. We buy properties throughout Wayne County including Honesdale, Hawley, Lake Ariel, and all surrounding rural townships.' },
      { _key: 'f2', question: 'What if my Honesdale property has well and septic issues?', answer: 'We buy houses with well and septic systems in any condition. Failed inspections or needed repairs won\'t prevent us from making an offer.' },
      { _key: 'f3', question: 'How fast can you close on a Wayne County property?', answer: 'We can typically close in 7-14 days, though we\'re flexible if you need more time to relocate or handle personal matters.' },
      { _key: 'f4', question: 'Can you buy my lake house or vacation property?', answer: 'Absolutely. We purchase all property types including primary residences, lake houses, vacation homes, and investment properties.' },
      { _key: 'f5', question: 'What if I live out of state and own a Honesdale property?', answer: 'No problem. Many of our sellers are remote. We can handle everything including a mobile notary closing wherever you\'re located.' }
    ]
  }
]

async function seedLocations() {
  console.log('Starting to seed Reading and Honesdale locations...')

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
