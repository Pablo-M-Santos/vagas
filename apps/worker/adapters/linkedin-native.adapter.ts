import axios from 'axios';
import * as cheerio from 'cheerio';
import { NormalizedJob, JobPlatformAdapter } from '../../../packages/domain/src/job';

export class LinkedInNativeAdapter implements JobPlatformAdapter {
  readonly platformName = 'LINKEDIN';
  private searchKeywords: string[];

  public static readonly BLOCKED_COMPANIES = [
    'bairesdev',
    'jobbol',
    'turing',
    'crossover',
    'indi staffing',
    'geekhunter',
    'revelo',
    'workana',
    'act digital',
    'stefanini',
    'randstad',
    'adecco',
    'manpower'
  ];

  constructor() {
    this.searchKeywords = [
      'desenvolvedor estagio',
      'estagio desenvolvimento',
      'trainee desenvolvimento',
      'desenvolvedor junior',
      'desenvolvedor jr',
      'desenvolvedor pleno',
      'frontend junior',
      'frontend pleno',
      'backend junior',
      'backend pleno',
      'fullstack junior',
      'fullstack pleno'
    ];
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async fetchJobDetails(
    jobId: string,
    cardTitle: string,
    cardLocation: string
  ): Promise<{ isConfirmedRemote: boolean; description: string; workplaceType: string }> {
    try {
      const detailUrl = `https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/${jobId}`;
      const response = await axios.get(detailUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
          'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        },
        timeout: 8000,
      });

      const $ = cheerio.load(response.data);
      const description = $('.show-more-less-html__markup').text().trim() || $('.description__text').text().trim() || '';
      const criteriaText = $('.description__job-criteria-list').text().toLowerCase();
      const fullPageText = `${cardTitle} ${cardLocation} ${criteriaText} ${description}`.toLowerCase();

      // 1. Termos proibidos que indicam presencial ou híbrido de forma categórica
      const onsiteKeywords = [
        'presencial',
        'híbrido',
        'hibrido',
        'on-site',
        'onsite',
        'hybrid',
        'modelo presencial',
        'trabalho presencial',
        '100% presencial',
        'regime presencial',
        'modelo híbrido',
        'formato híbrido',
        'regime híbrido',
        'trabalho híbrido',
        'escritório em',
        'atuação presencial'
      ];

      const hasOnsiteTerm = onsiteKeywords.some(keyword => fullPageText.includes(keyword));

      if (hasOnsiteTerm) {
        return { isConfirmedRemote: false, description, workplaceType: 'Presencial/Híbrido Detectado' };
      }

      // 2. Se a localização do cartão for estritamente uma cidade (ex: "São Paulo, SP") sem menção a remoto
      const locationLower = cardLocation.toLowerCase();
      const isSpecificCityWithoutRemote = 
        (locationLower.includes(', sp') || locationLower.includes(', rj') || locationLower.includes(', mg') || locationLower.includes(', pr')) &&
        !locationLower.includes('remoto') &&
        !fullPageText.includes('remoto') &&
        !fullPageText.includes('remote') &&
        !fullPageText.includes('home office');

      if (isSpecificCityWithoutRemote) {
        return { isConfirmedRemote: false, description, workplaceType: 'Cidade Presencial sem selo remoto' };
      }

      return {
        isConfirmedRemote: true,
        description,
        workplaceType: 'Remoto Confirmado'
      };
    } catch {
      // Se houver timeout ao buscar detalhes, descartamos por segurança para evitar falsos positivos
      return { isConfirmedRemote: false, description: '', workplaceType: 'Erro/Timeout' };
    }
  }

