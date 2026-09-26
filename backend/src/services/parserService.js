import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import env from '../config/env.js';

/**
 * Parser de texto de PDF → questões estruturadas.
 *
 * Estratégia híbrida:
 * 1. Tenta parser via regex (rápido, sem custo)
 * 2. Se regex falha ou extrai poucas questões, usa LLM (claude-haiku-4-5-20251001)
 *    com saída estruturada via tool_use + schema Zod
 */

// ─── Schema Zod que define o formato exato esperado ───
const questionItemSchema = z.object({
  domainId: z.number().int().min(1).max(4),
  question: z.string().min(10),
  options: z.array(z.string().min(1)).min(2).max(10),
  answer: z.number().int().min(0),
  explanation: z.string().default(''),
});

const parsedQuestionsSchema = z.object({
  questions: z.array(questionItemSchema),
});

// ─── JSON Schema equivalente para tool_use da Anthropic ───
const toolInputSchema = {
  type: 'object',
  properties: {
    questions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          domainId: {
            type: 'number',
            description:
              'Domínio da questão: 1=Conceitos de Nuvem, 2=Segurança e Conformidade, 3=Tecnologia e Serviços, 4=Cobrança/Finanças/Suporte',
          },
          question: {
            type: 'string',
            description: 'Enunciado completo da questão',
          },
          options: {
            type: 'array',
            items: { type: 'string' },
            description: 'Lista de alternativas (A, B, C, D…)',
          },
          answer: {
            type: 'number',
            description:
              'Índice (0-based) da alternativa correta dentro do array options',
          },
          explanation: {
            type: 'string',
            description:
              'Explicação técnica de por que a resposta está correta',
          },
        },
        required: ['domainId', 'question', 'options', 'answer', 'explanation'],
      },
    },
  },
  required: ['questions'],
};

// ─── Parser Regex ───
export function parseWithRegex(rawText) {
  const questions = [];

  // Padrão comum: "Questão N." ou "N)" ou "Pergunta N:" seguido de texto,
  // depois A) B) C) D) alternativas, depois "Resposta:" ou "Gabarito:"
  const questionBlockRegex =
    /(?:Quest[ãa]o|Pergunta)\s*(\d+)[.:)\-]\s*([\s\S]*?)(?=(?:Quest[ãa]o|Pergunta)\s*\d+[.:)\-]|$)/gi;

  const optionRegex = /^[A-E][.)]\s*(.+)/gm;
  const answerRegex =
    /(?:Resposta|Gabarito|Alternativa\s+correta|Correta)[:\s]*([A-E])/i;
  const explanationRegex =
    /(?:Explica[çc][ãa]o|Justificativa|Coment[áa]rio)[:\s]*([\s\S]*?)(?=(?:Quest[ãa]o|Pergunta)\s*\d+|$)/i;

  let match;
  while ((match = questionBlockRegex.exec(rawText)) !== null) {
    const blockText = match[2].trim();

    // Extrair alternativas
    const options = [];
    let optMatch;
    const optRe = /^[A-E][.)]\s*(.+)/gm;
    while ((optMatch = optRe.exec(blockText)) !== null) {
      options.push(optMatch[1].trim());
    }
    if (options.length < 2) continue;

    // Extrair enunciado (tudo antes da primeira alternativa)
    const firstOptIdx = blockText.search(/^[A-E][.)]\s/m);
    const questionText =
      firstOptIdx > 0 ? blockText.substring(0, firstOptIdx).trim() : blockText;
    if (questionText.length < 10) continue;

    // Extrair resposta correta
    const ansMatch = answerRegex.exec(blockText);
    let answerIdx = 0;
    if (ansMatch) {
      answerIdx = ansMatch[1].toUpperCase().charCodeAt(0) - 65;
    }

    // Extrair explicação
    const expMatch = explanationRegex.exec(blockText);
    const explanation = expMatch ? expMatch[1].trim() : '';

    // Inferir domínio básico (fallback = 1)
    let domainId = 1;
    const lowerQ = questionText.toLowerCase();
    if (
      lowerQ.includes('segurança') ||
      lowerQ.includes('iam') ||
      lowerQ.includes('responsabilidade compartilhada') ||
      lowerQ.includes('waf') ||
      lowerQ.includes('kms') ||
      lowerQ.includes('guardduty')
    ) {
      domainId = 2;
    } else if (
      lowerQ.includes('ec2') ||
      lowerQ.includes('lambda') ||
      lowerQ.includes('s3') ||
      lowerQ.includes('rds') ||
      lowerQ.includes('vpc') ||
      lowerQ.includes('cloudfront') ||
      lowerQ.includes('dynamodb')
    ) {
      domainId = 3;
    } else if (
      lowerQ.includes('custo') ||
      lowerQ.includes('budget') ||
      lowerQ.includes('pricing') ||
      lowerQ.includes('suporte') ||
      lowerQ.includes('free tier') ||
      lowerQ.includes('faturamento')
    ) {
      domainId = 4;
    }

    questions.push({
      domainId,
      question: questionText,
      options,
      answer: Math.min(answerIdx, options.length - 1),
      explanation,
    });
  }

  return questions;
}

