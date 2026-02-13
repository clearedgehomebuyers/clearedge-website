'use client'

interface ScrollToSectionButtonProps {
  targetId: string
  children: React.ReactNode
  className?: string
}

export function ScrollToSectionButton({ targetId, children, className }: ScrollToSectionButtonProps) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
