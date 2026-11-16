import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/stores/authStore'
import type { UserRole } from '@/types'
import { Phone, Lock } from 'lucide-react'

export function Login() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Mock login - in real app this would call API
    await new Promise((r) => setTimeout(r, 800))

    // Demo users for testing different roles
    const demoUsers: Record<string, { name: string; role: UserRole }> = {
      '0599000001': { name: 'أحمد العميل', role: 'user' },
      '0599000002': { name: 'محمد السائق', role: 'driver' },
      '0599000003': { name: 'مطعم الفلافل', role: 'company' },
    }

    const demo = demoUsers[phone] || { name: 'مستخدم تجريبي', role: 'user' as UserRole }

    login({
      id: 'demo-' + Date.now(),
      name: demo.name,
      email: `${phone}@talabe.ps`,
      phone,
      role: demo.role,
      createdAt: new Date().toISOString(),
      subscriptionActive: true,
    })

    setLoading(false)
    navigate(`/dashboard/${demo.role}`)
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-2xl font-bold text-white shadow-brand">
            ط
          </div>
          <h1 className="text-2xl font-bold text-surface-900">مرحباً بعودتك</h1>
          <p className="mt-2 text-surface-500">سجّل دخولك للمتابعة</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-5">
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
            دخول
          </Button>

          <p className="text-center text-sm text-surface-500">
            ما عندك حساب؟{' '}
            <Link to="/register" className="font-medium text-brand-600 hover:underline">
              سجّل الآن
            </Link>
          </p>
        </form>

        {/* Demo hints */}
        <div className="mt-6 rounded-2xl bg-surface-100 p-4 text-xs text-surface-600">
          <p className="mb-2 font-medium">للتجربة السريعة:</p>
          <ul className="space-y-1">
            <li>0599000001 → مستخدم</li>
            <li>0599000002 → سائق</li>
            <li>0599000003 → شركة</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
