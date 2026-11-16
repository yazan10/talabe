import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, UserRole } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  setRole: (role: UserRole) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setRole: (role) =>
        set((state) =>
          state.user ? { user: { ...state.user, role } } : state
        ),
    }),
    {
      name: 'talabe-auth',
    }
  )
)
