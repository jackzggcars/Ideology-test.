import { useState } from 'react'
import type { ReactNode } from 'react'
import CompassViz from './CompassViz'
import AxesViz from './AxesViz'
import IdeologySymbol from './IdeologySymbol'
import Emblem from './Emblem'
import {
  partyProximity,
  partyPositions,
  ideologyPositions,
  matchArchetypes,
  neoValuesArchetypes,
  twelveAxesConfig,
} from './data'
import { countries, politicians } from './politicianNationData'
import { FLAG_URLS } from './flags'
import type { AxisConfig } from './data'

interface Props {
  testId: string
  testName: string
  scores: Record<string, number>
  resultType: 'compass' | 'axes' | 'vote-compass' | 'branching' | 'dual-match'
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

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.02em', color: 'var(--primary)', marginBottom: '0.6rem' }}>
      {children}
    </div>
  )
}

function ResultHeading({ label }: { label: string }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 'clamp(1.4rem, 3.2vw, 2rem)',
        letterSpacing: '0.01em',
        color: 'var(--foreground)',
      }}
    >
      {label}
    </h2>
  )
}

function ScoreRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline py-2.5 border-b border-[var(--border)]">
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>
        {label}
      </span>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>
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
    <div className="flex items-center gap-5">
      {(['parties', 'ideologies'] as const).map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.8rem',
            color: mode === m ? 'var(--foreground)' : 'var(--muted-foreground)',
            borderBottom: mode === m ? '2px solid var(--primary)' : '2px solid transparent',
            paddingBottom: '3px',
            transition: 'all 0.15s',
          }}
        >
          {m === 'parties' ? 'US Parties' : 'Ideologies'}
        </button>
      ))}
    </div>
  )
}

function CompassResult({ scores }: { scores: Record<string, number> }) {
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
    <div className="flex flex-col gap-10">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Chart */}
        <div className="flex-shrink-0 w-full lg:w-auto flex flex-col items-center gap-5">
          <CompassViz userX={x} userY={y} points={overlayPoints} size={440} />
          <OverlayToggle mode={overlay} onChange={setOverlay} />
        </div>

        {/* Data */}
        <div className="flex-1 min-w-0">
          <SectionLabel>Your result</SectionLabel>
          <ResultHeading label={quadrant} />
          <div className="mt-6">
            <ScoreRow label="Economic axis" value={x > 0 ? `Right +${x.toFixed(1)}` : x < 0 ? `Left ${x.toFixed(1)}` : 'Center 0'} />
            <ScoreRow label="Authority axis" value={y > 0 ? `Authoritarian +${y.toFixed(1)}` : y < 0 ? `Libertarian ${y.toFixed(1)}` : 'Center 0'} />
            <ScoreRow label="Closest ideology" value={closest.name} />
          </div>

          <p className="mt-6 pl-4" style={{ borderLeft: '2px solid var(--border)', fontFamily: 'var(--font-serif)', fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--secondary-foreground)' }}>
            The horizontal axis measures economic beliefs — left favors collective ownership and redistribution, right favors free markets and private enterprise. The vertical axis measures social authority — authoritarian favors order and strong governance, libertarian favors personal freedom and minimal state intervention.
          </p>
        </div>
      </div>

      {/* Closest ideologies breakdown */}
      <div>
        <SectionLabel>Your top 3 ideological matches</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--border)' }}>
          {top3.map((ideo, i) => (
            <div key={ideo.name} className="p-5" style={{ backgroundColor: 'var(--background)' }}>
              <div className="flex items-center gap-3 mb-2">
                <IdeologySymbol symbol={ideo.symbol} color={ideo.color} size={28} />
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem' }}>
                  {ideo.name}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.01em', color: 'var(--muted-foreground)', marginBottom: '0.65rem' }}>
                {ideo.family} · {ideo.alignment}% match{i === 0 ? ' · closest' : ''}
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
      <div className="flex-shrink-0 w-full lg:w-auto flex flex-col items-center gap-5">
        <CompassViz
          userX={x}
          userY={y}
          points={overlayPoints}
          size={440}
          topLabel="Socially Conservative"
          bottomLabel="Socially Progressive"
        />
        <OverlayToggle mode={overlay} onChange={setOverlay} />
      </div>

      {/* Party alignment */}
      <div className="flex-1 min-w-0">
        <SectionLabel>Party alignment</SectionLabel>
        <ResultHeading label={ranked[0].name} />

        <div className="mt-7 flex flex-col gap-3.5">
          {ranked.map((p, i) => (
            <div key={p.name} className="flex items-center gap-4">
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--muted-foreground)',
                  width: '1.2rem',
                  textAlign: 'right',
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', color: p.color }}>
                    {p.name}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: p.color }}>
                    {p.alignment}%
                  </span>
                </div>
                <div className="h-[3px] w-full" style={{ backgroundColor: 'var(--border)' }}>
                  <div
                    className="h-[3px] transition-all duration-700"
                    style={{ width: `${p.alignment}%`, backgroundColor: p.color }}
                  />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted-foreground)', marginTop: '3px' }}>
                  {p.wing}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-7 pl-4" style={{ borderLeft: '2px solid var(--border)', fontFamily: 'var(--font-serif)', fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--secondary-foreground)' }}>
          Alignment percentages are calculated by proximity on the ideological map. Party positions are approximate, based on general platform stances — not an official endorsement by any party.
        </p>
      </div>
    </div>
  )
}

