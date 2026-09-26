import app from './app.js';
import env from './config/env.js';
import { connectDB } from './config/db.js';

async function start() {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`[Server] Rodando em http://localhost:${env.PORT}`);
    console.log(`[Server] CORS liberado para: ${env.CORS_ORIGIN}`);
    console.log(`[Server] Health check: http://localhost:${env.PORT}/health`);
  });
}

start().catch((err) => {
  console.error('[Server] Falha ao iniciar:', err);
  process.exit(1);
});
