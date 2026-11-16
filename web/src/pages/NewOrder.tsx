import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { COUNTRY, locations, getCities, getNeighborhoods } from '@/data/locations'
import { MapPin, Package, Truck, Star, Phone, CheckCircle2 } from 'lucide-react'
import { clsx } from 'clsx'

type Step = 'location' | 'details' | 'drivers'

const mockDrivers = [
  { id: '1', name: 'محمد السائق', vehicle: 'دراجة نارية', rating: 4.9, distance: '0.8 كم', fee: 10, online: true },
  { id: '2', name: 'خالد أبو عودة', vehicle: 'سيارة', rating: 4.7, distance: '1.2 كم', fee: 15, online: true },
  { id: '3', name: 'يوسف الخطيب', vehicle: 'سكوتر كهربائي', rating: 4.8, distance: '2.1 كم', fee: 12, online: true },
  { id: '4', name: 'أحمد نمر', vehicle: 'دراجة كهربائية', rating: 4.5, distance: '3.0 كم', fee: 8, online: false },
]

export function NewOrder() {
  const navigate = useNavigate()
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

  const canGoDetails = govId && cityId && (neighborhood || neighborhoods.length === 0)
  const canGoDrivers = placeName.trim().length > 1 && orderDetails.trim().length > 2

  const handleSubmit = () => {
    if (!selectedDriver) return
    setSubmitted(true)
    setTimeout(() => navigate('/orders'), 2000)
  }

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold">تم إرسال طلبك!</h2>
        <p className="mt-2 text-surface-500">السائق في الطريق إليك قريباً</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-6 pb-28">
      <h1 className="mb-2 text-2xl font-bold text-surface-900">بدي أطلب!</h1>
      <p className="mb-6 text-sm text-surface-500">عبّي التفاصيل واختار سائق قريب منك</p>

      {/* Steps indicator */}
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

      {/* Step 1: Location */}
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
                onChange={(e) => {
                  setGovId(e.target.value)
                  setCityId('')
                  setNeighborhood('')
                }}
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
                  onChange={(e) => {
                    setCityId(e.target.value)
                    setNeighborhood('')
                  }}
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

          <Button
            className="w-full"
            disabled={!canGoDetails}
            onClick={() => setStep('details')}
          >
            التالي — تفاصيل الطلب
          </Button>
        </div>
      )}

      {/* Step 2: Order details */}
      {step === 'details' && (
        <div className="space-y-4">
          <div className="card space-y-4">
            <div className="rounded-2xl bg-brand-50 px-3 py-2 text-sm text-brand-700">
              <MapPin className="mb-1 inline h-4 w-4" />{' '}
              {COUNTRY.name} ← {govName} ← {cityName}
              {neighborhood ? ` ← ${neighborhood}` : ''}
            </div>

            <Input
              label="اسم المكان / المحل"
              placeholder="مثال: مطعم الفلافل، سوبر ماركت النور..."
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
            />

            <div>
              <label className="mb-1.5 block text-sm font-medium">تفاصيل الطلب</label>
              <textarea
                className="input-field min-h-[100px] resize-none"
                placeholder="شو بدك توصّل؟ الكمية، الملاحظات..."
                value={orderDetails}
                onChange={(e) => setOrderDetails(e.target.value)}
              />
            </div>

            <Input
              label="رقم للتواصل (اختياري)"
              type="tel"
              placeholder="05XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setStep('location')}>
              رجوع
            </Button>
            <Button className="flex-1" disabled={!canGoDrivers} onClick={() => setStep('drivers')}>
              عرض السائقين
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Drivers */}
      {step === 'drivers' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-surface-100 px-3 py-2 text-sm text-surface-600">
            <Package className="mb-0.5 inline h-4 w-4" /> {placeName}
            <span className="mx-1">•</span>
            <MapPin className="mb-0.5 inline h-4 w-4" /> {cityName}
            {neighborhood ? ` / ${neighborhood}` : ''}
          </div>

          <h2 className="font-semibold">السائقين المتاحين في منطقتك</h2>

          <div className="space-y-3">
            {mockDrivers
              .filter((d) => d.online)
              .map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDriver(d.id)}
                  className={clsx(
                    'card flex w-full items-center gap-3 p-4 text-right transition-all',
                    selectedDriver === d.id
                      ? 'border-2 border-brand-500 bg-brand-50'
                      : 'hover:border-brand-200'
                  )}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
                    <Truck className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{d.name}</div>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-surface-500">
                      <span>{d.vehicle}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        {d.rating}
                      </span>
                      <span>•</span>
                      <span>{d.distance}</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-brand-600">{d.fee} ₪</div>
                    <div className="text-[10px] text-surface-400">أجرة التوصيل</div>
                  </div>
                </button>
              ))}
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setStep('details')}>
              رجوع
            </Button>
            <Button className="w-full flex-[2]" disabled={!selectedDriver} onClick={handleSubmit}>
              تأكيد الطلب
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
