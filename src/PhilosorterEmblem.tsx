import type { Pattern } from './philosorterPhilosophies'

interface EmblemProps {
  colors: [string, string, string]
  pattern: Pattern
  className?: string
  title?: string
}

/** Deterministic geometric emblem drawn from a school's palette and pattern. */
export default function PhilosorterEmblem({ colors, pattern, className, title }: EmblemProps) {
  const [a, b, c] = colors

  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      role="img"
      aria-label={title ? `Emblem of ${title}` : 'Emblem'}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="120" height="80" fill={a} />
      {pattern === 'bend' && (
        <>
          <path d="M0 80 L120 0 L120 80 Z" fill={b} />
          <path d="M0 80 L120 0" stroke={c} strokeWidth="4" fill="none" />
        </>
      )}
      {pattern === 'quarter' && (
        <>
          <rect x="60" width="60" height="40" fill={b} />
          <rect y="40" width="60" height="40" fill={b} />
          <rect x="52" y="32" width="16" height="16" fill={c} />
        </>
      )}
      {pattern === 'orb' && (
        <>
          <circle cx="60" cy="40" r="26" fill={b} />
          <circle cx="60" cy="40" r="13" fill={c} />
        </>
      )}
      {pattern === 'triangle' && (
        <>
          <path d="M60 12 L90 62 L30 62 Z" fill={b} />
          <path d="M60 30 L76 58 L44 58 Z" fill={c} />
        </>
      )}
      {pattern === 'bars' && (
        <>
          <rect y="14" width="120" height="12" fill={b} />
          <rect y="34" width="120" height="12" fill={c} />
          <rect y="54" width="120" height="12" fill={b} />
        </>
      )}
      {pattern === 'eye' && (
        <>
          <path d="M18 40 Q60 8 102 40 Q60 72 18 40 Z" fill={b} />
          <circle cx="60" cy="40" r="12" fill={c} />
          <circle cx="60" cy="40" r="5" fill={a} />
        </>
      )}
      {pattern === 'cross' && (
        <>
          <rect x="46" width="28" height="80" fill={b} />
          <rect y="26" width="120" height="28" fill={b} />
          <rect x="53" y="33" width="14" height="14" fill={c} />
        </>
      )}
      {pattern === 'spiral' && (
        <>
          <path
            d="M60 40 m0 -28 a28 28 0 1 1 -19.8 8.2 a20 20 0 1 0 14.1 -5.9 a12 12 0 1 1 -8.5 3.5"
            fill="none"
            stroke={b}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <circle cx="60" cy="40" r="4" fill={c} />
        </>
      )}
    </svg>
  )
}
