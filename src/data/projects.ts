import type { Language } from '../i18n/translations'
import { claraJsContent } from './content/claraJs'
import { yadroContent } from './content/yadro'

type Localized = Record<Language, string>

// Texto dos blocos aceita **negrito** e `código` inline.
export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'code'; code: string }

export interface ContentSection {
  title: string
  blocks: ContentBlock[]
}

export interface Project {
  slug: string
  name: Localized
  subtitle?: Localized
  summary: Localized
  context?: Localized
  description?: Localized
  status: Localized
  technologies: string[]
  problem?: Localized
  solution?: Localized
  features?: Record<Language, string[]>
  architecture?: Localized
  technicalDecisions?: Localized
  challenges?: Localized
  content?: Record<Language, ContentSection[]>
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
    slug: 'clara-js',
    name: { pt: 'CLARA.js', en: 'CLARA.js', es: 'CLARA.js' },
    subtitle: {
      pt: 'Centro de Laboratórios para Aprendizagem e Representação Analítica',
      en: 'Centro de Laboratórios para Aprendizagem e Representação Analítica',
      es: 'Centro de Laboratórios para Aprendizagem e Representação Analítica',
    },
    summary: {
      pt: 'Plataforma web gratuita de experimentos interativos de Física, Química e Biologia para o ensino médio, com 3D, realidade aumentada, realidade virtual e interação por gestos da mão pela webcam.',
      en: 'Free web platform of interactive Physics, Chemistry and Biology experiments for high school, with 3D, augmented reality, virtual reality and hand-gesture interaction through the webcam.',
      es: 'Plataforma web gratuita de experimentos interactivos de Física, Química y Biología para la enseñanza secundaria, con 3D, realidad aumentada, realidad virtual e interacción por gestos de la mano con la webcam.',
    },
    context: {
      pt: 'Trabalho de Conclusão de Curso em Ciência da Computação — Universidade Federal do Ceará (UFC)',
      en: 'Undergraduate thesis in Computer Science — Federal University of Ceará (UFC)',
      es: 'Trabajo de fin de grado en Ciencia de la Computación — Universidad Federal de Ceará (UFC)',
    },
    status: { pt: 'Publicado', en: 'Live', es: 'Publicado' },
    technologies: ['React 19', 'TypeScript', 'Vite', 'Three.js', 'WebXR', 'MediaPipe', 'GitHub Actions'],
    content: claraJsContent,
    demo: 'https://darlan-ferreira1.github.io/TCC/',
    github: 'https://github.com/darlan-ferreira1/TCC',
    featured: true,
  },
  {
    slug: 'yadro',
    name: { pt: 'Yadro', en: 'Yadro', es: 'Yadro' },
    subtitle: { pt: 'Java Backend Project', en: 'Java Backend Project', es: 'Java Backend Project' },
    summary: {
      pt: 'API REST para gestão de projetos de software sob contrato: clientes, contratos, equipes, alocações, sprints, tarefas, horas e faturamento.',
      en: 'REST API for managing contracted software projects: clients, contracts, teams, staff assignments, sprints, tasks, hours and billing.',
      es: 'API REST para gestionar proyectos de software bajo contrato: clientes, contratos, equipos, asignaciones, sprints, tareas, horas y facturación.',
    },
    status: { pt: 'Em desenvolvimento', en: 'In development', es: 'En desarrollo' },
    technologies: ['Java 21', 'Spring Boot 3', 'Spring Data JPA', 'PostgreSQL', 'Flyway', 'Spring Security + JWT', 'Testcontainers'],
    content: yadroContent,
    // github: adicionar quando o repositório for público.
  },
]
