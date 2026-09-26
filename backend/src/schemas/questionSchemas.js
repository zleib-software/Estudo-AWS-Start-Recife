import { z } from 'zod';

// ─── Schema base de uma questão ───
// answer precisa ser índice válido de options → resolvido via .refine()
const questionBase = z
  .object({
    domainId: z
      .number({ required_error: 'domainId é obrigatório' })
      .int()
      .min(1, 'domainId deve ser entre 1 e 4')
      .max(4, 'domainId deve ser entre 1 e 4'),
    question: z
      .string({ required_error: 'question é obrigatório' })
      .min(10, 'question deve ter no mínimo 10 caracteres')
      .trim(),
    options: z
      .array(z.string().min(1, 'Alternativa não pode ser vazia'))
      .min(2, 'É necessário no mínimo 2 alternativas')
      .max(10, 'Máximo de 10 alternativas'),
    answer: z
      .number({ required_error: 'answer é obrigatório' })
      .int('answer deve ser inteiro'),
    explanation: z.string().trim().default(''),
    source: z.string().trim().optional(),
    active: z.boolean().optional().default(true),
  })
  .refine(
    (data) => data.answer >= 0 && data.answer < data.options.length,
    {
      message: 'answer deve ser um índice válido dentro de options (0 a options.length - 1)',
      path: ['answer'],
    }
  );

// ─── Create: todos os campos obrigatórios ───
export const createQuestionSchema = questionBase;

// ─── Update: todos os campos opcionais, mas se fornecidos, valida tudo ───
// Como o .refine() depende de options+answer existirem juntos,
// usamos .partial() no objeto interno e re-aplicamos o refine condicionalmente.
export const updateQuestionSchema = z
  .object({
    domainId: z.number().int().min(1).max(4).optional(),
    question: z.string().min(10).trim().optional(),
    options: z
      .array(z.string().min(1))
      .min(2)
      .max(10)
      .optional(),
    answer: z.number().int().optional(),
    explanation: z.string().trim().optional(),
    source: z.string().trim().optional(),
    active: z.boolean().optional(),
  })
  .refine(
    (data) => {
      // Se ambos estão presentes, valida índice
      if (data.answer !== undefined && data.options !== undefined) {
        return data.answer >= 0 && data.answer < data.options.length;
      }
      // Se só answer veio sem options, não temos como validar aqui —
      // a checagem final contra o doc existente é feita no controller
      return true;
    },
    {
      message: 'answer deve ser um índice válido dentro de options',
      path: ['answer'],
    }
  );

// ─── Import preview: array de questões vindas do parser ───
export const importPreviewItemSchema = z
  .object({
    domainId: z.number().int().min(1).max(4),
    question: z.string().min(10).trim(),
    options: z.array(z.string().min(1)).min(2).max(10),
    answer: z.number().int(),
    explanation: z.string().trim().default(''),
  })
  .refine(
    (data) => data.answer >= 0 && data.answer < data.options.length,
    {
      message: 'answer deve ser um índice válido dentro de options',
      path: ['answer'],
    }
  );

export const importConfirmSchema = z.object({
  questions: z
    .array(importPreviewItemSchema)
    .min(1, 'Envie ao menos 1 questão'),
  source: z.string().trim().optional(),
});

// ─── Query params de GET /api/questions ───
export const questionsQuerySchema = z.object({
  domainId: z.coerce.number().int().min(1).max(4).optional(),
  count: z.coerce.number().int().min(1).max(500).optional(),
});
