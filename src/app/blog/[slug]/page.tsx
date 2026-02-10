import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'
import { V0FAQ } from '@/components/v0-faq'
import { getBlogPostBySlug, getBlogPostSlugs } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { TrackedCTALink } from '@/components/TrackedCTALink'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

// Answer-First Summaries for blog posts (SEO optimization for AI/featured snippets)
const answerFirstSummaries: Record<string, { question: string; answer: string }> = {
  'sell-my-house-fast-poconos-pa': {
    question: "How do I sell my Poconos vacation home fast?",
    answer: "You can sell your Poconos house fast by working with a local cash buyer who understands the vacation home market. Cash sales typically close in 7-14 days with no repairs, no STR compliance issues, and no seasonal timing concerns. This is especially valuable for out-of-state owners or those facing new Monroe County regulations."
  },
  'sell-house-wilkes-barre-code-violations': {
    question: "Can I sell a house in Wilkes-Barre with code violations?",
    answer: "Yes. You can sell a Wilkes-Barre house with code violations to a cash buyer who takes on the violations at closing. You won't need to fix the issues first — the violations transfer with the property. This avoids the $100+/day fines from the city while getting you a fair cash offer within 24 hours."
  },
  'sell-my-house-fast-lehigh-valley': {
    question: "What's the fastest way to sell my Lehigh Valley house?",
    answer: "The fastest way to sell in the Lehigh Valley (Allentown, Bethlehem, Easton) is a direct cash sale, which can close in 7-14 days. This bypasses the typical 60-90 day traditional sale process, eliminates repair requirements, and avoids agent commissions. Cash buyers purchase as-is regardless of condition."
  },
  'cash-home-buyers-pottsville-pa': {
    question: "Are there legitimate cash home buyers in Pottsville PA?",
    answer: "Yes. Legitimate cash home buyers in Pottsville purchase Coal Region properties in any condition, close in 7-14 days, and charge zero fees. Look for local companies with Google reviews, a physical presence in the area, and transparent offer calculations. Avoid anyone who asks for upfront fees or won't explain their pricing."
  },
  'hazleton-residential-occupancy-inspection-checklist': {
    question: "What does Hazleton check during a residential occupancy inspection?",
    answer: "Hazleton's occupancy inspection checks: working smoke/CO detectors on every level, proper guardrails (36\" minimum height), GFCIs in wet areas, egress windows in bedrooms, functional plumbing with no leaks, hot water temperature under 120°F, and no visible electrical hazards. The fee is $50 and inspections are required before any tenant moves in."
  },
  'how-to-stop-berks-county-judicial-sale-2026': {
    question: "How can I stop a Berks County judicial tax sale?",
    answer: "You have 6 options to stop a Berks County judicial sale: (1) pay the full tax debt before the sale, (2) enter a payment plan with the Tax Claim Bureau, (3) file for bankruptcy to trigger automatic stay, (4) sell the property before the sale date, (5) contest the sale if proper procedures weren't followed, or (6) redeem the property within 9 months after sale (residential only)."
  },
  'stop-govos-fines-poconos-house': {
    question: "How do I stop GovOS fines on my Poconos rental property?",
    answer: "To stop GovOS fines in the Poconos, you must either: (1) register your STR with the county and become compliant, (2) convert to long-term rental (12+ month leases), (3) stop renting entirely and use it personally, or (4) sell the property. Monroe County's MCOCA system tracks all major booking platforms, so operating unregistered leads to cumulative daily fines."
  },
  'sell-my-house-fast-allentown': {
    question: "What's the fastest way to sell my house in Allentown?",
    answer: "The fastest way to sell in Allentown is a cash sale, which can close in as little as 7 days. You avoid repairs, skip the 60-90 day listing process, and don't pay the 6% agent commission. Cash buyers purchase as-is — whether you're in Center City, the West End, or South Allentown. Get an offer within 24 hours."
  },
  'sell-deceased-parents-house-without-probate-pennsylvania': {
    question: "Can I sell my deceased parents' house without probate in PA?",
    answer: "Sometimes yes. You can avoid probate in Pennsylvania if: (1) you were joint owner with rights of survivorship, (2) the house was in a living trust, (3) there's a transfer-on-death deed, or (4) you're the surviving spouse and the estate is under $50,000. Otherwise, probate is required — but a cash buyer can work around the probate timeline and close once you have Letters Testamentary."
  },
  'documents-required-selling-inherited-property-pennsylvania': {
    question: "What documents do I need to sell an inherited house in Pennsylvania?",
    answer: "To sell inherited property in PA, you need: (1) certified death certificate, (2) Letters Testamentary or Letters of Administration from the Register of Wills, (3) the deed showing current ownership, (4) REU-500 inheritance tax waiver (if required), and (5) signed agreement from all heirs. If the property passed outside probate, you'll need the transfer documentation (trust, TOD deed, or survivorship deed)."
  },
  'sell-my-house-fast-bethlehem-pa-18015-tax-lien': {
    question: "Can I sell my Bethlehem house with a tax lien?",
    answer: "Yes. You can sell a Bethlehem house with a tax lien — the lien gets paid from the sale proceeds at closing. A cash buyer can close in 7-14 days, which is often fast enough to avoid the escalating penalties and potential sheriff sale. You don't need to pay off the lien first; it's settled through the title company at closing."
  },
  'pennsylvania-job-relocation-home-buyout-fast-equity-release-2026': {
    question: "How do I sell my PA house fast for job relocation?",
    answer: "For job relocation in Pennsylvania, you have three main options: (1) employer relocation buyout program (if offered), (2) iBuyer instant offer (limited availability), or (3) direct cash buyer sale. Cash buyers can close in 7-14 days, let you pick your closing date to match your start date, and purchase as-is with no repair requirements. This prevents paying two mortgages."
  },
  'selling-water-damaged-house-18102-mold-issues': {
    question: "Can I sell a water-damaged house with mold in Allentown?",
    answer: "Yes. You can sell a water-damaged house with mold in Allentown's 18102 zip code to a cash buyer. Pennsylvania requires disclosure of known water damage and mold, but you don't have to remediate before selling. Cash buyers purchase as-is and factor remediation costs into their offer. This avoids the $10K-$30K in remediation costs you'd need for a traditional sale."
  },
  'scranton-pa-major-structural-damage-disclosure-law-2026': {
    question: "What must I disclose about structural damage when selling in Scranton?",
    answer: "Under Pennsylvania's Real Estate Seller Disclosure Law (RESDL), you must disclose any known structural defects in a Scranton home sale. This includes: foundation cracks, settling, bowing walls, roof structural damage, mine subsidence damage, and any repairs made to structural issues. Disclosure is required on the standard PA disclosure form — failure to disclose can result in legal liability."
  },
  'avoid-foreclosure-scranton-pa': {
    question: "How can I avoid foreclosure in Scranton PA?",
    answer: "You have 7 options to avoid foreclosure in Scranton: (1) loan modification with your lender, (2) forbearance agreement, (3) refinancing if you have equity, (4) sell the house before sheriff sale, (5) short sale if underwater, (6) deed in lieu of foreclosure, or (7) file Chapter 13 bankruptcy for automatic stay. Selling to a cash buyer is often fastest — close in 7-14 days and walk away with equity."
  },
  'cash-home-buyers-lackawanna-county-no-fees': {
    question: "Are there really cash home buyers in Lackawanna County with no fees?",
    answer: "Yes. Legitimate cash home buyers in Lackawanna County don't charge fees to sellers — they make their profit by renovating and reselling the home. 'No fees' means no agent commissions, no closing costs, and no hidden charges. The offer you accept is the amount you receive (minus any mortgage payoff). Be wary of anyone asking for upfront payments."
  },
  'sell-my-house-fast-luzerne-county-pa': {
    question: "What's the fastest way to sell my Luzerne County house?",
    answer: "The fastest way to sell in Luzerne County (Wilkes-Barre, Hazleton, Pittston, Kingston) is a cash sale, which closes in 7-14 days. This is significantly faster than the 90+ day average for traditional listings in the area. Cash buyers purchase as-is with no repairs, no inspections, and no financing contingencies that could derail the sale."
  },
  'cash-home-buyers-berks-county': {
    question: "How do cash home buyers work in Berks County?",
    answer: "Cash home buyers in Berks County (Reading, West Reading, Wyomissing, Shillington) purchase houses directly, skipping the traditional listing process. You contact them, they assess your property, and provide a cash offer within 24 hours. If accepted, closing happens in 7-30 days. No repairs needed, no showings, no agent commissions. The trade-off is typically a lower price than market value in exchange for speed and certainty."
  },
  'sell-my-house-fast-dunmore-mine-subsidence': {
    question: "Can I sell my Dunmore house with mine subsidence damage?",
    answer: "Yes. You can sell a Dunmore house with mine subsidence damage to a cash buyer who understands NEPA's coal mining history. Traditional buyers often can't get insurance or financing on mine-damaged properties, but cash buyers purchase as-is. You must disclose the damage, but you don't need to repair it. Get a fair offer that accounts for the structural issues."
  },
  'selling-house-international-property-maintenance-code-violations-bethlehem': {
    question: "Can I sell a house with IPMC violations in Bethlehem?",
    answer: "Yes. You can sell a Bethlehem house with International Property Maintenance Code (IPMC/Article 1733) violations to a cash buyer. The violations transfer with the property at closing — you don't need to fix them first. This stops the daily fine accumulation and gets you out of a property that's costing you money. Cash buyers handle the violation abatement after purchase."
  },
  'easton-pa-rental-inspection-checklist-2026': {
    question: "What does Easton PA check in rental inspections?",
    answer: "Easton rental inspections check: smoke detectors (one per level + bedrooms), CO detectors (one per level), working locks on all exterior doors, window screens and locks, functional HVAC, no exposed wiring, working plumbing with no leaks, handrails on stairs (4+ steps), and 36\" guardrails. Inspections are ward-based on a 3-year cycle. Fee is $75/unit."
  },
  'pennsylvania-act-135-blighted-property-conservatorship-help-owner-rights': {
    question: "What are my rights if someone files an Act 135 conservatorship on my property?",
    answer: "If you're facing an Act 135 conservatorship petition in Pennsylvania, you have the right to: (1) receive notice and a hearing, (2) present evidence that your property isn't blighted, (3) propose a remediation plan, (4) appeal the court's decision, and (5) pay to terminate the conservatorship. The best defense is demonstrating active improvement efforts. If a conservator is appointed, they can repair and lien your property — or sell it."
  },
  'sell-house-fast-during-divorce-lehigh-county-pa': {
    question: "How do I sell my house fast during divorce in Lehigh County?",
    answer: "To sell during a Lehigh County divorce: both parties must agree to sell (or the court orders it), sign the listing agreement and sales contracts, and agree on proceeds distribution. A cash sale is fastest — close in 7-14 days vs. 60-90 days traditional. The proceeds go to a title company and are distributed according to your divorce agreement or court order. No repairs, no showings, no delays."
  },
  'sell-hoarder-house-reading-pa-without-cleanout': {
    question: "Can I sell a hoarder house in Reading without cleaning it out?",
    answer: "Yes. You can sell a hoarder house in Reading PA without cleaning it out. Cash buyers purchase as-is and handle all cleanout after closing — you don't need to spend $5,000-$15,000 on professional cleanout services. Leave everything behind: furniture, junk, personal items. The cash offer accounts for cleanout costs, but you avoid the emotional and physical burden of doing it yourself."
  },
  'luzerne-county-rental-property-registration-inspection-requirements-2026': {
    question: "What are Luzerne County's rental registration requirements?",
    answer: "Luzerne County rental requirements vary by municipality: Wilkes-Barre requires registration ($35/unit) + inspection, Hazleton requires occupancy permits ($50) + inspection, Pittston requires licensing ($50/unit), and Kingston requires registration + Certificate of Occupancy. Most require inspections before new tenants move in. Failure to register can result in fines of $100-$1,000/day depending on the municipality."
  },
}

