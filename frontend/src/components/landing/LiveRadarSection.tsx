'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { JobDTO } from '@/lib/types';
import { relativeTime, sourceDomain } from '@/lib/format';
import { Reveal, staggerContainerVariants, staggerItemVariants } from './Reveal';

interface LiveRadarSectionProps {
  initialJobs?: JobDTO[];
}

interface RadarJobCardData {
  id: string;
  level: string;
  verifiedTime: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  tags: string[];
  tagCategory: string;
  bottomTag: string;
  jobUrl: string;
}

const FALLBACK_RADAR_JOBS: RadarJobCardData[] = [
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

function detectLevel(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('estágio') || t.includes('estagio') || t.includes('intern')) return 'ESTÁGIO';
  if (t.includes('trainee')) return 'TRAINEE';
  if (t.includes('júnior') || t.includes('junior') || t.includes('jr')) return 'JÚNIOR';
  if (t.includes('pleno') || t.includes('mid') || t.includes('pl')) return 'PLENO';
  if (t.includes('sênior') || t.includes('senior') || t.includes('sr')) return 'SÊNIOR';
  return 'TECH';
}

function detectTagCategory(title: string, keywords: string[]): string {
  const combined = `${title} ${keywords.join(' ')}`.toLowerCase();
  if (combined.includes('react') || combined.includes('next')) return 'react';
  if (combined.includes('node') || combined.includes('backend') || combined.includes('nest')) return 'node';
  if (combined.includes('java') || combined.includes('spring')) return 'java';
  if (combined.includes('python') || combined.includes('dados') || combined.includes('data')) return 'python';
  if (combined.includes('estagio') || combined.includes('estágio') || combined.includes('intern') || combined.includes('trainee')) return 'estagio';
  return 'other';
}

function mapJobToCard(job: JobDTO): RadarJobCardData {
  const level = detectLevel(job.title);
  const tagCategory = detectTagCategory(job.title, job.keywords);
  const domain = sourceDomain(job.jobUrl);
  const timeText = relativeTime(job.postedAt ?? job.createdAt);

  return {
    id: job.id,
    level,
    verifiedTime: `Verificado ${timeText}`,
    title: job.title,
    company: job.company,
    location: job.location || 'Brasil / Remoto',
    salary: job.salary || 'Salário a combinar',
    tags: job.keywords.length > 0 ? job.keywords.slice(0, 4) : ['Tech', level],
    tagCategory,
    bottomTag: `Fonte: ${domain}`,
    jobUrl: job.jobUrl,
  };
}

export function LiveRadarSection({ initialJobs }: LiveRadarSectionProps) {
  const [activeTab, setActiveTab] = useState('all');

  const allCards: RadarJobCardData[] =
    initialJobs && initialJobs.length > 0
      ? initialJobs.map(mapJobToCard)
      : FALLBACK_RADAR_JOBS;

  const filteredJobs = allCards.filter((job) => {
    if (activeTab === 'all') return true;
    return job.tagCategory === activeTab;
  });

  return (
    <section id="radar" className="py-20 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
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
            <span>Radar Ativo • Base Atualizada</span>
          </div>
        </Reveal>

        {/* Abas / Filtros rápidos */}
        <Reveal delay={0.1} className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveTab(tab.id)}
                type="button"
                className={`whitespace-nowrap px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </motion.button>
            );
          })}
        </Reveal>

        {/* Grid de Cards Animados */}
        <AnimatePresence mode="wait">
          {filteredJobs.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500"
            >
              Nenhuma vaga encontrada nesta categoria no momento.{' '}
              <button
                onClick={() => setActiveTab('all')}
                className="text-blue-600 hover:underline font-semibold ml-1 cursor-pointer"
              >
                Ver todas as vagas
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredJobs.slice(0, 9).map((job) => (
                <motion.div
                  key={job.id}
                  variants={staggerItemVariants}
                  whileHover={{
                    y: -4,
                    scale: 1.015,
                    transition: { duration: 0.2 },
                  }}
                  className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/10 transition-all group"
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
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-2">
                      <a
                        href={job.jobUrl}
                        target={job.jobUrl.startsWith('http') ? '_blank' : undefined}
                        rel={job.jobUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {job.title}
                      </a>
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

                    <a
                      href={job.jobUrl}
                      target={job.jobUrl.startsWith('http') ? '_blank' : undefined}
                      rel={job.jobUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="font-semibold text-slate-800 hover:text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Candidatar-se Direto</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Link para catálogo completo com micro-interação */}
        <Reveal delay={0.2} className="mt-10 text-center">
          <motion.div whileHover={{ scale: 1.02 }} className="inline-block">
            <Link
              href="/vagas"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Ver todas as centenas de vagas disponíveis no catálogo &rarr;
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
