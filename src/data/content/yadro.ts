import type { Language } from '../../i18n/translations'
import type { ContentSection } from '../projects'

const packages = `io.swDev.yadro
├── config          # JPA auditing, security, CORS, OpenAPI, cache, async
├── controller      # HTTP boundary (DTOs in, DTOs out)
├── domain
│   ├── entities    # @Entity
│   │   └── enums
│   └── events      # Domain Events
├── dto
│   ├── request
│   ├── response
│   └── projection  # complex query projections
├── exception       # domain exceptions + @RestControllerAdvice
├── mapper          # MapStruct
├── repository      # Spring Data + Specifications
├── security        # JwtService, filter, UserDetailsService
├── service         # business rules + @Transactional
└── validation      # custom validators (@CpfCnpj)`

const stateMachine = `BACKLOG → A_FAZER → EM_ANDAMENTO → EM_REVISAO → CONCLUIDA
(any non-final state) → CANCELADA`

const endpoints = `POST   /api/v1/auth/login | /refresh | /registrar
CRUD   /api/v1/clientes
CRUD   /api/v1/projetos
PUT    /api/v1/projetos/{id}/contrato                      # 1:1
POST   /api/v1/projetos/{id}/colaboradores                 # N:N + attributes
DELETE /api/v1/projetos/{id}/colaboradores/{colaboradorId}
CRUD   /api/v1/projetos/{id}/sprints
CRUD   /api/v1/tarefas
PATCH  /api/v1/tarefas/{id}/status                         # state machine
GET    /api/v1/tarefas/{id}/historico
POST   /api/v1/tarefas/{id}/comentarios
CRUD   /api/v1/equipes | /colaboradores | /tags
GET    /api/v1/relatorios/...                              # 8 complex queries
GET    /api/v1/exportacoes/tarefas.csv`

