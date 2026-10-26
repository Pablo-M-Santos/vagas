'use client';

import Link from 'next/link';
import { ArrowRight, Bot, Database, Globe, Palette, Server, Sparkles } from 'lucide-react';
import { Reveal } from './Reveal';

const STACK = [
  { icon: Server, name: 'Node.js + TypeScript', detail: 'Worker com strict mode' },
  { icon: Sparkles, name: 'Axios + Cheerio', detail: 'Scraping nativo, sem API paga' },
  { icon: Database, name: 'Prisma + SQLite', detail: 'Deduplicação e histórico' },
  { icon: Bot, name: 'Telegram Bot', detail: 'Alerta formatado em HTML' },
  { icon: Globe, name: 'Next.js', detail: 'Site, filtros e API' },
  { icon: Palette, name: 'Tailwind + Motion', detail: 'Visual leve e animado' },
];

export function StackSection() {
  return (
    <>
      <section id="stack" className="scroll-mt-24 border-t border-line bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              {'// stack'}
            </p>
            <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Simples, sem servidor pago e fácil de rodar em casa
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STACK.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.name} delay={index * 0.06}>
                  <div className="flex items-start gap-4 rounded-xl border border-line bg-background p-5 transition-colors hover:border-indigo-300">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-accent shadow-sm">
                      <Icon size={18} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink">{item.name}</p>
                      <p className="mt-0.5 text-sm text-muted">{item.detail}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent via-indigo-600 to-sky-600 px-6 py-12 text-center shadow-xl shadow-indigo-500/20 sm:px-12 sm:py-16">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_45%)]"
              />
              <h2 className="relative text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Sua próxima vaga está a um clique de distância
              </h2>
              <p className="relative mx-auto mt-3 max-w-xl text-sm leading-relaxed text-indigo-100 sm:text-base">
                Filtre por cargo, empresa e tecnologia, e abra o anúncio completo direto na
                origem. Sem cadastro, sem enrolação.
              </p>
              <div className="relative mt-7">
                <Link
                  href="/vagas"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-accent shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Ver vagas agora
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
