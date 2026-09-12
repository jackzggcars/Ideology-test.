import {
  Scale, Crown, Leaf, Flame, Wheat, Sun, Award, Trees, Globe, Shield,
  Landmark, Flower2, Hammer, type LucideIcon,
} from 'lucide-react'

export type IdeologySymbolKey =
  | 'circle-a' | 'hammer-sickle' | 'fasces' | 'gadsden-coil'
  | 'rose' | 'scales' | 'torch' | 'wheat-sheaf' | 'leaf' | 'globe'
  | 'sun' | 'laurel' | 'oak-leaf' | 'shield' | 'temple' | 'crown' | 'dove'

const ICONS: Partial<Record<IdeologySymbolKey, LucideIcon>> = {
  scales: Scale,
  crown: Crown,
  leaf: Leaf,
  torch: Flame,
  'wheat-sheaf': Wheat,
  sun: Sun,
  laurel: Award,
  'oak-leaf': Trees,
  globe: Globe,
  shield: Shield,
  temple: Landmark,
  rose: Flower2,
  'hammer-sickle': Hammer,
  dove: Award, // reused: a generic "shared honor" mark for communitarian/harmony-flavored ideologies
}

interface Props {
  symbol: IdeologySymbolKey
  color: string
  size?: number
}

/**
 * A small badge representing a political tradition's real, widely-used
 * generic symbol (the anarchist circled-A, the fasces, a coiled Gadsden
 * snake) or a close conceptual stand-in via a plain lucide icon. These are
 * long-standing public symbols, not anyone's copyrighted artwork.
 */
export default function IdeologySymbol({ symbol, color, size = 40 }: Props) {
  const r = size / 2

  if (symbol === 'circle-a') {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="none" stroke={color} strokeWidth="2.5" />
        <path
          d="M20 9 L28 30 M20 9 L12 30 M15 23 H25"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (symbol === 'fasces') {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40">
        {[10, 15, 20, 25, 30].map((x) => (
          <line key={x} x1={x} y1="6" x2={x} y2="32" stroke={color} strokeWidth="2" strokeLinecap="round" />
        ))}
        <path d="M7 14 L33 10 M7 26 L33 22" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  }

  if (symbol === 'gadsden-coil') {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40">
        <path
          d="M8 30 Q8 18 18 18 Q26 18 26 11 Q26 6 20 6"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M20 6 L27 6 L20 12 Z" fill={color} />
      </svg>
    )
  }

  const Icon = ICONS[symbol]
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {Icon && (
        <foreignObject x={r - size * 0.4} y={r - size * 0.4} width={size * 0.8} height={size * 0.8}>
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={size * 0.8} color={color} strokeWidth={2} />
          </div>
        </foreignObject>
      )}
    </svg>
  )
}
