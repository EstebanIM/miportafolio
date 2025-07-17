'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Component, Zap, Code, Palette, Rocket, Server, Globe, Database, 
  HardDrive, Cloud, GitBranch, Code2, Container, Upload, Package,
  Brain, Bot, Link, Cpu, Heart, ChevronDown
} from 'lucide-react'
import { Technology, techRadarData, categoryColors, levelInfo } from '@/data/tech-radar-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Mapeo de iconos
const iconMap: Record<string, any> = {
  Component, Zap, Code, Palette, Motion: Rocket, Rocket, Server, Globe, Database,
  HardDrive, Cloud, GitBranch, Code2, Figma: Package, Container, Upload, Package,
  Brain, Bot, Link, Cpu, Heart
}

interface TechRadarMobileProps {
  className?: string
}

export function TechRadarMobile({ className }: TechRadarMobileProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null)

  const categories = [
    { 
      key: 'frontend', 
      name: 'Frontend',
      description: 'Tecnologías para desarrollo de interfaces',
      techs: techRadarData.frontend 
    },
    { 
      key: 'backend', 
      name: 'Backend',
      description: 'Tecnologías para desarrollo del servidor',
      techs: techRadarData.backend 
    },
    { 
      key: 'tools', 
      name: 'Herramientas',
      description: 'Herramientas de desarrollo y productividad',
      techs: techRadarData.tools 
    },
    { 
      key: 'ai', 
      name: 'IA & ML',
      description: 'Inteligencia artificial y machine learning',
      techs: techRadarData.ai 
    }
  ]

  const renderTechCard = (tech: Technology) => {
    const IconComponent = iconMap[tech.icon] || Code
    const categoryColor = categoryColors[tech.category]
    const levelColor = levelInfo[tech.level].color

    return (
      <motion.div
        key={tech.id}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card 
          className={cn(
            "cursor-pointer transition-all duration-200 hover:shadow-md",
            selectedTech?.id === tech.id && "ring-2 ring-primary"
          )}
          onClick={() => setSelectedTech(selectedTech?.id === tech.id ? null : tech)}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: categoryColor.secondary }}
              >
                <IconComponent 
                  size={20} 
                  style={{ color: categoryColor.primary }}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm truncate">{tech.name}</h4>
                </div>
                
                <div className="flex items-center gap-2">
                  <span 
                    className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: levelColor }}
                  >
                    {levelInfo[tech.level].name}
                  </span>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {selectedTech?.id === tech.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 pt-3 border-t"
                >
                  <p className="text-sm text-muted-foreground">
                    {tech.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className={cn('w-full space-y-4', className)}>
      {/* Leyenda móvil */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Niveles de Adopción</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(levelInfo).map(([level, info]) => (
              <div key={level} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: info.color }}
                />
                <div>
                  <div className="font-medium text-sm">{info.name}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Categorías */}
      {categories.map((category) => (
        <Card key={category.key}>
          <CardHeader>
            <Button
              variant="ghost"
              className="w-full justify-between p-0 h-auto"
              onClick={() => setExpandedCategory(
                expandedCategory === category.key ? null : category.key
              )}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: categoryColors[category.key as keyof typeof categoryColors].primary }}
                />
                <div className="text-left">
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <p className="text-sm text-muted-foreground font-normal">
                    {category.description}
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: expandedCategory === category.key ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </Button>
          </CardHeader>
          
          <AnimatePresence>
            {expandedCategory === category.key && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="space-y-3">
                  {category.techs.map(renderTechCard)}
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ))}
    </div>
  )
}
