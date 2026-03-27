export type Rank =
  | 'S' | 'A+' | 'A' | 'A-'
  | 'B+' | 'B' | 'B-'
  | 'C+' | 'C' | 'C-'
  | 'D+' | 'D' | 'D-'
  | 'E' | 'F'

export interface Quest {
  id: string
  label: string
  category: string
}

export interface StrengthBest {
  pushup: number
  situp: number
  squat: number
  running: number // km
}

export interface UserProfile {
  name: string
  level: number
  rank: Rank
  strengthBest: StrengthBest
}

export interface DailyState {
  date: string // YYYY-MM-DD
  done: Record<string, boolean>
}

export interface AppState {
  profile: UserProfile
  today: DailyState
  streak: number
  totalCompleted: number
  lastFullCompletionDate: string // YYYY-MM-DD or ''
}

export type Tab = 'quest' | 'status' | 'strength'
