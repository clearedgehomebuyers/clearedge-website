import type { Metadata } from 'next'
import Image from 'next/image'
import {
  Home,
  AlertTriangle,
  Heart,
  Key,
  DoorClosed,
  Wrench,
  FileWarning,
  Briefcase,
  Check,
  Calendar,
  Star,
  Users,
  ClipboardList,
  HandCoins,
} from 'lucide-react'
import { V0LeadForm } from '@/components/v0-lead-form'
import { LandingPhoneCTA } from '@/components/LandingPhoneCTA'
import { ScrollToFormButton } from '@/components/ScrollToFormButton'

/**
 * Paid-traffic conversion destination for Meta campaigns.
 *
 * Deliberately unlike the rest of the site: no header, no footer, no outbound
 * links of any kind. The page has one job and every exit is a lost
 * conversion. It is also situation-agnostic and location-independent, so a
 * single destination serves every campaign without making a locality claim —
 * no state, region, or metro appears anywhere, including in the form's helper
 * copy and input placeholders (see the props passed to V0LeadForm).
 */
export const metadata: Metadata = {
  title: 'Sell Your House Fast for Cash | ClearEdge Home Buyers',
  description:
    'Get a no-obligation cash offer on your house in 24 hours. Any condition, any situation. No fees, no commissions, no repairs.',
  // Ad destination, not a search destination. It must never compete with the
  // organic pages for the same intent, and its thin campaign copy would be a
  // liability if indexed.
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  // ─── Inherited-metadata overrides ───
  // The root layout's keywords/openGraph/twitter all name Pennsylvania, NEPA,
  // Lehigh Valley, Poconos and Scranton. Metadata inherits, so without these
  // overrides this page would ship a locality claim in its <head> — and
  // Facebook's scraper reads exactly those tags when the URL is previewed.
  keywords: null,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.clearedgehomebuyers.com/cashoffernj',
    siteName: 'ClearEdge Home Buyers',
    title: 'Sell Your House Fast for Cash | ClearEdge Home Buyers',
    description:
      'Get a no-obligation cash offer on your house in 24 hours. Any condition, any situation.',
    // Geo-neutral artwork, not the shared og-image.png — that one has
    // "Eastern Pennsylvania • NEPA • Lehigh Valley • Poconos" rendered into
    // the image itself, so inheriting it would reintroduce the locality claim
    // as pixels regardless of what these tags say.
    // Source: generate-og-image-neutral.mjs
    images: [
      {
        url: 'https://www.clearedgehomebuyers.com/og-image-neutral.png',
        width: 1200,
        height: 630,
        alt: 'ClearEdge Home Buyers — Sell Your House Fast for Cash',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sell Your House Fast for Cash | ClearEdge Home Buyers',
    description:
      'Get a no-obligation cash offer on your house in 24 hours. Any condition, any situation.',
    images: ['https://www.clearedgehomebuyers.com/og-image-neutral.png'],
  },
  alternates: {
    canonical: 'https://www.clearedgehomebuyers.com/cashoffernj',
  },
}

const situations = [
  { icon: Home, title: 'Inherited property', line: 'Sell without probate headaches or repairs.' },
  { icon: AlertTriangle, title: 'Facing foreclosure', line: 'Move fast enough to get ahead of the deadline.' },
  { icon: Heart, title: 'Divorce', line: 'A clean sale both parties can agree on.' },
  { icon: Key, title: 'Tired landlord', line: 'Tenants in place? We buy occupied properties.' },
  { icon: DoorClosed, title: 'Vacant house', line: 'Stop paying to hold an empty property.' },
  { icon: Wrench, title: 'Major repairs', line: 'Roof, foundation, systems — we buy as-is.' },
  { icon: FileWarning, title: 'Code violations', line: 'Open citations are our problem after closing.' },
  { icon: Briefcase, title: 'Job relocation', line: 'Close on your timeline, not the market’s.' },
]

const benefits = [
  'No agent fees',
  'No commissions',
  'No repairs',
  'No cleanout — take what you want, leave the rest',
  'Close in 7–30 days',
  'Cash offer in 24 hours',
]

const steps = [
  {
    icon: ClipboardList,
    title: 'Tell us about the house',
    line: 'Five quick questions. No showings, no sign in the yard.',
  },
  {
    icon: Users,
    title: 'Get your offer in 24 hours',
    line: 'Tyler reviews it personally and calls you with a real number.',
  },
  {
    icon: HandCoins,
    title: 'Close when you’re ready',
    line: 'Pick the date. We cover closing costs and handle the paperwork.',
  },
]

export default function CashOfferLandingPage() {
  return (
    <main className="bg-white">
      {/* ─── Hero + form ───────────────────────────────────────────────────
          The form is the page. Everything above it is kept to a logo, a
          headline, and one line of subcopy so it clears the fold on a phone. */}
      <section className="bg-surface-cream pt-6 pb-10 md:pt-8 md:pb-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Unlinked on purpose — the logo is trust signal, not navigation. */}
          <div className="flex justify-center mb-6">
            <Image
              src="/Primary.svg"
              alt="ClearEdge Home Buyers"
              width={180}
              height={43}
              priority
            />
          </div>

          <div className="text-center mb-6">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-ce-ink mb-4 text-balance leading-tight">
              Sell Your House Fast. Any Condition, Any Situation.
            </h1>
            <p className="text-ce-ink/70 text-lg max-w-xl mx-auto">
              Get a no-obligation cash offer in 24 hours. No fees, no repairs, no cleanout — and no
              obligation to accept.
            </p>
          </div>

          <V0LeadForm
            variant="nj-meta"
            compact
            legalLinksNewTab
            defaultState=""
            addressHelperText="We use this to price your offer accurately. Your details stay private."
            cityPlaceholder="City"
            zipPlaceholder="ZIP"
          />

          <LandingPhoneCTA className="mt-6 text-sm justify-center" />
        </div>
      </section>

      {/* ─── Credibility strip ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-surface-green-wash to-surface-green-tint py-6 md:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 md:gap-0">
            {[
              { icon: Home, value: '200+', label: 'Houses Bought' },
              { icon: Calendar, value: 'Since 2016', label: 'Family-Owned' },
              { icon: Star, value: '5.0', label: 'Google Rating' },
            ].map((stat, index) => (
              <div key={stat.label} className="relative flex flex-col items-center text-center">
                {index > 0 && (
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-ce-ink/10" />
                )}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-ce-green/10 flex items-center justify-center mb-3">
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-ce-green" />
                </div>
                <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-none text-ce-ink mb-1">
                  {stat.value}
                </div>
                <div className="text-ce-ink/60 text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What we handle ────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-ce-ink mb-3 text-balance">
              We Buy Houses in Every Situation
            </h2>
            <p className="text-ce-ink/70 max-w-xl mx-auto">
              If your house falls into any of these, you are exactly who we work with.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {situations.map((situation) => (
              <div
                key={situation.title}
                className="flex items-start gap-3 p-4 rounded-xl border border-ce-ink/10 bg-white hover:border-ce-green/30 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-ce-green/10 flex items-center justify-center flex-shrink-0">
                  <situation.icon className="w-5 h-5 text-ce-green" />
                </div>
                <div>
                  <h3 className="font-semibold text-ce-ink mb-0.5">{situation.title}</h3>
                  <p className="text-ce-ink/70 text-sm">{situation.line}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Benefits ──────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-surface-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-ce-ink mb-3 text-balance">
              What You Don&apos;t Pay For
            </h2>
            <p className="text-ce-ink/70">
              Our offer is what you walk away with. There is nothing taken off the back end.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-ce-ink/5 shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-ce-green flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-ce-ink font-medium text-sm sm:text-base">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ──────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-ce-ink text-balance">
              Three Steps, Start to Cash
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="relative inline-flex mb-4">
                  <div className="w-14 h-14 rounded-full bg-ce-green/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-ce-green" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-ce-green text-white text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-ce-ink mb-1.5">{step.title}</h3>
                <p className="text-ce-ink/70 text-sm">{step.line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Closing CTA ───────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-surface-green-wash to-surface-green-tint">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-ce-ink mb-4 text-balance">
            Find Out What Your House Is Worth in Cash
          </h2>
          <p className="text-ce-ink/70 text-lg mb-6">
            Five questions, about two minutes. You get a real number within 24 hours and there is no
            obligation to take it.
          </p>
          <ScrollToFormButton
            eventLabel="Get My Cash Offer - Landing Closing CTA"
            ctaLocation="cashoffernj_closing"
            className="inline-flex items-center justify-center gap-2 bg-ce-green text-white h-14 px-10 rounded-full text-base font-medium shadow-green hover:bg-ce-green-hover hover:shadow-green-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            Get My Cash Offer
          </ScrollToFormButton>

          <LandingPhoneCTA className="mt-6 text-sm justify-center" />
        </div>
      </section>

      {/* Minimal legal footer — text only, no links out. */}
      <footer className="py-6 px-4 bg-white border-t border-ce-ink/5">
        <p className="text-center text-xs text-ce-ink/40">
          &copy; {new Date().getFullYear()} ClearEdge Home Buyers. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
