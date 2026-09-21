import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { Language } from '../i18n/translations'
import { translations } from '../i18n/translations'
import { links } from '../data/links'

type Props = {
  language: Language
  setLanguage: (language: Language) => void
  theme: 'light' | 'dark'
  toggleTheme: () => void
  children: React.ReactNode
}

export function Layout({ language, setLanguage, theme, toggleTheme, children }: Props) {
  const t = translations[language]
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const nav = [
    ['about', t.nav.about], ['projects', t.nav.projects], ['experience', t.nav.experience],
    ['technologies', t.nav.technologies], ['contact', t.nav.contact],
  ] as const
  return <>
    <a className="skip-link" href="#main" onClick={event => { event.preventDefault(); const main = document.getElementById('main'); main?.setAttribute('tabindex', '-1'); main?.focus() }}>{t.skip}</a>
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" to="/" aria-label="Darlan Ferreira — Home">DF<span className="brand-dot">.</span></Link>
        <button className="menu-toggle" type="button" aria-label={t.menu} aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <nav id="primary-nav" className={menuOpen ? 'primary-nav open' : 'primary-nav'} aria-label="Primary">
          {nav.map(([id, label]) => <Link key={id} to={`/#${id}`} onClick={() => { setMenuOpen(false); if (location.pathname === '/') document.getElementById(id)?.scrollIntoView() }}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <label className="sr-only" htmlFor="language">{t.language}</label>
          <select id="language" aria-label={t.language} value={language} onChange={e => setLanguage(e.target.value as Language)}>
            <option value="pt">PT</option><option value="en">EN</option><option value="es">ES</option>
          </select>
          <button className="theme-toggle" type="button" aria-label={t.theme} title={t.theme} onClick={toggleTheme}>{theme === 'dark' ? '☀' : '☾'}</button>
        </div>
      </div>
    </header>
    {children}
    <footer className="site-footer"><div className="shell footer-inner"><span>© {new Date().getFullYear()} · {t.footer}</span><div><a href={links.github} target="_blank" rel="noreferrer">GitHub</a><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div></div></footer>
  </>
}
