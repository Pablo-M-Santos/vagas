// projeto open-source · Node.js + TypeScript

# Vagas-Hub

Agrega, filtra e entrega vagas de TI Junior/Estágio diretamente no Telegram — sem busca manual, sem spam de recrutadora gringa.

Node.js 20+ TypeScript SQLite · Prisma scraping nativo Telegram Bot

// motivação

## O problema que isso resolve

🔍

Busca manual diária

Navegar pelo LinkedIn todo dia é exaustivo e ineficiente. O worker faz isso automaticamente, coletando vagas das últimas 72h.

🚫

Vagas Sênior disfarçadas

Muitos anúncios "Júnior" escondem requisitos de Pleno/Sênior. O analisador rejeita qualquer cargo fora do nível de entrada.

🌐

Consultorias de gringa

BairesDev, Turing, Jobbol e similares poluem os resultados. A blacklist de empresas elimina essas fontes antes mesmo da análise.

🔁

Notificações repetidas

Sem deduplicação, a mesma vaga aparece toda vez. O histórico local em SQLite garante que cada vaga seja notificada uma única vez.

// arquitetura

## Como o pipeline funciona

Cada execução do worker percorre cinco etapas em sequência. Uma falha em qualquer etapa é registrada no `ExecutionLog` sem derrubar o processo inteiro.

🕸

Scraping

Axios + Cheerio\
Paginação profunda\
LinkedIn nativo

→

🛡

Anti-Spam

Blacklist de\
empresas e\
plataformas

→

🧠

Analyzer

Heurística com\
safeRegex · valida\
stack + senioridade

→

💾

Deduplicação

Persiste no SQLite\
via Prisma ORM\
Evita re-notificar

→

📲

Notificação

Bot API Telegram\
Mensagem HTML\
formatada

ℹ️

**Scraping 100% gratuito:** o projeto não usa Apify nem qualquer API paga. A coleta é feita diretamente nas páginas públicas do LinkedIn usando queries compostas com filtros de data, localização e trabalho remoto (`f_WA=1`).

// tecnologias

## Stack técnica

Runtime

Node.js 20+

TypeScript com strict mode

Scraping

Axios + Cheerio

HTTP nativo + parsing de HTML

Banco de Dados

SQLite

Arquivo local, zero config

ORM

Prisma

Migrations + repositórios tipados

Notificações

Telegram Bot API

Mensagens em HTML5 formatado

Agendamento

npm scripts

Execução manual ou via PM2/cron

// lógica central

## Motor de análise (Analyzer)

O Analyzer aplica regras em cascata ao título e à descrição de cada vaga. A aprovação exige que *todos* os critérios sejam satisfeitos; qualquer falha rejeita a vaga imediatamente.

✅ Front-end aprovado

Vue.js Nuxt React Next.js TypeScript

✅ Back-end aprovado

Java Spring Boot Node.js Express AdonisJS

🚫 Senioridade rejeitada

Pleno Sênior Sr. Tech Lead Arquiteto Especialista

⛔ Stacks fora do escopo

Python .NET / C# PHP C++ Salesforce Ruby

### Blacklist de empresas

Plataformas de recrutamento e "body shops" são removidas antes da análise de conteúdo, evitando desperdício de processamento:

BairesDev Turing Jobbol Revelo TopTal Anywhere.club Lemon.io

### Nível de entrada permitido

Júnior Jr. Estágio Estagiário Trainee Entry-level

// código-fonte

## Estrutura do projeto

```
vagas-hub/
├── prisma/
│   └── schema.prisma        # Schema SQLite + modelos Job e ExecutionLog
├── src/
│   ├── adapters/
│   │   └── linkedin-native.adapter.ts  # Scraper Axios/Cheerio com paginação e anti-spam
│   ├── analyzer/
│   │   └── index.ts             # Motor de regras: safeRegex, filtros de stack/senioridade
│   ├── bot/
│   │   └── telegram.ts          # Integração com Bot API do Telegram (HTML mode)
│   ├── database/
│   │   ├── client.ts            # Instância singleton do PrismaClient
│   │   └── job.repository.ts    # CRUD de vagas e verificação de duplicatas
│   ├── scheduler/
│   │   └── index.ts             # Orquestrador: coleta → filtra → analisa → persiste → notifica
│   └── index.ts                 # Entry point do worker
├── .env                         # Variáveis de ambiente (não versionar)
├── package.json
└── README.md
```

// banco de dados

## Modelagem (SQLite)

### Tabela `Job`

