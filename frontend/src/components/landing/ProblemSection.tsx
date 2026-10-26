'use client';

import { CalendarSearch, CopyX, ShieldAlert, UserRoundX } from 'lucide-react';
import { Reveal } from './Reveal';

const PROBLEMS = [
  {
    icon: CalendarSearch,
    title: 'Busca manual todo santo dia',
    description:
      'Abrir o LinkedIn, rolar resultados, abrir dez abas. O worker faz isso por você, a cada 2 horas.',
  },
  {
    icon: UserRoundX,
    title: 'Vaga sênior disfarçada de júnior',
    description:
      'Anúncio diz "júnior", descrição pede 5 anos de experiência. O analyzer rejeita na triagem.',
  },
  {
    icon: ShieldAlert,
    title: 'Consultorias e body shops',
    description:
      'Blacklist de empresas corta as plataformas de recrutamento antes mesmo da análise de conteúdo.',
  },
  {
    icon: CopyX,
    title: 'A mesma vaga aparecendo de novo',
    description:
      'Histórico local em SQLite garante que cada vaga apareça uma única vez. Zero repetição.',
  },
];

export function ProblemSection() {
  return (
    <section id="problema" className="scroll-mt-24 border-t border-line bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {'// o problema'}
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Procurar vaga no automático cansa. A gente automatiza de verdade.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <Reveal key={problem.title} delay={index * 0.07}>
                <article className="h-full rounded-xl border border-line bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg hover:shadow-slate-300/40">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon size={19} aria-hidden />
                  </span>
                  <h3 className="mt-4 text-[15px] font-semibold text-ink">{problem.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{problem.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
