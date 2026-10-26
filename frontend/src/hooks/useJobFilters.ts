'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { parseJobsQuery, toSearchParams, type JobsQueryInput } from '@/lib/filters';

/**
 * Estado dos filtros vive na URL: compartilhável, back/forward do
 * navegador funciona e o SSR continua renderizando a primeira página.
 */
export function useJobFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo(() => parseJobsQuery(searchParams), [searchParams]);

  const update = useCallback(
    (patch: Partial<JobsQueryInput>) => {
      const next: JobsQueryInput = { ...filters, ...patch, page: 1 };
      const query = toSearchParams(next).toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [filters, pathname, router],
  );

  const goToPage = useCallback(
    (page: number) => {
      const next: JobsQueryInput = { ...filters, page };
      const query = toSearchParams(next).toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [filters, pathname, router],
  );

  const clear = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  return { filters, update, goToPage, clear };
}
