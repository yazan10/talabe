import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/stores/authStore'
import type { UserRole } from '@/types'
import { User, Phone, Lock, Building2, Truck } from 'lucide-react'
import { clsx } from 'clsx'

const roles: { id: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
  {
    id: 'user',
    label: 'مستخدم',
    icon: <User className="h-5 w-5" />,
    desc: 'اطلب توصيل بسهولة',
  },
  {
    id: 'driver',
    label: 'سائق',
    icon: <Truck className="h-5 w-5" />,
    desc: 'اشتراك 35 ₪ شهرياً',
  },
  {
    id: 'company',
    label: 'شركة / مصلحة',
    icon: <Building2 className="h-5 w-5" />,
    desc: '30 ₪ + 15 ₪ لكل موظف',
  },
]

export function Register() {
  const [searchParams] = useSearchParams()
  const initialRole = (searchParams.get('role') as UserRole) || 'user'

  const [role, setRole] = useState<UserRole>(initialRole)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await new Promise((r) => setTimeout(r, 900))

    login({
      id: 'new-' + Date.now(),
      name,
      email: `${phone}@talabe.ps`,
      phone,
      role,
      createdAt: new Date().toISOString(),
      subscriptionActive: role === 'user',
    })

    setLoading(false)
    navigate(`/dashboard/${role}`)
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-2xl font-bold text-white shadow-brand">
            ط
          </div>
          <h1 className="text-2xl font-bold text-surface-900">إنشاء حساب جديد</h1>
          <p className="mt-2 text-surface-500">اختر نوع حسابك وابدأ خلال دقائق</p>
        </div>

        {/* Role selector */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          {roles.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={clsx(
                'flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all',
                role === r.id
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-surface-200 bg-white text-surface-600 hover:border-brand-200'
              )}
            >
              {r.icon}
              <span className="text-sm font-semibold">{r.label}</span>
              <span className="text-[10px] leading-tight opacity-80">{r.desc}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="card space-y-5">
          <Input
            label="الاسم الكامل / اسم الشركة"
            placeholder="مثال: أحمد محمد أو مطعم الفلافل"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="رقم الجوال"
            type="tel"
            placeholder="05XXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            icon={<Phone className="h-4 w-4" />}
            required
          />

          <Input
            label="كلمة المرور"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="h-4 w-4" />}
            required
          />

          <Button type="submit" className="w-full" loading={loading}>
            إنشاء الحساب
          </Button>

          <p className="text-center text-sm text-surface-500">
            عندك حساب؟{' '}
            <Link to="/login" className="font-medium text-brand-600 hover:underline">
              سجّل دخول
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
