import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    // O PrismaClient é instanciado na importação de src/lib/db.ts —
    // apontamos para o mesmo SQLite usado pelo Next (caminho relativo a prisma/).
    env: { DATABASE_URL: 'file:../../prisma/vagas.db' },
  },
});
