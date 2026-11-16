import { Button } from '@/components/ui/Button'
import { PRICING } from '@/types'
import {
  Wallet as WalletIcon,
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  TrendingUp,
} from 'lucide-react'

const transactions = [
  { id: 1, type: 'in', title: 'توصيل #1024', amount: 12, time: 'اليوم 14:35' },
  { id: 2, type: 'in', title: 'توصيل #1019', amount: 15, time: 'اليوم 13:20' },
  { id: 3, type: 'out', title: 'اشتراك شهري', amount: PRICING.DRIVER_INDEPENDENT, time: 'أمس' },
  { id: 4, type: 'in', title: 'توصيل #1012', amount: 10, time: 'أمس 19:50' },
  { id: 5, type: 'in', title: 'توصيل #1008', amount: 18, time: 'أمس 16:10' },
]

export function Wallet() {
  const balance = 342
  const todayEarnings = 45
  const weekEarnings = 185

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 pb-28">
      <h1 className="mb-6 text-2xl font-bold text-surface-900">المحفظة</h1>

      {/* Balance card */}
      <div className="card mb-6 bg-gradient-to-br from-brand-500 to-brand-600 text-white">
        <div className="flex items-center gap-2 text-brand-100">
          <WalletIcon className="h-5 w-5" />
          <span className="text-sm">الرصيد المتاح</span>
        </div>
        <div className="mt-3 text-4xl font-extrabold">{balance} ₪</div>
        <div className="mt-6 flex gap-3">
          <Button
            size="sm"
            className="flex-1 bg-white text-brand-600 hover:bg-brand-50"
          >
            سحب رصيد
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="flex-1 border border-white/30 text-white hover:bg-white/10"
          >
            تفاصيل
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="card py-4 text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="text-xl font-bold text-surface-900">{todayEarnings} ₪</div>
          <div className="mt-1 text-xs text-surface-500">أرباح اليوم</div>
        </div>
        <div className="card py-4 text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <CreditCard className="h-5 w-5" />
          </div>
          <div className="text-xl font-bold text-surface-900">{weekEarnings} ₪</div>
          <div className="mt-1 text-xs text-surface-500">أرباح الأسبوع</div>
        </div>
      </div>

      {/* Subscription */}
      <div className="card mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">اشتراك السائق</div>
            <div className="mt-1 text-sm text-surface-500">
              {PRICING.DRIVER_INDEPENDENT} ₪ / شهر • يتجدد 15 ديسمبر
            </div>
          </div>
          <span className="badge-success">نشط</span>
        </div>
      </div>

      {/* Transactions */}
      <h2 className="mb-3 text-lg font-semibold">آخر العمليات</h2>
      <div className="space-y-2">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="card flex items-center gap-3 p-4"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                tx.type === 'in'
                  ? 'bg-emerald-100 text-emerald-600'
                  : 'bg-red-100 text-red-600'
              }`}
            >
              {tx.type === 'in' ? (
                <ArrowDownLeft className="h-5 w-5" />
              ) : (
                <ArrowUpRight className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium">{tx.title}</div>
              <div className="text-xs text-surface-400">{tx.time}</div>
            </div>
            <div
              className={`font-bold ${
                tx.type === 'in' ? 'text-emerald-600' : 'text-red-600'
              }`}
            >
              {tx.type === 'in' ? '+' : '-'}{tx.amount} ₪
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
