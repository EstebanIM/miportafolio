'use client'

import { useEffect, useState } from 'react'

interface RippleProps {
  duration?: number
}

interface RippleEffect {
  key: number
  x: number
  y: number
  size: number
}

export function Ripple({ duration = 600 }: RippleProps) {
  const [ripples, setRipples] = useState<RippleEffect[]>([])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2
      
      const newRipple: RippleEffect = {
        key: Date.now(),
        x,
        y,
        size,
      }

      setRipples(prev => [...prev, newRipple])

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.key !== newRipple.key))
      }, duration)
    }

    // Find all elements with ripple class
    const rippleElements = document.querySelectorAll('.ripple-effect')
    
    rippleElements.forEach(element => {
      element.addEventListener('click', handleClick as EventListener)
    })

    return () => {
      rippleElements.forEach(element => {
        element.removeEventListener('click', handleClick as EventListener)
      })
    }
  }, [duration])

  return (
    <span className="absolute inset-0 overflow-hidden rounded-inherit pointer-events-none">
      {ripples.map(ripple => (
        <span
          key={ripple.key}
          className="absolute rounded-full bg-current opacity-25 animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            transform: 'scale(0)',
            animationDuration: `${duration}ms`,
          }}
        />
      ))}
    </span>
  )
}
