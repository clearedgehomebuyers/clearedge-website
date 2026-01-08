import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Helper to create a text block
const textBlock = (key, text, style = 'normal') => ({
  _type: 'block',
  _key: key,
  style,
  children: [{ _type: 'span', _key: `${key}s1`, text, marks: [] }],
  markDefs: []
})

// Helper to create a block with mixed content (bold, links, etc.)
const mixedBlock = (key, children, markDefs = [], style = 'normal') => ({
  _type: 'block',
  _key: key,
  style,
  children: children.map((child, i) => ({
    _type: 'span',
    _key: `${key}s${i}`,
    text: child.text,
    marks: child.marks || []
  })),
  markDefs
})

const blogPost = {
  _type: 'blogPost',
  title: 'Pennsylvania Act 135 Blighted Property Conservatorship Help and Owner Rights: The Complete 2025 Guide',
  slug: { _type: 'slug', current: 'pennsylvania-act-135-blighted-property-conservatorship-help-owner-rights' },
  metaTitle: 'Pennsylvania Act 135 Blighted Property Conservatorship Help & Owner Rights 2025',
  metaDescription: 'Complete guide to Pennsylvania Act 135 blighted property conservatorship help and owner rights. Learn how to fight a conservatorship petition, protect your property, and understand your legal options.',
  excerpt: 'Complete guide to Pennsylvania Act 135 blighted property conservatorship help and owner rights. Learn how to fight a conservatorship petition, protect your property, and understand your legal options.',
  author: 'Tyler Swenson',
  authorTitle: 'Founder, ClearEdge Home Buyers',
  publishedAt: '2025-10-15T10:00:00Z',
  category: 'situations',

  faqs: [
    {
      _key: 'faq1',
      question: 'Can someone really take my property through Act 135?',
      answer: 'Not exactly "take" it. A conservator takes possession, not ownership. But they can ultimately sell your property if you don\'t successfully terminate the conservatorship. And the sale proceeds may leave you with nothing after all costs are deducted.'
    },
    {
      _key: 'faq2',
      question: 'How long do I have to respond to an Act 135 petition?',
      answer: 'The court sets specific deadlines when the petition is filed. Generally, you should respond as quickly as possible. A hearing will be scheduled within 60-120 days of filing. Don\'t wait.'
    },
    {
      _key: 'faq3',
      question: 'Can I be appointed as the conservator of my own property?',
      answer: 'Yes. Under Section 1105(f) of the Act, the court may grant you "conditional relief to remediate the property." You can petition to be appointed as conservator yourself if you can demonstrate the ability and willingness to rehabilitate the property.'
    },
    {
      _key: 'faq4',
      question: 'What if I\'m already renovating the property?',
      answer: 'Document everything. Permits, contractor receipts, photos, timelines. Active rehabilitation efforts can defeat the "unfit for human habitation" condition and demonstrate good faith to the court.'
    },
    {
      _key: 'faq5',
      question: 'Do I have to pay the conservator\'s costs if I win?',
      answer: 'Generally no, if you successfully defeat the petition before a conservator is appointed. However, if you sell or otherwise resolve the matter after a conservator begins work, you may owe costs incurred.'
    },
    {
      _key: 'faq6',
      question: 'Can I sell my property to avoid conservatorship?',
      answer: 'Yes, but timing matters. Selling before a petition is filed is ideal. If a petition has already been filed, selling may still be possible, but you might owe the petitioner\'s costs.'
    },
    {
      _key: 'faq7',
      question: 'What if I can\'t afford a lawyer?',
      answer: 'Contact your local legal aid organization or bar association. Some attorneys offer free consultations. Given what\'s at stake, finding legal help is critical.'
    },
    {
      _key: 'faq8',
      question: 'Does Act 135 apply outside Philadelphia?',
      answer: 'Yes. Act 135 applies statewide. It has been used in Philadelphia, Pittsburgh, Bethlehem, and communities throughout Pennsylvania including the Lehigh Valley and NEPA region.'
    },
    {
      _key: 'faq9',
      question: 'How much does it cost to fight a conservatorship petition?',
      answer: 'Legal fees vary widely. I\'ve seen owners spend $10,000-$50,000+ depending on complexity. Get estimates from multiple attorneys.'
    },
    {
      _key: 'faq10',
      question: 'What happens to my mortgage if the property is sold?',
      answer: 'The conservator can sell free and clear of all liens, including your mortgage. The mortgage company receives proceeds according to the distribution priority. But the mortgage doesn\'t just disappear—if sale proceeds don\'t cover the balance, you may still owe the deficiency.'
    }
  ],

  content: [
    // Intro
    mixedBlock('intro1', [
      { text: 'Pennsylvania Act 135 blighted property conservatorship help and owner rights', marks: ['strong'] },
      { text: ' is the most searched topic I get from worried property owners across the state.' }
    ]),
    textBlock('intro2', 'And for good reason.'),
    textBlock('intro3', 'Someone just filed a petition against your property.'),
    textBlock('intro4', 'Or you got a notice posted on your door.'),
    textBlock('intro5', 'Now you\'re panicking.'),
    textBlock('intro6', 'I get it.'),
    textBlock('intro7', 'Since 2016, I\'ve helped over 200 property owners across Eastern Pennsylvania navigate exactly this situation.'),
    textBlock('intro8', 'Some fought and won.'),
    textBlock('intro9', 'Some sold before it got worse.'),
    textBlock('intro10', 'Some lost everything because they didn\'t understand their rights.'),
    textBlock('intro11', 'Let me break down exactly what you need to know.'),

    // H2: What Is Act 135
    textBlock('h2what', 'What Is Pennsylvania Act 135 and Why Should You Care?', 'h2'),
    textBlock('what1', 'Act 135 is officially called the Abandoned and Blighted Property Conservatorship Act.'),
    textBlock('what2', 'The Pennsylvania legislature passed it in 2008.'),
    textBlock('what3', 'Governor Rendell signed it into law on November 26, 2008.'),
    textBlock('what4', 'It became effective February 24, 2009.'),
    textBlock('what5', 'Here\'s what it actually does:'),
    textBlock('what6', 'It allows nonprofits, neighbors, and even investors to petition a court to take control of your property if they claim it\'s "blighted and abandoned."'),
    textBlock('what7', 'Read that again.'),
    textBlock('what8', 'Someone who doesn\'t own your property can ask a judge to appoint a conservator to take possession of it.'),
    textBlock('what9', 'The conservator then:'),
    textBlock('what10', '• Takes physical possession of your property'),
    textBlock('what11', '• Develops a rehabilitation plan'),
    textBlock('what12', '• Fixes the property using their own funds'),
    textBlock('what13', '• Creates a lien against your property for all costs'),
    textBlock('what14', '• Can sell your property to recover those costs'),
    textBlock('what15', 'And here\'s the kicker.'),
    textBlock('what16', 'The 2014 amendments made this even more attractive to developers and investors.'),
    textBlock('what17', 'They added financial incentives.'),
    textBlock('what18', 'Now conservators can collect fees equal to the greater of:'),
    textBlock('what19', '• $2,500'),
    textBlock('what20', '• 20% of rehabilitation costs'),
    textBlock('what21', '• 20% of the sale proceeds'),
    textBlock('what22', 'That\'s on top of all their expenses, legal fees, and construction costs.'),
    textBlock('what23', 'This is why you\'re seeing more petitions filed every year.'),

    // H2: Who Can File
    textBlock('h2who', 'Who Can File an Act 135 Conservatorship Petition Against You?', 'h2'),
    textBlock('who1', 'The law calls them "parties in interest."'),
    textBlock('who2', 'Here\'s who qualifies:'),
    mixedBlock('who3', [{ text: 'Nearby Residents and Businesses:', marks: ['strong'] }]),
    textBlock('who4', '• Any resident or business owner within 2,000 feet of your property'),
    textBlock('who5', '• That\'s less than half a mile'),
    mixedBlock('who6', [{ text: 'Nonprofit Organizations:', marks: ['strong'] }]),
    textBlock('who7', '• Any nonprofit that has participated in a project within a 5-mile radius of your property'),
    textBlock('who8', '• This is where most of the aggressive petitions come from'),
    mixedBlock('who9', [{ text: 'Municipal Governments:', marks: ['strong'] }]),
    textBlock('who10', '• Cities, townships, and boroughs can file'),
    textBlock('who11', '• They can also intervene in existing petitions'),
    mixedBlock('who12', [{ text: 'Lienholders:', marks: ['strong'] }]),
    textBlock('who13', '• Mortgage companies'),
    textBlock('who14', '• Anyone with a secured interest'),
    textBlock('who15', 'The 2014 amendments expanded who can file.'),
    textBlock('who16', 'Before 2014, roughly 15 petitions were filed per year in Philadelphia.'),
    textBlock('who17', 'After 2014?'),
    textBlock('who18', 'About 60 per year.'),
    textBlock('who19', 'That tells you everything about how the incentives changed the game.'),

    // H2: Five Conditions
    textBlock('h2five', 'The Five Conditions That Must Be Met for Conservatorship', 'h2'),
    textBlock('five1', 'Here\'s where your defense starts.'),
    textBlock('five2', 'The petitioner must prove ALL FIVE of these conditions exist at the time of filing.'),
    textBlock('five3', 'If they can\'t prove even one, the petition fails.'),
    mixedBlock('five4', [{ text: 'Condition 1: Vacant for 12 Months', marks: ['strong'] }]),
    textBlock('five5', 'The building has not been "legally occupied" for at least the previous 12 months.'),
    textBlock('five6', 'Key word: "legally occupied."'),
    mixedBlock('five7', [{ text: 'The Pennsylvania Superior Court ruled in ', marks: [] }, { text: 'Scioli Turco, Inc. v. Prioleau', marks: ['em'] }, { text: ' (2019) that "legally occupied" means "occupied in a manner that comports with the law."', marks: [] }]),
    textBlock('five8', 'If you were living there legally, even if code violations existed, you may have a defense.'),
    mixedBlock('five9', [{ text: 'Condition 2: Not Actively Marketed', marks: ['strong'] }]),
    textBlock('five10', 'The property hasn\'t been actively marketed for sale in the past 60 days.'),
    textBlock('five11', '"Actively marketed" means:'),
    textBlock('five12', '• A For Sale sign with accurate contact information'),
    textBlock('five13', '• Either a licensed real estate agent listing it, OR'),
    textBlock('five14', '• Weekly print or electronic advertisements, OR'),
    textBlock('five15', '• Distributed printed advertisements'),
    textBlock('five16', 'This is one of the easiest conditions to defeat.'),
    textBlock('five17', 'List your property for sale immediately.'),
    mixedBlock('five18', [{ text: 'Condition 3: No Pending Foreclosure', marks: ['strong'] }]),
    textBlock('five19', 'The property is not subject to an imminent foreclosure action by an individual or nongovernmental entity.'),
    textBlock('five20', 'If a bank is foreclosing, that may block the conservatorship.'),
    mixedBlock('five21', [{ text: 'Condition 4: Recently Acquired', marks: ['strong'] }]),
    textBlock('five22', 'You must have owned the property for more than 6 months.'),
    textBlock('five23', 'If you just bought it, you have a built-in defense.'),
    mixedBlock('five24', [{ text: 'Condition 5: Physical Conditions', marks: ['strong'] }]),
    textBlock('five25', 'The building must be found to be at least one of the following:'),
    textBlock('five26', '• A public nuisance'),
    textBlock('five27', '• In need of substantial rehabilitation'),
    textBlock('five28', '• Unfit for human habitation'),
    textBlock('five29', '• A health or safety hazard'),
    textBlock('five30', 'The petitioner needs to prove the physical conditions with evidence.'),
    textBlock('five31', 'Photos, code violation history, inspection reports.'),

    // H2: Your Rights
    textBlock('h2rights', 'Your Rights as a Property Owner Under Act 135', 'h2'),
    textBlock('rights1', 'You have more rights than you think.'),
    mixedBlock('rights2', [{ text: 'Right to Notice:', marks: ['strong'] }]),
    textBlock('rights3', 'The petitioner must notify you of the filing and all hearings.'),
    textBlock('rights4', 'They must:'),
    textBlock('rights5', '• Post a copy of the petition on your property'),
    textBlock('rights6', '• Serve you personally according to Pennsylvania civil rules'),
    textBlock('rights7', '• Mail copies via certified or registered mail'),
    textBlock('rights8', 'If they didn\'t properly notify you, that\'s a procedural defense.'),
    mixedBlock('rights9', [{ text: 'Right to Contest:', marks: ['strong'] }]),
    textBlock('rights10', 'You can file an answer opposing the petition.'),
    textBlock('rights11', 'You can present evidence and arguments.'),
    textBlock('rights12', 'You can appear at hearings and testify.'),
    mixedBlock('rights13', [{ text: 'Right to Intervene:', marks: ['strong'] }]),
    textBlock('rights14', 'You can ask to be appointed as the conservator yourself.'),
    textBlock('rights15', 'If you can show you have the resources and plan to rehabilitate the property, the court may appoint you instead.'),
    mixedBlock('rights16', [{ text: 'Right to Due Process:', marks: ['strong'] }]),
    textBlock('rights17', 'You get a fair hearing before a judge.'),
    textBlock('rights18', 'The hearing must be scheduled within 120 days of filing (or 60 days in some jurisdictions).'),
    textBlock('rights19', 'The court must issue a decision within 30 days of the hearing.'),
    mixedBlock('rights20', [{ text: 'Right to Redeem:', marks: ['strong'] }]),
    textBlock('rights21', 'Even after a conservator is appointed, you may be able to terminate the conservatorship if you:'),
    textBlock('rights22', '• Abate all the conditions that led to the petition'),
    textBlock('rights23', '• Pay all costs incurred by the conservator'),
    textBlock('rights24', '• Provide adequate assurance to the court that you\'ll maintain the property'),

    // H2: How to Fight
    textBlock('h2fight', 'How to Fight an Act 135 Conservatorship Petition', 'h2'),
    textBlock('fight1', 'Here\'s the playbook.'),
    mixedBlock('fight2', [{ text: 'Step 1: Don\'t Ignore It', marks: ['strong'] }]),
    textBlock('fight3', 'If you don\'t respond, the court can proceed without you.'),
    textBlock('fight4', 'You will lose your rights.'),
    mixedBlock('fight5', [{ text: 'Step 2: Get Legal Representation', marks: ['strong'] }]),
    textBlock('fight6', 'This is not DIY territory.'),
    textBlock('fight7', 'Find an attorney experienced in Pennsylvania real estate law and Act 135 cases.'),
    textBlock('fight8', 'The cost of a lawyer is nothing compared to losing your property.'),
    mixedBlock('fight9', [{ text: 'Step 3: Attack the Five Conditions', marks: ['strong'] }]),
    textBlock('fight10', 'Review which of the five conditions the petitioner is claiming.'),
    textBlock('fight11', 'Build evidence against each one:'),
    textBlock('fight12', '• Utility bills showing occupancy'),
    textBlock('fight13', '• Tax records'),
    textBlock('fight14', '• Maintenance receipts'),
    textBlock('fight15', '• Photos showing property condition'),
    textBlock('fight16', '• Real estate listing agreements'),
    textBlock('fight17', '• Marketing materials'),
    mixedBlock('fight18', [{ text: 'Step 4: Challenge the Petitioner\'s Standing', marks: ['strong'] }]),
    textBlock('fight19', 'Are they really a "party in interest"?'),
    textBlock('fight20', 'Do they actually live within 2,000 feet?'),
    textBlock('fight21', 'Has the nonprofit actually done projects within 5 miles?'),
    textBlock('fight22', 'Request proof.'),
    mixedBlock('fight23', [{ text: 'Step 5: Document Everything', marks: ['strong'] }]),
    textBlock('fight24', 'If you\'ve been maintaining the property:'),
    textBlock('fight25', '• Keep receipts'),
    textBlock('fight26', '• Take dated photos'),
    textBlock('fight27', '• Save all communication'),
    textBlock('fight28', '• Document all work done'),
    mixedBlock('fight29', [{ text: 'Step 6: Consider Your Options', marks: ['strong'] }]),
    textBlock('fight30', 'Sometimes fighting costs more than it\'s worth.'),
    textBlock('fight31', 'I\'ve seen owners spend $50,000 in legal fees to save a $60,000 property.'),
    textBlock('fight32', 'Sometimes a strategic sale makes more sense.'),

    // H2: What Happens If Conservator Appointed
    textBlock('h2appointed', 'What Happens If a Conservator Is Appointed?', 'h2'),
    textBlock('appt1', 'Let\'s say the petition is granted.'),
    textBlock('appt2', 'Here\'s the timeline:'),
    mixedBlock('appt3', [{ text: 'First 90 Days:', marks: ['strong'] }]),
    textBlock('appt4', 'The conservator takes possession.'),
    textBlock('appt5', 'They develop a final rehabilitation plan.'),
    mixedBlock('appt6', [{ text: '120 Days After Appointment:', marks: ['strong'] }]),
    textBlock('appt7', 'The court holds a hearing on the final plan.'),
    mixedBlock('appt8', [{ text: 'Ongoing:', marks: ['strong'] }]),
    textBlock('appt9', 'The conservator implements the plan.'),
    textBlock('appt10', 'They must submit status reports annually or more frequently.'),
    mixedBlock('appt11', [{ text: 'Six Months Minimum:', marks: ['strong'] }]),
    textBlock('appt12', 'The conservator must be in control for at least 6 months before the court will consider a sale.'),
    mixedBlock('appt13', [{ text: 'Sale Process:', marks: ['strong'] }]),
    textBlock('appt14', 'If the owner hasn\'t successfully petitioned to terminate the conservatorship, the conservator can petition to sell.'),
    textBlock('appt15', 'The sale can be free and clear of all liens.'),
    mixedBlock('appt16', [{ text: 'Distribution of Proceeds:', marks: ['strong'] }]),
    textBlock('appt17', 'Here\'s the painful part.'),
    textBlock('appt18', 'The sale proceeds are distributed in this order:'),
    textBlock('appt19', '1. Conservator\'s fees (that 20% we mentioned)'),
    textBlock('appt20', '2. Conservator\'s expenses (legal fees, construction costs, insurance, etc.)'),
    textBlock('appt21', '3. Government liens (back taxes, municipal liens)'),
    textBlock('appt22', '4. Other liens (mortgages, judgments)'),
    textBlock('appt23', '5. Original owner (whatever\'s left)'),
    textBlock('appt24', 'In some cases, owners receive nothing.'),
    textBlock('appt25', 'I\'ve seen properties sell for $400,000 where the owner walked away with zero.'),
    textBlock('appt26', 'All the equity went to conservator fees, rehab costs, and legal expenses.'),

    // H2: Real Cases
    textBlock('h2cases', 'Real Cases That Show What Can Happen', 'h2'),
    textBlock('case1', 'Let me share what I\'ve seen.'),
    mixedBlock('case2', [{ text: 'Case 1: The Fire Victim', marks: ['strong'] }]),
    textBlock('case3', 'A 97-year-old woman\'s home caught fire on Christmas Eve.'),
    textBlock('case4', 'The family was working on repairs.'),
    textBlock('case5', 'A nonprofit filed a conservatorship petition months later, claiming the property was abandoned.'),
    textBlock('case6', 'The family had to spend resources fighting the petition.'),
    textBlock('case7', 'They eventually won when they proved the property wasn\'t abandoned—it was being remediated after a fire.'),
    textBlock('case8', 'But they still spent thousands in legal fees.'),
    mixedBlock('case9', [{ text: 'Case 2: The Inherited Property', marks: ['strong'] }]),
    textBlock('case10', 'A man inherited his mother\'s home.'),
    textBlock('case11', 'Three generations of family history.'),
    textBlock('case12', 'He planned to renovate it.'),
    textBlock('case13', 'A nonprofit filed a petition and eventually won.'),
    textBlock('case14', 'When the property sold, the conservator received:'),
    textBlock('case15', '• $253,721 in out-of-pocket expense reimbursements'),
    textBlock('case16', '• $93,149 in legal fee reimbursements'),
    textBlock('case17', '• Up to $80,000 in conservator fees'),
    textBlock('case18', 'The original owner?'),
    textBlock('case19', 'He received nothing despite spending thousands on his own repairs, permits, and legal fees.'),
    mixedBlock('case20', [{ text: 'Case 3: The Property Owner Who Listed', marks: ['strong'] }]),
    textBlock('case21', 'A developer filed a conservatorship petition.'),
    textBlock('case22', 'The owner immediately listed the property for sale with a real estate agent.'),
    textBlock('case23', 'The petition was dismissed because the property was now "actively marketed."'),
    textBlock('case24', 'The owner sold on their own terms.'),
    textBlock('case25', 'Sometimes the best defense is a good offense.'),

    // H2: When Selling Is Better
    textBlock('h2sell', 'When Selling Your Property Is the Better Option', 'h2'),
    textBlock('sell1', 'I\'ve worked with hundreds of property owners.'),
    textBlock('sell2', 'Sometimes fighting doesn\'t make sense.'),
    textBlock('sell3', 'Consider selling if:'),
    textBlock('sell4', '• The property needs substantial rehabilitation you can\'t afford'),
    textBlock('sell5', '• Legal fees would exceed the property\'s equity'),
    textBlock('sell6', '• You don\'t have time to manage a court battle'),
    textBlock('sell7', '• The stress isn\'t worth it'),
    textBlock('sell8', '• You\'ve inherited a property you don\'t want'),
    textBlock('sell9', 'Here\'s what most people don\'t realize:'),
    textBlock('sell10', 'You can sell your property at any time before the conservatorship sale is finalized.'),
    textBlock('sell11', 'But there\'s a catch.'),
    mixedBlock('sell12', [{ text: 'Under the ', marks: [] }, { text: 'Francisville Neighborhood Development Corp. v. Estate of Moore', marks: ['em'] }, { text: ' ruling (2017), even if you sell your property after being served with a petition, the petitioner may still be entitled to:', marks: [] }]),
    textBlock('sell13', '• Court costs'),
    textBlock('sell14', '• Attorney fees'),
    textBlock('sell15', '• A conservator\'s fee'),
    textBlock('sell16', 'So selling earlier—before a petition is even filed—is almost always better.'),

    // H2: How to Protect
    textBlock('h2protect', 'How to Protect Your Property from Act 135 Petitions', 'h2'),
    textBlock('prot1', 'Prevention beats cure.'),
    mixedBlock('prot2', [{ text: 'Keep the Property Occupied:', marks: ['strong'] }]),
    textBlock('prot3', 'Legal occupancy defeats the 12-month vacancy requirement.'),
    textBlock('prot4', 'Even if you\'re not living there full-time, document regular occupancy.'),
    mixedBlock('prot5', [{ text: 'Maintain It:', marks: ['strong'] }]),
    textBlock('prot6', 'Address code violations promptly.'),
    textBlock('prot7', 'Keep records of all maintenance work.'),
    textBlock('prot8', 'Take dated photos regularly.'),
    mixedBlock('prot9', [{ text: 'Keep Utilities On:', marks: ['strong'] }]),
    textBlock('prot10', 'Active utility accounts help prove occupancy.'),
    mixedBlock('prot11', [{ text: 'Actively Market It:', marks: ['strong'] }]),
    textBlock('prot12', 'If you\'re considering selling, list it.'),
    textBlock('prot13', 'Even at an above-market price, a listing defeats one of the five conditions.'),
    mixedBlock('prot14', [{ text: 'Pay Your Taxes:', marks: ['strong'] }]),
    textBlock('prot15', 'Tax delinquency is a red flag.'),
    textBlock('prot16', 'It makes your property a target.'),
    mixedBlock('prot17', [{ text: 'Know Your Neighbors:', marks: ['strong'] }]),
    textBlock('prot18', 'Build relationships.'),
    textBlock('prot19', 'Neighbors within 2,000 feet can file petitions.'),
    textBlock('prot20', 'Good relationships matter.'),

    // H2: Resources
    textBlock('h2resources', 'Resources for Pennsylvania Property Owners', 'h2'),
    textBlock('res1', 'Here are some resources:'),
    mixedBlock('res2', [{ text: 'Housing Alliance of Pennsylvania:', marks: ['strong'] }]),
    textBlock('res3', 'They have a Conservatorship Clearinghouse with training and resources.'),
    mixedBlock('res4', [{ text: 'Regional Housing Legal Services:', marks: ['strong'] }]),
    textBlock('res5', 'They published the Conservatorship Implementation and Best Practices Manual.'),
    mixedBlock('res6', [{ text: 'Pennsylvania General Assembly:', marks: ['strong'] }]),
    textBlock('res7', 'The full text of Act 135 is available at legis.state.pa.us.'),
    mixedBlock('res8', [{ text: 'Local Bar Associations:', marks: ['strong'] }]),
    textBlock('res9', 'Contact your county bar association for attorney referrals.'),

    // H2: Final Thoughts
    textBlock('h2final', 'Final Thoughts on Pennsylvania Act 135 Blighted Property Conservatorship Help and Owner Rights', 'h2'),
    textBlock('fin1', 'Look, I\'m not going to sugarcoat it.'),
    textBlock('fin2', 'Act 135 has helped clean up legitimately blighted properties across Pennsylvania.'),
    textBlock('fin3', 'But it\'s also been used against property owners who got caught in difficult circumstances—fires, inheritance issues, financial hardship.'),
    textBlock('fin4', 'The law gives you rights.'),
    textBlock('fin5', 'Use them.'),
    textBlock('fin6', 'If you\'ve received a petition notice, get legal help immediately.'),
    textBlock('fin7', 'If you own a vacant property, take preventive steps now.'),
    textBlock('fin8', 'And if you\'re facing a situation where selling makes more sense than fighting, know that option exists.'),
    textBlock('fin9', 'At ClearEdge Home Buyers, I\'ve helped property owners across Eastern PA navigate these exact situations since 2016.'),
    textBlock('fin10', 'Sometimes that means coaching them on how to fight.'),
    textBlock('fin11', 'Sometimes that means giving them a fair cash offer so they can move on.'),
    mixedBlock('fin12', [
      { text: 'Learn more about our simple 3-step selling process: ' },
      { text: 'How It Works', marks: ['howLink'] }
    ], [{ _type: 'link', _key: 'howLink', href: '/how-it-works' }]),
    mixedBlock('fin13', [
      { text: 'Want a FREE, no-obligation cash offer on your Eastern PA property? ' },
      { text: 'Request your offer here', marks: ['homeLink'] }
    ], [{ _type: 'link', _key: 'homeLink', href: '/' }]),
    mixedBlock('fin14', [
      { text: 'Understanding Pennsylvania Act 135 blighted property conservatorship help and owner rights is the first step to protecting what\'s yours', marks: ['strong'] },
      { text: '—now take action.' }
    ]),

    // Author bio
    mixedBlock('bio', [
      { text: 'Tyler Swenson is a real estate investor, property specialist, and community advocate serving Eastern Pennsylvania. He is the founder of ClearEdge Home Buyers, a trusted cash home buying company that has helped over 200 homeowners across NEPA, Lehigh Valley, and the Poconos sell their properties quickly and hassle-free—a business he built from the ground up starting with a single duplex in 2016. Tyler is also a recognized voice in Pennsylvania\'s real estate investment community, having been featured in local publications including The Morning Call and Lehigh Valley Business, and regularly speaks at REIA meetups throughout Eastern PA. His free guides on selling distressed properties have been downloaded by over 5,000 Pennsylvania homeowners, and his YouTube channel has helped thousands navigate difficult selling situations.', marks: ['em'] }
    ]),
  ]
}

