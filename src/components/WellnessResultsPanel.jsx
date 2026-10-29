import Button from './Button'
import {
  RESULT_TIER_CONTENT,
  GENTLE_REFLECTION,
  WHAT_NEXT,
  TIER_STYLES,
} from '../data/wellnessResultsContent'

function CheckIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function ReflectionIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  )
}

export default function WellnessResultsPanel({ resultTier, clientName }) {
  if (!resultTier) return null

  const tier = RESULT_TIER_CONTENT[resultTier]
  const styles = TIER_STYLES[resultTier]
  const firstName = clientName?.trim().split(/\s+/)[0]

  return (
    <div className="mt-8 space-y-6 sm:space-y-8" aria-live="polite">
      {/* Header */}
      <div className="text-center space-y-3">
        <div
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs sm:text-sm font-semibold ${styles.badge}`}
        >
          <CheckIcon className="w-4 h-4 shrink-0" />
          {tier.badge}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-sage-dark)] text-pretty">
          {firstName ? `${firstName}, here is your reflection` : 'Your reflection'}
        </h3>
        <p className="text-sm sm:text-base text-[#5a5a5a] max-w-2xl mx-auto text-pretty leading-relaxed">
          {tier.summary}
        </p>
      </div>

      {/* Tier-specific insight */}
      <article
        className={`rounded-2xl sm:rounded-3xl border border-[var(--color-stone)] bg-white shadow-sm overflow-hidden border-l-4 ${styles.accent}`}
      >
        <div className="p-5 sm:p-7 md:p-8">
          <h4 className="text-base sm:text-lg font-semibold text-[var(--color-sage-dark)] mb-4 sm:mb-5 text-pretty leading-snug">
            {tier.heading}
          </h4>
          <div className="space-y-4">
            {tier.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-sm sm:text-base text-[#3d3d3d] leading-relaxed text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      {/* Divider */}
      <div className="flex items-center gap-4 px-2" aria-hidden="true">
        <div className="flex-1 h-px bg-[var(--color-stone)]" />
        <span className="text-[#aaa] text-sm">⸻</span>
        <div className="flex-1 h-px bg-[var(--color-stone)]" />
      </div>

      {/* Gentle Reflection — common */}
      <section className="rounded-2xl sm:rounded-3xl border border-[var(--color-stone)] bg-[var(--color-cream)]/60 p-5 sm:p-7 md:p-8">
        <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
          <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${styles.icon}`}>
            <ReflectionIcon className="w-5 h-5" />
          </div>
          <h4 className="text-base sm:text-lg font-semibold text-[var(--color-sage-dark)] pt-1.5">
            {GENTLE_REFLECTION.heading}
          </h4>
        </div>

        <div className="space-y-4 mb-5 sm:mb-6">
          <p className="text-sm sm:text-base text-[#3d3d3d] leading-relaxed text-pretty">
            {GENTLE_REFLECTION.intro}
          </p>
          <p className="text-sm sm:text-base text-[#3d3d3d] leading-relaxed text-pretty font-medium">
            {GENTLE_REFLECTION.subIntro}
          </p>
        </div>

        <ul className="space-y-3 mb-5 sm:mb-6">
          {GENTLE_REFLECTION.questions.map((question) => (
            <li
              key={question}
              className="flex gap-3 rounded-xl bg-white border border-[var(--color-stone)]/80 px-4 py-3.5 text-sm sm:text-base text-[#3d3d3d] leading-relaxed"
            >
              <span className="shrink-0 mt-0.5 text-[var(--color-sage-dark)] font-bold" aria-hidden="true">
                ?
              </span>
              <span className="text-pretty">{question}</span>
            </li>
          ))}
        </ul>

        <p className="text-sm sm:text-base text-[#5a5a5a] leading-relaxed text-pretty italic">
          {GENTLE_REFLECTION.closing}
        </p>
      </section>

      {/* What Next — common */}
      <section className="rounded-2xl sm:rounded-3xl border-2 border-[var(--color-sage-dark)]/20 bg-gradient-to-br from-white to-[var(--color-mint)]/30 p-5 sm:p-7 md:p-8">
        <h4 className="text-base sm:text-lg font-semibold text-[var(--color-sage-dark)] mb-4 sm:mb-5">
          {WHAT_NEXT.heading}
        </h4>
        <div className="space-y-4 mb-6 sm:mb-8">
          {WHAT_NEXT.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-sm sm:text-base text-[#3d3d3d] leading-relaxed text-pretty">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button to="/contact" variant="primary" className="w-full sm:w-auto text-center justify-center min-w-[180px]">
            Book a slot
          </Button>
          <Button
            to="/services"
            variant="secondary"
            className="w-full sm:w-auto text-center justify-center min-w-[180px]"
          >
            Explore our services
          </Button>
        </div>
      </section>

      <p className="text-xs sm:text-sm text-[#888] text-center text-pretty leading-relaxed px-2">
        This assessment is not a diagnosis. If you are in crisis or need immediate support, please reach out to a
        local emergency service or crisis helpline.
      </p>
    </div>
  )
}
