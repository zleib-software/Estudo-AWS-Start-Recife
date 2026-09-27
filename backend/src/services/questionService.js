import { getDB, persistDB } from '../config/db.js';

export async function listQuestions({ domainId, count } = {}) {
  const db = getDB();
  let filtered = db.filter((q) => q.active !== false);

  if (domainId) {
    const dId = Number(domainId);
    filtered = filtered.filter((q) => q.domainId === dId);
  }

  if (count) {
    const num = Math.min(Number(count), filtered.length);
    // Embaralhar aleatoriamente como no ORDER BY RANDOM()
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, num);
  }

  return [...filtered].sort((a, b) => {
    if (a.domainId !== b.domainId) return a.domainId - b.domainId;
    return (Number(a.id) || 0) - (Number(b.id) || 0);
  });
}

export async function getQuestionById(id) {
  const db = getDB();
  const found = db.find((q) => String(q.id) === String(id));
  return found || null;
}

export async function createQuestion(data) {
  const db = getDB();

  // Calcular próximo ID numérico sequencial
  const maxId = db.reduce((max, q) => Math.max(max, Number(q.id) || 0), 0);
  const newQuestion = {
    id: String(maxId + 1),
    domainId: data.domainId,
    question: data.question,
    options: data.options,
    answer: data.answer,
    explanation: data.explanation || '',
    source: data.source || 'MANUAL_ENTRY',
    active: true,
    ...(data.multiSelect !== undefined ? { multiSelect: data.multiSelect } : {}),
    ...(data.requiredSelections !== undefined ? { requiredSelections: data.requiredSelections } : {}),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.push(newQuestion);
  await persistDB();

  return newQuestion;
}

export async function updateQuestion(id, data) {
  const db = getDB();
  const index = db.findIndex((q) => String(q.id) === String(id));
  if (index === -1) return null;

  const existing = db[index];

  // Se answer veio sem options, validar contra as opções existentes
  if (data.answer !== undefined && data.options === undefined) {
    const answers = Array.isArray(data.answer) ? data.answer : [data.answer];
    for (const ans of answers) {
      if (ans < 0 || ans >= existing.options.length) {
        const err = new Error(
          `answer (${ans}) não é um índice válido de options (0-${existing.options.length - 1})`
        );
        err.statusCode = 400;
        err.code = 'VALIDATION_ERROR';
        throw err;
      }
    }
  }

  const updated = {
    ...existing,
    domainId: data.domainId !== undefined ? data.domainId : existing.domainId,
    question: data.question !== undefined ? data.question : existing.question,
    options: data.options !== undefined ? data.options : existing.options,
    answer: data.answer !== undefined ? data.answer : existing.answer,
    explanation: data.explanation !== undefined ? data.explanation : existing.explanation,
    source: data.source !== undefined ? data.source : existing.source,
    active: data.active !== undefined ? Boolean(data.active) : existing.active,
    ...(data.multiSelect !== undefined ? { multiSelect: data.multiSelect } : {}),
    ...(data.requiredSelections !== undefined ? { requiredSelections: data.requiredSelections } : {}),
    updatedAt: new Date().toISOString(),
  };

  db[index] = updated;
  await persistDB();

  return updated;
}

export async function deleteQuestion(id) {
  const db = getDB();
  const index = db.findIndex((q) => String(q.id) === String(id));
  if (index === -1) return null;

  db[index] = {
    ...db[index],
    active: false,
    updatedAt: new Date().toISOString(),
  };

  await persistDB();
  return db[index];
}

export async function bulkInsertQuestions(questions) {
  const db = getDB();
  const inserted = [];

  let currentMaxId = db.reduce((max, q) => Math.max(max, Number(q.id) || 0), 0);

  for (const data of questions) {
    currentMaxId++;
    const q = {
      id: String(currentMaxId),
      domainId: data.domainId,
      question: data.question,
      options: data.options,
      answer: data.answer,
      explanation: data.explanation || '',
      source: data.source || 'MANUAL_ENTRY',
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.push(q);
    inserted.push(q);
  }

  await persistDB();
  return inserted;
}
