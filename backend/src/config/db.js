import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.resolve(__dirname, '../data/questions.json');

let questionsCache = null;

/**
 * Carrega as questões do arquivo JSON para a memória.
 */
export async function connectDB() {
  if (questionsCache !== null) return questionsCache;

  if (!fs.existsSync(DATA_FILE)) {
    console.warn(`[JSON DB] Arquivo ${DATA_FILE} não encontrado. Inicializando array vazio.`);
    questionsCache = [];
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
  } else {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    try {
      questionsCache = JSON.parse(raw);
    } catch (err) {
      console.error('[JSON DB] Erro ao parsear questions.json:', err);
      questionsCache = [];
    }
  }

  console.log(`[JSON DB] Banco inicializado com sucesso (${questionsCache.length} questões carregadas).`);
  return questionsCache;
}

/**
 * Retorna as questões em memória.
 */
export function getDB() {
  if (questionsCache === null) {
    throw new Error('Banco de dados não foi inicializado. Chame connectDB primeiro.');
  }
  return questionsCache;
}

/**
 * Persiste as alterações no arquivo questions.json.
 */
export async function persistDB() {
  if (questionsCache === null) return;
  try {
    await fs.promises.writeFile(DATA_FILE, JSON.stringify(questionsCache, null, 2), 'utf-8');
  } catch (err) {
    console.error('[JSON DB] Erro ao persistir questions.json:', err);
  }
}
