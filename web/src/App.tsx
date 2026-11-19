import { useState, useCallback, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { PageTransition } from '@/components/layout/PageTransition'
import { PullToRefresh } from '@/components/PullToRefresh'
import { SplashScreen } from '@/components/SplashScreen'
import { Landing } from '@/pages/Landing'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { Destination } from '@/pages/Destination'
import { Orders } from '@/pages/Orders'
import { NewOrder } from '@/pages/NewOrder'
import { Profile } from '@/pages/Profile'
import { Wallet } from '@/pages/Wallet'
import { Employees } from '@/pages/Employees'
import { Addresses } from '@/pages/Addresses'
import { PaymentMethods } from '@/pages/PaymentMethods'
import { Notifications } from '@/pages/Notifications'
import { PrivacySecurity } from '@/pages/PrivacySecurity'
import { Settings } from '@/pages/Settings'
import { RateDriver } from '@/pages/RateDriver'
import { Following } from '@/pages/Following'
import { UserDashboard } from '@/pages/dashboards/UserDashboard'
import { DriverDashboard } from '@/pages/dashboards/DriverDashboard'
import { CompanyDashboard } from '@/pages/dashboards/CompanyDashboard'
import { useAuthStore } from '@/stores/authStore'

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (allowedRoles && user && !allowedRoles.includes(user.role)) return <Navigate to={`/dashboard/${user.role}`} replace />
  return <>{children}</>
}

function AnimatedRoutes() {
  const location = useLocation()
  return <AnimatePresence mode="wait"><Routes location={location} key={location.pathname}>
    <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
    <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
    <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
    <Route path="/destination" element={<ProtectedRoute><PageTransition><Destination /></PageTransition></ProtectedRoute>} />
    <Route path="/orders" element={<ProtectedRoute><PageTransition><Orders /></PageTransition></ProtectedRoute>} />
    <Route path="/orders/new" element={<ProtectedRoute><PageTransition><NewOrder /></PageTransition></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><PageTransition><Profile /></PageTransition></ProtectedRoute>} />
    <Route path="/wallet" element={<ProtectedRoute><PageTransition><Wallet /></PageTransition></ProtectedRoute>} />
    <Route path="/employees" element={<ProtectedRoute><PageTransition><Employees /></PageTransition></ProtectedRoute>} />
    <Route path="/addresses" element={<ProtectedRoute><PageTransition><Addresses /></PageTransition></ProtectedRoute>} />
    <Route path="/payment-methods" element={<ProtectedRoute><PageTransition><PaymentMethods /></PageTransition></ProtectedRoute>} />
    <Route path="/notifications" element={<ProtectedRoute><PageTransition><Notifications /></PageTransition></ProtectedRoute>} />
    <Route path="/privacy-security" element={<ProtectedRoute><PageTransition><PrivacySecurity /></PageTransition></ProtectedRoute>} />
    <Route path="/settings" element={<ProtectedRoute><PageTransition><Settings /></PageTransition></ProtectedRoute>} />
    <Route path="/rate" element={<ProtectedRoute><PageTransition><RateDriver /></PageTransition></ProtectedRoute>} />
    <Route path="/following" element={<ProtectedRoute><PageTransition><Following /></PageTransition></ProtectedRoute>} />
    <Route path="/dashboard/user" element={<ProtectedRoute allowedRoles={['user']}><PageTransition><UserDashboard /></PageTransition></ProtectedRoute>} />
    <Route path="/dashboard/driver" element={<ProtectedRoute allowedRoles={['driver']}><PageTransition><DriverDashboard /></PageTransition></ProtectedRoute>} />
    <Route path="/dashboard/company" element={<ProtectedRoute allowedRoles={['company']}><PageTransition><CompanyDashboard /></PageTransition></ProtectedRoute>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></AnimatePresence>
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const refreshSession = useAuthStore((s) => s.refreshSession)
  useEffect(() => { void refreshSession() }, [refreshSession])
  const handleRefresh = useCallback(async () => { setRefreshKey(k => k + 1) }, [])
  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />
  return <div className="flex min-h-screen flex-col bg-surface-50 pb-24 md:pb-0"><Navbar /><PullToRefresh onRefresh={handleRefresh}><div key={refreshKey}><AnimatedRoutes /></div></PullToRefresh>{isAuthenticated && <MobileBottomNav />}</div>
}