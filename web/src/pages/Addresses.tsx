import { Button } from '@/components/ui/Button'
import { MapPin, Plus, Home, Briefcase } from 'lucide-react'

const addresses = [
  {
    id: 1,
    label: 'المنزل',
    icon: 'home',
    details: 'رام الله، شارع الإرسال، عمارة النور ط3',
    isDefault: true,
  },
  {
    id: 2,
    label: 'العمل',
    icon: 'work',
    details: 'البيرة، شارع نابلس، مجمع الزهراء',
    isDefault: false,
  },
  {
    id: 3,
    label: 'بيت العائلة',
    icon: 'home',
    details: 'بيرزيت، قرب الجامعة',
    isDefault: false,
  },
]

export function Addresses() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 pb-28">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">العناوين</h1>
          <p className="mt-1 text-sm text-surface-500">{addresses.length} عناوين محفوظة</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          إضافة
        </Button>
      </div>

      <div className="space-y-3">
        {addresses.map((addr) => (
          <div key={addr.id} className="card flex items-start gap-3 p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
              {addr.icon === 'home' ? (
                <Home className="h-5 w-5" />
              ) : (
                <Briefcase className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{addr.label}</span>
                {addr.isDefault && (
                  <span className="badge-brand text-[10px]">افتراضي</span>
                )}
              </div>
              <p className="mt-1 text-sm text-surface-500">{addr.details}</p>
            </div>
            <Button variant="ghost" size="sm">
              تعديل
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 card border-dashed border-2 border-surface-200 bg-surface-50 text-center py-8">
        <MapPin className="mx-auto h-8 w-8 text-surface-300" />
        <p className="mt-2 text-sm text-surface-500">أضف عنوان جديد للتوصيل السريع</p>
        <Button size="sm" className="mt-4" variant="secondary">
          <Plus className="h-4 w-4" />
          عنوان جديد
        </Button>
      </div>
    </div>
  )
}
