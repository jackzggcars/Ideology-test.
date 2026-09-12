import { useState } from 'react'
import TestRunner from './TestRunner'
import Results from './Results'
import PhilosorterRunner from './PhilosorterRunner'
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
      className="border-b border-[var(--border)] py-8 md:py-10 cursor-pointer transition-colors duration-150"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onStart}
    >
      <div className="flex flex-col md:flex-row gap-5 md:gap-10">
        {/* Index number */}
        <div
          className="flex-shrink-0"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: '2.75rem',
            lineHeight: 1,
            color: hovered ? 'var(--primary)' : 'var(--border)',
            transition: 'color 0.2s',
            fontStyle: 'italic',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-4 mb-2 flex-wrap">
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)',
                lineHeight: 1.1,
                color: 'var(--foreground)',
              }}
            >
              {test.name}
            </h2>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--primary)' }}>
              {test.tag}
            </span>
          </div>

          <p
            className="mb-5"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.9375rem',
              lineHeight: 1.65,
              color: 'var(--secondary-foreground)',
              maxWidth: '620px',
            }}
          >
            {test.description}
          </p>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted-foreground)' }}
            >
              {test.questions} questions · {test.duration}
            </div>

            <button
              className="flex items-center gap-2"
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                fontSize: '0.85rem',
                color: 'var(--primary)',
                borderBottom: hovered ? '1px solid var(--primary)' : '1px solid transparent',
                paddingBottom: '2px',
              }}
              onClick={(e) => { e.stopPropagation(); onStart() }}
            >
              Begin
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ transform: hovered ? 'translateX(2px)' : 'none', transition: 'transform 0.15s' }}>
                <path d="M2 5.5h7M5.5 2l3.5 3.5L5.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            </button>
          </div>
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

  if (screen === 'test' && activeTestId === 'philosorter') {
    return <PhilosorterRunner onHome={() => setScreen('home')} />
  }

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
      <header className="border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--primary)',
                  marginBottom: '0.75rem',
                }}
              >
                A free, open index of political self-assessment tests
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 'clamp(2.6rem, 6.5vw, 4.25rem)',
                  lineHeight: 1.05,
                }}
              >
                Ideology <span style={{ fontStyle: 'italic', color: 'var(--primary)' }}>&amp; political</span> tests
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
                Answer questions honestly. See where you fall on the ideological map. Compare yourself to parties and a database of 47 political ideologies.
              </p>
              <div
                className="mt-3"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--muted-foreground)',
                }}
              >
                {TESTS.length} tests — all free — no account required
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 pt-8">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
          Choose a test to begin
        </span>
      </div>

      <main className="max-w-5xl mx-auto px-6 md:px-10 py-6">
        <div className="flex flex-col gap-0">
          {TESTS.map((test, i) => (
            <TestCard key={test.id} test={test} index={i} onStart={() => startTest(test.id)} />
          ))}
        </div>
      </main>

      <footer className="border-t border-[var(--border)] mt-8">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
            No data is stored — every test runs entirely in your browser.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
            Political Compass Hub — {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}
