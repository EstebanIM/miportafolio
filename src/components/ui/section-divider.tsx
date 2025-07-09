'use client'

import { motion } from 'framer-motion'

interface SectionDividerProps {
  variant?: 'wave' | 'diagonal' | 'curve' | 'zigzag'
  className?: string
  flip?: boolean
}

export function SectionDivider({ 
  variant = 'wave', 
  className = '',
  flip = false 
}: SectionDividerProps) {
  const paths = {
    wave: "M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
    diagonal: "M0,0L1440,64L1440,0Z",
    curve: "M0,0C480,64,960,64,1440,0L1440,0L0,0Z",
    zigzag: "M0,0L72,32L144,0L216,32L288,0L360,32L432,0L504,32L576,0L648,32L720,0L792,32L864,0L936,32L1008,0L1080,32L1152,0L1224,32L1296,0L1368,32L1440,0L1440,0L0,0Z"
  }

  return (
    <div className={`relative ${className}`}>
      <motion.svg
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        viewport={{ once: true }}
        className={`w-full h-16 fill-background ${flip ? 'rotate-180' : ''}`}
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
      >
        <path d={paths[variant]} />
      </motion.svg>
    </div>
  )
}
