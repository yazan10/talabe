import { Link } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/Button'
import { MapPin, Clock, Package, Star, ShoppingBag } from 'lucide-react'

export function UserDashboard() {
  const user = useAuthStore((s) => s.user)

  const quickActions = [
    {
      to: '/orders/new',
      icon: <Package className="h-6 w-6" />,
      label: 'طلب جديد',
      value: 'ابدأ',
      color: 'bg-brand-500',
    },
    {
      to: '/orders',
      icon: <Clock className="h-6 w-6" />,
      label: 'طلباتي',
      value: '12',
      color: 'bg-blue-500',
    },
    {
      to: '/addresses',
      icon: <MapPin className="h-6 w-6" />,
      label: 'العناوين',
      value: '3',
      color: 'bg-emerald-500',
    },
    {
      to: '/profile',
      icon: <Star className="h-6 w-6" />,
      label: 'المفضلة',
      value: '8',
      color: 'bg-amber-500',
    },
  ]

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
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-surface-900">
          أهلاً، {user?.name} 👋
        </h1>
        <p className="mt-1 text-surface-500">ماذا تريد توصيله اليوم؟</p>
      </div>

      {/* Big CTA */}
      <Link to="/orders/new" className="mb-6 block">
        <Button size="lg" className="w-full py-5 text-lg shadow-brand">
          <ShoppingBag className="h-6 w-6" />
          بدي أطلب!
        </Button>
      </Link>

      {/* 2x2 squares */}
      <div className="mb-8 grid grid-cols-2 gap-3">
        {quickActions.map((a) => (
          <Link
            key={a.label}
            to={a.to}
            className="card flex flex-col items-center justify-center gap-2 py-5 text-center transition-all active:scale-95 hover:border-brand-200 hover:shadow-md"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white ${a.color}`}
            >
              {a.icon}
            </div>
            <span className="text-sm font-semibold text-surface-800">{a.label}</span>
            <span className="text-lg font-bold text-brand-600">{a.value}</span>
          </Link>
        ))}
      </div>

      <div className="card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">آخر الطلبات</h2>
          <Link to="/orders">
            <Button variant="ghost" size="sm">
              عرض الكل
            </Button>
          </Link>
        </div>

        <div className="space-y-3">
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
