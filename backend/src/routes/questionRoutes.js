import { Router } from 'express';
import {
  listQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../controllers/questionController.js';
import { apiKeyAuth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import {
  createQuestionSchema,
  updateQuestionSchema,
  questionsQuerySchema,
} from '../schemas/questionSchemas.js';

const router = Router();

// ─── Leitura (públicas) ───
router.get('/', validate(questionsQuerySchema, 'query'), listQuestions);
router.get('/:id', getQuestion);

// ─── Escrita (protegidas por API key) ───
router.post('/', apiKeyAuth, validate(createQuestionSchema), createQuestion);
router.put('/:id', apiKeyAuth, validate(updateQuestionSchema), updateQuestion);
router.delete('/:id', apiKeyAuth, deleteQuestion);

export default router;
