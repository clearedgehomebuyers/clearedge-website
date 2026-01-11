'use client'

interface ScrollToFormButtonProps {
  children: React.ReactNode
  className?: string
}

export function ScrollToFormButton({ children, className }: ScrollToFormButtonProps) {
  const handleClick = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
