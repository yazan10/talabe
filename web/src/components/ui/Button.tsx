import { ButtonHTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'white'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  loading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  loading,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-200 ease-out active:scale-[0.96] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100'

  const variants = {
    primary:
      'bg-brand-500 text-white shadow-brand hover:bg-brand-600 hover:shadow-lg hover:-translate-y-0.5',
    secondary:
      'border border-surface-200 bg-white text-surface-800 shadow-sm hover:bg-surface-50 hover:border-brand-200 hover:-translate-y-0.5',
    ghost: 'text-surface-700 hover:bg-surface-100',
    danger: 'bg-red-500 text-white hover:bg-red-600 hover:-translate-y-0.5',
    white:
      'bg-white text-brand-600 shadow-md hover:bg-brand-50 hover:shadow-lg hover:-translate-y-0.5',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  )
}
