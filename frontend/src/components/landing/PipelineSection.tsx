export function PipelineSection() {
  const steps = [
    {
      step: '01',
      title: 'Scraping Autônomo',
      desc: 'Varredura contínua de sites de carreiras, feeds de ATS e APIs corporativas a cada 60 segundos.',
      highlight: '> 42 crawlers ativos',
      isPrimary: false,
    },
    {
      step: '02',
      title: 'Anti-Spam & Sanity',
      desc: 'Eliminação imediata de consultorias predatórias, vagas de recrutamento fantasma e links expirados.',
      highlight: '> Filtro de blacklist',
      isPrimary: false,
    },
    {
      step: '03',
      title: 'LLM / NLP Analyzer',
      desc: 'Leitura semântica dos requisitos reais. Se exigir mais de 2 anos ou liderança técnica, a vaga é expurgada.',
      highlight: '> 68% descartadas aqui',
      isPrimary: true, // Destaque azul central no figma
    },
    {
      step: '04',
      title: 'Deduplicação Hash',
      desc: 'Geração de hash unificado de empresa, stack e título para evitar reenvio de vagas já catalogadas.',
      highlight: '> SQLite + Prisma ORM',
      isPrimary: false,
    },
    {
      step: '05',
      title: 'Instant Alert',
      desc: 'Disparo instantâneo no canal prioritário do Telegram e injeção em tempo real no feed web do Hub.',
      highlight: '> Latência < 500ms',
      isPrimary: false,
    },
  ];

  return (
    <section id="pipeline" className="py-20 bg-slate-50/50 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 font-mono">
            Arquitetura de Dados em 5 Etapas
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            A Esteira de Telemetria e Purificação do DevScout
          </h2>
          <p className="text-base text-slate-600">
            Como transformamos milhares de dados brutos e ruidosos em notificações limpas, precisas e acionáveis.
          </p>
        </div>

        {/* 5 Cards da Esteira */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((item) => (
            <div
              key={item.step}
              className={`rounded-xl p-5 flex flex-col justify-between transition-all duration-200 ${
                item.isPrimary
                  ? 'border-2 border-blue-600 bg-white shadow-md shadow-blue-500/5 -translate-y-1'
                  : 'border border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div
                  className={`inline-flex items-center justify-center rounded-lg px-2.5 py-1 text-xs font-bold font-mono mb-4 ${
                    item.isPrimary
                      ? 'bg-blue-600 text-white'
                      : 'border border-blue-200 bg-blue-50 text-blue-700'
                  }`}
                >
                  {item.step}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{item.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[10px] font-mono font-semibold text-blue-600">
                {item.highlight}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
