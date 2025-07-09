'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeTransition() {
  const { theme } = useTheme()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    setIsTransitioning(true)
    
    // Add smooth transition class to document
    document.documentElement.style.setProperty('--theme-transition-active', '1')
    
    const timer = setTimeout(() => {
      setIsTransitioning(false)
      document.documentElement.style.removeProperty('--theme-transition-active')
    }, 600)
    
    return () => clearTimeout(timer)
  }, [theme, mounted])

  if (!mounted || !isTransitioning) return null

  return (
    <AnimatePresence>
      <motion.div
        key={`theme-transition-${theme}`}
        className="fixed inset-0 z-[9999] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        {/* Smooth circular transition overlay */}
        <motion.div
          className="absolute inset-0 bg-background"
          initial={{ 
            clipPath: 'circle(0% at 50% 50%)',
            opacity: 0.8
          }}
          animate={{ 
            clipPath: 'circle(150% at 50% 50%)',
            opacity: 0
          }}
          transition={{ 
            duration: 0.6, 
            ease: [0.23, 1, 0.32, 1] // Custom easing for smoother animation
          }}
        />
        
        {/* Subtle glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1.2 }}
          exit={{ opacity: 0, scale: 1.5 }}
          transition={{ 
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
