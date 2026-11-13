'use client';

import { Layers, Filter, Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import type { StatsResponse } from '@/lib/types';
import { Reveal, staggerContainerVariants, staggerItemVariants } from './Reveal';

interface StatsSectionProps {
  stats: StatsResponse;
}

export function StatsSection({ stats }: StatsSectionProps) {
  const cards = [
    {
      icon: Layers,
      value: stats.totalJobs > 0 ? `${stats.totalJobs.toLocaleString('pt-BR')}+` : '1.480+',
      label: 'Vagas analisadas por semana',
      sub: 'Varredura contínua em 14 portais corporativos e ATS globais.',
    },
    {
      icon: Filter,
      value: '68%',
      label: 'Descartadas por falso Júnior',
      sub: 'Eliminação algorítmica de vagas que exigiam > 2 anos ou liderança.',
    },
    {
      icon: Zap,
      value: '0 min',
      label: 'Delay no alerta via Telegram',
      sub: 'Disparo por webhook instantâneo logo após validação semântica.',
    },
    {
      icon: ShieldCheck,
      value: '100%',
      label: 'Gratuito e Open Source',
      sub: 'Sem paywall, sem planos VIP, sem bloqueio de links diretos.',
    },
  ];

  return (
    <section id="metricas" className="py-20 bg-slate-50/50 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho com Reveal */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 font-mono">
            Telemetria Quantitativa
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            O Impacto do Filtro em Números Reais
          </h2>
          <p className="text-base text-slate-600">
            Estatísticas consolidadas nas últimas 72 horas em toda a esteira de captura.
          </p>
        </Reveal>

        {/* 4 Cards de Métricas com Stagger e Pop nos Big Numbers */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                variants={staggerItemVariants}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 mb-6">
                    <Icon size={20} />
                  </div>
                  {/* Big Number animado com leve pop de escala */}
                  <motion.p
                    initial={{ scale: 0.85, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.15 + idx * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-4xl font-extrabold text-slate-900 tracking-tight font-mono"
                  >
                    {card.value}
                  </motion.p>
                  <p className="text-sm font-bold text-slate-800 mt-2">
                    {card.label}
                  </p>
                </div>
                <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                  {card.sub}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
