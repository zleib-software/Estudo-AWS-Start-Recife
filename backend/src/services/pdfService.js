import pdf from 'pdf-parse/lib/pdf-parse.js';

/**
 * Extrai texto bruto de um buffer de PDF.
 * @param {Buffer} buffer — conteúdo do arquivo PDF
 * @returns {Promise<string>} texto extraído
 */
export async function extractTextFromPDF(buffer) {
  const data = await pdf(buffer);
  return data.text;
}
