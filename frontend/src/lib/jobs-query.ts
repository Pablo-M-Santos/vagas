import { Prisma } from '@prisma/client';
import { prisma } from './db';
import { escapeLike, foldAccents, parseKeywords, toIso } from './format';
import {
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  SORT_KEYS,
  parseJobsQuery,
  type JobsQueryInput,
} from './filters';
import type { CountOption, JobDTO, SortKey, StatsResponse } from './types';

// Reexporta para a API e os testes continuarem importando daqui.
export { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, SORT_KEYS, parseJobsQuery };
export type { JobsQueryInput };/* ------------------------------------------------------------------ *
 * Busca sem acento (puro — coberto pelos testes)
 *
 * O SQLite só faz case-insensitive em ASCII, então a coluna precisa ser
 * "normalizada" (lower + remoção de acentos via replace) antes do LIKE.
 * O parser do SQLite estoura com mais de ~25 `replace` aninhados, por isso
 * a cadeia é dividida em dois níveis usando CTEs (s0 -> s1).
 * ------------------------------------------------------------------ */

/** Pares [acento, substituto] — minúsculas e maiúsculas. */
export const ACCENT_PAIRS: Array<[string, string]> = [
  ['á', 'a'], ['à', 'a'], ['ã', 'a'], ['â', 'a'], ['ä', 'a'],
  ['é', 'e'], ['è', 'e'], ['ê', 'e'], ['ë', 'e'],
  ['í', 'i'], ['ì', 'i'], ['î', 'i'], ['ï', 'i'],
  ['ó', 'o'], ['ò', 'o'], ['õ', 'o'], ['ô', 'o'], ['ö', 'o'],
  ['ú', 'u'], ['ù', 'u'], ['û', 'u'], ['ü', 'u'],
  ['ç', 'c'], ['ñ', 'n'],
  ['Á', 'a'], ['À', 'a'], ['Ã', 'a'], ['Â', 'a'], ['Ä', 'a'],
  ['É', 'e'], ['È', 'e'], ['Ê', 'e'], ['Ë', 'e'],
  ['Í', 'i'], ['Ì', 'i'], ['Î', 'i'], ['Ï', 'i'],
  ['Ó', 'o'], ['Ò', 'o'], ['Õ', 'o'], ['Ô', 'o'], ['Ö', 'o'],
  ['Ú', 'u'], ['Ù', 'u'], ['Û', 'u'], ['Ü', 'u'],
  ['Ç', 'c'], ['Ñ', 'n'],
];

/** Teto empiricamente testado no SQLite embutido do Prisma: 25 ok, 30 falha. */
export const MAX_FOLD_DEPTH = 25;

/** Campo pesquisável: título + empresa + descrição, já em minúsculas. */
export const FOLD_SOURCE = `lower(title || ' ' || company || ' ' || description)`;

/** Cadeia de `replace()` — só texto fixo (nomes de coluna/constantes), nunca input do usuário. */
export function foldChain(expression: string, pairs: Array<[string, string]>): string {
  return pairs.reduce((acc, [from, to]) => `replace(${acc},'${from}','${to}')`, expression);
}

export function splitPairs(
  pairs: Array<[string, string]>,
): [Array<[string, string]>, Array<[string, string]>] {
  const half = Math.ceil(pairs.length / 2);
  return [pairs.slice(0, half), pairs.slice(half)];
}

/** CTE de normalização: `s0._f0` (passe 1) -> `s1._f1` (passe 2). */
export function buildFoldCte(): Prisma.Sql {
  const [first, second] = splitPairs(ACCENT_PAIRS);

  return Prisma.sql`WITH s0 AS (
    SELECT *, ${Prisma.raw(foldChain(FOLD_SOURCE, first))} AS _f0
    FROM Job
  ), s1 AS (
    SELECT *, ${Prisma.raw(foldChain('_f0', second))} AS _f1
    FROM s0
  )`;
}

/**
 * De onde a query lê: com `q` usamos a coluna normalizada (s1);
 * sem `q` lemos a tabela direto, sem pagar o custo da normalização.
 */
export function buildSource(normalize: boolean): Prisma.Sql {
  return normalize
    ? Prisma.sql`${buildFoldCte()} SELECT * FROM s1`
    : Prisma.sql`SELECT * FROM Job`;
}

/** Mesma lógica de `buildSource`, só que já com o `COUNT(*)` no SELECT. */
export function buildCountSource(normalize: boolean): Prisma.Sql {
  return normalize
    ? Prisma.sql`${buildFoldCte()} SELECT COUNT(*) AS total FROM s1`
    : Prisma.sql`SELECT COUNT(*) AS total FROM Job`;
}

const SORT_SQL: Record<SortKey, Prisma.Sql> = {
  recent: Prisma.sql`COALESCE(postedAt, createdAt) DESC, id DESC`,
  company: Prisma.sql`company COLLATE NOCASE ASC, COALESCE(postedAt, createdAt) DESC`,
  title: Prisma.sql`title COLLATE NOCASE ASC, id DESC`,
};

