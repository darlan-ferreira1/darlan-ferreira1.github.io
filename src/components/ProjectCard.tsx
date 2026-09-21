import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import type { Language } from '../i18n/translations'
import { translations } from '../i18n/translations'

export function ProjectCard({ project, language }: { project: Project; language: Language }) {
  const t = translations[language].projects
  return <article className={project.featured ? 'project-card featured-card' : 'project-card'}>
    <div className="card-top"><span className="eyebrow">{project.featured ? t.featured : t.title}</span><span className="status"><span aria-hidden="true" className="status-dot" />{project.status[language]}</span></div>
    <div className="project-symbol" aria-hidden="true">{'{ }'}</div>
    <div className="card-content"><h3>{project.name[language]}</h3><p>{project.summary[language]}</p><ul className="tags" aria-label={translations[language].technologies.title}>{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul><Link className="text-link" to={`/projects/${project.slug}`}>{t.details}<span aria-hidden="true"> ↗</span></Link></div>
  </article>
}
