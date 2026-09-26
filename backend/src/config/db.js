import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dbInstance = null;

export async function connectDB() {
  if (dbInstance) return dbInstance;
  
  // O arquivo de banco local ficará na raiz da pasta backend (2 níveis acima de src/config)
  const defaultDbPath = path.resolve(__dirname, '../../database.sqlite');
  const dbPath = process.env.SQLITE_DB_PATH || defaultDbPath;
  
  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Criar tabela se não existir
  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      domainId INTEGER NOT NULL,
      question TEXT NOT NULL,
      options TEXT NOT NULL,
      answer INTEGER NOT NULL,
      explanation TEXT DEFAULT '',
      source TEXT DEFAULT 'MANUAL_ENTRY',
      active INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  console.log(`[SQLite] Conectado. Banco de dados em: ${dbPath}`);
  return dbInstance;
}

export function getDB() {
  if (!dbInstance) {
    throw new Error('Banco de dados não foi inicializado. Chame connectDB primeiro.');
  }
  return dbInstance;
}
