import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/projects'
import type { Language } from '../i18n/translations'
import { translations } from '../i18n/translations'

export function ProjectDetails({ language }: { language: Language }) {
  const { slug } = useParams()
  const project = projects.find(item => item.slug === slug)
  const t = translations[language].projects
  if (!project) return <main id="main" className="shell detail-page"><Link className="back-link" to="/">← {t.back}</Link><h1>{t.notFound}</h1><p>{t.notFoundText}</p></main>
  const sections = [
    [t.problem, project.problem?.[language]], [t.solution, project.solution?.[language]],
    [t.architecture, project.architecture?.[language]], [t.decisions, project.technicalDecisions?.[language]],
    [t.challenges, project.challenges?.[language]], [t.run, project.runInstructions?.[language]],
  ] as const
  return <main id="main" className="detail-page"><div className="shell"><Link className="back-link" to="/">← {t.back}</Link><div className="detail-hero"><div><p className="eyebrow">{project.featured ? t.featured : t.title}</p><h1>{project.name[language]}<span className="accent">.</span></h1><p className="detail-summary">{project.summary[language]}</p><div className="detail-links">{project.github && <a href={project.github} target="_blank" rel="noreferrer">{t.source} ↗</a>}{project.demo && <a href={project.demo} target="_blank" rel="noreferrer">{t.demo} ↗</a>}{project.video && <a href={project.video} target="_blank" rel="noreferrer">{t.video} ↗</a>}</div></div><aside className="detail-aside"><span className="status"><span aria-hidden="true" className="status-dot" />{project.status[language]}</span><ul className="tags">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul></aside></div><div className="detail-body">{project.description?.[language] && <section><h2>{t.overview}</h2><p>{project.description[language]}</p></section>}{sections.map(([title, body]) => body && <section key={title}><h2>{title}</h2><p>{body}</p></section>)}{project.features?.[language]?.length ? <section><h2>{t.features}</h2><ul className="feature-list">{project.features[language].map(feature => <li key={feature}>{feature}</li>)}</ul></section> : null}{project.screenshots?.length ? <section className="screenshots"><h2>{t.screenshots}</h2>{project.screenshots.map(image => <img key={image.src} src={image.src} alt={image.alt[language]} loading="lazy" />)}</section> : null}{project.isDraft && <div className="draft-note"><span aria-hidden="true">↗</span><p>{t.draft}</p></div>}</div></div></main>
}
