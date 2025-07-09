'use client'

import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { useAnalytics } from '@/lib/analytics'

interface ViewCounterProps {
  className?: string
  showIcon?: boolean
  animated?: boolean
}

export function ViewCounter({ 
  className = '', 
  showIcon = true, 
  animated = true 
}: ViewCounterProps) {
  const analytics = useAnalytics()

  const counter = animated ? (
    <motion.span
      key={analytics.pageViews}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="font-mono"
    >
      {analytics.pageViews.toLocaleString()}
    </motion.span>
  ) : (
    <span className="font-mono">{analytics.pageViews.toLocaleString()}</span>
  )

  return (
    <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
      {showIcon && <Eye className="h-4 w-4" />}
      <span>Visitas: {counter}</span>
    </div>
  )
}
