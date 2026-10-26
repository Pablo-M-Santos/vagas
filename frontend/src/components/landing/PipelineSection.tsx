'use client';

import { Database, Filter, ScanSearch, Send, ShieldCheck } from 'lucide-react';
import { Reveal } from './Reveal';

const STEPS = [
  {
    icon: ScanSearch,
    title: 'Scraping',
    detail: 'Axios + Cheerio nas páginas públicas, com paginação e filtros de data.',
    tone: 'bg-sky-50 text-sky-600 border-sky-200',
  },
  {
    icon: ShieldCheck,
    title: 'Anti-spam',
    detail: 'Blacklist de consultorias e plataformas de recrutamento.',
    tone: 'bg-rose-50 text-rose-600 border-rose-200',
  },
  {
    icon: Filter,
    title: 'Analyzer',
    detail: 'Heurística de senioridade e stack: só nível de entrada passa.',
    tone: 'bg-amber-50 text-amber-600 border-amber-200',
  },
  {
    icon: Database,
    title: 'Deduplicação',
    detail: 'SQLite + Prisma guardam o histórico e impedem reenvio.',
    tone: 'bg-violet-50 text-violet-600 border-violet-200',
  },
  {
    icon: Send,
    title: 'Notificação',
    detail: 'A vaga aprovada vira card aqui no site e alerta no Telegram.',
    tone: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
];

export function PipelineSection() {
  return (
    <section id="pipeline" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {'// arquitetura'}
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Cinco etapas entre o LinkedIn e a sua lista de vagas
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Uma falha em qualquer etapa fica registrada no log de execuções sem derrubar o
            processo inteiro.
          </p>
        </Reveal>

        <ol className="mt-10 grid gap-4 md:grid-cols-5">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="h-full">
                <Reveal
                  delay={index * 0.08}
                  className="relative h-full rounded-xl border border-line bg-white p-5 shadow-sm"
                >
                  <span
                    className={`absolute -top-3 left-5 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-[11px] font-bold ${step.tone.split(' ').slice(1).join(' ')}`}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={`mt-3 flex h-10 w-10 items-center justify-center rounded-lg border ${step.tone}`}
                  >
                    <Icon size={18} aria-hidden />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{step.detail}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <Reveal delay={0.1}>
          <p className="mt-8 rounded-xl border border-indigo-100 bg-accent-soft px-5 py-4 text-sm text-indigo-900">
            <strong className="font-semibold">Zero API paga:</strong> a coleta é feita direto nas
            páginas públicas do LinkedIn, com filtros de data, localização e trabalho remoto.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
