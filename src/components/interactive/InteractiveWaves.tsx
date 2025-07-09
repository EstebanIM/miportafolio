'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, MousePointer, Info, Palette, Waves, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface InteractiveWavesProps {
  onClose: () => void
}

interface Skill {
  name: string
  x: number
  y: number
  targetX: number
  targetY: number
  color: string
  size: number
  isHovered: boolean
  pulse: number
  angle: number
  radius: number
  category: 'frontend' | 'backend' | 'tools' | 'language'
  description: string
  experience: string
  projects: string[]
  vx: number
  vy: number
  isVisible: boolean
  animationDelay: number
}

interface WavePoint {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  intensity: number
}

export function InteractiveWaves({ onClose }: InteractiveWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const skillsRef = useRef<Skill[]>([])
  const wavesRef = useRef<WavePoint[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const timeRef = useRef(0)
  
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [colorScheme, setColorScheme] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'frontend' | 'backend' | 'tools' | 'language'>('all')
  const [isSoundEnabled, setIsSoundEnabled] = useState(true)
  const [autoRotate, setAutoRotate] = useState(true)

  const skills = useMemo(() => [
    { name: 'React', category: 'frontend' as const, description: 'Biblioteca para crear interfaces de usuario interactivas', experience: '3+ años', projects: ['Portafolio Personal', 'Dashboard Admin', 'E-commerce'] },
    { name: 'Next.js', category: 'frontend' as const, description: 'Framework de React para aplicaciones web modernas', experience: '2+ años', projects: ['Portafolio Personal', 'Blog Corporativo'] },
    { name: 'TypeScript', category: 'language' as const, description: 'JavaScript con tipado estático para mayor robustez', experience: '2+ años', projects: ['Múltiples proyectos', 'APIs REST'] },
    { name: 'JavaScript', category: 'language' as const, description: 'Lenguaje de programación versátil para web', experience: '4+ años', projects: ['Aplicaciones Web', 'Automatización'] },
    { name: 'Three.js', category: 'frontend' as const, description: 'Biblioteca para gráficos 3D en navegadores', experience: '1+ año', projects: ['Visualizaciones 3D', 'Experiencias Interactivas'] },
    { name: 'Node.js', category: 'backend' as const, description: 'Entorno de ejecución para JavaScript en servidor', experience: '3+ años', projects: ['APIs REST', 'Microservicios'] },
    { name: 'Python', category: 'language' as const, description: 'Lenguaje versátil para desarrollo y análisis', experience: '3+ años', projects: ['Análisis de Datos', 'Automatización'] },
    { name: 'Git', category: 'tools' as const, description: 'Sistema de control de versiones distribuido', experience: '4+ años', projects: ['Todos los proyectos'] },
    { name: 'CSS', category: 'frontend' as const, description: 'Hojas de estilo para diseño web', experience: '4+ años', projects: ['Sitios Web', 'Componentes UI'] },
    { name: 'HTML', category: 'frontend' as const, description: 'Lenguaje de marcado para estructura web', experience: '4+ años', projects: ['Sitios Web', 'Aplicaciones'] },
    { name: 'Tailwind', category: 'frontend' as const, description: 'Framework CSS utility-first para diseño rápido', experience: '2+ años', projects: ['Portafolio', 'Dashboard'] },
    { name: 'Framer Motion', category: 'frontend' as const, description: 'Biblioteca para animaciones en React', experience: '1+ año', projects: ['Portafolio', 'Landing Pages'] }
  ], [])

  const colorSchemes = useMemo(() => [
    { name: 'Minimalista', primary: '#4A5568', secondary: '#718096', accent: '#A0AEC0' },
    { name: 'Azul Sutil', primary: '#2D3748', secondary: '#4A5568', accent: '#63B3ED' },
    { name: 'Verde Suave', primary: '#2F855A', secondary: '#48BB78', accent: '#9AE6B4' },
    { name: 'Púrpura Elegante', primary: '#553C9A', secondary: '#7C3AED', accent: '#C4B5FD' }
  ], [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configurar canvas con alta resolución
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Inicializar skills en formación circular
    const initSkills = () => {
      const centerX = canvas.offsetWidth / 2
      const centerY = canvas.offsetHeight / 2
      
      skillsRef.current = skills.map((skillData, index) => {
        const angle = (index / skills.length) * Math.PI * 2
        const radius = Math.min(canvas.offsetWidth, canvas.offsetHeight) * 0.25
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius
        
        return {
          ...skillData,
          x,
          y,
          targetX: x,
          targetY: y,
          color: colorSchemes[colorScheme].primary,
          size: 40,
          isHovered: false,
          pulse: 0,
          angle,
          radius,
          vx: 0,
          vy: 0,
          isVisible: false,
          animationDelay: index * 100
        }
      })
      
      // Animación de entrada secuencial
      skills.forEach((_, index) => {
        setTimeout(() => {
          if (skillsRef.current[index]) {
            skillsRef.current[index].isVisible = true
          }
        }, index * 150)
      })
    }

    // Inicializar ondas
    const initWaves = () => {
      wavesRef.current = []
    }

    initSkills()
    initWaves()

    // Crear nueva onda en posición del mouse (más sutil)
    const createWave = (x: number, y: number, intensity: number = 0.5) => {
      for (let i = 0; i < 4; i++) { // Reducido de 8 a 4 ondas
        const angle = (i / 4) * Math.PI * 2
        const speed = 1 + Math.random() * 1.5 // Velocidad más lenta
        wavesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          intensity: intensity * 0.6 // Intensidad más baja
        })
      }
    }

    // Manejo del mouse (menos saturante)
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const newMouseX = e.clientX - rect.left
      const newMouseY = e.clientY - rect.top
      
      mouseRef.current = { x: newMouseX, y: newMouseY }
      setAutoRotate(false) // Pausar rotación automática
      
      // Crear ondas muy ocasionalmente (menos saturante)
      if (Math.random() < 0.02) { // Reducido de 0.05 a 0.02
        createWave(newMouseX, newMouseY, 0.2) // Intensidad muy reducida
      }
      
      // Detectar hover sobre skills
      let foundHover = false
      const filteredSkills = skillsRef.current.filter(skill => 
        categoryFilter === 'all' || skill.category === categoryFilter
      )
      
      filteredSkills.forEach(skill => {
        if (!skill.isVisible) return
        
        const distance = Math.sqrt(
          Math.pow(newMouseX - skill.x, 2) + 
          Math.pow(newMouseY - skill.y, 2)
        )
        
        if (distance < skill.size) {
          if (!skill.isHovered) {
            skill.isHovered = true
            setHoveredSkill(skill.name)
            createWave(skill.x, skill.y, 0.4)
            playHoverSound()
          }
          foundHover = true
        } else {
          skill.isHovered = false
        }
      })
      
      if (!foundHover) {
        setHoveredSkill(null)
      }
    }

    const handleMouseClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Verificar click en skill
      const clickedSkill = skillsRef.current.find(skill => {
        if (!skill.isVisible || (categoryFilter !== 'all' && skill.category !== categoryFilter)) return false
        const distance = Math.sqrt(
          Math.pow(x - skill.x, 2) + 
          Math.pow(y - skill.y, 2)
        )
        return distance < skill.size
      })
      
      if (clickedSkill) {
        setSelectedSkill(clickedSkill)
        createWave(clickedSkill.x, clickedSkill.y, 0.8)
        playClickSound()
      } else {
        // Crear ondas sutiles en clicks vacíos
        createWave(x, y, 0.5)
      }
    }

    const handleMouseLeave = () => {
      setTimeout(() => setAutoRotate(true), 2000) // Reanudar rotación automática
    }

    // Funciones de sonido con Web Audio API
    const playHoverSound = () => {
      if (!isSoundEnabled) return
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        
        oscillator.start()
        oscillator.stop(audioContext.currentTime + 0.1)
      } catch (error) {
        console.log('Audio no disponible:', error)
      }
    }

    const playClickSound = () => {
      if (!isSoundEnabled) return
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.2)
        
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
        
        oscillator.start()
        oscillator.stop(audioContext.currentTime + 0.2)
      } catch (error) {
        console.log('Audio no disponible:', error)
      }
    }

    // Función de renderizado minimalista
    const render = () => {
      timeRef.current += 0.008 // Más lento

      // Fondo minimalista con gradiente sutil
      const gradient = ctx.createRadialGradient(
        canvas.offsetWidth / 2, canvas.offsetHeight / 2, 0,
        canvas.offsetWidth / 2, canvas.offsetHeight / 2, Math.max(canvas.offsetWidth, canvas.offsetHeight) / 2
      )
      gradient.addColorStop(0, '#0A0A0A')
      gradient.addColorStop(1, '#000000')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Rotación automática muy suave
      if (autoRotate) {
        skillsRef.current.forEach(skill => {
          skill.angle += 0.0005 // Más lento
          const centerX = canvas.offsetWidth / 2
          const centerY = canvas.offsetHeight / 2
          const newRadius = Math.min(canvas.offsetWidth, canvas.offsetHeight) * 0.25
          skill.targetX = centerX + Math.cos(skill.angle) * newRadius
          skill.targetY = centerY + Math.sin(skill.angle) * newRadius
        })
      }

      // Actualizar y dibujar ondas (más sutiles)
      wavesRef.current = wavesRef.current.filter(wave => {
        wave.x += wave.vx
        wave.y += wave.vy
        wave.life += 0.01 // Más lento
        wave.vx *= 0.99 // Menos fricción
        wave.vy *= 0.99
        
        if (wave.life < 1) {
          const alpha = wave.intensity * (1 - wave.life) * 0.15 // Más sutil
          const radius = wave.life * 30 // Más pequeño
          
          const scheme = colorSchemes[colorScheme]
          ctx.save()
          ctx.globalAlpha = alpha
          ctx.strokeStyle = scheme.accent
          ctx.lineWidth = 0.5 // Más delgado
          ctx.beginPath()
          ctx.arc(wave.x, wave.y, radius, 0, Math.PI * 2)
          ctx.stroke()
          ctx.restore()
          
          return true
        }
        return false
      })

      const scheme = colorSchemes[colorScheme]

      // Dibujar conexiones dinámicas entre skills (más sutiles)
      const filteredSkills = skillsRef.current.filter(skill => 
        skill.isVisible && (categoryFilter === 'all' || skill.category === categoryFilter)
      )
      
      filteredSkills.forEach((skill, i) => {
        filteredSkills.forEach((otherSkill, j) => {
          if (i >= j) return
          
          const distance = Math.sqrt(
            Math.pow(skill.x - otherSkill.x, 2) + 
            Math.pow(skill.y - otherSkill.y, 2)
          )
          
          if (distance < 160) { // Distancia reducida
            const alpha = (160 - distance) / 160 * 0.05 // Más sutil
            
            ctx.save()
            ctx.globalAlpha = alpha
            ctx.strokeStyle = scheme.secondary
            ctx.lineWidth = 0.3 // Más delgado
            ctx.beginPath()
            ctx.moveTo(skill.x, skill.y)
            ctx.lineTo(otherSkill.x, otherSkill.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })

      // Actualizar y dibujar skills con efectos minimalistas
      filteredSkills.forEach((skill, index) => {
        if (!skill.isVisible) return
        
        skill.pulse += 0.05
        
        // Efectos de física suaves (rebote)
        const mouseDistance = Math.sqrt(
          Math.pow(mouseRef.current.x - skill.targetX, 2) +
          Math.pow(mouseRef.current.y - skill.targetY, 2)
        )
        
        if (mouseDistance < 100) { // Distancia reducida
          const attraction = (100 - mouseDistance) / 100 * 0.03 // Más sutil
          const angle = Math.atan2(
            mouseRef.current.y - skill.targetY,
            mouseRef.current.x - skill.targetX
          )
          skill.vx += Math.cos(angle) * attraction
          skill.vy += Math.sin(angle) * attraction
        }
        
        // Aplicar velocidad con damping
        skill.x += skill.vx
        skill.y += skill.vy
        skill.vx *= 0.97 // Más damping
        skill.vy *= 0.97
        
        // Volver suavemente a la posición original (efecto de rebote)
        const returnForceX = (skill.targetX - skill.x) * 0.015 // Más sutil
        const returnForceY = (skill.targetY - skill.y) * 0.015
        skill.vx += returnForceX
        skill.vy += returnForceY
        
        // Animación de entrada con transición suave
        const timeSinceStart = Date.now() - skill.animationDelay
        const entryScale = skill.isVisible ? 
          Math.min(1, timeSinceStart / 800) : 0 // Más lento
        
        // Tamaño con efectos sutiles
        const pulseSize = skill.isHovered ? 1.15 : 1 // Menos efecto
        const animatedSize = skill.size * pulseSize * entryScale * (1 + Math.sin(skill.pulse) * 0.03) // Más sutil
        
        // Dibujar skill minimalista con transición de tema
        ctx.save()
        ctx.translate(skill.x, skill.y)
        
        // Halo muy sutil para hover
        if (skill.isHovered) {
          ctx.save()
          ctx.globalAlpha = 0.2 // Más sutil
          ctx.strokeStyle = scheme.accent
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(0, 0, animatedSize * 1.2, 0, Math.PI * 2)
          ctx.stroke()
          ctx.restore()
        }
        
        // Círculo principal con gradiente sutil
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, animatedSize * 0.8)
        gradient.addColorStop(0, scheme.primary)
        gradient.addColorStop(1, scheme.secondary)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(0, 0, animatedSize * 0.8, 0, Math.PI * 2)
        ctx.fill()
        
        // Borde muy sutil
        ctx.strokeStyle = scheme.accent
        ctx.lineWidth = 0.5
        ctx.globalAlpha = 0.6
        ctx.stroke()
        
        // Texto del skill
        ctx.globalAlpha = 1
        ctx.fillStyle = '#F7FAFC'
        ctx.font = `${Math.max(10, animatedSize * 0.22)}px Arial`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(skill.name, 0, 0)
        
        ctx.restore()
      })

      // Efecto de partículas ambientales muy sutiles
      if (Math.random() < 0.3) { // Solo ocasionalmente
        for (let i = 0; i < 2; i++) { // Menos partículas
          const x = Math.random() * canvas.offsetWidth
          const y = Math.random() * canvas.offsetHeight
          const size = Math.random() * 1.5 + 0.5 // Más pequeñas
          const alpha = Math.random() * 0.1 + 0.05 // Más sutiles
          
          ctx.save()
          ctx.globalAlpha = alpha
          ctx.fillStyle = scheme.accent
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      }

      animationRef.current = requestAnimationFrame(render)
    }

    // Función auxiliar para convertir hex a rgb
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` 
        : '255, 255, 255'
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('click', handleMouseClick)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    render()
    setIsLoaded(true)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('click', handleMouseClick)
    }
  }, [colorScheme, skills, colorSchemes, categoryFilter, isSoundEnabled, autoRotate])

  const resetWaves = () => {
    wavesRef.current = []
    const centerX = canvasRef.current?.offsetWidth || 0 / 2
    const centerY = canvasRef.current?.offsetHeight || 0 / 2
    
    // Crear una gran onda en el centro
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2
      const speed = 3 + Math.random() * 2
      wavesRef.current.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        intensity: 2
      })
    }
  }

  const changeColorScheme = () => {
    setColorScheme((prev) => (prev + 1) % colorSchemes.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full h-full min-h-[600px] bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden relative"
    >
      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 flex gap-2 flex-wrap max-w-md">
        <Button
          variant="outline"
          size="sm"
          onClick={resetWaves}
          className="bg-black/50 border-white/20 text-white hover:bg-white/20"
        >
          <Waves className="h-4 w-4 mr-1" />
          Ondas
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={changeColorScheme}
          className="bg-black/50 border-white/20 text-white hover:bg-white/20"
        >
          <Palette className="h-4 w-4 mr-1" />
          {colorSchemes[colorScheme].name}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setAutoRotate(!autoRotate)}
          className={`bg-black/50 border-white/20 text-white hover:bg-white/20 ${autoRotate ? 'bg-white/20' : ''}`}
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          Auto
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSoundEnabled(!isSoundEnabled)}
          className={`bg-black/50 border-white/20 text-white hover:bg-white/20 ${isSoundEnabled ? 'bg-white/20' : ''}`}
        >
          {isSoundEnabled ? <Volume2 className="h-4 w-4 mr-1" /> : <VolumeX className="h-4 w-4 mr-1" />}
          {isSoundEnabled ? 'Sonido' : 'Silencio'}
        </Button>
      </div>

      {/* Category Filters */}
      <div className="absolute top-4 right-4 z-10 flex gap-1 flex-wrap">
        {(['all', 'frontend', 'backend', 'tools', 'language'] as const).map((category) => (
          <Button
            key={category}
            variant="outline"
            size="sm"
            onClick={() => setCategoryFilter(category)}
            className={`bg-black/50 border-white/20 text-white hover:bg-white/20 text-xs ${
              categoryFilter === category ? 'bg-white/20' : ''
            }`}
          >
            {category === 'all' ? 'Todas' : 
             category === 'frontend' ? 'Frontend' :
             category === 'backend' ? 'Backend' :
             category === 'tools' ? 'Herramientas' :
             'Lenguajes'}
          </Button>
        ))}
      </div>

      {/* Expanded Info Modal */}
      {selectedSkill && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-20"
          onClick={() => setSelectedSkill(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black/90 border border-white/20 rounded-lg p-6 max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">{selectedSkill.name}</h3>
              <button
                onClick={() => setSelectedSkill(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3 text-white">
              <div>
                <span className="text-sm font-semibold text-gray-300">Categoría:</span>
                <p className="text-sm">{selectedSkill.category}</p>
              </div>
              
              <div>
                <span className="text-sm font-semibold text-gray-300">Descripción:</span>
                <p className="text-sm">{selectedSkill.description}</p>
              </div>
              
              <div>
                <span className="text-sm font-semibold text-gray-300">Experiencia:</span>
                <p className="text-sm">{selectedSkill.experience}</p>
              </div>
              
              <div>
                <span className="text-sm font-semibold text-gray-300">Proyectos:</span>
                <ul className="text-sm space-y-1">
                  {selectedSkill.projects.map((project, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                      {project}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Info Panel */}
      {hoveredSkill && !selectedSkill && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 bg-black/80 border border-white/20 rounded-lg p-3 text-white z-10"
        >
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-cyan-400" />
            <span className="font-semibold">{hoveredSkill}</span>
          </div>
          <p className="text-xs text-gray-300 mt-1">
            Haz click para ver más detalles
          </p>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 bg-black/50 border border-white/20 rounded-lg p-3 text-white text-xs max-w-48 z-10">
        <div className="flex items-center gap-2 mb-2">
          <MousePointer className="h-4 w-4 text-cyan-400" />
          <span className="font-semibold">Interacciones</span>
        </div>
        <ul className="space-y-1 text-gray-300">
          <li>• Mueve el mouse para crear ondas sutiles</li>
          <li>• Click en tecnologías para ver detalles</li>
          <li>• Usa filtros para ver por categorías</li>
          <li>• Rotación automática cuando no interactúas</li>
        </ul>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        style={{ background: 'radial-gradient(circle at center, #0A0A0A 0%, #000000 100%)' }}
      />

      {/* Loading */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-2"></div>
            <p>Cargando ondas interactivas...</p>
          </div>
        </div>
      )}
    </motion.div>
  )
}
