import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { SplashScreen } from '@/components/SplashScreen'
import { Landing } from '@/pages/Landing'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { Destination } from '@/pages/Destination'
import { UserDashboard } from '@/pages/dashboards/UserDashboard'
import { DriverDashboard } from '@/pages/dashboards/DriverDashboard'
import { CompanyDashboard } from '@/pages/dashboards/CompanyDashboard'
import { useAuthStore } from '@/stores/authStore'

function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode
  allowedRoles?: string[]
}) {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/dashboard/${user.role}`} replace />
  }

  return <>{children}</>
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />
  }

  return (
    <div className="min-h-screen bg-surface-50 pb-24 md:pb-0">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/destination"
          element={
            <ProtectedRoute>
              <Destination />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/driver"
          element={
            <ProtectedRoute allowedRoles={['driver']}>
              <DriverDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/company"
          element={
            <ProtectedRoute allowedRoles={['company']}>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {isAuthenticated && <MobileBottomNav />}
    </div>
  )
}
