import os

content = r'''import Link from 'next/link'
import { LocalBusinessSchema, FAQSchema } from '@/components/Schema'
import { LeadForm } from '@/components/LeadForm'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Phone, MapPin, CheckCircle, ArrowRight, ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'How fast can I sell my house in Scranton for cash?',
    answer: 'Most cash sales close within 10-14 days. ClearEdge can present an offer within 24 hours of our property visit. Closing timeline depends primarily on title work—Lackawanna County title searches typically take 5-7 business days. If you have a clean title, we can close in as little as 7 days.'
  },
  {
    question: 'What types of houses does ClearEdge buy in Scranton?',
    answer: "We purchase single-family homes, duplexes, triplexes, and small multi-family properties throughout Scranton and Lackawanna County. Condition doesn't matter. We've bought properties with fire damage, foundation issues, hoarding situations, and active code violations. If it has a deed, we can make an offer."
  },
  {
    question: 'How does ClearEdge determine the cash offer price?',
    answer: "We calculate offers based on after-repair value minus renovation costs and our operating margin. Our offers typically range from 70-85% of market value depending on condition and required work. We're transparent about our math—we'll show you the comparable sales and repair estimates that inform our number."
  },
  {
    question: 'Are there any fees or commissions when selling to ClearEdge?',
    answer: "No. We don't charge fees, commissions, or closing costs. The offer we present is the amount you receive at closing. Compare this to a traditional sale where 6% agent commissions plus 2-3% closing costs reduce your net proceeds by 8-9%."
  },
  {
    question: 'What Scranton neighborhoods does ClearEdge buy in?',
    answer: 'We purchase properties in all Scranton neighborhoods including the Hill Section, Green Ridge, South Side, West Side, North Scranton, East Mountain, Minooka, and the Plot. We also buy throughout Lackawanna County—Dunmore, Carbondale, Old Forge, Taylor, Moosic, Dickson City, and surrounding areas.'
  },
]

const situationLinks = [
  { href: '/situations/foreclosure', title: 'Facing Foreclosure', description: "Sell before sheriff's sale and protect your credit" },
  { href: '/situations/inherited-property', title: 'Inherited Property', description: 'Liquidate estate assets during or after probate' },
  { href: '/situations/divorce', title: 'Divorce', description: 'Divide assets quickly without listing complications' },
  { href: '/situations/tax-liens-code-violations', title: 'Tax Liens & Code Violations', description: 'We purchase with active violations and liens' },
  { href: '/situations/vacant-property', title: 'Vacant Property', description: "Stop carrying costs on a property you don't use" },
  { href: '/situations/tired-landlord', title: 'Tired Landlord', description: 'Exit the landlord business on your terms' },
]

export const metadata = {
  title: 'Sell My House Fast Scranton PA | Cash Offer in 24 Hours | ClearEdge',
  description: 'Sell your Scranton house fast for cash. No agents, no repairs, no inspections. ClearEdge Home Buyers has helped 200+ PA homeowners since 2016. Get an offer in 24 hours.',
  openGraph: {
    title: 'Sell My House Fast Scranton PA | Cash Offer in 24 Hours',
    description: 'Sell your Scranton house fast for cash. No agents, no repairs, no inspections. Get an offer in 24 hours from ClearEdge Home Buyers.',
    url: 'https://clearedgehomebuyers.com/sell-house-fast-scranton-pa',
    siteName: 'ClearEdge Home Buyers',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://clearedgehomebuyers.com/sell-house-fast-scranton-pa',
  },
}
'''

# Write just the first part
base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
target_path = os.path.join(base_path, 'src', 'app', 'sell-house-fast-scranton-pa', 'page.tsx')
print(f"Writing to: {target_path}")
with open(target_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("First part written successfully")
