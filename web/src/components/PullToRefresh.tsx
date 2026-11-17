import { useCallback, useRef, useState, ReactNode } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

interface PullToRefreshProps {
  children: ReactNode
  onRefresh?: () => Promise<void> | void
  maxPull?: number
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
  const fabricScaleY = useTransform(pull, [0, maxPull], [0.25, 1])
  const fabricOpacity = useTransform(pull, [0, 16, maxPull], [0, 0.9, 1])
  const handY = useTransform(pull, [0, maxPull], [-36, 18])
  const handOpacity = useTransform(pull, [0, 24, maxPull], [0, 0.6, 1])
  const handScale = useTransform(pull, [0, maxPull], [0.55, 1])
  const spinnerOpacity = useTransform(pull, [threshold - 12, threshold], [0, 1])
  const contentY = useTransform(pull, (v) => v * 0.32)

  const canPull = () => {
    const el = containerRef.current
    if (!el) return false
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
    const resistance = 0.52
    const d = Math.min(maxPull, dy * resistance)
    pull.set(d)
  }

  const finish = useCallback(async () => {
    const current = pull.get()
    if (current >= threshold && onRefresh) {
      setRefreshing(true)
      await animate(pull, Math.max(48, threshold * 0.65), {
        type: 'spring',
        stiffness: 300,
        damping: 28,
      })
      try {
        await Promise.resolve(onRefresh())
        // small delay so user sees the spinner
        await new Promise((r) => setTimeout(r, 450))
      } finally {
        await animate(pull, 0, { type: 'spring', stiffness: 280, damping: 26 })
        setRefreshing(false)
      }
    } else {
      await animate(pull, 0, { type: 'spring', stiffness: 340, damping: 30 })
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
      className="relative min-h-0 flex-1 overflow-y-auto overscroll-y-contain"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* Stretch fabric + hand — overlay only, no layout change */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-40 flex justify-center overflow-visible">
        <motion.div
          style={{ height: fabricHeight, opacity: fabricOpacity }}
          className="relative flex w-full max-w-lg items-end justify-center"
        >
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
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
                  <stop offset="40%" stopColor="#fff7ed" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#fdba74" stopOpacity="0.7" />
                </linearGradient>
              </defs>
              <path
                d="M0,0 L400,0 L400,18 Q355,58 300,32 Q250,12 200,52 Q150,90 100,38 Q48,8 0,28 Z"
                fill="url(#fabricGrad)"
              />
              <path
                d="M15,0 Q80,42 140,16 Q200,62 265,20 Q330,52 390,10"
                fill="none"
                stroke="#fb923c"
                strokeWidth="1.3"
                strokeOpacity="0.4"
              />
              <path
                d="M35,0 Q100,52 165,26 Q225,72 290,28 Q350,55 385,18"
                fill="none"
                stroke="#f97316"
                strokeWidth="1"
                strokeOpacity="0.28"
              />
            </svg>
          </motion.div>

          <motion.div
            style={{ y: handY, opacity: handOpacity, scale: handScale }}
            className="absolute top-0 z-10"
          >
            <svg width="58" height="66" viewBox="0 0 58 66" fill="none">
              <path
                d="M23 0 C25 14 27 24 29 32 C21 34 17 38 19 46 C23 55 32 57 38 50 C42 46 42 40 38 35 C40 28 42 16 40 0 Z"
                fill="#fdba74"
              />
              <path
                d="M29 32 C21 34 17 38 19 46 C23 55 32 57 38 50 C42 46 42 40 38 35"
                fill="#fb923c"
                fillOpacity="0.55"
              />
              <ellipse cx="25" cy="50" rx="5.5" ry="7.5" fill="#f97316" transform="rotate(-12 25 50)" />
              <ellipse cx="33" cy="52" rx="5.5" ry="7.5" fill="#ea580c" transform="rotate(6 33 52)" />
              <ellipse cx="40" cy="48" rx="4.5" ry="6.5" fill="#f97316" transform="rotate(18 40 48)" />
            </svg>
          </motion.div>

          <motion.div style={{ opacity: refreshing ? 1 : spinnerOpacity }} className="absolute bottom-1.5">
            <div
              className={`h-7 w-7 rounded-full border-2 border-brand-200 border-t-brand-500 ${
                refreshing ? 'animate-spin' : ''
              }`}
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div style={{ y: contentY }}>{children}</motion.div>
    </div>
  )
}
