import { LinkedInAdapter } from '../adapters/linkedin.adapter';
import { analyzeJob } from '../analyzer';
import { sendJobNotification } from '../bot/telegram';
import { saveJob } from '../database/jobs.repository';
import { NormalizedJob } from '../types/job';
import dotenv from 'dotenv';

dotenv.config();

export async function runPipeline() {
  console.log("=== INICIANDO PIPELINE DO WORKER (REAL) ===");
  const adapter = new LinkedInAdapter();
  
  const keywordsEnv = process.env.KEYWORDS_FILTER || 'Java,Vue,React,Junior,Júnior';
  const keywords = keywordsEnv.split(',').map(k => k.trim());
  const location = process.env.LOCATION_FILTER || 'Brasil';

  const jobs = await adapter.fetchJobs({ keywords, location });
  console.log(`[PIPELINE] ${jobs.length} vagas coletadas para análise.`);

  let newJobsCount = 0;

  for (const job of jobs) {
    const analysis = analyzeJob(job, keywords);
    if (analysis.approved) {
      job.matchedKeywords = analysis.matchedKeywords;
      // Adicionando a categoria à descrição ou como informação extra se necessário,
      // pois o modelo de dados atual não tem campo 'category'
      job.description = `[Categoria: ${analysis.category}] ${job.description}`;
      
      const isNew = await saveJob(job);
      if (isNew) {
        await sendJobNotification(job);
        newJobsCount++;
      }
    }
  }

  console.log(`=== PIPELINE FINALIZADO. Novas vagas processadas e enviadas: ${newJobsCount} ===`);
}
