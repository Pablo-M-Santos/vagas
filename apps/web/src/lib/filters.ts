/**
 * Filtros das vagas — módulo puro, seguro para o client (sem Prisma).
 * A API e a UI leem/escrevem os mesmos params, então o estado do filtro
 * vive sempre na URL (/vagas?q=react&company=CI%26T&sort=recent).
 */
import type { SortKey } from './types';

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 50;
export const SORT_KEYS: SortKey[] = ['recent', 'company', 'title'];

export interface JobsQueryInput {
  q?: string;
  company?: string;
  sort: SortKey;
  page: number;
  pageSize: number;
}

function toInt(value: string | null, fallback: number): number {
  if (value === null || value.trim() === '') return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/** Lê e valida os query params da URL (ou da API). Nunca lança. */
export function parseJobsQuery(params: URLSearchParams): JobsQueryInput {
  const sortRaw = params.get('sort');
  const sort: SortKey =
    sortRaw && (SORT_KEYS as string[]).includes(sortRaw) ? (sortRaw as SortKey) : 'recent';

  return {
    q: params.get('q')?.trim() || undefined,
    company: params.get('company')?.trim() || undefined,
    sort,
    page: Math.max(1, toInt(params.get('page'), 1)),
    pageSize: Math.min(
      MAX_PAGE_SIZE,
      Math.max(1, toInt(params.get('pageSize'), DEFAULT_PAGE_SIZE)),
    ),
  };
}

/**
 * Serializa os filtros para a URL omitindo valores padrão — assim
 * `/vagas` e `/vagas?sort=recent` não viram URLs duplicadas.
 */
export function toSearchParams(filters: JobsQueryInput): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.q) params.set('q', filters.q);
  if (filters.company) params.set('company', filters.company);
  if (filters.sort !== 'recent') params.set('sort', filters.sort);
  if (filters.page > 1) params.set('page', String(filters.page));
  if (filters.pageSize !== DEFAULT_PAGE_SIZE) params.set('pageSize', String(filters.pageSize));

  return params;
}

/** Chave de identidade dos filtros (usada como dependência de efeito e para casar com o dado do servidor). */
export function queryKey(filters: JobsQueryInput): string {
  return toSearchParams(filters).toString();
}

/** Lista de filtros ativos (para exibir como chips removíveis). */
export function activeFilters(filters: JobsQueryInput): Array<{
  key: 'q' | 'company' | 'sort';
  label: string;
  value: string;
}> {
  const active: Array<{ key: 'q' | 'company' | 'sort'; label: string; value: string }> = [];

  if (filters.q) active.push({ key: 'q', label: 'Busca', value: filters.q });
  if (filters.company) active.push({ key: 'company', label: 'Empresa', value: filters.company });
  if (filters.sort !== 'recent') active.push({ key: 'sort', label: 'Ordenação', value: filters.sort });

  return active;
}
