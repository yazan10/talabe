import { Star } from 'lucide-react'
import { clsx } from 'clsx'

interface RatingStarsProps {
  value: number
  onChange?: (v: number) => void
  size?: 'sm' | 'md' | 'lg'
  readonly?: boolean
}

const sizes = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-8 w-8' }

export function RatingStars({ value, onChange, size = 'md', readonly }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={readonly || !onChange}
          onClick={() => onChange?.(n)}
          className={clsx(
            'transition-transform',
            !readonly && onChange && 'active:scale-90 hover:scale-110'
          )}
        >
          <Star
            className={clsx(
              sizes[size],
              n <= value
                ? 'fill-amber-400 text-amber-400'
                : 'text-surface-300'
            )}
          />
        </button>
      ))}
    </div>
  )
}
