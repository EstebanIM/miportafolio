import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { InteractiveElementsWrapper } from '@/components/interactive/InteractiveElementsWrapper'
import { Contact } from '@/components/sections/Contact'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <InteractiveElementsWrapper />
      <Contact />
      <Footer />
    </main>
  )
}
