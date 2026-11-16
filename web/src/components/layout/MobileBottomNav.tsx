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

  if (!user) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="border-t border-surface-200/60 bg-white/85 pb-safe pt-1.5 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/70 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        <div className="mx-auto flex max-w-lg items-center justify-around px-1">
          {items.map((item) => {
            const active =
              location.pathname === item.to ||
              location.pathname.startsWith(item.to + '/')
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                className={clsx(
                  'flex flex-1 flex-col items-center gap-0.5 rounded-2xl px-1 py-1.5 transition-all duration-200 active:scale-90',
                  active ? 'text-brand-600' : 'text-surface-400'
                )}
              >
                <div
                  className={clsx(
                    'flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-250',
                    active
                      ? 'bg-brand-500 text-white shadow-brand scale-110'
                      : 'bg-transparent'
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
                </div>
                <span
                  className={clsx(
                    'text-[10px] font-semibold tracking-wide',
                    active ? 'text-brand-600' : 'text-surface-400'
                  )}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
