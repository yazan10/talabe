import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/Button'
import {
  User,
  Phone,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  LogOut,
  ChevronLeft,
  Settings,
} from 'lucide-react'
import { getGovernorateName } from '@/data/westBankRegions'

export function Profile() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const menuItems = [
    { icon: <MapPin className="h-5 w-5" />, label: 'العناوين المحفوظة', value: '3 عناوين' },
    { icon: <CreditCard className="h-5 w-5" />, label: 'طرق الدفع', value: 'بطاقة واحدة' },
    { icon: <Bell className="h-5 w-5" />, label: 'الإشعارات', value: 'مفعّلة' },
    { icon: <Shield className="h-5 w-5" />, label: 'الخصوصية والأمان', value: '' },
    { icon: <Settings className="h-5 w-5" />, label: 'الإعدادات', value: '' },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 pb-28">
      <h1 className="mb-6 text-2xl font-bold text-surface-900">حسابي</h1>

      {/* Profile card */}
      <div className="card mb-6 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 text-2xl font-bold text-white shadow-brand">
          {user?.name?.charAt(0) || 'م'}
        </div>
        <div className="flex-1">
          <div className="text-lg font-bold text-surface-900">{user?.name}</div>
          <div className="mt-0.5 flex items-center gap-1.5 text-sm text-surface-500">
            <Phone className="h-3.5 w-3.5" />
            {user?.phone || '—'}
          </div>
          {user?.governorateId && (
            <div className="mt-0.5 flex items-center gap-1.5 text-sm text-surface-500">
              <MapPin className="h-3.5 w-3.5" />
              {getGovernorateName(user.governorateId)}
            </div>
          )}
        </div>
        <Button variant="ghost" size="sm">
          تعديل
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        {[
          { label: 'الطلبات', value: '12' },
          { label: 'المفضلة', value: '8' },
          { label: 'التقييم', value: '4.9' },
        ].map((s) => (
          <div key={s.label} className="card py-4 text-center">
            <div className="text-xl font-bold text-brand-600">{s.value}</div>
            <div className="mt-1 text-xs text-surface-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="card space-y-1 p-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="flex w-full items-center gap-3 rounded-2xl px-3 py-3.5 text-right transition hover:bg-surface-50 active:scale-[0.99]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-100 text-surface-600">
              {item.icon}
            </div>
            <div className="flex-1">
              <div className="font-medium text-surface-800">{item.label}</div>
              {item.value && (
                <div className="text-xs text-surface-400">{item.value}</div>
              )}
            </div>
            <ChevronLeft className="h-5 w-5 text-surface-300" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <Button
        variant="ghost"
        className="mt-6 w-full text-red-500 hover:bg-red-50 hover:text-red-600"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4" />
        تسجيل الخروج
      </Button>

      <p className="mt-8 text-center text-xs text-surface-400">
        طلبي v0.1.0 • صُنع في فلسطين 🇵🇸
      </p>
    </div>
  )
}
