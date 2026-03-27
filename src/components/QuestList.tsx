import { QUESTS, QUEST_CATEGORIES } from '../data/quests'
import QuestItem from './QuestItem'

interface Props {
  done: Record<string, boolean>
  onToggle: (id: string) => void
}

export default function QuestList({ done, onToggle }: Props) {
  return (
    <div className="px-3 pb-4 space-y-4">
      {QUEST_CATEGORIES.map(category => {
        const quests = QUESTS.filter(q => q.category === category)
        const catDone = quests.filter(q => done[q.id]).length

        return (
          <div key={category} className="cyber-card rounded-none">
            <div className="corner-tr" />
            <div className="corner-bl" />

            {/* Category header */}
            <div
              className="flex items-center justify-between px-3 py-2"
              style={{ borderBottom: '1px solid rgba(0,240,255,0.15)' }}
            >
              <span
                className="font-oswald text-[10px] tracking-[0.25em]"
                style={{ color: 'var(--neon)', textShadow: '0 0 6px var(--neon-glow)' }}
              >
                [ {category} ]
              </span>
              <span className="font-oswald text-[10px] tracking-widest" style={{ color: 'rgba(0,240,255,0.4)' }}>
                {catDone}/{quests.length}
              </span>
            </div>

            {/* Quest items */}
            <div className="divide-y" style={{ borderColor: 'rgba(0,240,255,0.06)' }}>
              {quests.map(q => (
                <QuestItem
                  key={q.id}
                  id={q.id}
                  label={q.label}
                  done={!!done[q.id]}
                  onToggle={onToggle}
                />
              ))}
            </div>
          </div>
        )
      })}

      {/* Warning footer */}
      <div
        className="relative px-4 py-3 mt-2"
        style={{ borderTop: '1px solid rgba(255,51,51,0.3)' }}
      >
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-600" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-600" />
        <p className="warn-pulse font-oswald text-[10px] text-center tracking-widest uppercase">
          WARNING: Failure to complete will result in penalty.
        </p>
        <p className="text-[9px] text-center mt-1" style={{ color: 'rgba(255,51,51,0.5)' }}>
          ※警告：未完了の場合、ペナルティが発生します。
        </p>
      </div>
    </div>
  )
}
