'use client';

import { useEffect, useRef, useState } from 'react';
import { Reveal } from './Reveal';
import type { StatsResponse } from '@/lib/types';
import { relativeTime } from '@/lib/format';

/** Conta de 0 ao valor quando o elemento entra na tela (IntersectionObserver puro). */
function Counter({ value, duration = 1200 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') return;

    let frame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const start = performance.now();
        setDisplay(0);

        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
      },
      { rootMargin: '-40px' },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [duration, value]);

  // `null` = SSR/antes da animação: mostramos o valor final direto.
  const shown = display === null ? value : display;

  return <span ref={ref}>{shown.toLocaleString('pt-BR')}</span>;
}

export function StatsSection({ stats }: { stats: StatsResponse }) {
  const items = [
    { label: 'Vagas no banco', value: stats.totalJobs },
    { label: 'Empresas distintas', value: stats.totalCompanies },
    { label: 'Novas nos últimos 7 dias', value: stats.jobsLast7d },
    { label: 'Tecnologias mapeadas', value: stats.topKeywords.length },
  ];

  return (
    <section className="border-y border-line bg-white py-14 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <div key={item.label} className="border-l-2 border-indigo-100 pl-4">
                <p className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  <Counter value={item.value} />
                </p>
                <p className="mt-1 text-sm text-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {stats.topKeywords.length > 0 ? (
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                Mais pedidas:
              </span>
              {stats.topKeywords.slice(0, 8).map((keyword) => (
                <span
                  key={keyword.value}
                  className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium capitalize text-slate-600"
                >
                  {keyword.value} · {keyword.count}
                </span>
              ))}
            </div>
          </Reveal>
        ) : null}

        {stats.lastJobAt ? (
          <p className="mt-6 text-xs text-muted">Última coleta {relativeTime(stats.lastJobAt)}.</p>
        ) : null}
      </div>
    </section>
  );
}
