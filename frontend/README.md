# Vagas-Hub — Web (Next.js)

Frontend do Vagas-Hub: landing page (capa do projeto) em `/` e a tela de vagas com filtros em `/vagas`.

```bash
# a partir da raiz do repositório
npm run web          # dev em http://localhost:3000
npm run web:build    # build de produção
npm run web:start    # serve o build
npm run web:test     # testes unitários (Vitest)
```

Dentro desta pasta: `npm run lint`, `npm run typecheck`, `npm run db:push`.

## Como os dados chegam aqui

- `frontend/prisma/schema.prisma` é um **symlink** de `../../prisma/schema.prisma` (fonte única).
- `DATABASE_URL` (`file:../../prisma/vagas.db`) é resolvido pelo Prisma **a partir do diretório do
  schema**, ou seja, aponta para o mesmo SQLite do worker.
- A rota `/vagas` é um Server Component: consulta o SQLite direto a cada navegação e hidrata a
  lista; as rotas `/api/*` existem para consumo externo e como fallback do client.

## Estrutura

```
src/
├── app/
│   ├── page.tsx            # landing (server component + dados de /api/stats via Prisma)
│   ├── vagas/              # tela principal (SSR + client)
│   └── api/                # /jobs, /filters, /stats
├── components/
│   ├── Header.tsx, Footer.tsx
│   ├── landing/            # Hero, dores, pipeline, stats, stack (animacoes em CSS/IO)
│   └── vagas/              # cards, busca, filtros, paginacao
├── hooks/                  # useJobFilters (URL), useJobs, useFilterOptions
└── lib/                    # filtros puro, SQL parametrizado, formatacao, prisma
```

O plano completo (fases, decisões e pendências) está em [`../FRONTEND.md`](../FRONTEND.md).
