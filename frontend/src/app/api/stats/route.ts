import { NextResponse } from 'next/server';
import { fetchStats } from '@/lib/jobs-query';
import type { StatsResponse } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  try {
    const payload: StatsResponse = await fetchStats();

    return NextResponse.json(payload, {
      headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300' },
    });
  } catch (error) {
    console.error('[API /stats]', error);
    return NextResponse.json({ error: 'Falha ao carregar as métricas.' }, { status: 500 });
  }
}
