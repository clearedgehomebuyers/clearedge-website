import Link from 'next/link'
import Image from 'next/image'
import { Phone } from 'lucide-react'

export const metadata = {
  title: 'Terms and Conditions | ClearEdge Home Buyers',
  description: 'Terms and Conditions for ClearEdge Home Buyers. Read our terms of service for using our website and real estate services.',
}

export default function TermsPage() {
  return (
    <main>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-lg border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.webp" alt="ClearEdge Home Buyers" width={180} height={40} className="h-10 w-auto" priority />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-[#0d9488] transition-colors">Home</Link>
              <Link href="/how-it-works" className="text-sm font-semibold text-slate-600 hover:text-[#0d9488] transition-colors">How It Works</Link>
              <Link href="/about" className="text-sm font-semibold text-slate-600 hover:text-[#0d9488] transition-colors">About</Link>
              <Link href="/testimonials" className="text-sm font-semibold text-slate-600 hover:text-[#0d9488] transition-colors">Testimonials</Link>
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

      {/* Header */}
      <section className="pt-28 pb-12 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Terms and Conditions</h1>
          <p className="text-slate-600">Last updated: January 3, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto prose prose-lg [&_p]:!text-black [&_li]:!text-black [&_strong]:!text-black">
          <h2>Agreement to Terms</h2>
          <p>
            These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you and ClearEdge Home Buyers (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) concerning your access to and use of the website www.clearedgehomebuyers.com and any related services we provide.
          </p>
          <p>
            By accessing our website or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our website or services.
          </p>

          <h2>Description of Services</h2>
          <p>
            ClearEdge Home Buyers is a real estate investment company that purchases residential properties directly from homeowners in Eastern Pennsylvania. Our services include:
          </p>
          <ul>
            <li>Evaluating properties for potential purchase</li>
            <li>Providing cash offers to homeowners</li>
            <li>Facilitating real estate transactions for properties we purchase</li>
            <li>Providing information and resources about selling your home</li>
          </ul>

          <h2>Service Area</h2>
          <p>
            Our services are primarily available in Eastern Pennsylvania, including but not limited to Lackawanna County, Luzerne County, Lehigh County, Northampton County, Monroe County, and surrounding areas. We reserve the right to decline to provide services outside of our service area or for properties that do not meet our purchasing criteria.
          </p>

          <h2>No Guarantee of Offers</h2>
          <p>
            Submitting your information through our website or contacting us does not guarantee that we will make an offer on your property. All offers are subject to:
          </p>
          <ul>
            <li>Our evaluation of the property</li>
            <li>Our current investment criteria</li>
            <li>Market conditions</li>
            <li>Property condition and location</li>
            <li>Our available resources</li>
          </ul>
          <p>
            Any offers we make are preliminary and subject to verification of property information, title review, and other due diligence. Final purchase terms are only binding when set forth in a signed purchase agreement.
          </p>

          <h2>No Real Estate Agent Relationship</h2>
          <p>
            ClearEdge Home Buyers is a real estate investment company, not a real estate brokerage. We are not acting as your real estate agent or broker. We do not represent you in any real estate transaction. We are the buyer, and we are acting in our own interest.
          </p>
          <p>
            We encourage you to seek independent legal, financial, and real estate advice before entering into any transaction with us. You have the right to have any offer or contract reviewed by an attorney of your choice before signing.
          </p>

          <h2>Accuracy of Information</h2>
          <p>
            By submitting information through our website, you represent and warrant that:
          </p>
          <ul>
            <li>You are the owner of the property or are authorized to act on behalf of the owner</li>
            <li>All information you provide is true, accurate, and complete</li>
            <li>You have the legal authority to sell the property</li>
            <li>You will notify us of any changes to the information provided</li>
          </ul>

          <h2>Website Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use our website for any unlawful purpose</li>
            <li>Provide false or misleading information</li>
            <li>Interfere with the proper functioning of the website</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Use automated systems to access the website without permission</li>
            <li>Copy, reproduce, or distribute our content without authorization</li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            All content on our website, including text, graphics, logos, images, and software, is the property of ClearEdge Home Buyers or our licensors and is protected by copyright and other intellectual property laws. You may not use our content without our express written permission.
          </p>

          <h2>Disclaimer of Warranties</h2>
          <p>
            OUR WEBSITE AND SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
          </p>
          <ul>
            <li>WARRANTIES OF MERCHANTABILITY</li>
            <li>FITNESS FOR A PARTICULAR PURPOSE</li>
            <li>NON-INFRINGEMENT</li>
            <li>ACCURACY OR COMPLETENESS OF INFORMATION</li>
          </ul>
          <p>
            We do not warrant that our website will be uninterrupted, error-free, or secure, or that any defects will be corrected.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY LAW, CLEAREDGE HOME BUYERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF OUR WEBSITE OR SERVICES.
          </p>
          <p>
            Our total liability for any claims arising from your use of our website or services shall not exceed the amount you paid to us, if any, during the twelve (12) months preceding the claim.
          </p>

          <h2>Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless ClearEdge Home Buyers and our officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys&apos; fees) arising out of or related to:
          </p>
          <ul>
            <li>Your use of our website or services</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any rights of a third party</li>
            <li>Any information you provide to us</li>
          </ul>

          <h2>Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of any third-party websites. Your use of third-party websites is at your own risk.
          </p>

          <h2>Modifications to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective when posted on our website. Your continued use of our website after changes are posted constitutes your acceptance of the modified Terms.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the Commonwealth of Pennsylvania, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the state or federal courts located in Pennsylvania.
          </p>

          <h2>Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
          </p>

          <h2>Entire Agreement</h2>
          <p>
            These Terms, together with our Privacy Policy, constitute the entire agreement between you and ClearEdge Home Buyers regarding your use of our website. These Terms supersede any prior agreements or understandings.
          </p>

          <h2>Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us:</p>
          <ul>
            <li><strong>Phone:</strong> (570) 904-2059</li>
            <li><strong>Website:</strong> www.clearedgehomebuyers.com</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e3a5f] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image src="/logo.webp" alt="ClearEdge Home Buyers" width={180} height={40} className="h-10 w-auto" />
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
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
