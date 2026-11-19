import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, UserRole } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  setRole: (role: UserRole) => void
  refreshSession: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => { void fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }).catch(() => undefined); set({ user: null, isAuthenticated: false }) },
      setRole: (role) => set((state) => state.user ? { user: { ...state.user, role } } : state),
      refreshSession: async () => {
        try {
          const response = await fetch('/api/auth/me', { credentials: 'include' })
          if (!response.ok) { set({ user: null, isAuthenticated: false }); return }
          const data = await response.json()
          set({ user: data.user, isAuthenticated: true })
        } catch { set({ user: null, isAuthenticated: false }) }
      },
    }),
    { name: 'talabe-auth', partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }) }
  )
)
