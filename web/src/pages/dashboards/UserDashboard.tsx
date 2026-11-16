import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/Button'
import { MapPin, Clock, Package, Star } from 'lucide-react'

export function UserDashboard() {
  const user = useAuthStore((s) => s.user)

  const recentOrders = [
    {
      id: '#1024',
      store: 'مطعم الفلافل الشامي',
      status: 'تم التوصيل',
      time: 'اليوم 14:30',
      amount: 48,
    },
    {
      id: '#1019',
      store: 'سوبر ماركت النور',
      status: 'قيد التوصيل',
      time: 'اليوم 13:15',
      amount: 125,
    },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-900">
          أهلاً، {user?.name} 👋
        </h1>
        <p className="mt-1 text-surface-500">ماذا تريد توصيله اليوم؟</p>
      </div>

      {/* Quick actions */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: <Package className="h-5 w-5" />, label: 'طلب جديد', color: 'bg-brand-500' },
          { icon: <Clock className="h-5 w-5" />, label: 'طلباتي', color: 'bg-blue-500' },
          { icon: <MapPin className="h-5 w-5" />, label: 'العناوين', color: 'bg-emerald-500' },
          { icon: <Star className="h-5 w-5" />, label: 'المفضلة', color: 'bg-amber-500' },
        ].map((a) => (
          <button
            key={a.label}
            className="card flex items-center gap-4 transition hover:border-brand-200 hover:shadow-md"
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${a.color}`}>
              {a.icon}
            </div>
            <span className="font-medium">{a.label}</span>
          </button>
        ))}
      </div>

      {/* Recent orders */}
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">آخر الطلبات</h2>
          <Button variant="ghost" size="sm">
            عرض الكل
          </Button>
        </div>

        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-2xl border border-surface-100 p-4"
            >
              <div>
                <div className="font-medium">{order.store}</div>
                <div className="mt-1 text-sm text-surface-500">
                  {order.id} • {order.time}
                </div>
              </div>
              <div className="text-left">
                <div className="font-semibold text-brand-600">{order.amount} ₪</div>
                <div className="mt-1 text-xs text-surface-500">{order.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
