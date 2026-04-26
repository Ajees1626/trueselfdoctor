import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const POLL = [
  {
    id: 1,
    question: 'How would you rate your current stress level?',
    baseCounts: [42, 118, 205, 89],
    options: ['Very low', 'Manageable', 'High', 'Overwhelming'],
  },
  {
    id: 2,
    question: 'How often do you get restful sleep?',
    baseCounts: [31, 96, 178, 149],
    options: ['Every night', 'Most nights', 'Occasionally', 'Rarely'],
  },
  {
    id: 3,
    question: 'What best describes your support system?',
    baseCounts: [156, 203, 98, 47],
    options: ['Strong', 'Adequate', 'Limited', 'Prefer not to say'],
  },
  {
    id: 4,
    question: 'Have you had therapy or counselling before?',
    baseCounts: [214, 167, 89, 34],
    options: ['Yes, currently', 'Yes, in the past', 'No, considering', 'No'],
  },
  {
    id: 5,
    question: 'What is your main goal for seeking support?',
    baseCounts: [67, 142, 198, 97],
    options: ['Anxiety or worry', 'Mood and energy', 'Relationships', 'Work / life balance'],
  },
  {
    id: 6,
    question: 'How comfortable are you opening up to a professional?',
    baseCounts: [112, 189, 151, 52],
    options: ['Very', 'Somewhat', 'A little nervous', 'Unsure yet'],
  },
  {
    id: 7,
    question: 'Preferred session format?',
    baseCounts: [145, 176, 124, 59],
    options: ['In person', 'Video', 'Phone', 'No preference'],
  },
  {
    id: 8,
    question: 'When would you like to start?',
    baseCounts: [98, 201, 134, 71],
    options: ['This week', 'This month', 'Next month', 'Just exploring'],
  },
  {
    id: 9,
    question: 'What matters most in choosing a therapist?',
    baseCounts: [88, 156, 142, 118],
    options: ['Experience', 'Approach and style', 'Location / online', 'Availability'],
  },
  {
    id: 10,
    question: 'How did you hear about us?',
    baseCounts: [76, 112, 185, 131],
    options: ['Search / website', 'Referral', 'Social media', 'Other'],
  },
]

function countsToDisplay(counts) {
  const total = counts.reduce((a, b) => a + b, 0) || 1
  return counts.map((c) => ({
    count: c,
    pct: Math.round((c / total) * 1000) / 10,
  }))
}

