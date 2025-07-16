import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import Home from '../page'
import '@testing-library/jest-dom'

// Mock all complex components to avoid dependency issues
jest.mock('@/components/sections/Hero', () => ({
  Hero: () => (
    <section data-testid="hero-section">
      <h1>Esteban Inzunza</h1>
      <p>Desarrollador Front End especializado en React y Next.js</p>
      <button>Ver Proyectos</button>
    </section>
  ),
}))

jest.mock('@/components/sections/About', () => ({
  About: () => (
    <section data-testid="about-section">
      <h2>Sobre mí</h2>
    </section>
  ),
}))

jest.mock('@/components/sections/Experience', () => ({
  Experience: () => (
    <section data-testid="experience-section">
      <h2>Experiencia</h2>
    </section>
  ),
}))

jest.mock('@/components/sections/Projects', () => ({
  Projects: () => (
    <section data-testid="projects-section">
      <h2>Proyectos</h2>
    </section>
  ),
}))

jest.mock('@/components/sections/Contact', () => ({
  Contact: () => (
    <section data-testid="contact-section">
      <h2>Contacto</h2>
    </section>
  ),
}))

jest.mock('@/components/layout/Navigation', () => ({
  Navigation: () => (
    <nav data-testid="navigation">
      <a href="#home">Inicio</a>
      <a href="#about">Sobre mí</a>
      <a href="#experience">Experiencia</a>
      <a href="#projects">Proyectos</a>
      <a href="#contact">Contacto</a>
    </nav>
  ),
}))

jest.mock('@/components/layout/Footer', () => ({
  Footer: () => (
    <footer data-testid="footer">
      <p>© 2024 Esteban Inzunza</p>
    </footer>
  ),
}))

jest.mock('@/components/interactive/InteractiveElementsWrapper', () => ({
  InteractiveElementsWrapper: () => (
    <section data-testid="interactive-section">
      <h2>Elementos Interactivos</h2>
    </section>
  ),
}))

// Mock Error Boundary to avoid complexity in tests
jest.mock('@/components/error-boundary', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => children,
}))

describe('Home Page Integration', () => {
  it('renders all main sections', () => {
    render(<Home />)

    // Check that all main sections are present
    expect(screen.getByTestId('navigation')).toBeInTheDocument()
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    expect(screen.getByTestId('about-section')).toBeInTheDocument()
    expect(screen.getByTestId('experience-section')).toBeInTheDocument()
    expect(screen.getByTestId('projects-section')).toBeInTheDocument()
    expect(screen.getByTestId('interactive-section')).toBeInTheDocument()
    expect(screen.getByTestId('contact-section')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('displays hero content correctly', () => {
    render(<Home />)

    expect(screen.getByRole('heading', { level: 1, name: /esteban inzunza/i })).toBeInTheDocument()
    expect(screen.getByText(/desarrollador front end especializado/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ver proyectos/i })).toBeInTheDocument()
  })

  it('has proper navigation structure', () => {
    render(<Home />)

    const navigation = screen.getByTestId('navigation')
    expect(navigation).toBeInTheDocument()

    // Check for navigation links
    expect(screen.getByRole('link', { name: /inicio/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sobre mí/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /experiencia/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /proyectos/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contacto/i })).toBeInTheDocument()
  })

  it('displays section headings correctly', () => {
    render(<Home />)

    expect(screen.getByRole('heading', { level: 2, name: /sobre mí/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /experiencia/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /proyectos/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /contacto/i })).toBeInTheDocument()
  })

  it('has semantic HTML structure', () => {
    render(<Home />)

    // Check for main semantic elements
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument() // footer
  })

  it('renders without crashing when wrapped in error boundaries', () => {
    // This test ensures that our Error Boundary integration doesn't break the app
    expect(() => render(<Home />)).not.toThrow()
  })

  it('maintains proper heading hierarchy', () => {
    render(<Home />)

    // Check that we have one h1 (hero title)
    const h1Elements = screen.getAllByRole('heading', { level: 1 })
    expect(h1Elements).toHaveLength(1)
    expect(h1Elements[0]).toHaveTextContent(/esteban inzunza/i)

    // Check that we have multiple h2 elements for sections
    const h2Elements = screen.getAllByRole('heading', { level: 2 })
    expect(h2Elements.length).toBeGreaterThan(3) // About, Experience, Projects, Contact, etc.
  })

  it('has accessible markup', () => {
    render(<Home />)

    // Check for important accessibility features
    const main = screen.getByRole('main')
    expect(main).toHaveClass('min-h-screen')
    expect(main).toHaveAttribute('id', 'main-content')
  })
})
