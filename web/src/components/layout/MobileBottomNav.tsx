import { Link, useLocation } from 'react-router-dom'
import { Home, Map, Package, User, Wallet } from 'lucide-react'
import { clsx } from 'clsx'
import { useAuthStore } from '@/stores/authStore'

const navItems = {
  user: [
    { to: '/dashboard/user', icon: Home, label: 'الرئيسية' },
    { to: '/destination', icon: Map, label: 'وجهتي' },
    { to: '/orders', icon: Package, label: 'طلباتي' },
    { to: '/profile', icon: User, label: 'حسابي' },
  ],
  driver: [
    { to: '/dashboard/driver', icon: Home, label: 'الرئيسية' },
    { to: '/destination', icon: Map, label: 'وجهتي' },
    { to: '/orders', icon: Package, label: 'الطلبات' },
    { to: '/wallet', icon: Wallet, label: 'المحفظة' },
    { to: '/profile', icon: User, label: 'حسابي' },
  ],
  company: [
    { to: '/dashboard/company', icon: Home, label: 'الرئيسية' },
    { to: '/destination', icon: Map, label: 'وجهتي' },
    { to: '/orders', icon: Package, label: 'الطلبات' },
    { to: '/employees', icon: User, label: 'الموظفين' },
    { to: '/profile', icon: User, label: 'حسابي' },
  ],
}

export function MobileBottomNav() {
  const location = useLocation()
  const user = useAuthStore((s) => s.user)
  const role = user?.role || 'user'
  const items = navItems[role as keyof typeof navItems] || navItems.user

  // Only show on mobile and when authenticated
  if (!user) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Glass effect */}
      <div className="mx-3 mb-3 overflow-hidden rounded-3xl border border-white/20 bg-white/70 shadow-lg backdrop-blur-xl">
        <div className="flex items-center justify-around px-2 py-2">
          {items.map((item) => {
            const active = location.pathname === item.to || location.pathname.startsWith(item.to + '/')
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                className={clsx(
                  'flex flex-1 flex-col items-center gap-0.5 rounded-2xl px-2 py-2 transition-all',
                  active
                    ? 'bg-brand-500 text-white shadow-brand'
                    : 'text-surface-500 hover:text-brand-600'
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
