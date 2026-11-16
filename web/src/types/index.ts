/**
 * Shared types for Talabe platform
 * These types are designed to be mirrored later in Flutter/Dart
 */

export type UserRole = 'user' | 'driver' | 'company' | 'employee'

export type VehicleType = 'motorcycle' | 'car' | 'scooter' | 'electric_bike'

export type SubscriptionPlan = {
  id: string
  name: string
  priceMonthly: number // in ILS (شيقل)
  description: string
  features: string[]
}

export type User = {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  avatarUrl?: string
  createdAt: string
  companyId?: string
  subscriptionActive?: boolean
  subscriptionExpiresAt?: string
  vehicleType?: VehicleType
  licenseVerified?: boolean
  regionId?: string
  governorateId?: string
}

export type Company = {
  id: string
  name: string
  type: 'restaurant' | 'supermarket' | 'shop' | 'car_dealership' | 'other'
  ownerId: string
  employees: string[]
  address?: string
  phone?: string
  logoUrl?: string
  subscriptionActive: boolean
  employeeCount: number
  regionId?: string
}

export type DriverProfile = {
  userId: string
  vehicleType: VehicleType
  vehiclePlate?: string
  isIndependent: boolean
  companyId?: string
  rating: number
  totalDeliveries: number
  isOnline: boolean
  licenseImageUrl?: string
  licenseVerified: boolean
  regionId?: string
  currentLocation?: {
    lat: number
    lng: number
  }
}

export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'picked_up'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled'

export type Order = {
  id: string
  customerId: string
  companyId: string
  driverId?: string
  status: OrderStatus
  items: OrderItem[]
  totalAmount: number
  deliveryFee: number
  address: string
  regionId?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export type OrderItem = {
  id: string
  name: string
  quantity: number
  price: number
}

export const PRICING = {
  DRIVER_INDEPENDENT: 35,
  COMPANY_BASE: 30,
  COMPANY_PER_EMPLOYEE: 15,
} as const

export const VEHICLE_TYPES: { id: VehicleType; label: string; icon: string }[] = [
  { id: 'motorcycle', label: 'دراجة نارية', icon: '🏍️' },
  { id: 'car', label: 'سيارة', icon: '🚗' },
  { id: 'scooter', label: 'سكوتر كهربائي', icon: '🛵' },
  { id: 'electric_bike', label: 'دراجة كهربائية', icon: '🚲' },
]
