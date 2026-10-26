import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JobsSkeleton } from '@/components/vagas/JobsSkeleton';
import { parseJobsQuery } from '@/lib/filters';
import { fetchCompanyOptions, fetchJobsPage } from '@/lib/jobs-query';
import type { FiltersResponse, JobsResponse } from '@/lib/types';
import { JobsView, type JobsInitialData } from './JobsView';

export const metadata: Metadata = {
  title: 'Vagas de TI',
  description:
    'Vagas de TI júnior e estágio filtradas automaticamente: busque por cargo, empresa e tecnologia, e abra o anúncio completo na origem.',
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function toUrlSearchParams(sp: Record<string, string | string[] | undefined>): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(sp)) {
    if (typeof value === 'string') params.set(key, value);
    else if (Array.isArray(value) && typeof value[0] === 'string') params.set(key, value[0]);
  }
  return params;
}

/** Consulta o SQLite direto (sem passar pela API) para hidratar a primeira renderização. */
async function loadInitialData(sp: Record<string, string | string[] | undefined>): Promise<JobsInitialData> {
  const input = parseJobsQuery(toUrlSearchParams(sp));

  try {
    const [page, filters] = await Promise.all([
      fetchJobsPage(input),
      fetchCompanyOptions(),
    ]);

    const jobs: JobsResponse = {
      data: page.jobs,
      meta: {
        total: page.total,
        page: input.page,
        pageSize: input.pageSize,
        pages: Math.max(1, Math.ceil(page.total / input.pageSize)),
      },
    };

    const filterOptions: FiltersResponse = {
      companies: filters,
      total: filters.reduce((sum, company) => sum + company.count, 0),
    };

    return { jobs, filters: filterOptions };
  } catch (error) {
    console.error('[vagas/ssr]', error);
    // O client component cai no fetch da API e mostra o erro amigável.
    return { jobs: null, filters: null };
  }
}

function ListFallback() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <JobsSkeleton count={5} />
    </div>
  );
}

export default async function VagasPage({ searchParams }: { searchParams: SearchParams }) {
  const initial = await loadInitialData(await searchParams);

  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="jobs" />
      <Suspense fallback={<ListFallback />}>
        <JobsView initial={initial} />
      </Suspense>
      <Footer />
    </div>
  );
}
