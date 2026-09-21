# Portfólio — Darlan Ferreira

Portfólio profissional estático para candidaturas a vagas de desenvolvimento júnior e estágio remunerado.

## Stack e estrutura

React, TypeScript, Vite, React Router, CSS e ESLint. Sem backend. `HashRouter` preserva as páginas de projetos após refresh no GitHub Pages.

- `src/components/`: layout e card de projeto
- `src/pages/`: home e página reutilizável de detalhes
- `src/data/projects.ts`: projetos e campos opcionais
- `src/data/links.ts`: e-mail e redes
- `src/i18n/translations.ts`: traduções PT, EN e ES
- `src/hooks/`: tema e idioma com `localStorage`
- `src/styles/`: estilos responsivos
- `src/assets/`: imagens futuras

## Instalação e execução

Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

## Qualidade e build

```bash
npm run lint
npm run typecheck
npm run build
npm run preview
```

O build é gerado em `dist/`.

## Edição

Edite `src/data/projects.ts` para adicionar projetos. Os campos opcionais só são renderizados quando preenchidos. Para screenshots, coloque imagens em `public/` e use caminhos relativos à base do site. O projeto Java contém apenas dados confirmados e um aviso de rascunho.

Edite `src/i18n/translations.ts` para alterar textos. Português é o idioma inicial. Tema inicial segue `prefers-color-scheme`; as preferências ficam no `localStorage`.

## GitHub Pages

O repositório de publicação é `darlan-ferreira1/darlan-ferreira1.github.io`, na branch `main`, e o site fica em https://darlan-ferreira1.github.io/. Em **Settings → Pages → Build and deployment**, selecione **GitHub Actions**. O workflow `.github/workflows/deploy.yml` executa lint, typecheck, build e publica `dist/` a cada push. `base: '/'` corresponde à publicação na raiz do domínio. As rotas de detalhes usam `/#/projects/:slug`.

O workflow usa Node.js 22 e instala as versões do `package-lock.json` com `npm ci`. A verificação de tipos acontece dentro de `npm run build`, antes do Vite gerar o site.

Após enviar os arquivos para a branch `main`, acompanhe **Actions → Deploy to GitHub Pages**. Também é possível iniciar a publicação manualmente em **Run workflow**, selecionando `main`. O endereço publicado aparece em **Settings → Pages** e no ambiente `github-pages` da execução. Não é necessário versionar `dist/` nem criar uma branch `gh-pages`.
