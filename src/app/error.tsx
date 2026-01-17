'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Something went wrong</h1>
        <p className="text-slate-600 mb-8">
          We&apos;re sorry, but something unexpected happened. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition"
        >
          Try Again
        </button>
        <p className="text-slate-500 mt-8 text-sm">
          If this keeps happening, call us at{' '}
          <a href="tel:+15709042059" className="text-blue-600 hover:underline">(570) 904-2059</a>
        </p>
      </div>
    </main>
  )
}
