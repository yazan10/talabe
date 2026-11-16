import { Link } from 'react-router-dom'
import { useSocialStore } from '@/stores/socialStore'
import { Button } from '@/components/ui/Button'
import { DEMO_DRIVERS } from '@/lib/driverMatching'
import { Star, UserMinus, Users } from 'lucide-react'

export function Following() {
  const { following, unfollow } = useSocialStore()

  const drivers = DEMO_DRIVERS.filter((d) => following.includes(d.id))

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 pb-28">
      <h1 className="mb-2 text-2xl font-bold">المتابَعون</h1>
      <p className="mb-6 text-sm text-surface-500">السائقين والشركات اللي بتتابعهم</p>

      {drivers.length === 0 ? (
        <div className="card py-12 text-center">
          <Users className="mx-auto mb-3 h-10 w-10 text-surface-300" />
          <p className="text-surface-500">لسه ما بتتابع أحد</p>
          <Link to="/orders/new" className="mt-4 inline-block">
            <Button size="sm">اطلب وجرّب متابعة سائق</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {drivers.map((d) => (
            <div key={d.id} className="card flex items-center gap-3 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 font-bold text-brand-600">
                {d.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{d.name}</div>
                <div className="mt-0.5 flex items-center gap-2 text-xs text-surface-500">
                  <span>{d.vehicle}</span>
                  <span className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {d.rating}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500"
                onClick={() => unfollow(d.id)}
              >
                <UserMinus className="h-4 w-4" />
                إلغاء
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
