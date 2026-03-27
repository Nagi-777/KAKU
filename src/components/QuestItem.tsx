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
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-xl
        transition-all duration-200 active:scale-[0.98]
        ${done
          ? 'bg-[#0e1628] border border-[#1e3060]/60'
          : 'bg-[#0d0d18] border border-[#1a1a2e] hover:border-[#2a2a4a]'
        }
      `}
    >
      {/* Checkbox */}
      <span
        className={`
          flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center
          transition-all duration-200
          ${done
            ? 'border-violet-500 bg-violet-600/20'
            : 'border-slate-600 bg-transparent'
          }
          ${animating ? 'animate-check-pop' : ''}
        `}
      >
        {done && (
          <svg
            className="w-3.5 h-3.5 text-violet-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>

      {/* Label */}
      <span
        className={`
          text-sm font-medium tracking-wide transition-colors duration-200
          ${done ? 'text-slate-500 line-through' : 'text-slate-200'}
        `}
      >
        {label}
      </span>

      {/* Done glow dot */}
      {done && (
        <span className="ml-auto flex-shrink-0 w-1.5 h-1.5 rounded-full bg-violet-500 opacity-60" />
      )}
    </button>
  )
}
