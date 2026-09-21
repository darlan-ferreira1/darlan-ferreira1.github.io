import { useEffect, useState } from 'react'
import type { Language } from '../i18n/translations'

type Theme = 'light' | 'dark'

function initialTheme(): Theme {
  const saved = localStorage.getItem('portfolio-theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function initialLanguage(): Language {
  const saved = localStorage.getItem('portfolio-language')
  return saved === 'en' || saved === 'es' ? saved : 'pt'
}

export function usePreferences() {
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const [language, setLanguage] = useState<Language>(initialLanguage)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : language
    localStorage.setItem('portfolio-language', language)
  }, [language])

  return { theme, setTheme, language, setLanguage }
}
