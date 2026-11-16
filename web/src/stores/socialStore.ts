import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type RateableTarget = {
  id: string
  name: string
  type: 'driver' | 'company'
}

interface Rating {
  targetId: string
  targetType: 'driver' | 'company'
  stars: number
  comment?: string
  createdAt: string
}

interface SocialState {
  following: string[] // ids of drivers/companies
  ratings: Rating[]
  follow: (id: string) => void
  unfollow: (id: string) => void
  isFollowing: (id: string) => boolean
  rate: (targetId: string, targetType: 'driver' | 'company', stars: number, comment?: string) => void
  getRatingsFor: (targetId: string) => Rating[]
  getAverageRating: (targetId: string) => number | null
}

export const useSocialStore = create<SocialState>()(
  persist(
    (set, get) => ({
      following: [],
      ratings: [],
      follow: (id) =>
        set((s) =>
          s.following.includes(id) ? s : { following: [...s.following, id] }
        ),
      unfollow: (id) =>
        set((s) => ({ following: s.following.filter((x) => x !== id) })),
      isFollowing: (id) => get().following.includes(id),
      rate: (targetId, targetType, stars, comment) =>
        set((s) => ({
          ratings: [
            ...s.ratings.filter((r) => r.targetId !== targetId),
            {
              targetId,
              targetType,
              stars,
              comment,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      getRatingsFor: (targetId) =>
        get().ratings.filter((r) => r.targetId === targetId),
      getAverageRating: (targetId) => {
        const list = get().ratings.filter((r) => r.targetId === targetId)
        if (!list.length) return null
        return list.reduce((a, r) => a + r.stars, 0) / list.length
      },
    }),
    { name: 'talabe-social' }
  )
)
