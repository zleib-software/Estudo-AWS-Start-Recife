import * as questionService from '../services/questionService.js';

/**
 * GET /api/questions
 * Query params: domainId (opcional), count (opcional)
 */
export async function listQuestions(req, res, next) {
  try {
    const { domainId, count } = req.query;
    const questions = await questionService.listQuestions({ domainId, count });
    res.json({ success: true, data: questions });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/questions/:id
 */
export async function getQuestion(req, res, next) {
  try {
    const question = await questionService.getQuestionById(req.params.id);
    if (!question) {
      return res.status(404).json({
        success: false,
        error: { message: 'Questão não encontrada', code: 'NOT_FOUND' },
      });
    }
    res.json({ success: true, data: question });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/questions
 */
export async function createQuestion(req, res, next) {
  try {
    const question = await questionService.createQuestion(req.body);
    res.status(201).json({ success: true, data: question });
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/questions/:id
 */
export async function updateQuestion(req, res, next) {
  try {
    const question = await questionService.updateQuestion(req.params.id, req.body);
    if (!question) {
      return res.status(404).json({
        success: false,
        error: { message: 'Questão não encontrada', code: 'NOT_FOUND' },
      });
    }
    res.json({ success: true, data: question });
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/questions/:id (soft-delete)
 */
export async function deleteQuestion(req, res, next) {
  try {
    const question = await questionService.deleteQuestion(req.params.id);
    if (!question) {
      return res.status(404).json({
        success: false,
        error: { message: 'Questão não encontrada', code: 'NOT_FOUND' },
      });
    }
    res.json({
      success: true,
      message: 'Questão desativada com sucesso',
      data: question,
    });
  } catch (err) {
    next(err);
  }
}
