export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

export interface Skill {
  name: string
  level: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Experto'
  category: 'Frontend' | 'Backend' | 'Herramientas' | 'Soft Skills'
  icon?: string
}

export interface Experience {
  company: string
  position: string
  duration: string
  description: string
  technologies: string[]
}

export interface ContactForm {
  name: string
  email: string
  message: string
}
