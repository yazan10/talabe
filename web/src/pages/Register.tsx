import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/stores/authStore'
import type { UserRole, VehicleType } from '@/types'
import { VEHICLE_TYPES } from '@/types'
import { governorates } from '@/data/westBankRegions'
import { User, Phone, Lock, Building2, Truck, Upload, Camera } from 'lucide-react'
import { clsx } from 'clsx'

const roles: { id: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'user', label: 'مستخدم', icon: <User className="h-5 w-5" />, desc: 'اطلب توصيل بسهولة' },
  { id: 'driver', label: 'سائق', icon: <Truck className="h-5 w-5" />, desc: 'اشتراك 35 ₪ شهرياً' },
  { id: 'company', label: 'شركة / مصلحة', icon: <Building2 className="h-5 w-5" />, desc: '30 ₪ + 15 ₪ لكل موظف' },
]

export function Register() {
  const [searchParams] = useSearchParams()
  const initialRole = (searchParams.get('role') as UserRole) || 'user'

  const [role, setRole] = useState<UserRole>(initialRole)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [vehicleType, setVehicleType] = useState<VehicleType | null>(null)
  const [governorateId, setGovernorateId] = useState('')
  const [licensePreview, setLicensePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setLicensePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (role === 'driver' && (!vehicleType || !licensePreview)) {
      alert('الرجاء اختيار نوع المركبة ورفع صورة رخصة القيادة')
      return
    }
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ name, phone, password, role, governorateId, vehicleType, licenseImageUrl: licensePreview }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'تعذر إنشاء الحساب')
      login(data.user)
      navigate(`/dashboard/${data.user.role}`)
    } catch (err) { setError(err instanceof Error ? err.message : 'تعذر إنشاء الحساب') }
    finally { setLoading(false) }
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

          {/* Region for all */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-surface-700">المحافظة</label>
            <select
              value={governorateId}
              onChange={(e) => setGovernorateId(e.target.value)}
              className="input-field"
              required
            >
              <option value="">اختر المحافظة</option>
              {governorates.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>

          {/* Driver-only fields */}
          {role === 'driver' && (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-surface-700">
                  نوع المركبة
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {VEHICLE_TYPES.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVehicleType(v.id)}
                      className={clsx(
                        'flex items-center gap-2 rounded-2xl border-2 px-3 py-3 text-sm transition-all',
                        vehicleType === v.id
                          ? 'border-brand-500 bg-brand-50 text-brand-700'
                          : 'border-surface-200 bg-white hover:border-brand-200'
                      )}
                    >
                      <span className="text-lg">{v.icon}</span>
                      <span className="font-medium">{v.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-surface-700">
                  صورة رخصة القيادة (توثيق)
                </label>
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-surface-200 bg-surface-50 px-4 py-8 transition hover:border-brand-300 hover:bg-brand-50">
                  {licensePreview ? (
                    <img
                      src={licensePreview}
                      alt="رخصة القيادة"
                      className="mb-2 h-32 w-auto rounded-xl object-cover"
                    />
                  ) : (
                    <>
                      <Camera className="mb-2 h-8 w-8 text-surface-400" />
                      <span className="text-sm text-surface-500">اضغط لرفع صورة الرخصة</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleLicenseChange}
                  />
                  {licensePreview && (
                    <span className="mt-2 flex items-center gap-1 text-xs text-brand-600">
                      <Upload className="h-3 w-3" /> تغيير الصورة
                    </span>
                  )}
                </label>
                <p className="mt-1.5 text-xs text-surface-400">
                  الصورة ستُراجع من فريق طلبي للتوثيق
                </p>
              </div>
            </>
          )}

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
