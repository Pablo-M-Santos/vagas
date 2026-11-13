import cron from 'node-cron';
import { runPipeline } from './scheduler';

console.log('🤖 [VAGAS-HUB] Worker iniciado na Nuvem!');

// Executa uma vez imediatamente ao ligar o servidor
runPipeline().catch(err => console.error('[ERRO NO WORKER INITIAL]:', err));

// Agenda para rodar a cada 2 horas exatas (Expressão Cron: '0 */2 * * *')
cron.schedule('0 */2 * * *', async () => {
  console.log(`\n⏰ [CRON] Iniciando rotina automática de busca (${new Date().toLocaleString('pt-BR')})...`);
  try {
    await runPipeline();
  } catch (error) {
    console.error('[ERRO NO CRON WORKER]:', error);
  }
});