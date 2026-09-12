import { useEffect, useState } from 'react'
import type { Question, Response } from './data'

interface Props {
  testName: string
  questions: Question[]
  onComplete: (answers: Record<string, Response>) => void
  onBack: () => void
}

const OPTIONS: { label: string; value: Response; key: string }[] = [
  { label: 'Strongly Agree', value: 2, key: '1' },
  { label: 'Agree', value: 1, key: '2' },
  { label: 'Neutral', value: 0, key: '3' },
  { label: 'Disagree', value: -1, key: '4' },
  { label: 'Strongly Disagree', value: -2, key: '5' },
]

export default function TestRunner({ testName, questions, onComplete, onBack }: Props) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Response>>({})
  const [selected, setSelected] = useState<Response | null>(null)
  const [entering, setEntering] = useState(true)

  const q = questions[current]
  const progress = current / questions.length
  const answeredCount = Object.keys(answers).length
  const isLast = current === questions.length - 1

  useEffect(() => {
    setEntering(true)
    const t = setTimeout(() => setEntering(false), 20)
    return () => clearTimeout(t)
  }, [current])

  function handleSelect(val: Response) {
    setSelected(val)
  }

  function handleNext() {
    if (selected === null) return
    const next = { ...answers, [q.id]: selected }
    setAnswers(next)
    if (isLast) {
      onComplete(next)
      return
    }
    setSelected(null)
    setCurrent((c) => c + 1)
  }

  function handleBack() {
    if (current === 0) {
      onBack()
      return
    }
    setSelected(answers[questions[current - 1].id] ?? null)
    setCurrent((c) => c - 1)
  }

  // Keyboard shortcuts: 1-5 to select an option, Enter to advance, Backspace/Left to go back
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const opt = OPTIONS.find((o) => o.key === e.key)
      if (opt) {
        setSelected(opt.value)
        return
      }
      if (e.key === 'Enter') {
        handleNext()
      } else if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
        handleBack()
      } else if (e.key === 'ArrowRight' && selected !== null) {
        handleNext()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, current, answers])

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      {/* Progress track */}
      <div className="h-[3px] w-full" style={{ backgroundColor: 'var(--border)' }}>
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${progress * 100}%`, backgroundColor: 'var(--primary)' }}
        />
      </div>

      <header className="border-b border-[var(--border)] px-6 md:px-10 py-4 flex items-center justify-between gap-3">
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.015em' }}>
          {testName}
        </div>
        <div className="flex items-center gap-3">
          <span
            className="hidden md:inline"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.015em', color: 'var(--muted-foreground)' }}
          >
            {answeredCount} answered
          </span>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.02em',
              color: 'var(--muted-foreground)',
            }}
          >
            {String(current + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-3xl mx-auto w-full">
        <div
          className="w-full flex flex-col items-center"
          style={{
            opacity: entering ? 0 : 1,
            transform: entering ? 'translateY(6px)' : 'translateY(0)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
          }}
        >
          {/* Question number */}
          <div
            className="mb-6 self-start"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.01em',
              color: 'var(--primary)',
            }}
          >
            Question {String(current + 1).padStart(2, '0')}
          </div>

          {/* Question text */}
          <div
            className="mb-10 self-start"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)',
              lineHeight: 1.55,
              color: 'var(--foreground)',
              maxWidth: '680px',
            }}
          >
            &ldquo;{q.text}&rdquo;
          </div>

          {/* Options */}
          <div className="w-full flex flex-col gap-2">
            {OPTIONS.map((opt) => {
              const isChosen = selected === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className="w-full text-left px-6 py-4 border transition-all duration-100 flex items-center gap-4"
                  style={{
                    border: isChosen ? '1px solid var(--primary)' : '1px solid var(--border)',
                    backgroundColor: isChosen ? 'rgba(196,30,58,0.08)' : 'transparent',
                    fontFamily: 'var(--font-display)',
                    fontWeight: isChosen ? 700 : 600,
                    fontSize: '0.95rem',
                    letterSpacing: '0.01em',
                    color: isChosen ? 'var(--foreground)' : 'var(--secondary-foreground)',
                  }}
                >
                  <div
                    className="w-4 h-4 border flex-shrink-0 flex items-center justify-center"
                    style={{
                      border: isChosen ? '1px solid var(--primary)' : '1px solid var(--border)',
                      backgroundColor: isChosen ? 'var(--primary)' : 'transparent',
                    }}
                  >
                    {isChosen && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="square" />
                      </svg>
                    )}
                  </div>
                  {opt.label}
                  <span
                    className="ml-auto hidden sm:inline"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.015em', color: 'var(--muted-foreground)' }}
                  >
                    [{opt.key}]
                  </span>
                </button>
              )
            })}
          </div>

          {/* Nav */}
          <div className="w-full mt-8">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                className="flex items-center gap-3 transition-colors duration-150"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  padding: '10px 24px',
                  border: '1px solid var(--border)',
                  color: 'var(--muted-foreground)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--foreground)'; e.currentTarget.style.color = 'var(--foreground)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted-foreground)' }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 6H2M6 2L2 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={selected === null}
                className="flex items-center gap-3 transition-colors duration-150"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  padding: '10px 24px',
                  border: '1px solid',
                  borderColor: selected !== null ? 'var(--primary)' : 'var(--border)',
                  color: selected !== null ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                  backgroundColor: selected !== null ? 'var(--primary)' : 'transparent',
                  cursor: selected !== null ? 'pointer' : 'not-allowed',
                }}
              >
                {isLast ? 'See results' : 'Next'}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
              </button>
            </div>
            <div
              className="hidden sm:block text-center mt-4"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.015em', color: 'var(--muted-foreground)' }}
            >
              Tip: press 1–5 to answer, enter to continue
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
