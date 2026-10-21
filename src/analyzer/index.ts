import { NormalizedJob } from '../types/job';

export interface AnalysisResult {
  approved: boolean;
  reason: string;
  matchedKeywords: string[];
  category: 'FRONTEND' | 'BACKEND' | 'FULLSTACK';
}

export function analyzeJob(job: NormalizedJob, keywords: string[]): AnalysisResult {
  const title = (job.title || '').toLowerCase();
  const description = (job.description || '').toLowerCase();
  const titleAndDesc = `${title} ${description}`;

  // Regra de nível alto (título): rejeita
  const highLevelKeywords = ['sênior', 'senior', 'pleno', 'pl', 'sr', 'lead', 'tech lead'];
  const hasHighLevel = highLevelKeywords.find(level => title.includes(level));
  if (hasHighLevel) {
    console.log(`[ANALYZER] Título: ${job.title} | Aprovada: false | Motivo: NIVEL_ALTO`);
    return { approved: false, reason: 'NIVEL_ALTO', matchedKeywords: [], category: 'FULLSTACK' };
  }

  // Regra de nível inicial (título ou descrição): aprova
  const entryLevelKeywords = ['junior', 'júnior', 'jr', 'estágio', 'estagio', 'trainee', 'entrada', 'entry', 'entry-level'];
  const hasEntryLevel = entryLevelKeywords.some(level => title.includes(level) || description.includes(level));

  let reason = '';
  let approved = true;

  if (hasEntryLevel) {
    reason = 'NIVEL_INICIAL';
  } else {
    reason = 'NIVEL_NAO_ENCONTRADO'; // vaga neutra, vale verificar
  }

  // Regra de stack (título ou descrição)
  const frontendStack = ['vue', 'vue.js', 'react', 'react.js', 'angular', 'angularjs', 'typescript', 'javascript', 'next.js', 'nextjs'];
  const backendStack = ['java', 'spring boot', 'spring', 'rest', 'api', 'node.js', 'nodejs', 'express'];

  const matchedFrontend = frontendStack.filter(tech => titleAndDesc.includes(tech));
  const matchedBackend = backendStack.filter(tech => titleAndDesc.includes(tech));

  const matchedKeywords = Array.from(new Set([...matchedFrontend, ...matchedBackend]));

  if (matchedKeywords.length === 0) {
    console.log(`[ANALYZER] Título: ${job.title} | Aprovada: false | Motivo: SEM_STACK`);
    return { approved: false, reason: 'SEM_STACK', matchedKeywords: [], category: 'FULLSTACK' };
  }

  let category: 'FRONTEND' | 'BACKEND' | 'FULLSTACK' = 'FULLSTACK';
  if (matchedFrontend.length > 0 && matchedBackend.length > 0) category = 'FULLSTACK';
  else if (matchedFrontend.length > 0) category = 'FRONTEND';
  else if (matchedBackend.length > 0) category = 'BACKEND';

  console.log(`[ANALYZER] Título: ${job.title} | Aprovada: true | Motivo: ${reason}`);
  return { approved: true, reason, matchedKeywords, category };
}
