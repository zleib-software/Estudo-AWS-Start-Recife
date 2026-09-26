import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, getDB } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  await connectDB();
  const db = getDB();

  const jsonPath = path.resolve(__dirname, '../../../questoes_extracted/all_questions.json');
  if (!fs.existsSync(jsonPath)) {
    console.error(`[SeedExtracted] Arquivo não encontrado: ${jsonPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(jsonPath, 'utf-8');
  const questions = JSON.parse(raw);
  console.log(`[SeedExtracted] Carregadas ${questions.length} questões extraídas.`);

  // Buscar questões já existentes para evitar duplicatas por texto
  const existingRows = await db.all('SELECT question FROM questions');
  const existingSet = new Set(
    existingRows.map((r) => r.question.trim().toLowerCase())
  );

  console.log(`[SeedExtracted] Questões já presentes no banco: ${existingRows.length}`);

  let insertedCount = 0;
  let skippedCount = 0;

  const stmt = await db.prepare(
    `INSERT INTO questions (domainId, question, options, answer, explanation, source)
     VALUES (?, ?, ?, ?, ?, ?)`
  );

  for (const q of questions) {
    const norm = q.question.trim().toLowerCase();
    if (existingSet.has(norm)) {
      skippedCount++;
      continue;
    }

    await stmt.run(
      q.domainId,
      q.question.trim(),
      JSON.stringify(q.options),
      q.answer,
      q.explanation || '',
      'PDF_SIMULADO'
    );

    existingSet.add(norm);
    insertedCount++;
  }

  await stmt.finalize();

  const totalCount = await db.get('SELECT COUNT(*) as count FROM questions');

  console.log(`[SeedExtracted] ✅ Inseridas: ${insertedCount}`);
  console.log(`[SeedExtracted] ⏭️ Puladas (duplicadas): ${skippedCount}`);
  console.log(`[SeedExtracted] 📊 Total de questões no banco agora: ${totalCount.count}`);

  process.exit(0);
}

run().catch((err) => {
  console.error('[SeedExtracted] Erro fatal:', err);
  process.exit(1);
});
