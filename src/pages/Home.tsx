import { Link } from 'react-router-dom'
import { ProjectCard } from '../components/ProjectCard'
import { links } from '../data/links'
import { projects } from '../data/projects'
import type { Language } from '../i18n/translations'
import { translations } from '../i18n/translations'

const technologyGroups = {
  backend: ['Java', 'Spring', 'Python', 'FastAPI', 'Express', 'NestJS'],
  frontend: ['JavaScript', 'TypeScript', 'Vue.js', 'React'],
  database: ['PostgreSQL', 'MongoDB', 'SQL'],
  testing: ['Playwright', 'Cypress', 'JUnit', 'Jest', 'Vitest'],
  dev: ['Docker', 'Git', 'Linux'],
  other: ['Python', 'Pandas', 'NumPy', 'OpenCV', 'MediaPipe', 'Flutter', 'Kotlin', 'n8n'],
} as const
const priority = new Set(['Java', 'Spring', 'PostgreSQL', 'MongoDB', 'TypeScript'])

export function Home({ language }: { language: Language }) {
  const t = translations[language]
  return <main id="main">
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy"><p className="eyebrow"><span className="small-line" />{t.hero.eyebrow}</p><h1 id="hero-title">Darlan<br /><span>Ferreira<span className="accent">.</span></span></h1><div className="hero-roles"><strong>{t.hero.role}</strong><span>{t.hero.student}</span></div><p className="hero-description">{t.hero.description}</p><div className="hero-actions"><Link className="button button-primary" to="/#projects" onClick={() => document.getElementById('projects')?.scrollIntoView()}>{t.hero.projects} <span aria-hidden="true">↗</span></Link><a className="button button-outline" href={links.github} target="_blank" rel="noreferrer">GitHub ↗</a><a className="button button-outline" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div>
      <div className="hero-aside" aria-label={t.hero.availability}><span className="aside-mark" aria-hidden="true">&lt;/&gt;</span><div><span className="availability-dot" aria-hidden="true" /><p>{t.hero.availability}</p></div></div>
    </section>
    <section className="section section-alt" id="about" aria-labelledby="about-title"><div className="shell section-grid"><div><p className="eyebrow">{t.about.label}</p><h2 id="about-title">{t.about.title}</h2></div><p className="section-lead">{t.about.text}</p></div></section>
    <section className="section" id="experience" aria-labelledby="experience-title"><div className="shell"><div className="section-heading"><p className="eyebrow">{t.experience.label}</p><h2 id="experience-title">{t.experience.title}</h2></div><article className="experience-card"><div className="experience-meta"><span className="date">{t.experience.date}</span><h3>{t.experience.role}</h3><p>{t.experience.place}</p><div className="project-name"><span aria-hidden="true">↳</span><div><strong>{t.experience.project}</strong><p>{t.experience.intro}</p></div></div></div><div className="experience-areas">{t.experience.areas.map(area => <div className="area" key={area.title}><h4>{area.title}</h4><p>{area.text}</p></div>)}</div></article></div></section>
    <section className="section section-alt" id="technologies" aria-labelledby="technologies-title"><div className="shell"><div className="section-heading"><p className="eyebrow">{t.technologies.label}</p><h2 id="technologies-title">{t.technologies.title}</h2><p>{t.technologies.intro}</p></div><div className="tech-grid">{(Object.keys(technologyGroups) as (keyof typeof technologyGroups)[]).map(key => <div className="tech-group" key={key}><h3>{t.technologies.categories[key]}</h3><ul className="tech-list">{technologyGroups[key].map(tech => <li className={priority.has(tech) ? 'priority' : ''} key={tech}>{tech}</li>)}</ul></div>)}</div></div></section>
    <section className="section" id="projects" aria-labelledby="projects-title"><div className="shell"><div className="section-heading"><p className="eyebrow">{t.projects.label}</p><h2 id="projects-title">{t.projects.title}</h2><p>{t.projects.intro}</p></div><div className="projects-grid">{projects.map(project => <ProjectCard key={project.slug} project={project} language={language} />)}</div></div></section>
    <section className="section contact-section" id="contact" aria-labelledby="contact-title"><div className="shell contact-inner"><div><p className="eyebrow">{t.contact.label}</p><h2 id="contact-title">{t.contact.title}<span className="accent">.</span></h2><p>{t.contact.text}</p></div><div className="contact-links"><a className="button button-primary" href={`mailto:${links.email}`}>{t.contact.email} <span aria-hidden="true">↗</span></a><a href={links.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div></section>
  </main>
}
