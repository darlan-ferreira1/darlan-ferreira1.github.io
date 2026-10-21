import type { Language } from '../../i18n/translations'
import type { ContentSection } from '../projects'

const mountContract = 'mount({ root }, config) → { update(config), tick(dt), dispose() }'

export const claraJsContent: Record<Language, ContentSection[]> = {
  pt: [
    {
      title: 'O problema',
      blocks: [
        { type: 'p', text: 'Muitas escolas de ensino médio não têm laboratório de Ciências: montar e manter um é caro. As alternativas digitais costumam ter pelo menos um destes problemas:' },
        { type: 'list', items: ['exigem hardware específico, como óculos de realidade virtual;', 'cobram licença;', 'dependem de plataformas fechadas.'] },
        { type: 'p', text: 'Sem experimentação, conteúdos como órbitas atômicas, a geometria de moléculas ou a relação entre pressão e volume de um gás ficam só no quadro e no livro.' },
      ],
    },
    {
      title: 'A solução',
      blocks: [
        { type: 'p', text: 'O **CLARA.js** é um site em que o estudante **manipula o fenômeno** em vez de só ler sobre ele. Basta abrir o endereço: não há instalação, cadastro nem servidor. Funciona no computador e no celular. Quando o aparelho permite, o mesmo experimento também pode ser visto em realidade aumentada (sobre a mesa da sala de aula), em realidade virtual ou controlado com as próprias mãos.' },
        { type: 'p', text: 'Cada experimento vem com dois textos:' },
        { type: 'list', items: ['**Teoria** — o conteúdo explicado para o aluno;', '**Como foi feito** — a documentação técnica de como aquele experimento foi construído.'] },
      ],
    },
    {
      title: 'Formas de explorar',
      blocks: [
        { type: 'h3', text: 'Galeria' },
        { type: 'p', text: 'Todos os experimentos em cartões, com busca e filtro por área. Cada um tem controles de parâmetros (massa, comprimento, ângulo, número atômico…) que mudam a simulação em tempo real.' },
        { type: 'h3', text: 'Museu Virtual' },
        { type: 'p', text: 'Um museu 3D percorrido em primeira pessoa: **WASD + mouse** no computador, **joystick na tela** no celular. Cada porta leva à **sala interativa** de um experimento, onde ele aparece em escala ampliada e pode ser ajustado sem sair do ambiente. Na troca de sala, a tela escurece e o conteúdo é trocado dentro da mesma cena 3D, sem recarregar a página.' },
        { type: 'h3', text: 'Realidade aumentada' },
        { type: 'p', text: 'O estudante aponta o celular para o chão ou para uma mesa e vê uma retícula sobre a superfície detectada. Ao tocar na tela, o objeto é posicionado ali (um átomo de Bohr, uma molécula ou uma dupla hélice de DNA). Os gestos na tela controlam o objeto:' },
        { type: 'list', items: ['**arrastar** move;', '**pinça** muda o tamanho;', '**girar com dois dedos** gira.'] },
        { type: 'p', text: 'Um painel ⚙ sobreposto à câmera permite mudar os parâmetros do experimento.' },
        { type: 'h3', text: 'Realidade virtual' },
        { type: 'p', text: 'Funciona em headsets compatíveis com WebXR, também direto do navegador.' },
        { type: 'h3', text: 'Interação por gestos (webcam)' },
        { type: 'p', text: 'Experimentos em que **o corpo do estudante faz parte do experimento**:' },
        { type: 'list', items: [
          '**Você é o Móvel** — a mão vira o objeto de um estudo de cinemática. Os gráficos de posição, velocidade e aceleração são desenhados em tempo real conforme o estudante move a mão diante da câmera.',
          '**Lei de Boyle com as Mãos** — as duas mãos são as paredes de um recipiente com gás. Ao aproximá-las, o volume diminui e a pressão, medida a partir das colisões das partículas, aumenta.',
          '**Dissecação Guiada por Gestos** — uma dissecação virtual de anfíbio controlada pelo gesto de pinça.',
        ] },
        { type: 'p', text: 'O rastreamento das mãos roda **no próprio dispositivo**, e nenhuma imagem da câmera é enviada para lugar algum. Sem webcam, o mouse funciona como alternativa.' },
      ],
    },
    {
      title: 'Experimentos',
      blocks: [
        { type: 'table', head: ['Área', 'Experimento', 'Disponível em'], rows: [
          ['Física', 'Pêndulo Simples', 'Página · Museu Virtual'],
          ['Física', 'Lançamento de Projétil', 'Página'],
          ['Física', 'Sistema Solar', 'Página'],
          ['Física', 'Ondas Mecânicas', 'Página'],
          ['Física', 'Você é o Móvel', 'Webcam'],
          ['Química', 'Modelo de Bohr', 'Página · Museu Virtual · RA · RV'],
          ['Química', 'Geometria Molecular (VSEPR)', 'Página · Museu Virtual · RA'],
          ['Química', 'Lei de Boyle com as Mãos', 'Webcam'],
          ['Biologia', 'Dupla Hélice de DNA', 'Página · Museu Virtual · RA · RV'],
          ['Biologia', 'Dissecação Guiada por Gestos', 'Webcam'],
        ] },
      ],
    },
    {
      title: 'O diferencial técnico: a arquitetura',
      blocks: [
        { type: 'p', text: 'A principal contribuição do projeto, do ponto de vista da Computação, é a **arquitetura de software** que organiza os experimentos. O site é a prova de conceito dela.' },
        { type: 'h3', text: 'Experimento em três camadas' },
        { type: 'p', text: 'Cada experimento é separado em três camadas, cada uma com uma responsabilidade:' },
        { type: 'table', head: ['Camada', 'Responsabilidade', 'Depende de'], rows: [
          ['**Modelo científico** (`physics.ts`)', 'Equações, integradores numéricos, tabelas de dados', 'Nada: TypeScript puro'],
          ['**Apresentação** (`scene.ts`)', 'Desenha o fenômeno em 3D (Three.js) ou 2D (canvas)', 'Modelo'],
          ['**Página** (`index.tsx`)', 'Interface React e controles', 'Apresentação'],
        ] },
        { type: 'p', text: 'As dependências só apontam para dentro. O modelo científico não sabe que existe navegador, React ou Three.js, por isso pode ser verificado isoladamente.' },
        { type: 'h3', text: 'Contrato "montável" e múltiplos hospedeiros' },
        { type: 'p', text: 'O experimento **não cria sua própria janela 3D**. Ele segue um contrato mínimo:' },
        { type: 'code', code: mountContract },
        { type: 'p', text: 'Ou seja, ele sabe montar seus objetos num grupo, avançar no tempo, reagir a parâmetros e se liberar da memória. O renderizador, a câmera, as luzes e o laço de animação ficam com quem o **hospeda**:' },
        { type: 'code', code: `               +-> página do experimento   (Galeria)
experimento ---+-> sala interativa         (Museu Virtual)
               +-> realidade aumentada     (WebXR + hit-test)` },
        { type: 'p', text: 'Com isso, **o mesmo Modelo de Bohr** aparece na página, no museu e em RA sem duplicar uma linha de código de cena.' },
        { type: 'h3', text: 'Controles declarativos' },
        { type: 'p', text: 'Os parâmetros de cada experimento são descritos como **dados** (nome, tipo, intervalo, valor inicial), e não como componentes de tela. A partir dessa descrição, o mesmo painel é montado automaticamente na página, no HUD do Museu Virtual e no painel ⚙ da realidade aumentada.' },
        { type: 'h3', text: 'Abstração de entrada' },
        { type: 'p', text: 'Os experimentos de webcam não conhecem o MediaPipe. Eles recebem a entrada por uma função, como `readPosition()` ou `readWalls()`, que pode ser alimentada pela mão rastreada ou pelo mouse. Trocar ou desligar a câmera não afeta a simulação.' },
        { type: 'h3', text: 'Evidências medidas' },
        { type: 'p', text: 'Números registrados durante o desenvolvimento:' },
        { type: 'list', items: [
          'Novas formas de apresentação (museu, realidade aumentada) foram adicionadas **sem nenhuma alteração nos modelos científicos**.',
          'Cada sala do Museu Virtual é descrita por um arquivo de **29 a 71 linhas**.',
          'Cada experimento em realidade aumentada é descrito por **cerca de 20 linhas**.',
          'Duas cenas de RA duplicadas foram substituídas por **um hospedeiro genérico**. Com isso, a Geometria Molecular ganhou RA sem nenhum código de cena novo.',
          'Na Lei de Boyle, a pressão medida pelas colisões das partículas ficou **no máximo 5,2% distante do valor teórico** (PV = constante). A lei **emerge** da simulação, em vez de ser uma fórmula programada.',
        ] },
      ],
    },
    {
      title: 'Destaques de implementação',
      blocks: [
        { type: 'h3', text: 'Física numérica' },
        { type: 'list', items: [
          'integração por Euler semi-implícito, com passo máximo garantido dentro da própria simulação (independe da taxa de quadros);',
          'gás ideal 2D com termostato de Berendsen;',
          'velocidade estimada por regressão linear sobre a trajetória da mão, para reduzir o ruído do rastreamento.',
        ] },
        { type: 'h3', text: 'Gestos robustos' },
        { type: 'list', items: [
          'pinça com **histerese**, para o objeto não ficar "piscando" entre pegar e soltar;',
          'distâncias normalizadas pelo tamanho da palma, para funcionar a qualquer distância da câmera;',
          'suavização do sinal e espelhamento coerente com o vídeo.',
        ] },
        { type: 'h3', text: 'WebXR na prática' },
        { type: 'list', items: [
          'hit-test para detectar superfícies reais;',
          'dom-overlay para ter interface HTML sobre a câmera;',
          'tratamento de `beforexrselect`, para um toque no painel não reposicionar o objeto;',
          'laço com `setAnimationLoop`.',
        ] },
        { type: 'h3', text: 'Arquitetura da aplicação' },
        { type: 'list', items: [
          '**Gestão de memória da GPU:** todo recurso 3D (geometria, material, textura, renderizador, observadores) é liberado explicitamente ao sair. Isso é essencial numa SPA em que o usuário entra e sai de dezenas de cenas.',
          '**Navegação sem servidor:** rotas por hash + History API, com botão voltar do navegador funcionando e link direto para cada experimento, compatível com hospedagem estática.',
          '**Descoberta automática:** as salas do museu e os textos de teoria são encontrados pelo `import.meta.glob` do Vite. Basta criar o arquivo na pasta do experimento.',
          '**Responsivo e com tema:** modo claro e escuro; painel lateral no desktop e bottom sheet no celular; controles de toque no museu.',
          '**Deploy contínuo:** cada push na `main` dispara o build pelo GitHub Actions e a publicação no GitHub Pages.',
        ] },
      ],
    },
    {
      title: 'Tecnologias',
      blocks: [
        { type: 'table', head: ['Tecnologia', 'Uso'], rows: [
          ['**React 19 + TypeScript**', 'Interface e composição das páginas'],
          ['**Vite**', 'Desenvolvimento (com HTTPS local para câmera e WebXR) e build'],
          ['**Three.js**', 'Renderização 3D sobre WebGL'],
          ['**WebXR Device API**', 'Realidade virtual (`immersive-vr`) e aumentada (`immersive-ar`, hit-test, dom-overlay)'],
          ['**MediaPipe Tasks Vision**', 'Rastreamento de 21 pontos de cada mão, no dispositivo'],
          ['**Canvas 2D**', 'Simulações e gráficos dos experimentos de webcam'],
          ['**marked**', 'Renderização dos textos de Teoria e Como foi feito (Markdown)'],
          ['**GitHub Actions + GitHub Pages**', 'Integração e entrega contínuas, hospedagem estática gratuita'],
        ] },
      ],
    },
    {
      title: 'O que eu fiz',
      blocks: [
        { type: 'p', text: 'Projeto individual, da concepção à publicação:' },
        { type: 'list', items: [
          'levantamento do problema e análise de soluções existentes (PhET, ChemCollective, Labster, Merge EDU);',
          'definição dos requisitos funcionais e não funcionais;',
          'projeto e implementação da arquitetura e de todos os experimentos;',
          'Museu Virtual, hospedeiro de realidade aumentada e integração com a webcam;',
          'textos teóricos para o estudante e documentação técnica de cada experimento;',
          'pipeline de deploy;',
          'redação da monografia.',
        ] },
      ],
    },
    {
      title: 'Limitações e próximos passos',
      blocks: [
        { type: 'h3', text: 'Limitações' },
        { type: 'list', items: [
          'a realidade aumentada pela web depende de Android com Chrome e ARCore (o Safari do iPhone não implementa WebXR AR);',
          'a realidade virtual depende de um headset;',
          'o modelo de rastreamento das mãos é baixado na primeira utilização.',
        ] },
        { type: 'h3', text: 'Próximos passos' },
        { type: 'list', items: [
          'experimentos de novas áreas (computação gráfica, engenharia);',
          'estudo de impacto pedagógico com turmas do ensino médio;',
          'Museu Virtual em RV e colaborativo;',
          'rastreamento do corpo inteiro;',
          'uma ferramenta para que professores criem experimentos sem programar.',
        ] },
      ],
    },
  ],
  en: [
    {
      title: 'The problem',
      blocks: [
        { type: 'p', text: 'Many high schools have no science lab: building and maintaining one is expensive. Digital alternatives usually have at least one of these problems:' },
        { type: 'list', items: ['they require specific hardware, such as virtual reality headsets;', 'they charge for licenses;', 'they depend on closed platforms.'] },
        { type: 'p', text: 'Without experimentation, topics such as atomic orbits, molecular geometry or the relationship between the pressure and volume of a gas stay on the board and in the textbook.' },
      ],
    },
    {
      title: 'The solution',
      blocks: [
        { type: 'p', text: '**CLARA.js** is a website where students **manipulate the phenomenon** instead of only reading about it. Just open the address: no installation, sign-up or server. It works on computers and phones. When the device supports it, the same experiment can also be viewed in augmented reality (on the classroom desk), in virtual reality, or controlled with the student\'s own hands.' },
        { type: 'p', text: 'Each experiment comes with two texts:' },
        { type: 'list', items: ['**Theory** — the content explained for the student;', '**How it was made** — technical documentation of how that experiment was built.'] },
      ],
    },
    {
      title: 'Ways to explore',
      blocks: [
        { type: 'h3', text: 'Gallery' },
        { type: 'p', text: 'All experiments as cards, with search and filtering by subject. Each one has parameter controls (mass, length, angle, atomic number…) that change the simulation in real time.' },
        { type: 'h3', text: 'Virtual Museum' },
        { type: 'p', text: 'A 3D museum explored in first person: **WASD + mouse** on desktop, an **on-screen joystick** on phones. Each door leads to an experiment\'s **interactive room**, where it appears at a larger scale and can be adjusted without leaving the environment. When switching rooms, the screen fades out and the content is swapped inside the same 3D scene, without reloading the page.' },
        { type: 'h3', text: 'Augmented reality' },
        { type: 'p', text: 'Students point the phone at the floor or a table and see a reticle on the detected surface. Tapping the screen places the object there (a Bohr atom, a molecule or a DNA double helix). Touch gestures control the object:' },
        { type: 'list', items: ['**drag** moves it;', '**pinch** resizes it;', '**two-finger twist** rotates it.'] },
        { type: 'p', text: 'A ⚙ panel over the camera view lets students change the experiment\'s parameters.' },
        { type: 'h3', text: 'Virtual reality' },
        { type: 'p', text: 'Works on WebXR-compatible headsets, also straight from the browser.' },
        { type: 'h3', text: 'Gesture interaction (webcam)' },
        { type: 'p', text: 'Experiments in which **the student\'s body is part of the experiment**:' },
        { type: 'list', items: [
          '**You Are the Moving Object** — the hand becomes the object of a kinematics study. Position, velocity and acceleration graphs are drawn in real time as the student moves their hand in front of the camera.',
          '**Boyle\'s Law with Your Hands** — both hands are the walls of a container of gas. Bringing them closer reduces the volume, and the pressure, measured from particle collisions, rises.',
          '**Gesture-Guided Dissection** — a virtual amphibian dissection controlled with a pinch gesture.',
        ] },
        { type: 'p', text: 'Hand tracking runs **on the device itself**, and no camera image is sent anywhere. Without a webcam, the mouse works as an alternative.' },
      ],
    },
    {
      title: 'Experiments',
      blocks: [
        { type: 'table', head: ['Subject', 'Experiment', 'Available in'], rows: [
          ['Physics', 'Simple Pendulum', 'Page · Virtual Museum'],
          ['Physics', 'Projectile Motion', 'Page'],
          ['Physics', 'Solar System', 'Page'],
          ['Physics', 'Mechanical Waves', 'Page'],
          ['Physics', 'You Are the Moving Object', 'Webcam'],
          ['Chemistry', 'Bohr Model', 'Page · Virtual Museum · AR · VR'],
          ['Chemistry', 'Molecular Geometry (VSEPR)', 'Page · Virtual Museum · AR'],
          ['Chemistry', 'Boyle\'s Law with Your Hands', 'Webcam'],
          ['Biology', 'DNA Double Helix', 'Page · Virtual Museum · AR · VR'],
          ['Biology', 'Gesture-Guided Dissection', 'Webcam'],
        ] },
      ],
    },
    {
      title: 'The technical differentiator: the architecture',
      blocks: [
        { type: 'p', text: 'From a Computer Science point of view, the project\'s main contribution is the **software architecture** that organizes the experiments. The website is its proof of concept.' },
        { type: 'h3', text: 'Three-layer experiments' },
        { type: 'p', text: 'Each experiment is split into three layers, each with one responsibility:' },
        { type: 'table', head: ['Layer', 'Responsibility', 'Depends on'], rows: [
          ['**Scientific model** (`physics.ts`)', 'Equations, numerical integrators, data tables', 'Nothing: plain TypeScript'],
          ['**Presentation** (`scene.ts`)', 'Draws the phenomenon in 3D (Three.js) or 2D (canvas)', 'Model'],
          ['**Page** (`index.tsx`)', 'React interface and controls', 'Presentation'],
        ] },
        { type: 'p', text: 'Dependencies only point inward. The scientific model knows nothing about the browser, React or Three.js, so it can be verified in isolation.' },
        { type: 'h3', text: '"Mountable" contract and multiple hosts' },
        { type: 'p', text: 'An experiment **does not create its own 3D window**. It follows a minimal contract:' },
        { type: 'code', code: mountContract },
        { type: 'p', text: 'In other words, it knows how to mount its objects into a group, advance in time, react to parameters and release its memory. The renderer, camera, lights and animation loop belong to whoever **hosts** it:' },
        { type: 'code', code: `              +-> experiment page         (Gallery)
experiment ---+-> interactive room        (Virtual Museum)
              +-> augmented reality       (WebXR + hit-test)` },
        { type: 'p', text: 'As a result, **the same Bohr Model** appears on the page, in the museum and in AR without duplicating a single line of scene code.' },
        { type: 'h3', text: 'Declarative controls' },
        { type: 'p', text: 'Each experiment\'s parameters are described as **data** (name, type, range, initial value), not as UI components. From that description, the same panel is built automatically on the page, in the Virtual Museum HUD and in the augmented reality ⚙ panel.' },
        { type: 'h3', text: 'Input abstraction' },
        { type: 'p', text: 'Webcam experiments know nothing about MediaPipe. They receive input through a function, such as `readPosition()` or `readWalls()`, which can be fed by the tracked hand or by the mouse. Switching or turning off the camera does not affect the simulation.' },
        { type: 'h3', text: 'Measured evidence' },
        { type: 'p', text: 'Numbers recorded during development:' },
        { type: 'list', items: [
          'New presentation modes (museum, augmented reality) were added **without any change to the scientific models**.',
          'Each Virtual Museum room is described by a file of **29 to 71 lines**.',
          'Each augmented reality experiment is described in **about 20 lines**.',
          'Two duplicated AR scenes were replaced by **one generic host**. As a result, Molecular Geometry gained AR without any new scene code.',
          'In Boyle\'s Law, the pressure measured from particle collisions stayed **within 5.2% of the theoretical value** (PV = constant). The law **emerges** from the simulation instead of being a programmed formula.',
        ] },
      ],
    },
    {
      title: 'Implementation highlights',
      blocks: [
        { type: 'h3', text: 'Numerical physics' },
        { type: 'list', items: [
          'semi-implicit Euler integration, with a maximum step enforced inside the simulation itself (independent of frame rate);',
          '2D ideal gas with a Berendsen thermostat;',
          'velocity estimated by linear regression over the hand\'s trajectory, to reduce tracking noise.',
        ] },
        { type: 'h3', text: 'Robust gestures' },
        { type: 'list', items: [
          'pinch with **hysteresis**, so the object does not "flicker" between grabbed and released;',
          'distances normalized by palm size, so it works at any distance from the camera;',
          'signal smoothing and mirroring consistent with the video.',
        ] },
        { type: 'h3', text: 'WebXR in practice' },
        { type: 'list', items: [
          'hit-test to detect real surfaces;',
          'dom-overlay for an HTML interface over the camera;',
          'handling of `beforexrselect`, so a tap on the panel does not reposition the object;',
          'loop with `setAnimationLoop`.',
        ] },
        { type: 'h3', text: 'Application architecture' },
        { type: 'list', items: [
          '**GPU memory management:** every 3D resource (geometry, material, texture, renderer, observers) is explicitly released on exit. This is essential in an SPA where the user enters and leaves dozens of scenes.',
          '**Serverless navigation:** hash routes + History API, with a working browser back button and a direct link to each experiment, compatible with static hosting.',
          '**Automatic discovery:** museum rooms and theory texts are found through Vite\'s `import.meta.glob`. Creating the file in the experiment folder is enough.',
          '**Responsive and themed:** light and dark mode; side panel on desktop and bottom sheet on phones; touch controls in the museum.',
          '**Continuous deployment:** every push to `main` triggers the build on GitHub Actions and publishing to GitHub Pages.',
        ] },
      ],
    },
    {
      title: 'Technologies',
      blocks: [
        { type: 'table', head: ['Technology', 'Use'], rows: [
          ['**React 19 + TypeScript**', 'Interface and page composition'],
          ['**Vite**', 'Development (with local HTTPS for camera and WebXR) and build'],
          ['**Three.js**', '3D rendering on WebGL'],
          ['**WebXR Device API**', 'Virtual reality (`immersive-vr`) and augmented reality (`immersive-ar`, hit-test, dom-overlay)'],
          ['**MediaPipe Tasks Vision**', 'Tracking of 21 points on each hand, on the device'],
          ['**Canvas 2D**', 'Simulations and graphs for the webcam experiments'],
          ['**marked**', 'Rendering of the Theory and How it was made texts (Markdown)'],
          ['**GitHub Actions + GitHub Pages**', 'Continuous integration and delivery, free static hosting'],
        ] },
      ],
    },
    {
      title: 'What I did',
      blocks: [
        { type: 'p', text: 'Solo project, from concept to release:' },
        { type: 'list', items: [
          'problem research and analysis of existing solutions (PhET, ChemCollective, Labster, Merge EDU);',
          'definition of functional and non-functional requirements;',
          'design and implementation of the architecture and every experiment;',
          'Virtual Museum, augmented reality host and webcam integration;',
          'theory texts for students and technical documentation for each experiment;',
          'deployment pipeline;',
          'writing the thesis.',
        ] },
      ],
    },
    {
      title: 'Limitations and next steps',
      blocks: [
        { type: 'h3', text: 'Limitations' },
        { type: 'list', items: [
          'web augmented reality requires Android with Chrome and ARCore (iPhone Safari does not implement WebXR AR);',
          'virtual reality requires a headset;',
          'the hand-tracking model is downloaded on first use.',
        ] },
        { type: 'h3', text: 'Next steps' },
        { type: 'list', items: [
          'experiments in new areas (computer graphics, engineering);',
          'a study of pedagogical impact with high school classes;',
          'a collaborative Virtual Museum in VR;',
          'full-body tracking;',
          'a tool for teachers to create experiments without programming.',
        ] },
      ],
    },
  ],
  es: [
    {
      title: 'El problema',
      blocks: [
        { type: 'p', text: 'Muchas escuelas secundarias no tienen laboratorio de Ciencias: montar y mantener uno es caro. Las alternativas digitales suelen tener al menos uno de estos problemas:' },
        { type: 'list', items: ['exigen hardware específico, como gafas de realidad virtual;', 'cobran licencia;', 'dependen de plataformas cerradas.'] },
        { type: 'p', text: 'Sin experimentación, contenidos como las órbitas atómicas, la geometría de las moléculas o la relación entre presión y volumen de un gas se quedan solo en la pizarra y en el libro.' },
      ],
    },
    {
      title: 'La solución',
      blocks: [
        { type: 'p', text: '**CLARA.js** es un sitio en el que el estudiante **manipula el fenómeno** en lugar de solo leer sobre él. Basta con abrir la dirección: no hay instalación, registro ni servidor. Funciona en el ordenador y en el móvil. Cuando el dispositivo lo permite, el mismo experimento también puede verse en realidad aumentada (sobre la mesa del aula), en realidad virtual o controlarse con las propias manos.' },
        { type: 'p', text: 'Cada experimento incluye dos textos:' },
        { type: 'list', items: ['**Teoría** — el contenido explicado para el alumno;', '**Cómo se hizo** — la documentación técnica de cómo se construyó ese experimento.'] },
      ],
    },
    {
      title: 'Formas de explorar',
      blocks: [
        { type: 'h3', text: 'Galería' },
        { type: 'p', text: 'Todos los experimentos en tarjetas, con búsqueda y filtro por área. Cada uno tiene controles de parámetros (masa, longitud, ángulo, número atómico…) que cambian la simulación en tiempo real.' },
        { type: 'h3', text: 'Museo Virtual' },
        { type: 'p', text: 'Un museo 3D recorrido en primera persona: **WASD + ratón** en el ordenador, **joystick en pantalla** en el móvil. Cada puerta lleva a la **sala interactiva** de un experimento, donde aparece a escala ampliada y puede ajustarse sin salir del entorno. Al cambiar de sala, la pantalla se oscurece y el contenido se reemplaza dentro de la misma escena 3D, sin recargar la página.' },
        { type: 'h3', text: 'Realidad aumentada' },
        { type: 'p', text: 'El estudiante apunta el móvil al suelo o a una mesa y ve una retícula sobre la superficie detectada. Al tocar la pantalla, el objeto se coloca allí (un átomo de Bohr, una molécula o una doble hélice de ADN). Los gestos en la pantalla controlan el objeto:' },
        { type: 'list', items: ['**arrastrar** lo mueve;', '**pellizcar** cambia su tamaño;', '**girar con dos dedos** lo rota.'] },
        { type: 'p', text: 'Un panel ⚙ superpuesto a la cámara permite cambiar los parámetros del experimento.' },
        { type: 'h3', text: 'Realidad virtual' },
        { type: 'p', text: 'Funciona en visores compatibles con WebXR, también directamente desde el navegador.' },
        { type: 'h3', text: 'Interacción por gestos (webcam)' },
        { type: 'p', text: 'Experimentos en los que **el cuerpo del estudiante forma parte del experimento**:' },
        { type: 'list', items: [
          '**Tú Eres el Móvil** — la mano se convierte en el objeto de un estudio de cinemática. Los gráficos de posición, velocidad y aceleración se dibujan en tiempo real mientras el estudiante mueve la mano frente a la cámara.',
          '**Ley de Boyle con las Manos** — las dos manos son las paredes de un recipiente con gas. Al acercarlas, el volumen disminuye y la presión, medida a partir de las colisiones de las partículas, aumenta.',
          '**Disección Guiada por Gestos** — una disección virtual de anfibio controlada con el gesto de pinza.',
        ] },
        { type: 'p', text: 'El seguimiento de las manos se ejecuta **en el propio dispositivo**, y ninguna imagen de la cámara se envía a ningún sitio. Sin webcam, el ratón funciona como alternativa.' },
      ],
    },
    {
      title: 'Experimentos',
      blocks: [
        { type: 'table', head: ['Área', 'Experimento', 'Disponible en'], rows: [
          ['Física', 'Péndulo Simple', 'Página · Museo Virtual'],
          ['Física', 'Lanzamiento de Proyectil', 'Página'],
          ['Física', 'Sistema Solar', 'Página'],
          ['Física', 'Ondas Mecánicas', 'Página'],
          ['Física', 'Tú Eres el Móvil', 'Webcam'],
          ['Química', 'Modelo de Bohr', 'Página · Museo Virtual · RA · RV'],
          ['Química', 'Geometría Molecular (VSEPR)', 'Página · Museo Virtual · RA'],
          ['Química', 'Ley de Boyle con las Manos', 'Webcam'],
          ['Biología', 'Doble Hélice de ADN', 'Página · Museo Virtual · RA · RV'],
          ['Biología', 'Disección Guiada por Gestos', 'Webcam'],
        ] },
      ],
    },
    {
      title: 'El diferencial técnico: la arquitectura',
      blocks: [
        { type: 'p', text: 'Desde el punto de vista de la Computación, la principal contribución del proyecto es la **arquitectura de software** que organiza los experimentos. El sitio es su prueba de concepto.' },
        { type: 'h3', text: 'Experimento en tres capas' },
        { type: 'p', text: 'Cada experimento se divide en tres capas, cada una con una responsabilidad:' },
        { type: 'table', head: ['Capa', 'Responsabilidad', 'Depende de'], rows: [
          ['**Modelo científico** (`physics.ts`)', 'Ecuaciones, integradores numéricos, tablas de datos', 'Nada: TypeScript puro'],
          ['**Presentación** (`scene.ts`)', 'Dibuja el fenómeno en 3D (Three.js) o 2D (canvas)', 'Modelo'],
          ['**Página** (`index.tsx`)', 'Interfaz React y controles', 'Presentación'],
        ] },
        { type: 'p', text: 'Las dependencias solo apuntan hacia dentro. El modelo científico no sabe que existen el navegador, React o Three.js, por eso puede verificarse de forma aislada.' },
        { type: 'h3', text: 'Contrato "montable" y múltiples anfitriones' },
        { type: 'p', text: 'El experimento **no crea su propia ventana 3D**. Sigue un contrato mínimo:' },
        { type: 'code', code: mountContract },
        { type: 'p', text: 'Es decir, sabe montar sus objetos en un grupo, avanzar en el tiempo, reaccionar a parámetros y liberarse de la memoria. El renderizador, la cámara, las luces y el bucle de animación quedan a cargo de quien lo **hospeda**:' },
        { type: 'code', code: `               +-> página del experimento  (Galería)
experimento ---+-> sala interactiva        (Museo Virtual)
               +-> realidad aumentada      (WebXR + hit-test)` },
        { type: 'p', text: 'Así, **el mismo Modelo de Bohr** aparece en la página, en el museo y en RA sin duplicar una sola línea de código de escena.' },
        { type: 'h3', text: 'Controles declarativos' },
        { type: 'p', text: 'Los parámetros de cada experimento se describen como **datos** (nombre, tipo, intervalo, valor inicial) y no como componentes de interfaz. A partir de esa descripción, el mismo panel se monta automáticamente en la página, en el HUD del Museo Virtual y en el panel ⚙ de la realidad aumentada.' },
        { type: 'h3', text: 'Abstracción de entrada' },
        { type: 'p', text: 'Los experimentos de webcam no conocen MediaPipe. Reciben la entrada mediante una función, como `readPosition()` o `readWalls()`, que puede alimentarse con la mano rastreada o con el ratón. Cambiar o apagar la cámara no afecta a la simulación.' },
        { type: 'h3', text: 'Evidencias medidas' },
        { type: 'p', text: 'Números registrados durante el desarrollo:' },
        { type: 'list', items: [
          'Se añadieron nuevas formas de presentación (museo, realidad aumentada) **sin ninguna modificación en los modelos científicos**.',
          'Cada sala del Museo Virtual se describe en un archivo de **29 a 71 líneas**.',
          'Cada experimento en realidad aumentada se describe en **unas 20 líneas**.',
          'Dos escenas de RA duplicadas se sustituyeron por **un anfitrión genérico**. Con ello, la Geometría Molecular obtuvo RA sin ningún código de escena nuevo.',
          'En la Ley de Boyle, la presión medida por las colisiones de las partículas quedó **como máximo a un 5,2% del valor teórico** (PV = constante). La ley **emerge** de la simulación en lugar de ser una fórmula programada.',
        ] },
      ],
    },
    {
      title: 'Aspectos destacados de la implementación',
      blocks: [
        { type: 'h3', text: 'Física numérica' },
        { type: 'list', items: [
          'integración por Euler semiimplícito, con paso máximo garantizado dentro de la propia simulación (independiente de la tasa de fotogramas);',
          'gas ideal 2D con termostato de Berendsen;',
          'velocidad estimada por regresión lineal sobre la trayectoria de la mano, para reducir el ruido del seguimiento.',
        ] },
        { type: 'h3', text: 'Gestos robustos' },
        { type: 'list', items: [
          'pinza con **histéresis**, para que el objeto no "parpadee" entre agarrar y soltar;',
          'distancias normalizadas por el tamaño de la palma, para funcionar a cualquier distancia de la cámara;',
          'suavizado de la señal y espejado coherente con el vídeo.',
        ] },
        { type: 'h3', text: 'WebXR en la práctica' },
        { type: 'list', items: [
          'hit-test para detectar superficies reales;',
          'dom-overlay para tener interfaz HTML sobre la cámara;',
          'tratamiento de `beforexrselect`, para que un toque en el panel no reposicione el objeto;',
          'bucle con `setAnimationLoop`.',
        ] },
        { type: 'h3', text: 'Arquitectura de la aplicación' },
        { type: 'list', items: [
          '**Gestión de memoria de la GPU:** todo recurso 3D (geometría, material, textura, renderizador, observadores) se libera explícitamente al salir. Esto es esencial en una SPA en la que el usuario entra y sale de decenas de escenas.',
          '**Navegación sin servidor:** rutas por hash + History API, con el botón atrás del navegador funcionando y enlace directo a cada experimento, compatible con alojamiento estático.',
          '**Descubrimiento automático:** las salas del museo y los textos de teoría se encuentran mediante `import.meta.glob` de Vite. Basta con crear el archivo en la carpeta del experimento.',
          '**Responsive y con tema:** modo claro y oscuro; panel lateral en escritorio y bottom sheet en el móvil; controles táctiles en el museo.',
          '**Despliegue continuo:** cada push a `main` dispara el build en GitHub Actions y la publicación en GitHub Pages.',
        ] },
      ],
    },
    {
      title: 'Tecnologías',
      blocks: [
        { type: 'table', head: ['Tecnología', 'Uso'], rows: [
          ['**React 19 + TypeScript**', 'Interfaz y composición de las páginas'],
          ['**Vite**', 'Desarrollo (con HTTPS local para cámara y WebXR) y build'],
          ['**Three.js**', 'Renderizado 3D sobre WebGL'],
          ['**WebXR Device API**', 'Realidad virtual (`immersive-vr`) y aumentada (`immersive-ar`, hit-test, dom-overlay)'],
          ['**MediaPipe Tasks Vision**', 'Seguimiento de 21 puntos de cada mano, en el dispositivo'],
          ['**Canvas 2D**', 'Simulaciones y gráficos de los experimentos de webcam'],
          ['**marked**', 'Renderizado de los textos de Teoría y Cómo se hizo (Markdown)'],
          ['**GitHub Actions + GitHub Pages**', 'Integración y entrega continuas, alojamiento estático gratuito'],
        ] },
      ],
    },
    {
      title: 'Lo que hice',
      blocks: [
        { type: 'p', text: 'Proyecto individual, de la concepción a la publicación:' },
        { type: 'list', items: [
          'estudio del problema y análisis de soluciones existentes (PhET, ChemCollective, Labster, Merge EDU);',
          'definición de los requisitos funcionales y no funcionales;',
          'diseño e implementación de la arquitectura y de todos los experimentos;',
          'Museo Virtual, anfitrión de realidad aumentada e integración con la webcam;',
          'textos teóricos para el estudiante y documentación técnica de cada experimento;',
          'pipeline de despliegue;',
          'redacción de la memoria del TFG.',
        ] },
      ],
    },
    {
      title: 'Limitaciones y próximos pasos',
      blocks: [
        { type: 'h3', text: 'Limitaciones' },
        { type: 'list', items: [
          'la realidad aumentada en la web depende de Android con Chrome y ARCore (Safari en iPhone no implementa WebXR AR);',
          'la realidad virtual depende de un visor;',
          'el modelo de seguimiento de las manos se descarga en el primer uso.',
        ] },
        { type: 'h3', text: 'Próximos pasos' },
        { type: 'list', items: [
          'experimentos de nuevas áreas (computación gráfica, ingeniería);',
          'estudio de impacto pedagógico con grupos de secundaria;',
          'Museo Virtual en RV y colaborativo;',
          'seguimiento del cuerpo entero;',
          'una herramienta para que los profesores creen experimentos sin programar.',
        ] },
      ],
    },
  ],
}
