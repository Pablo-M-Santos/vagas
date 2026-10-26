'use client';

import { Check, RotateCcw } from 'lucide-react';
import type { CountOption } from '@/lib/types';
import type { JobsQueryInput } from '@/lib/filters';

interface FilterSidebarProps {
  filters: JobsQueryInput;
  companies: CountOption[] | null;
  onChange: (patch: Partial<JobsQueryInput>) => void;
  onClear: () => void;
  className?: string;
}

/**
 * Filtros básicos (decisão do plano: por enquanto busca + empresa + ordenação).
 * O filtro de salário entra quando o campo existir no schema — ver FRONTEND.md Fase 4.
 */
export function FilterSidebar({ filters, companies, onChange, onClear, className }: FilterSidebarProps) {
  const hasActiveFilters = Boolean(filters.q || filters.company || filters.sort !== 'recent');

  return (
    <div className={`rounded-xl border border-line bg-white p-5 shadow-sm ${className ?? ''}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-ink">Filtros</h2>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 text-xs font-semibold text-muted transition-colors hover:text-accent"
          >
            <RotateCcw size={12} aria-hidden />
            Limpar
          </button>
        ) : null}
      </div>

      <div className="mt-5">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Empresa</h3>

        {companies === null ? (
          <ul className="mt-3 space-y-2" aria-hidden>
            {Array.from({ length: 5 }).map((_, index) => (
              <li key={index} className="h-7 animate-pulse rounded-md bg-slate-100" />
            ))}
          </ul>
        ) : (
          <ul className="mt-2 max-h-72 space-y-1 overflow-y-auto pr-1">
            <li>
              <button
                type="button"
                onClick={() => onChange({ company: '' })}
                className={`flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
                  filters.company === ''
                    ? 'bg-accent-soft font-semibold text-accent'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="truncate">Todas</span>
                {filters.company === '' ? <Check size={14} aria-hidden /> : null}
              </button>
            </li>

            {companies.map((company) => {
              const selected = filters.company === company.value;
              return (
                <li key={company.value}>
                  <button
                    type="button"
                    onClick={() => onChange({ company: selected ? '' : company.value })}
                    className={`flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
                      selected
                        ? 'bg-accent-soft font-semibold text-accent'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                    title={company.value}
                  >
                    <span className="truncate">{company.value}</span>
                    <span
                      className={`shrink-0 rounded-full px-1.5 py-0.5 text-[11px] font-medium ${
                        selected ? 'bg-indigo-100 text-accent' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {company.count}
                    </span>
                  </button>
                </li>
              );
            })}

            {companies.length === 0 ? (
              <li className="px-2.5 py-2 text-sm text-muted">Sem empresas cadastradas.</li>
            ) : null}
          </ul>
        )}
      </div>

      <div className="mt-6 border-t border-line pt-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Salário</h3>
        <p className="mt-2 text-xs text-muted">
          Em breve — ainda não coletamos essa informação.
        </p>
      </div>
    </div>
  );
}
