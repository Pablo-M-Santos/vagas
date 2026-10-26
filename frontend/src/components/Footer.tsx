import Link from 'next/link';
import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-white">
            <Zap size={14} strokeWidth={2.5} aria-hidden />
          </span>
          <span className="text-sm font-semibold text-ink">
            Vagas<span className="text-accent">-</span>Hub
          </span>
        </div>

        <p className="text-center text-sm text-muted sm:text-left">
          Vagas de TI júnior e estágio, coletadas automaticamente a cada 2 horas.
        </p>

        <nav className="flex items-center gap-5 text-sm" aria-label="Rodapé">
          <Link href="/" className="text-muted transition-colors hover:text-ink">
            Início
          </Link>
          <Link href="/vagas" className="text-muted transition-colors hover:text-ink">
            Vagas
          </Link>
        </nav>
      </div>
    </footer>
  );
}
