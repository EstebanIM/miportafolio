import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Tu Nombre - Desarrollador Full Stack',
    template: '%s | Tu Nombre'
  },
  description: 'Desarrollador Full Stack especializado en React, Next.js y TypeScript. Creando experiencias web modernas y escalables.',
  keywords: ['desarrollador', 'react', 'nextjs', 'typescript', 'frontend', 'fullstack'],
  authors: [{ name: 'Tu Nombre' }],
  creator: 'Tu Nombre',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://tu-dominio.com',
    title: 'Tu Nombre - Desarrollador Full Stack',
    description: 'Desarrollador Full Stack especializado en React, Next.js y TypeScript.',
    siteName: 'Tu Nombre Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tu Nombre - Desarrollador Full Stack',
    description: 'Desarrollador Full Stack especializado en React, Next.js y TypeScript.',
    creator: '@tu_usuario',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'tu-codigo-de-verificacion',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