| Campo | Tipo | Descrição |
| --- | --- | --- |
| id PK | String (UUID) | Identificador único interno gerado pelo Prisma |
| externalJobId | String | ID original da vaga na plataforma (usado para deduplicação) |
| platform | String | Plataforma de origem — ex: `LINKEDIN` |
| title | String | Título completo do cargo |
| company | String | Razão social ou nome fantasia da empresa |
| location | String | Cidade/estado ou `Remoto` |
| jobUrl | String | URL direta para a vaga na plataforma de origem |
| matchedKeywords | String\[\] | Tecnologias identificadas pelo Analyzer (ex: `["Java","Spring"]`) |
| status | String | Estado do fluxo: `NEW` → `SENT` |
| postedAt | DateTime | Data de publicação original extraída do LinkedIn |
| createdAt | DateTime | Timestamp de inserção no banco local |

### Tabela `ExecutionLog`

Registra cada execução do worker para monitoramento de saúde e rastreabilidade de erros.

| Campo | Tipo | Descrição |
| --- | --- | --- |
| id PK | Int | Autoincremento |
| startedAt | DateTime | Início da execução |
| finishedAt | DateTime? | Término (nulo se ainda em andamento) |
| jobsFound | Int | Total de vagas coletadas no ciclo |
| jobsSent | Int | Vagas novas enviadas ao Telegram |
| error | String? | Mensagem de erro, se houver |

// instalação

## Como executar

1

Clone o repositório

```
git clone https://github.com/seu-usuario/vagas-hub.git
cd vagas-hub
```

2

Instale as dependências

```
npm install
```

3

Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz. Veja a tabela de configuração abaixo para detalhes de cada variável.

```
cp .env.example .env
# edite .env com suas credenciais
```

4

Sincronize o banco de dados

Cria o arquivo `vagas.db` e aplica o schema do Prisma.

```
npm run db:push
```

5

Execute o worker

Para um ciclo único de teste:

```
npm run worker:run-once
```

Para execução contínua via PM2:

```
pm2 start npm --name "vagas-hub" -- run worker:start
pm2 save
```

// configuração

## Variáveis de ambiente (`.env`)

| Variável | Obrigatório | Descrição e exemplo |
| --- | --- | --- |
| DATABASE_URL | req | Caminho para o banco SQLite file:./vagas.db |
| TELEGRAM_BOT_TOKEN | req | Token do bot obtido via @BotFather no Telegram 123456789:AAHx... |
| TELEGRAM_CHAT_ID | req | ID do canal ou grupo onde as vagas serão enviadas -1001234567890 |
| LINKEDIN_SEARCH_KEYWORDS | opt | Palavras-chave customizadas para a query do LinkedIn Java Junior OR React Junior OR Vue Junior |
| LINKEDIN_GEO_ID | opt | ID geográfico do LinkedIn para filtrar por região 106057199 (Brasil) |
| MAX_PAGES | opt | Número máximo de páginas de resultados a coletar (padrão: 3) 5 |
| NODE_ENV | opt | Ambiente de execução development \| production |

💡

Para encontrar o **Chat ID** do seu canal, adicione o bot como administrador e acesse `https://api.telegram.org/bot<TOKEN>/getUpdates` após enviar uma mensagem no canal.

// evolução

## Roadmap

### Concluído

✓

Scraping nativo gratuito com Axios + Cheerio

✓

Suporte multi-stack: Front-end (Vue/React/TS) e Back-end (Java/Node)

✓

Blacklist de empresas e paginação profunda

✓

Deduplicação via SQLite (evita reenvio da mesma vaga)

✓

Notificações formatadas em HTML no Telegram

✓

ExecutionLog para rastreabilidade de erros e saúde do worker

### Planejado

Automação periódica via PM2 + Cron Job

Executar o worker automaticamente a cada N horas sem intervenção manual

IA no Analyzer: substituir heurística por LLM (GPT-4o Mini)

Análise semântica para melhor precisão na triagem de descrições longas

Expansão para Gupy e Indeed

Novos adapters seguindo a mesma interface do linkedin-native.adapter.ts

Painel administrativo web

Interface para visualizar vagas salvas, gerenciar blacklists e ver métricas de execução

Filtros avançados configuráveis

Exclusão por faixa salarial mínima, modelo de trabalho e empresas específicas via .env ou painel

Desenvolvido para automatizar a busca de oportunidades em TI nível Júnior no mercado brasileiro.

Node.js TypeScript Prisma SQLite Telegram