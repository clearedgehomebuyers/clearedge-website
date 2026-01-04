import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Phone } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | ClearEdge Home Buyers',
  description: 'Privacy Policy for ClearEdge Home Buyers. Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Header currentPage="/privacy-policy" />

      {/* Header */}
      <section className="pt-28 pb-12 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Privacy Policy</h1>
          <p className="text-slate-600">Last updated: January 3, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto prose prose-lg [&_p]:!text-black [&_li]:!text-black [&_strong]:!text-black">
          <h2>Introduction</h2>
          <p>
            ClearEdge Home Buyers (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at www.clearedgehomebuyers.com or submit information through our contact forms.
          </p>
          <p>
            Please read this Privacy Policy carefully. By using our website or submitting your information to us, you consent to the practices described in this policy.
          </p>

          <h2>Information We Collect</h2>
          <h3>Personal Information You Provide</h3>
          <p>We collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Fill out a contact form or cash offer request form</li>
            <li>Call us or communicate with us via email</li>
            <li>Subscribe to our communications</li>
          </ul>
          <p>This information may include:</p>
          <ul>
            <li><strong>Contact Information:</strong> First name, last name, phone number, email address</li>
            <li><strong>Property Information:</strong> Property address, property condition, reason for selling</li>
            <li><strong>Communication Records:</strong> Records of your communications with us</li>
          </ul>

          <h3>Information Collected Automatically</h3>
          <p>When you visit our website, we may automatically collect certain information, including:</p>
          <ul>
            <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent on pages, referring website</li>
            <li><strong>Location Data:</strong> General geographic location based on IP address</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>To respond to your inquiries and provide cash offers for your property</li>
            <li>To communicate with you about our services, including by phone, email, or SMS</li>
            <li>To process real estate transactions if you choose to sell to us</li>
            <li>To improve our website and services</li>
            <li>To comply with legal obligations</li>
            <li>To protect against fraud and unauthorized activity</li>
          </ul>

          <h2>SMS and Email Communications</h2>
          <p>
            By submitting your phone number through our forms, you consent to receive SMS text messages and phone calls from ClearEdge Home Buyers regarding your property and our services. Message frequency may vary. Message and data rates may apply.
          </p>
          <p>
            You can opt out of SMS messages at any time by replying &quot;STOP&quot; to any message. You can opt out of email communications by clicking the &quot;unsubscribe&quot; link in any email or by contacting us directly.
          </p>

          <h2>How We Share Your Information</h2>
          <p>We may share your information in the following circumstances:</p>
          <ul>
            <li><strong>Service Providers:</strong> We may share information with third-party service providers who assist us in operating our website and conducting our business (e.g., CRM systems, title companies, attorneys)</li>
            <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to legal process</li>
            <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred</li>
            <li><strong>With Your Consent:</strong> We may share information for other purposes with your explicit consent</li>
          </ul>

          <h2>Third-Party Services</h2>
          <p>Our website uses the following third-party services:</p>
          <ul>
            <li><strong>Google Analytics:</strong> We use Google Analytics to analyze website traffic and usage patterns. Google Analytics collects information about your use of our website and may use cookies. For more information, see Google&apos;s Privacy Policy.</li>
            <li><strong>Sanity CMS:</strong> We use Sanity as our content management system to manage website content.</li>
            <li><strong>n8n:</strong> We use n8n for workflow automation to process form submissions.</li>
          </ul>

          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to collect information about your browsing activities. Cookies are small data files stored on your device. You can control cookies through your browser settings, though disabling cookies may affect website functionality.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. If you request deletion of your information, we will comply unless we are legally required to retain it.
          </p>

          <h2>Your Rights and Choices</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>The right to access your personal information</li>
            <li>The right to correct inaccurate information</li>
            <li>The right to request deletion of your information</li>
            <li>The right to opt out of certain uses of your information</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided below.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Our website is not intended for children under 18 years of age. We do not knowingly collect personal information from children. If we learn that we have collected information from a child, we will delete that information promptly.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The updated version will be indicated by the &quot;Last updated&quot; date at the top of this page. We encourage you to review this Privacy Policy periodically.
          </p>

          <h2>Contact Us</h2>
          <p>If you have questions about this Privacy Policy or our privacy practices, please contact us:</p>
          <ul>
            <li><strong>Phone:</strong> (570) 904-2059</li>
            <li><strong>Website:</strong> www.clearedgehomebuyers.com</li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  )
}
