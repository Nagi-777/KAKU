import { useState } from 'react'

interface Props {
  id: string
  label: string
  done: boolean
  onToggle: (id: string) => void
}

export default function QuestItem({ id, label, done, onToggle }: Props) {
  const [animating, setAnimating] = useState(false)

  function handleTap() {
    if (!done) {
      setAnimating(true)
      setTimeout(() => setAnimating(false), 350)
    }
    onToggle(id)
  }

  return (
    <button
      onClick={handleTap}
      className="w-full text-left select-none transition-all duration-150 active:scale-[0.99]"
      style={{
        padding: '8px 10px',
        background: done
          ? 'linear-gradient(90deg, rgba(0,240,255,0.06), rgba(0,240,255,0.03) 50%, transparent)'
          : 'linear-gradient(90deg, transparent, rgba(0,240,255,0.03) 50%, transparent)',
        borderLeft: done
          ? '2px solid rgba(0,240,255,0.5)'
          : '2px solid transparent',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        if (!done) {
          e.currentTarget.style.borderLeft = '2px solid var(--neon)'
          e.currentTarget.style.background =
            'linear-gradient(90deg, rgba(0,240,255,0.1), rgba(0,240,255,0.06) 50%, transparent)'
        }
      }}
      onMouseLeave={e => {
        if (!done) {
          e.currentTarget.style.borderLeft = '2px solid transparent'
          e.currentTarget.style.background =
            'linear-gradient(90deg, transparent, rgba(0,240,255,0.03) 50%, transparent)'
        }
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Checkbox */}
          <span
            className={`flex-shrink-0 w-3.5 h-3.5 border flex items-center justify-center transition-all duration-200 ${animating ? 'animate-check-pop' : ''}`}
            style={{
              borderColor: done ? 'var(--neon)' : 'rgba(0,240,255,0.4)',
              background: done ? 'rgba(0,240,255,0.15)' : 'transparent',
              boxShadow: done ? '0 0 6px var(--neon)' : 'none',
            }}
          >
            {done && (
              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} style={{ color: 'var(--neon)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>

          {/* Label */}
          <span
            className="text-sm tracking-wide"
            style={{
              color: done ? 'rgba(0,240,255,0.35)' : '#d4eef2',
              textDecoration: done ? 'line-through' : 'none',
            }}
          >
            {label}
          </span>
        </div>

        {/* Status */}
        <span
          className="font-oswald text-[9px] tracking-widest flex-shrink-0"
          style={{ color: done ? 'rgba(0,240,255,0.4)' : 'rgba(0,240,255,0.2)' }}
        >
          {done ? 'COMPLETE' : 'INCOMPLETE'}
        </span>
      </div>
    </button>
  )
}
