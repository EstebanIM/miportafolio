import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Particles } from '@/components/ui/particles'
import { ViewCounter } from '@/components/ui/view-counter'
import { DownloadTracker } from '@/components/ui/download-tracker'

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border/40 relative overflow-hidden">
      {/* Partículas muy sutiles en el footer */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={20}
        staticity={80}
        ease={30}
      />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground text-sm">
              © 2025 Esteban Inzunza. Todos los derechos reservados.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild className="hover-lift">
              <a href="https://github.com/EstebanIM" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover-lift">
              <a href="https://linkedin.com/in/einzunza2" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover-lift">
              <a href="mailto:einzunza2@gmail.com">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="mt-4 pt-4 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center">
            <p className="text-muted-foreground text-xs flex items-center justify-center">
              Hecho con <Heart className="h-3 w-3 mx-1 text-red-500 animate-pulse" /> usando Next.js y TypeScript
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <ViewCounter showIcon={false} />
            <DownloadTracker showIcon={false} showBreakdown />
          </div>
        </div>
      </div>
    </footer>
  )
}
