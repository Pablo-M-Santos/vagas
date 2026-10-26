# 🎨 FRONTEND.md — Vagas-Hub Web (Next.js)

> **Objetivo:** transformar o backend que já existe (scraper + analyzer + SQLite) em um produto web
> com **landing page** (capa do projeto) e **tela principal de vagas** com filtros ao vivo.
>
> Este documento é a **plana de estrutura** — não é código. A implementação acontece em fases
> (ver [Roadmap de implementação](#-roadmap-de-implementação)).

---

## 1. Visão geral da ideia

```
┌─────────────────────────────────────────────────────────────┐
│  /  (Landing Page — capa do projeto)                        │
│  Header: [Logo] ................. [🤖 Ver vagas →]          │
│  Hero animado · como funciona · stats · stacks · CTA        │
└─────────────────────────────────────────────────────────────┘
                            │  botão no header
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  /vagas  (Tela principal — o coração do produto)            │
│  Header: [Logo] [Busca] [Filtros] ............ [← Voltar]   │
│                                                             │
│  ┌─ Sidebar de filtros ─┐  ┌─ Lista de cards ────────────┐  │
│  │ Busca por título     │  │ Título · Empresa · Local    │  │
│  │ Empresa              │  │ 💰 Salário (ou "não inform.")│  │
│  │ Stack / palavras-ch. │  │ Tags de keywords            │  │
│  │ Senioridade          │  │ [Abrir vaga ↗] link completo │  │
│  │ Modelo (remoto/híb.) │  │ Data de publicação          │  │
│  │ Faixa salarial       │  └─────────────────────────────┘  │
│  │ Ordenação · Página   │                                   │
│  └──────────────────────┘                                   │
└─────────────────────────────────────────────────────────────┘
```

**Princípios:**

1. **Landing ≠ App** — a landing é estática, rápida e com animações de storytelling; a tela de
   vagas é uma SPA leve focada em performance de busca/filtro.
2. **Filtros são a feature principal** — tudo filtrável deve reagir em < 100 ms, sem recarregar a página.
3. **Link da vaga sempre visível e completo** — `jobUrl` abre em nova aba, sem redirecionador.
4. **Mobile-first** — a maioria do público (devs júnior BR) vai acessar pelo celular.

---

## 2. Stack escolhida

| Camada | Tecnologia | Por quê |
|---|---|---|
| Framework | **Next.js 15 (App Router)** + TypeScript strict | SSR/SSG da landing, rotas de API integradas, igual ao resto do repo |
| Estilo | **Tailwind CSS v4** | tokens de tema, responsividade rápida, sem CSS-in-JS |
| Animações | **Framer Motion** (`motion`) | entrada de elementos, layout animation, stagger nas listas |
| Ícones | **lucide-react** | leves e consistentes |
| Estado de filtros | **useSearchParams + useState** (URL como fonte da verdade) | filtros compartilháveis por link, sem lib extra |
| Dados | **Route Handlers do Next** (`app/api/**`) lendo **Prisma + SQLite** | mesmo banco do worker, zero serviço extra |
| Base de dados | `prisma/schema.prisma` **já existente** | não modelar de novo — só expor leitura |
| Deploy | Vercel **ou** o mesmo servidor do worker (Docker/Pm2) | SQLite local implica server próprio → ver §7 |

> Fora de escopo por ora: auth, CMS, banco Postgres, fila de mensagens.

---

## 3. Estrutura de pastas proposta

Monorepo simples: o frontend vive em `frontend/` dentro do repositório atual.

```
vagas-hub/
├── prisma/
│   └── schema.prisma          # fonte única do schema (compartilhada)
├── src/                        # backend (worker) — NÃO mexer
│   ├── adapters/
│   ├── analyzer/
│   ├── bot/
│   ├── database/
│   └── scheduler/
│
└── frontend/                   # ← NOVO (app Next.js)
    ├── package.json            # próprio (next, react, tailwind, framer-motion)
    ├── next.config.ts          # rewrites para /api se separado; output standalone
    ├── tailwind.config.ts
    ├── .env.local              # DATABASE_URL=file:../vagas.db
    └── src/
        ├── app/
        │   ├── layout.tsx          # fontes, tema, Header global
        │   ├── page.tsx            # 🔷 LANDING PAGE
        │   ├── globals.css
        │   ├── vagas/
        │   │   ├── page.tsx        # 📋 TELA DE VAGAS (client component)
        │   │   ├── loading.tsx     # skeleton animado
        │   │   └── error.tsx
        │   └── api/
        │       ├── jobs/route.ts       # GET /api/jobs  (lista + filtros)
        │       ├── jobs/[id]/route.ts  # GET /api/jobs/:id (detalhe)
        │       ├── filters/route.ts    # GET /api/filters (opções p/ selects)
        │       └── stats/route.ts      # GET /api/stats (números p/ landing)
        ├── components/
        │   ├── layout/
        │   │   ├── Header.tsx           # logo + botão "Ver vagas"
        │   │   └── Footer.tsx
        │   ├── landing/
        │   │   ├── Hero.tsx
        │   │   ├── ProblemSection.tsx   # cards de dor (busca manual, spam…)
        │   │   ├── PipelineSection.tsx  # scraping → anti-spam → analyzer → dedup → telegram
        │   │   ├── StatsSection.tsx     # números reais via /api/stats
        │   │   ├── TechSection.tsx
        │   │   └── CTA.tsx
        │   ├── vagas/
        │   │   ├── JobCard.tsx
        │   │   ├── JobList.tsx          # <AnimatePresence> + stagger
        │   │   ├── FilterPanel.tsx      # sidebar / bottom-sheet mobile
        │   │   ├── SearchBar.tsx        # debounce 300ms
        │   │   ├── FilterChips.tsx      # filtros ativos removíveis
        │   │   ├── SortSelect.tsx
        │   │   ├── Pagination.tsx
        │   │   ├── EmptyState.tsx
        │   │   └── JobsSkeleton.tsx
        │   └── ui/                      # Button, Badge, Select, Slider, Input…
        ├── hooks/
        │   ├── useJobFilters.ts         # lê/escreve filtros na URL
        │   └── useJobs.ts               # fetch + cache + abort de requisições
        └── lib/
            ├── api.ts                   # client fetch tipado
            ├── types.ts                 # JobDTO, FiltersDTO (espelham Prisma)
            └── format.ts                # moeda, data relativa, slug
```

---

## 4. Contrato de dados (o mais importante)

### 4.1 `JobDTO` — o que a UI consome

```ts
export interface JobDTO {
  id: string;
  title: string;            // ex.: "Desenvolvedor(a) Front-end Júnior"
  company: string;          // ex.: "Nubank"
  location: string | null;  // ex.: "São Paulo · Híbrido" | "Remoto"
  salary: string | null;    // ex.: "R$ 3.500 - R$ 5.000"  ⚠️ ver §6
  jobUrl: string;           // link COMPLETO da vaga (abre em nova aba)
  keywords: string[];       // ["React","TypeScript","Next.js"]
  seniority: 'ESTAGIO' | 'JUNIOR' | 'TRAINEE';
  workModel: 'REMOTO' | 'HIBRIDO' | 'PRESENCIAL' | 'DESCONHECIDO';
  postedAt: string;         // ISO
  platform: 'LINKEDIN' | 'GUPY' | 'INDEED';
}
```

> O Prisma hoje guarda `matchedKeywords` como **String** (CSV) e não tem `salary`,
> `seniority` nem `workModel`. A API faz o *parse* do CSV em `string[]` e, para os campos
> ausentes, aplica fallback — detalhado em §6.

### 4.2 `GET /api/jobs`

Query params (tudo opcional):

| Param | Exemplo | Efeito |
|---|---|---|
| `q` | `react junior` | busca full-text em título + empresa + descrição |
| `company` | `nubank` | igualdade parcial (contains, case-insensitive) |
| `keywords` | `React,TypeScript` | vaga contém **todas** as keywords informadas |
| `location` | `São Paulo` | contains |
| `remote` | `true` | somente trabalho remoto |
| `seniority` | `JUNIOR` | enum |
| `salaryMin` | `3000` | filtra por salário mínimo (quando existir) |
| `sort` | `recent \|relevant \|company` | ordenação (padrão: `recent`) |
| `page` | `1` | paginação (padrão: 20 por página) |

Resposta:

```jsonc
{
  "data": [ /* JobDTO[] */ ],
  "meta": { "total": 148, "page": 1, "pageSize": 20, "pages": 8 },
  "appliedFilters": { "q": "react junior", "remote": true }
}
```

`GET /api/filters` devolve as opções dinâmicas para os selects:

```jsonc
{
  "companies": [{ "value": "Nubank", "count": 4 }],
  "keywords":  [{ "value": "React", "count": 31 }],
  "locations": [{ "value": "Remoto", "count": 62 }],
  "salaryRange": { "min": 1500, "max": 8000 }
}
```

**Regras da API**

- Somente **leitura** (`findMany`, `count`) — nenhuma escrita a partir do web.
- `WHERE` montado dinamicamente a partir dos params; sem params = lista completa.
- `Cache-Control: public, max-age=30` para respostas de lista (as vagas mudam a cada 2h via worker).
- CORS liberado apenas para o domínio próprio (ou same-origin, se Next servir tudo).

---

## 5. As duas telas

### 5.1 Landing page `/` — a capa

**Header (fixo, com blur no scroll):**

```
[◈ VAGAS-HUB]        Como funciona   Pipeline   Stack   [ Ver vagas → ]
```

O botão **“Ver vagas”** é o CTA principal: só ele, sempre visível, com hover animado
(arrow desliza, leve scale). No mobile vira um botão compacto à direita.

**Seções (na ordem):**

| # | Seção | Conteúdo | Animação |
|---|---|---|---|
| 1 | **Hero** | Headline forte + subhead + dois CTAs (“Ver vagas” / “Como funciona”) + mock flutuante de um JobCard | Entrada em cascata (título → sub → CTA), mock com `y` + blur, gradiente animado de fundo |
| 2 | **Dores** | 4 cards: busca manual, vagas sênior disfarçadas, consultorias, notificações repetidas | Stagger + leve tilt no hover |
| 3 | **Pipeline** | 5 passos: Scraping → Anti-Spam → Analyzer → Dedup → Telegram | *Scroll-linked*: passos acendem conforme entram na viewport; linha conectora desenha |
| 4 | **Stats** | N vagas analisadas · N empresas · N keywords · tempo médio | Números fazem count-up ao entrar |
| 5 | **Stack** | Node · TS · Prisma · SQLite · Next.js · Telegram | Grid com reveal escalonado |
| 6 | **CTA final** | “Pare de caçar vaga. Deixe o robô fazer isso.” + botão | Fade + slide |

**Rodapé:** links, créditos, badges da stack.

> Reaproveitar o conteúdo que **já existe** em `README.md` (as mesmas dores, o mesmo pipeline,
> as mesmas tags de analyzer) — a landing é a versão visual daquele documento.

### 5.2 Tela principal `/vagas`

**Layout desktop (2 colunas):**

```
┌─ Header sticky ────────────────────────────────────────────────┐
│ [◈]  [ 🔍 Busca por cargo, empresa, stack...    ] [ Filtros ] │
│ [chip: remoto ×] [chip: react ×] [chip: Júnior ×]  148 vagas  │
├──────────────┬─────────────────────────────────────────────────┤
│ FILTROS      │  ORDENAR: [Mais recentes ▾]                     │
│ (sticky)     │  ┌───────────────────────────────────────────┐  │
│              │  │ Desenvolvedor Front-end Júnior        ↗  │  │
│ 🔍 Busca     │  │ Nubank · São Paulo · Híbrido             │  │
│              │  │ 💰 R$ 3.500 – R$ 5.000                   │  │
│ Empresa ▾    │  │ [React] [TypeScript] [Next.js]           │  │
│ Stack ☑      │  │ há 2 dias · LinkedIn                     │  │
│ Local ☑      │  └───────────────────────────────────────────┘  │
│ Senioridade  │  ┌───────────────────────────────────────────┐  │
│ Modelo ☑     │  │ Estágio em QA — Manaus · Remoto      ↗  │  │
│ Salário ──●──│  │ ...                                       │  │
│ Faixa: 1-8k  │  └───────────────────────────────────────────┘  │
│              │                                   ‹ 1  2  3 ›  │
└──────────────┴─────────────────────────────────────────────────┘
```

**Card de vaga (unidade mínima):**

- **Título** (2 linhas máx) + ícone de plataforma
- **Empresa** + **Local** (dot separador)
- **💰 Salário** — em destaque (badge verde) quando existir; quando não, exibir
  `Não informado` em tom sutil (nunca omitir o campo, o usuário pediu para ver “se tiver”)
- **Keywords** como tags clicáveis → clicar **adiciona** aquele filtro
- **Data relativa** (“há 3 horas”)
- **“Abrir vaga ↗”** — âncora `jobUrl` com `target="_blank" rel="noopener noreferrer"`,
  mostrando o domínio de origem (ex.: `linkedin.com/jobs/view/…`) para dar confiança
- Card inteiro também clica (a área toda é o link)

**Comportamento dos filtros:**

1. Todo filtro é gravado na **URL** (`/vagas?q=react&remote=true&sort=recent`) —
   resultado compartilhável, *back/forward* do navegador funciona.
2. `q` tem **debounce de 300 ms** e cancela a request anterior (`AbortController`).
3. Ao mudar qualquer filtro, a lista mostra o **skeleton** (sem tela branca) e
   os cards entram com stagger de 30–40 ms.
4. **Filtros ativos aparecem como chips** removíveis acima da lista, com “Limpar tudo”.
5. Contadores por opção (`Nubank · 4`) vêm de `/api/filters`.
6. **Mobile:** sidebar vira *bottom-sheet* acessível pelo botão “Filtros (3)”; chips continuam visíveis.
7. Estado vazio amigável: “Nenhuma vaga com esses filtros — tentar ‘limpar filtros’?”

---

## 6. Lacunas de dados a resolver (⚠️ ler antes de codar)

O schema atual **não** tem todos os campos que a UI quer exibir. Plano:

| Campo na UI | Existe no schema? | Estratégia |
|---|---|---|
| `title` | ✅ `Job.title` | direto |
| `company` | ✅ `Job.company` | direto |
| `jobUrl` | ✅ `Job.jobUrl` | direto |
| `location` | ✅ `Job.location` | direto (heurística: contém “remoto” → `REMOTO`) |
| `keywords` | ⚠️ `matchedKeywords` é **String CSV** | `split(',').map(trim)` na API → `string[]` |
| `salary` | ❌ **não existe** | **Fase A:** exibir “Não informado”. **Fase B:** adicionar `salary String?` ao `schema.prisma` + extrair no scraper (regex `R$\s*\d{1,4}(?:\.\d{3})*` sobre a descrição e sobre o texto do anúncio) + backfill com um script único |
| `seniority` | ❌ | derivar no servidor por heurística já pronta no `analyzer/` (contém `estágio` → `ESTAGIO`, `júnior\|jr` → `JUNIOR`) |
| `workModel` | ❌ | derivar de `location`/`description` (`remoto`, `híbrido`, `presencial`) |
| `postedAt` | ✅ `Job.postedAt` | direto (fallback `createdAt`) |

> Regra: **a UI nunca deve quebrar por campo ausente** — tudo opcional com fallback explícito.

---

## 7. Animações — diretrizes

- **Landing:** orquestrada. `viewport={{ once: true }}`, stagger de 60–80 ms entre itens,
  easing suave (`[0.22, 1, 0.36, 1]`), duração 0.4–0.6 s. Nada de animação > 700 ms.
- **Tela de vagas:** discreta. Só `AnimatePresence` na troca de lista e micro-interações em
  hover/active dos cards e chips. Performance > vaidade.
- **Respeitar** `prefers-reduced-motion` (desativar parallax/count-up/stagger).
- **Sem animação de layout** em listas longas com paginação — causa jank.
- Animações devem ser *progressive*: conteúdo visível sem JS (não esconder com `opacity: 0`
  permanentemente se o JS falhar).

---

## 8. Roadmap de implementação

### Fase 0 — Fundação ✅ concluída
- [x] `frontend/` criado com `create-next-app` (TS + Tailwind v4 + App Router + ESLint)
- [x] Schema compartilhado por symlink (`frontend/prisma/schema.prisma` → `../../prisma/schema.prisma`);
      `DATABASE_URL="file:../../prisma/vagas.db"` em `frontend/.env.local` (Next) e `frontend/prisma/.env` (CLI)
      — o Prisma resolve caminho relativo a partir do diretório do schema
- [x] `lib/types.ts`, `lib/filters.ts` (puro, seguro p/ client), `lib/jobs-query.ts` (server) e `lib/db.ts` (singleton)
- [x] Dev em `:3000` (`npm run web` na raiz); o worker continua sendo cron, sem servidor HTTP

### Fase 1 — API de leitura ✅ concluída
- [x] `GET /api/jobs` (`q`, `company`, `sort`, `page`, `pageSize`) com paginação e clamps
- [x] `GET /api/filters` (empresas com contagem)
- [x] `GET /api/stats` (números da landing)
- [x] Testes Vitest (33): montagem do `WHERE`, **busca sem acento**, curingas de LIKE/injeção,
      CSV → array, limites de paginação e parsing de params

### Fase 2 — Tela de vagas ✅ concluída
- [x] `JobCard` (título, empresa, local, salário/“não informado”, keywords, link completo em nova aba),
      `JobList`, skeleton e empty state
- [x] `SearchBar` com debounce de 300ms + cancelamento da request anterior
- [x] Filtros básicos (busca + empresa) sincronizados com a URL — senioridade/stack/local/modelo ficaram para depois
- [x] Chips de filtros ativos + “Limpar tudo”
- [x] Ordenação (recentes / empresa A-Z / título A-Z) e paginação numerada
- [x] Layout mobile: botão “Filtros” abre/fecha o painel, sem rolagem horizontal
- [x] SSR da lista a cada navegação (o servidor consulta o SQLite; o fetch é só fallback)
- [x] Verificação em navegador real via Chrome/CDP: 26 asserções (desktop + mobile)

### Fase 3 — Landing page ✅ concluída
- [x] `Header` sticky com botão “Ver vagas” (vira “Início” na rota `/vagas`)
- [x] Hero + Dores + Pipeline + Stats (números reais) + Stack + CTA final — visual próprio light-first,
      sem reaproveitar o visual escuro do `README.md`
- [x] Animações: CSS puro no Hero (entrada escalonada, card flutuante), `IntersectionObserver` no
      scroll-reveal e no count-up, `framer-motion` só na lista de `/vagas`; `prefers-reduced-motion` respeitado
- [x] SEO: `<title>` com template, description, Open Graph, `lang="pt-BR"`
- [ ] favicon próprio e `sitemap.xml` (ainda usa os defaults do Next)

### Fase 4 — Salário ⏸ adiada (decisão da §9.3: “em breve”)
- [ ] Adicionar `salary String?` ao `schema.prisma` + `db push`
- [ ] Regex de salário no adapter (`R$ …`, “a combinar”, “clt”)
- [ ] Script de backfill para vagas já salvas
- [ ] Filtro por faixa salarial (`salaryMin`) + badge verde no card

> Enquanto isso a UI já reserva o espaço: o card mostra “Salário não informado” e o painel de
> filtros exibe “Em breve — ainda não coletamos essa informação”.

### Fase 5 — Polish ✅ concluída (com uma ressalva)
- [x] `npm run lint` com **0 erros**, `npm run typecheck` limpo, 33 testes unitários passando
- [x] Build de produção (`npm run build`) e verificação E2E no build de produção
- [x] CI: `.github/workflows/web.yml` (install → lint → typecheck → test → build) ao lado do `worker.yml`
- [x] Lighthouse (mediana de 3 execuções): **a11y 100 · SEO 100 · best-practices 100** nas duas rotas
- [ ] Performance ≥ 90 garantida: medido entre **83 e 92** conforme a carga da máquina (a medição
      aqui rodou com load ~5). Ganhos já aplicados: peso da landing 367 → 250 KiB (saída do
      `framer-motion` da landing e da fonte mono) e remoção da opacidade no Hero (LCP)
- [ ] Testes de componente com Testing Library (hoje: unitários em Vitest + E2E via CDP)

---

## 9. Decisões tomadas ✅

1. **Deploy: alternativa (a)** — mesmo servidor/Pm2 do worker. O `frontend/` sobe com
   `npm run web:build && npm run web:start` (ou `pm2 start npm --name "vagas-web" -- run web:start`).
   O SQLite continua sendo a única fonte de dados, sem serviço extra.
2. **Filtros: só o básico** — busca por texto (título/empresa/descrição), filtro por empresa,
   ordenação e paginação. Senioridade, stack, localização e modelo de trabalho ficam para depois.
3. **Filtro por salário: “em breve”** — Fase 4 adiada; a UI já deixa o espaço reservado.
4. **Visual: light-first** — nada do visual dark navy/teal do `README.md` foi reaproveitado;
      tokens novos em `globals.css` (fundo `#f6f7fb`, tinta `#0f172a`, acento indigo `#4f46e5`).

---

## 10. Fora de escopo (por enquanto)

- Login/conta do usuário e sistema de favoritos
- Aplicação/candidatura integrada
- Painel administrativo de blacklists (roadmap do README)
- Multi-idioma (pt-BR primeiro)

---

## 11. Como rodar o frontend

```bash
# na raiz do repositório
npm run web          # dev em http://localhost:3000
npm run web:build    # build de produção (gera frontend/.next)
npm run web:start    # serve o build de produção
npm run web:test     # testes unitários (Vitest)
```

Dentro de `frontend/` também valem `npm run lint`, `npm run typecheck` e `npm run db:push`.
O banco é o mesmo do worker (`prisma/vagas.db`) — nada de migrate paralelo.
