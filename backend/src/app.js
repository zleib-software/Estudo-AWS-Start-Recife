import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import env from './config/env.js';
import apiRoutes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

// ─── Segurança ───
app.use(helmet());

// ─── CORS ───
const corsOrigin = env.CORS_ORIGIN === '*' ? '*' : env.CORS_ORIGIN.split(',').map((o) => o.trim());
app.use(
  cors({
    origin: corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-api-key'],
  })
);

// ─── Body parsing ───
app.use(express.json({ limit: '10mb' }));

// ─── Rota Raiz (Boas-vindas) ───
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'AWS Simulado API Online',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      questions: '/api/questions',
      domains: '/api/domains',
    },
  });
});

// ─── Health check ───
app.get('/health', (_req, res) => {
  res.json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───
app.use('/api', apiRoutes);

// ─── 404 catch-all ───
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: { message: 'Rota não encontrada', code: 'NOT_FOUND' },
  });
});

// ─── Error handler centralizado ───
app.use(errorHandler);

export default app;
