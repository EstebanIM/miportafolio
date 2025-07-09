'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

interface ScrollProgressProps {
  className?: string
  showPercentage?: boolean
}

export function ScrollProgress({ className = '', showPercentage = false }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <>
      {/* Barra de progreso principal */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left z-50 ${className}`}
        style={{ scaleX }}
      />
      
      {/* Indicador de porcentaje (opcional) */}
      {showPercentage && (
        <motion.div
          className="fixed top-4 right-4 bg-background/80 backdrop-blur-sm border border-border/40 rounded-full px-3 py-1 text-sm font-medium z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.span>
            {scrollYProgress.get() ? Math.round(scrollYProgress.get() * 100) : 0}%
          </motion.span>
        </motion.div>
      )}
    </>
  )
}
