import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import type { Language } from '../i18n/translations'
import { translations } from '../i18n/translations'

export function ProjectCard({ project, language }: { project: Project; language: Language }) {
  const t = translations[language].projects
  const detail = `/projects/${project.slug}`
  return <article className="project-card">
    <Link className="card-cover" to={detail} tabIndex={-1} aria-hidden="true">
      {project.cover ? <img src={project.cover} alt="" loading="lazy" /> : <span className="card-cover-placeholder">{'{ }'}</span>}
    </Link>
    <div className="card-body">
      <h3><Link to={detail}>{project.name[language]}</Link></h3>
      <p className="card-tech">{project.technologies.join(' · ')}</p>
      <p className="card-summary">{project.summary[language]}</p>
      {project.context && <p className="card-context">{project.context[language]}</p>}
      <ul className="card-meta">
        <li><Link to={detail}>{t.details}</Link></li>
        {project.github && <li><a href={project.github} target="_blank" rel="noreferrer">{t.source}</a></li>}
        {project.demo && <li><a href={project.demo} target="_blank" rel="noreferrer">{t.demo}</a></li>}
        <li>{project.status[language]}</li>
      </ul>
    </div>
  </article>
}
