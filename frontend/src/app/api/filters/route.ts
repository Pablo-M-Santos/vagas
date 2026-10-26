import { NextResponse } from 'next/server';
import { fetchCompanyOptions } from '@/lib/jobs-query';
import type { FiltersResponse } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  try {
    const companies = await fetchCompanyOptions();

    const payload: FiltersResponse = {
      companies,
      total: companies.reduce((sum, c) => sum + c.count, 0),
    };

    return NextResponse.json(payload, {
      headers: { 'Cache-Control': 'public, max-age=30, stale-while-revalidate=120' },
    });
  } catch (error) {
    console.error('[API /filters]', error);
    return NextResponse.json({ error: 'Falha ao carregar os filtros.' }, { status: 500 });
  }
}
