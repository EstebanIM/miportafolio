'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Code, 
  Briefcase, 
  GraduationCap, 
  Award, 
  MapPin, 
  Calendar,
  Mail,
  Github,
  Linkedin,
  Download,
  ExternalLink,
  ChevronRight,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from '@/hooks/useTranslations'

interface ResumeSection {
  id: string
  icon: any
  title: string
  content: any
}

export function InteractiveResume() {
  const { t } = useTranslations()
  const [activeSection, setActiveSection] = useState('profile')
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const skills = [
    { name: 'React', level: 90, color: '#61DAFB' },
    { name: 'Next.js', level: 85, color: '#000000' },
    { name: 'TypeScript', level: 80, color: '#3178C6' },
    { name: 'JavaScript', level: 95, color: '#F7DF1E' },
    { name: 'Tailwind CSS', level: 90, color: '#06B6D4' },
    { name: 'Node.js', level: 75, color: '#339933' },
    { name: 'Three.js', level: 70, color: '#000000' },
    { name: 'Git', level: 85, color: '#F05032' },
  ]

  const experience = [
    {
      title: 'Houseman',
      company: 'Vista Mirage Resort',
      period: '2024 - 2025',
      location: 'Palm Springs, USA',
      description: 'Experiencia internacional en el programa Work and Travel',
      achievements: [
        'Desarrollo de habilidades en inglés',
        'Trabajo en equipo multicultural',
        'Adaptación a entorno internacional'
      ]
    },
    {
      title: 'Ingeniero Informático',
      company: 'BioGym Store Concepción',
      period: '2024',
      location: 'Concepción, Chile',
      description: 'Desarrollo de soluciones web y sistemas de inventario',
      achievements: [
        'Incremento del 40% en eficiencia de inventario',
        'Rediseño completo del sitio web',
        'Implementación de React.js'
      ]
    }
  ]

  const education = [
    {
      degree: 'Ingeniería en Informática',
      institution: 'Duoc UC, Sede San Andrés',
      period: '2021 - 2024',
      status: 'Graduado',
      location: 'Concepción, Chile'
    }
  ]

  const achievements = [
    'Desarrollo de múltiples proyectos web con React/Next.js',
    'Experiencia internacional en Estados Unidos',
    'Implementación exitosa de sistemas de inventario',
    'Dominio de tecnologías frontend modernas',
    'Trabajo efectivo en equipos multiculturales'
  ]

  const sections: ResumeSection[] = [
    {
      id: 'profile',
      icon: User,
      title: 'Perfil',
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white">
              EI
            </div>
            <h2 className="text-2xl font-bold mb-2">Esteban Inzunza</h2>
            <p className="text-primary font-medium mb-4">Frontend Developer</p>
            
            <div className="flex justify-center gap-4 mb-6">
              <Button variant="outline" size="sm" asChild>
                <a href="mailto:einzunza2@gmail.com">
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/EstebanIM" target="_blank">
                  <Github className="h-4 w-4 mr-1" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://linkedin.com/in/einzunza2" target="_blank">
                  <Linkedin className="h-4 w-4 mr-1" />
                  LinkedIn
                </a>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
              <MapPin className="h-4 w-4" />
              <span>Concepción, Chile</span>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Sobre mí</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Desarrollador Frontend especializado en React y Next.js con experiencia internacional. 
              Apasionado por crear interfaces modernas y funcionales que brinden excelentes experiencias de usuario.
            </p>
          </div>
        </motion.div>
      )
    },
    {
      id: 'skills',
      icon: Code,
      title: 'Habilidades',
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="font-semibold mb-4">Tecnologías y Herramientas</h3>
          <div className="grid gap-3">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-xs text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                  />
                </div>
                <AnimatePresence>
                  {hoveredSkill === skill.name && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute top-0 right-0 bg-black text-white px-2 py-1 rounded text-xs"
                    >
                      {skill.level}% proficiency
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )
    },
    {
      id: 'experience',
      icon: Briefcase,
      title: 'Experiencia',
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="border-l-2 border-primary pl-4 relative"
            >
              <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
              <div className="mb-2">
                <h3 className="font-semibold">{exp.title}</h3>
                <p className="text-primary font-medium">{exp.company}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {exp.location}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{exp.description}</p>
              <ul className="space-y-1">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="text-sm flex items-start gap-2">
                    <ChevronRight className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      )
    },
    {
      id: 'education',
      icon: GraduationCap,
      title: 'Educación',
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-muted/30 rounded-lg p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-primary font-medium">{edu.institution}</p>
                  {edu.location && (
                    <p className="text-xs text-muted-foreground/80 mt-1">{edu.location}</p>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-full">
                    {edu.status}
                  </span>
                  <p className="text-sm text-muted-foreground mt-1">{edu.period}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )
    },
    {
      id: 'achievements',
      icon: Award,
      title: 'Logros',
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
            >
              <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{achievement}</span>
            </motion.div>
          ))}
        </motion.div>
      )
    }
  ]

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">CV Interactivo</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href="/cv/CV_Esteban_Inzunza_Español.pdf" target="_blank">
                <Download className="h-4 w-4 mr-1" />
                Descargar PDF
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="#contact">
                <ExternalLink className="h-4 w-4 mr-1" />
                Contactar
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 h-[600px]">
        {/* Sidebar Navigation */}
        <div className="bg-muted/20 border-r border-border p-4">
          <nav className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{section.title}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            {sections.map((section) => (
              section.id === activeSection && (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {section.content}
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
