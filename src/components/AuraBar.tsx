import { TOTAL_QUESTS } from '../data/quests'

interface Props {
  doneCount: number
}

export default function AuraBar({ doneCount }: Props) {
  const pct = Math.round((doneCount / TOTAL_QUESTS) * 100)

  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
          AURA
        </span>
        <span className="text-xs font-bold text-slate-300">
          <span className="text-white">{doneCount}</span>
          <span className="text-slate-500"> / {TOTAL_QUESTS}</span>
        </span>
      </div>
      <div className="relative h-2.5 rounded-full bg-slate-800 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #3b5ef0 0%, #7b4fef 60%, #a855f7 100%)',
            boxShadow: pct > 0 ? '0 0 12px 2px rgba(123,79,239,0.6)' : 'none',
          }}
        />
      </div>
      <div className="flex justify-end mt-1">
        <span
          className="text-xs font-bold"
          style={{
            color: pct === 100 ? '#a855f7' : '#5a6080',
          }}
        >
          {pct}%
          {pct === 100 && (
            <span className="ml-1 text-amber-400">✦ COMPLETE</span>
          )}
        </span>
      </div>
    </div>
  )
}
