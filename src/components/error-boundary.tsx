'use client'

import { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: any
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: any) => void
  level?: 'page' | 'component'
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.setState({ errorInfo })
    
    // Log error to analytics service
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo)
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <ErrorFallback
          error={this.state.error}
          onReset={this.handleReset}
          level={this.props.level}
        />
      )
    }

    return this.props.children
  }
}

interface ErrorFallbackProps {
  error?: Error
  onReset: () => void
  level?: 'page' | 'component'
}

function ErrorFallback({ error, onReset, level = 'component' }: ErrorFallbackProps) {
  const isPageLevel = level === 'page'

  return (
    <div 
      className={`flex flex-col items-center justify-center p-8 text-center ${
        isPageLevel ? 'min-h-screen bg-background' : 'min-h-[200px] bg-muted/50 rounded-lg'
      }`}
      role="alert"
      aria-labelledby="error-title"
      aria-describedby="error-description"
    >
      <div className={`max-w-md mx-auto ${isPageLevel ? 'space-y-6' : 'space-y-4'}`}>
        <div className="text-destructive">
          <AlertTriangle className={`mx-auto ${isPageLevel ? 'h-16 w-16' : 'h-12 w-12'}`} />
        </div>
        
        <div>
          <h2 
            id="error-title"
            className={`font-bold text-foreground ${isPageLevel ? 'text-2xl' : 'text-lg'}`}
          >
            {isPageLevel ? 'Algo salió mal' : 'Error en el componente'}
          </h2>
          <p 
            id="error-description"
            className={`text-muted-foreground mt-2 ${isPageLevel ? 'text-base' : 'text-sm'}`}
          >
            {isPageLevel 
              ? 'Se produjo un error inesperado. Por favor, intenta recargar la página.'
              : 'Este componente no se pudo cargar correctamente.'
            }
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && error && (
          <details className="text-left">
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              Ver detalles del error
            </summary>
            <pre className="mt-2 text-xs bg-muted p-3 rounded overflow-auto max-h-40">
              {error.message}
              {error.stack && '\n\n' + error.stack}
            </pre>
          </details>
        )}

        <div className={`flex gap-3 ${isPageLevel ? 'flex-row justify-center' : 'flex-col'}`}>
          <Button 
            onClick={onReset}
            variant="outline"
            size={isPageLevel ? 'default' : 'sm'}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reintentar
          </Button>
          
          {isPageLevel && (
            <Button asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Ir al inicio
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// Hook para reporte de errores
export function useErrorHandler() {
  const handleError = (error: Error, errorInfo?: any) => {
    // Aquí puedes integrar con servicios como Sentry, LogRocket, etc.
    if (typeof window !== 'undefined') {
      // Report to analytics
      console.error('Application error:', error, errorInfo)
      
      // You can add integrations here:
      // Sentry.captureException(error, { extra: errorInfo })
      // window.gtag?.('event', 'exception', { description: error.message })
    }
  }

  return { handleError }
}
