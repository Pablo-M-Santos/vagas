import Link from 'next/link';
import { ArrowRight, Building2, Clock, ExternalLink, MapPin, Sparkles } from 'lucide-react';

const TAGS = ['React', 'TypeScript', 'Next.js', 'Júnior'];

/** Escalonamento da entrada — classes/keyframes em globals.css. */
const step = (seconds: number) => ({ animationDelay: `${seconds}s` });

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* fundo: malha sutil + dois brilhos */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e8eaf3_1px,transparent_1px),linear-gradient(to_bottom,#e8eaf3_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_70%)]" />
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-200/50 blur-3xl" />
        <div className="absolute right-[-6rem] top-40 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-28 lg:pt-24">
        <div>
          <p
            className="hero-in inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1.5 text-xs font-semibold text-accent shadow-sm"
            style={step(0)}
          >
            <Sparkles size={14} aria-hidden />
            Atualizado a cada 2 horas, sem você precisar abrir o LinkedIn
          </p>

          <h1
            className="hero-in mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]"
            style={step(0.08)}
          >
            Pare de caçar vagas.
            <br />
            <span className="bg-gradient-to-r from-accent via-indigo-500 to-sky-500 bg-clip-text text-transparent">
              Deixe o robô caçar por você.
            </span>
          </h1>

          <p
            className="hero-in mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            style={step(0.16)}
          >
            O Vagas-Hub varre as vagas de TI, descarta{' '}
            <strong className="font-semibold text-ink">sênior disfarçado de júnior</strong>,
            consultorias e spam — e te entrega só o que faz sentido para quem está começando.
          </p>

          <div className="hero-in mt-8 flex flex-wrap items-center gap-3" style={step(0.24)}>
            <Link
              href="/vagas"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/30"
            >
              Ver vagas agora
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>

            <a
              href="#pipeline"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Como funciona
            </a>
          </div>

          <dl
            className="hero-in mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-6"
            style={step(0.32)}
          >
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">Foco</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">Júnior, estágio e trainee</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">Custo</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">Scraping 100% gratuito</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">Ruído</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">Filtrado antes de te mostrar</dd>
            </div>
          </dl>
        </div>

        {/* Mock de card flutuante */}
        <div className="hero-card relative mx-auto w-full max-w-md">
          <div className="hero-float rounded-2xl border border-line bg-white p-6 shadow-2xl shadow-slate-300/50">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[15px] font-semibold leading-snug text-ink">
                  Desenvolvedor Front-end Júnior
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                  <Building2 size={14} aria-hidden />
                  Empresa de tecnologia
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  <MapPin size={14} aria-hidden />
                  Remoto · Brasil
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                R$ 4.000
              </span>
            </div>

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {TAGS.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <Clock size={13} aria-hidden />
                há 1 hora
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-accent">
                Abrir vaga
                <ExternalLink size={13} aria-hidden />
              </span>
            </div>
          </div>

          <div
            className="hero-badge absolute -left-4 -top-5 rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink shadow-lg"
            style={step(0.55)}
          >
            🛡 Consultoria removida
          </div>

          <div
            className="hero-badge absolute -bottom-6 -right-3 rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink shadow-lg"
            style={step(0.75)}
          >
            ✅ Vaga analisada
          </div>
        </div>
      </div>
    </section>
  );
}
