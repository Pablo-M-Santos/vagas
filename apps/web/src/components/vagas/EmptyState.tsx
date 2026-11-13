import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  hasFilters: boolean;
  onClear: () => void;
}

export function EmptyState({ hasFilters, onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-white px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
        <SearchX size={22} aria-hidden />
      </span>
      <h3 className="mt-4 text-base font-semibold text-ink">
        {hasFilters ? 'Nenhuma vaga com esses filtros' : 'Nenhuma vaga por aqui ainda'}
      </h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted">
        {hasFilters
          ? 'Tente outra palavra-chave, remova um filtro ou limpe tudo para ver a lista completa.'
          : 'O coletor ainda não salvou vagas. Volte em alguns minutos — ele roda a cada 2 horas.'}
      </p>
      {hasFilters ? (
        <button
          type="button"
          onClick={onClear}
          className="mt-5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          Limpar filtros
        </button>
      ) : null}
    </div>
  );
}
