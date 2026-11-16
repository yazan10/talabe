import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { COUNTRY, locations, getCities, getNeighborhoods } from '@/data/locations'
import { matchDrivers, DEMO_DRIVERS } from '@/lib/driverMatching'
import { useSocialStore } from '@/stores/socialStore'
import { MapPin, Package, Truck, Star, CheckCircle2, UserPlus, UserCheck } from 'lucide-react'
import { clsx } from 'clsx'

type Step = 'location' | 'details' | 'drivers'

export function NewOrder() {
  const navigate = useNavigate()
  const { follow, unfollow, isFollowing } = useSocialStore()
  const [step, setStep] = useState<Step>('location')

  const [govId, setGovId] = useState('')
  const [cityId, setCityId] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [placeName, setPlaceName] = useState('')
  const [orderDetails, setOrderDetails] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const cities = govId ? getCities(govId) : []
  const neighborhoods = govId && cityId ? getNeighborhoods(govId, cityId) : []
  const govName = locations.find((g) => g.id === govId)?.name || ''
  const cityName = cities.find((c) => c.id === cityId)?.name || ''

  const rankedDrivers = useMemo(() => {
    if (!govId) return []
    return matchDrivers(DEMO_DRIVERS, {
      governorateId: govId,
      maxDistanceKm: 20,
    })
  }, [govId])

  const canGoDetails = govId && cityId && (neighborhood || neighborhoods.length === 0)
  const canGoDrivers = placeName.trim().length > 1 && orderDetails.trim().length > 2

  const handleSubmit = () => {
    if (!selectedDriver) return
    setSubmitted(true)
    const d = rankedDrivers.find((x) => x.id === selectedDriver)
    setTimeout(() => {
      navigate(`/rate?id=${selectedDriver}&name=${encodeURIComponent(d?.name || 'السائق')}`)
    }, 1600)
  }

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold">تم إرسال طلبك!</h2>
        <p className="mt-2 text-surface-500">السائق في الطريق... بعدها راح تقدر تقيّمه</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-6 pb-28">
      <h1 className="mb-2 text-2xl font-bold text-surface-900">بدي أطلب!</h1>
      <p className="mb-6 text-sm text-surface-500">عبّي التفاصيل واختار أفضل سائق لمنطقتك</p>

      <div className="mb-6 flex items-center gap-2">
        {(['location', 'details', 'drivers'] as Step[]).map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <div
              className={clsx(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                step === s
                  ? 'bg-brand-500 text-white'
                  : i < (['location', 'details', 'drivers'] as Step[]).indexOf(step)
                    ? 'bg-brand-100 text-brand-600'
                    : 'bg-surface-100 text-surface-400'
              )}
            >
              {i + 1}
            </div>
            {i < 2 && <div className="h-0.5 flex-1 bg-surface-200" />}
          </div>
        ))}
      </div>

      {step === 'location' && (
        <div className="space-y-4">
          <div className="card space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">الدولة</label>
              <div className="input-field flex items-center gap-2 bg-surface-50 text-surface-600">
                🇵🇸 {COUNTRY.name}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">المحافظة</label>
              <select
                value={govId}
                onChange={(e) => { setGovId(e.target.value); setCityId(''); setNeighborhood('') }}
                className="input-field"
              >
                <option value="">اختر المحافظة</option>
                {locations.map((g) => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>
            {govId && (
              <div>
                <label className="mb-1.5 block text-sm font-medium">المدينة / القرية</label>
                <select
                  value={cityId}
                  onChange={(e) => { setCityId(e.target.value); setNeighborhood('') }}
                  className="input-field"
                >
                  <option value="">اختر المدينة أو القرية</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            )}
            {cityId && neighborhoods.length > 0 && (
              <div>
                <label className="mb-1.5 block text-sm font-medium">الحارة / المكان</label>
                <select
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="input-field"
                >
                  <option value="">اختر الحارة أو الحي</option>
                  {neighborhoods.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <Button className="w-full" disabled={!canGoDetails} onClick={() => setStep('details')}>
            التالي — تفاصيل الطلب
          </Button>
        </div>
      )}

      {step === 'details' && (
        <div className="space-y-4">
          <div className="card space-y-4">
            <div className="rounded-2xl bg-brand-50 px-3 py-2 text-sm text-brand-700">
              <MapPin className="mb-1 inline h-4 w-4" /> {COUNTRY.name} ← {govName} ← {cityName}
              {neighborhood ? ` ← ${neighborhood}` : ''}
            </div>
            <Input label="اسم المكان / المحل" placeholder="مثال: مطعم الفلافل..." value={placeName} onChange={(e) => setPlaceName(e.target.value)} />
            <div>
              <label className="mb-1.5 block text-sm font-medium">تفاصيل الطلب</label>
              <textarea className="input-field min-h-[100px] resize-none" placeholder="شو بدك توصّل؟" value={orderDetails} onChange={(e) => setOrderDetails(e.target.value)} />
            </div>
            <Input label="رقم للتواصل (اختياري)" type="tel" placeholder="05XXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setStep('location')}>رجوع</Button>
            <Button className="flex-1" disabled={!canGoDrivers} onClick={() => setStep('drivers')}>عرض السائقين</Button>
          </div>
        </div>
      )}

      {step === 'drivers' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-surface-100 px-3 py-2 text-sm text-surface-600">
            <Package className="mb-0.5 inline h-4 w-4" /> {placeName}
            <span className="mx-1">•</span>
            <MapPin className="mb-0.5 inline h-4 w-4" /> {cityName}
            {neighborhood ? ` / ${neighborhood}` : ''}
          </div>

          <h2 className="font-semibold">أفضل السائقين حسب مطابقة منطقتك</h2>
          <p className="text-xs text-surface-400">مرتّبين حسب: القرب + التقييم + التوفر</p>

          <div className="space-y-3">
            {rankedDrivers.length === 0 ? (
              <div className="card py-8 text-center text-surface-400">لا يوجد سائقين متاحين حالياً</div>
            ) : (
              rankedDrivers.map((d) => (
                <div
                  key={d.id}
                  className={clsx(
                    'card p-4 transition-all',
                    selectedDriver === d.id ? 'border-2 border-brand-500 bg-brand-50' : ''
                  )}
                >
                  <button type="button" className="flex w-full items-center gap-3 text-right" onClick={() => setSelectedDriver(d.id)}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
                      <Truck className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{d.name}</span>
                        <span className="rounded-full bg-surface-100 px-2 py-0.5 text-[10px] text-surface-500">
                          تطابق {d.matchScore}%
                        </span>
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-surface-500">
                        <span>{d.vehicle}</span>
                        <span className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          {d.rating} ({d.totalRatings})
                        </span>
                        <span>{d.distanceKm} كم</span>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-brand-600">{d.fee} ₪</div>
                    </div>
                  </button>
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      className="flex items-center gap-1 text-xs text-brand-600"
                      onClick={() => (isFollowing(d.id) ? unfollow(d.id) : follow(d.id))}
                    >
                      {isFollowing(d.id) ? <UserCheck className="h-3.5 w-3.5" /> : <UserPlus className="h-3.5 w-3.5" />}
                      {isFollowing(d.id) ? 'تتابعه' : 'متابعة'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setStep('details')}>رجوع</Button>
            <Button className="w-full flex-[2]" disabled={!selectedDriver} onClick={handleSubmit}>تأكيد الطلب</Button>
          </div>
        </div>
      )}
    </div>
  )
}
