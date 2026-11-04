import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/landing/Hero';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { PipelineSection } from '@/components/landing/PipelineSection';
import { LiveRadarSection } from '@/components/landing/LiveRadarSection';
import { StatsSection } from '@/components/landing/StatsSection';
import { MarketTechRadar } from '@/components/landing/MarketTechRadar';
import { StackSection } from '@/components/landing/StackSection';
import { FaqSection } from '@/components/landing/FaqSection';
import { CallToAction } from '@/components/landing/CallToAction';
import { fetchStats } from '@/lib/jobs-query';
import type { StatsResponse } from '@/lib/types';

// A landing lê o banco dinamicamente a cada requisição
export const dynamic = 'force-dynamic';

async function loadStats(): Promise<StatsResponse> {
  try {
    return await fetchStats();
  } catch (error) {
    console.error('[landing/stats]', error);
    return { totalJobs: 0, totalCompanies: 0, jobsLast7d: 0, topKeywords: [], lastJobAt: null };
  }
}

export default async function Home() {
  const stats = await loadStats();

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Header variant="landing" />
      <main className="flex-1">
        <Hero />
        <ProblemSection />
        <PipelineSection />
        <LiveRadarSection />
        <StatsSection stats={stats} />
        <MarketTechRadar />
        <StackSection />
        <FaqSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
