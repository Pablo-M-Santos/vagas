import { Prisma } from '@prisma/client';
import { describe, expect, it } from 'vitest';
import {
  ACCENT_PAIRS,
  DEFAULT_PAGE_SIZE,
  MAX_FOLD_DEPTH,
  MAX_PAGE_SIZE,
  buildCountSql,
  buildFoldCte,
  buildJobsSql,
  buildJobsWhere,
  foldChain,
  parseJobsQuery,
  splitPairs,
} from '../jobs-query';

const parse = (qs: string) => parseJobsQuery(new URLSearchParams(qs));

describe('parseJobsQuery', () => {
  it('usa padrões quando não há params', () => {
    expect(parse('')).toEqual({
      q: undefined,
      company: undefined,
      sort: 'recent',
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    });
  });

  it('cai no padrão quando o sort é inválido', () => {
    expect(parse('sort=drop%20table').sort).toBe('recent');
    expect(parse('sort=title').sort).toBe('title');
    expect(parse('sort=company').sort).toBe('company');
  });

  it('limita page e pageSize', () => {
    expect(parse('page=0').page).toBe(1);
    expect(parse('page=-9').page).toBe(1);
    expect(parse('page=abc').page).toBe(1);
    expect(parse('pageSize=9999').pageSize).toBe(MAX_PAGE_SIZE);
    expect(parse('pageSize=0').pageSize).toBe(1);
    expect(parse('pageSize=abc').pageSize).toBe(DEFAULT_PAGE_SIZE);
  });

  it('normaliza q e company', () => {
    expect(parse('q=%20%20react%20%20').q).toBe('react');
    expect(parse('company=%20%20').company).toBeUndefined();
  });
});

describe('foldChain / splitPairs', () => {
  it('mantém as duas metades abaixo do limite do SQLite', () => {
    const [first, second] = splitPairs(ACCENT_PAIRS);
    expect(first.length + second.length).toBe(ACCENT_PAIRS.length);
    expect(first.length).toBeLessThanOrEqual(MAX_FOLD_DEPTH);
    expect(second.length).toBeLessThanOrEqual(MAX_FOLD_DEPTH);
  });

  it('gera exatamente um replace por par de acento', () => {
    const chain = foldChain('lower(title)', ACCENT_PAIRS.slice(0, 4));
    expect(chain.match(/replace\(/g)).toHaveLength(4);
    expect(chain).toContain('lower(title)');
  });

  it('contém os acentos do português nos dois casos', () => {
    const flat = ACCENT_PAIRS.flat().join('');
    for (const char of ['á', 'Á', 'ç', 'Ç', 'ê', 'Ê', 'õ', 'Õ']) {
      expect(flat).toContain(char);
    }
  });
});

describe('buildFoldCte', () => {
  it('cria os dois níveis de CTE com a coluna final _f1', () => {
    const sql = buildFoldCte().sql;
    expect(sql).toContain('WITH s0 AS');
    expect(sql).toContain('s1 AS');
    expect(sql).toContain('AS _f0');
    expect(sql).toContain('AS _f1');
    expect(sql).toContain('FROM Job');
    expect(sql).toContain("lower(title || ' ' || company || ' ' || description)");
  });
});

describe('buildJobsWhere', () => {
  it('retorna SQL vazio sem filtros', () => {
    expect(buildJobsWhere({}).sql).toBe('');
    expect(buildJobsWhere({}).values).toHaveLength(0);
  });

  it('parametiza a busca (nunca interpola o input no SQL)', () => {
    const where = buildJobsWhere({ q: "react' OR 1=1 --" });
    expect(where.sql).toContain('_f1 LIKE ? ESCAPE ?');
    expect(where.sql).not.toContain("react' OR 1=1 --");
    // a entrada é normalizada (lowercase + sem acento) antes de virar pattern
    expect(where.values).toEqual(["%react' or 1=1 --%", '\\']);
  });

  it('normaliza acentos e curingas na busca', () => {
    expect(buildJobsWhere({ q: 'Estágio' }).values[0]).toBe('%estagio%');
    expect(buildJobsWhere({ q: '100%_x' }).values[0]).toBe('%100\\%\\_x%');
  });

  it('filtra por empresa exatamente', () => {
    const where = buildJobsWhere({ company: 'CI&T' });
    expect(where.sql).toBe('WHERE company = ?');
    expect(where.values).toEqual(['CI&T']);
  });

  it('combina busca e empresa com AND', () => {
    const where = buildJobsWhere({ q: 'java', company: 'CI&T' });
    expect(where.sql).toContain(' AND ');
    expect(where.values).toEqual(['%java%', '\\', 'CI&T']);
  });
});

describe('buildJobsSql / buildCountSql', () => {
  it('pagina com LIMIT/OFFSET parametrizados', () => {
    const sql = buildJobsSql({
      q: 'java',
      sort: 'recent',
      page: 3,
      pageSize: 10,
    });
    expect(sql.sql).toContain('LIMIT ? OFFSET ?');
    expect(sql.values.slice(-2)).toEqual([10, 20]);
  });

  it('ordena por empresa sem diferenciar maiúsculas', () => {
    const sql = buildJobsSql({ sort: 'company', page: 1, pageSize: 20 });
    expect(sql.sql).toContain('company COLLATE NOCASE ASC');
  });

  it('ordena por título quando pedido', () => {
    const sql = buildJobsSql({ sort: 'title', page: 1, pageSize: 20 });
    expect(sql.sql).toContain('title COLLATE NOCASE ASC');
  });

  it('sem busca, lê a tabela direto (sem CTE)', () => {
    const sql = buildJobsSql({ sort: 'recent', page: 1, pageSize: 20 });
    expect(sql.sql).not.toContain('WITH s0 AS');
    expect(sql.sql).toContain('FROM Job');
  });

  it('com busca, usa a coluna normalizada', () => {
    const sql = buildJobsSql({ q: 'java', sort: 'recent', page: 1, pageSize: 20 });
    expect(sql.sql).toContain('WITH s0 AS');
    expect(sql.sql).toContain('FROM s1');
  });

  it('conta com os mesmos filtros da listagem', () => {
    const count = buildCountSql({ q: 'java', company: 'CI&T' });
    expect(count.sql).toContain('COUNT(*) AS total');
    expect(count.sql).toContain('_f1 LIKE ?');
    expect(count.values).toEqual(['%java%', '\\', 'CI&T']);
  });
});

describe('segurança do SQL', () => {
  it('todo valor de usuário vira parâmetro, não texto', () => {
    const inputs = ['"; DROP TABLE Job; --', "' OR ''='", '%_%', '\\'];
    for (const q of inputs) {
      const sql = buildJobsSql({ q, sort: 'recent', page: 1, pageSize: 10 });
      // o input nunca aparece no texto do SQL — sempre em values
      expect(sql.sql).not.toContain('DROP TABLE');
      expect(sql.sql).not.toContain(q);
      expect(sql.values.length).toBeGreaterThan(0);
    }
  });

  it('a expressão de normalização não recebe input do usuário', () => {
    const cte = buildFoldCte();
    const text = (cte as { sql: string }).sql;
    expect(text).not.toContain('?');
    expect(cte.values).toHaveLength(0);
    expect(Prisma.sql`SELECT 1`.values).toHaveLength(0);
  });
});
