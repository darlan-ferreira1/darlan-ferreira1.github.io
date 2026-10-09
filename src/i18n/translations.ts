export type Language = 'pt' | 'en' | 'es'

export const translations = {
  pt: {
    nav: { about: 'Sobre', projects: 'Projetos', experience: 'Experiência', technologies: 'Tecnologias', contact: 'Contato' },
    skip: 'Pular para o conteúdo', theme: 'Alternar tema', language: 'Selecionar idioma', menu: 'Abrir menu',
    hero: { eyebrow: 'DESENVOLVIMENTO DE SOFTWARE · BACKEND', role: 'Software Developer', student: 'Computer Science Student', description: 'No último semestre de Ciência da Computação na UFC, reúno cerca de um ano de experiência profissional em desenvolvimento web full stack. Hoje meu foco é Java e Spring, com atuação em backend, frontend, testes e infraestrutura.', projects: 'Ver projetos', availability: 'Aberto a oportunidades de desenvolvimento júnior e estágio remunerado.' },
    about: { label: '01 / PERFIL', title: 'Sobre mim', text: 'Estou concluindo Ciência da Computação na Universidade Federal do Ceará. Minha experiência profissional em desenvolvimento web me deu uma visão do produto inteiro, da API à interface e aos testes. Quero aprofundar minha atuação em backend e engenharia de software; aprendo novas ferramentas com facilidade quando o problema pede.' },
    experience: { label: '02 / TRAJETÓRIA', title: 'Experiência', role: 'Estágio em Desenvolvimento Web Full Stack', place: 'Núcleo de Práticas de Informática (NPI) – UFC Quixadá', date: 'jul/2024 — jul/2025', project: "Odontuário - UFC", intro: "Sistema web de prontuário odontológico usado pelos cursos de Odontologia da UFC. Trabalho em sprints usando a metodologia Scrum.", areas: [
      {
            "title": "Backend e dados",
            "text": "Java/Spring e PostgreSQL: modelagem de dados, endpoints REST, consultas JPQL e relacionamentos many-to-many."
      },
      {
            "title": "Frontend",
            "text": "Vue.js e TypeScript com Vuetify e gerência de estado com Pinia; construção do módulo de periodontograma com componentes SVG interativos, com design no Inkscape."
      },
      {
            "title": "Autenticação e segurança",
            "text": "Keycloak: múltiplos perfis de usuário (roles), permissões por endpoint via Spring Security, tokens JWT e OAuth2."
      },
      {
            "title": "Testes",
            "text": "Refatoração dos testes end-to-end de Cypress para Playwright usando Page Object Model e banco de teste isolado; testes unitários no frontend com Jest/Vitest."
      },
      {
            "title": "Infraestrutura local",
            "text": "Docker/Docker Compose com Keycloak e PostgreSQL em Linux, replicando o ambiente de produção para desenvolvimento e testes integrados."
      },
      {
            "title": "Engenharia de software e metodologias",
            "text": "Scrum e Kanban, metodologias ágeis, versionamento com Git/GitLab e qualidade de código com SonarLint e ESLint."
      }
] },
    technologies: { label: '03 / FERRAMENTAS', title: 'Tecnologias', intro: 'Ferramentas com as quais já trabalhei ou venho estudando, organizadas por área. Meu foco atual está no ecossistema Java e em dados.', categories: {"backend": "Backend web", "frontend": "Frontend web", "mobile": "Mobile e desktop", "database": "Bancos de dados", "automation": "Automação", "dataScience": "Ciência de dados", "testing": "Testes", "ai": "Inteligência artificial", "dev": "Engenharia e infraestrutura"}, descriptions: {"backend": "Desenvolvimento de serviços e APIs.", "frontend": "Desenvolvimento de interfaces web.", "mobile": "Aplicações mobile e desktop.", "database": "Modelagem relacional e NoSQL.", "automation": "Integrações, APIs REST, web scraping e rotinas agendadas.", "dataScience": "Análise, tratamento e visualização de dados.", "testing": "Testes unitários e end-to-end.", "ai": "Visão computacional, algoritmos de busca e aprendizado supervisionado e não supervisionado.", "dev": "Ambientes de desenvolvimento, colaboração e qualidade de código."} },
    projects: { label: '04 / TRABALHOS', title: 'Projetos', intro: 'Projetos selecionados e em evolução.', featured: 'PROJETO EM DESTAQUE', details: 'Ver detalhes', draft: 'Registro inicial do projeto. Detalhes técnicos serão adicionados conforme o desenvolvimento avançar.', back: 'Voltar ao portfólio', overview: 'Visão geral', problem: 'Problema', solution: 'Solução', features: 'Funcionalidades', architecture: 'Arquitetura', decisions: 'Decisões técnicas', challenges: 'Desafios', run: 'Como executar', video: 'Vídeo', screenshots: 'Capturas de tela', demo: 'Demo', source: 'Código no GitHub', notFound: 'Projeto não encontrado', notFoundText: 'O projeto solicitado não está disponível.' },
    contact: { label: '05 / CONTATO', title: 'Vamos conversar', text: 'Estou disponível para oportunidades como desenvolvedor de software júnior ou estágio remunerado em desenvolvimento.', email: 'Enviar e-mail' },
    footer: 'Desenvolvido por Darlan Ferreira',
  },
  en: {
    nav: { about: 'About', projects: 'Projects', experience: 'Experience', technologies: 'Technologies', contact: 'Contact' },
    skip: 'Skip to content', theme: 'Toggle theme', language: 'Select language', menu: 'Open menu',
    hero: { eyebrow: 'SOFTWARE DEVELOPMENT · BACKEND', role: 'Software Developer', student: 'Computer Science Student', description: 'In my final semester of Computer Science at UFC, I have about one year of professional full stack web development experience. My current focus is Java and Spring, with work across backend, frontend, testing and infrastructure.', projects: 'View projects', availability: 'Open to junior developer roles and paid development internships.' },
    about: { label: '01 / PROFILE', title: 'About me', text: 'I am completing a Computer Science degree at the Federal University of Ceará. My professional web development experience gave me a view of the whole product, from APIs to interfaces and tests. I want to deepen my work in backend and software engineering; I learn new tools quickly when a problem calls for them.' },
    experience: { label: '02 / PATH', title: 'Experience', role: 'Full Stack Web Development Internship', place: 'Núcleo de Práticas de Informática (NPI) – UFC Quixadá', date: 'Jul 2024 — Jul 2025', project: "Odontuário - UFC", intro: "Web dental records system used by UFC dentistry programs. Work organized into sprints using Scrum.", areas: [
      {
            "title": "Backend and data",
            "text": "Java/Spring and PostgreSQL: data modeling, REST endpoints, JPQL queries and many-to-many relationships."
      },
      {
            "title": "Frontend",
            "text": "Vue.js and TypeScript with Vuetify and Pinia state management; development of the periodontal chart module with interactive SVG components designed in Inkscape."
      },
      {
            "title": "Authentication and security",
            "text": "Keycloak: multiple user roles, endpoint permissions through Spring Security, JWT tokens and OAuth2."
      },
      {
            "title": "Testing",
            "text": "Migration of end-to-end tests from Cypress to Playwright using Page Object Model and an isolated test database; frontend unit tests with Jest/Vitest."
      },
      {
            "title": "Local infrastructure",
            "text": "Docker/Docker Compose with Keycloak and PostgreSQL on Linux, replicating the production environment for development and integration testing."
      },
      {
            "title": "Software engineering and methodologies",
            "text": "Scrum and Kanban, agile methodologies, Git/GitLab version control and code quality with SonarLint and ESLint."
      }
] },
    technologies: { label: '03 / TOOLKIT', title: 'Technologies', intro: 'Tools I have used or am studying, grouped by area. My current focus is the Java ecosystem and data.', categories: {"backend": "Web backend", "frontend": "Web frontend", "mobile": "Mobile and desktop", "database": "Databases", "automation": "Automation", "dataScience": "Data science", "testing": "Testing", "ai": "Artificial intelligence", "dev": "Engineering and infrastructure"}, descriptions: {"backend": "Service and API development.", "frontend": "Web interface development.", "mobile": "Mobile and desktop applications.", "database": "Relational and NoSQL modeling.", "automation": "Integrations, REST APIs, web scraping and scheduled tasks.", "dataScience": "Data analysis, processing and visualization.", "testing": "Unit and end-to-end tests.", "ai": "Computer vision, search algorithms, supervised and unsupervised learning.", "dev": "Development environments, collaboration and code quality."} },
    projects: { label: '04 / WORK', title: 'Projects', intro: 'Selected projects and work in progress.', featured: 'FEATURED PROJECT', details: 'View details', draft: 'Initial project entry. Technical details will be added as development progresses.', back: 'Back to portfolio', overview: 'Overview', problem: 'Problem', solution: 'Solution', features: 'Features', architecture: 'Architecture', decisions: 'Technical decisions', challenges: 'Challenges', run: 'How to run', video: 'Video', screenshots: 'Screenshots', demo: 'Demo', source: 'GitHub source', notFound: 'Project not found', notFoundText: 'The requested project is unavailable.' },
    contact: { label: '05 / CONTACT', title: 'Let’s talk', text: 'I am available for junior software developer roles and paid development internships.', email: 'Send email' },
    footer: 'Built by Darlan Ferreira',
  },
  es: {
    nav: { about: 'Sobre mí', projects: 'Proyectos', experience: 'Experiencia', technologies: 'Tecnologías', contact: 'Contacto' },
    skip: 'Saltar al contenido', theme: 'Cambiar tema', language: 'Seleccionar idioma', menu: 'Abrir menú',
    hero: { eyebrow: 'DESARROLLO DE SOFTWARE · BACKEND', role: 'Software Developer', student: 'Computer Science Student', description: 'En mi último semestre de Ciencias de la Computación en la UFC, cuento con aproximadamente un año de experiencia profesional en desarrollo web full stack. Actualmente me enfoco en Java y Spring, con trabajo en backend, frontend, pruebas e infraestructura.', projects: 'Ver proyectos', availability: 'Disponible para puestos de desarrollador júnior y prácticas remuneradas en desarrollo.' },
    about: { label: '01 / PERFIL', title: 'Sobre mí', text: 'Estoy terminando Ciencias de la Computación en la Universidad Federal de Ceará. Mi experiencia profesional en desarrollo web me permitió conocer el producto completo, desde las API hasta la interfaz y las pruebas. Quiero profundizar en backend e ingeniería de software; aprendo nuevas herramientas con facilidad cuando el problema lo requiere.' },
    experience: { label: '02 / TRAYECTORIA', title: 'Experiencia', role: 'Prácticas de Desarrollo Web Full Stack', place: 'Núcleo de Práticas de Informática (NPI) – UFC Quixadá', date: 'jul/2024 — jul/2025', project: "Odontuário - UFC", intro: "Sistema web de historias clínicas odontológicas utilizado por las carreras de Odontología de la UFC. Trabajo en sprints con Scrum.", areas: [
      {
            "title": "Backend y datos",
            "text": "Java/Spring y PostgreSQL: modelado de datos, endpoints REST, consultas JPQL y relaciones many-to-many."
      },
      {
            "title": "Frontend",
            "text": "Vue.js y TypeScript con Vuetify y gestión de estado con Pinia; construcción del módulo de periodontograma con componentes SVG interactivos diseñados en Inkscape."
      },
      {
            "title": "Autenticación y seguridad",
            "text": "Keycloak: múltiples perfiles de usuario (roles), permisos por endpoint con Spring Security, tokens JWT y OAuth2."
      },
      {
            "title": "Pruebas",
            "text": "Migración de pruebas end-to-end de Cypress a Playwright con Page Object Model y una base de datos de pruebas aislada; pruebas unitarias del frontend con Jest/Vitest."
      },
      {
            "title": "Infraestructura local",
            "text": "Docker/Docker Compose con Keycloak y PostgreSQL en Linux, replicando el entorno de producción para desarrollo y pruebas de integración."
      },
      {
            "title": "Ingeniería de software y metodologías",
            "text": "Scrum y Kanban, metodologías ágiles, control de versiones con Git/GitLab y calidad de código con SonarLint y ESLint."
      }
] },
    technologies: { label: '03 / HERRAMIENTAS', title: 'Tecnologías', intro: 'Herramientas que he utilizado o estoy estudiando, agrupadas por área. Mi enfoque actual es el ecosistema Java y los datos.', categories: {"backend": "Backend web", "frontend": "Frontend web", "mobile": "Mobile y escritorio", "database": "Bases de datos", "automation": "Automatización", "dataScience": "Ciencia de datos", "testing": "Pruebas", "ai": "Inteligencia artificial", "dev": "Ingeniería e infraestructura"}, descriptions: {"backend": "Desarrollo de servicios y API.", "frontend": "Desarrollo de interfaces web.", "mobile": "Aplicaciones mobile y de escritorio.", "database": "Modelado relacional y NoSQL.", "automation": "Integraciones, API REST, web scraping y tareas programadas.", "dataScience": "Análisis, procesamiento y visualización de datos.", "testing": "Pruebas unitarias y end-to-end.", "ai": "Visión computacional, algoritmos de búsqueda y aprendizaje supervisado y no supervisado.", "dev": "Entornos de desarrollo, colaboración y calidad de código."} },
    projects: { label: '04 / TRABAJOS', title: 'Proyectos', intro: 'Proyectos seleccionados y en evolución.', featured: 'PROYECTO DESTACADO', details: 'Ver detalles', draft: 'Registro inicial del proyecto. Se añadirán detalles técnicos a medida que avance el desarrollo.', back: 'Volver al portafolio', overview: 'Resumen', problem: 'Problema', solution: 'Solución', features: 'Funcionalidades', architecture: 'Arquitectura', decisions: 'Decisiones técnicas', challenges: 'Desafíos', run: 'Cómo ejecutar', video: 'Vídeo', screenshots: 'Capturas de pantalla', demo: 'Demo', source: 'Código en GitHub', notFound: 'Proyecto no encontrado', notFoundText: 'El proyecto solicitado no está disponible.' },
    contact: { label: '05 / CONTACTO', title: 'Hablemos', text: 'Estoy disponible para puestos de desarrollador de software júnior y prácticas remuneradas en desarrollo.', email: 'Enviar correo' },
    footer: 'Desarrollado por Darlan Ferreira',
  },
} as const
