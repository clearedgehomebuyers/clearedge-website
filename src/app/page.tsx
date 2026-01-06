import Link from 'next/link'
import Image from 'next/image'
import { LocalBusinessSchema, WebSiteSchema, OrganizationSchema } from '@/components/Schema'
import { LeadForm } from '@/components/LeadForm'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ServiceAreasGrid } from '@/components/ServiceAreasGrid'
import { getRecentBlogPosts } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { Phone, Clock, DollarSign, Shield, Award, Star, Users, CheckCircle, ArrowRight, FileText, Handshake, Building2, ScrollText, Heart, Plane, UserX, Home, Wrench, AlertTriangle, BookOpen } from 'lucide-react'

export const revalidate = 3600

export default async function HomePage() {
  const recentPosts = await getRecentBlogPosts(3)
return (
    <main>
      <WebSiteSchema />
      <OrganizationSchema />
      <LocalBusinessSchema />
      <Header currentPage="/" />

      {/* Hero Section */}
      <section className="relative pt-28 pb-24 px-4 bg-gradient-to-br from-[#1e3a5f] via-[#162d4d] to-[#1e3a5f] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#0d9488]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#14b8a6]/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <div className="inline-flex items-center space-x-2 bg-[#0d9488]/20 backdrop-blur-sm border border-[#14b8a6]/30 rounded-full px-4 py-2 mb-8">
                <span className="w-2 h-2 bg-[#14b8a6] rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-[#14b8a6]">Serving Eastern Pennsylvania</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Sell Your House
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#14b8a6] via-[#0d9488] to-[#14b8a6]">
                  Fast For Cash
                </span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-10 max-w-lg leading-relaxed">
                Get a fair cash offer in 24 hours. Close in as little as 7 days. No repairs needed. No fees or commissions.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">Close in 7 Days</p>
                    <p className="text-sm text-slate-300">Or on your schedule</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">Zero Fees</p>
                    <p className="text-sm text-slate-300">We pay closing costs</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:5709042059" className="px-8 py-4 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#0a7c72] hover:to-[#0d9488] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-3" />
                  Call (570) 904-2059
                </a>
                <Link href="/how-it-works" className="px-8 py-4 bg-transparent text-white border-2 border-white/40 hover:bg-white hover:text-[#1e3a5f] font-semibold rounded-xl transition-all inline-flex items-center justify-center">
                  See How It Works
                </Link>
              </div>
            </div>
            
            {/* Lead Form */}
            <div id="get-offer" className="lg:pl-4">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
            <div className="flex items-center space-x-2 text-slate-600">
              <Shield className="w-5 h-5 text-[#0d9488]" />
              <span className="font-semibold">100+ Homeowners Helped</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <Award className="w-5 h-5 text-[#0d9488]" />
              <span className="font-semibold">500+ Cash Offers Made</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">5.0 Google Rating</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <Users className="w-5 h-5 text-[#0d9488]" />
              <span className="font-semibold">Family-Owned Business</span>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">HOW IT WORKS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Sell Your House in 3 Simple Steps</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">We&apos;ve simplified the home selling process. No agents, no showings, no waiting months for a buyer.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">1</div>
              <div className="text-center pt-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0d9488] to-[#14b8a6] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Contact Us</h3>
                <p className="text-slate-600 leading-relaxed">Fill out our quick form or give us a call. Tell us about your property and situation.</p>
              </div>
            </div>

            <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">2</div>
              <div className="text-center pt-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0d9488] to-[#14b8a6] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Get Your Offer</h3>
                <p className="text-slate-600 leading-relaxed">We&apos;ll evaluate your property and present a fair, no-obligation cash offer within 24 hours.</p>
              </div>
            </div>

            <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">3</div>
              <div className="text-center pt-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0d9488] to-[#14b8a6] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Close & Get Paid</h3>
                <p className="text-slate-600 leading-relaxed">Accept our offer, pick your closing date, and get cash. We handle all the paperwork.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a href="#get-offer" className="px-8 py-4 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#0a7c72] hover:to-[#0d9488] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg inline-block">
              Get My Cash Offer Now
            </a>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">COMPARE OPTIONS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Why Sell to ClearEdge?</h2>
            <p className="text-xl text-slate-600">See how selling to us compares to the traditional route.</p>
          </div>

          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg min-w-[640px]">
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
                  <td className="py-5 px-6 text-center bg-[#0d9488]/10 font-bold text-[#047857]">7-14 Days</td>
                  <td className="py-5 px-6 text-center text-slate-600">60-90 Days</td>
                  <td className="py-5 px-6 text-center text-slate-600">90+ Days</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Repairs Needed</td>
                  <td className="py-5 px-6 text-center bg-[#0d9488]/10 font-bold text-[#047857]">None</td>
                  <td className="py-5 px-6 text-center text-slate-600">Usually Required</td>
                  <td className="py-5 px-6 text-center text-slate-600">Usually Required</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Fees & Commissions</td>
                  <td className="py-5 px-6 text-center bg-[#0d9488]/10 font-bold text-[#047857]">$0</td>
                  <td className="py-5 px-6 text-center text-slate-600">5-6%</td>
                  <td className="py-5 px-6 text-center text-slate-600">2-3%</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Closing Costs</td>
                  <td className="py-5 px-6 text-center bg-[#0d9488]/10 font-bold text-[#047857]">We Pay</td>
                  <td className="py-5 px-6 text-center text-slate-600">You Pay</td>
                  <td className="py-5 px-6 text-center text-slate-600">You Pay</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Showings Required</td>
                  <td className="py-5 px-6 text-center bg-[#0d9488]/10 font-bold text-[#047857]">Zero</td>
                  <td className="py-5 px-6 text-center text-slate-600">Many</td>
                  <td className="py-5 px-6 text-center text-slate-600">Many</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Sale Certainty</td>
                  <td className="py-5 px-6 text-center bg-[#0d9488]/10 font-bold text-[#047857]">100% Guaranteed</td>
                  <td className="py-5 px-6 text-center text-slate-600">Uncertain</td>
                  <td className="py-5 px-6 text-center text-slate-600">Uncertain</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">TESTIMONIALS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">What Our Sellers Say</h2>
            <div className="flex items-center justify-center space-x-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="text-slate-600 font-semibold ml-2">5.0 rating from verified sellers</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <div className="flex mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 text-lg mb-6 leading-relaxed">&quot;The communication throughout was excellent, the process was seamless. Tyler made selling from out of state feel effortless.&quot;</p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0d9488] to-[#14b8a6] rounded-full flex items-center justify-center text-white font-bold text-lg">K</div>
                <div>
                  <p className="font-bold text-slate-800">Kandra G.</p>
                  <p className="text-sm text-slate-500">Out-of-State Property Sale</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <div className="flex mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 text-lg mb-6 leading-relaxed">&quot;Thank you Tyler for all your help and assistance with our house. You made a difficult time simple and smooth.&quot;</p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0d9488] to-[#14b8a6] rounded-full flex items-center justify-center text-white font-bold text-lg">J</div>
                <div>
                  <p className="font-bold text-slate-800">Jewel P.</p>
                  <p className="text-sm text-slate-500">Scranton, PA</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <div className="flex mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 text-lg mb-6 leading-relaxed">&quot;My sister and I inherited a property and were unsure what to do. They guided us through the whole process. We closed in 30 days!&quot;</p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0d9488] to-[#14b8a6] rounded-full flex items-center justify-center text-white font-bold text-lg">R</div>
                <div>
                  <p className="font-bold text-slate-800">Rita C.</p>
                  <p className="text-sm text-slate-500">Inherited Property Sale</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties We've Purchased */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">OUR WORK</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Properties We&apos;ve Purchased</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">We buy houses in any condition across Eastern Pennsylvania</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/properties/property-5.webp"
                alt="Victorian duplex purchased in Scranton, PA"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/properties/property-3.webp"
                alt="House purchased in Hazleton, PA"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/properties/property-4.webp"
                alt="House purchased in Wilkes-Barre, PA"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-center mt-12">
            <a href="#get-offer" className="px-8 py-4 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#0a7c72] hover:to-[#0d9488] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg inline-block">
              Get Your Cash Offer
            </a>
          </div>
        </div>
      </section>

      {/* Latest from Blog */}
      {recentPosts && recentPosts.length > 0 && (
        <section className="py-24 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">FROM THE BLOG</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Selling Tips & Local Insights</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">Expert advice on selling your house fast in Eastern Pennsylvania.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {recentPosts.map((post: { _id: string; title: string; slug: { current: string }; excerpt: string; publishedAt: string; featuredImage?: { asset: { url: string }; alt: string } }) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  {post.featuredImage?.asset?.url && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={urlFor(post.featuredImage).width(400).height(250).url()}
                        alt={post.featuredImage.alt || post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-slate-800 mb-3 group-hover:text-[#0d9488] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center text-[#047857] font-semibold hover:underline text-lg"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                View All Articles
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Situations We Help With */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">SITUATIONS WE HELP WITH</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">We Buy Houses in Any Situation</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">No matter what you&apos;re facing, we can help. Get a fair cash offer and close on your timeline.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/situations/foreclosure" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-[#0d9488] hover:shadow-md transition-all text-center group">
              <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0d9488]/20 transition-colors">
                <Building2 className="w-6 h-6 text-[#0d9488]" />
              </div>
              <span className="font-semibold text-slate-700">Facing Foreclosure</span>
            </Link>
            <Link href="/situations/inherited-property" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-[#0d9488] hover:shadow-md transition-all text-center group">
              <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0d9488]/20 transition-colors">
                <ScrollText className="w-6 h-6 text-[#0d9488]" />
              </div>
              <span className="font-semibold text-slate-700">Inherited Property</span>
            </Link>
            <Link href="/situations/divorce" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-[#0d9488] hover:shadow-md transition-all text-center group">
              <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0d9488]/20 transition-colors">
                <Heart className="w-6 h-6 text-[#0d9488]" />
              </div>
              <span className="font-semibold text-slate-700">Going Through Divorce</span>
            </Link>
            <Link href="/situations/job-relocation" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-[#0d9488] hover:shadow-md transition-all text-center group">
              <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0d9488]/20 transition-colors">
                <Plane className="w-6 h-6 text-[#0d9488]" />
              </div>
              <span className="font-semibold text-slate-700">Relocating for Work</span>
            </Link>
            <Link href="/situations/tired-landlord" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-[#0d9488] hover:shadow-md transition-all text-center group">
              <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0d9488]/20 transition-colors">
                <UserX className="w-6 h-6 text-[#0d9488]" />
              </div>
              <span className="font-semibold text-slate-700">Tired Landlord</span>
            </Link>
            <Link href="/situations/vacant-property" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-[#0d9488] hover:shadow-md transition-all text-center group">
              <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0d9488]/20 transition-colors">
                <Home className="w-6 h-6 text-[#0d9488]" />
              </div>
              <span className="font-semibold text-slate-700">Vacant Property</span>
            </Link>
            <Link href="/situations/major-repairs" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-[#0d9488] hover:shadow-md transition-all text-center group">
              <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0d9488]/20 transition-colors">
                <Wrench className="w-6 h-6 text-[#0d9488]" />
              </div>
              <span className="font-semibold text-slate-700">Major Repairs Needed</span>
            </Link>
            <Link href="/situations/tax-liens-code-violations" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-[#0d9488] hover:shadow-md transition-all text-center group">
              <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0d9488]/20 transition-colors">
                <AlertTriangle className="w-6 h-6 text-[#0d9488]" />
              </div>
              <span className="font-semibold text-slate-700">Tax Liens or Code Violations</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">SERVICE AREAS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">We Buy Houses Across Eastern Pennsylvania</h2>
            <p className="text-xl text-slate-600">From the Poconos to the Lehigh Valley — we&apos;re ready to make you a fair cash offer. <Link href="/sell-house-fast-scranton-pa" className="text-[#047857] font-semibold hover:underline">Sell your house fast in Scranton</Link> and surrounding areas.</p>
          </div>

          <ServiceAreasGrid />

          <p className="text-center text-slate-500 mt-10">
            Don&apos;t see your city? <Link href="/contact" className="text-[#047857] font-semibold hover:underline">Contact us — we likely serve your area too →</Link>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-[#1e3a5f] via-[#162d4d] to-[#1e3a5f] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0d9488]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#14b8a6]/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Sell Your House?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Get your free, no-obligation cash offer today. We respond within 24 hours and can close in as little as 7 days.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#get-offer" className="px-8 py-4 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#0a7c72] hover:to-[#0d9488] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg inline-flex items-center justify-center">
              Get My Cash Offer <ArrowRight className="w-5 h-5 inline ml-2" />
            </a>
            <a href="tel:5709042059" className="px-8 py-4 bg-transparent text-white border-2 border-white/40 hover:bg-white hover:text-[#1e3a5f] font-semibold rounded-xl transition-all inline-flex items-center justify-center">
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