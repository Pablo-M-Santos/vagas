'use client';

import { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onSearch: (query: string) => void;
}

/** Input de busca com debounce de 300ms — só grava na URL depois que você para de digitar. */
export function SearchBar({ value, onSearch }: SearchBarProps) {
  const [text, setText] = useState(value);
  const [prevValue, setPrevValue] = useState(value);
  const onSearchRef = useRef(onSearch);

  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  // Ajuste durante o render (padrão do React para resetar estado em prop):
  // quando a URL muda por fora — chip removido, “limpar tudo” — o rascunho
  // local volta a acompanhar o filtro ativo.
  if (value !== prevValue) {
    setPrevValue(value);
    setText(value);
  }

  useEffect(() => {
    const trimmed = text.trim();
    if (trimmed === value) return;

    const timer = setTimeout(() => onSearchRef.current(trimmed), 300);
    return () => clearTimeout(timer);
  }, [text, value]);

  return (
    <div className="relative w-full min-w-0 flex-1">
      <Search
        size={17}
        aria-hidden
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
      />
      <input
        type="search"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Buscar por cargo, empresa ou tecnologia…"
        aria-label="Buscar vagas"
        className="w-full rounded-full border border-line bg-white py-3 pl-11 pr-11 text-sm text-ink placeholder:text-slate-500 transition-colors focus:border-accent focus:outline-none"
      />
      {text ? (
        <button
          type="button"
          onClick={() => setText('')}
          aria-label="Limpar busca"
          className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <X size={15} aria-hidden />
        </button>
      ) : null}
    </div>
  );
}
