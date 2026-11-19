import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { COUNTRY, locations, getCities, getNeighborhoods } from '@/data/locations'
import { useSocialStore } from '@/stores/socialStore'
import { MapPin, Package, Truck, Star, CheckCircle2, UserPlus, UserCheck, LocateFixed } from 'lucide-react'
import { clsx } from 'clsx'


type LeafletMap = {
  setView: (center: [number, number], zoom: number) => void
  setMaxBounds: (bounds: unknown) => void
  on: (event: string, handler: (event: any) => void) => void
  remove: () => void
}
type LeafletApi = {
  map: (element: HTMLElement, options: Record<string, unknown>) => LeafletMap
  tileLayer: (url: string, options: Record<string, unknown>) => { addTo: (map: LeafletMap) => void }
  marker: (point: [number, number]) => { addTo: (map: LeafletMap) => any; setLatLng: (point: [number, number]) => void }
  latLngBounds: (southWest: [number, number], northEast: [number, number]) => unknown
}
let leafletLoader: Promise<LeafletApi> | null = null

function loadLeaflet(): Promise<LeafletApi> {
  if ((window as any).L) return Promise.resolve((window as any).L as LeafletApi)
  if (!leafletLoader) {
    leafletLoader = new Promise((resolve, reject) => {
      if (!document.querySelector('link[data-talabe-leaflet]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        link.dataset.talabeLeaflet = 'true'
        document.head.appendChild(link)
      }
      const existing = document.querySelector('script[data-talabe-leaflet]') as HTMLScriptElement | null
      if (existing) {
        if ((window as any).L) resolve((window as any).L)
        else {
          existing.addEventListener('load', () => resolve((window as any).L), { once: true })
          existing.addEventListener('error', reject, { once: true })
        }
        return
      }
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.async = true
      script.dataset.talabeLeaflet = 'true'
      script.onload = () => resolve((window as any).L)
      script.onerror = () => reject(new Error('تعذر تحميل مكتبة الخريطة'))
      document.body.appendChild(script)
    })
  }
  return leafletLoader
}

function WestBankMapPicker({ latitude, longitude, onChange }: {
  latitude: number | null
  longitude: number | null
  onChange: (point: { latitude: number; longitude: number }) => void
}) {
  const mapElement = useRef<HTMLDivElement>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const markerRef = useRef<{ setLatLng: (point: [number, number]) => void } | null>(null)
  const onChangeRef = useRef(onChange)
  const [mapError, setMapError] = useState('')
  useEffect(() => { onChangeRef.current = onChange }, [onChange])

  useEffect(() => {
    let active = true
    loadLeaflet().then((L) => {
      if (!active || !mapElement.current || mapRef.current) return
      const bounds = L.latLngBounds([31.25, 34.85], [32.65, 35.75])
      const map = L.map(mapElement.current, { zoomControl: true, minZoom: 8, maxZoom: 18, maxBounds: bounds, maxBoundsViscosity: 0.85 })
      map.setView([31.95, 35.20], 9)
      map.setMaxBounds(bounds)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)
      map.on('click', (event: any) => {
        const { lat, lng } = event.latlng
        if (lat < 31.25 || lat > 32.65 || lng < 34.85 || lng > 35.75) return
        onChangeRef.current({ latitude: Number(lat.toFixed(6)), longitude: Number(lng.toFixed(6)) })
      })
      mapRef.current = map
      setMapError('')
      setTimeout(() => (map as any).invalidateSize?.(), 100)
    }).catch(() => setMapError('تعذر تحميل الخريطة. تحقق من اتصال الإنترنت.'))
    return () => {
      active = false
      mapRef.current?.remove()
      mapRef.current = null
      markerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current || latitude == null || longitude == null) return
    const L = (window as any).L
    const point: [number, number] = [latitude, longitude]
    if (!markerRef.current) markerRef.current = L.marker(point).addTo(mapRef.current)
    else markerRef.current.setLatLng(point)
    mapRef.current.setView(point, 16)
  }, [latitude, longitude])

  const locateMe = () => {
    if (!navigator.geolocation) {
      setMapError('متصفحك لا يدعم تحديد الموقع.')
      return
    }
    setMapError('جارٍ تحديد موقعك...')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords
        if (lat < 31.25 || lat > 32.65 || lng < 34.85 || lng > 35.75) {
          setMapError('موقعك خارج نطاق خريطة الضفة الغربية.')
          return
        }
        onChange({ latitude: Number(lat.toFixed(6)), longitude: Number(lng.toFixed(6)) })
        setMapError('')
      },
      () => setMapError('لم نتمكن من تحديد موقعك. اسمح بالوصول إلى GPS وحاول مجدداً.'),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold">خريطة وجهتي</p>
          <p className="text-xs text-surface-500">الضفة الغربية فقط — اضغط على الخريطة لتحديد الموقع</p>
        </div>
        <button type="button" onClick={locateMe} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-500 px-3 py-2 text-sm font-semibold text-white">
          <LocateFixed className="h-4 w-4" /> تحديد موقعي GPS
        </button>
      </div>
      <div ref={mapElement} className="z-0 h-72 w-full overflow-hidden rounded-2xl border border-surface-200 bg-surface-100" />
      {mapError && <p className="text-xs text-amber-700">{mapError}</p>}
      {latitude != null && longitude != null ? (
        <p className="rounded-xl bg-brand-50 px-3 py-2 text-xs text-brand-700" dir="ltr">
          {latitude.toFixed(6)}, {longitude.toFixed(6)}
        </p>
      ) : (
        <p className="text-xs text-surface-500">لم يتم تحديد نقطة بعد. اخترها من الخريطة أو استخدم GPS.</p>
      )}
    </div>
  )
}

