import type { AppState } from '../types'

interface Props {
  strengthBest: AppState['profile']['strengthBest']
  onUpdate: (key: keyof AppState['profile']['strengthBest'], value: number) => void
}

interface Exercise {
  key: keyof AppState['profile']['strengthBest']
  label: string
  unit: string
  icon: string
  maxRef: number // reference max for score calc
}

const EXERCISES: Exercise[] = [
  { key: 'pushup',  label: '腕立て',      unit: 'reps', icon: '💪', maxRef: 200 },
  { key: 'situp',   label: '腹筋',        unit: 'reps', icon: '🔥', maxRef: 200 },
  { key: 'squat',   label: 'スクワット',  unit: 'reps', icon: '⚡', maxRef: 200 },
  { key: 'running', label: 'ランニング',  unit: 'km',   icon: '🏃', maxRef: 42  },
]

function calcStrength(best: AppState['profile']['strengthBest']): number {
  const scores = EXERCISES.map(e => {
    const v = best[e.key]
    return Math.min(100, Math.round((v / e.maxRef) * 100))
  })
  return scores.reduce((a, b) => a + b, 0) // 0–400
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

function strengthColor(score: number): string {
  const pct = score / 400
  if (pct >= 0.9) return '#f59e0b'
  if (pct >= 0.7) return '#fb923c'
  if (pct >= 0.5) return '#facc15'
  if (pct >= 0.35) return '#34d399'
  if (pct >= 0.2) return '#38bdf8'
  return '#64748b'
}

export default function StrengthPanel({ strengthBest, onUpdate }: Props) {
  const score = calcStrength(strengthBest)
  const rank = strengthRank(score)
  const color = strengthColor(score)
  const pct = Math.round((score / 400) * 100)

  return (
    <div className="px-4 pb-8 space-y-5 animate-fade-in">

      {/* Score Card */}
      <div className="rounded-2xl border border-[#1a1a2e] bg-[#0d0d18] p-5 text-center">
        <p className="text-xs tracking-[0.25em] text-slate-500 uppercase mb-2">STRENGTH</p>
        <div
          className="text-6xl font-black tabular-nums"
          style={{ color, textShadow: `0 0 30px ${color}80` }}
        >
          {score}
        </div>
        <p className="text-slate-500 text-sm mt-1">
          <span style={{ color }} className="font-bold">Rank {rank}</span>
          <span className="mx-2 text-slate-700">·</span>
          <span className="text-slate-600">/ 400</span>
        </p>

        {/* Score bar */}
        <div className="mt-4 h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(90deg, #3b5ef0, ${color})`,
              boxShadow: `0 0 12px 2px ${color}60`,
            }}
          />
        </div>
      </div>

      {/* Exercise inputs */}
      <div className="space-y-3">
        {EXERCISES.map(ex => {
          const val = strengthBest[ex.key]
          const exScore = Math.min(100, Math.round((val / ex.maxRef) * 100))

          return (
            <div
              key={ex.key}
              className="rounded-xl border border-[#1a1a2e] bg-[#0d0d18] p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{ex.icon}</span>
                  <span className="text-sm font-semibold text-slate-300">{ex.label}</span>
                </div>
                <span className="text-xs text-slate-500">{exScore}/100pt</span>
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
                  className="
                    flex-1 bg-[#080810] border border-[#1e1e35] rounded-lg
                    px-3 py-2 text-white text-sm font-bold text-center
                    outline-none focus:border-violet-500/60 transition-colors
                  "
                />
                <span className="text-xs text-slate-500 w-8">{ex.unit}</span>
              </div>

              {/* Per-exercise bar */}
              <div className="mt-3 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${exScore}%`,
                    background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                    boxShadow: exScore > 0 ? '0 0 8px 1px rgba(124,58,237,0.5)' : 'none',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-center text-xs text-slate-600 px-4 leading-relaxed">
        各種目の自己ベストを入力。<br />
        腕立て・腹筋・スクワットは200回、ランニングは42kmを基準に算出。
      </p>
    </div>
  )
}
