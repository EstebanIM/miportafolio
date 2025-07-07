import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme/theme-provider'

const inter = Inter({ subsets: ['latin'] })

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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
