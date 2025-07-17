import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { TechRadarSection } from '@/components/sections/TechRadarSection'
import { InteractiveElementsWrapper } from '@/components/interactive/InteractiveElementsWrapper'
import { Contact } from '@/components/sections/Contact'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { ErrorBoundary } from '@/components/error-boundary'

export default function Home() {
  return (
    <main className="min-h-screen bg-background" id="main-content">
      <ErrorBoundary>
        <Navigation />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <About />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Experience />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Projects />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <TechRadarSection />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <InteractiveElementsWrapper />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Contact />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </main>
  )
}
