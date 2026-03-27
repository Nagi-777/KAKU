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
  profile,
  streak,
  totalCompleted,
  doneCount,
  onSetRank,
  onSetLevel,
  onSetName,
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
    <div className="px-4 pb-8 space-y-5 animate-fade-in">

      {/* Profile Card */}
      <div className="rounded-2xl border border-[#1a1a2e] bg-[#0d0d18] p-5">
        {/* Name */}
        <div className="flex items-center justify-between mb-4">
          {editingName ? (
            <input
              autoFocus
              className="bg-transparent border-b border-violet-500 text-xl font-bold text-white outline-none w-full mr-3 pb-0.5"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onBlur={submitName}
              onKeyDown={e => e.key === 'Enter' && submitName()}
              maxLength={20}
            />
          ) : (
            <button
              onClick={() => { setNameInput(profile.name); setEditingName(true) }}
              className="text-xl font-bold text-white tracking-widest hover:text-violet-300 transition-colors"
            >
              {profile.name || 'TAP TO SET NAME'}
            </button>
          )}
        </div>

        {/* Rank + Level row */}
        <div className="flex items-stretch gap-4">
          {/* Rank badge */}
          <button
            onClick={() => setShowRankPicker(v => !v)}
            className="flex-1 flex flex-col items-center justify-center rounded-xl border border-[#1e1e35] bg-[#080810] py-4 gap-1 hover:border-[#2a2a50] transition-colors"
          >
            <span className="text-xs tracking-[0.25em] text-slate-500 uppercase">Rank</span>
            <span
              className={`text-4xl font-black tracking-tight ${rankColor}`}
              style={{ textShadow: '0 0 20px currentColor' }}
            >
              {profile.rank}
            </span>
            <span className="text-[10px] text-slate-600 mt-0.5">タップで変更</span>
          </button>

          {/* Level */}
          <div className="flex-1 flex flex-col items-center justify-center rounded-xl border border-[#1e1e35] bg-[#080810] py-4 gap-1">
            <span className="text-xs tracking-[0.25em] text-slate-500 uppercase">Level</span>
            <input
              className="text-4xl font-black text-center bg-transparent text-sky-400 outline-none w-full"
              value={levelInput}
              onChange={e => setLevelInput(e.target.value)}
              onBlur={submitLevel}
              onKeyDown={e => e.key === 'Enter' && (e.currentTarget as HTMLInputElement).blur()}
              type="number"
              min={1}
              style={{ textShadow: '0 0 20px #38bdf8' }}
            />
          </div>
        </div>

        {/* Rank description */}
        <p className="mt-3 text-xs text-slate-500 leading-relaxed px-1">
          {RANK_DEFINITIONS[profile.rank]}
        </p>
      </div>

      {/* Rank picker modal */}
      {showRankPicker && (
        <div className="rounded-2xl border border-[#1a1a2e] bg-[#0d0d18] p-4">
          <p className="text-xs tracking-widest text-slate-500 uppercase mb-3">ランクを選択</p>
          <div className="grid grid-cols-5 gap-2">
            {RANKS.map(r => (
              <button
                key={r}
                onClick={() => { onSetRank(r); setShowRankPicker(false) }}
                className={`
                  py-2 rounded-lg border text-sm font-bold transition-all
                  ${r === profile.rank
                    ? 'border-violet-500 bg-violet-500/20 text-violet-300'
                    : 'border-[#1e1e35] bg-[#080810] text-slate-400 hover:border-[#3a3a60]'
                  }
                `}
              >
                <span className={getRankColor(r)}>{r}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="TODAY" value={`${doneCount}/25`} sub="quests" />
        <StatCard
          label="STREAK"
          value={String(streak)}
          sub={streak === 1 ? 'day' : 'days'}
          accent
        />
        <StatCard label="TOTAL" value={String(totalCompleted)} sub="done" />
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: string
  sub: string
  accent?: boolean
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-[#1a1a2e] bg-[#0d0d18] py-4 gap-0.5">
      <span className="text-[10px] tracking-widest text-slate-500 uppercase">{label}</span>
      <span
        className={`text-2xl font-black ${accent ? 'text-amber-400' : 'text-slate-200'}`}
        style={accent ? { textShadow: '0 0 16px rgba(251,191,36,0.5)' } : undefined}
      >
        {value}
      </span>
      <span className="text-[10px] text-slate-600">{sub}</span>
    </div>
  )
}
