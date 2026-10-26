'use client';

import { useEffect, useRef, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { useJobFilters } from '@/hooks/useJobFilters';
import { useFilterOptions, useJobs, type InitialData } from '@/hooks/useJobs';
import { activeFilters, SORT_KEYS } from '@/lib/filters';
import type { SortKey } from '@/lib/types';
import { SearchBar } from '@/components/vagas/SearchBar';
import { FilterChips } from '@/components/vagas/FilterChips';
import { FilterSidebar } from '@/components/vagas/FilterSidebar';
import { JobList } from '@/components/vagas/JobList';
import { Pagination } from '@/components/vagas/Pagination';

const SORT_LABELS: Record<SortKey, string> = {
  recent: 'Mais recentes',
  company: 'Empresa (A-Z)',
  title: 'Título (A-Z)',
};

function pluralVagas(count: number): string {
  return `${count} ${count === 1 ? 'vaga encontrada' : 'vagas encontradas'}`;
}

export type JobsInitialData = InitialData;

export function JobsView({ initial }: { initial: JobsInitialData }) {
  const { filters, update, goToPage, clear } = useJobFilters();
  const { data, loading, error } = useJobs(filters, initial.jobs);
  const options = useFilterOptions(initial.filters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const resultsRef = useRef<HTMLElement>(null);

  const total = data?.meta.total ?? 0;
  const activeCount = activeFilters(filters).length;

  // Ao trocar de página, volta o foco para o topo da lista.
  useEffect(() => {
    if (filters.page > 1) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [filters.page]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-ink">Vagas de TI</h1>
            <p className="mt-1 text-sm text-muted" aria-live="polite">
              {loading ? 'Buscando vagas…' : pluralVagas(total)}
            </p>
          </div>

          <label className="flex items-center gap-2 text-sm text-muted">
            Ordenar
            <select
              value={filters.sort}
              onChange={(event) => update({ sort: event.target.value as SortKey })}
              className="rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-ink transition-colors focus:border-accent focus:outline-none"
            >
              {SORT_KEYS.map((sort) => (
                <option key={sort} value={sort}>
                  {SORT_LABELS[sort]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <SearchBar value={filters.q ?? ''} onSearch={(query) => update({ q: query })} />

          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-white px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent lg:hidden"
          >
            <SlidersHorizontal size={16} aria-hidden />
            Filtros
            {activeCount > 0 ? (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-white">
                {activeCount}
              </span>
            ) : null}
          </button>
        </div>

        <FilterChips filters={filters} onChange={update} onClear={clear} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className={`${filtersOpen ? 'block' : 'hidden'} lg:block`}>
          <FilterSidebar
            filters={filters}
            companies={options?.companies ?? null}
            onChange={update}
            onClear={clear}
            className="lg:sticky lg:top-24"
          />
        </aside>

        <section ref={resultsRef} className="min-w-0 scroll-mt-24">
          {/* Título invisível mantém a hierarquia de headings quando a
              sidebar de filtros está fechada (mobile). */}
          <h2 className="sr-only">Resultados</h2>
          {error ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-5 py-6 text-sm text-rose-700">
              {error}
            </div>
          ) : (
            <JobList
              jobs={data?.data ?? []}
              loading={loading}
              hasFilters={activeCount > 0}
              onClear={clear}
            />
          )}

          {!error && data ? (
            <Pagination page={data.meta.page} pages={data.meta.pages} onPageChange={goToPage} />
          ) : null}
        </section>
      </div>
    </main>
  );
}