type Step = 'location' | 'details' | 'drivers'

export function NewOrder() {
  const navigate = useNavigate()
  const { follow, unfollow, isFollowing, loadFollowing } = useSocialStore()
  const [step, setStep] = useState<Step>('location')

  const [govId, setGovId] = useState('')
  const [cityId, setCityId] = useState('')
  const [customCity, setCustomCity] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [landmark, setLandmark] = useState('')
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null)
  const [placeName, setPlaceName] = useState('')
  const [orderDetails, setOrderDetails] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [rankedDrivers, setRankedDrivers] = useState<any[]>([])
  const [driversLoading, setDriversLoading] = useState(false)
  const [driversError, setDriversError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [createdOrderId, setCreatedOrderId] = useState('')

  useEffect(() => { void loadFollowing() }, [loadFollowing])

  const cities = govId ? getCities(govId) : []
  const neighborhoods = govId && cityId ? getNeighborhoods(govId, cityId) : []
  const govName = locations.find((g) => g.id === govId)?.name || ''
  const cityName = cityId === '__other__' ? customCity.trim() : cities.find((c) => c.id === cityId)?.name || ''

  useEffect(() => {
    if (step !== 'drivers') return
    setDriversLoading(true); setDriversError(''); setSelectedDriver(null)
    const query = new URLSearchParams({ governorate: govId })
    if (coordinates) { query.set('lat', String(coordinates.latitude)); query.set('lng', String(coordinates.longitude)) }
    fetch(`/api/drivers/available?${query.toString()}`, { credentials: 'include' })
      .then(async response => { const data = await response.json(); if (!response.ok) throw new Error(data.error || 'تعذر جلب السائقين'); setRankedDrivers(data.drivers || []) })
      .catch(err => { setRankedDrivers([]); setDriversError(err instanceof Error ? err.message : 'تعذر جلب السائقين') })
      .finally(() => setDriversLoading(false))
  }, [step, govId, coordinates])

  const canGoDetails = govId && cityId && (cityId === '__other__' ? customCity.trim().length > 1 : neighborhood || neighborhoods.length === 0)
  const canGoDrivers = placeName.trim().length > 1 && orderDetails.trim().length > 2

  const handleSubmit = async () => {
    if (!selectedDriver) return
    setSubmitError('')
    try {
      const address = [govName, cityName, neighborhood, landmark ? `بالقرب من ${landmark}` : '', coordinates ? `GPS: ${coordinates.latitude}, ${coordinates.longitude}` : '', placeName].filter(Boolean).join(' - ')
      const response = await fetch('/api/orders', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ driverId: selectedDriver, address, regionId: cityId, governorateId: govId, destinationLat: coordinates?.latitude, destinationLng: coordinates?.longitude, contactPhone: phone || undefined, notes: orderDetails, items: [] }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'تعذر إنشاء الطلب')
      setCreatedOrderId(data.order?.id || '')
      setSubmitted(true)
      window.setTimeout(() => navigate('/orders'), 2200)
    } catch (err) { setSubmitError(err instanceof Error ? err.message : 'تعذر إنشاء الطلب') }
  }

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold">تم إرسال طلبك!</h2>
        <p className="mt-2 text-surface-500">تم حفظ طلبك في قاعدة البيانات. سيتم تحديث حالته عند قبول السائق.</p>{createdOrderId && <p className="mt-3 text-xs text-surface-400">رقم الطلب: {createdOrderId.slice(0,8)}</p>}
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
                onChange={(e) => { setGovId(e.target.value); setCityId(''); setCustomCity(''); setNeighborhood('') }}
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
                  onChange={(e) => { setCityId(e.target.value); setCustomCity(''); setNeighborhood('') }}
                  className="input-field"
                >
                  <option value="">اختر المدينة أو القرية</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                  <option value="__other__">منطقة أو قرية غير مدرجة...</option>
                </select>
              </div>
            )}
            {cityId === '__other__' && (
              <Input label="اكتب اسم المنطقة أو القرية" placeholder="اسم المنطقة" value={customCity} onChange={(e) => setCustomCity(e.target.value)} />
            )}
            {cityId && cityId !== '__other__' && neighborhoods.length > 0 && (
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
            {cityId && (
              <Input label="بالقرب من (اختياري)" placeholder="مثلاً: بالقرب من مسجد، مدرسة، مستشفى أو دوّار" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
            )}
            <div className="border-t border-surface-100 pt-4">
              <WestBankMapPicker latitude={coordinates?.latitude ?? null} longitude={coordinates?.longitude ?? null} onChange={setCoordinates} />
            </div>
            {cityId && (
              <Input label="بالقرب من (اختياري)" placeholder="مثلاً: بالقرب من مسجد، مدرسة، مستشفى أو دوّار" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
            )}
            <div className="border-t border-surface-100 pt-4">
              <WestBankMapPicker
                latitude={coordinates?.latitude ?? null}
                longitude={coordinates?.longitude ?? null}
                onChange={setCoordinates}
              />
            </div>
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
              {neighborhood ? ` ← ${neighborhood}` : ''}{landmark ? ` • بالقرب من ${landmark}` : ''}{coordinates ? ` • GPS: ${coordinates.latitude.toFixed(5)}, ${coordinates.longitude.toFixed(5)}` : ''}{landmark ? ` • بالقرب من ${landmark}` : ''}{coordinates ? ` • GPS: ${coordinates.latitude.toFixed(5)}, ${coordinates.longitude.toFixed(5)}` : ''}
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
            {neighborhood ? ` / ${neighborhood}` : ''}{landmark ? ` • بالقرب من ${landmark}` : ''}{coordinates ? ` • تم تحديد GPS` : ''}{landmark ? ` • بالقرب من ${landmark}` : ''}{coordinates ? ` • تم تحديد GPS` : ''}
          </div>

          <h2 className="font-semibold">أفضل السائقين حسب مطابقة منطقتك</h2>
          <p className="text-xs text-surface-400">مرتّبين حسب: القرب + التقييم + التوفر</p>

          <div className="space-y-3">
            {driversLoading ? <div className="card py-8 text-center text-surface-500">جارٍ البحث عن السائقين المتصلين فعلياً...</div> : driversError ? <div className="card py-8 text-center text-red-500">{driversError}</div> : rankedDrivers.length === 0 ? (
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
                          متصل الآن
                        </span>
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-surface-500">
                        <span>{d.vehicle}</span>
                        <span className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          {Number(d.rating || 0).toFixed(1)}
                        </span>
                        <span>{d.distanceKm == null ? 'المسافة غير متاحة' : `${Number(d.distanceKm).toFixed(1)} كم`}</span>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-surface-400">متاح للطلب</div>
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

          {submitError && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{submitError}</p>}
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setStep('details')}>رجوع</Button>
            <Button className="w-full flex-[2]" disabled={!selectedDriver} onClick={handleSubmit}>تأكيد الطلب</Button>
          </div>
        </div>
      )}
    </div>
  )
}
