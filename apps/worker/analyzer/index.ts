import { NormalizedJob } from '../../../packages/domain/src/job';
import { LinkedInNativeAdapter } from '../adapters/linkedin-native.adapter'; // ajuste o caminho se necessário

export type SeniorityLevel = 'ESTAGIO' | 'TRAINEE' | 'JUNIOR' | 'PLENO';

export interface AnalysisResult {
  approved: boolean;
  reason: string;
  matchedKeywords: string[];
  category: 'FRONTEND' | 'BACKEND' | 'FULLSTACK' | 'MOBILE' | 'GERAL';
  seniority: SeniorityLevel;
  isRemote: boolean;
}

function safeRegex(term: string, flags = 'i'): RegExp {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}\\b`, flags);
}

export function analyzeJob(job: NormalizedJob, keywords: string[]): AnalysisResult {
  const title = (job.title || '').toLowerCase();
  const description = (job.description || '').toLowerCase();
  const location = (job.location || '').toLowerCase();
  const company = (job.company || '').toLowerCase();
  const fullContext = `${title} ${description} ${location}`;

  // 1. Blacklist de Empresas
  const isIgnoredCompany = LinkedInNativeAdapter.BLOCKED_COMPANIES.some(
    blocked => company.includes(blocked) || safeRegex(blocked).test(company)
  );

  if (isIgnoredCompany) {
    return { approved: false, reason: 'EMPRESA_BLOQUEADA', matchedKeywords: [], category: 'GERAL', seniority: 'JUNIOR', isRemote: false };
  }

  // 2. Validação de Trabalho Remoto (Rejeita apenas se houver menção explícita a presencial/híbrido)
  const nonRemoteTerms = ['presencial', 'híbrido', 'hibrido', 'on-site', 'onsite', 'hybrid'];
  if (nonRemoteTerms.some(term => safeRegex(term).test(`${title} ${location}`))) {
    return { approved: false, reason: 'PRESENCIAL_OU_HIBRIDO', matchedKeywords: [], category: 'GERAL', seniority: 'JUNIOR', isRemote: false };
  }

  // 3. Bloqueio de Níveis Sênior / Liderança / Especialista
  const blockedHighLevel = [
    'sênior', 'senior', 'sr', 'lead', 'tech lead', 'team lead',
    'architect', 'arquiteto', 'arquiteta', 'manager', 'gerente',
    'coordenador', 'coordenadora', 'especialista', 'specialist', 'principal', 'staff', 'iii', 'iv'
  ];
  if (blockedHighLevel.some(level => safeRegex(level).test(title))) {
    return { approved: false, reason: 'NIVEL_ACIMA_PLENO', matchedKeywords: [], category: 'GERAL', seniority: 'PLENO', isRemote: true };
  }

  // 4. Garante que é uma vaga de Desenvolvimento de Software (evita Suporte N1, Engenharia Elétrica, Alimentos, etc.)
  const nonDevRoles = [
    'suporte', 'support', 'help desk', 'service desk', 'infraestrutura', 'redes',
    'elétrica', 'eletrica', 'mecânica', 'alimentos', 'embalagens', 'marketing',
    'vendas', 'comercial', 'rh', 'recursos humanos', 'financeiro', 'manutenção', 'aprendiz'
  ];
  if (nonDevRoles.some(role => safeRegex(role).test(title))) {
    return { approved: false, reason: 'FORA_AREA_DEV', matchedKeywords: [], category: 'GERAL', seniority: 'JUNIOR', isRemote: true };
  }

  const devRoleIndicators = [
    'desenvolvedor', 'desenvolvedora', 'developer', 'dev', 'software', 'programador',
    'programadora', 'frontend', 'front-end', 'backend', 'back-end', 'fullstack',
    'full-stack', 'full stack', 'mobile', 'web', 'engenheiro de software', 'software engineer'
  ];
  if (!devRoleIndicators.some(ind => safeRegex(ind).test(title))) {
    return { approved: false, reason: 'TITULO_NAO_DEV', matchedKeywords: [], category: 'GERAL', seniority: 'JUNIOR', isRemote: true };
  }

  // 5. Identificação de Senioridade (Estágio, Trainee, Júnior, Pleno)
  let seniority: SeniorityLevel | null = null;

  if (['estágio', 'estagio', 'estagiário', 'estagiario', 'intern', 'internship'].some(t => safeRegex(t).test(title))) {
    seniority = 'ESTAGIO';
  } else if (['trainee'].some(t => safeRegex(t).test(title))) {
    seniority = 'TRAINEE';
  } else if (['pleno', 'pl', 'mid-level', 'mid level', 'middle', 'ii'].some(t => safeRegex(t).test(title))) {
    seniority = 'PLENO';
  } else if (['junior', 'júnior', 'jr', 'entry', 'entry-level', 'associate'].some(t => safeRegex(t).test(title))) {
    seniority = 'JUNIOR';
  }

  if (!seniority) {
    return { approved: false, reason: 'SENIORIDADE_NAO_ESPECIFICADA', matchedKeywords: [], category: 'GERAL', seniority: 'JUNIOR', isRemote: true };
  }

  // 6. Extração automática de tecnologias (para tags no Telegram e filtros no Site)
  const techDictionary = [
    'react', 'vue', 'angular', 'next.js', 'nuxt', 'typescript', 'javascript', 'tailwind',
    'node.js', 'nodejs', 'java', 'spring', 'python', 'django', 'fastapi', 'c#', '.net',
    'php', 'laravel', 'golang', 'go', 'ruby', 'rails', 'flutter', 'react native',
    'kotlin', 'swift', 'aws', 'docker', 'sql', 'postgresql', 'mongodb'
  ];

  const matchedKeywords = Array.from(
    new Set(techDictionary.filter(tech => safeRegex(tech).test(`${title} ${description}`)))
  );

  // Classificação de Categoria
  const isFront = ['react', 'vue', 'angular', 'next.js', 'nuxt', 'frontend', 'front-end'].some(t => safeRegex(t).test(`${title} ${description}`));
  const isBack = ['node.js', 'nodejs', 'java', 'spring', 'python', 'c#', '.net', 'php', 'golang', 'backend', 'back-end'].some(t => safeRegex(t).test(`${title} ${description}`));
  const isMobile = ['flutter', 'react native', 'kotlin', 'swift', 'android', 'ios', 'mobile'].some(t => safeRegex(t).test(`${title} ${description}`));

  let category: 'FRONTEND' | 'BACKEND' | 'FULLSTACK' | 'MOBILE' | 'GERAL' = 'GERAL';
  if (isMobile) category = 'MOBILE';
  else if ((isFront && isBack) || safeRegex('fullstack').test(title) || safeRegex('full-stack').test(title)) category = 'FULLSTACK';
  else if (isFront) category = 'FRONTEND';
  else if (isBack) category = 'BACKEND';

  console.log(`[ANALYZER] ✅ Aprovada [${seniority} | ${category}]: ${job.title} - ${job.company}`);
  return {
    approved: true,
    reason: 'VAGA_REMOTA_DEV_APROVADA',
    matchedKeywords: matchedKeywords.length > 0 ? matchedKeywords : ['Desenvolvimento'],
    category,
    seniority,
    isRemote: true
  };
}