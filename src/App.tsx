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
  quest:    'QUEST',
  status:   'STATUS',
  strength: 'STRENGTH',
}

export default function App() {
  const [tab, setTab] = useState<Tab>('quest')
  const { state, doneCount, toggleQuest, updateProfile, setRank, setLevel, updateStrength } =
    useAppState()

  const rankColor = getRankColor(state.profile.rank)

  return (
    <div className="flex flex-col h-full safe-top" style={{ background: 'var(--bg)' }}>

      {/* ── Header ── */}
      <header className="flex-shrink-0 px-4 pt-4 pb-2 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-start justify-between">
          <div>
            {/* System label */}
            <div className="font-oswald text-[9px] tracking-[0.3em] mb-1" style={{ color: 'rgba(0,240,255,0.4)' }}>
              SYSTEM NOTIFICATION
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-[0.3em] text-white neon-text">格</h1>
              <span className="font-oswald text-sm tracking-[0.4em] mt-0.5" style={{ color: 'var(--neon)' }}>KAKU</span>
            </div>
            <p className="text-[10px] tracking-widest mt-0.5" style={{ color: 'rgba(0,240,255,0.4)' }}>
              {formatDate(state.today.date)}
            </p>
          </div>

          {/* Rank badge */}
          <div className="flex flex-col items-end gap-0.5">
            <span
              className={`font-oswald text-xl font-bold ${rankColor}`}
              style={{ textShadow: '0 0 14px currentColor' }}
            >
              {state.profile.rank}
            </span>
            <span className="font-oswald text-[10px] tracking-widest" style={{ color: 'rgba(0,240,255,0.4)' }}>
              Lv.{state.profile.level}
              {state.profile.name ? ` · ${state.profile.name}` : ''}
            </span>
          </div>
        </div>
      </header>

      {/* ── AURA bar ── */}
      <div className="flex-shrink-0">
        <AuraBar doneCount={doneCount} />
      </div>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-y-auto pt-3">
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
      <nav className="flex-shrink-0 safe-bottom border-t" style={{ borderColor: 'var(--border)', background: 'rgba(5,8,16,0.95)' }}>
        <div className="flex">
          {(['quest', 'status', 'strength'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-all duration-150 relative"
              style={{
                color: tab === t ? 'var(--neon)' : 'rgba(0,240,255,0.3)',
                textShadow: tab === t ? '0 0 10px var(--neon-glow)' : 'none',
              }}
            >
              {TAB_ICONS[t]}
              <span className="font-oswald text-[9px] tracking-[0.2em]">{TAB_LABELS[t]}</span>
              {tab === t && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-px"
                  style={{ background: 'var(--neon)', boxShadow: '0 0 8px var(--neon)' }}
                />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
