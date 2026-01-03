import Link from 'next/link'
import Image from 'next/image'
import { LeadForm } from '@/components/LeadForm'
import { Phone, MessageSquare, DollarSign, Calendar, CheckCircle, ArrowRight, ChevronDown, Clock, FileText, Handshake, Home } from 'lucide-react'

export const metadata = {
  title: 'How It Works | Sell Your House in 3 Easy Steps | ClearEdge Home Buyers',
  description: 'Learn how to sell your house fast for cash in 3 simple steps. Contact us, get a cash offer in 24 hours, and close on your timeline. No fees, no repairs, no hassle.',
  openGraph: {
    title: 'How It Works | ClearEdge Home Buyers',
    description: 'Sell your house in 3 easy steps. Cash offer in 24 hours, close in as little as 7 days.',
  },
}

export default function HowItWorksPage() {
  const faqs = [
    {
      q: 'How do you determine your offer price?',
      a: 'We evaluate your property based on its location, condition, current market values, and repair costs. We aim to make fair, competitive offers that reflect the true value of your home while accounting for the convenience and speed we provide.',
    },
    {
      q: 'Do I need to make any repairs before selling?',
      a: 'Absolutely not. We buy houses in any condition — whether it needs minor cosmetic updates or major structural repairs. We handle all renovations after purchase, so you don\'t have to spend time or money fixing anything.',
    },
    {
      q: 'Are there any fees or commissions?',
      a: 'Zero. Unlike traditional real estate transactions, we don\'t charge any fees or commissions. We also pay all typical closing costs. The offer we make is the amount you receive at closing.',
    },
    {
      q: 'How fast can you close?',
      a: 'We can close in as little as 7 days if you need to move quickly. However, we\'re flexible and can work with your timeline — whether that\'s 2 weeks, 30 days, or longer.',
    },
    {
      q: 'What if I still have a mortgage on my house?',
      a: 'No problem. Most homes we purchase still have mortgages. At closing, your mortgage is paid off directly from the sale proceeds, and you receive the remaining equity.',
    },
    {
      q: 'Is there any obligation if I get an offer?',
      a: 'None whatsoever. Our cash offers are completely free and come with no obligation. If you decide our offer isn\'t right for you, simply decline — no pressure, no hard feelings.',
    },
  ]

  return (
    <main>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-lg border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="ClearEdge Home Buyers" width={180} height={40} className="h-10 w-auto" priority />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-[#0d9488] transition-colors">Home</Link>
              <Link href="/how-it-works" className="text-sm font-semibold text-[#0d9488]">How It Works</Link>
              <Link href="/about" className="text-sm font-semibold text-slate-600 hover:text-[#0d9488] transition-colors">About</Link>
              <Link href="/contact" className="text-sm font-semibold text-slate-600 hover:text-[#0d9488] transition-colors">Contact</Link>
            </div>

            <div className="hidden md:flex items-center space-x-5">
              <a href="tel:5709042059" className="flex items-center space-x-2 text-slate-700 hover:text-[#0d9488] transition-colors">
                <div className="w-10 h-10 bg-[#0d9488]/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#0d9488]" />
                </div>
                <span className="font-bold">(570) 904-2059</span>
              </a>
              <Link href="/#get-offer" className="px-5 py-2.5 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#0a7c72] hover:to-[#0d9488] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                Get Cash Offer
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 px-4 bg-gradient-to-br from-[#1e3a5f] via-[#162d4a] to-[#1e3a5f] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#0d9488]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#14b8a6]/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center space-x-2 bg-[#0d9488]/20 backdrop-blur-sm border border-[#0d9488]/30 rounded-full px-4 py-2 mb-8">
            <Clock className="w-4 h-4 text-[#14b8a6]" />
            <span className="text-sm font-medium text-[#14b8a6]">Simple 3-Step Process</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Sell Your House in
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#14b8a6] via-[#0d9488] to-[#14b8a6]">
              3 Easy Steps
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            No agents. No repairs. No waiting. Get a fair cash offer for your house and close on your timeline — it&apos;s that simple.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0d9488] to-[#14b8a6] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-[#0d9488]" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Contact Us</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Fill out our simple form or give us a call. Tell us about your property and your situation. We&apos;ll ask a few questions to understand your needs.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2 text-slate-600">
                    <CheckCircle className="w-4 h-4 text-[#0d9488]" />
                    <span>Takes less than 2 minutes</span>
                  </li>
                  <li className="flex items-center space-x-2 text-slate-600">
                    <CheckCircle className="w-4 h-4 text-[#0d9488]" />
                    <span>No obligation whatsoever</span>
                  </li>
                  <li className="flex items-center space-x-2 text-slate-600">
                    <CheckCircle className="w-4 h-4 text-[#0d9488]" />
                    <span>We respond quickly</span>
                  </li>
                </ul>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <ArrowRight className="w-8 h-8 text-[#0d9488]" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0d9488] to-[#14b8a6] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-[#0d9488]" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Get Your Cash Offer</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  We&apos;ll evaluate your property and present you with a fair, no-obligation cash offer within 24 hours. No haggling, no games — just a straightforward offer.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2 text-slate-600">
                    <CheckCircle className="w-4 h-4 text-[#0d9488]" />
                    <span>Offer within 24 hours</span>
                  </li>
                  <li className="flex items-center space-x-2 text-slate-600">
                    <CheckCircle className="w-4 h-4 text-[#0d9488]" />
                    <span>Fair market-based pricing</span>
                  </li>
                  <li className="flex items-center space-x-2 text-slate-600">
                    <CheckCircle className="w-4 h-4 text-[#0d9488]" />
                    <span>No hidden fees</span>
                  </li>
                </ul>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <ArrowRight className="w-8 h-8 text-[#0d9488]" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0d9488] to-[#14b8a6] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center mb-4">
                  <Handshake className="w-6 h-6 text-[#0d9488]" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Close & Get Paid</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Accept our offer and pick your closing date. We handle all the paperwork and pay the closing costs. You get cash in hand, stress-free.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2 text-slate-600">
                    <CheckCircle className="w-4 h-4 text-[#0d9488]" />
                    <span>Close in as little as 7 days</span>
                  </li>
                  <li className="flex items-center space-x-2 text-slate-600">
                    <CheckCircle className="w-4 h-4 text-[#0d9488]" />
                    <span>We pay all closing costs</span>
                  </li>
                  <li className="flex items-center space-x-2 text-slate-600">
                    <CheckCircle className="w-4 h-4 text-[#0d9488]" />
                    <span>Get paid immediately</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">COMPARE</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">ClearEdge vs. Traditional Selling</h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg bg-white">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-5 px-6 bg-slate-50 font-semibold text-slate-600"></th>
                  <th className="text-center py-5 px-6 bg-gradient-to-br from-[#0d9488] to-[#14b8a6] text-white">
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-6 h-6 mb-1" />
                      <span className="font-bold">ClearEdge</span>
                    </div>
                  </th>
                  <th className="text-center py-5 px-6 bg-slate-100 text-slate-700">
                    <span className="font-bold">Traditional Agent</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Time to Sell', ce: '7-14 Days', trad: '3-6 Months' },
                  { label: 'Showings Required', ce: 'None', trad: 'Dozens' },
                  { label: 'Repairs Needed', ce: 'None', trad: '$5,000-$20,000+' },
                  { label: 'Agent Commissions', ce: '$0', trad: '5-6% of sale' },
                  { label: 'Closing Costs', ce: 'We Pay', trad: 'You Pay' },
                  { label: 'Appraisal Required', ce: 'No', trad: 'Yes' },
                  { label: 'Financing Contingency', ce: 'No', trad: 'Yes' },
                  { label: 'Sale Falls Through Risk', ce: 'None', trad: 'Common' },
                ].map((row, i) => (
                  <tr key={i} className="border-t border-slate-100">
                    <td className="py-4 px-6 font-semibold text-slate-700">{row.label}</td>
                    <td className="py-4 px-6 text-center bg-[#0d9488]/10 font-bold text-[#047857]">{row.ce}</td>
                    <td className="py-4 px-6 text-center text-slate-600">{row.trad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Common Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-slate-50 rounded-xl border border-slate-200">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-slate-800">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-slate-600">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#1e3a5f] via-[#162d4a] to-[#1e3a5f] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0d9488]/10 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-slate-300 mb-8">
                Take the first step today. Fill out our form or call us directly to get your free, no-obligation cash offer.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#14b8a6]" />
                  <span className="text-slate-300">Cash offer within 24 hours</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#14b8a6]" />
                  <span className="text-slate-300">Close on your timeline</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#14b8a6]" />
                  <span className="text-slate-300">Zero fees or commissions</span>
                </div>
              </div>
              <div className="mt-8">
                <a href="tel:5709042059" className="inline-flex items-center space-x-2 text-[#14b8a6] font-bold text-lg hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>(570) 904-2059</span>
                </a>
              </div>
            </div>

            <LeadForm heading="Get Your Free Cash Offer" buttonText="Get My Cash Offer" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e3a5f] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image src="/logo.png" alt="ClearEdge Home Buyers" width={180} height={40} className="h-10 w-auto" />
              </div>
              <p className="text-slate-400 leading-relaxed">We buy houses in any condition throughout Eastern Pennsylvania. Fair cash offers, fast closings, zero fees.</p>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Quick Links</h3>
              <ul className="space-y-3 text-slate-400">
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Service Areas</h3>
              <ul className="space-y-3 text-slate-400">
                <li><Link href="/locations/scranton" className="hover:text-white transition-colors">Scranton, PA</Link></li>
                <li><Link href="/locations/wilkes-barre" className="hover:text-white transition-colors">Wilkes-Barre, PA</Link></li>
                <li><Link href="/locations/allentown" className="hover:text-white transition-colors">Allentown, PA</Link></li>
                <li><Link href="/locations/bethlehem" className="hover:text-white transition-colors">Bethlehem, PA</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Contact Us</h3>
              <a href="tel:5709042059" className="flex items-center space-x-3 text-slate-400 hover:text-[#14b8a6] transition-colors">
                <Phone className="w-5 h-5" />
                <span className="font-semibold">(570) 904-2059</span>
              </a>
              <p className="text-sm text-slate-400 mt-3">Serving Eastern Pennsylvania</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-300 text-sm">
            <p>&copy; 2026 ClearEdge Home Buyers. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-slate-300 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-slate-300 hover:text-white transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