export const yadroContent: Record<Language, ContentSection[]> = {
  pt: [
    {
      title: 'Visão geral',
      blocks: [
        { type: 'p', text: 'O **Yadro** é uma API REST para **gestão de projetos de software sob contrato**: uma software house cadastra seus clientes, fecha contratos, monta equipes, aloca colaboradores em projetos, organiza o trabalho em sprints e tarefas e acompanha horas, status e faturamento.' },
        { type: 'p', text: 'O projeto foi desenhado com **Java 21 + Spring Boot 3 + Spring Data JPA + PostgreSQL**: 14 entidades com os três tipos de relacionamento (1:1, 1:N, N:N com atributos), migrações versionadas com Flyway, autenticação **JWT** (access + refresh) com papéis, filtros dinâmicos com **Specifications**, 8 consultas analíticas complexas, soft delete, histórico de status, Domain Events, cache, AOP, jobs agendados, métricas e testes de todos os tipos.' },
        { type: 'p', text: '**O que o projeto demonstra:** modelar um domínio real, desenhar uma API REST profissional e usar o ecossistema Spring de forma consciente — não só "fazer funcionar", mas justificar cada decisão de arquitetura.' },
        { type: 'h3', text: 'Estado atual' },
        { type: 'p', text: 'Em desenvolvimento. Já existem o scaffold Spring Boot, 11 classes de domínio, 7 enums e o diagrama de classes UML (Astah). Esta página descreve o escopo completo planejado; o andamento de cada etapa está no roadmap, no fim da página.' },
      ],
    },
    {
      title: 'Stack e convenções',
      blocks: [
        { type: 'table', head: ['Item', 'Valor'], rows: [
          ['Linguagem', 'Java 21 LTS'],
          ['Framework', 'Spring Boot 3.5.x'],
          ['Persistência', 'Spring Data JPA / Hibernate + PostgreSQL (Docker Compose)'],
          ['Migrações', 'Flyway'],
          ['Mapeamento DTO', 'MapStruct (+ Lombok só para getters/setters/builders)'],
          ['Segurança', 'Spring Security + JWT (jjwt)'],
          ['Documentação', 'Springdoc OpenAPI / Swagger UI'],
          ['Testes', 'JUnit 5, Mockito, AssertJ, MockMvc, Testcontainers'],
          ['Modelagem', 'Diagrama de classes UML no Astah'],
          ['Prefixo da API', '`/api/v1`'],
          ['Identificadores', '`UUID`'],
          ['Configuração', '`application.yml` + profiles `dev`, `test`, `prod`'],
        ] },
        { type: 'h3', text: 'Estrutura de pacotes' },
        { type: 'code', code: packages },
      ],
    },
    {
      title: 'O domínio',
      blocks: [
        { type: 'h3', text: 'Atores' },
        { type: 'list', items: [
          '**Cliente** — empresa ou pessoa que contrata a software house.',
          '**Colaborador** — funcionário (dev, QA, designer, tech lead…), pertence a uma equipe.',
          '**Usuário** — conta de login da API (autenticação separada do domínio de negócio).',
        ] },
        { type: 'h3', text: 'Fluxo principal' },
        { type: 'list', items: [
          'Um **Cliente** é cadastrado (CPF/CNPJ validado).',
          'Um **Projeto** é aberto para o cliente e formalizado por um **ContratoProjeto** (valor, forma de pagamento, cláusulas).',
          '**Colaboradores** são alocados no projeto com um **papel** e um período (`ProjetoColaborador`).',
          'O trabalho é quebrado em **Sprints** e **Tarefas**; tarefas recebem **Tags**, um **responsável**, estimativa e horas gastas.',
          'Toda mudança de status de tarefa gera um registro em **HistoricoStatus** e dispara um Domain Event.',
          'Colaboradores discutem a tarefa via **ComentarioTarefa**.',
          'Gestores consultam relatórios: desempenho, faturamento, atrasos, rankings.',
        ] },
        { type: 'h3', text: 'Entidades' },
        { type: 'table', head: ['Entidade', 'Papel no domínio'], rows: [
          ['`Cliente`', 'quem contrata'],
          ['`Projeto`', 'unidade central de trabalho'],
          ['`ContratoProjeto`', 'contrato do projeto (satélite 1:1)'],
          ['`Equipe`', 'agrupamento de colaboradores'],
          ['`Colaborador`', 'quem executa o trabalho'],
          ['`ProjetoColaborador`', 'alocação N:N com atributos (papel, entrada, saída)'],
          ['`Sprint`', 'iteração do projeto'],
          ['`Tarefa`', 'item de trabalho'],
          ['`Tag`', 'rótulo de tarefa (N:N simples)'],
          ['`ComentarioTarefa`', 'discussão em tarefa'],
          ['`HistoricoStatus`', 'trilha de mudanças de status de tarefa'],
          ['`Usuario`', 'login e papéis'],
          ['`RefreshToken`', 'refresh token persistido e revogável (opcional)'],
          ['`Auditavel`', '`@MappedSuperclass` com campos de auditoria'],
        ] },
        { type: 'p', text: 'Os enums (`Cargo`, `FormaPagamento`, `PapelProjeto`, `Prioridade`, `StatusProjeto`, `StatusSprint`, `StatusTarefa` e `RoleUsuario`) são sempre persistidos com `@Enumerated(EnumType.STRING)`: nada de string mágica nem ordinal.' },
        { type: 'h3', text: 'Tipos de relacionamento' },
        { type: 'table', head: ['Tipo', 'No Yadro'], rows: [
          ['**1:1**', '`Projeto` ↔ `ContratoProjeto` (entidade satélite: dados contratuais e financeiros separados do projeto)'],
          ['**1:N**', '`Cliente` → `Projeto`, `Projeto` → `Sprint`, `Projeto` → `Tarefa`, `Sprint` → `Tarefa`, `Equipe` → `Colaborador`, `Tarefa` → `ComentarioTarefa`, `Tarefa` → `HistoricoStatus`'],
          ['**N:N com atributos**', '`Projeto` ↔ `Colaborador` via `ProjetoColaborador` (`papel`, `dataEntrada`, `dataSaida`)'],
          ['**N:N simples**', '`Tarefa` ↔ `Tag` (`@ManyToMany` + `@JoinTable`)'],
        ] },
        { type: 'p', text: 'Todos os `@ManyToOne` com `fetch = LAZY`; nenhuma entidade com `@Data` do Lombok (`equals`/`hashCode` baseados no id).' },
      ],
    },
    {
      title: 'Regras de negócio',
      blocks: [
        { type: 'p', text: 'As transições de status de tarefa seguem uma máquina de estados. Transição inválida → **409**.' },
        { type: 'code', code: stateMachine.replace('(any non-final state)', '(qualquer estado não final)') },
        { type: 'list', items: [
          'Ao concluir uma tarefa, `dataConclusao` é preenchida automaticamente.',
          'Tarefa só pode entrar em sprint do **mesmo projeto**.',
          'O responsável da tarefa precisa estar **alocado** no projeto (`ProjetoColaborador` ativo na data).',
          'Um projeto tem no máximo **uma sprint `EM_ANDAMENTO`** por vez.',
          'Sprint não pode ter `dataFim` antes de `dataInicio` (validador de classe).',
          'Contrato: `valorTotal > 0` e `numeroContrato` único.',
          'Cliente com projetos não pode ser removido fisicamente → soft delete (ou **409**).',
          '`email` de colaborador e cliente únicos; `cpfCnpj` validado e único.',
        ] },
      ],
    },
    {
      title: 'Funcionalidades e endpoints',
      blocks: [
        { type: 'table', head: ['#', 'Funcionalidade', 'Como aparece no Yadro'], rows: [
          ['F1', 'Inserir (POST + DTO validado)', '`POST /api/v1/clientes`, `/projetos`, `/tarefas`, …'],
          ['F2', 'Listar (GET + `Page` de DTOs)', '`GET /api/v1/projetos?page=0&size=20`'],
          ['F3', 'CRUD completo com validação, erro e logs', 'todas as entidades principais'],
          ['F4', 'Contagem', '`/projetos/contagem`, `/tarefas/contagem?status=…`'],
          ['F5', 'Paginação e ordenação', '`?sort=prioridade,desc&sort=dataCriacao,asc`'],
          ['F6', 'Filtros dinâmicos', '`TarefaSpecifications` / `ProjetoSpecifications`'],
          ['F7', 'Migrações versionadas', '`V1__schema_inicial`, …, `V4__historico_soft_delete`'],
          ['F8', 'Logging estruturado', 'MDC com `correlationId` + aspecto AOP'],
        ] },
        { type: 'h3', text: 'Endpoints principais' },
        { type: 'code', code: endpoints.replace('N:N + attributes', 'N:N com atributos').replace('state machine', 'máquina de estados').replace('8 complex queries', 'as 8 consultas complexas') },
      ],
    },
    {
      title: 'As 8 consultas complexas',
      blocks: [
        { type: 'table', head: ['#', 'Consulta', 'Técnica'], rows: [
          ['1', '**Desempenho dos colaboradores** — tarefas atribuídas, concluídas, % de conclusão, horas estimadas × gastas', 'JOIN de 3+ entidades + agregação + percentual'],
          ['2', '**Filtro composto de tarefas** — status, prioridade, projeto, cliente, sprint, cargo do responsável, tag, intervalo de datas (todos opcionais)', 'Specification com múltiplos JOINs'],
          ['3', '**Faturamento por cliente no período** — soma de `valorTotal` dos contratos por cliente', 'JOIN + intervalo de datas + `GROUP BY` + `SUM`'],
          ['4', '**Tarefas estouradas** — horas gastas acima da estimativa (com % de estouro) e projetos acima do previsto', 'Cálculo entre entidades relacionadas'],
          ['5', '**Tarefas atrasadas** — não concluídas em sprints vencidas, ordenadas por dias de atraso', 'Registros vencidos + JOIN em 4 entidades'],
          ['6', '**Ranking de tags** mais presentes em tarefas concluídas no período, top N', 'Agregação + `ORDER BY` + `LIMIT`'],
          ['7', '**Busca textual de tarefas** em título e descrição, com projeto e responsável', '`ILIKE` + JOIN via projection'],
          ['8', '**Tarefas por status × prioridade**, filtradas por ano de criação', 'Agregação em 2 dimensões'],
        ] },
        { type: 'p', text: 'Essas consultas cobrem `@Query` JPQL **e** nativo, projections **interface** e **DTO/record**, `@EntityGraph`/`JOIN FETCH` contra N+1 e a demonstração do problema N+1 com o log de SQL ligado.' },
      ],
    },
    {
      title: 'Ecossistema Spring',
      blocks: [
        { type: 'h3', text: 'Persistência e dados' },
        { type: 'list', items: [
          '**Spring Data JPA** com um repository por agregado e fetch consciente: `LAZY` em tudo, carregamento explícito onde precisa.',
          '**Specifications / Criteria API**, `@Query` JPQL e nativo, projections e `@EntityGraph`.',
          '`@Transactional(readOnly = true)` em leituras; transação de escrita no service.',
          '**JPA Auditing**: `Auditavel` com `criadoEm`, `atualizadoEm` (`Instant` em UTC), `criadoPor` e `atualizadoPor` lidos do JWT.',
          '**Flyway**: schema 100% versionado; `ddl-auto: validate`, nunca `update`.',
        ] },
        { type: 'h3', text: 'API' },
        { type: 'list', items: [
          '**DTOs sempre** (records), nunca `@Entity` na API; DTOs resumo para evitar over-fetching.',
          '**MapStruct** para entidade ↔ DTO.',
          '**Bean Validation** + validador customizado `@CpfCnpj` + validador de classe `@PeriodoValido`.',
          '`@RestControllerAdvice` + `ProblemDetail` (RFC 7807) com status HTTP semânticos (201 + `Location`, 204, 400, 401/403, 404, 409).',
          'Versionamento `/api/v1`, CORS para o frontend e header `X-Request-Id`.',
          '**OpenAPI/Swagger** completo, com exemplos e security scheme JWT.',
        ] },
        { type: 'h3', text: 'Segurança' },
        { type: 'list', items: [
          '**Spring Security stateless + JWT**, com access token curto e refresh token.',
          'Papéis: **`ADMIN`** (tudo), **`GERENTE`** (projetos, contratos, alocações, relatórios), **`COLABORADOR`** (suas tarefas, comentários e status).',
          '`@PreAuthorize`: só `ADMIN`/`GERENTE` veem contratos e faturamento; colaborador só altera tarefas em que é responsável.',
          'Segredos via variável de ambiente e propriedades tipadas com `@ConfigurationProperties`.',
        ] },
        { type: 'h3', text: 'Cultura de dados' },
        { type: 'list', items: [
          '**Soft delete** (`@SQLDelete` + `@SQLRestriction`) em `Cliente`, `Colaborador`, `Projeto` e `Equipe`.',
          '**Histórico de status**: toda transição de tarefa registrada (anterior, novo, quando, por quem, observação).',
          '**Domain Events** (`TarefaStatusAlteradoEvent`, `TarefaConcluidaEvent`, `ProjetoConcluidoEvent`) com `@TransactionalEventListener`.',
          '**Exportação CSV/JSON** de tarefas e horas por projeto e período.',
          '**Dicionário de dados** e **diagrama ER** documentados.',
        ] },
        { type: 'h3', text: 'Recursos avançados' },
        { type: 'list', items: [
          '**Cache (Caffeine)**: `@Cacheable` em desempenho e ranking; `@CacheEvict` quando uma tarefa muda de status.',
          '**AOP**: logging e tempo de execução dos services, e auditoria de operações sensíveis.',
          '**`@Async`** com `ThreadPoolTaskExecutor` para notificações e exportações, propagando o MDC.',
          '**`@Scheduled`**: job diário de tarefas atrasadas e sprints vencidas; job semanal de resumo.',
          '**Actuator + Micrometer**: `health`, `metrics`, `prometheus` e métricas de negócio (tarefas concluídas, projetos em andamento, tempo dos relatórios).',
          '**Resilience4j**: circuit breaker + retry na consulta externa de CNPJ, com fallback.',
        ] },
      ],
    },
    {
      title: 'Testes',
      blocks: [
        { type: 'table', head: ['Tipo', 'Exemplo no Yadro'], rows: [
          ['Unitário de service (JUnit 5 + Mockito)', 'máquina de estados de `TarefaService`; regra "responsável precisa estar alocado"'],
          ['Repositório (`@DataJpaTest` + Testcontainers)', 'Specifications de tarefa; consultas 1–8'],
          ['Controller (`@WebMvcTest` + MockMvc)', '400 com `ProblemDetail` para CPF/CNPJ inválido; 401 sem token'],
          ['Integração (`@SpringBootTest` + Testcontainers)', 'login → criar projeto → alocar → criar tarefa → mudar status → histórico'],
          ['Segurança', '401 sem token; 403 para `COLABORADOR` acessando faturamento'],
          ['Validação isolada', '`CpfCnpjValidator` com casos válidos e inválidos'],
        ] },
        { type: 'p', text: 'Boas práticas: nomes descritivos, padrão AAA, AssertJ e dados isolados por teste.' },
      ],
    },
    {
      title: 'Roadmap',
      blocks: [
        { type: 'h3', text: 'Concluído' },
        { type: 'list', items: ['**Setup**: projeto criado, `pom.xml`, wrapper Maven e diagrama de classes no Astah.'] },
        { type: 'h3', text: 'Próximas etapas' },
        { type: 'list', items: [
          '**Modelagem**: entidades e relacionamentos anotados, `Auditavel`, enums `STRING`.',
          '**Flyway + Docker**: `docker-compose.yml`, profiles e migrações iniciais.',
          '**CRUD**: repositories, DTOs, MapStruct, services, controllers e Swagger básico.',
          '**Robustez**: Bean Validation, `@CpfCnpj`, `ProblemDetail`, MDC.',
          '**Paginação, filtros** e **as 8 consultas complexas**.',
          '**Segurança JWT**, CORS e OpenAPI completo.',
          '**Cultura de dados**: soft delete, histórico, eventos, CSV.',
          '**Recursos avançados**: cache, AOP, async, scheduled, Actuator, Micrometer, Resilience4j.',
          '**Testes**, escritos junto com cada etapa.',
          '**Fechamento**: README, diagrama ER e dicionário de dados.',
        ] },
        { type: 'h3', text: 'Critério de pronto' },
        { type: 'list', items: [
          '`docker compose up -d && ./mvnw spring-boot:run` sobe a API do zero;',
          '`./mvnw verify` verde, incluindo Testcontainers;',
          'Swagger navegável com autenticação JWT;',
          'README com stack, como rodar, arquitetura, diagrama ER e dicionário de dados.',
        ] },
      ],
    },
  ],
  en: [
    {
      title: 'Overview',
      blocks: [
        { type: 'p', text: '**Yadro** is a REST API for **managing contracted software projects**: a software house registers its clients, signs contracts, builds teams, assigns staff to projects, organizes work into sprints and tasks, and tracks hours, status and billing.' },
        { type: 'p', text: 'The project is designed with **Java 21 + Spring Boot 3 + Spring Data JPA + PostgreSQL**: 14 entities covering all three relationship types (1:1, 1:N, N:N with attributes), versioned Flyway migrations, role-based **JWT** authentication (access + refresh), dynamic filters with **Specifications**, 8 complex analytical queries, soft delete, status history, Domain Events, caching, AOP, scheduled jobs, metrics and every kind of test.' },
        { type: 'p', text: '**What the project shows:** modeling a real domain, designing a professional REST API and using the Spring ecosystem deliberately — not just "making it work", but justifying every architectural decision.' },
        { type: 'h3', text: 'Current state' },
        { type: 'p', text: 'In development. The Spring Boot scaffold, 11 domain classes, 7 enums and the UML class diagram (Astah) are in place. This page describes the full planned scope; the progress of each stage is in the roadmap at the end of the page.' },
      ],
    },
    {
      title: 'Stack and conventions',
      blocks: [
        { type: 'table', head: ['Item', 'Value'], rows: [
          ['Language', 'Java 21 LTS'],
          ['Framework', 'Spring Boot 3.5.x'],
          ['Persistence', 'Spring Data JPA / Hibernate + PostgreSQL (Docker Compose)'],
          ['Migrations', 'Flyway'],
          ['DTO mapping', 'MapStruct (+ Lombok only for getters/setters/builders)'],
          ['Security', 'Spring Security + JWT (jjwt)'],
          ['Documentation', 'Springdoc OpenAPI / Swagger UI'],
          ['Testing', 'JUnit 5, Mockito, AssertJ, MockMvc, Testcontainers'],
          ['Modeling', 'UML class diagram in Astah'],
          ['API prefix', '`/api/v1`'],
          ['Identifiers', '`UUID`'],
          ['Configuration', '`application.yml` + `dev`, `test`, `prod` profiles'],
        ] },
        { type: 'h3', text: 'Package structure' },
        { type: 'code', code: packages },
      ],
    },
    {
      title: 'The domain',
      blocks: [
        { type: 'h3', text: 'Actors' },
        { type: 'list', items: [
          '**Client** — company or person that hires the software house.',
          '**Staff member** — employee (dev, QA, designer, tech lead…), belongs to a team.',
          '**User** — API login account (authentication is separate from the business domain).',
        ] },
        { type: 'h3', text: 'Main flow' },
        { type: 'list', items: [
          'A **Client** is registered (CPF/CNPJ validated).',
          'A **Project** is opened for the client and formalized by a **ContratoProjeto** (value, payment method, clauses).',
          '**Staff** are assigned to the project with a **role** and a period (`ProjetoColaborador`).',
          'Work is broken into **Sprints** and **Tasks**; tasks get **Tags**, an **assignee**, an estimate and hours spent.',
          'Every task status change creates a **HistoricoStatus** record and fires a Domain Event.',
          'Staff discuss tasks through **ComentarioTarefa**.',
          'Managers run reports: performance, billing, delays, rankings.',
        ] },
        { type: 'h3', text: 'Entities' },
        { type: 'table', head: ['Entity', 'Role in the domain'], rows: [
          ['`Cliente`', 'who hires'],
          ['`Projeto`', 'central unit of work'],
          ['`ContratoProjeto`', 'project contract (1:1 satellite)'],
          ['`Equipe`', 'group of staff'],
          ['`Colaborador`', 'who does the work'],
          ['`ProjetoColaborador`', 'N:N assignment with attributes (role, start, end)'],
          ['`Sprint`', 'project iteration'],
          ['`Tarefa`', 'work item'],
          ['`Tag`', 'task label (plain N:N)'],
          ['`ComentarioTarefa`', 'task discussion'],
          ['`HistoricoStatus`', 'trail of task status changes'],
          ['`Usuario`', 'login and roles'],
          ['`RefreshToken`', 'persisted, revocable refresh token (optional)'],
          ['`Auditavel`', '`@MappedSuperclass` with audit fields'],
        ] },
        { type: 'p', text: 'Enums (`Cargo`, `FormaPagamento`, `PapelProjeto`, `Prioridade`, `StatusProjeto`, `StatusSprint`, `StatusTarefa` and `RoleUsuario`) are always persisted with `@Enumerated(EnumType.STRING)`: no magic strings, no ordinals.' },
        { type: 'h3', text: 'Relationship types' },
        { type: 'table', head: ['Type', 'In Yadro'], rows: [
          ['**1:1**', '`Projeto` ↔ `ContratoProjeto` (satellite entity: contract and financial data kept apart from the project)'],
          ['**1:N**', '`Cliente` → `Projeto`, `Projeto` → `Sprint`, `Projeto` → `Tarefa`, `Sprint` → `Tarefa`, `Equipe` → `Colaborador`, `Tarefa` → `ComentarioTarefa`, `Tarefa` → `HistoricoStatus`'],
          ['**N:N with attributes**', '`Projeto` ↔ `Colaborador` via `ProjetoColaborador` (`papel`, `dataEntrada`, `dataSaida`)'],
          ['**Plain N:N**', '`Tarefa` ↔ `Tag` (`@ManyToMany` + `@JoinTable`)'],
        ] },
        { type: 'p', text: 'Every `@ManyToOne` uses `fetch = LAZY`; no entity uses Lombok\'s `@Data` (`equals`/`hashCode` based on the id).' },
      ],
    },
    {
      title: 'Business rules',
      blocks: [
        { type: 'p', text: 'Task status transitions follow a state machine. An invalid transition → **409**.' },
        { type: 'code', code: stateMachine },
        { type: 'list', items: [
          'When a task is completed, `dataConclusao` is filled in automatically.',
          'A task can only join a sprint of the **same project**.',
          'The task assignee must be **assigned** to the project (`ProjetoColaborador` active on that date).',
          'A project has at most **one `EM_ANDAMENTO` sprint** at a time.',
          'A sprint cannot have `dataFim` before `dataInicio` (class-level validator).',
          'Contract: `valorTotal > 0` and a unique `numeroContrato`.',
          'A client with projects cannot be physically deleted → soft delete (or **409**).',
          'Unique `email` for staff and clients; validated, unique `cpfCnpj`.',
        ] },
      ],
    },
    {
      title: 'Features and endpoints',
      blocks: [
        { type: 'table', head: ['#', 'Feature', 'In Yadro'], rows: [
          ['F1', 'Create (POST + validated DTO)', '`POST /api/v1/clientes`, `/projetos`, `/tarefas`, …'],
          ['F2', 'List (GET + `Page` of DTOs)', '`GET /api/v1/projetos?page=0&size=20`'],
          ['F3', 'Full CRUD with validation, errors and logs', 'every main entity'],
          ['F4', 'Counts', '`/projetos/contagem`, `/tarefas/contagem?status=…`'],
          ['F5', 'Pagination and sorting', '`?sort=prioridade,desc&sort=dataCriacao,asc`'],
          ['F6', 'Dynamic filters', '`TarefaSpecifications` / `ProjetoSpecifications`'],
          ['F7', 'Versioned migrations', '`V1__schema_inicial`, …, `V4__historico_soft_delete`'],
          ['F8', 'Structured logging', 'MDC with `correlationId` + AOP aspect'],
        ] },
        { type: 'h3', text: 'Main endpoints' },
        { type: 'code', code: endpoints },
      ],
    },
    {
      title: 'The 8 complex queries',
      blocks: [
        { type: 'table', head: ['#', 'Query', 'Technique'], rows: [
          ['1', '**Staff performance** — assigned and completed tasks, completion %, estimated × spent hours', 'JOIN across 3+ entities + aggregation + percentage'],
          ['2', '**Composite task filter** — status, priority, project, client, sprint, assignee role, tag, date range (all optional)', 'Specification with multiple JOINs'],
          ['3', '**Billing per client over a period** — sum of contract `valorTotal` per client', 'JOIN + date range + `GROUP BY` + `SUM`'],
          ['4', '**Overrun tasks** — hours spent above the estimate (with overrun %) and projects over budget', 'Calculation across related entities'],
          ['5', '**Late tasks** — unfinished tasks in expired sprints, ordered by days late', 'Expired records + JOIN across 4 entities'],
          ['6', '**Tag ranking** among tasks completed in a period, top N', 'Aggregation + `ORDER BY` + `LIMIT`'],
          ['7', '**Text search** in task title and description, with project and assignee', '`ILIKE` + JOIN via projection'],
          ['8', '**Tasks by status × priority**, filtered by creation year', 'Two-dimensional aggregation'],
        ] },
        { type: 'p', text: 'These queries cover JPQL **and** native `@Query`, **interface** and **DTO/record** projections, `@EntityGraph`/`JOIN FETCH` against N+1, and a demonstration of the N+1 problem with SQL logging turned on.' },
      ],
    },
    {
      title: 'Spring ecosystem',
      blocks: [
        { type: 'h3', text: 'Persistence and data' },
        { type: 'list', items: [
          '**Spring Data JPA** with one repository per aggregate and deliberate fetching: `LAZY` everywhere, explicit loading where needed.',
          '**Specifications / Criteria API**, JPQL and native `@Query`, projections and `@EntityGraph`.',
          '`@Transactional(readOnly = true)` for reads; write transactions in the service.',
          '**JPA Auditing**: `Auditavel` with `criadoEm`, `atualizadoEm` (`Instant` in UTC), `criadoPor` and `atualizadoPor` read from the JWT.',
          '**Flyway**: 100% versioned schema; `ddl-auto: validate`, never `update`.',
        ] },
        { type: 'h3', text: 'API' },
        { type: 'list', items: [
          '**Always DTOs** (records), never an `@Entity` in the API; summary DTOs to avoid over-fetching.',
          '**MapStruct** for entity ↔ DTO.',
          '**Bean Validation** + custom `@CpfCnpj` validator + `@PeriodoValido` class-level validator.',
          '`@RestControllerAdvice` + `ProblemDetail` (RFC 7807) with semantic HTTP status codes (201 + `Location`, 204, 400, 401/403, 404, 409).',
          '`/api/v1` versioning, CORS for the frontend and an `X-Request-Id` header.',
          'Complete **OpenAPI/Swagger**, with examples and a JWT security scheme.',
        ] },
        { type: 'h3', text: 'Security' },
        { type: 'list', items: [
          '**Stateless Spring Security + JWT**, with a short-lived access token and a refresh token.',
          'Roles: **`ADMIN`** (everything), **`GERENTE`** (projects, contracts, assignments, reports), **`COLABORADOR`** (own tasks, comments and status).',
          '`@PreAuthorize`: only `ADMIN`/`GERENTE` see contracts and billing; staff only change tasks assigned to them.',
          'Secrets from environment variables and typed `@ConfigurationProperties`.',
        ] },
        { type: 'h3', text: 'Data practices' },
        { type: 'list', items: [
          '**Soft delete** (`@SQLDelete` + `@SQLRestriction`) on `Cliente`, `Colaborador`, `Projeto` and `Equipe`.',
          '**Status history**: every task transition recorded (previous, new, when, by whom, note).',
          '**Domain Events** (`TarefaStatusAlteradoEvent`, `TarefaConcluidaEvent`, `ProjetoConcluidoEvent`) with `@TransactionalEventListener`.',
          '**CSV/JSON export** of tasks and hours per project and period.',
          'Documented **data dictionary** and **ER diagram**.',
        ] },
        { type: 'h3', text: 'Advanced features' },
        { type: 'list', items: [
          '**Caching (Caffeine)**: `@Cacheable` on performance and ranking; `@CacheEvict` when a task changes status.',
          '**AOP**: logging and execution time of services, plus auditing of sensitive operations.',
          '**`@Async`** with `ThreadPoolTaskExecutor` for notifications and exports, propagating the MDC.',
          '**`@Scheduled`**: daily job for late tasks and expired sprints; weekly summary job.',
          '**Actuator + Micrometer**: `health`, `metrics`, `prometheus` and business metrics (completed tasks, projects in progress, report timing).',
          '**Resilience4j**: circuit breaker + retry on the external CNPJ lookup, with a fallback.',
        ] },
      ],
    },
    {
      title: 'Testing',
      blocks: [
        { type: 'table', head: ['Type', 'Example in Yadro'], rows: [
          ['Service unit tests (JUnit 5 + Mockito)', '`TarefaService` state machine; "assignee must be assigned to the project" rule'],
          ['Repository (`@DataJpaTest` + Testcontainers)', 'task Specifications; queries 1–8'],
          ['Controller (`@WebMvcTest` + MockMvc)', '400 with `ProblemDetail` for an invalid CPF/CNPJ; 401 without a token'],
          ['Integration (`@SpringBootTest` + Testcontainers)', 'login → create project → assign → create task → change status → history'],
          ['Security', '401 without a token; 403 for `COLABORADOR` accessing billing'],
          ['Isolated validation', '`CpfCnpjValidator` with valid and invalid cases'],
        ] },
        { type: 'p', text: 'Good practices: descriptive names, AAA pattern, AssertJ and isolated data per test.' },
      ],
    },
    {
      title: 'Roadmap',
      blocks: [
        { type: 'h3', text: 'Done' },
        { type: 'list', items: ['**Setup**: project created, `pom.xml`, Maven wrapper and class diagram in Astah.'] },
        { type: 'h3', text: 'Next stages' },
        { type: 'list', items: [
          '**Modeling**: annotated entities and relationships, `Auditavel`, `STRING` enums.',
          '**Flyway + Docker**: `docker-compose.yml`, profiles and initial migrations.',
          '**CRUD**: repositories, DTOs, MapStruct, services, controllers and basic Swagger.',
          '**Robustness**: Bean Validation, `@CpfCnpj`, `ProblemDetail`, MDC.',
          '**Pagination, filters** and **the 8 complex queries**.',
          '**JWT security**, CORS and complete OpenAPI.',
          '**Data practices**: soft delete, history, events, CSV.',
          '**Advanced features**: cache, AOP, async, scheduled, Actuator, Micrometer, Resilience4j.',
          '**Tests**, written alongside each stage.',
          '**Wrap-up**: README, ER diagram and data dictionary.',
        ] },
        { type: 'h3', text: 'Definition of done' },
        { type: 'list', items: [
          '`docker compose up -d && ./mvnw spring-boot:run` starts the API from scratch;',
          '`./mvnw verify` passes, including Testcontainers;',
          'Swagger is browsable with JWT authentication;',
          'the README covers the stack, how to run, architecture, ER diagram and data dictionary.',
        ] },
      ],
    },
  ],
  es: [
    {
      title: 'Resumen',
      blocks: [
        { type: 'p', text: '**Yadro** es una API REST para **gestionar proyectos de software bajo contrato**: una software house registra a sus clientes, cierra contratos, forma equipos, asigna colaboradores a proyectos, organiza el trabajo en sprints y tareas y controla horas, estado y facturación.' },
        { type: 'p', text: 'El proyecto está diseñado con **Java 21 + Spring Boot 3 + Spring Data JPA + PostgreSQL**: 14 entidades con los tres tipos de relación (1:1, 1:N, N:N con atributos), migraciones versionadas con Flyway, autenticación **JWT** (access + refresh) con roles, filtros dinámicos con **Specifications**, 8 consultas analíticas complejas, soft delete, historial de estados, Domain Events, caché, AOP, tareas programadas, métricas y pruebas de todo tipo.' },
        { type: 'p', text: '**Lo que demuestra el proyecto:** modelar un dominio real, diseñar una API REST profesional y usar el ecosistema Spring de forma consciente — no solo "hacer que funcione", sino justificar cada decisión de arquitectura.' },
        { type: 'h3', text: 'Estado actual' },
        { type: 'p', text: 'En desarrollo. Ya existen el scaffold de Spring Boot, 11 clases de dominio, 7 enums y el diagrama de clases UML (Astah). Esta página describe el alcance completo previsto; el avance de cada etapa está en el roadmap, al final de la página.' },
      ],
    },
    {
      title: 'Stack y convenciones',
      blocks: [
        { type: 'table', head: ['Elemento', 'Valor'], rows: [
          ['Lenguaje', 'Java 21 LTS'],
          ['Framework', 'Spring Boot 3.5.x'],
          ['Persistencia', 'Spring Data JPA / Hibernate + PostgreSQL (Docker Compose)'],
          ['Migraciones', 'Flyway'],
          ['Mapeo de DTO', 'MapStruct (+ Lombok solo para getters/setters/builders)'],
          ['Seguridad', 'Spring Security + JWT (jjwt)'],
          ['Documentación', 'Springdoc OpenAPI / Swagger UI'],
          ['Pruebas', 'JUnit 5, Mockito, AssertJ, MockMvc, Testcontainers'],
          ['Modelado', 'Diagrama de clases UML en Astah'],
          ['Prefijo de la API', '`/api/v1`'],
          ['Identificadores', '`UUID`'],
          ['Configuración', '`application.yml` + perfiles `dev`, `test`, `prod`'],
        ] },
        { type: 'h3', text: 'Estructura de paquetes' },
        { type: 'code', code: packages },
      ],
    },
    {
      title: 'El dominio',
      blocks: [
        { type: 'h3', text: 'Actores' },
        { type: 'list', items: [
          '**Cliente** — empresa o persona que contrata a la software house.',
          '**Colaborador** — empleado (dev, QA, diseñador, tech lead…), pertenece a un equipo.',
          '**Usuario** — cuenta de acceso a la API (la autenticación está separada del dominio de negocio).',
        ] },
        { type: 'h3', text: 'Flujo principal' },
        { type: 'list', items: [
          'Se registra un **Cliente** (CPF/CNPJ validado).',
          'Se abre un **Proyecto** para el cliente, formalizado por un **ContratoProjeto** (valor, forma de pago, cláusulas).',
          'Los **colaboradores** se asignan al proyecto con un **rol** y un periodo (`ProjetoColaborador`).',
          'El trabajo se divide en **Sprints** y **Tareas**; las tareas reciben **Tags**, un **responsable**, una estimación y horas dedicadas.',
          'Cada cambio de estado de una tarea genera un registro en **HistoricoStatus** y dispara un Domain Event.',
          'Los colaboradores discuten la tarea mediante **ComentarioTarefa**.',
          'Los gestores consultan informes: rendimiento, facturación, retrasos, rankings.',
        ] },
        { type: 'h3', text: 'Entidades' },
        { type: 'table', head: ['Entidad', 'Papel en el dominio'], rows: [
          ['`Cliente`', 'quien contrata'],
          ['`Projeto`', 'unidad central de trabajo'],
          ['`ContratoProjeto`', 'contrato del proyecto (satélite 1:1)'],
          ['`Equipe`', 'agrupación de colaboradores'],
          ['`Colaborador`', 'quien ejecuta el trabajo'],
          ['`ProjetoColaborador`', 'asignación N:N con atributos (rol, entrada, salida)'],
          ['`Sprint`', 'iteración del proyecto'],
          ['`Tarefa`', 'elemento de trabajo'],
          ['`Tag`', 'etiqueta de tarea (N:N simple)'],
          ['`ComentarioTarefa`', 'discusión en la tarea'],
          ['`HistoricoStatus`', 'registro de cambios de estado de la tarea'],
          ['`Usuario`', 'acceso y roles'],
          ['`RefreshToken`', 'refresh token persistido y revocable (opcional)'],
          ['`Auditavel`', '`@MappedSuperclass` con campos de auditoría'],
        ] },
        { type: 'p', text: 'Los enums (`Cargo`, `FormaPagamento`, `PapelProjeto`, `Prioridade`, `StatusProjeto`, `StatusSprint`, `StatusTarefa` y `RoleUsuario`) se persisten siempre con `@Enumerated(EnumType.STRING)`: ni cadenas mágicas ni ordinales.' },
        { type: 'h3', text: 'Tipos de relación' },
        { type: 'table', head: ['Tipo', 'En Yadro'], rows: [
          ['**1:1**', '`Projeto` ↔ `ContratoProjeto` (entidad satélite: datos contractuales y financieros separados del proyecto)'],
          ['**1:N**', '`Cliente` → `Projeto`, `Projeto` → `Sprint`, `Projeto` → `Tarefa`, `Sprint` → `Tarefa`, `Equipe` → `Colaborador`, `Tarefa` → `ComentarioTarefa`, `Tarefa` → `HistoricoStatus`'],
          ['**N:N con atributos**', '`Projeto` ↔ `Colaborador` mediante `ProjetoColaborador` (`papel`, `dataEntrada`, `dataSaida`)'],
          ['**N:N simple**', '`Tarefa` ↔ `Tag` (`@ManyToMany` + `@JoinTable`)'],
        ] },
        { type: 'p', text: 'Todos los `@ManyToOne` con `fetch = LAZY`; ninguna entidad usa `@Data` de Lombok (`equals`/`hashCode` basados en el id).' },
      ],
    },
    {
      title: 'Reglas de negocio',
      blocks: [
        { type: 'p', text: 'Las transiciones de estado de las tareas siguen una máquina de estados. Transición inválida → **409**.' },
        { type: 'code', code: stateMachine.replace('(any non-final state)', '(cualquier estado no final)') },
        { type: 'list', items: [
          'Al completar una tarea, `dataConclusao` se rellena automáticamente.',
          'Una tarea solo puede entrar en un sprint del **mismo proyecto**.',
          'El responsable de la tarea debe estar **asignado** al proyecto (`ProjetoColaborador` activo en la fecha).',
          'Un proyecto tiene como máximo **un sprint `EM_ANDAMENTO`** a la vez.',
          'Un sprint no puede tener `dataFim` anterior a `dataInicio` (validador de clase).',
          'Contrato: `valorTotal > 0` y `numeroContrato` único.',
          'Un cliente con proyectos no puede eliminarse físicamente → soft delete (o **409**).',
          '`email` único para colaboradores y clientes; `cpfCnpj` validado y único.',
        ] },
      ],
    },
    {
      title: 'Funcionalidades y endpoints',
      blocks: [
        { type: 'table', head: ['#', 'Funcionalidad', 'En Yadro'], rows: [
          ['F1', 'Insertar (POST + DTO validado)', '`POST /api/v1/clientes`, `/projetos`, `/tarefas`, …'],
          ['F2', 'Listar (GET + `Page` de DTOs)', '`GET /api/v1/projetos?page=0&size=20`'],
          ['F3', 'CRUD completo con validación, errores y logs', 'todas las entidades principales'],
          ['F4', 'Conteo', '`/projetos/contagem`, `/tarefas/contagem?status=…`'],
          ['F5', 'Paginación y ordenación', '`?sort=prioridade,desc&sort=dataCriacao,asc`'],
          ['F6', 'Filtros dinámicos', '`TarefaSpecifications` / `ProjetoSpecifications`'],
          ['F7', 'Migraciones versionadas', '`V1__schema_inicial`, …, `V4__historico_soft_delete`'],
          ['F8', 'Logging estructurado', 'MDC con `correlationId` + aspecto AOP'],
        ] },
        { type: 'h3', text: 'Endpoints principales' },
        { type: 'code', code: endpoints.replace('N:N + attributes', 'N:N con atributos').replace('state machine', 'máquina de estados').replace('8 complex queries', 'las 8 consultas complejas') },
      ],
    },
    {
      title: 'Las 8 consultas complejas',
      blocks: [
        { type: 'table', head: ['#', 'Consulta', 'Técnica'], rows: [
          ['1', '**Rendimiento de los colaboradores** — tareas asignadas y completadas, % de finalización, horas estimadas × dedicadas', 'JOIN de 3+ entidades + agregación + porcentaje'],
          ['2', '**Filtro compuesto de tareas** — estado, prioridad, proyecto, cliente, sprint, cargo del responsable, tag, rango de fechas (todos opcionales)', 'Specification con múltiples JOINs'],
          ['3', '**Facturación por cliente en un periodo** — suma de `valorTotal` de los contratos por cliente', 'JOIN + rango de fechas + `GROUP BY` + `SUM`'],
          ['4', '**Tareas excedidas** — horas dedicadas por encima de la estimación (con % de exceso) y proyectos por encima de lo previsto', 'Cálculo entre entidades relacionadas'],
          ['5', '**Tareas atrasadas** — no completadas en sprints vencidos, ordenadas por días de retraso', 'Registros vencidos + JOIN en 4 entidades'],
          ['6', '**Ranking de tags** en tareas completadas en el periodo, top N', 'Agregación + `ORDER BY` + `LIMIT`'],
          ['7', '**Búsqueda textual** en título y descripción de tareas, con proyecto y responsable', '`ILIKE` + JOIN mediante projection'],
          ['8', '**Tareas por estado × prioridad**, filtradas por año de creación', 'Agregación en 2 dimensiones'],
        ] },
        { type: 'p', text: 'Estas consultas cubren `@Query` JPQL **y** nativo, projections de **interfaz** y **DTO/record**, `@EntityGraph`/`JOIN FETCH` contra N+1 y la demostración del problema N+1 con el log de SQL activado.' },
      ],
    },
    {
      title: 'Ecosistema Spring',
      blocks: [
        { type: 'h3', text: 'Persistencia y datos' },
        { type: 'list', items: [
          '**Spring Data JPA** con un repository por agregado y fetch consciente: `LAZY` en todo, carga explícita donde hace falta.',
          '**Specifications / Criteria API**, `@Query` JPQL y nativo, projections y `@EntityGraph`.',
          '`@Transactional(readOnly = true)` en lecturas; transacción de escritura en el service.',
          '**JPA Auditing**: `Auditavel` con `criadoEm`, `atualizadoEm` (`Instant` en UTC), `criadoPor` y `atualizadoPor` leídos del JWT.',
          '**Flyway**: schema 100% versionado; `ddl-auto: validate`, nunca `update`.',
        ] },
        { type: 'h3', text: 'API' },
        { type: 'list', items: [
          '**Siempre DTOs** (records), nunca `@Entity` en la API; DTOs resumidos para evitar over-fetching.',
          '**MapStruct** para entidad ↔ DTO.',
          '**Bean Validation** + validador personalizado `@CpfCnpj` + validador de clase `@PeriodoValido`.',
          '`@RestControllerAdvice` + `ProblemDetail` (RFC 7807) con códigos HTTP semánticos (201 + `Location`, 204, 400, 401/403, 404, 409).',
          'Versionado `/api/v1`, CORS para el frontend y cabecera `X-Request-Id`.',
          '**OpenAPI/Swagger** completo, con ejemplos y security scheme JWT.',
        ] },
        { type: 'h3', text: 'Seguridad' },
        { type: 'list', items: [
          '**Spring Security stateless + JWT**, con access token de corta duración y refresh token.',
          'Roles: **`ADMIN`** (todo), **`GERENTE`** (proyectos, contratos, asignaciones, informes), **`COLABORADOR`** (sus tareas, comentarios y estado).',
          '`@PreAuthorize`: solo `ADMIN`/`GERENTE` ven contratos y facturación; un colaborador solo modifica tareas de las que es responsable.',
          'Secretos en variables de entorno y propiedades tipadas con `@ConfigurationProperties`.',
        ] },
        { type: 'h3', text: 'Cultura de datos' },
        { type: 'list', items: [
          '**Soft delete** (`@SQLDelete` + `@SQLRestriction`) en `Cliente`, `Colaborador`, `Projeto` y `Equipe`.',
          '**Historial de estados**: cada transición de tarea queda registrada (anterior, nuevo, cuándo, quién, observación).',
          '**Domain Events** (`TarefaStatusAlteradoEvent`, `TarefaConcluidaEvent`, `ProjetoConcluidoEvent`) con `@TransactionalEventListener`.',
          '**Exportación CSV/JSON** de tareas y horas por proyecto y periodo.',
          '**Diccionario de datos** y **diagrama ER** documentados.',
        ] },
        { type: 'h3', text: 'Recursos avanzados' },
        { type: 'list', items: [
          '**Caché (Caffeine)**: `@Cacheable` en rendimiento y ranking; `@CacheEvict` cuando una tarea cambia de estado.',
          '**AOP**: logging y tiempo de ejecución de los services, y auditoría de operaciones sensibles.',
          '**`@Async`** con `ThreadPoolTaskExecutor` para notificaciones y exportaciones, propagando el MDC.',
          '**`@Scheduled`**: tarea diaria de tareas atrasadas y sprints vencidos; resumen semanal.',
          '**Actuator + Micrometer**: `health`, `metrics`, `prometheus` y métricas de negocio (tareas completadas, proyectos en curso, tiempo de los informes).',
          '**Resilience4j**: circuit breaker + retry en la consulta externa de CNPJ, con fallback.',
        ] },
      ],
    },
    {
      title: 'Pruebas',
      blocks: [
        { type: 'table', head: ['Tipo', 'Ejemplo en Yadro'], rows: [
          ['Unitarias de service (JUnit 5 + Mockito)', 'máquina de estados de `TarefaService`; regla "el responsable debe estar asignado"'],
          ['Repositorio (`@DataJpaTest` + Testcontainers)', 'Specifications de tareas; consultas 1–8'],
          ['Controller (`@WebMvcTest` + MockMvc)', '400 con `ProblemDetail` para CPF/CNPJ inválido; 401 sin token'],
          ['Integración (`@SpringBootTest` + Testcontainers)', 'login → crear proyecto → asignar → crear tarea → cambiar estado → historial'],
          ['Seguridad', '401 sin token; 403 para `COLABORADOR` accediendo a la facturación'],
          ['Validación aislada', '`CpfCnpjValidator` con casos válidos e inválidos'],
        ] },
        { type: 'p', text: 'Buenas prácticas: nombres descriptivos, patrón AAA, AssertJ y datos aislados por prueba.' },
      ],
    },
    {
      title: 'Roadmap',
      blocks: [
        { type: 'h3', text: 'Completado' },
        { type: 'list', items: ['**Setup**: proyecto creado, `pom.xml`, wrapper de Maven y diagrama de clases en Astah.'] },
        { type: 'h3', text: 'Próximas etapas' },
        { type: 'list', items: [
          '**Modelado**: entidades y relaciones anotadas, `Auditavel`, enums `STRING`.',
          '**Flyway + Docker**: `docker-compose.yml`, perfiles y migraciones iniciales.',
          '**CRUD**: repositories, DTOs, MapStruct, services, controllers y Swagger básico.',
          '**Robustez**: Bean Validation, `@CpfCnpj`, `ProblemDetail`, MDC.',
          '**Paginación, filtros** y **las 8 consultas complejas**.',
          '**Seguridad JWT**, CORS y OpenAPI completo.',
          '**Cultura de datos**: soft delete, historial, eventos, CSV.',
          '**Recursos avanzados**: caché, AOP, async, scheduled, Actuator, Micrometer, Resilience4j.',
          '**Pruebas**, escritas junto con cada etapa.',
          '**Cierre**: README, diagrama ER y diccionario de datos.',
        ] },
        { type: 'h3', text: 'Criterio de terminado' },
        { type: 'list', items: [
          '`docker compose up -d && ./mvnw spring-boot:run` levanta la API desde cero;',
          '`./mvnw verify` en verde, incluido Testcontainers;',
          'Swagger navegable con autenticación JWT;',
          'README con stack, cómo ejecutar, arquitectura, diagrama ER y diccionario de datos.',
        ] },
      ],
    },
  ],
}
