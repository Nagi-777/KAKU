import { TOTAL_QUESTS } from '../data/quests'

interface Props {
  doneCount: number
}

export default function AuraBar({ doneCount }: Props) {
  const pct = Math.round((doneCount / TOTAL_QUESTS) * 100)

  return (
    <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(0,240,255,0.15)' }}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-oswald text-[10px] tracking-[0.3em]" style={{ color: 'var(--neon)' }}>
          AURA
        </span>
        <span className="font-oswald text-xs" style={{ color: 'rgba(0,240,255,0.6)' }}>
          <span className="text-white">{doneCount}</span>
          <span style={{ color: 'rgba(0,240,255,0.3)' }}> / {TOTAL_QUESTS}</span>
        </span>
      </div>

      {/* Bar track */}
      <div
        className="relative h-1.5 overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(0,240,255,0.2)',
        }}
      >
        {/* Grid ticks */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'linear-gradient(90deg, transparent 95%, rgba(0,240,255,0.5) 95%)',
            backgroundSize: '10% 100%',
          }}
        />
        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 bar-shine transition-all duration-500 ease-out"
          style={{
            width: `${pct}%`,
            background: 'var(--neon)',
            boxShadow: pct > 0 ? '0 0 10px var(--neon)' : 'none',
          }}
        />
      </div>

      <div className="flex justify-end mt-1">
        <span className="font-oswald text-[10px] tracking-widest" style={{ color: 'rgba(0,240,255,0.4)' }}>
          {pct}%
          {pct === 100 && (
            <span className="ml-2 glitch-text" style={{ color: '#FFD700', textShadow: '0 0 10px #FFD700' }}>
              ✦ COMPLETE
            </span>
          )}
        </span>
      </div>
    </div>
  )
}