// ─── Parser LLM (Anthropic Claude) ───
export async function parseWithLLM(rawText) {
  if (!env.ANTHROPIC_API_KEY) {
    throw Object.assign(
      new Error(
        'ANTHROPIC_API_KEY não configurada. Necessária para importação via LLM.'
      ),
      { statusCode: 500, code: 'SERVER_CONFIG_ERROR' }
    );
  }

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

  // Truncar texto muito longo (limite seguro para o contexto do Haiku)
  const maxChars = 180_000;
  const textToSend =
    rawText.length > maxChars ? rawText.substring(0, maxChars) : rawText;

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 8192,
    system: `Você é um parser especializado em extrair questões de simulados AWS CLF-C02 a partir de texto bruto de PDFs.

Regras:
- Extraia TODAS as questões encontradas no texto.
- Cada questão deve ter: domainId (1=Conceitos de Nuvem, 2=Segurança e Conformidade, 3=Tecnologia e Serviços, 4=Cobrança/Finanças/Suporte), question (enunciado completo), options (array de alternativas), answer (índice 0-based da correta), explanation (justificativa técnica).
- Se o gabarito/resposta não estiver explícito no texto, infira baseado no seu conhecimento do exame CLF-C02.
- Forneça uma explicação técnica para cada questão, mesmo que o PDF não a contenha.
- O campo answer DEVE ser um número inteiro correspondente ao índice (0-based) da alternativa correta no array options.`,
    tools: [
      {
        name: 'save_parsed_questions',
        description:
          'Salva as questões extraídas e estruturadas do texto do PDF.',
        input_schema: toolInputSchema,
      },
    ],
    tool_choice: { type: 'tool', name: 'save_parsed_questions' },
    messages: [
      {
        role: 'user',
        content: `Extraia todas as questões do seguinte texto de PDF de simulado AWS:\n\n${textToSend}`,
      },
    ],
  });

  // Extrair o tool_use block da resposta
  const toolBlock = response.content.find((b) => b.type === 'tool_use');
  if (!toolBlock || !toolBlock.input) {
    throw Object.assign(
      new Error('LLM não retornou dados estruturados via tool_use'),
      { statusCode: 502, code: 'LLM_PARSE_ERROR' }
    );
  }

  // Validar saída da LLM contra o schema Zod
  const parsed = parsedQuestionsSchema.parse(toolBlock.input);

  // Validação extra: answer é índice válido
  for (const q of parsed.questions) {
    if (q.answer < 0 || q.answer >= q.options.length) {
      q.answer = 0; // Fallback seguro, marcado para revisão humana
    }
  }

  return parsed.questions;
}

/**
 * Estratégia híbrida: tenta regex primeiro, fallback para LLM.
 * @param {string} rawText — texto bruto extraído do PDF
 * @returns {Promise<Array>} questões parseadas
 */
export async function parseQuestions(rawText) {
  // 1. Tentar regex
  const regexResult = parseWithRegex(rawText);
  if (regexResult.length >= 3) {
    console.log(
      `[Parser] Regex extraiu ${regexResult.length} questões com sucesso`
    );
    return { questions: regexResult, method: 'regex' };
  }

  // 2. Fallback para LLM
  console.log(
    `[Parser] Regex extraiu apenas ${regexResult.length} questão(ões). Usando LLM...`
  );
  const llmResult = await parseWithLLM(rawText);
  return { questions: llmResult, method: 'llm' };
}
