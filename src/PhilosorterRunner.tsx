import { useState } from 'react'
import type { ReactNode } from 'react'
import PhilosorterEmblem from './PhilosorterEmblem'
import { getSchool, philosophyNames } from './philosorterPhilosophies'
import { philosorterQuiz } from './philosorterQuiz'

interface Props {
  onHome: () => void
}

type Screen = 'home' | 'quiz' | 'result' | 'browse'

function BackLink({ onClick, label = 'Back' }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 transition-colors duration-150"
      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted-foreground)' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M8 5H2M5 2L2 5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      </svg>
      {label}
    </button>
  )
}

function GhostButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--muted-foreground)' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
    >
      {children}
    </button>
  )
}

function PrimaryButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        fontSize: '0.95rem',
        padding: '10px 22px',
        border: '1px solid var(--primary)',
        color: 'var(--primary-foreground)',
        backgroundColor: 'var(--primary)',
      }}
    >
      {children}
    </button>
  )
}

function SchoolCard({ name, onClick }: { name: string; onClick: () => void }) {
  const s = getSchool(name)
  return (
    <button onClick={onClick} className="text-left border border-[var(--border)] p-4">
      <div className="h-20 w-full overflow-hidden mb-3" style={{ border: '1px solid var(--border)' }}>
        <PhilosorterEmblem colors={s.colors} pattern={s.pattern} title={name} className="h-full w-full" />
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.2rem', color: 'var(--foreground)' }}>
        {name}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted-foreground)', marginTop: '2px' }}>
        {s.tradition}
      </div>
    </button>
  )
}

function HomeScreen({
  onStart,
  onSurprise,
  onBrowse,
}: {
  onStart: () => void
  onSurprise: () => void
  onBrowse: () => void
}) {
  const preview = ['Platonism', 'Stoicism', 'Kantianism', 'Absurdism', 'Rothbardianism', 'Taoism']

  return (
    <main className="max-w-5xl mx-auto px-6 md:px-10 py-10 md:py-14">
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>
        A flowchart, not a scored test
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: 'clamp(2.2rem, 5.5vw, 3.5rem)',
          lineHeight: 1.1,
          maxWidth: '780px',
        }}
      >
        Find the philosophy you were already arguing for.
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1rem',
          lineHeight: 1.65,
          color: 'var(--secondary-foreground)',
          maxWidth: '560px',
          marginTop: '1.25rem',
        }}
      >
        A handful of branching questions about reality, knowledge, the good life, and legitimate
        authority. One of {philosophyNames.length} schools waits at the end of your path.
      </p>

      <div className="flex flex-wrap gap-4 mt-8">
        <PrimaryButton onClick={onStart}>Begin</PrimaryButton>
        <GhostButton onClick={onSurprise}>Show me a random school</GhostButton>
      </div>

      <div className="mt-14 pt-10 border-t border-[var(--border)]">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '1rem' }}>
          Some of what is waiting at the end
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {preview.map((name) => (
            <SchoolCard key={name} name={name} onClick={onBrowse} />
          ))}
        </div>
        <div className="mt-6">
          <GhostButton onClick={onBrowse}>See all {philosophyNames.length} schools →</GhostButton>
        </div>
      </div>
    </main>
  )
}

function QuizScreen({
  question,
  options,
  step,
  onChoose,
  onBack,
}: {
  question: string
  options: { label: string; to: string }[]
  step: number
  onChoose: (to: string) => void
  onBack: () => void
}) {
  return (
    <main className="max-w-2xl mx-auto px-6 md:px-10 py-10">
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>
        Question {step}
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: 'clamp(1.6rem, 4vw, 2.3rem)',
          lineHeight: 1.2,
        }}
      >
        {question}
      </h1>

      <div className="mt-8 flex flex-col gap-2">
        {options.map((option) => (
          <button
            key={option.label}
            onClick={() => onChoose(option.to)}
            className="w-full text-left px-5 py-4 border border-[var(--border)] flex items-center gap-3 transition-colors duration-100"
            style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--foreground)' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <span style={{ color: 'var(--primary)' }}>→</span>
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <BackLink onClick={onBack} />
      </div>
    </main>
  )
}

