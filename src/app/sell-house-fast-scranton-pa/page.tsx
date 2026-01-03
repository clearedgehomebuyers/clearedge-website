import Link from 'next/link'
import Image from 'next/image'
import { LocalBusinessSchema, FAQSchema } from '@/components/Schema'
import { LeadForm } from '@/components/LeadForm'
import { Phone, Clock, DollarSign, Shield, Award, Star, Users, MapPin, CheckCircle, ArrowRight, FileText, Handshake, Building, Home, ChevronDown } from 'lucide-react'

export const metadata = {
  title: 'Sell My House Fast Scranton PA | Cash Home Buyers | ClearEdge',
  description: 'Sell your house fast in Scranton, PA for cash. No repairs, no fees, no commissions. Get a fair cash offer in 24 hours. Close in as little as 7 days.',
}

export default function ScrantonPage() {
return (
    <main>
      <LocalBusinessSchema />
      <FAQSchema faqs={[
        { question: "How fast can I sell my house in Scranton, PA?", answer: "We can close on your Scranton property in as little as 7 days. Most of our Lackawanna County deals close within 2-3 weeks, but we work on your timeline." },
        { question: "Do you buy houses in any condition in Scranton?", answer: "Yes! We buy houses in any condition throughout Scranton and Lackawanna County. Whether your home needs major repairs, has code violations, fire damage, or is just outdated – we'll make you a fair cash offer." },
        { question: "What areas of Scranton do you serve?", answer: "We buy houses throughout all of Scranton including the Hill Section, Green Ridge, Dunmore, South Side, West Side, North Scranton, and all surrounding neighborhoods." },
        { question: "Are there any fees when selling my Scranton house to you?", answer: "None. We don't charge any fees or commissions. We also pay all typical closing costs. The cash offer we make is the amount you receive at closing." },
        { question: "I inherited a house in Scranton. Can I sell before probate is complete?", answer: "Potentially, yes. Pennsylvania probate laws allow for certain sales during the probate process. We've worked with many families in Lackawanna County selling inherited properties." }
      ]} />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-lg border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="ClearEdge Home Buyers" width={180} height={40} className="h-10 w-auto" priority />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-[#0d9488] transition-colors">Home</Link>
              <Link href="/sell-house-fast-scranton-pa" className="text-sm font-semibold text-[#0d9488]">Scranton, PA</Link>
              <span className="text-sm font-semibold text-slate-600 hover:text-[#0d9488] cursor-pointer transition-colors">How It Works</span>
              <span className="text-sm font-semibold text-slate-600 hover:text-[#0d9488] cursor-pointer transition-colors">Reviews</span>
            </div>

            <div className="hidden md:flex items-center space-x-5">
              <a href="tel:5709042059" className="flex items-center space-x-2 text-slate-700 hover:text-[#0d9488] transition-colors">
                <div className="w-10 h-10 bg-[#0d9488]/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#0d9488]" />
                </div>
                <span className="font-bold">(570) 904-2059</span>
              </a>
              <button className="px-5 py-2.5 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#0a7c72] hover:to-[#0d9488] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                Get Cash Offer
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-24 px-4 bg-gradient-to-br from-[#1e3a5f] via-[#162d4a] to-[#1e3a5f] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#0d9488]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#14b8a6]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <div className="inline-flex items-center space-x-2 bg-[#0d9488]/20 backdrop-blur-sm border border-[#0d9488]/30 rounded-full px-4 py-2 mb-8">
                <MapPin className="w-4 h-4 text-[#14b8a6]" />
                <span className="text-sm font-medium text-[#14b8a6]">Scranton & Lackawanna County</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Sell Your House Fast in
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#14b8a6] via-[#0d9488] to-[#14b8a6]">
                  Scranton, PA
                </span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-10 max-w-lg leading-relaxed">
                Get a fair cash offer for your Scranton home in 24 hours. We buy houses in any condition — no repairs, no fees, no hassle.
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-10">
                <div className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-3">
                  <CheckCircle className="w-5 h-5 text-[#14b8a6]" />
                  <span className="text-white font-medium">Close in 7-14 days</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-3">
                  <CheckCircle className="w-5 h-5 text-[#14b8a6]" />
                  <span className="text-white font-medium">We pay closing costs</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-3">
                  <CheckCircle className="w-5 h-5 text-[#14b8a6]" />
                  <span className="text-white font-medium">Buy as-is condition</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-3">
                  <CheckCircle className="w-5 h-5 text-[#14b8a6]" />
                  <span className="text-white font-medium">Local market experts</span>
                </div>
              </div>

              <a href="tel:5709042059" className="inline-flex items-center space-x-3 text-[#14b8a6] font-bold text-lg hover:text-[#0d9488] transition-colors">
                <Phone className="w-5 h-5" />
                <span>(570) 904-2059</span>
              </a>
            </div>
            
            {/* Lead Form */}
            <div className="lg:pl-4">
              <LeadForm
                heading="Get Your Scranton Cash Offer"
                buttonText="Get My Scranton Cash Offer"
                propertyLabel="Property Address in Scranton"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Local Trust Bar */}
      <section className="py-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 text-slate-600">
            <span className="text-sm font-medium">Trusted by homeowners in:</span>
            {['Scranton', 'Dunmore', 'Carbondale', 'Old Forge', 'Clarks Summit', 'Throop'].map((area) => (
              <span key={area} className="text-sm font-semibold text-slate-800">{area}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Local Problem Statement */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#0d9488] rounded-full text-sm font-semibold mb-4">LOCAL EXPERTISE</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Selling a House in Scranton Doesn&apos;t Have to Be Hard</h2>
          </div>
          
          <div className="text-slate-600 space-y-6 text-lg leading-relaxed">
            <p>If you own a property in Scranton or anywhere in Lackawanna County, you know the challenges. Many homes in the area were built in the early 1900s and need significant updates. The local real estate market can be slow, and traditional buyers often want move-in ready homes.</p>
            <p>Maybe you&apos;ve inherited a property and don&apos;t have the time or money to renovate it. Perhaps you&apos;re facing a difficult situation — divorce, job relocation, or foreclosure. Or maybe you just want to sell quickly without the hassle of listings, showings, and negotiations.</p>
            <p className="font-semibold text-slate-800 text-xl">That&apos;s where ClearEdge Home Buyers comes in. We buy houses directly from Scranton homeowners for cash, regardless of condition. No real estate agents, no waiting, no uncertainty.</p>
          </div>
        </div>
      </section>

      {/* Situations */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#0d9488] rounded-full text-sm font-semibold mb-4">WE CAN HELP</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">We Help Scranton Homeowners in Any Situation</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Building, title: 'Inherited Property', desc: 'Sell without probate delays' },
              { icon: Shield, title: 'Facing Foreclosure', desc: 'Avoid foreclosure, protect credit' },
              { icon: Users, title: 'Divorce', desc: 'Liquidate quickly and move on' },
              { icon: MapPin, title: 'Job Relocation', desc: 'Sell fast when you need to move' },
              { icon: Home, title: 'Rental Property', desc: 'Exit the landlord business' },
              { icon: FileText, title: 'Major Repairs', desc: 'Sell as-is, skip renovations' },
              { icon: DollarSign, title: 'Tax or Code Issues', desc: 'We work with liens & violations' },
              { icon: Clock, title: 'Vacant Property', desc: 'Stop paying for an empty house' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-slate-100 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#0d9488]" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#0d9488] rounded-full text-sm font-semibold mb-4">NEIGHBORHOODS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Scranton Areas We Serve</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Hill Section', 'Green Ridge', 'South Side', 'West Side', 'North Scranton', 'East Mountain', 'Pine Brook', 'Minooka', 'Providence', 'Hyde Park', 'Dunmore', 'Throop', 'Old Forge', 'Moosic', 'Taylor', 'Clarks Summit'].map((neighborhood) => (
              <div key={neighborhood} className="bg-slate-50 rounded-xl p-4 text-center hover:bg-[#0d9488]/10 transition-colors border border-slate-100">
                <span className="font-semibold text-slate-700">{neighborhood}</span>
              </div>
            ))}
          </div>
          
          <p className="text-center text-slate-500 mt-8">We buy houses throughout Lackawanna County and all surrounding areas.</p>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#0d9488] rounded-full text-sm font-semibold mb-4">COMPARE</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Selling to ClearEdge vs. Listing in Scranton</h2>
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
                  <th className="text-center py-5 px-6 bg-slate-100 text-slate-700">
                    <span className="font-bold">FSBO</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Time to Close</td>
                  <td className="py-5 px-6 text-center bg-[#0d9488]/10 font-bold text-[#0d9488]">7-14 Days</td>
                  <td className="py-5 px-6 text-center text-slate-600">60-90 Days</td>
                  <td className="py-5 px-6 text-center text-slate-600">90+ Days</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Repairs Needed</td>
                  <td className="py-5 px-6 text-center bg-[#0d9488]/10 font-bold text-[#0d9488]">None</td>
                  <td className="py-5 px-6 text-center text-slate-600">Usually Required</td>
                  <td className="py-5 px-6 text-center text-slate-600">Usually Required</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Fees & Commissions</td>
                  <td className="py-5 px-6 text-center bg-[#0d9488]/10 font-bold text-[#0d9488]">$0</td>
                  <td className="py-5 px-6 text-center text-slate-600">5-6%</td>
                  <td className="py-5 px-6 text-center text-slate-600">2-3%</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Closing Costs</td>
                  <td className="py-5 px-6 text-center bg-[#0d9488]/10 font-bold text-[#0d9488]">We Pay</td>
                  <td className="py-5 px-6 text-center text-slate-600">You Pay</td>
                  <td className="py-5 px-6 text-center text-slate-600">You Pay</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Showings Required</td>
                  <td className="py-5 px-6 text-center bg-[#0d9488]/10 font-bold text-[#0d9488]">Zero</td>
                  <td className="py-5 px-6 text-center text-slate-600">Many</td>
                  <td className="py-5 px-6 text-center text-slate-600">Many</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Sale Certainty</td>
                  <td className="py-5 px-6 text-center bg-[#0d9488]/10 font-bold text-[#0d9488]">100% Guaranteed</td>
                  <td className="py-5 px-6 text-center text-slate-600">Uncertain</td>
                  <td className="py-5 px-6 text-center text-slate-600">Uncertain</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#0a7c72] hover:to-[#0d9488] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg">
              Get Your Scranton Cash Offer
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#0d9488] rounded-full text-sm font-semibold mb-4">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Common Questions About Selling in Scranton</h2>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: 'How fast can I sell my house in Scranton, PA?',
                a: 'We can close on your Scranton property in as little as 7 days. Most of our Lackawanna County deals close within 2-3 weeks, but we work on your timeline.'
              },
              {
                q: 'Do you buy houses in any condition in Scranton?',
                a: 'Yes! We buy houses in any condition throughout Scranton and Lackawanna County. Whether your home needs major repairs, has code violations, fire damage, or is just outdated – we\'ll make you a fair cash offer.'
              },
              {
                q: 'What areas of Scranton do you serve?',
                a: 'We buy houses throughout all of Scranton including the Hill Section, Green Ridge, Dunmore, South Side, West Side, North Scranton, and all surrounding neighborhoods.'
              },
              {
                q: 'Are there any fees when selling my Scranton house to you?',
                a: 'None. We don\'t charge any fees or commissions. We also pay all typical closing costs. The cash offer we make is the amount you receive at closing.'
              },
              {
                q: 'I inherited a house in Scranton. Can I sell before probate is complete?',
                a: 'Potentially, yes. Pennsylvania probate laws allow for certain sales during the probate process. We\'ve worked with many families in Lackawanna County selling inherited properties.'
              },
            ].map((faq, i) => (
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

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-[#1e3a5f] via-[#162d4a] to-[#1e3a5f] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0d9488]/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Sell Your Scranton House?</h2>
          <p className="text-xl text-slate-300 mb-10">Get your free, no-obligation cash offer today. We&apos;re local and respond fast.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#0a7c72] hover:to-[#0d9488] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg">
              Get My Scranton Cash Offer <ArrowRight className="w-5 h-5 inline ml-2" />
            </button>
            <a href="tel:5709042059" className="px-8 py-4 bg-transparent text-white border-2 border-white/40 hover:bg-white hover:text-slate-800 font-semibold rounded-xl transition-all inline-flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              (570) 904-2059
            </a>
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
              <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-3 text-slate-400">
                <li className="hover:text-white cursor-pointer transition-colors">How It Works</li>
                <li className="hover:text-white cursor-pointer transition-colors">Testimonials</li>
                <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Service Areas</h4>
              <ul className="space-y-3 text-slate-400">
                <li className="hover:text-white cursor-pointer transition-colors">Scranton, PA</li>
                <li className="hover:text-white cursor-pointer transition-colors">Wilkes-Barre, PA</li>
                <li className="hover:text-white cursor-pointer transition-colors">Allentown, PA</li>
                <li className="hover:text-white cursor-pointer transition-colors">All Service Areas</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Contact Us</h4>
              <a href="tel:5709042059" className="flex items-center space-x-3 text-slate-400 hover:text-[#14b8a6] transition-colors">
                <Phone className="w-5 h-5" />
                <span className="font-semibold">(570) 904-2059</span>
              </a>
              <p className="text-sm text-slate-400 mt-3">Serving Eastern Pennsylvania</p>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
            <p>© 2026 ClearEdge Home Buyers. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms & Conditions</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}