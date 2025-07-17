'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Component, Zap, Code, Palette, Rocket, Server, Globe, Database, 
  HardDrive, Cloud, GitBranch, Code2, Container, Upload, Package,
  Brain, Bot, Link, Cpu, Heart, Filter, X, Info
} from 'lucide-react'
import { Technology, techRadarData, categoryColors, levelInfo } from '@/data/tech-radar-data'
import { TechRadarMobile } from '@/components/interactive/TechRadarMobile'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Mapeo de iconos
const iconMap: Record<string, any> = {
  Component, Zap, Code, Palette, Motion: Rocket, Rocket, Server, Globe, Database,
  HardDrive, Cloud, GitBranch, Code2, Figma: Package, Container, Upload, Package,
  Brain, Bot, Link, Cpu, Heart
}

interface TechRadarProps {
  className?: string
}

export function TechRadar({ className }: TechRadarProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredTech, setHoveredTech] = useState<Technology | null>(null)
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Obtener todas las tecnologías filtradas
  const filteredTechnologies = useMemo(() => {
    const allTechs = [
      ...techRadarData.frontend,
      ...techRadarData.backend,
      ...techRadarData.tools,
      ...techRadarData.ai
    ]
    
    if (!selectedCategory) return allTechs
    return allTechs.filter(tech => tech.category === selectedCategory)
  }, [selectedCategory])

  // Detectar si es móvil
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // Si es móvil, usar la versión móvil
  if (isMobile) {
    return <TechRadarMobile className={className} />
  }

  // Función para convertir coordenadas polares a cartesianas
  const polarToCartesian = (angle: number, radius: number, centerX: number, centerY: number, maxRadius: number) => {
    const radian = (angle * Math.PI) / 180
    const x = centerX + radius * maxRadius * Math.cos(radian)
    const y = centerY + radius * maxRadius * Math.sin(radian)
    return { x, y }
  }

  // Configuración del radar
  const radarSize = 400
  const centerX = radarSize / 2
  const centerY = radarSize / 2
  const maxRadius = radarSize / 2 - 40

  // Renderizar una tecnología como punto en el radar
  const renderTechnology = (tech: Technology, index: number) => {
    const { x, y } = polarToCartesian(tech.position.angle, tech.position.radius, centerX, centerY, maxRadius)
    const IconComponent = iconMap[tech.icon] || Code
    const categoryColor = categoryColors[tech.category]
    const isHovered = hoveredTech?.id === tech.id
    const isSelected = selectedTech?.id === tech.id

    return (
      <motion.g
        key={tech.id}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: selectedCategory ? (tech.category === selectedCategory ? 1 : 0.3) : 1,
          scale: isHovered || isSelected ? 1.3 : 1
        }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => setHoveredTech(tech)}
        onMouseLeave={() => setHoveredTech(null)}
        onClick={() => setSelectedTech(tech)}
      >
        {/* Círculo de fondo */}
        <circle
          cx={x}
          cy={y}
          r={isHovered || isSelected ? 16 : 12}
          fill={categoryColor.primary}
          stroke={isSelected ? categoryColor.accent : 'white'}
          strokeWidth={isSelected ? 3 : 2}
          className="drop-shadow-md"
        />
        
        {/* Ícono */}
        <foreignObject
          x={x - 8}
          y={y - 8}
          width={16}
          height={16}
          className="pointer-events-none"
        >
          <IconComponent 
            size={16} 
            className="text-white"
          />
        </foreignObject>

        {/* Etiqueta de nombre (solo en hover) */}
        <AnimatePresence>
          {isHovered && (
            <motion.g
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <rect
                x={x - tech.name.length * 3}
                y={y + 20}
                width={tech.name.length * 6}
                height={20}
                rx={4}
                fill="rgba(0, 0, 0, 0.8)"
                className="drop-shadow-lg"
              />
              <text
                x={x}
                y={y + 32}
                textAnchor="middle"
                className="text-white text-xs font-medium pointer-events-none"
                fill="white"
              >
                {tech.name}
              </text>
            </motion.g>
          )}
        </AnimatePresence>
      </motion.g>
    )
  }

  return (
    <div className={cn('w-full max-w-6xl mx-auto p-6', className)}>
      {/* Título y controles */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Tech Radar Interactivo</h2>
        <p className="text-muted-foreground mb-6">
          Explora las tecnologías que domino y estoy aprendiendo. Haz clic en cualquier punto para más detalles.
        </p>
        
        {/* Filtros de categoría */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="min-w-0"
          >
            <Filter size={16} className="mr-2" />
            Todas
          </Button>
          {Object.entries(categoryColors).map(([category, colors]) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              style={{
                backgroundColor: selectedCategory === category ? colors.primary : undefined,
                borderColor: colors.primary,
                color: selectedCategory === category ? 'white' : colors.primary
              }}
              className="capitalize min-w-0"
            >
              {category === 'frontend' && 'Frontend'}
              {category === 'backend' && 'Backend'}
              {category === 'tools' && 'Herramientas'}
              {category === 'ai' && 'IA & ML'}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Radar SVG */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex justify-center">
              <svg width={radarSize} height={radarSize} className="overflow-visible">
                {/* Círculos de nivel */}
                {Object.entries(levelInfo).map(([level, info], index) => (
                  <g key={level}>
                    <circle
                      cx={centerX}
                      cy={centerY}
                      r={info.radius * maxRadius}
                      fill="none"
                      stroke={info.color}
                      strokeWidth={2}
                      strokeOpacity={0.3}
                      strokeDasharray="5,5"
                    />
                    <text
                      x={centerX + 10}
                      y={centerY - info.radius * maxRadius + 5}
                      className="text-xs font-medium"
                      fill={info.color}
                    >
                      {info.name}
                    </text>
                  </g>
                ))}

                {/* Líneas de división de cuadrantes */}
                <line
                  x1={centerX}
                  y1={20}
                  x2={centerX}
                  y2={radarSize - 20}
                  stroke="#e5e7eb"
                  strokeWidth={2}
                  strokeOpacity={0.5}
                />
                <line
                  x1={20}
                  y1={centerY}
                  x2={radarSize - 20}
                  y2={centerY}
                  stroke="#e5e7eb"
                  strokeWidth={2}
                  strokeOpacity={0.5}
                />

                {/* Etiquetas de cuadrantes */}
                <text x={centerX + maxRadius/2} y={radarSize - 25} textAnchor="middle" className="text-sm font-semibold" fill={categoryColors.frontend.primary}>
                  Frontend
                </text>
                <text x={centerX - maxRadius/2} y={radarSize - 25} textAnchor="middle" className="text-sm font-semibold" fill={categoryColors.ai.primary}>
                  IA & ML
                </text>
                <text x={centerX - maxRadius/2} y={40} textAnchor="middle" className="text-sm font-semibold" fill={categoryColors.tools.primary}>
                  Herramientas
                </text>
                <text x={centerX + maxRadius/2} y={40} textAnchor="middle" className="text-sm font-semibold" fill={categoryColors.backend.primary}>
                  Backend
                </text>

                {/* Tecnologías */}
                {filteredTechnologies.map((tech, index) => renderTechnology(tech, index))}
              </svg>
            </div>
          </Card>
        </div>

        {/* Panel de información */}
        <div className="space-y-4">
          {/* Leyenda */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info size={20} />
                Leyenda
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(levelInfo).map(([level, info]) => (
                <div key={level} className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full border-2"
                    style={{ backgroundColor: info.color }}
                  />
                  <div>
                    <div className="font-medium text-sm">{info.name}</div>
                    <div className="text-xs text-muted-foreground">{info.description}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Información de tecnología seleccionada */}
          <AnimatePresence>
            {selectedTech && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {(() => {
                          const IconComponent = iconMap[selectedTech.icon] || Code
                          return <IconComponent size={20} style={{ color: categoryColors[selectedTech.category].primary }} />
                        })()}
                        {selectedTech.name}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTech(null)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span 
                        className="px-2 py-1 rounded text-white text-xs font-medium"
                        style={{ backgroundColor: categoryColors[selectedTech.category].primary }}
                      >
                        {selectedTech.category === 'frontend' && 'Frontend'}
                        {selectedTech.category === 'backend' && 'Backend'}
                        {selectedTech.category === 'tools' && 'Herramientas'}
                        {selectedTech.category === 'ai' && 'IA & ML'}
                      </span>
                      <span 
                        className="px-2 py-1 rounded text-white text-xs font-medium"
                        style={{ backgroundColor: levelInfo[selectedTech.level].color }}
                      >
                        {levelInfo[selectedTech.level].name}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {selectedTech.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Información de hover */}
          <AnimatePresence>
            {hoveredTech && !selectedTech && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="border-2" style={{ borderColor: categoryColors[hoveredTech.category].primary }}>
                  <CardContent className="pt-4">
                    <h4 className="font-medium">{hoveredTech.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Haz clic para ver más detalles
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
