/**
 * Helpers puros (sem IO) — usados pela API e pela UI.
 */

/** `matchedKeywords` é gravado no banco como CSV ("react, nodejs"). */
export function parseKeywords(csv: string | null | undefined): string[] {
  if (!csv) return [];
  return csv
    .split(',')
    .map((k) => k.trim())
    .filter((k) => k.length > 0);
}

/** Minúsculas + remove acentos ("Estágio" -> "estagio"). Usado na busca. */
export function foldAccents(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/** Escapa caracteres especiais de LIKE (% _ \) para a busca não quebrar. */
export function escapeLike(input: string): string {
  return input.replace(/[\\%_]/g, (c) => `\\${c}`);
}

function toDate(value: string | number | Date | null | undefined): Date | null {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return value;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Data ISO a partir de qualquer formato que o SQLite devolver. */
export function toIso(value: string | number | Date | null | undefined): string | null {
  return toDate(value)?.toISOString() ?? null;
}

/** "há 3 horas", "há 2 dias", "agora mesmo". */
export function relativeTime(iso: string | null | undefined, now: Date = new Date()): string {
  const date = toDate(iso ?? null);
  if (!date) return 'data desconhecida';

  const diffMs = now.getTime() - date.getTime();
  const minutes = Math.floor(diffMs / 60_000);

  if (minutes < 1) return 'agora mesmo';
  if (minutes < 60) return `há ${minutes} min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours}h`;

  const days = Math.floor(hours / 24);
  if (days === 1) return 'ontem';
  if (days < 30) return `há ${days} dias`;

  const months = Math.floor(days / 30);
  if (months < 12) return `há ${months} ${months === 1 ? 'mês' : 'meses'}`;

  const years = Math.floor(days / 365);
  return `há ${years} ${years === 1 ? 'ano' : 'anos'}`;
}

/** Domínio de origem da vaga ("br.linkedin.com") para o card. */
export function sourceDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'link externo';
  }
}

/** Trunca texto mantendo palavras inteiras. */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}
