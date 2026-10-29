// cspell:ignore TRUESELF web3forms
import { useEffect, useMemo, useRef, useState } from 'react'
import { RESULT_TIER_CONTENT } from '../data/wellnessResultsContent'
import Button from './Button'
import WellnessResultsPanel from './WellnessResultsPanel'

const WEB3FORMS_ACCESS_KEY = '7daba079-7de1-40c9-a4c6-3542b7d13d3e'

const SCALE = ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost Always']

const SECTIONS = [
  {
    id: 'emotional-state',
    title: 'Section 1: Emotional State',
    subtitle: 'Over the past 2–3 weeks, how often have you experienced the following?',
    items: [
      'I feel overwhelmed by small or daily tasks.',
      'I experience persistent worry or overthinking.',
      'I feel low, unmotivated, or emotionally drained.',
      'I find it difficult to regulate my emotions.',
      'I feel disconnected from myself or others.',
      'I feel irritable without clearly knowing why.',
    ],
  },
  {
    id: 'stress-coping',
    title: 'Section 2: Stress & Coping',
    items: [
      'I struggle to switch off from work or responsibilities.',
      'I feel guilty when I rest.',
      'I avoid difficult conversations or decisions.',
      'I feel pressure to “hold everything together.”',
      'My current coping mechanisms feel unhealthy or unsustainable.',
    ],
  },
  {
    id: 'relationships',
    title: 'Section 3: Relationships',
    items: [
      'I feel misunderstood in close relationships.',
      'I find it hard to communicate my needs.',
      'I notice repeated patterns in my relationships that upset me.',
      'I feel emotionally alone even when I’m not physically alone.',
    ],
  },
  {
    id: 'self-identity',
    title: 'Section 4: Self & Identity',
    items: [
      'I struggle with self-worth or self-doubt.',
      'I feel unsure about who I am becoming.',
      'I am going through a major life transition.',
      'I often prioritize others over myself at my own expense.',
    ],
  },
  {
    id: 'burnout',
    title: 'Section 5: Burnout & Exhaustion',
    items: [
      'I wake up already feeling tired or anxious.',
      'I feel emotionally numb at times.',
      'Things that once brought joy no longer feel fulfilling.',
      'I feel close to breaking point but continue functioning.',
    ],
  },
]

const ALL_ITEMS = SECTIONS.flatMap((section) =>
  section.items.map((text, idx) => ({
    id: `${section.id}:${idx + 1}`,
    sectionId: section.id,
    text,
  }))
)

const SECTION_TAB_LABELS = {
  'emotional-state': 'Emotional State',
  'stress-coping': 'Stress & Coping',
  relationships: 'Relationships',
  'self-identity': 'Self & Identity',
  burnout: 'Burnout',
}

function buildSubmissionMessage({ resultText, counts, answers }) {
  const lines = ALL_ITEMS.map((item, i) => {
    const idx = answers[item.id]
    const label = idx !== undefined ? SCALE[idx] : '—'
    return `${i + 1}. ${item.text} — ${label}`
  })
  const countsLine = `Never: ${counts[0]}, Rarely: ${counts[1]}, Sometimes: ${counts[2]}, Often: ${counts[3]}, Almost Always: ${counts[4]}`
  return [
    `Summary: ${resultText ?? '—'}`,
    '',
    `Scale counts — ${countsLine}`,
    '',
    'Responses:',
    ...lines,
  ].join('\n')
}

