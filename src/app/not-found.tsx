import Link from 'next/link'
import { DynamicPhoneLink } from '@/components/DynamicPhone'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">Page Not Found</h2>
        <p className="text-slate-600 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition"
          >
            Go Home
          </Link>
          <Link 
            href="/contact" 
            className="border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
          >
            Contact Us
          </Link>
        </div>
        <p className="text-slate-500 mt-8 text-sm">
          Need to sell your house fast? Call us at{' '}
          <DynamicPhoneLink className="text-blue-600 hover:underline" />
        </p>
      </div>
    </main>
  )
}
