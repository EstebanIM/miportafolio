export interface Technology {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'ai'
  level: 'adopt' | 'trial' | 'assess' | 'hold'
  description: string
  icon: string
  experience: number // años de experiencia
  position: {
    angle: number // ángulo en grados
    radius: number // distancia del centro (0-1)
  }
}

export interface TechRadarData {
  frontend: Technology[]
  backend: Technology[]
  tools: Technology[]
  ai: Technology[]
}

export const techRadarData: TechRadarData = {
  frontend: [
    {
      id: 'react',
      name: 'React',
      category: 'frontend',
      level: 'adopt',
      description: 'Biblioteca de JavaScript para construir interfaces de usuario. Mi herramienta principal para desarrollo frontend.',
      icon: 'Component',
      experience: 3,
      position: { angle: 15, radius: 0.2 } // Cuadrante superior derecho (0° a 90°)
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      category: 'frontend',
      level: 'adopt',
      description: 'Framework de React para aplicaciones web de producción con SSR, SSG y optimizaciones automáticas.',
      icon: 'Zap',
      experience: 2,
      position: { angle: 45, radius: 0.3 }
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'frontend',
      level: 'adopt',
      description: 'Superset de JavaScript que añade tipado estático. Esencial para proyectos escalables.',
      icon: 'Code',
      experience: 2,
      position: { angle: 75, radius: 0.25 }
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      category: 'frontend',
      level: 'adopt',
      description: 'Framework CSS utility-first para diseño rápido y consistente.',
      icon: 'Palette',
      experience: 2,
      position: { angle: 30, radius: 0.4 }
    },
    {
      id: 'framer-motion',
      name: 'Framer Motion',
      category: 'frontend',
      level: 'adopt',
      description: 'Biblioteca de animaciones para React con API declarativa y potente.',
      icon: 'Motion',
      experience: 1,
      position: { angle: 60, radius: 0.35 }
    }
  ],
  backend: [
    {
      id: 'nodejs',
      name: 'Node.js',
      category: 'backend',
      level: 'adopt',
      description: 'Runtime de JavaScript para servidor. Usado para APIs y servicios backend.',
      icon: 'Server',
      experience: 2,
      position: { angle: 285, radius: 0.3 } // Cuadrante inferior derecho (270° a 360°)
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      category: 'backend',
      level: 'adopt',
      description: 'Lenguaje de programación principal para desarrollo web full-stack.',
      icon: 'Code2',
      experience: 3,
      position: { angle: 315, radius: 0.25 }
    },
  ],
  tools: [
    {
      id: 'git',
      name: 'Git',
      category: 'tools',
      level: 'adopt',
      description: 'Sistema de control de versiones distribuido. Fundamental para cualquier proyecto.',
      icon: 'GitBranch',
      experience: 3,
      position: { angle: 195, radius: 0.2 } // Cuadrante inferior izquierdo (180° a 270°)
    },
    {
      id: 'vscode',
      name: 'VS Code',
      category: 'tools',
      level: 'adopt',
      description: 'Editor de código principal con excelente soporte para JavaScript/TypeScript.',
      icon: 'Code2',
      experience: 3,
      position: { angle: 225, radius: 0.3 }
    },
    {
      id: 'vercel',
      name: 'Vercel',
      category: 'tools',
      level: 'adopt',
      description: 'Plataforma de despliegue para aplicaciones Next.js y frontend.',
      icon: 'Upload',
      experience: 2,
      position: { angle: 240, radius: 0.35 }
    },
    {
      id: 'npm',
      name: 'NPM',
      category: 'tools',
      level: 'adopt',
      description: 'Gestor de paquetes de Node.js para manejar dependencias.',
      icon: 'Package',
      experience: 3,
      position: { angle: 210, radius: 0.4 }
    }
  ],
  ai: [
    {
      id: 'github-copilot',
      name: 'GitHub Copilot',
      category: 'ai',
      level: 'adopt',
      description: 'Asistente de programación con IA que mejora significativamente la productividad.',
      icon: 'Bot',
      experience: 1.5,
      position: { angle: 135, radius: 0.3 } // Cuadrante superior izquierdo (90° a 180°)
    },
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      category: 'ai',
      level: 'adopt',
      description: 'Herramienta de IA para resolución de problemas y consultas de programación.',
      icon: 'Brain',
      experience: 1,
      position: { angle: 150, radius: 0.4 }
    }
  ]
}

export const categoryColors = {
  frontend: {
    primary: '#3B82F6', // blue-500
    secondary: '#DBEAFE', // blue-100
    accent: '#1E40AF' // blue-800
  },
  backend: {
    primary: '#10B981', // emerald-500
    secondary: '#D1FAE5', // emerald-100
    accent: '#065F46' // emerald-800
  },
  tools: {
    primary: '#F59E0B', // amber-500
    secondary: '#FEF3C7', // amber-100
    accent: '#92400E' // amber-800
  },
  ai: {
    primary: '#8B5CF6', // violet-500
    secondary: '#EDE9FE', // violet-100
    accent: '#5B21B6' // violet-800
  }
}

export const levelInfo = {
  adopt: {
    name: 'Adoptar',
    description: 'Tecnologías probadas y recomendadas para uso en producción',
    color: '#10B981',
    radius: 0.4
  },
  trial: {
    name: 'Probar',
    description: 'Tecnologías prometedoras que vale la pena explorar',
    color: '#3B82F6',
    radius: 0.65
  },
  assess: {
    name: 'Evaluar',
    description: 'Tecnologías a considerar con precaución',
    color: '#F59E0B',
    radius: 0.85
  },
  hold: {
    name: 'Mantener',
    description: 'Tecnologías que se deben evitar o reemplazar',
    color: '#EF4444',
    radius: 1.0
  }
}
