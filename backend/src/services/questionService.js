import { getDB } from '../config/db.js';

/**
 * Converte a linha do banco SQLite para o formato esperado pelo frontend (o mesmo do MongoDB).
 */
function mapQuestion(row) {
  if (!row) return null;
  return {
    id: row.id.toString(),
    domainId: row.domainId,
    question: row.question,
    options: JSON.parse(row.options),
    answer: row.answer,
    explanation: row.explanation,
    source: row.source,
    active: row.active === 1
  };
}

export async function listQuestions({ domainId, count } = {}) {
  const db = getDB();
  let query = 'SELECT * FROM questions WHERE active = 1';
  const params = [];

  if (domainId) {
    query += ' AND domainId = ?';
    params.push(domainId);
  }

  if (count) {
    query += ' ORDER BY RANDOM() LIMIT ?';
    params.push(count);
  } else {
    query += ' ORDER BY domainId ASC';
  }

  const rows = await db.all(query, ...params);
  return rows.map(mapQuestion);
}

export async function getQuestionById(id) {
  const db = getDB();
  const row = await db.get('SELECT * FROM questions WHERE id = ?', id);
  return mapQuestion(row);
}

export async function createQuestion(data) {
  const db = getDB();
  const result = await db.run(
    `INSERT INTO questions (domainId, question, options, answer, explanation, source)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.domainId,
      data.question,
      JSON.stringify(data.options),
      data.answer,
      data.explanation || '',
      data.source || 'MANUAL_ENTRY'
    ]
  );
  
  return getQuestionById(result.lastID);
}

export async function updateQuestion(id, data) {
  const db = getDB();
  const existingRow = await db.get('SELECT * FROM questions WHERE id = ?', id);
  if (!existingRow) return null;
  
  const existing = mapQuestion(existingRow);

  // Se answer veio sem options, validar contra as opções existentes (mesma lógica do Mongoose)
  if (data.answer !== undefined && data.options === undefined) {
    if (data.answer < 0 || data.answer >= existing.options.length) {
      const err = new Error(
        `answer (${data.answer}) não é um índice válido de options (0-${existing.options.length - 1})`
      );
      err.statusCode = 400;
      err.code = 'VALIDATION_ERROR';
      throw err;
    }
  }

  // Prepara o update mesclando os dados
  const newDomainId = data.domainId !== undefined ? data.domainId : existing.domainId;
  const newQuestion = data.question !== undefined ? data.question : existing.question;
  const newOptions = data.options !== undefined ? JSON.stringify(data.options) : existingRow.options;
  const newAnswer = data.answer !== undefined ? data.answer : existing.answer;
  const newExplanation = data.explanation !== undefined ? data.explanation : existing.explanation;
  const newSource = data.source !== undefined ? data.source : existing.source;
  const newActive = data.active !== undefined ? (data.active ? 1 : 0) : existingRow.active;

  await db.run(
    `UPDATE questions SET 
      domainId = ?, 
      question = ?, 
      options = ?, 
      answer = ?, 
      explanation = ?, 
      source = ?, 
      active = ?,
      updatedAt = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [newDomainId, newQuestion, newOptions, newAnswer, newExplanation, newSource, newActive, id]
  );

  return getQuestionById(id);
}

export async function deleteQuestion(id) {
  const db = getDB();
  await db.run('UPDATE questions SET active = 0, updatedAt = CURRENT_TIMESTAMP WHERE id = ?', id);
  return getQuestionById(id);
}

export async function bulkInsertQuestions(questions) {
  const db = getDB();
  const insertedIds = [];
  
  // Usar uma transação para inserir em lote
  await db.run('BEGIN TRANSACTION');
  try {
    const stmt = await db.prepare(
      `INSERT INTO questions (domainId, question, options, answer, explanation, source)
       VALUES (?, ?, ?, ?, ?, ?)`
    );
    
    for (const data of questions) {
      const result = await stmt.run(
        data.domainId,
        data.question,
        JSON.stringify(data.options),
        data.answer,
        data.explanation || '',
        data.source || 'PDF_IMPORT'
      );
      insertedIds.push(result.lastID);
    }
    
    await stmt.finalize();
    await db.run('COMMIT');
  } catch (err) {
    await db.run('ROLLBACK');
    throw err;
  }

  const placeholders = insertedIds.map(() => '?').join(',');
  const rows = await db.all(`SELECT * FROM questions WHERE id IN (${placeholders})`, insertedIds);
  return rows.map(mapQuestion);
}
