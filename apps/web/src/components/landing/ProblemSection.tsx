'use client';

import { X, Check, AlertCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal, staggerContainerVariants, staggerItemVariants } from './Reveal';

export function ProblemSection() {
  return (
    <section id="problema" className="py-20 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção com Reveal */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 font-mono">
            Diagnóstico do Mercado Tech
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            O Caos da Busca Manual vs. O Algoritmo DevScout
          </h2>
          <p className="text-base text-slate-600">
            Enquanto plataformas tradicionais transformaram a busca em um jogo exaustivo e sem retorno, a
            telemetria autônoma restaura a precisão técnica.
          </p>
        </Reveal>

        {/* Comparativo lado a lado com Stagger Reveal */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {/* Card: Busca Manual Tradicional */}
          <motion.div
            variants={staggerItemVariants}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="rounded-2xl border border-rose-200/80 bg-rose-50/20 p-6 sm:p-8 flex flex-col justify-between transition-colors hover:border-rose-300 hover:shadow-lg hover:shadow-rose-500/5"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">A Busca Manual Tradicional</h3>
                  <p className="text-xs text-rose-600 font-medium">Desperdício de tempo e fadiga mental</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 mt-0.5">
                    <X size={12} strokeWidth={3} />
                  </span>
                  <div>
                    <strong className="text-slate-800 font-semibold">Vagas &quot;Júnior&quot; fraudulentas:</strong> Descrições exigindo 4 a 5 anos de experiência comprovada e liderança técnica.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 mt-0.5">
                    <X size={12} strokeWidth={3} />
                  </span>
                  <div>
                    <strong className="text-slate-800 font-semibold">Feed poluído de spam:</strong> Consultorias republicando o mesmo banco de talentos fantasma toda segunda-feira.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 mt-0.5">
                    <X size={12} strokeWidth={3} />
                  </span>
                  <div>
                    <strong className="text-slate-800 font-semibold">Testes infinitos sem feedback:</strong> Horas preenchendo formulários e testes genéricos sem nunca falar com um dev.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 mt-0.5">
                    <X size={12} strokeWidth={3} />
                  </span>
                  <div>
                    <strong className="text-slate-800 font-semibold">Candidatura tardia:</strong> Oportunidades encontradas dias depois, quando a triagem já atingiu 1.200 currículos.
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-rose-200/60 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>TAXA DE CONVERSÃO: &lt; 0.8%</span>
              <span className="font-semibold text-rose-700">TEMPO GASTO: 18h/semana</span>
            </div>
          </motion.div>

          {/* Card: O Algoritmo DevScout */}
          <motion.div
            variants={staggerItemVariants}
            whileHover={{ y: -4, scale: 1.015, transition: { duration: 0.25 } }}
            className="rounded-2xl border border-blue-200/90 bg-blue-50/20 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10 transition-all"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">O Algoritmo DevScout</h3>
                  <p className="text-xs text-blue-600 font-medium">Triagem determinística e impiedosa</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <div>
                    <strong className="text-slate-800 font-semibold">Expurgo de sênior disfarçado:</strong> Rejeição algorítmica de requisitos de senioridade incompatíveis com nível inicial (&gt; 2 anos).
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <div>
                    <strong className="text-slate-800 font-semibold">Zero intermediários ou taxas:</strong> Apenas links diretos para ATS nativas (Greenhouse, Lever, Workable, Gupy, etc.).
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <div>
                    <strong className="text-slate-800 font-semibold">Deduplicação por assinatura:</strong> O robô gera um hash único da vaga para nunca reenviar oportunidades repetidas.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <div>
                    <strong className="text-slate-800 font-semibold">Alerta em tempo real:</strong> Seja um dos primeiros 10 a se candidatar, quando o recrutador ainda avalia manualmente.
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-blue-200/60 flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="text-blue-700 font-semibold">TAXA DE RELEVÂNCIA: 94%</span>
              <span className="font-semibold text-emerald-600">ZERO HORAS PERDIDAS</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
