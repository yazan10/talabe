import { Button } from '@/components/ui/Button'
import { PRICING } from '@/types'
import { UserPlus, Users, Search } from 'lucide-react'
import { useState } from 'react'

const employees = [
  { id: 1, name: 'خالد أبو عودة', role: 'سائق', status: 'متصل', deliveries: 12, phone: '0599***001' },
  { id: 2, name: 'سارة منصور', role: 'موظف استقبال', status: 'متصل', deliveries: 0, phone: '0599***002' },
  { id: 3, name: 'يوسف الخطيب', role: 'سائق', status: 'غير متصل', deliveries: 8, phone: '0599***003' },
  { id: 4, name: 'أحمد نمر', role: 'سائق', status: 'متصل', deliveries: 5, phone: '0599***004' },
]

export function Employees() {
  const [search, setSearch] = useState('')
  const filtered = employees.filter((e) => e.name.includes(search))
  const monthlyCost = PRICING.COMPANY_BASE + employees.length * PRICING.COMPANY_PER_EMPLOYEE

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 pb-28">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">الموظفين</h1>
          <p className="mt-1 text-sm text-surface-500">{employees.length} موظف</p>
        </div>
        <Button size="sm">
          <UserPlus className="h-4 w-4" />
          إضافة
        </Button>
      </div>

      {/* Cost summary */}
      <div className="card mb-5 bg-brand-50 border-brand-100">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-brand-700">تكلفة الاشتراك الشهرية</div>
            <div className="mt-1 text-2xl font-bold text-brand-600">{monthlyCost} ₪</div>
            <div className="mt-1 text-xs text-brand-600/70">
              {PRICING.COMPANY_BASE} (شركة) + {employees.length} × {PRICING.COMPANY_PER_EMPLOYEE}
            </div>
          </div>
          <Users className="h-10 w-10 text-brand-300" />
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
        <input
          type="text"
          placeholder="بحث عن موظف..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pr-10"
        />
      </div>

      {/* List */}
      <div className="space-y-2">
        {filtered.map((emp) => (
          <div key={emp.id} className="card flex items-center gap-3 p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-600 font-bold">
              {emp.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="font-semibold">{emp.name}</div>
              <div className="text-xs text-surface-500">
                {emp.role} • {emp.phone}
              </div>
            </div>
            <div className="text-left">
              <span
                className={
                  emp.status === 'متصل'
                    ? 'badge-success'
                    : 'badge bg-surface-100 text-surface-500'
                }
              >
                {emp.status}
              </span>
              {emp.role === 'سائق' && (
                <div className="mt-1 text-xs text-surface-400">{emp.deliveries} توصيل</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
