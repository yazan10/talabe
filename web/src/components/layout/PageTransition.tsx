import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

const pageVariants = {
  initial: {
    opacity: 0,
    filter: 'blur(8px)',
    y: 12,
  },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
  },
  exit: {
    opacity: 0,
    filter: 'blur(6px)',
    y: -8,
  },
}

const pageTransition = {
  type: 'tween' as const,
  ease: 'easeInOut',
  duration: 0.35,
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-[calc(100vh-4rem)]"
    >
      {children}
    </motion.div>
  )
}
