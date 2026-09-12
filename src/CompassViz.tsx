import { useEffect, useState } from 'react'

export interface CompassPoint {
  name: string
  abbrev: string
  x: number
  y: number
  color: string
  sub?: string
}

interface Props {
  userX: number // -10 to +10
  userY: number // -10 to +10 (positive = authoritarian)
  parties?: CompassPoint[]
  showParties?: boolean
  size?: number
}

function toSvg(val: number, svgSize: number, padding: number) {
  const inner = svgSize - padding * 2
  return padding + ((val + 10) / 20) * inner
}

export default function CompassViz({ userX, userY, parties = [], showParties = true, size = 500 }: Props) {
  const P = 48 // padding
  const S = size
  const inner = S - P * 2
  const mid = S / 2

  const [hoveredParty, setHoveredParty] = useState<string | null>(null)
  const [animated, setAnimated] = useState(false)
  const [dotVisible, setDotVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setAnimated(true), 100)
    const t2 = setTimeout(() => setDotVisible(true), 600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const ux = toSvg(userX, S, P)
  const uy = toSvg(-userY, S, P) // invert Y so authoritarian is top

  const quadrants = [
    { x: P, y: P, label: 'AUTH. LEFT', sub: '' },
    { x: mid + 4, y: P, label: 'AUTH. RIGHT', sub: '' },
    { x: P, y: mid + 4, label: 'LIB. LEFT', sub: '' },
    { x: mid + 4, y: mid + 4, label: 'LIB. RIGHT', sub: '' },
  ]

  return (
    <div style={{ position: 'relative', width: S, height: S, maxWidth: '100%' }}>
      <svg
        width={S}
        height={S}
        viewBox={`0 0 ${S} ${S}`}
        style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      >
        {/* Quadrant backgrounds */}
        <rect x={P} y={P} width={inner / 2} height={inner / 2} fill="rgba(239,68,68,0.06)" />
        <rect x={mid} y={P} width={inner / 2} height={inner / 2} fill="rgba(59,130,246,0.06)" />
        <rect x={P} y={mid} width={inner / 2} height={inner / 2} fill="rgba(239,68,68,0.04)" />
        <rect x={mid} y={mid} width={inner / 2} height={inner / 2} fill="rgba(59,130,246,0.04)" />

        {/* Grid lines */}
        {[-8, -6, -4, -2, 2, 4, 6, 8].map((v) => {
          const gx = toSvg(v, S, P)
          const gy = toSvg(v, S, P)
          return (
            <g key={v}>
              <line x1={gx} y1={P} x2={gx} y2={S - P} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <line x1={P} y1={gy} x2={S - P} y2={gy} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </g>
          )
        })}

        {/* Border */}
        <rect x={P} y={P} width={inner} height={inner} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

        {/* Axis lines */}
        <line x1={mid} y1={P} x2={mid} y2={S - P} stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4,4" />
        <line x1={P} y1={mid} x2={S - P} y2={mid} stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4,4" />

        {/* Center crosshair */}
        <circle cx={mid} cy={mid} r={3} fill="rgba(255,255,255,0.15)" />

        {/* Axis labels */}
        <text x={mid} y={P - 10} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="'JetBrains Mono', monospace" letterSpacing="2">AUTHORITARIAN</text>
        <text x={mid} y={S - P + 18} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="'JetBrains Mono', monospace" letterSpacing="2">LIBERTARIAN</text>
        <text x={P - 10} y={mid} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="'JetBrains Mono', monospace" letterSpacing="2" transform={`rotate(-90, ${P - 10}, ${mid})`}>LEFT</text>
        <text x={S - P + 10} y={mid} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="'JetBrains Mono', monospace" letterSpacing="2" transform={`rotate(90, ${S - P + 10}, ${mid})`}>RIGHT</text>

        {/* Quadrant labels */}
        {quadrants.map((q, i) => (
          <text
            key={i}
            x={q.x + (i % 2 === 0 ? 8 : inner / 2 - 8)}
            y={q.y + (i < 2 ? 16 : inner / 2 - 8)}
            textAnchor={i % 2 === 0 ? 'start' : 'end'}
            fill="rgba(255,255,255,0.12)"
            fontSize="8"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="1.5"
          >
            {q.label}
          </text>
        ))}

        {/* Party dots */}
        {showParties && parties.map((p) => {
          const px = toSvg(p.x, S, P)
          const py = toSvg(-p.y, S, P)
          const isHovered = hoveredParty === p.name
          return (
            <g
              key={p.name}
              onMouseEnter={() => setHoveredParty(p.name)}
              onMouseLeave={() => setHoveredParty(null)}
              style={{ cursor: 'default' }}
            >
              <circle cx={px} cy={py} r={isHovered ? 10 : 7} fill={p.color} opacity={isHovered ? 0.95 : 0.7} />
              <circle cx={px} cy={py} r={isHovered ? 10 : 7} fill="none" stroke={p.color} strokeWidth="1" opacity={0.4} />
              <text
                x={px}
                y={py - 12}
                textAnchor="middle"
                fill={p.color}
                fontSize={isHovered ? '9' : '8'}
                fontFamily="'JetBrains Mono', monospace"
                letterSpacing="1"
                opacity={isHovered ? 1 : 0.8}
              >
                {p.abbrev}
              </text>
            </g>
          )
        })}

        {/* User dot */}
        {dotVisible && (
          <g>
            {/* Pulse rings */}
            <circle cx={ux} cy={uy} r="20" fill="none" stroke="var(--primary)" strokeWidth="1" opacity="0.3" />
            <circle cx={ux} cy={uy} r="13" fill="none" stroke="var(--primary)" strokeWidth="1" opacity="0.5" />
            {/* Main dot */}
            <circle cx={ux} cy={uy} r="7" fill="var(--primary)" />
            <circle cx={ux} cy={uy} r="7" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
            <text
              x={ux}
              y={uy - 14}
              textAnchor="middle"
              fill="var(--primary)"
              fontSize="9"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="1.5"
              fontWeight="600"
            >
              YOU
            </text>
          </g>
        )}
      </svg>

      {/* Hovered party tooltip */}
      {hoveredParty && (() => {
        const p = parties.find((pt) => pt.name === hoveredParty)
        if (!p) return null
        return (
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              right: 8,
              padding: '8px 12px',
              border: `1px solid ${p.color}`,
              backgroundColor: 'var(--background)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              color: p.color,
              pointerEvents: 'none',
            }}
          >
            {p.name.toUpperCase()}{p.sub ? ` — ${p.sub.toUpperCase()}` : ''}
          </div>
        )
      })()}
    </div>
  )
}
