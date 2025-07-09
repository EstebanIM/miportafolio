'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  refresh?: boolean
}

export function Particles({
  className = '',
  quantity = 50,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<Particle[]>([])
  const animationFrame = useRef<number>()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d')
    }
    initCanvas()
    animate()

    const handleMouseMove = (e: MouseEvent) => {
      if (canvasContainerRef.current) {
        const rect = canvasContainerRef.current.getBoundingClientRect()
        mouse.current.x = e.clientX - rect.left
        mouse.current.y = e.clientY - rect.top
      }
    }

    const handleResize = () => {
      initCanvas()
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [quantity, staticity, ease, refresh])

  const initCanvas = () => {
    if (!canvasContainerRef.current || !canvasRef.current) return

    const rect = canvasContainerRef.current.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvasRef.current.width = rect.width * dpr
    canvasRef.current.height = rect.height * dpr
    canvasRef.current.style.width = `${rect.width}px`
    canvasRef.current.style.height = `${rect.height}px`

    if (context.current) {
      context.current.scale(dpr, dpr)
    }

    circles.current = []
    for (let i = 0; i < quantity; i++) {
      circles.current.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? '#3b82f6' : '#8b5cf6', // blue or purple
      })
    }
  }

  const animate = () => {
    if (!context.current || !canvasRef.current) return

    const { width, height } = canvasRef.current.getBoundingClientRect()

    context.current.clearRect(0, 0, width, height)

    circles.current.forEach((circle) => {
      // Actualizar posición
      circle.x += circle.speedX
      circle.y += circle.speedY

      // Rebotar en los bordes
      if (circle.x < 0 || circle.x > width) circle.speedX *= -1
      if (circle.y < 0 || circle.y > height) circle.speedY *= -1

      // Mantener dentro de los límites
      circle.x = Math.max(0, Math.min(width, circle.x))
      circle.y = Math.max(0, Math.min(height, circle.y))

      // Efecto de mouse (repulsión sutil)
      const distanceToMouse = Math.sqrt(
        Math.pow(circle.x - mouse.current.x, 2) + Math.pow(circle.y - mouse.current.y, 2)
      )

      if (distanceToMouse < 100) {
        const angle = Math.atan2(circle.y - mouse.current.y, circle.x - mouse.current.x)
        const force = (100 - distanceToMouse) / 100
        circle.x += Math.cos(angle) * force * 0.2
        circle.y += Math.sin(angle) * force * 0.2
      }

      // Dibujar partícula
      if (context.current) {
        context.current.beginPath()
        context.current.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2)
        context.current.fillStyle = `${circle.color}${Math.floor(circle.opacity * 255).toString(16).padStart(2, '0')}`
        context.current.fill()

        // Agregar un glow sutil
        context.current.shadowColor = circle.color
        context.current.shadowBlur = 10
        context.current.fill()
        context.current.shadowBlur = 0
      }
    })

    // Conectar partículas cercanas con líneas
    circles.current.forEach((circle, i) => {
      circles.current.slice(i + 1).forEach((otherCircle) => {
        const distance = Math.sqrt(
          Math.pow(circle.x - otherCircle.x, 2) + Math.pow(circle.y - otherCircle.y, 2)
        )

        if (distance < 80) {
          if (context.current) {
            context.current.beginPath()
            context.current.moveTo(circle.x, circle.y)
            context.current.lineTo(otherCircle.x, otherCircle.y)
            context.current.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 80)})`
            context.current.lineWidth = 0.5
            context.current.stroke()
          }
        }
      })
    })

    animationFrame.current = requestAnimationFrame(animate)
  }

  return (
    <div
      ref={canvasContainerRef}
      className={`absolute inset-0 ${className}`}
      style={{ pointerEvents: 'none' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}
