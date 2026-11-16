import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Package, Clock, CheckCircle2, XCircle, Truck } from 'lucide-react'
import { clsx } from 'clsx'

type OrderStatus = 'all' | 'pending' | 'on_the_way' | 'delivered' | 'cancelled'

const filters: { id: OrderStatus; label: string }[] = [
  { id: 'all', label: 'الكل' },
  { id: 'pending', label: 'قيد الانتظار' },
  { id: 'on_the_way', label: 'قيد التوصيل' },
  { id: 'delivered', label: 'تم التوصيل' },
  { id: 'cancelled', label: 'ملغي' },
]

const mockOrders = [
  {
    id: '#1024',
    store: 'مطعم الفلافل الشامي',
    status: 'delivered' as const,
    statusLabel: 'تم التوصيل',
    time: 'اليوم 14:30',
    amount: 48,
    items: 3,
  },
  {
    id: '#1019',
    store: 'سوبر ماركت النور',
    status: 'on_the_way' as const,
    statusLabel: 'قيد التوصيل',
    time: 'اليوم 13:15',
    amount: 125,
    items: 7,
  },
  {
    id: '#1015',
    store: 'مخبز القدس',
    status: 'pending' as const,
    statusLabel: 'قيد الانتظار',
    time: 'اليوم 12:00',
    amount: 22,
    items: 2,
  },
  {
    id: '#1012',
    store: 'مطعم أبو العز',
    status: 'delivered' as const,
    statusLabel: 'تم التوصيل',
    time: 'أمس 19:40',
    amount: 89,
    items: 4,
  },
  {
    id: '#1008',
    store: 'صيدلية الشفاء',
    status: 'cancelled' as const,
    statusLabel: 'ملغي',
    time: 'أمس 16:20',
    amount: 55,
    items: 1,
  },
]

const statusIcon = {
  pending: <Clock className="h-4 w-4" />,
  on_the_way: <Truck className="h-4 w-4" />,
  delivered: <CheckCircle2 className="h-4 w-4" />,
  cancelled: <XCircle className="h-4 w-4" />,
}

const statusColor = {
  pending: 'bg-amber-100 text-amber-700',
  on_the_way: 'bg-blue-100 text-blue-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
}

export function Orders() {
  const [filter, setFilter] = useState<OrderStatus>('all')

  const filtered =
    filter === 'all' ? mockOrders : mockOrders.filter((o) => o.status === filter)

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 pb-28">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">طلباتي</h1>
          <p className="mt-1 text-sm text-surface-500">{mockOrders.length} طلب</p>
        </div>
        <Link to="/orders/new">
          <Button size="sm">
            <Package className="h-4 w-4" />
            طلب جديد
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={clsx(
              'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all',
              filter === f.id
                ? 'bg-brand-500 text-white shadow-brand'
                : 'bg-white text-surface-600 border border-surface-200'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="card py-12 text-center text-surface-400">
            <Package className="mx-auto mb-3 h-10 w-10 opacity-40" />
            <p>لا توجد طلبات في هذا التصنيف</p>
          </div>
        ) : (
          filtered.map((order) => (
            <div key={order.id} className="card p-4 transition hover:border-brand-200">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-surface-900">{order.store}</div>
                  <div className="mt-1 text-sm text-surface-500">
                    {order.id} • {order.items} أصناف • {order.time}
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-brand-600">{order.amount} ₪</div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span
                  className={clsx(
                    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
                    statusColor[order.status]
                  )}
                >
                  {statusIcon[order.status]}
                  {order.statusLabel}
                </span>
                <Button variant="ghost" size="sm">
                  التفاصيل
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
