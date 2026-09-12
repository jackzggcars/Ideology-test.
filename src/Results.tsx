import { useState } from 'react'
import CompassViz from './CompassViz'
import AxesViz from './AxesViz'
import {
  partyProximity,
  partyPositions,
  ideologyPositions,
  twelveAxesConfig,
  neoValuesConfig,
} from './data'
import type { AxisConfig } from './data'

interface Props {
  testId: string
  testName: string
  scores: Record<string, number>
  resultType: 'compass' | 'axes' | 'vote-compass'
  onRetake: () => void
  onHome: () => void
}

function quadrantLabel(x: number, y: number): string {
  const isLeft = x < -2
  const isRight = x > 2
  const isAuth = y > 2
  const isLib = y < -2
  const isCenter = Math.abs(x) <= 2 && Math.abs(y) <= 2

  if (isCenter) return 'Centrist'
  if (isLeft && isAuth) return 'Authoritarian Left'
  if (isRight && isAuth) return 'Authoritarian Right'
  if (isLeft && isLib) return 'Libertarian Left'
  if (isRight && isLib) return 'Libertarian Right'
  if (isLeft) return 'Center-Left'
  if (isRight) return 'Center-Right'
  if (isAuth) return 'Statist'
  if (isLib) return 'Civil Libertarian'
  return 'Centrist'
}

function IdeologyBadge({ label }: { label: string }) {
  return (
    <div
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: 'var(--primary)',
        borderBottom: '2px solid var(--primary)',
        paddingBottom: '2px',
      }}
    >
      {label}
    </div>
  )
}

function ScoreRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--muted-foreground)' }}>
        {label}
      </span>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.06em' }}>
        {value}
      </span>
    </div>
  )
}

function OverlayToggle({
  mode,
  onChange,
}: {
  mode: 'parties' | 'ideologies'
  onChange: (m: 'parties' | 'ideologies') => void
}) {
  return (
    <div className="flex border" style={{ borderColor: 'var(--border)', width: 'fit-content' }}>
      {(['parties', 'ideologies'] as const).map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.14em',
            padding: '6px 12px',
            color: mode === m ? 'var(--background)' : 'var(--muted-foreground)',
            backgroundColor: mode === m ? 'var(--primary)' : 'transparent',
            transition: 'all 0.15s',
          }}
        >
          {m === 'parties' ? 'US PARTIES' : 'IDEOLOGIES'}
        </button>
      ))}
    </div>
  )
}

function CompassResult({ scores }: { scores: Record<string, number>; testName: string }) {
  const x = scores.econ ?? 0
  const y = scores.auth ?? 0
  const quadrant = quadrantLabel(x, y)
  const [overlay, setOverlay] = useState<'parties' | 'ideologies'>('ideologies')

  const rankedIdeologies = partyProximity(x, y, ideologyPositions)
  const closest = rankedIdeologies[0]
  const top3 = rankedIdeologies.slice(0, 3)

  const overlayPoints =
    overlay === 'parties'
      ? partyPositions.map((p) => ({ ...p, sub: p.wing }))
      : ideologyPositions.map((p) => ({ ...p, sub: p.family }))

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Chart */}
        <div className="flex-shrink-0 w-full lg:w-auto flex flex-col items-center gap-4">
          <CompassViz userX={x} userY={y} parties={overlayPoints} size={440} />
          <OverlayToggle mode={overlay} onChange={setOverlay} />
        </div>

        {/* Data */}
        <div className="flex-1 min-w-0">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--primary)', marginBottom: '0.5rem' }}>
            YOUR RESULT
          </div>
          <IdeologyBadge label={quadrant} />
          <div className="mt-8">
            <ScoreRow label="ECONOMIC AXIS" value={x > 0 ? `Right +${x.toFixed(1)}` : x < 0 ? `Left ${x.toFixed(1)}` : 'Center 0'} />
            <ScoreRow label="AUTHORITY AXIS" value={y > 0 ? `Authoritarian +${y.toFixed(1)}` : y < 0 ? `Libertarian ${y.toFixed(1)}` : 'Center 0'} />
            <ScoreRow label="CLOSEST IDEOLOGY" value={closest.name} />
          </div>

          <div className="mt-6 p-4" style={{ border: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.14em', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>
              HOW TO READ YOUR RESULT
            </div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--secondary-foreground)', fontStyle: 'italic' }}>
              The horizontal axis measures economic beliefs: left favors collective ownership and redistribution; right favors free markets and private enterprise. The vertical axis measures social authority: authoritarian favors order and strong governance; libertarian favors personal freedom and minimal state intervention.
            </p>
          </div>
        </div>
      </div>

      {/* Closest ideologies breakdown */}
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--primary)', marginBottom: '0.75rem' }}>
          YOUR TOP 3 IDEOLOGICAL MATCHES
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {top3.map((ideo, i) => (
            <div key={ideo.name} className="p-4" style={{ border: `1px solid ${i === 0 ? ideo.color : 'var(--border)'}` }}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.04em', color: ideo.color }}>
                  {ideo.name}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted-foreground)' }}>
                  {ideo.alignment}%
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>
                {ideo.family.toUpperCase()}
              </div>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.8125rem', lineHeight: 1.55, color: 'var(--secondary-foreground)' }}>
                {ideo.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function VoteCompassResult({ scores }: { scores: Record<string, number> }) {
  const x = scores.econ ?? 0
  const y = scores.auth ?? 0
  const ranked = partyProximity(x, y, partyPositions)
  const [overlay, setOverlay] = useState<'parties' | 'ideologies'>('parties')

  const overlayPoints =
    overlay === 'parties'
      ? partyPositions.map((p) => ({ ...p, sub: p.wing }))
      : ideologyPositions.map((p) => ({ ...p, sub: p.family }))

  return (
    <div className="flex flex-col lg:flex-row gap-10 items-start">
      {/* Chart */}
      <div className="flex-shrink-0 w-full lg:w-auto flex flex-col items-center gap-4">
        <CompassViz userX={x} userY={y} parties={overlayPoints} size={440} />
        <OverlayToggle mode={overlay} onChange={setOverlay} />
      </div>

      {/* Party alignment */}
      <div className="flex-1 min-w-0">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--primary)', marginBottom: '0.5rem' }}>
          PARTY ALIGNMENT
        </div>
        <IdeologyBadge label={ranked[0].name} />

        <div className="mt-8 flex flex-col gap-3">
          {ranked.map((p, i) => (
            <div key={p.name} className="flex items-center gap-4">
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--muted-foreground)',
                  letterSpacing: '0.1em',
                  width: '1.5rem',
                  textAlign: 'right',
                  flexShrink: 0,
                }}
              >
                {i + 1}.
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.06em', color: p.color }}>
                    {p.name}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: p.color }}>
                    {p.alignment}%
                  </span>
                </div>
                <div className="h-1 w-full" style={{ backgroundColor: 'var(--border)' }}>
                  <div
                    className="h-1 transition-all duration-700"
                    style={{ width: `${p.alignment}%`, backgroundColor: p.color }}
                  />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--muted-foreground)', marginTop: '2px' }}>
                  {p.wing.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4" style={{ border: '1px solid var(--border)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.14em', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>
            NOTE
          </div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--secondary-foreground)', fontStyle: 'italic' }}>
            Alignment percentages are calculated by proximity on the ideological map. 100% indicates you are positioned exactly at a party's coordinates. Party positions are approximate, based on general platform stances — not an official endorsement by any party.
          </p>
        </div>
      </div>
    </div>
  )
}

