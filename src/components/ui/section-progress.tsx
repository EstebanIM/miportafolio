'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface SectionProgressProps {
  children: React.ReactNode
  className?: string
  sectionId?: string
}

export function SectionProgress({ children, className = '', sectionId }: SectionProgressProps) {
  const ref = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <motion.section
      ref={ref}
      className={`relative ${className}`}
      style={{ opacity, scale, y }}
      data-section={sectionId}
    >
      {children}
      
      {/* Indicador de progreso de la sección */}
      <motion.div
        className="absolute left-4 top-1/2 -translate-y-1/2 w-1 h-20 bg-border/20 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full bg-gradient-to-b from-primary to-secondary rounded-full"
          style={{
            height: useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"])
          }}
        />
      </motion.div>
    </motion.section>
  )
}
