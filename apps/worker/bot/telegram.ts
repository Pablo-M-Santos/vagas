import { NormalizedJob } from '../../../packages/domain/src/job';
import { SeniorityLevel } from '../analyzer';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Garante espaçamento mínimo entre envios para nunca tomar erro 429 do Telegram
let lastSentTimestamp = 0;
const MIN_INTERVAL_MS = 3500;

export async function sendJobNotification(
  job: NormalizedJob & { category?: string; seniority?: SeniorityLevel }
): Promise<boolean> {
  const skills = Array.isArray(job.matchedKeywords)
    ? job.matchedKeywords.join(', ')
    : job.matchedKeywords || 'Tech';

  const seniorityLabels: Record<SeniorityLevel, string> = {
    ESTAGIO: '🎓 Estágio',
    TRAINEE: '🌱 Trainee',
    JUNIOR: '🚀 Júnior',
    PLENO: '⚡ Pleno',
  };

  const levelBadge = job.seniority ? seniorityLabels[job.seniority] : '💻 Dev';

  const message = `
🌍 <b>VAGA 100% REMOTA — DEV SCOUT</b>

💼 <b>Cargo:</b> ${job.title}
🎯 <b>Nível:</b> ${levelBadge}
🏢 <b>Empresa:</b> ${job.company}
🏷️ <b>Stack:</b> <code>${skills}</code>
  `.trim();

  if (!token || !chatId) {
    console.log(`[TELEGRAM MOCK] Mensagem gerada:\n${message}`);
    return true;
  }

  // Respeita o intervalo mínimo de 3.5s entre mensagens no grupo
  const now = Date.now();
  const elapsed = now - lastSentTimestamp;
  if (elapsed < MIN_INTERVAL_MS) {
    await sleep(MIN_INTERVAL_MS - elapsed);
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const payload = {
    chat_id: chatId,
    text: message,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🔗 Ver Vaga e Candidatar-se', url: job.jobUrl },
        ],
      ],
    },
  };

  try {
    await axios.post(url, payload, { timeout: 10000 });
    lastSentTimestamp = Date.now();
    console.log(`[TELEGRAM REAL] Vaga enviada (${levelBadge}): ${job.title}`);
    return true;
  } catch (error: any) {
    const responseData = error.response?.data;

    // Se ainda assim tomar 429 (Too Many Requests), aguarda o tempo pedido pelo Telegram e reenvia
    if (responseData?.error_code === 429 && responseData?.parameters?.retry_after) {
      const waitSeconds = Number(responseData.parameters.retry_after) + 1;
      console.warn(`[TELEGRAM RATE LIMIT] Aguardando ${waitSeconds}s para reenviar: ${job.title}`);
      await sleep(waitSeconds * 1000);

      try {
        await axios.post(url, payload, { timeout: 10000 });
        lastSentTimestamp = Date.now();
        console.log(`[TELEGRAM REAL] Vaga reenviada com sucesso após retry: ${job.title}`);
        return true;
      } catch (retryError: any) {
        console.error(`[TELEGRAM ERROR] Falha definitiva no reenvio:`, retryError.response?.data || retryError.message);
        return false;
      }
    }

    console.error(`[TELEGRAM ERROR] Falha ao enviar:`, responseData || error.message);
    return false;
  }
}