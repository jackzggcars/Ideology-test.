import { useEffect, useState } from 'react'
import IdeologySymbol from './IdeologySymbol'
import type { IdeologySymbolKey } from './IdeologySymbol'

export interface CompassPoint {
  name: string
  abbrev: string
  x: number
  y: number
  color: string
  sub?: string
  symbol?: IdeologySymbolKey
}

interface Props {
  userX: number // -10 to +10
  userY: number // -10 to +10 (positive = authoritarian/conservative pole)
  points?: CompassPoint[]
  size?: number
  userLabel?: string
  topLabel?: string
  bottomLabel?: string
  leftLabel?: string
  rightLabel?: string
}

function toSvg(val: number, svgSize: number, padding: number) {
  const inner = svgSize - padding * 2
  return padding + ((val + 10) / 20) * inner
}

export default function CompassViz({
  userX,
  userY,
  points = [],
  size = 480,
  userLabel = 'You',
  topLabel = 'Authoritarian',
  bottomLabel = 'Libertarian',
  leftLabel = 'Left',
  rightLabel = 'Right',
}: Props) {
  const P = 34
  const S = size
  const inner = S - P * 2
  const mid = S / 2

  const [visible, setVisible] = useState(false)
  const [activePoint, setActivePoint] = useState<string | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const ux = toSvg(userX, S, P)
  const uy = toSvg(-userY, S, P)

  return (
    <div style={{ position: 'relative', width: S, height: S + 40, maxWidth: '100%' }}>
      <svg
        width={S}
        height={S + 40}
        viewBox={`0 0 ${S} ${S + 40}`}
        style={{ display: 'block', maxWidth: '100%', height: 'auto', overflow: 'visible' }}
      >
        {/* Top / bottom axis captions */}
        <text x={mid} y={16} textAnchor="middle" fill="var(--muted-foreground)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.3">
          {topLabel}
        </text>
        <text x={mid} y={S + 32} textAnchor="middle" fill="var(--muted-foreground)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.3">
          {bottomLabel}
        </text>

        <g transform="translate(0, 22)">
          {/* Faint minor gridlines */}
          {[-8, -6, -4, -2, 0, 2, 4, 6, 8].map((v) => {
            const gx = toSvg(v, S, P)
            const gy = toSvg(v, S, P)
            return (
              <g key={v}>
                <line x1={gx} y1={P} x2={gx} y2={S - P} stroke="var(--border)" strokeWidth="1" opacity={v === 0 ? 0 : 0.5} />
                <line x1={P} y1={gy} x2={S - P} y2={gy} stroke="var(--border)" strokeWidth="1" opacity={v === 0 ? 0 : 0.5} />
              </g>
            )
          })}

          {/* Outer border */}
          <rect x={P} y={P} width={inner} height={inner} fill="none" stroke="var(--border)" strokeWidth="1" />

          {/* Center axis lines */}
          <line x1={mid} y1={P} x2={mid} y2={S - P} stroke="var(--muted-foreground)" strokeWidth="1" opacity={0.35} />
          <line x1={P} y1={mid} x2={S - P} y2={mid} stroke="var(--muted-foreground)" strokeWidth="1" opacity={0.35} />

          {/* Left / right captions, vertical */}
          <text x={P - 20} y={mid} textAnchor="middle" fill="var(--muted-foreground)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.3" transform={`rotate(-90, ${P - 20}, ${mid})`}>
            {leftLabel}
          </text>
          <text x={S - P + 20} y={mid} textAnchor="middle" fill="var(--muted-foreground)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.3" transform={`rotate(90, ${S - P + 20}, ${mid})`}>
            {rightLabel}
          </text>

          {/* Reference points */}
          {visible && points.map((p) => {
            const px = toSvg(p.x, S, P)
            const py = toSvg(-p.y, S, P)
            const isActive = activePoint === p.name
            const labelOnRight = px < mid + inner * 0.28
            const symbolSize = isActive ? 22 : 18
            return (
              <g
                key={p.name}
                onMouseEnter={() => setActivePoint(p.name)}
                onMouseLeave={() => setActivePoint(null)}
                style={{ cursor: 'default' }}
              >
                {p.symbol ? (
                  <foreignObject x={px - symbolSize / 2} y={py - symbolSize / 2} width={symbolSize} height={symbolSize} style={{ overflow: 'visible' }}>
                    <div style={{ width: symbolSize, height: symbolSize, filter: 'drop-shadow(0 0 2px var(--background)) drop-shadow(0 0 2px var(--background))' }}>
                      <IdeologySymbol symbol={p.symbol} color={p.color} size={symbolSize} />
                    </div>
                  </foreignObject>
                ) : (
                  <circle cx={px} cy={py} r={isActive ? 6 : 4.5} fill={p.color} />
                )}
                <text
                  x={px + (labelOnRight ? (p.symbol ? symbolSize / 2 + 4 : 8) : -(p.symbol ? symbolSize / 2 + 4 : 8))}
                  y={py + 3.5}
                  textAnchor={labelOnRight ? 'start' : 'end'}
                  fill={p.color}
                  fontSize={isActive ? '12.5' : '11'}
                  fontFamily="var(--font-display)"
                  fontWeight={isActive ? 800 : 700}
                  style={{ transition: 'font-size 0.15s' }}
                >
                  {p.abbrev}
                </text>
              </g>
            )
          })}

          {/* User dot */}
          {visible && (
            <g>
              <circle cx={ux} cy={uy} r="6.5" fill="var(--primary)" stroke="var(--background)" strokeWidth="2" />
              <text
                x={ux + (ux < mid + inner * 0.28 ? 10 : -10)}
                y={uy - 9}
                textAnchor={ux < mid + inner * 0.28 ? 'start' : 'end'}
                fill="var(--primary)"
                fontSize="13"
                fontFamily="var(--font-display)"
                fontWeight={800}
              >
                {userLabel}
              </text>
            </g>
          )}
        </g>
      </svg>

      {/* Hover detail, shown below the chart rather than as a floating tooltip */}
      <div
        style={{
          position: 'absolute',
          bottom: -6,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--muted-foreground)',
          height: '1.2em',
        }}
      >
        {activePoint && (() => {
          const p = points.find((pt) => pt.name === activePoint)
          if (!p) return null
          return <span style={{ color: p.color }}>{p.name}{p.sub ? ` — ${p.sub}` : ''}</span>
        })()}
      </div>
    </div>
  )
}
