import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import { NormalizedJob } from "../types/job";

function createPrismaInstance() {
  const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (url && url.startsWith("libsql://")) {
    const libsql = createClient({
      url,
      authToken,
    });
    const adapter = new PrismaLibSQL(libsql);
    return new PrismaClient({ adapter });
  }

  return new PrismaClient();
}

const prisma = createPrismaInstance();

export async function saveJob(job: NormalizedJob): Promise<boolean> {
  try {
    const existing = await prisma.job.findFirst({
      where: {
        platform: job.platform,
        externalJobId: job.externalJobId,
      },
    });

    if (existing) {
      console.log(
        `[DB] Vaga já existe no banco: ${job.platform}_${job.externalJobId}`,
      );
      return false;
    }

    // Trata matchedKeywords para formato String do SQLite
    const keywordsFormatted = Array.isArray(job.matchedKeywords)
      ? job.matchedKeywords.join(", ")
      : job.matchedKeywords || "";

    await prisma.job.create({
      data: {
        externalJobId: job.externalJobId,
        platform: job.platform,
        title: job.title,
        company: job.company,
        location: job.location || "Brasil",
        jobUrl: job.jobUrl,
        description:
          job.description || `${job.title} na empresa ${job.company}`,
        matchedKeywords: keywordsFormatted,
        postedAt: job.postedAt || new Date(),
        status: "NEW",
      },
    });

    console.log(
      `[DB] Vaga salva com sucesso: ${job.platform}_${job.externalJobId}`,
    );
    return true;
  } catch (error) {
    console.error("[DB ERROR] Erro ao salvar vaga:", error);
    return false;
  }
}
