/** Vaga exposta para a UI (espelha o model Job do Prisma, com campos derivados). */
export interface JobDTO {
  id: string;
  title: string;
  company: string;
  location: string | null;
  /** Ainda não existe coluna no schema — fica `null` até a Fase 4 (ver FRONTEND.md). */
  salary: string | null;
  jobUrl: string;
  keywords: string[];
  platform: string;
  /** ISO 8601 ou null */
  postedAt: string | null;
  createdAt: string;
}

export type SortKey = 'recent' | 'company' | 'title';

export interface JobsMeta {
  total: number;
  page: number;
  pageSize: number;
  pages: number;
}

export interface JobsResponse {
  data: JobDTO[];
  meta: JobsMeta;
}

export interface CountOption {
  value: string;
  count: number;
}

export interface FiltersResponse {
  companies: CountOption[];
  total: number;
}

export interface StatsResponse {
  totalJobs: number;
  totalCompanies: number;
  jobsLast7d: number;
  topKeywords: CountOption[];
  lastJobAt: string | null;
}
