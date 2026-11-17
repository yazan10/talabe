import { useCallback, useRef, useState, ReactNode } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

interface PullToRefreshProps {
  children: ReactNode
  onRefresh?: () => Promise<void> | void
  /** max pull distance in px */
  maxPull?: number
  /** threshold to trigger refresh */
  threshold?: number
}

export function PullToRefresh({
  children,
  onRefresh,
  maxPull = 140,
  threshold = 72,
}: PullToRefreshProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const startY = useRef(0)
  const pulling = useRef(false)
  const [refreshing, setRefreshing] = useState(false)

  const pull = useMotionValue(0)
  const fabricHeight = useTransform(pull, [0, maxPull], [0, maxPull])
  const fabricScaleY = useTransform(pull, [0, maxPull], [0.2, 1])
  const fabricOpacity = useTransform(pull, [0, 20, maxPull], [0, 0.85, 1])
  const handY = useTransform(pull, [0, maxPull], [-40, 20])
  const handOpacity = useTransform(pull, [0, 30, maxPull], [0, 0.5, 1])
  const handScale = useTransform(pull, [0, maxPull], [0.6, 1])
  const spinnerOpacity = useTransform(pull, [threshold - 10, threshold], [0, 1])

  const canPull = () => {
    const el = containerRef.current
    if (!el) return false
    // only when scrolled to top
    return el.scrollTop <= 0
  }

  const onTouchStart = (e: React.TouchEvent) => {
    if (refreshing) return
    if (!canPull()) return
    startY.current = e.touches[0].clientY
    pulling.current = true
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!pulling.current || refreshing) return
    if (!canPull() && pull.get() === 0) {
      pulling.current = false
      return
    }
    const dy = e.touches[0].clientY - startY.current
    if (dy < 0) {
      pull.set(0)
      return
    }
    // rubber-band ease
    const resistance = 0.55
    const d = Math.min(maxPull, dy * resistance)
    pull.set(d)
    if (d > 8) {
      // prevent native overscroll bounce a bit
      e.preventDefault()
    }
  }

  const finish = useCallback(async () => {
    const current = pull.get()
    if (current >= threshold && onRefresh) {
      setRefreshing(true)
      await animate(pull, threshold * 0.7, { type: 'spring', stiffness: 300, damping: 28 })
      try {
        await onRefresh()
      } finally {
        await animate(pull, 0, { type: 'spring', stiffness: 280, damping: 26 })
        setRefreshing(false)
      }
    } else {
      await animate(pull, 0, { type: 'spring', stiffness: 320, damping: 28 })
    }
  }, [onRefresh, pull, threshold])

  const onTouchEnd = () => {
    if (!pulling.current) return
    pulling.current = false
    void finish()
  }

  return (
    <div
      ref={containerRef}
      className="relative h-full min-h-0 overflow-y-auto overscroll-y-contain"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* Stretch fabric + hand indicator (does not change page layout) */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-40 flex justify-center overflow-visible">
        <motion.div
          style={{ height: fabricHeight, opacity: fabricOpacity }}
          className="relative flex w-full max-w-lg items-end justify-center"
        >
          {/* Fabric / cloth stretch */}
          <motion.div
            style={{ scaleY: fabricScaleY, originY: 0 }}
            className="absolute inset-x-0 top-0 flex justify-center"
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 160"
              preserveAspectRatio="none"
              className="h-full w-full max-w-md"
            >
              <defs>
                <linearGradient id="fabricGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fff7ed" stopOpacity="0.95" />
                  <stop offset="55%" stopColor="#ffedd5" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#fdba74" stopOpacity="0.75" />
                </linearGradient>
              </defs>
              {/* wrinkled cloth shape */}
              <path
                d="M0,0 L400,0 L400,20 Q350,55 300,35 Q250,15 200,50 Q150,85 100,40 Q50,10 0,30 Z"
                fill="url(#fabricGrad)"
              />
              <path
                d="M20,0 Q80,40 140,18 Q200,60 260,22 Q320,50 380,12"
                fill="none"
                stroke="#fb923c"
                strokeWidth="1.2"
                strokeOpacity="0.35"
              />
              <path
                d="M40,0 Q100,50 160,28 Q220,70 280,30 Q340,55 380,20"
                fill="none"
                stroke="#f97316"
                strokeWidth="1"
                strokeOpacity="0.25"
              />
            </svg>
          </motion.div>

          {/* Hand pulling from top */}
          <motion.div
            style={{ y: handY, opacity: handOpacity, scale: handScale }}
            className="absolute top-1 z-10"
          >
            <svg width="56" height="64" viewBox="0 0 56 64" fill="none">
              {/* forearm */}
              <path
                d="M22 0 C24 12 26 22 28 30 C20 32 16 36 18 44 C22 52 30 54 36 48 C40 44 40 38 36 34 C38 28 40 18 38 0 Z"
                fill="#fdba74"
              />
              <path
                d="M28 30 C20 32 16 36 18 44 C22 52 30 54 36 48 C40 44 40 38 36 34"
                fill="#fb923c"
                fillOpacity="0.5"
              />
              {/* fingers grip */}
              <ellipse cx="24" cy="48" rx="5" ry="7" fill="#f97316" transform="rotate(-15 24 48)" />
              <ellipse cx="32" cy="50" rx="5" ry="7" fill="#ea580c" transform="rotate(8 32 50)" />
              <ellipse cx="38" cy="46" rx="4" ry="6" fill="#f97316" transform="rotate(20 38 46)" />
            </svg>
          </motion.div>

          {/* Spinner when past threshold / refreshing */}
          <motion.div
            style={{ opacity: refreshing ? 1 : spinnerOpacity }}
            className="absolute bottom-2"
          >
            <div
              className={`h-7 w-7 rounded-full border-2 border-brand-200 border-t-brand-500 ${
                refreshing ? 'animate-spin' : ''
              }`}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Content shifts slightly with pull */}
      <motion.div style={{ y: useTransform(pull, (v) => v * 0.35) }}>
        {children}
      </motion.div>
    </div>
  )
}