export default function ContactWellnessPoll({ hideIntro = false }) {
  const [answers, setAnswers] = useState(() => ({}))
  const [showResults, setShowResults] = useState(false)
  const [active, setActive] = useState(0)
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resultsDelivered, setResultsDelivered] = useState(false)
  /** Show questions only after name + phone are entered and user taps Start. */
  const [assessmentUnlocked, setAssessmentUnlocked] = useState(false)

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers])
  const totalCount = ALL_ITEMS.length
  const isComplete = answeredCount === totalCount

  const counts = useMemo(() => {
    const c = Array.from({ length: SCALE.length }, () => 0)
    for (const v of Object.values(answers)) c[v] += 1
    return c
  }, [answers])

  const resultTier = useMemo(() => {
    const rarelyGroup = counts[0] + counts[1]
    const sometimesGroup = counts[2]
    const oftenGroup = counts[3] + counts[4]

    const max = Math.max(rarelyGroup, sometimesGroup, oftenGroup)
    if (max === 0) return null
    if (oftenGroup === max) return 'often'
    if (sometimesGroup === max) return 'sometimes'
    return 'rarely'
  }, [counts])

  const resultText = useMemo(() => {
    if (!resultTier) return null
    const tier = RESULT_TIER_CONTENT[resultTier]
    return `${tier.badge}: ${tier.summary}`
  }, [resultTier])

  const resultsRef = useRef(null)

  const current = ALL_ITEMS[active]
  const currentSection = useMemo(
    () => SECTIONS.find((s) => s.id === current.sectionId),
    [current.sectionId]
  )
  const currentSectionId = current.sectionId
  const selected = answers[current.id]
  const hasSelectedCurrent = selected !== undefined
  const isFirst = active === 0
  const isLast = active === ALL_ITEMS.length - 1

  const sectionStartIndexById = useMemo(() => {
    const map = {}
    let idx = 0
    for (const s of SECTIONS) {
      map[s.id] = idx
      idx += s.items.length
    }
    return map
  }, [])

  const sectionRangeById = useMemo(() => {
    const map = {}
    for (const s of SECTIONS) {
      const start = sectionStartIndexById[s.id] ?? 0
      map[s.id] = { start, end: start + s.items.length - 1 }
    }
    return map
  }, [sectionStartIndexById])

  const currentSectionRange = sectionRangeById[currentSectionId]
  const sectionAnsweredCount = useMemo(() => {
    if (!currentSectionRange) return 0
    let n = 0
    for (let i = currentSectionRange.start; i <= currentSectionRange.end; i += 1) {
      if (answers[ALL_ITEMS[i].id] !== undefined) n += 1
    }
    return n
  }, [answers, currentSectionRange])

  const sectionTotalCount = currentSectionRange
    ? currentSectionRange.end - currentSectionRange.start + 1
    : 0

  const progressPct = totalCount ? Math.round((answeredCount / totalCount) * 100) : 0

  const canStartAssessment = clientName.trim().length > 0 && clientPhone.trim().length > 0
  const canViewResults =
    isComplete && clientName.trim().length > 0 && clientPhone.trim().length > 0

  useEffect(() => {
    setResultsDelivered(false)
  }, [answers])

  useEffect(() => {
    if (showResults && isComplete && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [showResults, isComplete])

  const submitAssessmentToWeb3 = async () => {
    if (!resultText) return false
    const message = buildSubmissionMessage({ resultText, counts, answers })
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: 'Free Assessment Result - TRUESELF COUNSELLING',
      name: clientName.trim(),
      from_name: clientName.trim(),
      message,
    }
    const email = clientEmail.trim()
    const phone = clientPhone.trim()
    if (email) payload.email = email
    if (phone) payload.phone = phone

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const result = await res.json()
    return Boolean(result.success)
  }

  const handleViewResults = async () => {
    setSubmitError('')
    if (!clientName.trim() || !clientPhone.trim()) {
      setSubmitError('Please enter your name and phone number.')
      return
    }
    if (!isComplete) return

    if (!resultsDelivered) {
      setIsSubmitting(true)
      try {
        const ok = await submitAssessmentToWeb3()
        if (!ok) {
          setSubmitError('Could not send your details right now. Please try again.')
          setIsSubmitting(false)
          return
        }
        setResultsDelivered(true)
      } catch {
        setSubmitError('Network issue. Please try again.')
        setIsSubmitting(false)
        return
      }
      setIsSubmitting(false)
    }
    setShowResults(true)
  }

  const handleStartAssessment = () => {
    if (!canStartAssessment) return
    setAssessmentUnlocked(true)
    setSubmitError('')
  }

  return (
    <div className="mb-10 sm:mb-12 md:mb-14 w-full min-w-0 pb-24 sm:pb-14 md:pb-16">
      {!hideIntro && (
        <>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-sage-dark)] mb-2 text-center px-1">
            Free Assessment
          </h2>
          <p className="text-sm sm:text-base text-[#5a5a5a] text-center max-w-3xl mx-auto mb-3 sm:mb-4 px-2 sm:px-0 text-pretty">
            A gentle self-reflection tool designed to help you understand where you are emotionally.
          </p>
          <p className="text-sm sm:text-base text-[#5a5a5a] text-center max-w-3xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0 text-pretty">
            This assessment is not a diagnosis. It is a guided check-in to help you gain clarity about your current
            emotional patterns and decide what kind of support might feel helpful.
          </p>
        </>
      )}

      <div className="rounded-2xl sm:rounded-3xl bg-white border border-[var(--color-stone)] p-3 sm:p-6 md:p-8 shadow-sm max-w-3xl mx-auto w-full min-w-0">
        {!assessmentUnlocked ? (
          <div className="max-w-lg mx-auto py-2 sm:py-4">
            <h3 className="text-lg sm:text-xl font-bold text-[var(--color-sage-dark)] mb-2 text-center">
              Before you begin
            </h3>
            <p className="text-sm text-[#5a5a5a] text-center mb-6 text-pretty leading-relaxed">
              Enter your name and phone number. After you continue, the assessment questions will open.
            </p>
            <div className="space-y-4">
              <label className="block text-sm">
                <span className="text-[#5a5a5a] mb-1.5 block font-medium">Full name *</span>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  autoComplete="name"
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-stone)] focus:border-[var(--color-sage-dark)] outline-none transition-colors text-base bg-white"
                />
              </label>
              <label className="block text-sm">
                <span className="text-[#5a5a5a] mb-1.5 block font-medium">Phone number *</span>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  autoComplete="tel"
                  placeholder="e.g. +91 9876543210"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-stone)] focus:border-[var(--color-sage-dark)] outline-none transition-colors text-base bg-white"
                />
              </label>
              <label className="block text-sm">
                <span className="text-[#5a5a5a] mb-1.5 block font-medium">Email</span>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="Optional"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-stone)] focus:border-[var(--color-sage-dark)] outline-none transition-colors text-base bg-white"
                />
              </label>
            </div>
            <div className="mt-8 flex justify-center">
              <Button
                type="button"
                onClick={handleStartAssessment}
                disabled={!canStartAssessment}
                variant="primary"
                className="min-w-[200px] justify-center disabled:opacity-40 disabled:pointer-events-none"
              >
                Start assessment
              </Button>
            </div>
            {!canStartAssessment && (
              <p className="mt-4 text-xs text-center text-[#888]">Name and phone are required to continue.</p>
            )}
          </div>
        ) : showResults && isComplete ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
              <div className="rounded-xl border border-[var(--color-sage)]/40 bg-[var(--color-mint)]/30 px-3 py-2.5 sm:px-4 text-sm text-[#3d3d3d]">
                <span className="font-semibold text-[var(--color-sage-dark)]">{clientName.trim()}</span>
                <span className="text-[#888] mx-2" aria-hidden="true">
                  ·
                </span>
                <span>{clientPhone.trim()}</span>
              </div>
              <div className="flex flex-col min-[360px]:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => setShowResults(false)}
                  className="px-4 py-2.5 rounded-xl border-2 border-[var(--color-stone)] text-sm font-medium text-[#5a5a5a] hover:border-[var(--color-sage)]"
                >
                  Review answers
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAnswers({})
                    setShowResults(false)
                    setActive(0)
                    setClientName('')
                    setClientEmail('')
                    setClientPhone('')
                    setSubmitError('')
                    setResultsDelivered(false)
                    setAssessmentUnlocked(false)
                  }}
                  className="px-4 py-2.5 rounded-xl border-2 border-[var(--color-stone)] text-sm font-medium text-[#5a5a5a] hover:border-[var(--color-sage)]"
                >
                  Start over
                </button>
              </div>
            </div>

            <div ref={resultsRef}>
              <WellnessResultsPanel resultTier={resultTier} clientName={clientName} />
            </div>

            {submitError ? (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {submitError}
              </p>
            ) : null}
          </>
        ) : (
          <>
            <div
              className="h-1.5 w-full rounded-full bg-[var(--color-stone)]/60 mb-4 sm:mb-5 overflow-hidden"
              role="progressbar"
              aria-valuenow={progressPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Check-in completion"
            >
              <div
                className="h-full rounded-full bg-[var(--color-sage-dark)] transition-[width] duration-300 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <div className="rounded-xl border border-[var(--color-sage)]/40 bg-[var(--color-mint)]/30 px-3 py-2.5 sm:px-4 mb-5 text-sm text-[#3d3d3d]">
              <span className="font-semibold text-[var(--color-sage-dark)]">{clientName.trim()}</span>
              <span className="text-[#888] mx-2" aria-hidden="true">
                ·
              </span>
              <span>{clientPhone.trim()}</span>
              {clientEmail.trim() ? (
                <>
                  <span className="text-[#888] mx-2" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-[#5a5a5a]">{clientEmail.trim()}</span>
                </>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 mb-5 sm:flex-row sm:items-center sm:justify-between sm:mb-6">
              <div className="text-sm text-[#5a5a5a] shrink-0">
                <span className="font-semibold text-[var(--color-sage-dark)]">{answeredCount}</span> / {totalCount}{' '}
                answered
              </div>
              <div className="flex flex-col min-[420px]:flex-row gap-2 w-full sm:w-auto sm:flex-row">
                <button
                  type="button"
                  onClick={() => void handleViewResults()}
                  disabled={!canViewResults || isSubmitting}
                  className="w-full min-[420px]:flex-1 sm:w-auto sm:flex-none px-4 py-2.5 rounded-xl border-2 border-[var(--color-sage-dark)] text-sm font-medium text-[var(--color-sage-dark)] hover:bg-[var(--color-mint)] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending…' : 'View results'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAnswers({})
                    setShowResults(false)
                    setActive(0)
                    setClientName('')
                    setClientEmail('')
                    setClientPhone('')
                    setSubmitError('')
                    setResultsDelivered(false)
                    setAssessmentUnlocked(false)
                  }}
                  className="w-full min-[420px]:flex-1 sm:w-auto sm:flex-none px-4 py-2.5 rounded-xl border-2 border-[var(--color-stone)] text-sm font-medium text-[#5a5a5a] hover:border-[var(--color-sage)]"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-[#888] mb-4 space-y-2">
              <p className="leading-snug">Rate each statement using this scale:</p>
              <ul className="m-0 p-0 list-none flex flex-wrap gap-x-2 gap-y-1.5 sm:gap-x-3">
                {SCALE.map((label) => (
                  <li
                    key={label}
                    className="font-semibold text-[#666] text-[11px] sm:text-sm rounded-md bg-[var(--color-cream)]/80 px-2 py-0.5 border border-[var(--color-stone)]/60"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="-mx-1 px-1 sm:mx-0 sm:px-0 mb-6">
              <div
                className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible [-webkit-overflow-scrolling:touch] [scrollbar-width:thin]"
                role="tablist"
                aria-label="Survey sections"
              >
                {SECTIONS.map((s) => {
                  const isActiveSection = s.id === currentSectionId
                  const startIdx = sectionStartIndexById[s.id] ?? 0
                  const endIdx = startIdx + s.items.length - 1
                  let answeredInSection = 0
                  for (let i = startIdx; i <= endIdx; i += 1) {
                    if (answers[ALL_ITEMS[i].id] !== undefined) answeredInSection += 1
                  }
                  const isDone = answeredInSection === s.items.length

                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        const range = sectionRangeById[s.id]
                        if (!range) return
                        let target = range.start
                        for (let i = range.start; i <= range.end; i += 1) {
                          if (answers[ALL_ITEMS[i].id] === undefined) {
                            target = i
                            break
                          }
                          target = i
                        }
                        setActive(target)
                        setShowResults(false)
                      }}
                      className={`
                        shrink-0 whitespace-nowrap h-9 sm:h-10 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all border-2
                        ${
                          isActiveSection
                            ? 'bg-[var(--color-sage-dark)] text-white border-[var(--color-sage-dark)] shadow-md'
                            : isDone
                              ? 'bg-[var(--color-mint)] text-[var(--color-sage-dark)] border-[var(--color-sage)]'
                              : 'bg-white text-[#5a5a5a] border-[var(--color-stone)] hover:border-[var(--color-sage)]'
                        }
                      `}
                      aria-current={isActiveSection ? 'step' : undefined}
                    >
                      {SECTION_TAB_LABELS[s.id] ?? s.title}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--color-stone)] bg-[var(--color-cream)] p-3 sm:p-5 min-w-0">
              <div className="text-xs sm:text-sm text-[#888] mb-3 text-left sm:text-center px-0.5 break-words">
                {currentSection?.title} • {sectionAnsweredCount} / {sectionTotalCount} answered
              </div>
              <div className="mb-3 text-left sm:text-center px-0.5">
                {currentSection?.subtitle && (
                  <p className="text-sm text-[#5a5a5a] mt-1 text-pretty leading-relaxed">{currentSection.subtitle}</p>
                )}
              </div>

              <div className="text-sm sm:text-base font-medium text-[#3d3d3d] mb-4 text-left sm:text-center px-0.5 break-words text-pretty leading-relaxed">
                {current.text}
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
                {SCALE.map((label, optionIdx) => {
                  const isSel = selected === optionIdx
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        setAnswers((prev) => ({ ...prev, [current.id]: optionIdx }))
                        setShowResults(false)
                        setActive((a) => {
                          if (a >= totalCount - 1) return a
                          return a + 1
                        })
                      }}
                      className={`inline-flex w-full sm:w-auto sm:min-w-[6.5rem] items-center justify-center px-3 py-2.5 sm:py-2 rounded-xl border-2 text-xs sm:text-sm font-semibold transition-colors ${
                        isSel
                          ? 'border-[var(--color-sage-dark)] bg-[var(--color-mint)] text-[var(--color-sage-dark)]'
                          : 'border-[var(--color-stone)] bg-white text-[#5a5a5a] hover:border-[var(--color-sage)]'
                      }`}
                      aria-pressed={isSel}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6 sm:flex sm:justify-between sm:items-center">
                <button
                  type="button"
                  onClick={() => setActive((a) => Math.max(0, a - 1))}
                  disabled={isFirst}
                  className="px-3 sm:px-4 py-2.5 rounded-xl border-2 border-[var(--color-stone)] text-sm font-medium text-[#5a5a5a] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[var(--color-sage)]"
                >
                  Previous
                </button>
                {isLast ? (
                  <button
                    type="button"
                    onClick={() => void handleViewResults()}
                    disabled={!canViewResults || !hasSelectedCurrent || isSubmitting}
                    className="px-3 sm:px-4 py-2.5 rounded-xl border-2 border-[var(--color-sage-dark)] text-sm font-medium text-[var(--color-sage-dark)] hover:bg-[var(--color-mint)] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending…' : 'View results'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActive((a) => Math.min(totalCount - 1, a + 1))}
                    disabled={!hasSelectedCurrent}
                    className="px-3 sm:px-4 py-2.5 rounded-xl border-2 border-[var(--color-sage-dark)] text-sm font-medium text-[var(--color-sage-dark)] hover:bg-[var(--color-mint)] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>

            {!isComplete && (
              <p className="mt-4 text-sm text-[#888]">Answer all statements to view your results.</p>
            )}
            {submitError ? (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {submitError}
              </p>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
