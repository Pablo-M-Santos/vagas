'use client';

import { useEffect, useState } from 'react';
import { queryKey, toSearchParams, type JobsQueryInput } from '@/lib/filters';
import type { FiltersResponse, JobsResponse } from '@/lib/types';

interface JobsState {
  data: JobsResponse | null;
  loading: boolean;
  error: string | null;
}

/** Dado já resolvido no servidor (evita tela em branco no primeiro paint). */
export interface InitialData {
  jobs: JobsResponse | null;
  filters: FiltersResponse | null;
}

interface FetchResult {
  key: string;
  data: JobsResponse | null;
  error: string | null;
}

/**
 * Estado das vagas.
 *
 * A rota `/vagas` é um Server Component que consulta o SQLite a cada
 * navegação, então `initialJobs` já vem com os dados dos filtros atuais —
 * nesse caso não há nada a buscar. O fetch da API fica como fallback
 * (servidor fora do ar, ou quando a URL muda sem re-render do servidor).
 */
export function useJobs(filters: JobsQueryInput, initialJobs: JobsResponse | null): JobsState {
  const key = queryKey(filters);
  const [result, setResult] = useState<FetchResult | null>(null);

  useEffect(() => {
    if (initialJobs) return;

    const controller = new AbortController();
    let alive = true;
    const query = toSearchParams(filters).toString();

    fetch(`/api/jobs${query ? `?${query}` : ''}`, {
      signal: controller.signal,
      headers: { accept: 'application/json' },
      cache: 'no-store',
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return (await response.json()) as JobsResponse;
      })
      .then((json) => {
        if (alive) setResult({ key, data: json, error: null });
      })
      .catch((error: unknown) => {
        if (!alive || (error instanceof Error && error.name === 'AbortError')) return;
        setResult({
          key,
          data: null,
          error: 'Não foi possível carregar as vagas. Tente novamente.',
        });
      });

    return () => {
      alive = false;
      controller.abort();
    };
    // `filters` é memoizado por searchParams; `initialJobs` muda junto com
    // ele quando o servidor re-renderiza a rota.
  }, [filters, initialJobs, key]);

  if (initialJobs) return { data: initialJobs, loading: false, error: null };

  if (result && result.key === key) {
    return { data: result.data, loading: false, error: result.error };
  }

  // Filtro novo ainda sem resposta: mostramos o skeleton.
  return { data: null, loading: true, error: null };
}

/** Opções dos selects de filtro (empresas com contagem). */
export function useFilterOptions(initial: FiltersResponse | null): FiltersResponse | null {
  const [fetched, setFetched] = useState<FiltersResponse | null>(null);

  useEffect(() => {
    if (initial) return;

    let alive = true;

    fetch('/api/filters', { headers: { accept: 'application/json' } })
      .then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return (await response.json()) as FiltersResponse;
      })
      .then((json) => {
        if (alive) setFetched(json);
      })
      .catch(() => {
        /* a lista de vagas continua funcional sem os selects */
      });

    return () => {
      alive = false;
    };
  }, [initial]);

  return initial ?? fetched;
}
