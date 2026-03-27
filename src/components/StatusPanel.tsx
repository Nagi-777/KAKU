import { useState } from 'react'
import type { AppState, Rank } from '../types'
import { RANKS, RANK_DEFINITIONS, getRankColor } from '../data/ranks'

interface Props {
  profile: AppState['profile']
  streak: number
  totalCompleted: number
  doneCount: number
  onSetRank: (rank: Rank) => void
  onSetLevel: (level: number) => void
  onSetName: (name: string) => void
}

export default function StatusPanel({
  profile, streak, totalCompleted, doneCount,
  onSetRank, onSetLevel, onSetName,
}: Props) {
  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState(profile.name)
  const [showRankPicker, setShowRankPicker] = useState(false)
  const [levelInput, setLevelInput] = useState(String(profile.level))

  function submitName() {
    onSetName(nameInput.trim() || 'HUNTER')
    setEditingName(false)
  }
  function submitLevel() {
    const v = parseInt(levelInput)
    if (!isNaN(v) && v >= 1) onSetLevel(v)
    setLevelInput(String(isNaN(parseInt(levelInput)) ? profile.level : Math.max(1, parseInt(levelInput))))
  }

  const rankColor = getRankColor(profile.rank)

  return (
    <div className="px-3 pb-8 space-y-4 pop-in">

      {/* Profile Card */}
      <div className="cyber-card rounded-none p-5">
        <div className="corner-tr" /><div className="corner-bl" />

        {/* System label */}
        <div className="font-oswald text-[9px] tracking-[0.3em] mb-3" style={{ color: 'rgba(0,240,255,0.35)' }}>
          PLAYER_DATA.SYS
        </div>

        {/* Name */}
        <div className="mb-5" style={{ borderBottom: '1px solid rgba(0,240,255,0.15)', paddingBottom: '12px' }}>
          {editingName ? (
            <input
              autoFocus
              className="bg-transparent text-xl font-bold text-white outline-none w-full pb-0.5"
              style={{ borderBottom: '1px solid var(--neon)' }}
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onBlur={submitName}
              onKeyDown={e => e.key === 'Enter' && submitName()}
              maxLength={20}
            />
          ) : (
            <button
              onClick={() => { setNameInput(profile.name); setEditingName(true) }}
              className="text-xl font-bold text-white tracking-widest transition-all"
              style={{ textShadow: '0 0 10px rgba(0,240,255,0.3)' }}
            >
              {profile.name || 'TAP TO SET NAME'}
            </button>
          )}
        </div>

        {/* Rank + Level */}
        <div className="flex gap-3">
          {/* Rank */}
          <button
            onClick={() => setShowRankPicker(v => !v)}
            className="flex-1 flex flex-col items-center justify-center py-5 gap-1 transition-all"
            style={{ border: '1px solid rgba(0,240,255,0.3)', background: 'rgba(0,240,255,0.03)' }}
          >
            <span className="font-oswald text-[9px] tracking-[0.3em]" style={{ color: 'rgba(0,240,255,0.5)' }}>RANK</span>
            <span
              className={`font-oswald text-5xl font-bold ${rankColor}`}
              style={{ textShadow: '0 0 20px currentColor' }}
            >
              {profile.rank}
            </span>
            <span className="font-oswald text-[8px] tracking-widest" style={{ color: 'rgba(0,240,255,0.3)' }}>TAP TO CHANGE</span>
          </button>

          {/* Level */}
          <div
            className="flex-1 flex flex-col items-center justify-center py-5 gap-1"
            style={{ border: '1px solid rgba(0,240,255,0.3)', background: 'rgba(0,240,255,0.03)' }}
          >
            <span className="font-oswald text-[9px] tracking-[0.3em]" style={{ color: 'rgba(0,240,255,0.5)' }}>LEVEL</span>
            <input
              className="font-oswald text-5xl font-bold text-center bg-transparent outline-none w-full"
              style={{ color: 'var(--neon)', textShadow: '0 0 20px var(--neon-glow)' }}
              value={levelInput}
              onChange={e => setLevelInput(e.target.value)}
              onBlur={submitLevel}
              onKeyDown={e => e.key === 'Enter' && (e.currentTarget as HTMLInputElement).blur()}
              type="number"
              min={1}
            />
          </div>
        </div>

        {/* Rank description */}
        <p className="mt-3 text-xs leading-relaxed" style={{ color: 'rgba(0,240,255,0.4)' }}>
          {RANK_DEFINITIONS[profile.rank]}
        </p>
      </div>

      {/* Rank picker */}
      {showRankPicker && (
        <div className="cyber-card rounded-none p-4">
          <div className="corner-tr" /><div className="corner-bl" />
          <p className="font-oswald text-[9px] tracking-[0.3em] mb-3" style={{ color: 'rgba(0,240,255,0.5)' }}>
            SELECT_RANK
          </p>
          <div className="grid grid-cols-5 gap-2">
            {RANKS.map(r => (
              <button
                key={r}
                onClick={() => { onSetRank(r); setShowRankPicker(false) }}
                className="py-2 font-oswald text-sm font-bold transition-all"
                style={{
                  border: r === profile.rank
                    ? '1px solid var(--neon)'
                    : '1px solid rgba(0,240,255,0.2)',
                  background: r === profile.rank
                    ? 'rgba(0,240,255,0.1)'
                    : 'transparent',
                  boxShadow: r === profile.rank ? '0 0 8px var(--neon-glow)' : 'none',
                }}
              >
                <span className={getRankColor(r)}>{r}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <StatCard label="TODAY"  value={`${doneCount}/25`} sub="quests" />
        <StatCard label="STREAK" value={String(streak)} sub={streak === 1 ? 'day' : 'days'} accent />
        <StatCard label="TOTAL"  value={String(totalCompleted)} sub="done" />
      </div>
    </div>
  )
}

function StatCard({ label, value, sub, accent }: { label: string; value: string; sub: string; accent?: boolean }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-4 gap-0.5"
      style={{ border: '1px solid rgba(0,240,255,0.25)', background: 'rgba(0,240,255,0.02)' }}
    >
      <span className="font-oswald text-[9px] tracking-[0.2em]" style={{ color: 'rgba(0,240,255,0.45)' }}>{label}</span>
      <span
        className="font-oswald text-2xl font-bold"
        style={accent
          ? { color: '#FFD700', textShadow: '0 0 14px rgba(255,215,0,0.6)' }
          : { color: 'var(--neon)', textShadow: '0 0 10px var(--neon-glow)' }
        }
      >
        {value}
      </span>
      <span className="font-oswald text-[9px] tracking-widest" style={{ color: 'rgba(0,240,255,0.25)' }}>{sub}</span>
    </div>
  )
}
