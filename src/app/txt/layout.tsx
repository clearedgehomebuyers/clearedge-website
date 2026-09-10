import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'See What You\'d Walk Away With | ClearEdge Home Buyers',
  description: 'Free calculator — see your net proceeds from selling your PA home. No sign-up required.',
  robots: { index: false, follow: false },
}

export default function TxtLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
