import type { AppState } from '../types'

interface Props {
  strengthBest: AppState['profile']['strengthBest']
  onUpdate: (key: keyof AppState['profile']['strengthBest'], value: number) => void
}

interface Exercise {
  key: keyof AppState['profile']['strengthBest']
  label: string
  unit: string
  maxRef: number
}

const EXERCISES: Exercise[] = [
  { key: 'pushup',  label: '腕立て',     unit: 'reps', maxRef: 200 },
  { key: 'situp',   label: '腹筋',       unit: 'reps', maxRef: 200 },
  { key: 'squat',   label: 'スクワット', unit: 'reps', maxRef: 200 },
  { key: 'running', label: 'ランニング', unit: 'km',   maxRef: 42  },
]

function calcStrength(best: AppState['profile']['strengthBest']): number {
  return EXERCISES.map(e => Math.min(100, Math.round((best[e.key] / e.maxRef) * 100)))
    .reduce((a, b) => a + b, 0)
}

function strengthRank(score: number): string {
  if (score >= 380) return 'S'
  if (score >= 320) return 'A+'
  if (score >= 280) return 'A'
  if (score >= 240) return 'A-'
  if (score >= 200) return 'B+'
  if (score >= 160) return 'B'
  if (score >= 130) return 'B-'
  if (score >= 100) return 'C+'
  if (score >= 75)  return 'C'
  if (score >= 55)  return 'C-'
  if (score >= 38)  return 'D+'
  if (score >= 24)  return 'D'
  if (score >= 12)  return 'D-'
  if (score >= 4)   return 'E'
  return 'F'
}

export default function StrengthPanel({ strengthBest, onUpdate }: Props) {
  const score = calcStrength(strengthBest)
  const rank  = strengthRank(score)
  const pct   = Math.round((score / 400) * 100)

  return (
    <div className="px-3 pb-8 space-y-4 pop-in">

      {/* Score Card */}
      <div className="cyber-card rounded-none p-5 text-center">
        <div className="corner-tr" /><div className="corner-bl" />
        <div className="font-oswald text-[9px] tracking-[0.3em] mb-2" style={{ color: 'rgba(0,240,255,0.4)' }}>
          STRENGTH_INDEX
        </div>

        <div
          className="font-oswald text-6xl font-bold tabular-nums"
          style={{ color: 'var(--neon)', textShadow: '0 0 30px var(--neon-glow)' }}
        >
          {score}
        </div>

        <p className="font-oswald text-sm mt-1" style={{ color: 'rgba(0,240,255,0.5)' }}>
          Rank <span style={{ color: 'var(--neon)' }}>{rank}</span>
          <span className="mx-2" style={{ color: 'rgba(0,240,255,0.2)' }}>·</span>
          <span style={{ color: 'rgba(0,240,255,0.3)' }}>/ 400</span>
        </p>

        {/* Score bar */}
        <div
          className="relative mt-4 h-1.5 overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,240,255,0.2)' }}
        >
          <div
            className="absolute inset-y-0 left-0 opacity-30 pointer-events-none"
            style={{
              width: '100%',
              backgroundImage: 'linear-gradient(90deg, transparent 95%, rgba(0,240,255,0.5) 95%)',
              backgroundSize: '10% 100%',
            }}
          />
          <div
            className="absolute inset-y-0 left-0 bar-shine transition-all duration-700"
            style={{
              width: `${pct}%`,
              background: 'var(--neon)',
              boxShadow: '0 0 10px var(--neon)',
            }}
          />
        </div>
      </div>

      {/* Exercise inputs */}
      {EXERCISES.map(ex => {
        const val = strengthBest[ex.key]
        const exScore = Math.min(100, Math.round((val / ex.maxRef) * 100))

        return (
          <div key={ex.key} className="cyber-card rounded-none p-4">
            <div className="corner-tr" /><div className="corner-bl" />

            <div className="flex items-center justify-between mb-3">
              <span
                className="font-oswald text-xs tracking-[0.2em]"
                style={{ color: 'var(--neon)', textShadow: '0 0 6px var(--neon-glow)' }}
              >
                [ {ex.label} ]
              </span>
              <span className="font-oswald text-[9px] tracking-widest" style={{ color: 'rgba(0,240,255,0.4)' }}>
                {exScore}/100pt
              </span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="number"
                min={0}
                value={val || ''}
                placeholder="0"
                onChange={e => {
                  const n = parseFloat(e.target.value)
                  onUpdate(ex.key, isNaN(n) ? 0 : Math.max(0, n))
                }}
                className="flex-1 font-oswald text-lg font-bold text-center outline-none transition-all"
                style={{
                  background: 'rgba(0,240,255,0.04)',
                  border: '1px solid rgba(0,240,255,0.3)',
                  color: 'var(--neon)',
                  padding: '6px 12px',
                  textShadow: '0 0 10px var(--neon-glow)',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'var(--neon)'; e.currentTarget.style.boxShadow = '0 0 8px var(--neon-glow)' }}
                onBlur={e =>  { e.currentTarget.style.borderColor = 'rgba(0,240,255,0.3)'; e.currentTarget.style.boxShadow = 'none' }}
              />
              <span className="font-oswald text-[10px] tracking-widest w-8" style={{ color: 'rgba(0,240,255,0.4)' }}>
                {ex.unit}
              </span>
            </div>

            {/* Bar */}
            <div
              className="relative mt-3 h-1"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,240,255,0.15)' }}
            >
              <div
                className="absolute inset-y-0 left-0 transition-all duration-500"
                style={{
                  width: `${exScore}%`,
                  background: 'var(--neon)',
                  boxShadow: exScore > 0 ? '0 0 6px var(--neon)' : 'none',
                }}
              />
            </div>
          </div>
        )
      })}

      <p className="font-oswald text-center text-[9px] tracking-widest leading-relaxed" style={{ color: 'rgba(0,240,255,0.25)' }}>
        SYS.INFO: 腕立て・腹筋・スクワット200rep / ランニング42kmを基準に算出
      </p>
    </div>
  )
}
