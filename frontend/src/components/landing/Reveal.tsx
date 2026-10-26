'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

/**
 * Entrada suave ao entrar na viewport — implementada com IntersectionObserver
 * puro (sem biblioteca de animação) para manter o JS da landing enxuto.
 *
 * O HTML do servidor já nasce visível (bom para SEO/LCP); só escondemos o
 * elemento quando ele está fora da tela e podemos animá-lo depois.
 */
export function Reveal({ children, delay = 0, y = 20, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alreadyVisible = element.getBoundingClientRect().top < window.innerHeight * 0.92;

    if (reduced || alreadyVisible || typeof IntersectionObserver === 'undefined') return;

    // Esconde sem transição para não animar a "saída"…
    element.style.transition = 'none';
    element.style.opacity = '0';
    element.style.transform = `translateY(${y}px)`;
    void element.offsetHeight; // força reflow

    element.style.transition = `opacity 0.55s ${EASE}, transform 0.55s ${EASE}`;
    element.style.transitionDelay = `${delay}s`;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        element.style.opacity = '1';
        element.style.transform = 'none';
        observer.disconnect();
      },
      { rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
