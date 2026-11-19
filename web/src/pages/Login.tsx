import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/stores/authStore'
import { Phone, Lock } from 'lucide-react'

export function Login() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ phone, password }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'تعذر تسجيل الدخول')
      login(data.user); navigate(`/dashboard/${data.user.role}`)
    } catch (err) { setError(err instanceof Error ? err.message : 'تعذر تسجيل الدخول') }
    finally { setLoading(false) }
  }
  return <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12"><div className="w-full max-w-md"><div className="mb-8 text-center"><div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-2xl font-bold text-white shadow-brand">ط</div><h1 className="text-2xl font-bold text-surface-900">مرحباً بعودتك</h1><p className="mt-2 text-surface-500">سجّل دخولك للمتابعة</p></div><form onSubmit={handleSubmit} className="card space-y-5"><Input label="رقم الجوال" type="tel" placeholder="05XXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} icon={<Phone className="h-4 w-4" />} required /><Input label="كلمة المرور" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} icon={<Lock className="h-4 w-4" />} required />{error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<Button type="submit" className="w-full" loading={loading}>دخول</Button><p className="text-center text-sm text-surface-500">ما عندك حساب؟ <Link to="/register" className="font-medium text-brand-600 hover:underline">سجّل الآن</Link></p></form></div></div>
}
