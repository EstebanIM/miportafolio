'use client'

import { useEffect, useRef } from 'react'

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  color?: string
}

export function Particles({
  className = '',
  quantity = 50,
  staticity = 80, // Increased default for more fluid movement
  ease = 60, // Adjusted for better base speed
  color = '#ffffff',
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Particle class
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      opacity: number
      baseVx: number
      baseVy: number

      constructor() {
        this.x = Math.random() * (canvas?.width || 0)
        this.y = Math.random() * (canvas?.height || 0)
        
        // Improved velocity calculation for better movement
        const speed = (ease / 100) * 2
        this.baseVx = (Math.random() - 0.5) * speed
        this.baseVy = (Math.random() - 0.5) * speed
        this.vx = this.baseVx
        this.vy = this.baseVy
        
        this.radius = Math.random() * 4 + 1.5
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        // Move particles
        this.x += this.vx
        this.y += this.vy

        // Apply staticity as a damping factor (more subtle)
        const dampingFactor = 1 - (1 - staticity / 100) * 0.01
        this.vx *= dampingFactor
        this.vy *= dampingFactor

        // Prevent particles from stopping completely
        const minSpeed = 0.1
        if (Math.abs(this.vx) < minSpeed) {
          this.vx = this.baseVx * 0.5
        }
        if (Math.abs(this.vy) < minSpeed) {
          this.vy = this.baseVy * 0.5
        }

        // Handle edge bouncing with proper boundary detection
        const canvasWidth = canvas?.width || 0
        const canvasHeight = canvas?.height || 0

        if (this.x <= 0) {
          this.x = 0
          this.vx = Math.abs(this.vx)
        }
        if (this.x >= canvasWidth) {
          this.x = canvasWidth
          this.vx = -Math.abs(this.vx)
        }
        if (this.y <= 0) {
          this.y = 0
          this.vy = Math.abs(this.vy)
        }
        if (this.y >= canvasHeight) {
          this.y = canvasHeight
          this.vy = -Math.abs(this.vy)
        }
      }

      draw() {
        if (!ctx) return

        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Create particles
    const particles: Particle[] = []
    for (let i = 0; i < quantity; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    let frameCount = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.update()
        particle.draw()

        // Regenerate particles occasionally to maintain movement
        if (frameCount % 600 === 0 && Math.random() < 0.1) {
          particles[index] = new Particle()
        }
      })

      frameCount++
      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationId)
    }
  }, [quantity, staticity, ease, color])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  )
}
