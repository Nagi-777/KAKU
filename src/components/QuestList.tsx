import { QUESTS, QUEST_CATEGORIES } from '../data/quests'
import QuestItem from './QuestItem'

interface Props {
  done: Record<string, boolean>
  onToggle: (id: string) => void
}

const CATEGORY_ICONS: Record<string, string> = {
  '身体トレーニング': '⚔',
  '朝のルーティン': '☀',
  '日中': '◈',
  '夜のルーティン': '◐',
  '生活環境': '◇',
}

export default function QuestList({ done, onToggle }: Props) {
  return (
    <div className="px-3 pb-4 space-y-5">
      {QUEST_CATEGORIES.map(category => {
        const quests = QUESTS.filter(q => q.category === category)
        const catDone = quests.filter(q => done[q.id]).length

        return (
          <div key={category}>
            {/* Category header */}
            <div className="flex items-center gap-2 px-1 mb-2">
              <span className="text-slate-500 text-sm">{CATEGORY_ICONS[category]}</span>
              <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                {category}
              </span>
              <span className="ml-auto text-xs text-slate-600">
                {catDone}/{quests.length}
              </span>
            </div>

            {/* Quest items */}
            <div className="space-y-1.5">
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
    </div>
  )
}