async function main() {
  console.log('Starting PA Act 135 conservatorship blog post creation...')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')

  try {
    // Fetch location references - this is a statewide article, so we'll link to major regions
    console.log('\nFetching Pennsylvania location references...')
    const locations = await client.fetch(
      `*[_type == "location" && (
        city in ["Philadelphia", "Pittsburgh", "Bethlehem", "Allentown", "Scranton", "Wilkes-Barre"] ||
        county in ["Lehigh County", "Lackawanna County", "Luzerne County"]
      )]{ _id, city, county, slug }`
    )

    console.log(`Found ${locations.length} location(s):`)
    locations.forEach(loc => {
      console.log(`  - ${loc.city} (${loc.county || 'No county'}) - slug: ${loc.slug?.current}`)
    })

    // Fetch situation references
    console.log('\nFetching situation references...')
    const situations = await client.fetch(
      `*[_type == "situation" && (
        slug.current in ["inherited-property", "code-violations", "vacant-property", "behind-on-taxes"]
      )]{ _id, title, slug }`
    )
    console.log('Found situations:', situations.map(s => s.title))

    // Build location references
    const locationRefs = locations.map(loc => ({
      _type: 'reference',
      _ref: loc._id,
      _key: `loc_${loc._id.replace(/[^a-zA-Z0-9]/g, '_')}`
    }))

    // Build situation references
    const situationRefs = situations.map(sit => ({
      _type: 'reference',
      _ref: sit._id,
      _key: `sit_${sit._id.replace(/[^a-zA-Z0-9]/g, '_')}`
    }))

    // Build the complete document
    const doc = {
      ...blogPost,
      relatedLocations: locationRefs,
      relatedSituations: situationRefs
    }

    console.log('\nCreating blog post...')
    const result = await client.create(doc)
    console.log('\n✅ Blog post created successfully!')
    console.log('Document ID:', result._id)
    console.log('Title:', result.title)
    console.log('Slug:', result.slug.current)
    console.log('Published Date:', result.publishedAt)
    console.log(`\nRelated Locations: ${locationRefs.length}`)
    console.log(`Related Situations: ${situationRefs.length}`)
    console.log('\nView at: https://www.clearedgehomebuyers.com/blog/pennsylvania-act-135-blighted-property-conservatorship-help-owner-rights')

    // Verify the creation
    console.log('\nVerifying creation...')
    const verifyPost = await client.fetch(
      `*[_id == $id][0]{
        _id,
        title,
        slug,
        publishedAt,
        "locationCount": count(relatedLocations),
        "situationCount": count(relatedSituations),
        "relatedLocations": relatedLocations[]->{ city, county }
      }`,
      { id: result._id }
    )

    console.log('\nVerification:')
    console.log('  Title:', verifyPost.title)
    console.log('  Published:', verifyPost.publishedAt)
    console.log('  Location tags:', verifyPost.locationCount)
    if (verifyPost.relatedLocations) {
      verifyPost.relatedLocations.forEach(loc => {
        console.log(`    - ${loc.city} (${loc.county})`)
      })
    }
    console.log('  Situation tags:', verifyPost.situationCount)

    return result
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    if (error.response) {
      console.error('Response:', error.response)
    }
    throw error
  }
}

main()
