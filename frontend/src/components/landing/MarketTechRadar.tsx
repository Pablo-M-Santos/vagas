import { TrendingUp, Sparkles } from 'lucide-react';

export function MarketTechRadar() {
  const skills = [
    {
      name: 'TypeScript / Node.js',
      percentage: 84,
      sub: 'Dominante no ecossistema de startups, finanças e produtos digitais.',
    },
    {
      name: 'React / Next.js',
      percentage: 79,
      sub: 'Padrão absoluto para posições frontend e fullstack de entrada.',
    },
    {
      name: 'Docker & Git (Ferramental Base)',
      percentage: 92,
      sub: 'Pré-requisito obrigatório presente na imensa maioria das descrições.',
    },
    {
      name: 'Java / Spring Boot',
      percentage: 65,
      sub: 'Maior volume em bancos, seguradoras e grandes ecossistemas legados.',
    },
    {
      name: 'Python / SQL & Relacionais',
      percentage: 58,
      sub: 'Forte presença em engenharia de dados, automação e backend analítico.',
    },
  ];

  return (
    <section id="tech-radar" className="py-20 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Lado Esquerdo: Headline e Callout */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 font-mono">
              Índice de Mercado
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl leading-tight">
              O que as empresas realmente pedem no primeiro emprego?
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Compilamos os requisitos das vagas júnior aprovadas pelo nosso filtro
              nas últimas semanas. Pare de estudar tecnologias obsoletas e foque no núcleo que contrata.
            </p>

            {/* Insight do Radar Box */}
            <div className="rounded-xl border border-blue-200/90 bg-blue-50/40 p-4 flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 mt-0.5">
                <Sparkles size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Insight do Radar:</h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Saber Git e Docker básico coloca seu currículo à frente de 73% dos candidatos iniciantes.
                </p>
              </div>
            </div>
          </div>

          {/* Lado Direito: Barras de Porcentagem */}
          <div className="lg:col-span-7 space-y-6 bg-slate-50/50 p-6 sm:p-8 rounded-2xl border border-slate-200/80">
            {skills.map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-900 font-mono">{item.name}</span>
                  <span className="text-blue-600 font-mono">{item.percentage}% das vagas</span>
                </div>

                {/* Barra de Progresso */}
                <div className="h-2 w-full bg-slate-200/80 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-500 font-medium">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
