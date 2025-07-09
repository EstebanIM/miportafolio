'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Locale, defaultLocale, getMessages } from '@/i18n'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, variables?: Record<string, React.ReactNode>) => any
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  useEffect(() => {
    // Get saved language from localStorage
    const savedLocale = localStorage.getItem('locale') as Locale
    if (savedLocale && ['es', 'en'].includes(savedLocale)) {
      setLocale(savedLocale)
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0]
      if (browserLang === 'en') {
        setLocale('en')
      }
    }
  }, [])

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)
    
    // Update document language
    document.documentElement.lang = newLocale
  }

  const t = (key: string, variables?: Record<string, React.ReactNode>): any => {
    const messages = getMessages(locale)
    const keys = key.split('.')
    let value: any = messages

    for (const k of keys) {
      value = value?.[k]
    }

    if (value === undefined || value === null) {
      console.warn(`Translation key "${key}" not found for locale "${locale}"`)
      return key
    }

    // Handle arrays
    if (Array.isArray(value)) {
      return value
    }

    // Handle strings
    if (typeof value !== 'string') {
      return value
    }

    // Replace variables in the string
    if (variables) {
      return Object.entries(variables).reduce((str, [varKey, varValue]) => {
        return str.replace(new RegExp(`{${varKey}}`, 'g'), String(varValue))
      }, value)
    }

    return value
  }

  const contextValue: LanguageContextType = {
    locale,
    setLocale: handleSetLocale,
    t,
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export function useTranslation() {
  const { t } = useLanguage()
  return { t }
}
