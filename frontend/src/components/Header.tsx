import Link from 'next/link';
import { ArrowRight, ArrowLeft, Zap } from 'lucide-react';

interface HeaderProps {
  /** 'jobs' troca o CTA por um link de volta para a home. */
  variant?: 'landing' | 'jobs';
}

const NAV_LINKS = [
  { href: '/#problema', label: 'O problema' },
  { href: '/#pipeline', label: 'Pipeline' },
  { href: '/#stack', label: 'Stack' },
];

export function Header({ variant = 'landing' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2"
          aria-label="Vagas-Hub — página inicial"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white shadow-sm shadow-indigo-500/30 transition-transform duration-300 group-hover:-rotate-6">
            <Zap size={16} strokeWidth={2.5} aria-hidden />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-ink">
            Vagas<span className="text-accent">-</span>Hub
          </span>
        </Link>

        {variant === 'landing' ? (
          <nav className="hidden items-center gap-7 md:flex" aria-label="Seções">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ) : (
          <nav className="hidden md:block" aria-label="Navegação">
            <Link
              href="/"
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              Sobre o projeto
            </Link>
          </nav>
        )}

        {variant === 'landing' ? (
          <Link
            href="/vagas"
            className="group inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-500/25 transition-all duration-300 hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-500/30"
          >
            Ver vagas
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        ) : (
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
              aria-hidden
            />
            Início
          </Link>
        )}
      </div>
    </header>
  );
}