/**
 * Monta o WHERE dinâmico. Valores entram sempre como parâmetros (?),
 * nunca interpolados no texto do SQL.
 */
export function buildJobsWhere(input: Pick<JobsQueryInput, 'q' | 'company'>): Prisma.Sql {
  const conditions: Prisma.Sql[] = [];

  if (input.q) {
    const pattern = `%${escapeLike(foldAccents(input.q))}%`;
    // ESCAPE como parâmetro: o SQLite exige uma string de exatamente 1 caractere.
    conditions.push(Prisma.sql`_f1 LIKE ${pattern} ESCAPE ${'\\'}`);
  }

  if (input.company) {
    conditions.push(Prisma.sql`company = ${input.company}`);
  }

  if (conditions.length === 0) return Prisma.empty;
  return Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}`;
}

export function buildJobsSql(input: JobsQueryInput): Prisma.Sql {
  const where = buildJobsWhere(input);
  const offset = (input.page - 1) * input.pageSize;

  return Prisma.sql`${buildSource(Boolean(input.q))}
    ${where}
    ORDER BY ${SORT_SQL[input.sort]}
    LIMIT ${input.pageSize} OFFSET ${offset}
  `;
}

export function buildCountSql(input: Pick<JobsQueryInput, 'q' | 'company'>): Prisma.Sql {
  const where = buildJobsWhere(input);
  return Prisma.sql`${buildCountSource(Boolean(input.q))} ${where}`;
}

/* ------------------------------------------------------------------ *
 * Consultas (IO)
 * ------------------------------------------------------------------ */

interface JobRow {
  id: string;
  title: string;
  company: string;
  location: string | null;
  jobUrl: string;
  description: string;
  matchedKeywords: string;
  platform: string;
  postedAt: string | number | null;
  createdAt: string | number;
}

export function mapJobRow(row: JobRow): JobDTO {
  return {
    id: row.id,
    title: row.title,
    company: row.company,
    location: row.location,
    salary: null,
    jobUrl: row.jobUrl,
    keywords: parseKeywords(row.matchedKeywords),
    platform: row.platform,
    postedAt: toIso(row.postedAt),
    createdAt: toIso(row.createdAt) ?? new Date().toISOString(),
  };
}

function toCount(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export async function fetchJobsPage(input: JobsQueryInput): Promise<{
  jobs: JobDTO[];
  total: number;
}> {
  const [countRows, rows] = await Promise.all([
    prisma.$queryRaw<Array<{ total: unknown }>>(buildCountSql(input)),
    prisma.$queryRaw<JobRow[]>(buildJobsSql(input)),
  ]);

  return {
    jobs: rows.map(mapJobRow),
    total: toCount(countRows[0]?.total),
  };
}

export async function fetchCompanyOptions(): Promise<CountOption[]> {
  const rows = await prisma.$queryRaw<Array<{ company: string; count: unknown }>>(
    Prisma.sql`
      SELECT company, COUNT(*) AS count
      FROM Job
      GROUP BY company
      ORDER BY count DESC, company COLLATE NOCASE ASC
    `,
  );

  return rows.map((r) => ({ value: r.company, count: toCount(r.count) }));
}

export async function fetchStats(): Promise<StatsResponse> {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [summary, keywordRows, lastJob] = await Promise.all([
    prisma.$queryRaw<Array<{ total: unknown; companies: unknown; recent: unknown }>>(
      Prisma.sql`
        SELECT
          COUNT(*) AS total,
          COUNT(DISTINCT company) AS companies,
          SUM(CASE WHEN createdAt >= ${sevenDaysAgo} THEN 1 ELSE 0 END) AS recent
        FROM Job
      `,
    ),
    prisma.$queryRaw<Array<{ matchedKeywords: string }>>(
      Prisma.sql`SELECT matchedKeywords FROM Job`,
    ),
    prisma.$queryRaw<Array<{ createdAt: string | number }>>(
      Prisma.sql`SELECT createdAt FROM Job ORDER BY createdAt DESC LIMIT 1`,
    ),
  ]);

  const totals = summary[0] ?? { total: 0, companies: 0, recent: 0 };

  const counter = new Map<string, number>();
  for (const row of keywordRows) {
    for (const keyword of parseKeywords(row.matchedKeywords)) {
      const key = keyword.trim();
      if (!key) continue;
      counter.set(key, (counter.get(key) ?? 0) + 1);
    }
  }

  const topKeywords: CountOption[] = [...counter.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 12)
    .map(([value, count]) => ({ value, count }));

  return {
    totalJobs: toCount(totals.total),
    totalCompanies: toCount(totals.companies),
    jobsLast7d: toCount(totals.recent),
    topKeywords,
    lastJobAt: toIso(lastJob[0]?.createdAt ?? null),
  };
}
