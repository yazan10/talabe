import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/Button'
import { PRICING } from '@/types'
import {
  Users,
  Package,
  TrendingUp,
  UserPlus,
  Settings,
  CreditCard,
} from 'lucide-react'

export function CompanyDashboard() {
  const user = useAuthStore((s) => s.user)

  const employees = [
    { name: 'خالد أبو عودة', role: 'سائق', status: 'متصل', deliveries: 12 },
    { name: 'سارة منصور', role: 'موظف استقبال', status: 'متصل', deliveries: 0 },
    { name: 'يوسف الخطيب', role: 'سائق', status: 'غير متصل', deliveries: 8 },
  ]

  const employeeCount = employees.length
  const monthlyCost = PRICING.COMPANY_BASE + employeeCount * PRICING.COMPANY_PER_EMPLOYEE

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">{user?.name}</h1>
          <p className="mt-1 text-surface-500">لوحة تحكم الشركة</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm">
            <Settings className="h-4 w-4" />
            الإعدادات
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4" />
            إضافة موظف
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: 'طلبات اليوم',
            value: '34',
            icon: <Package className="h-5 w-5" />,
            color: 'text-brand-600 bg-brand-50',
          },
          {
            label: 'الموظفين',
            value: String(employeeCount),
            icon: <Users className="h-5 w-5" />,
            color: 'text-blue-600 bg-blue-50',
          },
          {
            label: 'إيرادات اليوم',
            value: '1,240 ₪',
            icon: <TrendingUp className="h-5 w-5" />,
            color: 'text-emerald-600 bg-emerald-50',
          },
          {
            label: 'اشتراك الشهر',
            value: `${monthlyCost} ₪`,
            icon: <CreditCard className="h-5 w-5" />,
            color: 'text-violet-600 bg-violet-50',
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
        {/* Employees */}
        <div className="card lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold">الموظفين والسائقين</h2>
            <Button variant="ghost" size="sm">
              إدارة الكل
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-100 text-right text-surface-500">
                  <th className="pb-3 font-medium">الاسم</th>
                  <th className="pb-3 font-medium">الدور</th>
                  <th className="pb-3 font-medium">الحالة</th>
                  <th className="pb-3 font-medium">توصيلات اليوم</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.name} className="border-b border-surface-50 last:border-0">
                    <td className="py-4 font-medium">{emp.name}</td>
                    <td className="py-4 text-surface-600">{emp.role}</td>
                    <td className="py-4">
                      <span
                        className={
                          emp.status === 'متصل'
                            ? 'badge-success'
                            : 'badge bg-surface-100 text-surface-600'
                        }
                      >
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-4">{emp.deliveries}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subscription breakdown */}
        <div className="card">
          <h3 className="text-lg font-semibold">تفاصيل الاشتراك</h3>
          <div className="mt-5 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-surface-500">اشتراك الشركة</span>
              <span className="font-medium">{PRICING.COMPANY_BASE} ₪</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-surface-500">
                موظفين ({employeeCount} × {PRICING.COMPANY_PER_EMPLOYEE} ₪)
              </span>
              <span className="font-medium">
                {employeeCount * PRICING.COMPANY_PER_EMPLOYEE} ₪
              </span>
            </div>
            <div className="border-t border-surface-100 pt-4">
              <div className="flex justify-between">
                <span className="font-semibold">الإجمالي الشهري</span>
                <span className="text-xl font-bold text-brand-600">{monthlyCost} ₪</span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-brand-50 p-4 text-sm text-brand-800">
            <p className="font-medium">💡 نصيحة</p>
            <p className="mt-1 text-brand-700">
              كل موظف إضافي يكلفك {PRICING.COMPANY_PER_EMPLOYEE} ₪ فقط شهرياً.
            </p>
          </div>

          <Button className="mt-6 w-full" size="sm">
            دفع الاشتراك
          </Button>
        </div>
      </div>
    </div>
  )
}
