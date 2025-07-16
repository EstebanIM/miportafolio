import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { SmoothScroll } from '@/components/ui/smooth-scroll'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { ReadingProgress } from '@/components/ui/reading-progress'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import { ThemeTransition } from '@/components/ui/theme-transition'
import { ErrorBoundary } from '@/components/error-boundary'
import { StructuredData } from '@/components/structured-data'
import { SkipLinks } from '@/components/skip-links'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tu-dominio.vercel.app'
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Esteban Inzunza Portfolio'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Esteban Inzunza - Desarrollador Front End',
    template: '%s | Esteban Inzunza'
  },
  description: 'Desarrollador Front End especializado en React, Next.js y TypeScript. Creando interfaces web modernas y atractivas.',
  keywords: ['desarrollador', 'frontend', 'react', 'nextjs', 'typescript', 'javascript', 'css'],
  authors: [{ name: 'Esteban Inzunza' }],
  creator: 'Esteban Inzunza',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-dark.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    title: 'Esteban Inzunza - Desarrollador Front End',
    description: 'Desarrollador Front End especializado en React, Next.js y TypeScript.',
    siteName,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Esteban Inzunza - Desarrollador Front End',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Esteban Inzunza - Desarrollador Front End',
    description: 'Desarrollador Front End especializado en React, Next.js y TypeScript.',
    creator: '@tu_usuario',
    images: [`${siteUrl}/og-image.jpg`],
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
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SkipLinks />
        <ErrorBoundary level="page">
          <LanguageProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange={false}
            >
              <ThemeTransition />
              <SmoothScroll />
              <ScrollProgress />
              <ReadingProgress />
              <ScrollToTop />
              {children}
            </ThemeProvider>
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
