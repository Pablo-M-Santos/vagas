import { runPipeline } from './scheduler/index'; 
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  console.log("Serviço Worker Iniciado...");
  try {
    await runPipeline();
  } catch (error) {
    console.error("[ERRO NO WORKER]:", error);
  }
}

main();