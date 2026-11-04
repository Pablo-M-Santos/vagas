'use client';

import Link from 'next/link';
import { Send, ArrowRight, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

export function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-blue-50/20 to-white border-b border-slate-100">
      <Reveal className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-700 font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse-subtle" />
          <span>ZERO SPAM. ZERO PAYWALLS. 100% CÓDIGO ABERTO.</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl max-w-3xl mx-auto leading-tight">
          Pare de perder tempo com vagas falsas. Conecte-se ao DevScout agora.
        </h2>

        {/* Subtitle */}
        <p className="text-base text-slate-600 max-w-2xl mx-auto">
          Entre no canal do Telegram para receber alertas instantâneos ou acerte o
          filtro perfeito no nosso Hub em tempo real.
        </p>

        {/* Ações com micro-interações de Hover e Tap */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/25 transition-all hover:bg-blue-700"
            >
              <Send size={16} />
              <span>Entrar no Canal do Telegram</span>
              <ArrowRight size={15} />
            </a>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/vagas"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              <LayoutGrid size={16} className="text-blue-600" />
              <span>Abrir Painel de Vagas</span>
            </Link>
          </motion.div>
        </div>

        {/* Micro info */}
        <div className="pt-4 flex items-center justify-center gap-4 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Cluster operacional 24/7
          </span>
          <span>•</span>
          <span>Sem necessidade de cadastro prévio</span>
        </div>
      </Reveal>
    </section>
  );
}