function TwelveAxesResult({ scores }: { scores: Record<string, number> }) {
  return (
    <div className="max-w-2xl">
      <SectionLabel>Your result — 12 Axes</SectionLabel>
      <div className="mb-8">
        <ResultHeading label="12 axes mapped" />
      </div>
      <AxesViz scores={scores} axes={twelveAxesConfig} />
    </div>
  )
}

function NeoValuesResult({ scores }: { scores: Record<string, number> }) {
  const { ranked, best, isExactMatch } = matchArchetypes(scores, neoValuesArchetypes)
  const closest6 = ranked.slice(0, 6)
  const [selected, setSelected] = useState<string | null>(best.name)
  const selectedArchetype = ranked.find((a) => a.name === selected)

  return (
    <div className="max-w-3xl">
      <SectionLabel>Your closest political identities</SectionLabel>
      <div className="mb-2">
        <ResultHeading label="NeoValues result" />
      </div>
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '2rem' }}>
        Based on your answers, here are the 6 political identities your beliefs land closest to.
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-7">
        {closest6.map((a) => {
          const isChosen = selected === a.name
          const isBest = a.name === best.name
          const ownBackground = a.symbol === 'gadsden-coil' || a.symbol === 'hammer-sickle'
          return (
            <button
              key={a.name}
              onClick={() => setSelected(a.name)}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="flex-shrink-0 flex items-center justify-center overflow-hidden"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: ownBackground ? '6px' : '9999px',
                  backgroundColor: ownBackground ? 'transparent' : a.color,
                  boxShadow: isChosen
                    ? `0 0 0 2px var(--background), 0 0 0 4px ${a.color}`
                    : isBest
                      ? `0 0 0 2px var(--background), 0 0 0 4px var(--border)`
                      : ownBackground
                        ? '0 0 0 1px var(--border)'
                        : 'none',
                }}
              >
                <IdeologySymbol symbol={a.symbol} color="#0A0B0C" size={ownBackground ? 44 : 26} />
              </div>
              <span
                className="text-center leading-tight"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.7rem', color: isChosen ? 'var(--foreground)' : 'var(--muted-foreground)' }}
              >
                {a.name}
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.1rem',
            padding: '6px 16px',
            backgroundColor: isExactMatch ? 'var(--primary)' : 'var(--secondary)',
            color: isExactMatch ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
          }}
        >
          {isExactMatch ? `Match: ${best.name}` : 'No exact match'}
        </span>
        {!isExactMatch && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              padding: '5px 14px',
              border: `1px solid ${best.color}`,
              color: best.color,
            }}
          >
            Next closest match: {best.name}
          </span>
        )}
      </div>

      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--muted-foreground)', marginBottom: '1.25rem' }}>
        Click any icon or name above to read its description.
      </p>

      {selectedArchetype && (
        <div className="p-5 flex gap-4 items-start" style={{ borderLeft: `3px solid ${selectedArchetype.color}`, backgroundColor: 'var(--secondary)' }}>
          <div
            className="flex-shrink-0 mt-0.5 flex items-center justify-center overflow-hidden"
            style={{
              width: 48,
              height: 48,
              borderRadius: selectedArchetype.symbol === 'gadsden-coil' || selectedArchetype.symbol === 'hammer-sickle' ? '8px' : '9999px',
              backgroundColor: selectedArchetype.symbol === 'gadsden-coil' || selectedArchetype.symbol === 'hammer-sickle' ? 'transparent' : selectedArchetype.color,
              boxShadow: selectedArchetype.symbol === 'gadsden-coil' || selectedArchetype.symbol === 'hammer-sickle' ? '0 0 0 1px var(--border)' : 'none',
            }}
          >
            <IdeologySymbol
              symbol={selectedArchetype.symbol}
              color="#0A0B0C"
              size={selectedArchetype.symbol === 'gadsden-coil' || selectedArchetype.symbol === 'hammer-sickle' ? 48 : 28}
            />
          </div>
          <div>
            <div className="flex items-baseline gap-3 mb-2 flex-wrap">
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: selectedArchetype.color }}>
                {selectedArchetype.name}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>
                {selectedArchetype.similarity}% similarity to your answers
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--secondary-foreground)' }}>
              {selectedArchetype.description}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function FlagBadge({ code, size = 28 }: { code: string; size?: number }) {
  const url = FLAG_URLS[code]
  if (!url) return null
  return (
    <img
      src={url}
      alt=""
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: size,
        height: size * 0.75,
        objectFit: 'cover',
        border: '1px solid var(--border)',
        flexShrink: 0,
      }}
      title="Real national flag"
    />
  )
}

