import { NormalizedJob } from '../types/job';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function saveJob(job: NormalizedJob): Promise<boolean> {
  try {
    const existing = await prisma.job.findFirst({
      where: {
        platform: job.platform,
        externalJobId: job.externalJobId,
      },
    });

    if (existing) {
      console.log(`[DB] Vaga já existe no banco: ${job.platform}_${job.externalJobId}`);
      return false;
    }

    await prisma.job.create({
      data: {
        externalJobId: job.externalJobId,
        platform: job.platform,
        title: job.title,
        company: job.company,
        location: job.location,
        jobUrl: job.jobUrl,
        description: job.description,
        matchedKeywords: job.matchedKeywords,
        postedAt: job.postedAt || new Date(),
        status: 'NEW',
      },
    });

    console.log(`[DB] Vaga salva com sucesso: ${job.platform}_${job.externalJobId}`);
    return true;
  } catch (error) {
    console.error('[DB ERROR] Erro ao salvar vaga:', error);
    return false;
  }
}