export async function generateStaticParams() {
  const slugs: string[] = await getBlogPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: 'article',
      siteName: 'ClearEdge Home Buyers',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      url: `https://www.clearedgehomebuyers.com/blog/${post.slug.current}`,
      images: post.featuredImage?.asset?.url
        ? [{ url: post.featuredImage.asset.url }]
        : [{ url: 'https://www.clearedgehomebuyers.com/og-image.png', width: 1200, height: 630, alt: 'ClearEdge Home Buyers' }],
    },
    alternates: {
      canonical: `https://www.clearedgehomebuyers.com/blog/${post.slug.current}`,
    },
  }
}

export const revalidate = 3600

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: { url: string }; alt?: string; caption?: string } }) => {
      if (!value?.asset?.url) return null
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || 'Blog article image'}
            width={800}
            height={500}
            className="rounded-2xl w-full"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-ce-ink/70 mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-serif font-medium mt-8 mb-4 text-ce-ink">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-serif font-medium mt-8 mb-3 text-ce-ink">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-serif font-medium mt-6 mb-2 text-ce-ink">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-ce-ink/70 leading-relaxed text-lg">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-ce-green pl-6 my-8 italic text-ce-ink/70 text-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const target = value?.openInNewTab ? '_blank' : undefined
      const rel = value?.openInNewTab ? 'noopener noreferrer' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-ce-green hover:underline font-medium"
        >
          {children}
        </a>
      )
    },
    strong: ({ children }) => (
      <strong className="font-bold">{children}</strong>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-ce-ink/70 text-lg">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-ce-ink/70 text-lg">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatCategory = (category: string) => {
    return category?.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) || ''
  }

  // Article Schema
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: post.featuredImage?.asset?.url,
    author: {
      '@type': 'Person',
      '@id': 'https://www.clearedgehomebuyers.com/#tyler',
      name: 'Tyler',
      jobTitle: 'Owner',
      worksFor: {
        '@id': 'https://www.clearedgehomebuyers.com/#organization',
      },
      description: 'Tyler founded ClearEdge Home Buyers in 2016 and has personally purchased over 200 homes across 21 Eastern Pennsylvania markets. He writes in-depth guides to help PA homeowners understand their options when selling.',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.clearedgehomebuyers.com/#organization',
      name: 'ClearEdge Home Buyers',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.clearedgehomebuyers.com/logo.webp',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.clearedgehomebuyers.com/blog/${post.slug.current}`,
    },
  }

  // FAQ Schema (if FAQs exist)
  const faqJsonLd = post.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map((faq: { question: string; answer: string }) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null

  // BreadcrumbList Schema
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.clearedgehomebuyers.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.clearedgehomebuyers.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://www.clearedgehomebuyers.com/blog/${post.slug.current}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <main className="bg-white">
        <V0Header />

        <article className="pb-16">
          {/* Title Section - Beige */}
          <section className="pt-32 md:pt-40 pb-10 md:pb-12 bg-surface-cream">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Breadcrumb */}
              <nav className="flex items-center text-sm text-ce-ink/70 mb-6">
                <Link href="/" className="hover:text-ce-green transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <Link href="/blog" className="hover:text-ce-green transition-colors">Blog</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-ce-ink/70 truncate max-w-[200px]">{post.title}</span>
              </nav>

              {/* Category */}
              {post.category && (
                <span className="inline-block px-3 py-1 bg-ce-green/10 text-ce-green rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
                  {formatCategory(post.category)}
                </span>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-ce-ink leading-tight">
                {post.title}
              </h1>
            </div>
          </section>

          {/* Author Bar - Sage Green Gradient (matches homepage trust bar) */}
          <section className="py-4 md:py-6 bg-gradient-to-b from-surface-green-wash to-surface-green-tint">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm md:text-base">
                <span className="text-ce-ink font-medium">{post.author}</span>
                <span className="text-ce-ink/30">|</span>
                <time dateTime={post.publishedAt} className="text-ce-ink/70">
                  {formatDate(post.publishedAt)}
                </time>
                {post.updatedAt && post.updatedAt !== post.publishedAt && (
                  <>
                    <span className="text-ce-ink/30">|</span>
                    <time dateTime={post.updatedAt} className="text-ce-ink/70 text-sm">
                      Last Updated: {formatDate(post.updatedAt)}
                    </time>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Answer-First Summary */}
          {answerFirstSummaries[post.slug.current] && (
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              <div className="bg-ce-green-subtle border border-ce-green/20 rounded-2xl p-6 md:p-8">
                <p className="text-ce-green font-medium text-sm uppercase tracking-wide mb-2">Quick Answer</p>
                <h2 className="font-serif text-xl md:text-2xl font-medium text-ce-ink mb-4">
                  {answerFirstSummaries[post.slug.current].question}
                </h2>
                <p className="text-ce-ink/80 leading-relaxed text-lg">
                  {answerFirstSummaries[post.slug.current].answer}
                </p>
              </div>
            </div>
          )}

          {/* Featured Image */}
          {post.featuredImage?.asset?.url && (
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={urlFor(post.featuredImage).width(1200).height(675).url()}
                  alt={post.featuredImage.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="prose prose-lg max-w-none">
              <PortableText value={post.content} components={portableTextComponents} />
            </div>
          </div>

          {/* FAQs Section */}
          {post.faqs && post.faqs.length > 0 && (
            <V0FAQ
              faqs={post.faqs}
              title="Frequently Asked Questions"
              subtitle=""
            />
          )}

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Related Links */}
            {(post.relatedLocations?.length > 0 || post.relatedSituations?.length > 0) && (
              <section className="mt-8 pt-10 border-t border-ce-ink/10">
                <h2 className="text-xl font-serif font-medium text-ce-ink mb-4">Related Pages</h2>
                <div className="flex flex-wrap gap-3">
                  {post.relatedLocations?.map((location: { _id: string; city: string; slug: { current: string } }) => (
                    <Link
                      key={location._id}
                      href={`/locations/${location.slug.current}`}
                      className="bg-surface-cream hover:bg-ce-green hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      {location.city}, PA
                    </Link>
                  ))}
                  {post.relatedSituations?.map((situation: { _id: string; title: string; slug: { current: string } }) => (
                    <Link
                      key={situation._id}
                      href={`/situations/${situation.slug.current}`}
                      className="bg-surface-cream hover:bg-ce-green hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      {situation.title}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Author Bio */}
            <section className="mt-8 pt-10 border-t border-ce-ink/10">
              <div className="bg-surface-cream rounded-2xl p-6 md:p-8">
                <h3 className="font-serif font-medium text-lg text-ce-ink mb-4">About the Author</h3>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex-shrink-0">
                    <Image
                      src="/tyler.jpg"
                      alt="Tyler - Owner of ClearEdge Home Buyers"
                      width={80}
                      height={80}
                      className="rounded-full object-cover w-20 h-20"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-ce-ink mb-1">Tyler</p>
                    <p className="text-sm text-ce-green font-medium mb-3">Owner, ClearEdge Home Buyers</p>
                    <p className="text-ce-ink/70 leading-relaxed">
                      Tyler founded ClearEdge Home Buyers in 2016 and has personally purchased over 200 homes across 21 Eastern Pennsylvania markets — from Scranton and Wilkes-Barre to the Lehigh Valley and Poconos. He writes these guides to help PA homeowners understand their options, whether they&apos;re facing foreclosure, navigating probate, dealing with code violations, or simply want a faster alternative to the traditional listing process.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="mt-8 bg-surface-cream rounded-2xl p-8 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-serif font-medium text-ce-ink mb-4">Want to Know What Your House Is Worth in Cash?</h2>
              <p className="mb-6 text-ce-ink/70 text-lg max-w-xl mx-auto">
                Tyler personally reviews every property. Fair cash offer in 24 hours — no repairs, no fees, no obligation.
              </p>
              <TrackedCTALink
                href="/#lead-form"
                label="Get My Fair Cash Offer"
                eventLabel="Get My Fair Cash Offer - Blog Article CTA"
              />
            </section>
          </div>
        </article>


        {/* Final CTA Section - Beige */}
        <section className="py-12 md:py-14 bg-surface-cream">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-ce-ink mb-4">
              Still Have Questions? We Have Answers.
            </h2>
            <p className="text-ce-ink/70 mb-6">
              Browse more guides written by Tyler, or get a fair, no-obligation cash offer for your PA home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-ce-ink/10 text-ce-ink rounded-full font-medium hover:bg-white transition-all"
              >
                More Guides
              </Link>
              <TrackedCTALink
                href="/#lead-form"
                label="Get My Fair Cash Offer"
                eventLabel="Get My Fair Cash Offer - Blog Bottom CTA"
              />
            </div>
          </div>
        </section>

        <V0Footer />
      </main>
    </>
  )
}
