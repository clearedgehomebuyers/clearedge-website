'use client'

interface ScrollToFormButtonProps {
  children: React.ReactNode
  className?: string
  eventLabel?: string
  ctaLocation?: string
}

export function ScrollToFormButton({ children, className, eventLabel, ctaLocation }: ScrollToFormButtonProps) {
  const handleClick = () => {
    if (eventLabel && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'CTA',
        event_label: eventLabel,
        page_path: window.location.pathname,
        ...(ctaLocation ? { cta_location: ctaLocation } : {})
      })
    }
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
