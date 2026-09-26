import { ZodError } from 'zod';

/**
 * Fábrica de middleware de validação com Zod.
 * @param {import('zod').ZodSchema} schema — schema Zod a aplicar
 * @param {'body' | 'query' | 'params'} source — origem dos dados no req
 */
export function validate(schema, source = 'body') {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req[source]);
      // Substitui pelo valor parseado (limpo e com defaults)
      req[source] = parsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Erro de validação nos dados enviados',
            code: 'VALIDATION_ERROR',
            details: err.errors.map((e) => ({
              path: e.path.join('.'),
              message: e.message,
            })),
          },
        });
      }
      next(err);
    }
  };
}
