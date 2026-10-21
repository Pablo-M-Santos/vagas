import { NormalizedJob } from '../types/job';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

export async function sendJobNotification(job: NormalizedJob): Promise<boolean> {
  const message = `
💼 <b>${job.title}</b>
🏢 <b>Empresa:</b> ${job.company}
📍 <b>Local:</b> ${job.location || 'Não informado'}
🔑 <b>Skills:</b> ${job.matchedKeywords.join(', ')}

🔗 <a href="${job.jobUrl}">Candidatar-se na Vaga</a>
  `.trim();

  if (!token || !chatId) {
    console.log(`[TELEGRAM MOCK] Token/ChatId ausente. Mensagem:\n${message}`);
    return true;
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    await axios.post(url, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    }, {
      timeout: 10000
    });

    console.log(`[TELEGRAM REAL] Notificação enviada com sucesso para o chat ${chatId}!`);
    return true;
  } catch (error: any) {
    console.error(`[TELEGRAM ERROR] Falha ao enviar mensagem:`, error.response?.data || error.message);
    return false;
  }
}