export default function ContactWellnessPoll() {
  const WEB3FORMS_ACCESS_KEY = '7daba079-7de1-40c9-a4c6-3542b7d13d3e'
  const [active, setActive] = useState(0)
  const [pollState, setPollState] = useState(() => ({
    selection: {},
    countsByQ: Object.fromEntries(POLL.map((q) => [q.id, [...q.baseCounts]])),
  }))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const current = POLL[active]
  const { selection, countsByQ } = pollState
  const display = useMemo(
    () => countsToDisplay(countsByQ[current.id]),
    [countsByQ, current.id]
  )
  const selected = selection[current.id]
  const isLastQuestion = active === POLL.length - 1
  const hasSelectedCurrent = selected !== undefined

  const vote = (optionIndex) => {
    setPollState((prev) => {
      const prevIdx = prev.selection[current.id]
      if (prevIdx === optionIndex) return prev
      const row = [...prev.countsByQ[current.id]]
      if (prevIdx !== undefined) {
        row[prevIdx] = Math.max(0, row[prevIdx] - 1)
      }
      row[optionIndex] = row[optionIndex] + 1
      return {
        ...prev,
        selection: { ...prev.selection, [current.id]: optionIndex },
        countsByQ: { ...prev.countsByQ, [current.id]: row },
      }
    })
  }

  const submitPoll = async () => {
    const answered = POLL.filter((q) => selection[q.id] !== undefined)
    const responses = answered.map((q, idx) => {
      const pickedIndex = selection[q.id]
      const pickedOption = q.options[pickedIndex]
      return `${idx + 1}. ${q.question} - ${pickedOption}`
    })

    try {
      setIsSubmitting(true)
      setSubmitStatus('')

      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: 'Wellness Poll Response - True Self Counselling',
        from_name: 'Website Wellness Poll',
        answered_count: String(answered.length),
        responses: responses.join('\n'),
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await res.json()
      if (result.success) {
        setSubmitStatus('Poll submitted successfully.')
      } else {
        setSubmitStatus('Submission failed. Please try again.')
      }
    } catch {
      setSubmitStatus('Network issue. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mb-10 sm:mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-sage-dark)] mb-2 text-center">
        Quick check-in
      </h2>
      <p className="text-sm sm:text-base text-[#5a5a5a] text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        Ten short questions. Tap a number to move between them — each has four choices with live
        community-style counts.
      </p>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-6">
        {POLL.map((q, i) => (
          <button
            key={q.id}
            type="button"
            onClick={() => setActive(i)}
            className={`
              min-w-[2.25rem] h-9 sm:h-10 px-2.5 rounded-xl text-sm font-semibold transition-all
              ${
                i === active
                  ? 'bg-[var(--color-sage-dark)] text-white shadow-md scale-105'
                  : selection[q.id] !== undefined
                    ? 'bg-[var(--color-mint)] text-[var(--color-sage-dark)] border-2 border-[var(--color-sage)]'
                    : 'bg-white text-[#5a5a5a] border-2 border-[var(--color-stone)] hover:border-[var(--color-sage)]'
              }
            `}
            aria-label={`Question ${i + 1}`}
            aria-current={i === active ? 'step' : undefined}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="rounded-2xl sm:rounded-3xl bg-white border border-[var(--color-stone)] p-4 sm:p-6 md:p-8 shadow-sm max-w-2xl mx-auto">
        <div className="text-xs sm:text-sm text-[#888] mb-3 text-center">
          Question {active + 1} of {POLL.length}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="text-base sm:text-lg font-semibold text-[#3d3d3d] mb-5 sm:mb-6 text-center">
              {current.question}
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {current.options.map((label, i) => {
                const { count, pct } = display[i]
                const isSel = selected === i
                return (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => vote(i)}
                      className={`
                        w-full text-left rounded-xl sm:rounded-2xl border-2 overflow-hidden transition-all
                        ${
                          isSel
                            ? 'border-[var(--color-sage-dark)] ring-2 ring-[var(--color-mint)] ring-offset-2'
                            : 'border-[var(--color-stone)] hover:border-[var(--color-sage)]'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-[var(--color-cream)] relative">
                        <span
                          className="absolute inset-0 origin-left bg-[var(--color-mint)]/50 transition-all duration-500"
                          style={{ transform: `scaleX(${pct / 100})` }}
                        />
                        <span className="relative z-10 text-sm sm:text-base font-medium text-[#3d3d3d] pr-2">
                          {label}
                        </span>
                        <span className="relative z-10 flex items-center gap-2 sm:gap-3 shrink-0 text-xs sm:text-sm tabular-nums text-[#5a5a5a]">
                          <span className="font-semibold text-[var(--color-sage-dark)]">
                            {pct}%
                          </span>
                          <span className="text-[#888] hidden sm:inline">({count})</span>
                        </span>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center gap-3 mt-6 sm:mt-8">
          <button
            type="button"
            onClick={() => setActive((a) => Math.max(0, a - 1))}
            disabled={active === 0}
            className="px-4 py-2 rounded-xl border-2 border-[var(--color-stone)] text-sm font-medium text-[#5a5a5a] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[var(--color-sage)]"
          >
            Previous
          </button>
          {isLastQuestion ? (
            <button
              type="button"
              onClick={() => void submitPoll()}
              disabled={isSubmitting || !hasSelectedCurrent}
              className="px-4 py-2 rounded-xl border-2 border-[var(--color-sage-dark)] text-sm font-medium text-[var(--color-sage-dark)] hover:bg-[var(--color-mint)]"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Poll'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActive((a) => Math.min(POLL.length - 1, a + 1))}
              disabled={!hasSelectedCurrent}
              className="px-4 py-2 rounded-xl border-2 border-[var(--color-sage-dark)] text-sm font-medium text-[var(--color-sage-dark)] hover:bg-[var(--color-mint)] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          )}
        </div>
        {submitStatus && (
          <p className={`mt-3 text-sm ${submitStatus.includes('successfully') ? 'text-green-700' : 'text-red-600'}`}>
            {submitStatus}
          </p>
        )}
      </div>
    </div>
  )
}
