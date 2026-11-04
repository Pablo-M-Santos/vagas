import { Terminal, Database, Server, Send, Code2 } from 'lucide-react';

export function StackSection() {
  const stackItems = [
    {
      icon: Terminal,
      name: 'Node.js Engine',
      desc: 'Processamento assíncrono para centenas de requisições paralelas sem engasgos de I/O.',
      meta: 'Runtime Assíncrono',
    },
    {
      icon: Database,
      name: 'Prisma ORM',
      desc: 'Tipagem estrita de ponta a ponta e consultas estruturadas de alto desempenho.',
      meta: 'Mapeamento Tipado',
    },
    {
      icon: Server,
      name: 'SQLite Engine',
      desc: 'Armazenamento em arquivo local ultraleve com latência de leitura inferior a 1 milissegundo.',
      meta: 'Zero Infra Overhead',
    },
    {
      icon: Send,
      name: 'Telegram API',
      desc: 'Distribuição massiva por push instantâneo sem filtros algorítmicos de redes sociais.',
      meta: 'Push Instantâneo',
    },
    {
      icon: Code2,
      name: 'Next.js & Tailwind',
      desc: 'Interface estática pré-renderizada para carregamento em frações de segundo no navegador.',
      meta: 'Client-Side Otimizado',
    },
  ];

  return (
    <section id="stack" className="py-20 bg-slate-50/50 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 font-mono">
            Engenharia Sob o Capô
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Arquitetura Leve, Descentralizada e Rápida
          </h2>
          <p className="text-base text-slate-600">
            Construído para rodar em hardware modesto sem depender de serviços em nuvem onerosos.
          </p>
        </div>

        {/* 5 Cards de Arquitetura */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stackItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-sm"
              >
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100 mb-4">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{item.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 text-[10px] font-mono text-slate-400">
                  {item.meta}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
