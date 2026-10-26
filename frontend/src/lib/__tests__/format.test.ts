import { describe, expect, it } from 'vitest';
import {
  escapeLike,
  foldAccents,
  parseKeywords,
  relativeTime,
  sourceDomain,
  toIso,
  truncate,
} from '../format';

describe('parseKeywords', () => {
  it('converte o CSV do banco em array limpo', () => {
    expect(parseKeywords('react, nodejs , ,typescript')).toEqual([
      'react',
      'nodejs',
      'typescript',
    ]);
  });

  it('lida com valores vazios', () => {
    expect(parseKeywords(null)).toEqual([]);
    expect(parseKeywords(undefined)).toEqual([]);
    expect(parseKeywords('')).toEqual([]);
    expect(parseKeywords('  ')).toEqual([]);
  });
});

describe('foldAccents', () => {
  it('remove acentos e baixa a caixa', () => {
    expect(foldAccents('Estágio')).toBe('estagio');
    expect(foldAccents('Júnior')).toBe('junior');
    expect(foldAccents('Cobrança')).toBe('cobranca');
    expect(foldAccents('  Full-Stack  ')).toBe('full-stack');
  });

  it('é idempotente', () => {
    const once = foldAccents('Desenvolvedor(a) Ômega');
    expect(foldAccents(once)).toBe(once);
  });
});

describe('escapeLike', () => {
  it('escapa os curingas do LIKE', () => {
    expect(escapeLike('100%_a\\b')).toBe('100\\%\\_a\\\\b');
  });

  it('não altera texto comum', () => {
    expect(escapeLike('react junior')).toBe('react junior');
  });
});

describe('relativeTime', () => {
  const now = new Date('2026-01-10T12:00:00.000Z');

  it('formata faixas de tempo', () => {
    expect(relativeTime('2026-01-10T11:59:40.000Z', now)).toBe('agora mesmo');
    expect(relativeTime('2026-01-10T11:30:00.000Z', now)).toBe('há 30 min');
    expect(relativeTime('2026-01-10T09:00:00.000Z', now)).toBe('há 3h');
    expect(relativeTime('2026-01-09T12:00:00.000Z', now)).toBe('ontem');
    expect(relativeTime('2026-01-02T12:00:00.000Z', now)).toBe('há 8 dias');
  });

  it('não quebra com data inválida', () => {
    expect(relativeTime(null, now)).toBe('data desconhecida');
    expect(relativeTime('não é data', now)).toBe('data desconhecida');
  });
});

describe('sourceDomain', () => {
  it('extrai o domínio sem www', () => {
    expect(sourceDomain('https://br.linkedin.com/jobs/view/123')).toBe('br.linkedin.com');
    expect(sourceDomain('https://www.gupy.io/job/1')).toBe('gupy.io');
  });

  it('cai para um texto seguro em URL inválida', () => {
    expect(sourceDomain('url-invalida')).toBe('link externo');
  });
});

describe('toIso', () => {
  it('normaliza string, número (epoch) e Date', () => {
    expect(toIso('2026-01-01T00:00:00.000Z')).toBe('2026-01-01T00:00:00.000Z');
    expect(toIso(1767225600000)).toBe('2026-01-01T00:00:00.000Z');
    expect(toIso(new Date('2026-01-01T00:00:00.000Z'))).toBe('2026-01-01T00:00:00.000Z');
    expect(toIso('lixo')).toBeNull();
    expect(toIso(null)).toBeNull();
  });
});

describe('truncate', () => {
  it('respeita o limite cortando em palavra', () => {
    expect(truncate('curto', 10)).toBe('curto');
    expect(truncate('uma frase bem longa aqui', 12)).toBe('uma frase…');
  });
});
