import { NormalizedJob, JobPlatformAdapter } from '../types/job';
import { ApifyClient } from 'apify-client';
import dotenv from 'dotenv';

dotenv.config();

export class LinkedInAdapter implements JobPlatformAdapter {
  readonly platformName = 'LINKEDIN';
  private apifyClient: ApifyClient;
  private actorId: string;
  private searchKeywords: string[];

  constructor() {
    this.apifyClient = new ApifyClient({
      token: process.env.APIFY_API_TOKEN || '',
    });
    this.actorId = process.env.APIFY_LINKEDIN_ACTOR_ID || 'hKGsXqqfdEBZXbTxk';
    this.searchKeywords = ["java junior", "vue.js", "react.js", "frontend junior", "fullstack junior"];
  }

  async fetchJobs(query: { keywords: string[]; location?: string }): Promise<NormalizedJob[]> {
    console.log(`[APIFY] Iniciando scraping do LinkedIn com buscas separadas por keyword...`);

    const allJobs: NormalizedJob[] = [];
    const seenIds = new Set<string>();

    for (const keyword of this.searchKeywords) {
      console.log(`[APIFY] Buscando por: "${keyword}"...`);

      try {
        // Monta a URL de busca pública limpa do LinkedIn
        const searchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keyword)}&location=Brazil&f_TPR=r86400`;

        const input = {
          // O ator espera uma lista de strings puras, não objetos
          urls: [searchUrl],
          maxItems: 15,
        };

        const run = await this.apifyClient.actor(this.actorId).call(input);
        console.log(`[APIFY] Execução para "${keyword}" concluída. Dataset ID: ${run.defaultDatasetId}`);

        const { items } = await this.apifyClient.dataset(run.defaultDatasetId).listItems();
        console.log(`[APIFY] ${items.length} vagas obtidas para "${keyword}".`);

        for (const item of (items as any[])) {
          const externalJobId = item.id || item.jobId || item.positionId || item.url || Math.random().toString();

          if (seenIds.has(externalJobId)) {
            continue;
          }

          seenIds.add(externalJobId);

          allJobs.push({
            externalJobId,
            platform: 'LINKEDIN',
            title: item.positionName || item.title || item.jobTitle || 'Título não informado',
            company: item.companyName || item.company || item.employerName || 'Empresa não informada',
            location: item.location || item.jobLocation || query.location || 'Brasil',
            jobUrl: item.url || item.jobUrl || item.link || 'https://linkedin.com',
            description: item.description || item.descriptionHtml || item.text || item.jobDescription || '',
            matchedKeywords: [],
            postedAt: item.postedAt ? new Date(item.postedAt) : (item.publishedAt ? new Date(item.publishedAt) : new Date()),
          });
        }
      } catch (error) {
        console.error(`[APIFY ERROR] Erro ao buscar por "${keyword}":`, error);
      }
    }

    console.log(`[APIFY] Total de vagas únicas consolidadas: ${allJobs.length}`);
    return allJobs;
  }
}