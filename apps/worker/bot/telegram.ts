import { NormalizedJob } from '../../../packages/domain/src/job';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID; // Aqui você coloca o ID do seu Supergrupo (ex: -100xxxxxxxxxx)

export async function sendJobNotification(job: NormalizedJob & { category?: string }): Promise<boolean> {
  // Tratamento seguro para as keywords garantindo string formatada
  const skills = Array.isArray(job.matchedKeywords)
    ? job.matchedKeywords.join(', ')
    : job.matchedKeywords || 'Geral / Tech';

  // Ícone dinâmico baseado na categoria retornada pelo analyzer
  const categoryIcons: Record<string, string> = {
    FRONTEND: '💻',
    BACKEND: '⚙️',
    FULLSTACK: '⚡',
  };
  const categoryIcon = job.category ? (categoryIcons[job.category] || '🚀') : '🚀';

  // Montagem da mensagem estruturada (HTML do Telegram)
  const message = `
${categoryIcon} <b>NOVA OPORTUNIDADE — DEV SCOUT</b>

💼 <b>Cargo:</b> ${job.title}
🏢 <b>Empresa:</b> ${job.company}
📍 <b>Local:</b> ${job.location || 'Brasil (Remoto/Híbrido)'}
🏷️ <b>Stack / Skills:</b> <code>${skills}</code>

🎯 <i>Vaga filtrada e validada para início de carreira (Júnior / Estágio).</i>
  `.trim();

  if (!token || !chatId) {
    console.log(`[TELEGRAM MOCK] Token ou ChatID ausente no .env. Mensagem gerada:\n${message}`);
    return true;
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    
    await axios.post(url, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
      disable_web_page_preview: true, // Evita poluir o chat com miniaturas gigantes do LinkedIn
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '🔗 Ver Vaga e Candidatar-se',
              url: job.jobUrl,
            },
          ],
        ],
      },
    }, {
      timeout: 10000,
    });

    console.log(`[TELEGRAM REAL] Alerta enviado com sucesso para o grupo ${chatId} (${job.title})!`);
    return true;
  } catch (error: any) {
    console.error(`[TELEGRAM ERROR] Falha ao disparar mensagem para o Telegram:`, error.response?.data || error.message);
    return false;
  }
}