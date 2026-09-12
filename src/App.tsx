import { useState } from 'react'
import TestRunner from './TestRunner'
import Results from './Results'
import {
  politicalCompassQuestions,
  voteCompassQuestions,
  twelveAxesQuestions,
  neoValuesQuestions,
  scoreAxes,
  TESTS,
} from './data'
import type { Response } from './data'

type Screen = 'home' | 'test' | 'results'

function getQuestions(id: string) {
  switch (id) {
    case 'political-compass': return politicalCompassQuestions
    case 'vote-compass': return voteCompassQuestions
    case '12axes': return twelveAxesQuestions
    case 'neovalues': return neoValuesQuestions
    default: return []
  }
}

function TestCard({
  test,
  index,
  onStart,
}: {
  test: typeof TESTS[0]
  index: number
  onStart: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      className="border border-[var(--border)] transition-colors duration-150 cursor-pointer"
      style={{ borderColor: hovered ? 'var(--primary)' : 'var(--border)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onStart}
    >
      <div
        className="h-[3px] w-full transition-colors duration-150"
        style={{ backgroundColor: hovered ? 'var(--primary)' : 'var(--border)' }}
      />

      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 flex items-center justify-center border border-[var(--border)] flex-shrink-0"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                borderColor: hovered ? 'var(--primary)' : 'var(--border)',
                color: hovered ? 'var(--primary)' : 'var(--foreground)',
                transition: 'all 0.15s',
              }}
            >
              {test.abbrev}
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.16em',
                  color: 'var(--muted-foreground)',
                  marginBottom: '3px',
                }}
              >
                TEST {String(index + 1).padStart(2, '0')}
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                  letterSpacing: '0.03em',
                  lineHeight: 1,
                  color: 'var(--foreground)',
                }}
              >
                {test.name}
              </h2>
            </div>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.12em',
              padding: '3px 7px',
              border: '1px solid var(--primary)',
              color: 'var(--primary)',
              flexShrink: 0,
            }}
          >
            {test.tag}
          </div>
        </div>

        <p
          className="mb-5"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.9375rem',
            lineHeight: 1.65,
            color: 'var(--secondary-foreground)',
          }}
        >
          {test.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <div className="flex gap-6">
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.12em', color: 'var(--muted-foreground)' }}>
                QUESTIONS
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem' }}>
                {test.questions}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.12em', color: 'var(--muted-foreground)' }}>
                DURATION
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem' }}>
                {test.duration}
              </div>
            </div>
          </div>

          <button
            className="flex items-center gap-2 transition-all duration-150"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '7px 18px',
              border: '1px solid var(--primary)',
              color: hovered ? 'white' : 'var(--primary)',
              backgroundColor: hovered ? 'var(--primary)' : 'transparent',
            }}
            onClick={(e) => { e.stopPropagation(); onStart() }}
          >
            BEGIN
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M2 5.5h7M5.5 2l3.5 3.5L5.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [activeTestId, setActiveTestId] = useState<string | null>(null)
  const [results, setResults] = useState<Record<string, number> | null>(null)

  function startTest(id: string) {
    setActiveTestId(id)
    setResults(null)
    setScreen('test')
  }

  function handleComplete(answers: Record<string, Response>) {
    const questions = getQuestions(activeTestId!)
    const scored = scoreAxes(questions, answers)
    setResults(scored)
    setScreen('results')
  }

  const activeTest = TESTS.find((t) => t.id === activeTestId)

  if (screen === 'test' && activeTestId) {
    return (
      <TestRunner
        testName={activeTest?.name ?? ''}
        questions={getQuestions(activeTestId)}
        onComplete={handleComplete}
        onBack={() => setScreen('home')}
      />
    )
  }

  if (screen === 'results' && activeTest && results) {
    return (
      <Results
        testId={activeTestId!}
        testName={activeTest.name}
        scores={results}
        resultType={activeTest.resultType}
        onRetake={() => startTest(activeTestId!)}
        onHome={() => setScreen('home')}
      />
    )
  }

  // HOME
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <div className="h-1 w-full" style={{ backgroundColor: 'var(--primary)' }} />

      <header className="border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.22em',
                  color: 'var(--primary)',
                  marginBottom: '0.5rem',
                }}
              >
                POLITICAL SELF-ASSESSMENT / OPEN INDEX
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                  letterSpacing: '0.01em',
                  lineHeight: 0.9,
                  textTransform: 'uppercase',
                }}
              >
                IDEOLOGY
                <br />
                <span style={{ color: 'var(--primary)' }}>&amp; POLITICAL</span>
                <br />
                TESTS
              </h1>
            </div>
            <div className="md:text-right max-w-sm">
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '0.9375rem',
                  color: 'var(--muted-foreground)',
                  lineHeight: 1.65,
                }}
              >
                Answer questions honestly. See where you fall on the ideological map. Compare yourself to parties and a database of 25+ political ideologies.
              </p>
              <div
                className="mt-3"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.14em',
                  color: 'var(--muted-foreground)',
                }}
              >
                {TESTS.length} TESTS — ALL FREE — NO ACCOUNT REQUIRED — RUNS IN YOUR BROWSER
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="flex items-center gap-4 py-4 border-b border-[var(--border)]">
          <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted-foreground)' }}>
            SELECT A TEST TO BEGIN
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 md:px-10 py-8">
        <div className="flex flex-col gap-0">
          {TESTS.map((test, i) => (
            <TestCard key={test.id} test={test} index={i} onStart={() => startTest(test.id)} />
          ))}
        </div>
      </main>

      <footer className="border-t border-[var(--border)] mt-8">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.12em', color: 'var(--muted-foreground)' }}>
            NO DATA IS STORED. ALL TESTS RUN ENTIRELY IN YOUR BROWSER.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.12em', color: 'var(--muted-foreground)' }}>
            POLITICAL TESTS INDEX — {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}
