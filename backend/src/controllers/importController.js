import { extractTextFromPDF } from '../services/pdfService.js';
import { parseQuestions } from '../services/parserService.js';
import * as questionService from '../services/questionService.js';
import { importConfirmSchema } from '../schemas/questionSchemas.js';

/**
 * POST /api/questions/import/preview
 * Recebe PDF (multipart), extrai texto, parseia e retorna JSON sem gravar.
 */
export async function importPreview(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Nenhum arquivo PDF enviado. Use o campo "file" no multipart.',
          code: 'MISSING_FILE',
        },
      });
    }

    // 1. Extrair texto do PDF
    const rawText = await extractTextFromPDF(req.file.buffer);
    if (!rawText || rawText.trim().length < 50) {
      return res.status(422).json({
        success: false,
        error: {
          message: 'O PDF não contém texto suficiente para extração.',
          code: 'EMPTY_PDF',
        },
      });
    }

    // 2. Parsear questões (regex → fallback LLM)
    const { questions, method } = await parseQuestions(rawText);

    res.json({
      success: true,
      data: {
        questions,
        meta: {
          totalExtracted: questions.length,
          method,
          fileName: req.file.originalname,
          warnings: questions.length === 0
            ? ['Nenhuma questão foi detectada no PDF. Verifique o formato.']
            : [],
        },
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/questions/import/confirm
 * Recebe lista de questões revisada e grava no banco.
 */
export async function importConfirm(req, res, next) {
  try {
    // Validação Zod do payload completo
    const parsed = importConfirmSchema.parse(req.body);
    const { questions, source } = parsed;

    // Adicionar source a todas as questões
    const questionsWithSource = questions.map((q) => ({
      ...q,
      source: source || 'PDF_IMPORT',
      active: true,
    }));

    const inserted = await questionService.bulkInsertQuestions(questionsWithSource);

    res.status(201).json({
      success: true,
      data: {
        inserted: inserted.length,
        questions: inserted,
      },
    });
  } catch (err) {
    next(err);
  }
}
