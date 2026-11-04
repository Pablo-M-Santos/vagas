'use client';

import Link from 'next/link';
import { ArrowRight, Send, Sparkles, ExternalLink } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const heroContentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: 'easeOut',
    },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-slate-50/50 via-white to-white py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Lado Esquerdo: Mensagem e CTAs com animação em cascata */}
          <motion.div
            variants={heroContentVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6"
          >
            {/* Tag / Badge */}
            <motion.div variants={heroItemVariants}>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/90 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse-subtle" />
                <span className="tracking-wide uppercase font-mono text-[10px]">
                  Monitoramento Autônomo 24/7 Ativo
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={heroItemVariants}
              className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-5xl/tight"
            >
              O radar que caça vagas{' '}
              <span className="relative inline-block text-blue-600 underline decoration-blue-300 underline-offset-4">
                Júnior reais
              </span>{' '}
              antes de virarem spam.
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              variants={heroItemVariants}
              className="max-w-xl text-base text-slate-600 leading-relaxed sm:text-lg"
            >
              Varredura contínua, deduplicação inteligente e filtro impiedoso contra
              vagas sênior disfarçadas. 100% gratuito e automatizado para acelerar sua
              entrada no mercado tech.
            </motion.p>

            {/* Botões de Ação com micro-interações */}
            <motion.div variants={heroItemVariants} className="flex flex-wrap items-center gap-3 pt-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/vagas"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-500/25 transition-all hover:bg-blue-700"
                >
                  <span>Explorar Vagas Agora</span>
                  <ArrowRight size={16} />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
                >
                  <Send size={15} className="text-blue-500" />
                  <span>Ver Pipeline no Telegram</span>
                </a>
              </motion.div>
            </motion.div>

            {/* 3 Métricas Rápidas */}
            <motion.div
              variants={heroItemVariants}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 max-w-lg"
            >
              <div>
                <p className="text-2xl font-bold text-slate-900 tracking-tight font-mono">14+</p>
                <p className="text-xs text-slate-500 font-medium">Portais monitorados</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 tracking-tight font-mono">&lt; 3s</p>
                <p className="text-xs text-slate-500 font-medium">Latência de trigger</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 tracking-tight font-mono">0 R$</p>
                <p className="text-xs text-slate-500 font-medium">Acesso irrestrito</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Lado Direito: Terminal Interativo + Card Mockup Flutuante */}
          <div className="lg:col-span-5 relative">
            {/* Terminal Window com fade in e elevação inicial */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl border border-slate-800 bg-[#0d1117] p-4 text-xs font-mono shadow-2xl text-slate-300"
            >
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-[11px] text-slate-400 pl-2">devscout-daemon.sh --stream</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 uppercase tracking-widest font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-subtle" />
                  LIVE TAIL
                </span>
              </div>

              {/* Logs */}
              <div className="space-y-2 text-[11px] leading-relaxed select-none">
                <p className="text-slate-400">
                  <span className="text-blue-400">$</span> systemctl status devscout.service --no-pager
                </p>
                <p className="text-slate-300">
                  <span className="text-blue-400">&gt; [CORE]</span> Cluster de telemetria inicializado:{' '}
                  <span className="text-emerald-400 font-semibold">42 crawlers em execução</span>.
                </p>
                <p className="text-slate-300">
                  <span className="text-purple-400">&gt; [BOT]</span> Scraping 14 portais ativos (Gupy, Greenhouse, Lever, LinkedIn, Kenoby)...
                </p>
                <p className="text-slate-300">
                  <span className="text-rose-400">&gt; [FILTER]</span> 42 falsas vagas júnior descartadas (exigência velada: 4+ anos).
                </p>
                <p className="text-slate-300">
                  <span className="text-blue-400">&gt; [NLP]</span> Parsing de 18 novos payloads concluído com sucesso.
                </p>
                <p className="text-emerald-400 font-semibold">
                  <span>&gt; [MATCH]</span> 3 novas vagas Júnior/Estágio validadas e hash sincronizado!
                </p>
              </div>
            </motion.div>

            {/* Card de Vaga em Destaque com Floating Animation contínua e micro-interação de hover */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: 1,
                y: [0, -8, 0],
              }}
              transition={{
                opacity: { duration: 0.7, delay: 0.45 },
                y: {
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatType: 'mirror',
                },
              }}
              whileHover={{ scale: 1.025, transition: { duration: 0.2 } }}
              className="mt-4 sm:-mt-6 sm:ml-6 rounded-xl border border-blue-200/90 bg-white p-4 shadow-xl ring-1 ring-black/5 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/10 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 font-mono">
                    Júnior Verificado
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">100% Remoto</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 font-mono">
                  <Sparkles size={12} />
                  <span>MATCH 98%</span>
                </div>
              </div>

              <div className="py-2.5">
                <h4 className="text-sm font-bold text-slate-900">Frontend Developer Jr</h4>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <span className="font-semibold text-emerald-600 font-mono">
                    R$ 4.200 - R$ 5.500
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">CLT Full</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pb-3">
                {['React', 'TypeScript', 'Tailwind CSS', 'REST APIs'].map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                <span className="text-slate-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
                  Capturado há 4 min direto da ATS
                </span>
                <Link
                  href="/vagas"
                  className="font-medium text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
                >
                  <span>Ver detalhes</span>
                  <ExternalLink size={11} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
