import type { Rank } from '../types'

export const RANKS: Rank[] = [
  'S', 'A+', 'A', 'A-',
  'B+', 'B', 'B-',
  'C+', 'C', 'C-',
  'D+', 'D', 'D-',
  'E', 'F',
]

export const RANK_DEFINITIONS: Record<Rank, string> = {
  S:  '存在するだけで場の空気が変わる。時代・社会規模で爪痕を残す',
  'A+': '大きな組織・社会集団を動かせる。見知らぬ人が自然と従いたくなる',
  A:  '影響が自分のコミュニティを超え始める。初対面でも「この人は違う」と感じさせる',
  'A-': '複数の集団にまたがって信頼される。自分がいない場でも名前が力を持つ',
  'B+': '組織の方向性を決められる。オーラが見知らぬ人にも伝わり始める',
  B:  '集団を率いて結果を出せる。異性から特別視される。先見が周囲に認められる',
  'B-': 'リーダーとして機能する。自分の判断に人がついてくる場面が増える',
  'C+': '小さな組織で中心になれる。信頼による協力を引き出せる。オーラが滲み始める',
  C:  'コミュニティ内で一目置かれる。頼られる場面が明確に増える',
  'C-': '周囲への影響力が生まれ始める。特定の人から強く信頼される',
  'D+': '近しい人に影響を与えられる。自分の意志が周囲を少し動かせる',
  D:  '頼られることはあるが、まだ自分から影響を与えるには至らない',
  'D-': '自分を律することはできる。ただ他者への影響はほぼない',
  E:  '自分一人を動かすのがやっと。外への影響力はまだ見えない',
  F:  '格という概念すら意識していない状態',
}

export function getRankColor(rank: Rank): string {
  if (rank === 'S') return 'text-amber-400'
  if (rank === 'A+' || rank === 'A' || rank === 'A-') return 'text-orange-400'
  if (rank === 'B+' || rank === 'B' || rank === 'B-') return 'text-yellow-300'
  if (rank === 'C+' || rank === 'C' || rank === 'C-') return 'text-emerald-400'
  if (rank === 'D+' || rank === 'D' || rank === 'D-') return 'text-sky-400'
  if (rank === 'E') return 'text-slate-400'
  return 'text-slate-600'
}

export function getRankGlow(rank: Rank): string {
  if (rank === 'S') return 'shadow-amber-400/50'
  if (rank === 'A+' || rank === 'A' || rank === 'A-') return 'shadow-orange-400/50'
  if (rank === 'B+' || rank === 'B' || rank === 'B-') return 'shadow-yellow-300/50'
  if (rank === 'C+' || rank === 'C' || rank === 'C-') return 'shadow-emerald-400/50'
  if (rank === 'D+' || rank === 'D' || rank === 'D-') return 'shadow-sky-400/50'
  return 'shadow-slate-400/30'
}
