import Link from 'next/link'
import Image from 'next/image'
import { LeadForm } from '@/components/LeadForm'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Phone, MapPin, Heart, CheckCircle, Building2, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'About Us | ClearEdge Home Buyers | Eastern PA Cash Home Buyers',
  description: 'Meet Tyler Swenson, founder of ClearEdge Home Buyers. Learn how a $150,000 duplex on Birch Street in Scranton started a mission to help Eastern PA homeowners sell fast.',
  openGraph: {
    title: 'About ClearEdge Home Buyers',
    description: 'Meet Tyler Swenson and learn why ClearEdge Home Buyers is your trusted local cash home buyer in Eastern Pennsylvania.',
  },
}

export default function AboutPage() {
  return (
    <main>
      <Header currentPage="/about" />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 px-4 bg-gradient-to-br from-[#1e3a5f] via-[#162d4a] to-[#1e3a5f] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#0d9488]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#14b8a6]/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center space-x-2 bg-[#0d9488]/20 backdrop-blur-sm border border-[#0d9488]/30 rounded-full px-4 py-2 mb-8">
            <Heart className="w-4 h-4 text-[#14b8a6]" />
            <span className="text-sm font-medium text-[#14b8a6]">Our Story</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            About
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#14b8a6] via-[#0d9488] to-[#14b8a6]">
              ClearEdge Home Buyers
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Local real estate investors passionate about helping Pennsylvania homeowners and revitalizing communities since 2015.
          </p>
        </div>
      </section>

      {/* My Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Tyler's Photo */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#0d9488]/20 shadow-xl">
                <Image
                  src="/tyler.jpg"
                  alt="Tyler Swenson - Founder of ClearEdge Home Buyers"
                  width={224}
                  height={224}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bio Content */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">My Story</h2>
              <div className="text-slate-700 space-y-5 text-lg leading-relaxed">
                <p>
                  I got into real estate back in 2015.
                </p>
                <p>
                  My partner and I began acquiring properties right here in Scranton, Wilkes-Barre, Allentown, and other areas throughout Eastern Pennsylvania.
                </p>
                <p>
                  Our first property was a duplex on Birch Street in Scranton. Bought it on-market for $150,000.
                </p>
                <p>
                  We were in over our heads.
                </p>
                <p>
                  We dumped every dollar we had into that building. It was poorly managed with unhappy tenants, deferred maintenance everywhere, and problems we didn&apos;t even know existed yet.
                </p>
                <p>
                  Those early days of hands-on renovations opened my eyes to the opportunities throughout Eastern Pennsylvania — and taught me lessons no course ever could.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning the Hard Way Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">Learning the Hard Way</h2>

          <div className="text-slate-700 space-y-5 text-lg leading-relaxed">
            <p>
              We did most of the work ourselves.
            </p>
            <p>
              Burst pipes at 2 AM. Hot water heaters blowing out. Leaks in places we didn&apos;t know water could reach. We fixed it all — mostly by ourselves, with the help of great partners in the area.
            </p>
            <p>
              <strong>Blood, sweat, and tears.</strong> That&apos;s not a figure of speech. That&apos;s what we invested.
            </p>
            <p>
              But here&apos;s what those early years gave us: a first-hand understanding of what tenants are looking for, what they deserve, and what it takes to provide quality housing to families in this area.
            </p>
            <p>
              That foundation shaped everything about how we run ClearEdge Home Buyers today.
            </p>
          </div>
        </div>
      </section>

      {/* Why I Do This Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">Why I Do This</h2>

          <p className="text-slate-700 text-lg leading-relaxed mb-12">
            Early in my career, two deals changed how I saw this business.
          </p>

          {/* Story 1 */}
          <div className="bg-slate-50 rounded-2xl p-8 mb-8 border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">The Retired Gentleman in Scranton</h3>
            <div className="text-slate-700 space-y-4 text-lg leading-relaxed">
              <p>
                He inherited a massive property from his late mother. Beautiful house. But over time, it started falling apart.
              </p>
              <p>
                He was the only sibling still local. His sisters had all moved out of state. So the responsibility fell on him — a man over 60, retired on physical disability.
              </p>
              <p>
                The tenants took advantage. When they finally left, they destroyed parts of the property. Cut and stole the copper pipes right out of the basement.
              </p>
              <p>
                He was left with this huge, beautiful house that was going bad. But he held onto the belief that he&apos;d turn it around someday. Make it beautiful again in honor of his mother.
              </p>
              <p>
                I sat with him. Laid out his options. Helped him see that maybe the best decision — the one that actually honored what his mother would want for him — was to move on.
              </p>
              <p>
                We bought the property.
              </p>
              <p>
                At closing, he and one of his sisters who flew up from out of state both thanked us. He now had the money to move into a new living situation he&apos;d been hoping for. His sister was relieved the property was finally resolved.
              </p>
              <p className="font-semibold text-[#0d9488]">
                That&apos;s why I do this.
              </p>
            </div>
          </div>

          {/* Story 2 */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">The Woman in Texas</h3>
            <div className="text-slate-700 space-y-4 text-lg leading-relaxed">
              <p>
                She inherited her father&apos;s property — beautiful home, lots of land. But she lived in Texas now. Busy with her own life. The property just sat there.
              </p>
              <p>
                She didn&apos;t know the first step to selling a house from halfway across the country. Didn&apos;t know who to trust. Didn&apos;t know how to handle it remotely.
              </p>
              <p>
                We got in contact with her. Made her feel comfortable. Explained her options. Walked her through every step of the process.
              </p>
              <p>
                She never had to leave Texas.
              </p>
              <p>
                We handled everything — and got her a number she was genuinely happy with.
              </p>
              <p>
                She was over the moon.
              </p>
              <p className="font-semibold text-[#0d9488]">
                That&apos;s the work that matters to me.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What ClearEdge Is About Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">What ClearEdge Home Buyers Is About</h2>

          <div className="text-slate-700 space-y-5 text-lg leading-relaxed">
            <p>
              We&apos;re not here to lowball people in tough situations.
            </p>
            <p>
              We&apos;re here to provide <strong>real options</strong> to homeowners who need them.
            </p>
            <p>
              Some people have time to list with a realtor and wait for the right buyer. That&apos;s great for them.
            </p>
            <p>
              But some people don&apos;t have that luxury.
            </p>
            <p>
              They&apos;re dealing with inherited properties from out of state. Divorce. Foreclosure. Properties that need more work than they can afford. Tenants who destroyed the place. Health issues. Life transitions.
            </p>
            <p>
              For those people, we offer something simple:
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-6 text-center border border-slate-200">
              <p className="text-2xl font-bold text-[#0d9488] mb-2">Fair Cash Offer</p>
              <p className="text-slate-600">No games, no lowballing</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-slate-200">
              <p className="text-2xl font-bold text-[#0d9488] mb-2">Fast Closing</p>
              <p className="text-slate-600">As quick as 7-14 days</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-slate-200">
              <p className="text-2xl font-bold text-[#0d9488] mb-2">Zero Hassle</p>
              <p className="text-slate-600">No repairs, no showings</p>
            </div>
          </div>

          <p className="text-slate-700 text-lg leading-relaxed mt-8">
            Just a straightforward path to moving on.
          </p>
        </div>
      </section>

      {/* Rooted in Eastern PA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">Rooted in Eastern Pennsylvania</h2>

          <div className="text-slate-700 space-y-5 text-lg leading-relaxed">
            <p>
              This isn&apos;t some out-of-state operation with a call center.
            </p>
            <p>
              We live here. We work here. We&apos;ve renovated properties in neighborhoods across Scranton, Wilkes-Barre, Allentown, Bethlehem, Hazleton, and throughout the Poconos and Lehigh Valley.
            </p>
            <p>
              We know the local market because we&apos;ve bought, renovated, and managed properties in it for nearly a decade.
            </p>
            <p>
              <strong>When you work with ClearEdge, you&apos;re working with people who actually know your area.</strong>
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              'Scranton', 'Wilkes-Barre', 'Allentown', 'Bethlehem', 'Easton', 'Reading',
              'Stroudsburg', 'Hazleton', 'Carbondale', 'Pittston', 'Honesdale', 'Dunmore',
              'Kingston', 'Nanticoke', 'Bloomsburg', 'Pottsville', 'Lehigh Valley', 'Poconos',
            ].map((city) => (
              <div key={city} className="bg-slate-50 rounded-xl p-3 text-center hover:bg-[#0d9488]/10 transition-colors border border-slate-100">
                <span className="font-semibold text-slate-700 text-sm">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Homeowners Choose Us */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">WHY CLEAREDGE</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Why Homeowners Choose Us</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Cash offers within 24 hours',
              'Close in as little as 7 days',
              'We buy houses in any condition',
              'Zero fees or commissions',
              'We pay all closing costs',
              'Local team, not a national call center',
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3 bg-white rounded-xl p-5 border border-slate-100">
                <CheckCircle className="w-6 h-6 text-[#0d9488] flex-shrink-0" />
                <span className="text-slate-800 font-medium text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Title Company Partner Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">TRUSTED PARTNER</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Our Trusted Closing Partner</h2>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-200 text-center">
            <div className="w-16 h-16 bg-[#0d9488]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-8 h-8 text-[#0d9488]" />
            </div>

            <h3 className="text-2xl font-bold text-slate-800 mb-2">Brokers Settlement Services</h3>
            <div className="flex items-center justify-center space-x-2 text-slate-600 mb-6">
              <MapPin className="w-4 h-4" />
              <span>Pittsburgh, PA</span>
            </div>

            <p className="text-lg text-slate-700 max-w-2xl mx-auto italic">
              &ldquo;We work with Matt Buckley and the team at Brokers Settlement Services to ensure every closing is smooth, professional, and stress-free for our sellers.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#1e3a5f] via-[#162d4a] to-[#1e3a5f] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0d9488]/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to See What We Can Offer?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            If you&apos;re thinking about selling your house — whether it&apos;s in perfect condition or needs a ton of work — we&apos;d be happy to make you a no-obligation cash offer.
          </p>
          <p className="text-lg text-slate-400 mb-10">
            No pressure. No games. Just a conversation to see if we can help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#get-offer" className="px-8 py-4 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#0a7c72] hover:to-[#0d9488] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg inline-flex items-center justify-center">
              Get Your Cash Offer <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a href="tel:5709042059" className="px-8 py-4 bg-transparent text-white border-2 border-white/40 hover:bg-white hover:text-slate-800 font-semibold rounded-xl transition-all inline-flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              (570) 904-2059
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
