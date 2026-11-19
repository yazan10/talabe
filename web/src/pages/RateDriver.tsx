import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { RatingStars } from '@/components/RatingStars'
import { useSocialStore } from '@/stores/socialStore'
import { CheckCircle2 } from 'lucide-react'

export function RateDriver() {
  const [params] = useSearchParams()
  const driverId = params.get('id') || '1'
  const driverName = params.get('name') || 'السائق'
  const navigate = useNavigate()
  const rate = useSocialStore((s) => s.rate)
  const loadFollowing = useSocialStore((s) => s.loadFollowing)
  useEffect(() => { void loadFollowing() }, [loadFollowing])
  const follow = useSocialStore((s) => s.follow)
  const isFollowing = useSocialStore((s) => s.isFollowing(driverId))

  const [stars, setStars] = useState(5)
  const [comment, setComment] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setLoading(true); setError('')
    try { await rate(driverId, 'driver', stars, comment || undefined); setDone(true); window.setTimeout(() => navigate('/orders'), 1800) }
    catch (e) { setError(e instanceof Error ? e.message : 'تعذر حفظ التقييم') }
    finally { setLoading(false) }
  }

  if (done) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
        <CheckCircle2 className="mb-4 h-14 w-14 text-emerald-500" />
        <h2 className="text-xl font-bold">شكراً على تقييمك!</h2>
        <p className="mt-2 text-surface-500">يساعد تقييمك باقي المستخدمين</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 py-8 pb-28">
      <h1 className="mb-2 text-2xl font-bold">تقييم السائق</h1>
      <p className="mb-8 text-surface-500">{driverName}</p>

      <div className="card flex flex-col items-center gap-4 py-8">
        <RatingStars value={stars} onChange={setStars} size="lg" />
        <p className="text-sm text-surface-500">
          {stars === 5 ? 'ممتاز' : stars === 4 ? 'جيد جداً' : stars === 3 ? 'مقبول' : stars === 2 ? 'ضعيف' : 'سيء'}
        </p>

        <textarea
          className="input-field mt-2 min-h-[90px] w-full resize-none"
          placeholder="اكتب ملاحظة (اختياري)..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {error && <p className="w-full rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
        <Button className="mt-2 w-full" loading={loading} onClick={handleSubmit}>
          إرسال التقييم
        </Button>

        {!isFollowing && (
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => follow(driverId)}
          >
            متابعة السائق
          </Button>
        )}
      </div>
    </div>
  )
}
