import { useEffect, useState } from 'react'
import {
  Landmark, Store, Users, Briefcase, Globe, Flag, Atom, Church, Flame, Shield,
  Sparkles, ScrollText, HeartHandshake, Swords, Palette, UserCheck, MapPin,
  Building2, Leaf, Factory, RotateCw, Zap, Home, Scale, TrendingUp, Unlock,
  Cpu, ShieldAlert, type LucideIcon,
} from 'lucide-react'
import type { AxisConfig, IconKey } from './data'

interface Props {
  scores: Record<string, number>
  axes: AxisConfig[]
}

const ICONS: Record<IconKey, LucideIcon> = {
  landmark: Landmark,
  store: Store,
  users: Users,
  briefcase: Briefcase,
  globe: Globe,
  flag: Flag,
  atom: Atom,
  church: Church,
  flame: Flame,
  shield: Shield,
  sparkles: Sparkles,
  'scroll-text': ScrollText,
  'heart-handshake': HeartHandshake,
  swords: Swords,
  palette: Palette,
  'user-check': UserCheck,
  'map-pin': MapPin,
  'building-2': Building2,
  leaf: Leaf,
  factory: Factory,
  'rotate-cw': RotateCw,
  zap: Zap,
  home: Home,
  scale: Scale,
  'trending-up': TrendingUp,
  unlock: Unlock,
  cpu: Cpu,
  'shield-alert': ShieldAlert,
}

function AxisRow({ axis, score, delay }: { axis: AxisConfig; score: number; delay: number }) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  // score: -10 (fully leftLabel) to +10 (fully rightLabel)
  const rightPct = Math.round(((score + 10) / 20) * 1000) / 10 // 0–100, one decimal
  const leftPct = Math.round((100 - rightPct) * 10) / 10
  const isRight = score > 0.3
  const isLeft = score < -0.3
  const isNeutral = !isRight && !isLeft
  const dominantColor = isNeutral ? 'var(--muted-foreground)' : isRight ? axis.rightColor : axis.leftColor
  const resultLabel = isNeutral ? axis.centerLabel : isRight ? axis.rightLabel : axis.leftLabel
  const resultPct = isNeutral ? Math.max(leftPct, rightPct) : Math.max(leftPct, rightPct)

  const LeftIcon = ICONS[axis.leftIcon]
  const RightIcon = ICONS[axis.rightIcon]

  return (
    <div className="mb-7">
      {/* Title row: category name : result label (percent) */}
      <div className="flex items-baseline gap-2 mb-2.5 flex-wrap">
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.08em',
            color: 'var(--muted-foreground)',
          }}
        >
          {axis.categoryName}
        </span>
        <span style={{ color: 'var(--border)' }}>·</span>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.05rem',
            color: dominantColor,
          }}
        >
          {resultLabel}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--muted-foreground)',
          }}
        >
          {resultPct.toFixed(1)}%
        </span>
      </div>

      {/* Icon-badge + split bar */}
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: 28,
            height: 28,
            backgroundColor: !isRight ? axis.leftColor : 'var(--secondary)',
            opacity: !isRight ? 1 : 0.35,
            transition: 'opacity 0.4s',
          }}
        >
          <LeftIcon size={15} color={!isRight ? '#0A0B0C' : 'var(--muted-foreground)'} strokeWidth={2.25} />
        </div>

        <div className="flex-1 h-[6px] flex overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
          <div
            className="h-full transition-all duration-700 ease-out"
            style={{ width: animated ? `${leftPct}%` : '50%', backgroundColor: axis.leftColor, opacity: isRight ? 0.35 : 1 }}
          />
          <div
            className="h-full transition-all duration-700 ease-out"
            style={{ width: animated ? `${rightPct}%` : '50%', backgroundColor: axis.rightColor, opacity: !isRight ? 0.35 : 1 }}
          />
        </div>

        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: 28,
            height: 28,
            backgroundColor: isRight ? axis.rightColor : 'var(--secondary)',
            opacity: isRight ? 1 : 0.35,
            transition: 'opacity 0.4s',
          }}
        >
          <RightIcon size={15} color={isRight ? '#0A0B0C' : 'var(--muted-foreground)'} strokeWidth={2.25} />
        </div>
      </div>

      {/* Pole labels */}
      <div className="flex justify-between mt-1.5">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted-foreground)' }}>
          {axis.leftLabel} {leftPct.toFixed(0)}%
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted-foreground)' }}>
          {rightPct.toFixed(0)}% {axis.rightLabel}
        </span>
      </div>
    </div>
  )
}

export default function AxesViz({ scores, axes }: Props) {
  return (
    <div className="w-full">
      {axes.map((axis, i) => (
        <AxisRow key={axis.key} axis={axis} score={scores[axis.key] ?? 0} delay={i * 70} />
      ))}
    </div>
  )
}
