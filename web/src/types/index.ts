/**
 * Shared types for Talabe platform
 * These types are designed to be mirrored later in Flutter/Dart
 */

export type UserRole = 'user' | 'driver' | 'company' | 'employee';

export type SubscriptionPlan = {
  id: string;
  name: string;
  priceMonthly: number; // in ILS (شيقل)
  description: string;
  features: string[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  // For company employees
  companyId?: string;
  // Subscription status
  subscriptionActive?: boolean;
  subscriptionExpiresAt?: string;
};

export type Company = {
  id: string;
  name: string;
  type: 'restaurant' | 'supermarket' | 'shop' | 'car_dealership' | 'other';
  ownerId: string;
  employees: string[]; // user ids
  address?: string;
  phone?: string;
  logoUrl?: string;
  subscriptionActive: boolean;
  employeeCount: number;
};

export type DriverProfile = {
  userId: string;
  vehicleType: 'motorcycle' | 'car' | 'van' | 'bicycle';
  vehiclePlate?: string;
  isIndependent: boolean;
  companyId?: string;
  rating: number;
  totalDeliveries: number;
  isOnline: boolean;
  currentLocation?: {
    lat: number;
    lng: number;
  };
};

export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'picked_up'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled';

export type Order = {
  id: string;
  customerId: string;
  companyId: string;
  driverId?: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  deliveryFee: number;
  address: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

// Pricing constants (ILS)
export const PRICING = {
  DRIVER_INDEPENDENT: 35, // ₪ / month
  COMPANY_BASE: 30,       // ₪ / month
  COMPANY_PER_EMPLOYEE: 15, // ₪ / month per employee
} as const;
