import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/Button'
import { PRICING } from '@/types'
import {
  Navigation,
  Wallet,
  Clock,
  CheckCircle2,
  MapPin,
  TrendingUp,
} from 'lucide-react'

export function DriverDashboard() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">
            مرحباً سائقنا، {user?.name}
          </h1>
          <p className="mt-1 text-surface-500">أنت حالياً متصل وجاهز لاستقبال الطلبات</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="badge-success flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            متصل
          </span>
          <Button size="sm">إيقاف الاستقبال</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: 'أرباح اليوم',
            value: '185 ₪',
            icon: <Wallet className="h-5 w-5" />,
            color: 'text-brand-600 bg-brand-50',
          },
          {
            label: 'طلبات مكتملة',
            value: '7',
            icon: <CheckCircle2 className="h-5 w-5" />,
            color: 'text-emerald-600 bg-emerald-50',
          },
          {
            label: 'ساعات العمل',
            value: '5.5 س',
            icon: <Clock className="h-5 w-5" />,
            color: 'text-blue-600 bg-blue-50',
          },
          {
            label: 'التقييم',
            value: '4.9',
            icon: <TrendingUp className="h-5 w-5" />,
            color: 'text-amber-600 bg-amber-50',
          },
        ].map((s) => (
          <div key={s.label} className="card flex items-center gap-4">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.color}`}>
              {s.icon}
            </div>
            <div>
              <div className="text-sm text-surface-500">{s.label}</div>
              <div className="text-xl font-bold">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Available orders */}
        <div className="card lg:col-span-2">
          <h2 className="mb-5 text-lg font-semibold">طلبات متاحة قريبة منك</h2>
          <div className="space-y-4">
            {[
              {
                from: 'مطعم الفلافل - رام الله',
                to: 'شارع الإرسال',
                distance: '2.4 كم',
                fee: 12,
                time: '8 د',
              },
              {
                from: 'سوبر ماركت النور',
                to: 'عين منجد',
                distance: '3.1 كم',
                fee: 15,
                time: '12 د',
              },
            ].map((order, i) => (
              <div
                key={i}
                className="rounded-2xl border border-surface-100 p-4 transition hover:border-brand-200"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-brand-500" />
                      <span className="font-medium">{order.from}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-surface-500">
                      <Navigation className="h-4 w-4" />
                      <span>{order.to}</span>
                    </div>
                    <div className="text-xs text-surface-400">
                      {order.distance} • تقريباً {order.time}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-brand-600">{order.fee} ₪</div>
                    <Button size="sm" className="mt-2">
                      قبول
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription card */}
        <div className="card bg-gradient-to-br from-brand-500 to-brand-600 text-white">
          <h3 className="text-lg font-semibold">اشتراكك الحالي</h3>
          <div className="mt-4">
            <div className="text-3xl font-bold">{PRICING.DRIVER_INDEPENDENT} ₪</div>
            <div className="text-brand-100">شهرياً - سائق مستقل</div>
          </div>
          <div className="mt-6 space-y-2 text-sm text-brand-50">
            <div className="flex justify-between">
              <span>تاريخ التجديد</span>
              <span>15 ديسمبر 2026</span>
            </div>
            <div className="flex justify-between">
              <span>الحالة</span>
              <span className="font-medium">نشط ✓</span>
            </div>
          </div>
          <Button
            className="mt-6 w-full bg-white text-brand-600 hover:bg-brand-50"
            size="sm"
          >
            إدارة الاشتراك
          </Button>
        </div>
      </div>
    </div>
  )
}
