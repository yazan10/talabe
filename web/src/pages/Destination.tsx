import { useState } from 'react'
import { MapPin, Search, Navigation } from 'lucide-react'
import { governorates, getCitiesByGovernorate, type Region } from '@/data/westBankRegions'
import { Button } from '@/components/ui/Button'
import { clsx } from 'clsx'

export function Destination() {
  const [selectedGov, setSelectedGov] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<Region | null>(null)
  const [search, setSearch] = useState('')

  const cities = selectedGov ? getCitiesByGovernorate(selectedGov) : []
  const filteredCities = cities.filter(
    (c) =>
      c.name.includes(search) ||
      c.nameEn.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-3xl px-4 pb-28 pt-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-surface-900">وجهتي</h1>
        <p className="mt-1 text-surface-500">اختر منطقتك في الضفة الغربية</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-400" />
        <input
          type="text"
          placeholder="ابحث عن مدينة أو قرية..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pr-12"
        />
      </div>

      {/* Map placeholder - stylized West Bank */}
      <div className="card mb-6 overflow-hidden p-0">
        <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200">
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <path
                d="M60 30 L90 20 L120 35 L140 50 L150 80 L145 110 L130 140 L100 160 L70 150 L50 120 L40 80 L45 50 Z"
                fill="#f97316"
                opacity="0.4"
              />
            </svg>
          </div>
          <div className="relative z-10 text-center">
            <Navigation className="mx-auto h-10 w-10 text-brand-600" />
            <p className="mt-2 font-semibold text-brand-800">خريطة الضفة الغربية</p>
            <p className="text-sm text-brand-600">
              {selectedCity
                ? selectedCity.name
                : selectedGov
                  ? governorates.find((g) => g.id === selectedGov)?.name
                  : 'اختر محافظة أولاً'}
            </p>
          </div>
        </div>
      </div>

      {/* Governorates */}
      <h2 className="mb-3 text-sm font-semibold text-surface-600">المحافظات</h2>
      <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {governorates.map((gov) => (
          <button
            key={gov.id}
            onClick={() => {
              setSelectedGov(gov.id)
              setSelectedCity(null)
              setSearch('')
            }}
            className={clsx(
              'rounded-2xl border-2 px-3 py-3 text-sm font-medium transition-all',
              selectedGov === gov.id
                ? 'border-brand-500 bg-brand-50 text-brand-700'
                : 'border-surface-100 bg-white text-surface-700 hover:border-brand-200'
            )}
          >
            {gov.name}
          </button>
        ))}
      </div>

      {/* Cities & Villages */}
      {selectedGov && (
        <>
          <h2 className="mb-3 text-sm font-semibold text-surface-600">
            المدن والقرى — {governorates.find((g) => g.id === selectedGov)?.name}
          </h2>
          <div className="space-y-2">
            {filteredCities.length === 0 ? (
              <p className="py-6 text-center text-sm text-surface-400">لا توجد نتائج</p>
            ) : (
              filteredCities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => setSelectedCity(city)}
                  className={clsx(
                    'flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-right transition-all',
                    selectedCity?.id === city.id
                      ? 'border-brand-500 bg-brand-50'
                      : 'border-surface-100 bg-white hover:border-brand-200'
                  )}
                >
                  <MapPin
                    className={clsx(
                      'h-5 w-5',
                      selectedCity?.id === city.id ? 'text-brand-500' : 'text-surface-400'
                    )}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{city.name}</div>
                    <div className="text-xs text-surface-400">
                      {city.type === 'city' ? 'مدينة' : 'قرية'}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {selectedCity && (
            <div className="mt-6">
              <Button className="w-full">
                تأكيد الوجهة: {selectedCity.name}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
