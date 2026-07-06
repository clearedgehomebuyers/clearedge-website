import { TrackedCTALink } from '@/components/TrackedCTALink'

interface BlogCtaBlockProps {
  heading: string
  body: string
  buttonText: string
  ctaLocation: string
}

export function BlogCtaBlock({ heading, body, buttonText, ctaLocation }: BlogCtaBlockProps) {
  return (
    <aside className="my-10 bg-ce-green-subtle border border-ce-green/20 rounded-2xl p-6 md:p-8 not-prose">
      <h3 className="font-serif text-xl md:text-2xl font-medium text-ce-ink mb-3">
        {heading}
      </h3>
      <p className="text-ce-ink/80 leading-relaxed text-lg mb-6">{body}</p>
      <TrackedCTALink
        href="/#lead-form"
        label={buttonText}
        eventLabel={`${buttonText} - Blog Mid-Article CTA`}
        ctaLocation={ctaLocation}
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-ce-green text-white px-8 py-4 rounded-full font-medium hover:bg-ce-green-hover shadow-green hover:shadow-green-lg hover:-translate-y-0.5 active:translate-y-0 transition-all group"
      />
    </aside>
  )
}
