import { useState, useEffect, useCallback } from 'react'
import type { AppState, Rank } from '../types'
import { QUESTS } from '../data/quests'

const STORAGE_KEY = 'kaku_state_v1'

function todayStr(): string {
  return new Date().toISOString().slice(0, 10)
}

function buildInitialDone(): Record<string, boolean> {
  return Object.fromEntries(QUESTS.map(q => [q.id, false]))
}

const DEFAULT_STATE: AppState = {
  profile: {
    name: '',
    level: 1,
    rank: 'E',
    strengthBest: { pushup: 0, situp: 0, squat: 0, running: 0 },
  },
  today: {
    date: todayStr(),
    done: buildInitialDone(),
  },
  streak: 0,
  totalCompleted: 0,
  lastFullCompletionDate: '',
}

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATE
    const saved = JSON.parse(raw) as AppState
    return saved
  } catch {
    return DEFAULT_STATE
  }
}

function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

// Returns how many days apart two YYYY-MM-DD strings are
function daysDiff(a: string, b: string): number {
  const msPerDay = 86400000
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / msPerDay)
}

export function useAppState() {
  const [state, setState] = useState<AppState>(() => {
    const loaded = loadState()
    const today = todayStr()

    if (loaded.today.date === today) return loaded

    // Date has changed — reset daily quests, update streak
    const wasFullDay =
      loaded.today.date !== '' &&
      QUESTS.every(q => loaded.today.done[q.id])

    let newStreak = loaded.streak
    if (wasFullDay) {
      const diff = daysDiff(loaded.today.date, today)
      // streak continues only if yesterday was the last full day
      newStreak = diff === 1 ? loaded.streak + 1 : 1
    } else {
      // Incomplete day breaks streak unless streak was never started
      newStreak = loaded.streak > 0 ? 0 : 0
    }

    return {
      ...loaded,
      today: { date: today, done: buildInitialDone() },
      streak: newStreak,
    }
  })

  // Persist on every state change
  useEffect(() => {
    saveState(state)
  }, [state])

  // Check for midnight crossover while app is open
  useEffect(() => {
    const interval = setInterval(() => {
      const today = todayStr()
      setState(prev => {
        if (prev.today.date === today) return prev

        const wasFullDay = QUESTS.every(q => prev.today.done[q.id])
        let newStreak = prev.streak
        if (wasFullDay) {
          const diff = daysDiff(prev.today.date, today)
          newStreak = diff === 1 ? prev.streak + 1 : 1
        } else {
          newStreak = 0
        }

        return {
          ...prev,
          today: { date: today, done: buildInitialDone() },
          streak: newStreak,
        }
      })
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const toggleQuest = useCallback((id: string) => {
    setState(prev => {
      const wasDone = prev.today.done[id]
      const newDone = { ...prev.today.done, [id]: !wasDone }
      const totalCompleted = wasDone
        ? prev.totalCompleted - 1
        : prev.totalCompleted + 1

      return {
        ...prev,
        today: { ...prev.today, done: newDone },
        totalCompleted,
      }
    })
  }, [])

  const updateProfile = useCallback(
    (updates: Partial<AppState['profile']>) => {
      setState(prev => ({
        ...prev,
        profile: { ...prev.profile, ...updates },
      }))
    },
    [],
  )

  const setRank = useCallback((rank: Rank) => {
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, rank },
    }))
  }, [])

  const setLevel = useCallback((level: number) => {
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, level },
    }))
  }, [])

  const updateStrength = useCallback(
    (key: keyof AppState['profile']['strengthBest'], value: number) => {
      setState(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          strengthBest: { ...prev.profile.strengthBest, [key]: value },
        },
      }))
    },
    [],
  )

  const doneCount = QUESTS.filter(q => state.today.done[q.id]).length

  return {
    state,
    doneCount,
    toggleQuest,
    updateProfile,
    setRank,
    setLevel,
    updateStrength,
  }
}
