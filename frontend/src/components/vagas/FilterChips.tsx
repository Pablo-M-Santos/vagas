'use client';

import { X } from 'lucide-react';
import { activeFilters, type JobsQueryInput } from '@/lib/filters';

interface FilterChipsProps {
  filters: JobsQueryInput;
  onChange: (patch: Partial<JobsQueryInput>) => void;
  onClear: () => void;
}

const SORT_LABELS: Record<string, string> = {
  recent: 'mais recentes',
  company: 'empresa A-Z',
  title: 'título A-Z',
};

/** Filtros ativos como chips removíveis, com atalho para limpar tudo. */
export function FilterChips({ filters, onChange, onClear }: FilterChipsProps) {
  const active = activeFilters(filters);

  if (active.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {active.map((filter) => (
        <button
          key={filter.key}
          type="button"
          onClick={() => onChange({ [filter.key]: filter.key === 'sort' ? 'recent' : '' })}
          className="group inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:border-accent hover:bg-indigo-100"
        >
          <span className="text-slate-600">{filter.label}:</span>
          <span className="max-w-[14ch] truncate">
            {filter.key === 'sort' ? SORT_LABELS[filter.value] ?? filter.value : filter.value}
          </span>
          <X size={13} aria-hidden className="opacity-60 group-hover:opacity-100" />
          <span className="sr-only">remover filtro</span>
        </button>
      ))}

      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-xs font-semibold text-muted transition-colors hover:text-accent"
      >
        Limpar tudo
      </button>
    </div>
  );
}