  async fetchJobs(query: { keywords: string[]; location?: string }): Promise<NormalizedJob[]> {
    console.log(`[LINKEDIN NATIVO] Iniciando raspagem (Janela: 7 dias | Validação estrita de Remoto)...`);

    const allJobs: NormalizedJob[] = [];
    const seenIds = new Set<string>();

    const negativeQuery = LinkedInNativeAdapter.BLOCKED_COMPANIES
      .slice(0, 5)
      .map(c => `NOT "${c}"`)
      .join(' ');

    for (const keyword of this.searchKeywords) {
      let validCardsCount = 0;
      let start = 0;
      const maxPages = 2;
      const fullQuery = `${keyword} ${negativeQuery}`;

      while (start < maxPages * 10) {
        try {
          const targetUrl = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${encodeURIComponent(fullQuery)}&location=Brazil&f_TPR=r604800&f_WT=2&start=${start}`;

          const response = await axios.get(targetUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
              'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            },
            timeout: 10000,
          });

          const $ = cheerio.load(response.data);
          const jobCards = $('li');

          if (jobCards.length === 0) break;

          const candidates: Array<{
            externalJobId: string;
            title: string;
            company: string;
            rawLocation: string;
            cleanUrl: string;
            postedAtText: string;
          }> = [];

          jobCards.each((_, element) => {
            const $card = $(element);

            const company = ($card.find('.base-search-card__subtitle').text().trim() ||
              $card.find('h4').text().trim() || 'Empresa não informada');

            const companyLower = company.toLowerCase();
            if (LinkedInNativeAdapter.BLOCKED_COMPANIES.some(blocked => companyLower.includes(blocked))) {
              return;
            }

            const rawJobUrl = $card.find('a.base-card__full-link').attr('href') || $card.find('a').attr('href') || '';
            const cleanUrl = rawJobUrl.split('?')[0];

            const jobIdMatch = cleanUrl.match(/view\/([0-9]+)/) || cleanUrl.match(/-([0-9]+)$/);
            const externalJobId = jobIdMatch ? jobIdMatch[1] : null;

            if (!externalJobId || seenIds.has(externalJobId)) {
              return;
            }

            const title = $card.find('.base-search-card__title').text().trim() ||
              $card.find('h3').text().trim() || 'Título não informado';

            // Pré-filtro rápido no título antes de gastar requisição na página de detalhe
            const isSeniorOrNonDev = /\b(sênior|senior|sr|lead|architect|arquiteto|manager|gerente|especialista|iii|iv|suporte|elétrica|mecânica|alimentos|embalagens|marketing|vendas)\b/i.test(title);
            if (isSeniorOrNonDev) {
              return;
            }

            const rawLocation = $card.find('.job-search-card__location').text().trim() || 'Brasil';
            const postedAtText = $card.find('time').attr('datetime') || new Date().toISOString();

            seenIds.add(externalJobId);
            candidates.push({ externalJobId, title, company, rawLocation, cleanUrl, postedAtText });
          });

          // Valida a modalidade real na página interna apenas dos candidatos filtrados
          for (const candidate of candidates) {
            await this.sleep(900);
            const details = await this.fetchJobDetails(candidate.externalJobId, candidate.title, candidate.rawLocation)

            if (!details.isConfirmedRemote) {
              console.log(`[LINKEDIN NATIVO] Descartada (${details.workplaceType}): ${candidate.title} - ${candidate.company}`);
              continue;
            }

            validCardsCount++;
            allJobs.push({
              externalJobId: candidate.externalJobId,
              platform: 'LINKEDIN',
              title: candidate.title,
              company: candidate.company,
              location: `${candidate.rawLocation} (Remoto)`,
              jobUrl: candidate.cleanUrl,
              description: details.description || `${candidate.title} - Vaga 100% remota.`,
              matchedKeywords: [],
              postedAt: new Date(candidate.postedAtText),
            });
          }

          start += 10;
          await this.sleep(1200);
        } catch (error: any) {
          console.error(`[LINKEDIN NATIVO ERROR] Erro em "${keyword}" (start=${start}):`, error.message);
          break;
        }
      }

      console.log(`[LINKEDIN NATIVO] ${validCardsCount} vagas 100% remotas confirmadas para "${keyword}".`);
    }

    console.log(`[LINKEDIN NATIVO] Total final consolidado: ${allJobs.length}`);
    return allJobs;
  }
}