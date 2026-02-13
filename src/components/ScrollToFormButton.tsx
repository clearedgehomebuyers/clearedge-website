'use client'

interface ScrollToFormButtonProps {
  children: React.ReactNode
  className?: string
  eventLabel?: string
}

export function ScrollToFormButton({ children, className, eventLabel }: ScrollToFormButtonProps) {
  const handleClick = () => {
    if (eventLabel && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'CTA',
        event_label: eventLabel,
        page_path: window.location.pathname
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
