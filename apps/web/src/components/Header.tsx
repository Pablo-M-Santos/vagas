import Link from 'next/link';
import { ArrowLeft, User } from 'lucide-react';

interface HeaderProps {
  variant?: 'landing' | 'jobs';
}

const NAV_LINKS = [
  { href: '#pipeline', label: 'Pipeline' },
  { href: '#radar', label: 'Radar de Vagas' },
  { href: '#metricas', label: 'Métricas' },
  { href: '#tech-radar', label: 'Tech Radar' },
  { href: '#stack', label: 'Stack' },
  { href: '#faq', label: 'FAQ' },
];

export function Header({ variant = 'landing' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo DevScout + Status Badge */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="DevScout — página inicial"
          >
            <div className="flex items-center gap-1.5 font-bold tracking-tight text-slate-900 text-lg">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-white font-mono text-xs">
                DS
              </span>
              <span>Dev<span className="text-blue-600">Scout</span></span>
            </div>
          </Link>

          <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700 font-mono tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse-subtle" />
            SYSTEM ONLINE 24/7
          </div>
        </div>

        {/* Links de navegação */}
        {variant === 'landing' ? (
          <nav className="hidden lg:flex items-center gap-6" aria-label="Seções">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-slate-600 transition-colors hover:text-blue-600 tracking-tight"
              >
                {link.label}
              </a>
            ))}
          </nav>
        ) : (
          <nav className="hidden md:block" aria-label="Navegação">
            <Link
              href="/"
              className="text-xs font-medium text-slate-600 transition-colors hover:text-blue-600"
            >
              Voltar para DevScout
            </Link>
          </nav>
        )}

        {/* Ações à direita */}
        <div className="flex items-center gap-3">
          {variant === 'landing' ? (
            <>
              <Link
                href="/vagas"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
              >
                Acessar Hub de Vagas
              </Link>
              <div
                className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
                title="Usuário"
              >
                <User size={15} />
              </div>
            </>
          ) : (
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-600 hover:text-blue-600"
            >
              <ArrowLeft size={14} />
              Início
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
