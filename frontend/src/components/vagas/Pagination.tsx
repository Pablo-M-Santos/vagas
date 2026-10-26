'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

function pageNumbers(current: number, total: number): Array<number | 'gap'> {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);

  const pages = new Set<number>([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);

  const result: Array<number | 'gap'> = [];
  let previous = 0;

  for (const page of sorted) {
    if (previous && page - previous > 1) result.push('gap');
    result.push(page);
    previous = page;
  }

  return result;
}

export function Pagination({ page, pages, onPageChange }: PaginationProps) {
  if (pages <= 1) return null;

  return (
    <nav className="mt-8 flex items-center justify-center gap-1.5" aria-label="Paginação">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Página anterior"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-slate-600 transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-slate-600"
      >
        <ChevronLeft size={16} aria-hidden />
      </button>

      {pageNumbers(page, pages).map((item, index) =>
        item === 'gap' ? (
          <span key={`gap-${index}`} className="px-1 text-sm text-muted">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            aria-current={item === page ? 'page' : undefined}
            className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors ${
              item === page
                ? 'bg-accent text-white shadow-sm shadow-indigo-500/25'
                : 'border border-line bg-white text-slate-600 hover:border-accent hover:text-accent'
            }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pages}
        aria-label="Próxima página"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-slate-600 transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-slate-600"
      >
        <ChevronRight size={16} aria-hidden />
      </button>
    </nav>
  );
}
