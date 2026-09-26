/**
 * Middleware centralizado de tratamento de erros.
 * Garante formato JSON padronizado em qualquer falha.
 */
export function errorHandler(err, _req, res, _next) {
  console.error('[Error]', err);

  // Erros de restrição (ex: SQLite constraint)
  if (err.code === 'SQLITE_CONSTRAINT') {
    return res.status(409).json({
      success: false,
      error: {
        message: 'Erro de integridade de dados (Registro duplicado ou violado)',
        code: 'SQLITE_CONSTRAINT',
      },
    });
  }

  // Erros com statusCode customizado (lançados manualmente na service)
  const status = err.statusCode || 500;
  return res.status(status).json({
    success: false,
    error: {
      message: err.message || 'Erro interno do servidor',
      code: err.code || 'INTERNAL_ERROR',
    },
  });
}
