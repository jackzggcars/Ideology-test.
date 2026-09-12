import { useEffect, useState } from 'react'
import type { AxisConfig } from './data'

interface Props {
  scores: Record<string, number>
  axes: AxisConfig[]
}

function AxisBar({ axis, score, delay }: { axis: AxisConfig; score: number; delay: number }) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  // score: -10 to +10
  // 0 = center
  const pct = Math.abs(score) / 10 // 0 to 1
  const isRight = score > 0
  const isNeutral = Math.abs(score) < 0.5
  const color = isNeutral ? 'rgba(255,255,255,0.3)' : isRight ? axis.rightColor : axis.leftColor

  return (
    <div className="mb-6">
      {/* Labels row */}
      <div className="flex justify-between mb-2">
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            color: !isRight && !isNeutral ? axis.leftColor : 'var(--muted-foreground)',
            textTransform: 'uppercase',
            transition: 'color 0.3s',
          }}
        >
          {axis.leftLabel}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            color: isRight && !isNeutral ? axis.rightColor : 'var(--muted-foreground)',
            textTransform: 'uppercase',
            transition: 'color 0.3s',
          }}
        >
          {axis.rightLabel}
        </span>
      </div>

      {/* Bar track */}
      <div className="relative h-5 flex items-center">
        {/* Track */}
        <div className="w-full h-[3px]" style={{ backgroundColor: 'var(--border)' }} />

        {/* Filled portion */}
        <div
          className="absolute h-[3px] transition-all duration-700 ease-out"
          style={{
            backgroundColor: color,
            width: animated ? `${pct * 50}%` : '0%',
            left: isRight ? '50%' : 'auto',
            right: !isRight ? '50%' : 'auto',
          }}
        />

        {/* Center tick */}
        <div
          className="absolute w-[2px] h-4"
          style={{ left: 'calc(50% - 1px)', backgroundColor: 'var(--border)' }}
        />

        {/* Score indicator */}
        <div
          className="absolute w-3 h-3 border-2 transition-all duration-700 ease-out"
          style={{
            left: animated ? `calc(${(score + 10) / 20 * 100}% - 6px)` : 'calc(50% - 6px)',
            backgroundColor: color,
            borderColor: 'var(--background)',
          }}
        />
      </div>

      {/* Score label */}
      <div className="flex justify-center mt-2">
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            color,
            transition: 'color 0.3s',
          }}
        >
          {isNeutral
            ? 'CENTRIST'
            : `${isRight ? axis.rightLabel : axis.leftLabel} ${Math.round(pct * 100)}%`}
        </span>
      </div>
    </div>
  )
}

export default function AxesViz({ scores, axes }: Props) {
  return (
    <div className="w-full">
      {axes.map((axis, i) => (
        <AxisBar key={axis.key} axis={axis} score={scores[axis.key] ?? 0} delay={i * 80} />
      ))}
    </div>
  )
}
