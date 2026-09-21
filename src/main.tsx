import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { ProjectDetails } from './pages/ProjectDetails'
import { usePreferences } from './hooks/usePreferences'
import { translations } from './i18n/translations'
import './styles/main.css'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView())
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function PageTitle({ language }: { language: 'pt' | 'en' | 'es' }) {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = `${pathname.startsWith('/projects/') ? `${translations[language].projects.title} | ` : ''}Darlan Ferreira | Software Developer`
  }, [language, pathname])
  return null
}

function App() {
  const { theme, setTheme, language, setLanguage } = usePreferences()
  return <HashRouter><ScrollManager /><PageTitle language={language} /><Layout language={language} setLanguage={setLanguage} theme={theme} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><Routes><Route path="/" element={<Home language={language} />} /><Route path="/projects/:slug" element={<ProjectDetails language={language} />} /><Route path="*" element={<ProjectDetails language={language} />} /></Routes></Layout></HashRouter>
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
