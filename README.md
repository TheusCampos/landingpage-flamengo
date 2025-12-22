# Clube de Regatas do Flamengo — Site Institucional

Projeto estático profissional com HTML5 semântico, CSS modular e JavaScript ES6+ focado em performance, acessibilidade e SEO.

## Sobre o Projeto
- Projeto criado por um torcedor do Flamengo (autor) para testar e demonstrar habilidades de desenvolvimento web.
- Foco em HTML5, CSS3, JavaScript ES6+, acessibilidade, SEO e performance, seguindo boas práticas e código limpo.
- Natureza educativa e pessoal; não é o site oficial do clube.

## Visão Geral
- Interface moderna e responsiva (mobile-first)
- Acessibilidade com navegação por teclado, hierarquia de headings e atributos ARIA
- SEO configurado com metatags e Open Graph
- Performance otimizada com `lazy loading`, `async decoding` e efeitos progressivos

## Estrutura de Pastas (atual)
```
site-flamengo/
├── assets/
│   ├── css/
│   │   ├── global/ (reset, base, utilitários, variáveis)
│   │   └── pages/partials/ (hero, about, services, contact)
│   ├── img/ (imagens estáticas e logos)
│   └── js/
│       ├── global/ (preloader, navegação, utilitários)
│       └── pages/partials/ (efeitos de scroll)
├── docs/
├── index.html
├── robots.txt
└── sitemap.xml
```

> Nota: Há um padrão de estrutura obrigatório proposto pelo time (com `favicons/`, `webmanifest`, etc.). A migração será feita de forma controlada para não quebrar caminhos atuais.

## Tecnologias
- HTML5, CSS3 (Grid, Flexbox, Custom Properties)
- JavaScript ES6+ modular
- Sem bundlers; site estático pronto para qualquer hospedagem

## Padrões de Código
- CSS com BEM naming e variáveis em `assets/css/global/variables.css`
- Efeitos progressivos com `IntersectionObserver` e fallback
- Modularidade via `assets/js/index.js` centralizando imports

## Acessibilidade
- `aria-label` na navegação principal: `index.html:29`
- Imagens com `alt` descritivo e `decoding="async"`
- Navegação por teclado suportada; foco visível respeitando estilos base

## SEO
- Metatags e Open Graph: `index.html:15–23`
- `robots.txt` liberando o site e `sitemap.xml` válido (ajustar para domínio em produção)

## Performance
- Imagens com `loading="lazy"` e `decoding="async"`
- Evitar filtros e transformações desnecessárias em logos
- Efeitos de entrada apenas quando no viewport

## Desenvolvimento
- Abrir `index.html` diretamente no navegador, ou usar um servidor estático (ex.: Live Server do VSCode)
- Arquivos principais:
  - CSS: `assets/css/index.css` importa globais e parciais
  - JS: `assets/js/index.js` importa módulos globais e de página
  - HTML: `index.html` contém a estrutura semântica das seções

## Deploy
- Hospedagem estática (GitHub Pages, Netlify, Vercel, ou servidor Nginx/Apache)
- Atualizar `sitemap.xml` e `canonical` com o domínio final
- Otimizar imagens pesadas para `.webp` quando possível

## Roadmap de Migração (Estrutura Obrigatória)
1. Adicionar `favicons/` e `site.webmanifest`
2. Migrar `assets/img` para `assets/imagens` com remapeamento
3. Consolidar `docs` e publicar guia técnico

## Referências Rápidas
- Patrocinadores (responsividade e hierarquia): `assets/css/pages/partials/services-section.css:579–606`
- Inicialização de logos (lazy/async e ARIA): `assets/js/pages/partials/scroll-effects.js:89–105`
- Metatags SEO/OG e tema: `index.html:15–23`

## Contribuição
- Enviar PRs com descrição clara e validação visual
- Manter semântica, acessibilidade e consistência de estilos