function ResultScreen({
  name,
  onRestart,
  onBack,
  onBrowse,
}: {
  name: string
  onRestart: () => void
  onBack: () => void
  onBrowse: () => void
}) {
  const s = getSchool(name)

  return (
    <main className="max-w-2xl mx-auto px-6 md:px-10 py-10">
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
        You landed on
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(2rem, 5vw, 2.75rem)' }}>
        {name}
      </h1>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted-foreground)', marginTop: '0.35rem' }}>
        {s.tradition}
      </div>

      <div className="mt-6 overflow-hidden" style={{ border: '1px solid var(--border)', height: '190px' }}>
        <PhilosorterEmblem colors={s.colors} pattern={s.pattern} title={name} className="w-full h-full" />
      </div>

      <blockquote
        className="mt-7 pl-5"
        style={{ borderLeft: '2px solid var(--primary)', fontFamily: 'var(--font-display)', fontSize: '1.35rem', lineHeight: 1.4, fontStyle: 'italic' }}
      >
        &ldquo;{s.quote}&rdquo;
        <footer style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted-foreground)', marginTop: '0.5rem', fontStyle: 'normal' }}>
          — {s.thinker}
        </footer>
      </blockquote>

      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--secondary-foreground)', marginTop: '1.5rem' }}>
        {s.blurb}
      </p>

      <div className="flex flex-wrap gap-5 mt-9">
        <PrimaryButton onClick={onRestart}>Start again</PrimaryButton>
        <GhostButton onClick={onBack}>Change last answer</GhostButton>
        <GhostButton onClick={onBrowse}>Browse all schools</GhostButton>
      </div>
    </main>
  )
}

function BrowseScreen({ onSelect, onBack }: { onSelect: (name: string) => void; onBack: () => void }) {
  return (
    <main className="max-w-5xl mx-auto px-6 md:px-10 py-10">
      <div className="mb-6">
        <BackLink onClick={onBack} />
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)' }}>
        All {philosophyNames.length} schools
      </h1>
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9375rem', color: 'var(--muted-foreground)', marginTop: '0.5rem', marginBottom: '2rem' }}>
        Click any school to read its quote, thinker, and summary.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {philosophyNames.map((name) => (
          <SchoolCard key={name} name={name} onClick={() => onSelect(name)} />
        ))}
      </div>
    </main>
  )
}

export default function PhilosorterRunner({ onHome }: Props) {
  const [screen, setScreen] = useState<Screen>('home')
  const [path, setPath] = useState<string[]>(['root'])
  const [result, setResult] = useState<string | null>(null)

  const nodeId = path[path.length - 1] ?? 'root'
  const node = philosorterQuiz[nodeId]

  const start = () => {
    setPath(['root'])
    setResult(null)
    setScreen('quiz')
  }

  const choose = (to: string) => {
    if (to.startsWith('r:')) {
      setResult(to.slice(2))
      setScreen('result')
    } else {
      setPath((p) => [...p, to.slice(2)])
    }
  }

  const back = () => {
    if (screen === 'result') {
      setResult(null)
      setScreen('quiz')
      return
    }
    if (path.length === 1) {
      setScreen('home')
      return
    }
    setPath((p) => p.slice(0, -1))
  }

  const surprise = () => {
    const name = philosophyNames[Math.floor(Math.random() * philosophyNames.length)] ?? 'Platonism'
    setResult(name)
    setScreen('result')
  }

  const viewSchool = (name: string) => {
    setResult(name)
    setScreen('result')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <header className="border-b border-[var(--border)] px-6 md:px-10 py-4 flex items-center justify-between">
        <BackLink onClick={onHome} label="All tests" />
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem' }}>
          Philo<span style={{ color: 'var(--primary)' }}>Sorter</span>
        </div>
        <GhostButton onClick={() => setScreen('browse')}>Schools</GhostButton>
      </header>

      {screen === 'home' && <HomeScreen onStart={start} onSurprise={surprise} onBrowse={() => setScreen('browse')} />}
      {screen === 'quiz' && node && (
        <QuizScreen question={node.question} options={node.options} step={path.length} onChoose={choose} onBack={back} />
      )}
      {screen === 'result' && result && (
        <ResultScreen name={result} onRestart={start} onBack={back} onBrowse={() => setScreen('browse')} />
      )}
      {screen === 'browse' && <BrowseScreen onSelect={viewSchool} onBack={() => setScreen('home')} />}
    </div>
  )
}
