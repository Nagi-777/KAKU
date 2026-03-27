import { useState } from 'react'
import type { Tab } from './types'
import { useAppState } from './hooks/useAppState'
import AuraBar from './components/AuraBar'
import QuestList from './components/QuestList'
import StatusPanel from './components/StatusPanel'
import StrengthPanel from './components/StrengthPanel'
import { getRankColor } from './data/ranks'

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('ja-JP', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  })
}

const TAB_ICONS: Record<Tab, JSX.Element> = {
  quest: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  status: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  strength: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
}

const TAB_LABELS: Record<Tab, string> = {
  quest: 'QUEST',
  status: 'STATUS',
  strength: 'STRENGTH',
}

export default function App() {
  const [tab, setTab] = useState<Tab>('quest')
  const { state, doneCount, toggleQuest, updateProfile, setRank, setLevel, updateStrength } =
    useAppState()

  const rankColor = getRankColor(state.profile.rank)

  return (
    <div className="flex flex-col h-full bg-[#050508] safe-top">
      {/* ── Header ── */}
      <header className="flex-shrink-0 px-4 pt-4 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-[0.3em] text-white">格</h1>
              <span className="text-xs font-bold tracking-[0.4em] text-slate-500 mt-0.5">KAKU</span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              {formatDate(state.today.date)}
            </p>
          </div>

          {/* Rank pill */}
          <div className="flex flex-col items-end gap-0.5">
            <span
              className={`text-lg font-black ${rankColor}`}
              style={{ textShadow: '0 0 16px currentColor' }}
            >
              {state.profile.rank}
            </span>
            <span className="text-xs text-slate-600">
              Lv.{state.profile.level}
              {state.profile.name ? ` · ${state.profile.name}` : ''}
            </span>
          </div>
        </div>
      </header>

      {/* ── AURA bar (always visible) ── */}
      <div className="flex-shrink-0">
        <AuraBar doneCount={doneCount} />
      </div>

      {/* ── Divider ── */}
      <div className="flex-shrink-0 h-px bg-[#111120] mx-4" />

      {/* ── Main content (scrollable) ── */}
      <main className="flex-1 overflow-y-auto pt-4">
        {tab === 'quest' && (
          <QuestList done={state.today.done} onToggle={toggleQuest} />
        )}
        {tab === 'status' && (
          <StatusPanel
            profile={state.profile}
            streak={state.streak}
            totalCompleted={state.totalCompleted}
            doneCount={doneCount}
            onSetRank={setRank}
            onSetLevel={setLevel}
            onSetName={name => updateProfile({ name })}
          />
        )}
        {tab === 'strength' && (
          <StrengthPanel
            strengthBest={state.profile.strengthBest}
            onUpdate={updateStrength}
          />
        )}
      </main>

      {/* ── Bottom tab bar ── */}
      <nav className="flex-shrink-0 safe-bottom">
        <div className="flex border-t border-[#111120]">
          {(['quest', 'status', 'strength'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`
                flex-1 flex flex-col items-center justify-center gap-1 py-3
                transition-colors duration-150
                ${tab === t ? 'text-violet-400' : 'text-slate-600 hover:text-slate-400'}
              `}
            >
              {TAB_ICONS[t]}
              <span className="text-[10px] font-bold tracking-widest">{TAB_LABELS[t]}</span>
              {tab === t && (
                <span className="absolute bottom-0 w-8 h-0.5 rounded-full bg-violet-500 opacity-80" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
