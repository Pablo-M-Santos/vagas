'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, staggerContainerVariants, staggerItemVariants } from './Reveal';

export function FaqSection() {
  const faqs = [
    {
      q: 'Como o robô descarta vagas sênior disfarçadas de júnior?',
      a: 'Nossa esteira analisa a descrição completa usando regras de NLP e filtros semânticos. Se identificarmos exigência de múltiplos anos de experiência (> 2 anos), domínio de dezenas de ferramentas simultâneas ou termos de liderança técnica, a vaga é sumariamente descartada.',
    },
    {
      q: 'Preciso pagar alguma mensalidade ou fornecer dados de cartão?',
      a: 'Não. O DevScout é 100% gratuito e open-source. Não possuímos planos VIP, paywalls ou cobranças ocultas para acessar vagas ou links de inscrição.',
    },
    {
      q: 'Como funciona o bot de alertas no Telegram?',
      a: 'Assim que os scrapers encontram e validam uma nova oportunidade compatível, uma mensagem é disparada instantaneamente para o canal público com cargo, empresa, modalidade e link direto de candidatura.',
    },
    {
      q: 'O DevScout armazena meus dados pessoais ou currículo?',
      a: 'Nenhum dado pessoal seu é coletado ou retido. Nós somos apenas uma ferramenta agregadora e purificadora de vagas. As candidaturas ocorrem 100% nos próprios portais oficiais das empresas (Gupy, Lever, Greenhouse, etc.).',
    },
    {
      q: 'Posso contribuir com o código ou sugerir novos portais de scraping?',
      a: 'Com certeza! O projeto tem código aberto no GitHub. Pull requests, issues com sugestões de novas fontes de scraping ou melhorias no algoritmo de filtro são muito bem-vindos.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 font-mono">
            Transparência Técnica
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Perguntas Frequentes
          </h2>
          <p className="text-base text-slate-600">
            Tudo o que você precisa saber sobre a metodologia, privacidade e gratuidade do DevScout.
          </p>
        </Reveal>

        {/* Accordion com Stagger Reveal e Animação suave de abertura */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-3"
        >
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                variants={staggerItemVariants}
                className="rounded-xl border border-slate-200 bg-white transition-colors overflow-hidden hover:border-slate-300"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-slate-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-5 sm:px-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