function AxesResult({ scores, axes, title }: { scores: Record<string, number>; axes: AxisConfig[]; title: string }) {
  return (
    <div className="max-w-2xl">
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--primary)', marginBottom: '0.5rem' }}>
        YOUR RESULT — {title.toUpperCase()}
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(1.4rem, 3vw, 2rem)',
          letterSpacing: '0.02em',
          marginBottom: '2.5rem',
          borderBottom: '2px solid var(--primary)',
          paddingBottom: '0.25rem',
          display: 'inline-block',
          color: 'var(--foreground)',
        }}
      >
        {axes.length} AXES MAPPED
      </h2>
      <AxesViz scores={scores} axes={axes} />
    </div>
  )
}

function ShareButton({ testName, scores }: { testName: string; scores: Record<string, number> }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const lines = Object.entries(scores)
      .map(([k, v]) => `${k}: ${v > 0 ? '+' : ''}${v.toFixed(1)}`)
      .join(' · ')
    const text = `My "${testName}" result — ${lines}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard API unavailable — fail silently, nothing is stored or sent anywhere.
    }
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.14em',
        color: 'var(--primary)',
        border: '1px solid var(--primary)',
        padding: '4px 10px',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary)'; e.currentTarget.style.color = 'white' }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--primary)' }}
    >
      {copied ? 'COPIED ✓' : 'COPY RESULT'}
    </button>
  )
}

export default function Results({ testId, testName, scores, resultType, onRetake, onHome }: Props) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <div className="h-1 w-full" style={{ backgroundColor: 'var(--primary)' }} />

      <header className="border-b border-[var(--border)] px-6 md:px-10 py-4 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onHome}
          className="flex items-center gap-2 transition-colors duration-150"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.14em', color: 'var(--muted-foreground)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M8 5H2M5 2L2 5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
          ALL TESTS
        </button>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.1em' }}>
          {testName.toUpperCase()} — RESULTS
        </div>
        <div className="flex items-center gap-2">
          <ShareButton testName={testName} scores={scores} />
          <button
            onClick={onRetake}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              color: 'var(--primary)',
              border: '1px solid var(--primary)',
              padding: '4px 10px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary)'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--primary)' }}
          >
            RETAKE
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-10 py-10">
        {resultType === 'compass' && (
          <CompassResult scores={scores} testName={testName} />
        )}
        {resultType === 'vote-compass' && (
          <VoteCompassResult scores={scores} />
        )}
        {resultType === 'axes' && testId === '12axes' && (
          <AxesResult scores={scores} axes={twelveAxesConfig} title="12 Axes" />
        )}
        {resultType === 'axes' && testId === 'neovalues' && (
          <AxesResult scores={scores} axes={neoValuesConfig} title="NeoValues" />
        )}
      </main>
    </div>
  )
}
