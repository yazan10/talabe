/**
 * خوارزمية مطابقة السائقين
 * عوامل: متصل، نفس المحافظة، التقييم، المسافة، نوع المركبة، عدد الطلبات النشطة
 */

export type MatchableDriver = {
  id: string
  name: string
  vehicle: string
  vehicleType: 'motorcycle' | 'car' | 'scooter' | 'electric_bike'
  rating: number
  totalRatings: number
  distanceKm: number
  fee: number
  online: boolean
  governorateId: string
  activeOrders: number
  completedToday: number
}

export type MatchContext = {
  governorateId: string
  preferredVehicle?: string
  maxDistanceKm?: number
}

export function scoreDriver(driver: MatchableDriver, ctx: MatchContext): number {
  if (!driver.online) return -1

  let score = 0

  // نفس المحافظة
  if (driver.governorateId === ctx.governorateId) score += 40
  else score += 5

  // التقييم (0-5) → حتى 25 نقطة
  score += (driver.rating / 5) * 25

  // المسافة: أقرب = أعلى (حتى 20)
  const maxD = ctx.maxDistanceKm ?? 15
  if (driver.distanceKm <= maxD) {
    score += 20 * (1 - driver.distanceKm / maxD)
  } else {
    score -= 10
  }

  // عبء العمل: أقل طلبات نشطة = أفضل (حتى 10)
  score += Math.max(0, 10 - driver.activeOrders * 3)

  // إنجازات اليوم (خبرة/نشاط) حتى 5
  score += Math.min(5, driver.completedToday * 0.5)

  // تفضيل نوع المركبة
  if (ctx.preferredVehicle && driver.vehicleType === ctx.preferredVehicle) {
    score += 8
  }

  // ثقة التقييم: عدد التقييمات
  if (driver.totalRatings >= 20) score += 5
  else if (driver.totalRatings >= 5) score += 2

  return Math.round(score * 10) / 10
}

export function matchDrivers(
  drivers: MatchableDriver[],
  ctx: MatchContext
): (MatchableDriver & { matchScore: number })[] {
  return drivers
    .map((d) => ({ ...d, matchScore: scoreDriver(d, ctx) }))
    .filter((d) => d.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
}

/** بيانات تجريبية لسائقين في محافظات مختلفة */
export const DEMO_DRIVERS: MatchableDriver[] = [
  { id: '1', name: 'محمد السائق', vehicle: 'دراجة نارية', vehicleType: 'motorcycle', rating: 4.9, totalRatings: 120, distanceKm: 0.8, fee: 10, online: true, governorateId: 'ramallah', activeOrders: 0, completedToday: 7 },
  { id: '2', name: 'خالد أبو عودة', vehicle: 'سيارة', vehicleType: 'car', rating: 4.7, totalRatings: 85, distanceKm: 1.2, fee: 15, online: true, governorateId: 'ramallah', activeOrders: 1, completedToday: 5 },
  { id: '3', name: 'يوسف الخطيب', vehicle: 'سكوتر كهربائي', vehicleType: 'scooter', rating: 4.8, totalRatings: 40, distanceKm: 2.1, fee: 12, online: true, governorateId: 'ramallah', activeOrders: 0, completedToday: 4 },
  { id: '4', name: 'أحمد نمر', vehicle: 'دراجة كهربائية', vehicleType: 'electric_bike', rating: 4.5, totalRatings: 22, distanceKm: 3.0, fee: 8, online: true, governorateId: 'nablus', activeOrders: 0, completedToday: 3 },
  { id: '5', name: 'سامي قاسم', vehicle: 'دراجة نارية', vehicleType: 'motorcycle', rating: 4.6, totalRatings: 60, distanceKm: 1.5, fee: 11, online: true, governorateId: 'hebron', activeOrders: 2, completedToday: 6 },
  { id: '6', name: 'فادي منصور', vehicle: 'سيارة', vehicleType: 'car', rating: 4.9, totalRatings: 200, distanceKm: 0.5, fee: 14, online: true, governorateId: 'jenin', activeOrders: 0, completedToday: 9 },
  { id: '7', name: 'رامي حسن', vehicle: 'دراجة نارية', vehicleType: 'motorcycle', rating: 4.3, totalRatings: 15, distanceKm: 4.2, fee: 10, online: false, governorateId: 'ramallah', activeOrders: 0, completedToday: 0 },
]
