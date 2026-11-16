import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SplashScreenProps {
  onFinish: () => void
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer)
          setTimeout(onFinish, 400)
          return 100
        }
        return p + 4
      })
    }, 50)

    return () => clearInterval(timer)
  }, [onFinish])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-brand-500 via-brand-600 to-brand-700"
      >
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="relative"
        >
          {/* Triangle background */}
          <svg width="140" height="140" viewBox="0 0 140 140" className="drop-shadow-2xl">
            <defs>
              <linearGradient id="triGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
            <motion.polygon
              points="70,10 130,120 10,120"
              fill="url(#triGrad)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2 }}
            />
            {/* Bike + rider simplified */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {/* Wheels */}
              <circle cx="45" cy="95" r="12" fill="white" opacity="0.95" />
              <circle cx="95" cy="95" r="12" fill="white" opacity="0.95" />
              <circle cx="45" cy="95" r="5" fill="#ea580c" />
              <circle cx="95" cy="95" r="5" fill="#ea580c" />
              {/* Frame */}
              <path d="M45 95 L70 60 L95 95 M70 60 L70 45" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
              {/* Rider */}
              <circle cx="70" cy="38" r="8" fill="white" />
              <path d="M70 46 L70 65" stroke="white" strokeWidth="3" />
            </motion.g>
          </svg>
        </motion.div>

        {/* App name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-4xl font-extrabold tracking-tight text-white"
        >
          طلبي
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-2 text-brand-100"
        >
          منصة التوصيل الذكية
        </motion.p>

        {/* Progress bar */}
        <div className="mt-12 w-48 overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-1.5 rounded-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>

        {/* Powered by */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 text-center"
        >
          <p className="text-xs text-white/70">مشغّل بواسطة</p>
          <p className="mt-0.5 text-sm font-semibold text-white">وسيطي</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
