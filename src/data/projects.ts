import type { Language } from '../i18n/translations'

type Localized = Record<Language, string>

export interface Project {
  slug: string
  name: Localized
  summary: Localized
  description?: Localized
  status: Localized
  technologies: string[]
  problem?: Localized
  solution?: Localized
  features?: Record<Language, string[]>
  architecture?: Localized
  technicalDecisions?: Localized
  challenges?: Localized
  screenshots?: { src: string; alt: Localized }[]
  video?: string
  demo?: string
  github?: string
  runInstructions?: Localized
  featured?: boolean
  isDraft?: boolean
}

export const projects: Project[] = [
  {
    slug: 'java-backend-project',
    name: { pt: 'Java Backend Project', en: 'Java Backend Project', es: 'Java Backend Project' },
    summary: {
      pt: 'Projeto backend em desenvolvimento com Java, Spring Boot, MongoDB e API REST.',
      en: 'Backend project in progress with Java, Spring Boot, MongoDB and a REST API.',
      es: 'Proyecto backend en desarrollo con Java, Spring Boot, MongoDB y API REST.',
    },
    status: { pt: 'Em desenvolvimento', en: 'In development', es: 'En desarrollo' },
    technologies: ['Java', 'Spring Boot', 'MongoDB', 'REST API'],
    featured: true,
    isDraft: true,
    // Preencha os campos opcionais abaixo quando houver informações verificadas.
    // problem, solution, features, architecture, technicalDecisions,
    // challenges, screenshots, video, demo, github, runInstructions
  },
]
