import type { Quest } from '../types'

export const QUEST_CATEGORIES = [
  '身体トレーニング',
  '朝のルーティン',
  '日中',
  '夜のルーティン',
  '生活環境',
] as const

export const QUESTS: Quest[] = [
  // 身体トレーニング
  { id: 'pushup',   label: '腕立て 100回',           category: '身体トレーニング' },
  { id: 'situp',    label: '腹筋 100回',             category: '身体トレーニング' },
  { id: 'squat',    label: 'スクワット 100回',        category: '身体トレーニング' },
  { id: 'running',  label: 'ランニング 10km',         category: '身体トレーニング' },

  // 朝のルーティン
  { id: 'wakeup',        label: '早起き',            category: '朝のルーティン' },
  { id: 'shower_am',     label: 'シャワー（朝）',     category: '朝のルーティン' },
  { id: 'brush_am',      label: '歯磨き（朝）',       category: '朝のルーティン' },
  { id: 'lotion_am',     label: '化粧水（朝）',       category: '朝のルーティン' },
  { id: 'emulsion_am',   label: '乳液（朝）',         category: '朝のルーティン' },
  { id: 'sunscreen',     label: '日焼け止め（朝）',   category: '朝のルーティン' },
  { id: 'breakfast',     label: '朝食を食べる',       category: '朝のルーティン' },
  { id: 'tuning',        label: 'チューニング',       category: '朝のルーティン' },

  // 日中
  { id: 'lunch',    label: '昼食を食べる',            category: '日中' },
  { id: 'grooming', label: '身だしなみを整える',      category: '日中' },
  { id: 'reading',  label: '読書・インプット 30分以上', category: '日中' },

  // 夜のルーティン
  { id: 'dinner',       label: '夕食を食べる',        category: '夜のルーティン' },
  { id: 'dishes',       label: '食器を洗う',          category: '夜のルーティン' },
  { id: 'bath',         label: '入浴',               category: '夜のルーティン' },
  { id: 'brush_pm',     label: '歯磨き（夜）',        category: '夜のルーティン' },
  { id: 'lotion_pm',    label: '化粧水（夜）',        category: '夜のルーティン' },
  { id: 'emulsion_pm',  label: '乳液（夜）',          category: '夜のルーティン' },
  { id: 'sleep',        label: '睡眠をしっかりとる',  category: '夜のルーティン' },

  // 生活環境
  { id: 'laundry',  label: '洗濯をする',              category: '生活環境' },
  { id: 'clean',    label: '掃除する',                category: '生活環境' },
  { id: 'altar',    label: '仏壇・神棚の水を替える',  category: '生活環境' },
]

export const TOTAL_QUESTS = QUESTS.length // 25
