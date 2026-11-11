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

export interface Screenshot {
  src: string
  alt: Localized
  at?: { section: number; block: number }
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
  // `at`: mostra a imagem no meio do texto, depois do bloco `block` da seção `section` (índices de `content`).
  // Sem `at`, a imagem vai para a galeria no final da página.
  // Capa do card na página inicial: 16:9 (ex.: 1600×900), recortada a partir do topo.
  cover?: string
  screenshots?: Screenshot[]
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
      pt: 'Plataforma web gratuita de experimentos interativos de Física, Química e Biologia para o ensino médio, com 3D, realidade aumentada, realidade virtual e interação por gestos da mão pela webcam. Roda no navegador, instala no Windows, no Linux e no Android e funciona sem internet.',
      en: 'Free web platform of interactive Physics, Chemistry and Biology experiments for high school, with 3D, augmented reality, virtual reality and hand-gesture interaction through the webcam. It runs in the browser, installs on Windows, Linux and Android, and works offline.',
      es: 'Plataforma web gratuita de experimentos interactivos de Física, Química y Biología para la enseñanza secundaria, con 3D, realidad aumentada, realidad virtual e interacción por gestos de la mano con la webcam. Funciona en el navegador, se instala en Windows, Linux y Android y funciona sin internet.',
    },
    context: {
      pt: 'Trabalho de Conclusão de Curso em Ciência da Computação — Universidade Federal do Ceará (UFC)',
      en: 'Undergraduate thesis in Computer Science — Federal University of Ceará (UFC)',
      es: 'Trabajo de fin de grado en Ciencia de la Computación — Universidad Federal de Ceará (UFC)',
    },
    status: { pt: 'Publicado', en: 'Live', es: 'Publicado' },
    technologies: ['React 19', 'TypeScript', 'Vite', 'Three.js', 'WebXR', 'MediaPipe', 'Tauri 2', 'PWA', 'Playwright', 'GitHub Actions'],
    content: claraJsContent,
    cover: '/projetos/clara-js/capa.jpg',
    screenshots: [
      { src: '/projetos/clara-js/galeria.jpg', alt: { pt: 'Galeria do CLARA.js no computador', en: 'CLARA.js gallery on desktop', es: 'Galería de CLARA.js en el ordenador' }, at: { section: 2, block: 1 } },
      { src: '/projetos/clara-js/deskScreens.png', alt: { pt: 'Tela inicial e Galeria filtrada por Física, no computador', en: 'Home screen and Gallery filtered by Physics, on desktop', es: 'Pantalla inicial y Galería filtrada por Física, en el ordenador' }, at: { section: 2, block: 1 } },
      { src: '/projetos/clara-js/mobileScreens.png', alt: { pt: 'Tela inicial e Galeria no celular', en: 'Home screen and Gallery on a phone', es: 'Pantalla inicial y Galería en el móvil' }, at: { section: 2, block: 1 } },
      { src: '/projetos/clara-js/deskLancamentoOb.png', alt: { pt: 'Lançamento de Projétil no computador, com alcance, altura máxima e tempo de voo', en: 'Projectile Motion on desktop, with range, maximum height and flight time', es: 'Lanzamiento de Proyectil en el ordenador, con alcance, altura máxima y tiempo de vuelo' }, at: { section: 3, block: 0 } },
      { src: '/projetos/clara-js/telasMobileExpsInterativos.png', alt: { pt: 'Dupla Hélice de DNA, Ondas Mecânicas e Modelo de Bohr no celular', en: 'DNA Double Helix, Mechanical Waves and Bohr Model on a phone', es: 'Doble Hélice de ADN, Ondas Mecánicas y Modelo de Bohr en el móvil' }, at: { section: 3, block: 0 } },
      { src: '/projetos/clara-js/teoria.jpg', alt: { pt: 'Geometria Molecular com o painel Teoria aberto', en: 'Molecular Geometry with the Theory panel open', es: 'Geometría Molecular con el panel Teoría abierto' }, at: { section: 1, block: 2 } },
      { src: '/projetos/clara-js/teoriaComoFoiFeito.png', alt: { pt: 'Painéis Teoria e Como foi feito do experimento de Ondas Mecânicas', en: 'Theory and How it was made panels of the Mechanical Waves experiment', es: 'Paneles Teoría y Cómo se hizo del experimento de Ondas Mecánicas' }, at: { section: 1, block: 2 } },
      { src: '/projetos/clara-js/museu.jpg', alt: { pt: 'Museu Virtual: o salão com uma porta para cada experimento e a sala interativa da Geometria Molecular, com o painel de ajustes aberto', en: 'Virtual Museum: the hall with a door for each experiment and the Molecular Geometry interactive room, with the settings panel open', es: 'Museo Virtual: la sala principal con una puerta para cada experimento y la sala interactiva de Geometría Molecular, con el panel de ajustes abierto' }, at: { section: 2, block: 3 } },
      { src: '/projetos/clara-js/ra.jpg', alt: { pt: 'Realidade aumentada no celular: ajustes antes de começar, retícula sobre a mesa e o átomo posicionado e ampliado com a pinça', en: 'Augmented reality on a phone: settings before starting, the reticle on the desk, and the atom placed and enlarged with a pinch', es: 'Realidad aumentada en el móvil: ajustes antes de empezar, la retícula sobre la mesa y el átomo colocado y ampliado con el gesto de pinza' }, at: { section: 2, block: 7 } },
      { src: '/projetos/clara-js/RAEspiral.jpg', alt: { pt: 'Dupla Hélice de DNA em realidade aumentada, no meio de uma sala', en: 'DNA Double Helix in augmented reality, in the middle of a room', es: 'Doble Hélice de ADN en realidad aumentada, en medio de una habitación' }, at: { section: 2, block: 7 } },
      { src: '/projetos/clara-js/rv.jpg', alt: { pt: 'Dupla Hélice de DNA em realidade virtual no celular, com uma imagem para cada olho', en: 'DNA Double Helix in virtual reality on a phone, with one image for each eye', es: 'Doble Hélice de ADN en realidad virtual en el móvil, con una imagen para cada ojo' }, at: { section: 2, block: 9 } },
      { src: '/projetos/clara-js/RVquimica.jpg', alt: { pt: 'Modelo de Bohr do silício em realidade virtual no celular', en: 'Bohr model of silicon in virtual reality on a phone', es: 'Modelo de Bohr del silicio en realidad virtual en el móvil' }, at: { section: 2, block: 9 } },
    ],
    demo: 'https://darlan-ferreira1.github.io/CLARA.js/',
    github: 'https://github.com/darlan-ferreira1/CLARA.js',
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
