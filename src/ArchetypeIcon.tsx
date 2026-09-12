import {
  Coins, Users, Crown, Triangle, ShoppingBag, Sprout, LandPlot, Rocket,
  ShieldAlert, TreePine, Building2, Cpu, Umbrella, HandCoins, Trees, Dna,
  Mountain, TrendingUp, Scale, type LucideIcon,
} from 'lucide-react'
import type { ArchetypeIconKey } from './data'

const ICONS: Partial<Record<ArchetypeIconKey, LucideIcon>> = {
  coins: Coins,
  users: Users,
  crown: Crown,
  triangle: Triangle,
  'shopping-bag': ShoppingBag,
  sprout: Sprout,
  'land-plot': LandPlot,
  rocket: Rocket,
  'shield-alert': ShieldAlert,
  'tree-pine': TreePine,
  'building-2': Building2,
  cpu: Cpu,
  umbrella: Umbrella,
  'hand-coins': HandCoins,
  trees: Trees,
  dna: Dna,
  mountain: Mountain,
  'trending-up': TrendingUp,
  scale: Scale,
}

interface Props {
  icon: ArchetypeIconKey
  color: string
  size?: number
}

/**
 * Renders a small "logo mark" for a political archetype: a colored circle
 * with either a recognizable lucide glyph, or — for a couple of archetypes
 * whose identity is really about a distinctive shape rather than an object
 * (Egoism's split self/other, Armed Neutrality's protective cross) — a
 * custom hand-drawn mark so the badge reads as a proper emblem rather than
 * a generic icon-in-a-circle.
 */
export default function ArchetypeIcon({ icon, color, size = 44 }: Props) {
  const r = size / 2

  if (icon === 'circle-split') {
    return (
      <svg width={size} height={size} viewBox="0 0 44 44">
        <circle cx="22" cy="22" r="21" fill="#14B8A6" />
        <path d="M22 1 A21 21 0 0 1 22 43 Z" fill="#0F172A" />
        <circle cx="22" cy="22" r="21" fill="none" stroke="rgba(0,0,0,0.15)" />
      </svg>
    )
  }

  if (icon === 'cross-shield') {
    return (
      <svg width={size} height={size} viewBox="0 0 44 44">
        <circle cx="22" cy="22" r="21" fill="#DC2626" />
        <rect x="19" y="10" width="6" height="24" fill="white" />
        <rect x="10" y="19" width="24" height="6" fill="white" />
      </svg>
    )
  }

  const Icon = ICONS[icon]
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={r} cy={r} r={r - 1} fill={color} />
      {Icon && (
        <foreignObject x={r - size * 0.24} y={r - size * 0.24} width={size * 0.48} height={size * 0.48}>
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={size * 0.48} color="#0A0B0C" strokeWidth={2.25} />
          </div>
        </foreignObject>
      )}
    </svg>
  )
}
