import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/Button'
import { LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-surface-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-lg font-bold text-white shadow-brand">
            ط
          </div>
          <span className="text-xl font-bold text-surface-900">طلبي</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/#features" className="text-sm font-medium text-surface-600 hover:text-brand-600">
            المميزات
          </Link>
          <Link to="/#pricing" className="text-sm font-medium text-surface-600 hover:text-brand-600">
            الأسعار
          </Link>
          <Link to="/#how" className="text-sm font-medium text-surface-600 hover:text-brand-600">
            كيف يعمل
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to={`/dashboard/${user?.role}`}
                className="text-sm font-medium text-brand-600"
              >
                لوحة التحكم
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                خروج
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  دخول
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">سجّل الآن</Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden rounded-xl p-2 hover:bg-surface-100"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-surface-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link to="/#features" onClick={() => setOpen(false)} className="py-2 text-sm font-medium">
              المميزات
            </Link>
            <Link to="/#pricing" onClick={() => setOpen(false)} className="py-2 text-sm font-medium">
              الأسعار
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to={`/dashboard/${user?.role}`}
                  onClick={() => setOpen(false)}
                  className="py-2 text-sm font-medium text-brand-600"
                >
                  لوحة التحكم
                </Link>
                <Button variant="ghost" onClick={handleLogout}>
                  خروج
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button variant="secondary" className="w-full">
                    دخول
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setOpen(false)}>
                  <Button className="w-full">سجّل الآن</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
