# 🚀 Vagas-Backend: Agregador de Vagas de TI

O **Vagas-Backend** é um sistema automatizado de coleta, análise e notificação de vagas de emprego na área de tecnologia. O foco principal é identificar oportunidades relevantes (Java, React, Vue) e filtrar o ruído de vagas que não correspondem ao perfil desejado.

---

## 🎯 Objetivo do Projeto

O objetivo é centralizar a busca por vagas de TI em múltiplas plataformas, automatizando o processo de triagem e garantindo que o desenvolvedor receba apenas as oportunidades que realmente importam, diretamente em seu dispositivo.

### O que ele resolve?
- **Fim da busca manual:** Não é mais necessário navegar por dezenas de páginas do LinkedIn diariamente.
- **Triagem inteligente:** Filtra automaticamente vagas por senioridade (rejeitando Sênior/Pleno quando o foco é Júnior/Pleno) e por tecnologias específicas.
- **Notificação em tempo real:** Envia as vagas aprovadas para um canal no Telegram assim que são encontradas.
- **Persistência de dados:** Mantém um histórico de vagas para evitar duplicidade de notificações.

---

## 🛠 Estrutura do Projeto

O projeto é construído com **Node.js**, **TypeScript**, **Prisma** e **PostgreSQL**, organizado de forma modular:

- **`src/adapters`**: Camada de integração com plataformas externas (atualmente via Apify para LinkedIn).
- **`src/analyzer`**: Motor de heurística que analisa o título e a descrição das vagas para aprovação ou rejeição.
- **`src/bot`**: Módulo de comunicação com a API do Telegram.
- **`src/database`**: Repositórios Prisma para persistência de dados.
- **`src/scheduler`**: Orquestrador da pipeline que coordena o fluxo entre coleta -> análise -> persistência -> notificação.

---

## 🏗 Estrutura de Dados (Banco de Dados)

Utilizamos o **PostgreSQL** com a seguinte modelagem principal:

### Tabela `Job`
| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | UUID | Identificador único interno. |
| `externalJobId` | String | ID da vaga na plataforma de origem (LinkedIn, etc). |
| `platform` | String | Nome da plataforma (ex: `LINKEDIN`). |
| `title` | String | Título da oportunidade. |
| `company` | String | Empresa contratante. |
| `location` | String | Localização (ou Remoto). |
| `jobUrl` | String | Link direto para a vaga. |
| `matchedKeywords`| String[] | Lista de tecnologias identificadas na vaga. |
| `status` | String | Estado da vaga (ex: `NEW`, `SENT`). |
| `postedAt` | DateTime | Data de publicação original. |

### Tabela `ExecutionLog`
Responsável por monitorar a saúde do worker, registrando o horário de início, fim, quantidade de vagas encontradas e possíveis erros.

---

## ✅ Melhorias e Roadmap

### Já Implementado
- [x] Integração corrigida com Apify (LinkedIn Actor).
- [x] Filtro de trabalho remoto (`f_WA=1`) otimizado.
- [x] Análise por palavras-chave (Junior, Java, Vue, React).
- [x] Sistema de deduplicação (não notifica a mesma vaga duas vezes).
- [x] Notificação via Telegram em formato HTML.

### Próximos Passos
- [ ] **IA no Analyzer:** Substituir heurística por análise semântica via LLM (GPT-4o/Mini) para maior precisão.
- [ ] **Novas Plataformas:** Adicionar suporte para Gupy, Indeed e Glassdoor.
- [ ] **Painel Administrativo:** Interface Web para visualizar as vagas salvas e gerenciar filtros.
- [ ] **Filtros Avançados:** Exclusão baseada em faixas salariais ou empresas específicas.

---

## 🚀 Como Rodar

1. **Configurar variáveis:** Crie um arquivo `.env` com `DATABASE_URL`, `APIFY_API_TOKEN`, `TELEGRAM_BOT_TOKEN` e `TELEGRAM_CHAT_ID`.
2. **Instalar dependências:** `npm install`
3. **Sincronizar Banco:** `npm run db:push`
4. **Executar:** `npm run worker:run-once`

---

Desenvolvido para automatizar o sucesso na carreira de TI. 🚀
