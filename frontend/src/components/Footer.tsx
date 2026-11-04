import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-100">
          {/* Coluna 1: Marca & Telemetria */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2 font-bold tracking-tight text-slate-900 text-lg">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-white font-mono text-xs">
                DS
              </span>
              <span>DevScout Telemetry</span>
            </div>
            <p className="text-xs text-slate-500 max-w-md leading-relaxed">
              Monitoramento determinístico e autônomo de vagas para Júnior, Estágio e Trainee.
              Varredura constante em ecossistemas de tecnologia, APIs de ATS e pipelines corporativos.
            </p>
            <div className="text-[11px] font-mono text-blue-600 flex items-center gap-1.5 pt-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              TELEMETRIA ATIVA: 42 CLUSTERS DE EXTRAÇÃO LOCAL
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#pipeline" className="hover:text-blue-600 transition-colors">
                  Pipeline Operacional
                </a>
              </li>
              <li>
                <a href="#radar" className="hover:text-blue-600 transition-colors">
                  Radar de Oportunidades
                </a>
              </li>
              <li>
                <a href="#tech-radar" className="hover:text-blue-600 transition-colors">
                  Tech Radar de Requisitos
                </a>
              </li>
              <li>
                <a href="#stack" className="hover:text-blue-600 transition-colors">
                  Arquitetura &amp; Stack
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Comunidade & Código */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              Comunidade &amp; Código
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  Repositório GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  Canal Telegram Alerts
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-blue-600 transition-colors">
                  Documentação Técnica
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-blue-600 transition-colors">
                  Diretrizes de Contribuição
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Rodapé Final */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© 2025-2026 DevScout. Projeto open-source e 100% gratuito voltado para aceleração de carreira técnica.</p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>LATÊNCIA: &lt; 40ms</span>
            <span>PRODUÇÃO: V1.4.2-RELEASE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
