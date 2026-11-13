import { NextRequest, NextResponse } from 'next/server';
import { fetchJobsPage, parseJobsQuery } from '@/lib/jobs-query';
import type { JobsResponse } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const input = parseJobsQuery(request.nextUrl.searchParams);
    const { jobs, total } = await fetchJobsPage(input);

    const payload: JobsResponse = {
      data: jobs,
      meta: {
        total,
        page: input.page,
        pageSize: input.pageSize,
        pages: Math.max(1, Math.ceil(total / input.pageSize)),
      },
    };

    return NextResponse.json(payload, {
      headers: { 'Cache-Control': 'public, max-age=15, stale-while-revalidate=60' },
    });
  } catch (error) {
    console.error('[API /jobs]', error);
    return NextResponse.json({ error: 'Falha ao carregar as vagas.' }, { status: 500 });
  }
}
