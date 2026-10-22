import { NormalizedJob } from '../types/job';

export interface AnalysisResult {
  approved: boolean;
  reason: string;
  matchedKeywords: string[];
  category: 'FRONTEND' | 'BACKEND' | 'FULLSTACK';
}

function safeRegex(term: string, flags = 'i'): RegExp {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}\\b`, flags);
}

export function analyzeJob(job: NormalizedJob, keywords: string[]): AnalysisResult {
  const title = (job.title || '').toLowerCase();
  const description = (job.description || '').toLowerCase();
  const company = (job.company || '').toLowerCase();
  const titleAndDesc = `${title} ${description}`;

  const ignoredCompanies = [
    'jobbol',
    'bairesdev',
    'crossover',
    'turing'
  ];

  const isIgnoredCompany = ignoredCompanies.some(blocked => 
    company.includes(blocked) || safeRegex(blocked).test(titleAndDesc)
  );

  if (isIgnoredCompany) {
    console.log(`[ANALYZER] Título: ${job.title} | Empresa: ${job.company} | Aprovada: false | Motivo: EMPRESA_BLOQUEADA`);
    return { approved: false, reason: 'EMPRESA_BLOQUEADA', matchedKeywords: [], category: 'FULLSTACK' };
  }

  const strictTitleHighLevel = [
    'sênior', 'senior', 'pleno', 'pl', 'sr', 'lead', 'tech lead', 
    'architect', 'arquiteto', 'arquiteta', 'manager', 'gerente', 
    'coordenador', 'coordenadora', 'especialista', 'specialist', 'principal', 'ii', 'iii', 'iv'
  ];
  const hasStrictHighLevelInTitle = strictTitleHighLevel.find(level => safeRegex(level).test(title));
  if (hasStrictHighLevelInTitle) {
    console.log(`[ANALYZER] Título: ${job.title} | Aprovada: false | Motivo: TÍTULO_NIVEL_ALTO (${hasStrictHighLevelInTitle})`);
    return { approved: false, reason: 'TÍTULO_NIVEL_ALTO', matchedKeywords: [], category: 'FULLSTACK' };
  }

  const unwantedStacks = [
    'python', 'golang', 'go developer', 'elixir', 'salesforce', 
    'mulesoft', 'c++', 'ruby', 'rails', 'php', '.net', 'c#', 'flutter', 'android', 'ios', 'abap', 'sap', 'delphi'
  ];
  const hasUnwantedStack = unwantedStacks.find(tech => safeRegex(tech).test(titleAndDesc));
  if (hasUnwantedStack) {
    console.log(`[ANALYZER] Título: ${job.title} | Aprovada: false | Motivo: STACK_FORA_DO_ESCOPO (${hasUnwantedStack})`);
    return { approved: false, reason: 'STACK_FORA_DO_ESCOPO', matchedKeywords: [], category: 'FULLSTACK' };
  }

  const entryLevelKeywords = ['junior', 'júnior', 'jr', 'estágio', 'estagio', 'trainee', 'entrada', 'entry', 'entry-level', 'associate', 'assistente'];
  const hasEntryIndicator = entryLevelKeywords.some(level => safeRegex(level).test(titleAndDesc));

  const isGenericTitle = !hasStrictHighLevelInTitle && !hasEntryIndicator;
  const seniorRequirements = ['5+ anos', '5 anos', '6+ anos', '8+ anos', 'liderança de equipe'];
  const hasSeniorRequirements = seniorRequirements.some(req => description.includes(req));

  if (!hasEntryIndicator && (hasSeniorRequirements || !isGenericTitle)) {
    console.log(`[ANALYZER] Título: ${job.title} | Aprovada: false | Motivo: SEM_INDICADOR_JUNIOR`);
    return { approved: false, reason: 'SEM_INDICADOR_JUNIOR', matchedKeywords: [], category: 'FULLSTACK' };
  }

  const frontendStack = ['vue', 'vue.js', 'vuejs', 'react', 'react.js', 'reactjs', 'typescript', 'next.js', 'nextjs', 'nuxt'];
  const backendStack = ['java', 'spring', 'spring boot', 'node.js', 'nodejs', 'express', 'adonis'];

  const matchedFrontend = frontendStack.filter(tech => safeRegex(tech).test(titleAndDesc));
  const matchedBackend = backendStack.filter(tech => safeRegex(tech).test(titleAndDesc));

  const matchedKeywords = Array.from(new Set([...matchedFrontend, ...matchedBackend]));

  if (matchedKeywords.length === 0) {
    console.log(`[ANALYZER] Título: ${job.title} | Aprovada: false | Motivo: SEM_STACK_ALVO`);
    return { approved: false, reason: 'SEM_STACK_ALVO', matchedKeywords: [], category: 'FULLSTACK' };
  }

  let category: 'FRONTEND' | 'BACKEND' | 'FULLSTACK' = 'FULLSTACK';
  if (matchedFrontend.length > 0 && matchedBackend.length > 0) category = 'FULLSTACK';
  else if (matchedFrontend.length > 0) category = 'FRONTEND';
  else if (matchedBackend.length > 0) category = 'BACKEND';

  console.log(`[ANALYZER] Título: ${job.title} | Empresa: ${job.company} | Aprovada: true | Motivo: VAGA_ELEGIVEL_JUNIOR_ENCONTRADA`);
  return { approved: true, reason: 'VAGA_ELEGIVEL_JUNIOR_ENCONTRADA', matchedKeywords, category };
}