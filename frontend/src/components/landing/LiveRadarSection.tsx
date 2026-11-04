'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Radio } from 'lucide-react';
import type { JobDTO } from '@/lib/types';

interface LiveRadarSectionProps {
  initialJobs?: JobDTO[];
}

// Exemplos estáticos fiéis ao Figma caso não haja dados suficientes no banco inicial
const FALLBACK_RADAR_JOBS = [
  {
    id: 'f1',
    level: 'JÚNIOR',
    verifiedTime: 'Verificado há 12 min',
    title: 'Desenvolvedor Frontend Jr',
    company: 'Fintech Alpha',
    location: '100% Remoto',
    salary: 'R$ 4.500 - R$ 5.800',
    tags: ['React', 'Next.js', 'Tailwind', 'TypeScript'],
    tagCategory: 'react',
    bottomTag: '0 Requisitos Tóxicos',
    jobUrl: '/vagas',
  },
  {
    id: 'f2',
    level: 'JÚNIOR',
    verifiedTime: 'Verificado há 28 min',
    title: 'Engenheiro de Software Backend Jr',
    company: 'LogCloud SaaS',
    location: 'Remoto (Brasil)',
    salary: 'R$ 5.000 - R$ 6.200',
    tags: ['Node.js', 'PostgreSQL', 'Prisma', 'Docker'],
    tagCategory: 'node',
    bottomTag: 'ATS: Lever Primário',
    jobUrl: '/vagas',
  },
  {
    id: 'f3',
    level: 'ESTÁGIO',
    verifiedTime: 'Verificado há 45 min',
    title: 'Estágio em Desenvolvimento Fullstack',
    company: 'Veloce Payments',
    location: 'Híbrido (SP - Faria Lima)',
    salary: 'Bolsa R$ 2.600 + Benefícios',
    tags: ['JavaScript', 'React', 'Git', 'SQL Básico'],
    tagCategory: 'estagio',
    bottomTag: '6 Horas / Cursando Superior',
    jobUrl: '/vagas',
  },
  {
    id: 'f4',
    level: 'JÚNIOR',
    verifiedTime: 'Verificado há 1h',
    title: 'Desenvolvedor Java Backend Jr',
    company: 'OmniBank Core',
    location: 'Remoto',
    salary: 'R$ 5.200 - R$ 6.500',
    tags: ['Java 17', 'Spring Boot', 'JPA / Hibernate', 'Kafka'],
    tagCategory: 'java',
    bottomTag: 'Greenhouse API',
    jobUrl: '/vagas',
  },
  {
    id: 'f5',
    level: 'JÚNIOR',
    verifiedTime: 'Verificado há 2h',
    title: 'Analista de Dados / Python Jr',
    company: 'DataMetrics Health',
    location: 'Híbrido (Curitiba)',
    salary: 'R$ 4.200 - R$ 5.000',
    tags: ['Python', 'Pandas', 'SQL Avançado', 'Metabase'],
    tagCategory: 'python',
    bottomTag: 'Match Score: 95%',
    jobUrl: '/vagas',
  },
  {
    id: 'f6',
    level: 'TRAINEE',
    verifiedTime: 'Verificado há 3h',
    title: 'Programa Trainee Engenharia de Software',
    company: 'Grupo Nexus Cloud',
    location: 'Remoto',
    salary: 'R$ 6.000 + PLR',
    tags: ['Lógica / Estruturas', 'Go / Node', 'Linux', 'Cloud Basics'],
    tagCategory: 'estagio',
    bottomTag: '18 Vagas Abertas',
    jobUrl: '/vagas',
  },
];

const FILTER_TABS = [
  { id: 'all', label: '[Todas as Vagas]' },
  { id: 'react', label: 'React / Next.js' },
  { id: 'node', label: 'Node.js / Backend' },
  { id: 'java', label: 'Java / Spring' },
  { id: 'python', label: 'Python / Dados' },
  { id: 'estagio', label: 'Estágio Tech' },
];

export function LiveRadarSection({ initialJobs }: LiveRadarSectionProps) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredJobs = FALLBACK_RADAR_JOBS.filter((job) => {
    if (activeTab === 'all') return true;
    return job.tagCategory === activeTab;
  });

  return (
    <section id="radar" className="py-20 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 font-mono">
              Radar em Execução
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mt-1">
              Oportunidades Filtradas em Tempo Real
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Vagas verificadas diretamente nas fontes primárias das empresas. Zero intermediários e zero taxas.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-blue-700 font-mono bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 self-start md:self-auto">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse-subtle" />
            <span>Sincronizado via WebSocket</span>
          </div>
        </div>

        {/* Abas / Filtros rápidos */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
                className={`whitespace-nowrap px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Grid de Cards (2 colunas ou 3 colunas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div>
                {/* Linha superior: Nível e Tempo */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono font-bold text-[10px] uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/70 px-2 py-0.5 rounded">
                    {job.level}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {job.verifiedTime}
                  </span>
                </div>

                {/* Cargo e Empresa */}
                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {job.company} • <span className="text-slate-700">{job.location}</span>
                </p>

                {/* Salário */}
                <div className="mt-3 inline-block">
                  <span className="text-xs font-bold text-blue-700 font-mono bg-blue-50/60 px-2.5 py-1 rounded border border-blue-100">
                    {job.salary}
                  </span>
                </div>

                {/* Tags de Tecnologias */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {job.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rodapé do Card */}
              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {job.bottomTag}
                </span>

                <Link
                  href="/vagas"
                  className="font-semibold text-slate-800 hover:text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
                >
                  <span>Candidatar-se Direto</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Link para catálogo completo */}
        <div className="mt-10 text-center">
          <Link
            href="/vagas"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Ver todas as centenas de vagas disponíveis no catálogo &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