function CountryCard({ c, alignment, isTop }: { c: (typeof countries)[number] & { alignment?: number }; alignment?: number; isTop?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row gap-5" style={isTop ? {} : { opacity: 0.85 }}>
      <div className="w-full sm:w-40 flex-shrink-0 overflow-hidden" style={{ border: '1px solid var(--border)', height: isTop ? '110px' : '80px' }}>
        <Emblem colors={c.colors} pattern={c.pattern} title={c.name} className="w-full h-full" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-1">
          <span className="flex items-center gap-2.5" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: isTop ? '1.4rem' : '1.05rem' }}>
            {c.flag && <FlagBadge code={c.flag} size={isTop ? 30 : 24} />}
            {c.name}
          </span>
          {alignment !== undefined && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--primary)' }}>
              {alignment}% match
            </span>
          )}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>
          {c.govType} · {c.era}
        </div>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: isTop ? '0.9375rem' : '0.85rem', lineHeight: 1.6, color: 'var(--secondary-foreground)' }}>
          {c.description}
        </p>
      </div>
    </div>
  )
}

function PoliticianCard({ p, alignment, isTop }: { p: (typeof politicians)[number]; alignment?: number; isTop?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row gap-5" style={isTop ? {} : { opacity: 0.85 }}>
      <div
        className="flex-shrink-0 overflow-hidden rounded-full"
        style={{ border: '1px solid var(--border)', width: isTop ? '110px' : '72px', height: isTop ? '110px' : '72px' }}
      >
        <Emblem colors={p.colors} pattern={p.pattern} title={p.name} className="w-full h-full" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-1">
          <span className="flex items-center gap-2.5" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: isTop ? '1.4rem' : '1.05rem' }}>
            {p.flag && <FlagBadge code={p.flag} size={isTop ? 30 : 24} />}
            {p.name}
          </span>
          {alignment !== undefined && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--primary)' }}>
              {alignment}% match
            </span>
          )}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>
          {p.title} · {p.era}
        </div>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: isTop ? '0.9375rem' : '0.85rem', lineHeight: 1.6, color: 'var(--secondary-foreground)' }}>
          {p.description}
        </p>
      </div>
    </div>
  )
}

function PoliticianNationResult({ scores }: { scores: Record<string, number> }) {
  const x = scores.econ ?? 0
  const y = scores.auth ?? 0

  const rankedCountries = partyProximity(x, y, countries)
  const rankedPoliticians = partyProximity(x, y, politicians)
  const topCountry = rankedCountries[0]
  const topPolitician = rankedPoliticians[0]
  const runnerUpCountries = rankedCountries.slice(1, 3)
  const runnerUpPoliticians = rankedPoliticians.slice(1, 3)

  return (
    <div className="flex flex-col gap-12 max-w-3xl">
      <div>
        <SectionLabel>Most compatible country</SectionLabel>
        <CountryCard c={topCountry} alignment={topCountry.alignment} isTop />
        {runnerUpCountries.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col gap-6">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>
              Runners-up
            </span>
            {runnerUpCountries.map((c) => (
              <CountryCard key={c.name} c={c} alignment={c.alignment} />
            ))}
          </div>
        )}
      </div>

      <div>
        <SectionLabel>Most compatible politician</SectionLabel>
        <PoliticianCard p={topPolitician} alignment={topPolitician.alignment} isTop />
        {runnerUpPoliticians.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col gap-6">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>
              Runners-up
            </span>
            {runnerUpPoliticians.map((p) => (
              <PoliticianCard key={p.name} p={p} alignment={p.alignment} />
            ))}
          </div>
        )}
      </div>

      <p className="pl-4" style={{ borderLeft: '2px solid var(--border)', fontFamily: 'var(--font-serif)', fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--muted-foreground)' }}>
        Matches are based on proximity on the same economic/authority map used elsewhere on this site. Descriptions summarize widely known facts and are not endorsements — historical figures and states are complicated, and no single quiz can capture that.
      </p>
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
        fontSize: '0.7rem',
        color: 'var(--muted-foreground)',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
    >
      {copied ? 'Copied' : 'Copy result'}
    </button>
  )
}

export default function Results({ testId, testName, scores, resultType, onRetake, onHome }: Props) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <header className="border-b border-[var(--border)] px-6 md:px-10 py-4 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onHome}
          className="flex items-center gap-2 transition-colors duration-150"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted-foreground)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M8 5H2M5 2L2 5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
          All tests
        </button>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>
          {testName} — Results
        </div>
        <div className="flex items-center gap-4">
          <ShareButton testName={testName} scores={scores} />
          <button
            onClick={onRetake}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--primary)' }}
          >
            Retake →
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-10 py-10">
        {resultType === 'compass' && <CompassResult scores={scores} />}
        {resultType === 'vote-compass' && <VoteCompassResult scores={scores} />}
        {resultType === 'axes' && testId === '12axes' && <TwelveAxesResult scores={scores} />}
        {resultType === 'axes' && testId === 'neovalues' && <NeoValuesResult scores={scores} />}
        {resultType === 'dual-match' && <PoliticianNationResult scores={scores} />}
      </main>
    </div>
  )
}
