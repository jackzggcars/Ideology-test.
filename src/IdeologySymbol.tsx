import {
  Scale, Crown, Flame, Wheat, Sun, Trees, Globe, Shield,
  Landmark, Cpu, Dna, type LucideIcon,
} from 'lucide-react'

export type IdeologySymbolKey =
  | 'circle-a' | 'hammer-sickle' | 'fasces' | 'gadsden-coil'
  | 'rose' | 'scales' | 'torch' | 'wheat-sheaf' | 'leaf' | 'globe'
  | 'sun' | 'laurel' | 'oak-leaf' | 'shield' | 'temple' | 'crown' | 'dove'
  | 'cpu' | 'dna'

const ICONS: Partial<Record<IdeologySymbolKey, LucideIcon>> = {
  scales: Scale,
  crown: Crown,
  leaf: Trees, // real green-party imagery is closer to a tree/leaf mark than a generic leaf glyph
  torch: Flame,
  'wheat-sheaf': Wheat,
  sun: Sun,
  'oak-leaf': Trees,
  globe: Globe,
  shield: Shield,
  temple: Landmark,
  cpu: Cpu,
  dna: Dna,
}

interface Props {
  symbol: IdeologySymbolKey
  color: string
  size?: number
}

/**
 * Renders the specific, real symbol tied to a political tradition —
 * not a generic stand-in. A few of these (the Gadsden flag, the hammer
 * and sickle, the socialist fist-and-rose) have one universally
 * recognized, fixed color scheme in the real world, so those colors are
 * hardcoded here rather than tinted by the ideology's accent color.
 * Symbols without one canonical palette (the anarchist circle-A, the
 * fasces, a peace dove, a laurel wreath) use the passed-in color, which
 * matches how those marks are actually reproduced in single-color line
 * art across many different real flags and seals.
 */
export default function IdeologySymbol({ symbol, color, size = 40 }: Props) {
  const r = size / 2

  // ── The Gadsden flag: yellow field, coiled rattlesnake, "Don't Tread
  // on Me". Real, fixed colors — used by Anarcho-Capitalism, Rothbardianism,
  // Hoppeanism, Agorism, and the broader right-libertarian family. ──
  if (symbol === 'gadsden-coil') {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40">
        <rect x="2" y="9" width="36" height="22" fill="#F0C300" stroke="#1a1a1a" strokeWidth="0.75" />
        <path
          d="M9 27 C7 23 8 19 12 18 C16 17 14 13 10.5 12.5"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M10.5 12.5 C9 12 8 10.5 9 9.3"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        {/* head */}
        <path d="M9 9.3 L13 8 L10.3 11.3 Z" fill="#1a1a1a" />
        {/* tongue */}
        <path d="M13 8 L15 6.5 M13 8 L14.5 9" stroke="#1a1a1a" strokeWidth="0.6" />
        {/* rattle */}
        <path d="M9 27 L6 28.5 M6 28.5 L8 30 M6 28.5 L5 30.5" stroke="#1a1a1a" strokeWidth="1.1" strokeLinecap="round" />
        <text x="20" y="35.5" textAnchor="middle" fontSize="3.2" fontWeight="700" fill="#1a1a1a" fontFamily="Georgia, serif">
          DONT TREAD ON ME
        </text>
      </svg>
    )
  }

  // ── The hammer and sickle: gold tools crossed on red, the real
  // international symbol of communism. ──
  if (symbol === 'hammer-sickle') {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="#C81E1E" />
        {/* sickle blade */}
        <path d="M13 27 A9 9 0 1 1 23.5 14.5" fill="none" stroke="#F2C200" strokeWidth="2.6" strokeLinecap="round" />
        {/* sickle handle */}
        <line x1="13" y1="27" x2="9.5" y2="31" stroke="#F2C200" strokeWidth="2.1" strokeLinecap="round" />
        {/* hammer handle */}
        <line x1="17" y1="12" x2="29" y2="29" stroke="#F2C200" strokeWidth="2.3" strokeLinecap="round" />
        {/* hammer head */}
        <rect x="14.5" y="7.5" width="12.5" height="6" rx="1" fill="#F2C200" transform="rotate(35 20.75 10.5)" />
      </svg>
    )
  }

  // ── Fasces: bound rods with a projecting axe blade — the literal,
  // ancient Roman civic symbol fascism took its name from. Depicted
  // fully (axe included) since a sanitized version misrepresents it. ──
  if (symbol === 'fasces') {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40">
        {[11, 15, 19, 23, 27].map((x) => (
          <line key={x} x1={x} y1="5" x2={x} y2="33" stroke={color} strokeWidth="2.1" strokeLinecap="round" />
        ))}
        <path d="M6 13 L32 10 M6 26 L32 23" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
        {/* projecting axe blade */}
        <path d="M27 9 L35 4 L35 15 L27 12 Z" fill={color} />
      </svg>
    )
  }

  // ── The socialist rose: a closed fist gripping a rose — the emblem
  // used by social-democratic parties worldwide (SPD, French PS, PES). ──
  if (symbol === 'rose') {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40">
        <line x1="20" y1="30" x2="20" y2="16" stroke="#2F6B3C" strokeWidth="1.8" />
        <path d="M20 24 L16 27 M20 26 L24 29" stroke="#2F6B3C" strokeWidth="1.4" strokeLinecap="round" />
        {/* fist */}
        <ellipse cx="20" cy="30.5" rx="6.5" ry="5.5" fill="#C81E1E" />
        <path d="M15 28 Q14 33 18 35" stroke="#8f1616" strokeWidth="0.8" fill="none" />
        {/* rose bloom */}
        <circle cx="20" cy="11" r="5.6" fill="#C81E1E" />
        <circle cx="16.2" cy="9.5" r="3" fill="#D93838" />
        <circle cx="23.8" cy="9.5" r="3" fill="#D93838" />
        <circle cx="20" cy="7.5" r="3" fill="#E45050" />
      </svg>
    )
  }

  // ── A peace dove with an olive branch. ──
  if (symbol === 'dove') {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40">
        <path
          d="M6 24 Q13 15 23 16.5 Q30 17.5 33 11.5 Q31.5 18 26.5 20.5 Q29 24.5 24.5 27 Q17 30.5 10 27 Q7 25.5 6 24 Z"
          fill={color}
        />
        <path d="M15 19 Q19.5 14.5 26 16.5" fill="none" stroke="var(--background)" strokeWidth="1" opacity="0.35" />
        <path d="M6 24 L2 27.5 M4 22.5 L1 24.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="30.5" cy="14.5" r="1" fill="var(--background)" />
      </svg>
    )
  }

  // ── A laurel wreath — the ancient civic-honor symbol behind countless
  // republics' and legislatures' seals. ──
  if (symbol === 'laurel') {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40">
        <path d="M20 7 Q11 11 10 21 Q10 27 14.5 32" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M20 7 Q29 11 30 21 Q30 27 25.5 32" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path
          d="M11 13 l-3.2 -1.2 M10.2 18 l-3.4 0.2 M10.6 23.5 l-3.2 1.4 M12.6 28.5 l-2.6 2.2"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M29 13 l3.2 -1.2 M29.8 18 l3.4 0.2 M29.4 23.5 l3.2 1.4 M27.4 28.5 l2.6 2.2"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  // ── The anarchist circle-A, the single most recognized generic
  // anarchist symbol, reproduced in whatever color a given flag uses. ──
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
