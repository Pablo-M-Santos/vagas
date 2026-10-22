import axios from 'axios';
import * as cheerio from 'cheerio';
import { NormalizedJob, JobPlatformAdapter } from '../types/job';

export class LinkedInNativeAdapter implements JobPlatformAdapter {
  readonly platformName = 'LINKEDIN';
  private searchKeywords: string[];

  // Blacklist de empresas descartadas no ato da raspagem
  private blockedCompanies = ['bairesdev', 'jobbol', 'turing', 'crossover'];

  constructor() {
    this.searchKeywords = [
      'java junior',
      'java jr',
      'react junior',
      'react jr',
      'vue junior',
      'vue jr',
      'node junior',
      'frontend junior',
      'fullstack junior',
      'desenvolvedor junior',
      'desenvolvedor jr'
    ];
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async fetchJobs(query: { keywords: string[]; location?: string }): Promise<NormalizedJob[]> {
    console.log(`[LINKEDIN NATIVO] Iniciando raspagem com paginação profunda e descarte de spammers...`);

    const allJobs: NormalizedJob[] = [];
    const seenIds = new Set<string>();

    for (const keyword of this.searchKeywords) {
      let validCardsCount = 0;
      let start = 0;
      const maxPages = 2; 

      while (start < maxPages * 10) {
        try {
          const targetUrl = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${encodeURIComponent(keyword)}&location=Brazil&f_TPR=r86400&f_WT=2&start=${start}`;

          console.log(`[LINKEDIN URL] 👉 ${targetUrl}`);

          const response = await axios.get(targetUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
              'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
            },
            timeout: 10000,
          });

          const $ = cheerio.load(response.data);
          const jobCards = $('li');

          if (jobCards.length === 0) break; 

          jobCards.each((_, element) => {
            const $card = $(element);
            
            const company = ($card.find('.base-search-card__subtitle').text().trim() || 
                             $card.find('h4').text().trim() || 'Empresa não informada');

            const companyLower = company.toLowerCase();
            if (this.blockedCompanies.some(blocked => companyLower.includes(blocked))) {
              return; 
            }

            const jobUrl = $card.find('a.base-card__full-link').attr('href') || $card.find('a').attr('href') || '';
            const jobIdMatch = jobUrl.match(/view\/([0-9]+)/) || jobUrl.match(/-([0-9]+)\?/);
            const externalJobId = jobIdMatch ? jobIdMatch[1] : Math.random().toString(36).substring(7);

            if (!externalJobId || seenIds.has(externalJobId)) {
              return;
            }

            const title = $card.find('.base-search-card__title').text().trim() || 
                          $card.find('h3').text().trim() || 'Título não informado';

            const location = $card.find('.job-search-card__location').text().trim() || 'Brasil';
            const postedAtText = $card.find('time').attr('datetime') || new Date().toISOString();

            seenIds.add(externalJobId);
            validCardsCount++;

            allJobs.push({
              externalJobId,
              platform: 'LINKEDIN',
              title,
              company,
              location,
              jobUrl: jobUrl.split('?')[0],
              description: `${title} - Vaga de tecnologia anunciada recentemente no Brasil.`,
              matchedKeywords: '',
              postedAt: new Date(postedAtText),
            });
          });

          start += 10;
          await this.sleep(1200);

        } catch (error: any) {
          console.error(`[LINKEDIN NATIVO ERROR] Erro ao buscar por "${keyword}" (start=${start}):`, error.message);
          break;
        }
      }

      console.log(`[LINKEDIN NATIVO] ${validCardsCount} vagas reais e limpas garimpadas para "${keyword}".`);
    }

    console.log(`[LINKEDIN NATIVO] Total final de vagas úteis consolidadas: ${allJobs.length}`);
    return allJobs;
  }
}