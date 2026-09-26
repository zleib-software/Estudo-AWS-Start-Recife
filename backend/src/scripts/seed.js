import 'dotenv/config';
import { connectDB, getDB } from '../config/db.js';
import INITIAL_QUESTIONS from './initialQuestions.js';

async function seed() {
  await connectDB();
  const db = getDB();

  const result = await db.get(
    "SELECT COUNT(*) as count FROM questions WHERE source = 'QUESTION_BANK_INITIAL'"
  );
  
  if (result.count > 0) {
    console.log(
      `[Seed] Já existem ${result.count} questões iniciais no banco. Pulando seed.`
    );
    console.log(
      '[Seed] Para re-popular, apague as questões com source=QUESTION_BANK_INITIAL primeiro.'
    );
  } else {
    let inserted = 0;
    
    const stmt = await db.prepare(
      `INSERT INTO questions (domainId, question, options, answer, explanation, source)
       VALUES (?, ?, ?, ?, ?, ?)`
    );
    
    for (const data of INITIAL_QUESTIONS) {
      await stmt.run(
        data.domainId,
        data.question,
        JSON.stringify(data.options),
        data.answer,
        data.explanation || '',
        data.source || 'QUESTION_BANK_INITIAL'
      );
      inserted++;
    }
    
    await stmt.finalize();

    console.log(`[Seed] ✅ ${inserted} questões inseridas com sucesso!`);
  }

  console.log('[Seed] Script concluído.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('[Seed] Erro:', err);
  process.exit(1);
});
