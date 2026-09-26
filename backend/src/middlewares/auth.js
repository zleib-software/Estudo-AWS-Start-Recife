import env from '../config/env.js';

/**
 * Middleware de autenticação simples via API Key.
 * Protege rotas de escrita (POST, PUT, DELETE).
 * Checa o header `x-api-key`.
 */
export function apiKeyAuth(req, res, next) {
  if (!env.API_KEY) {
    // Se nenhuma API key configurada, bloqueia por segurança
    return res.status(500).json({
      success: false,
      error: {
        message: 'API_KEY não configurada no servidor. Defina-a no .env.',
        code: 'SERVER_CONFIG_ERROR',
      },
    });
  }

  const provided = req.headers['x-api-key'];
  if (!provided || provided !== env.API_KEY) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'API Key inválida ou ausente. Envie o header x-api-key.',
        code: 'UNAUTHORIZED',
      },
    });
  }

  next();
}
