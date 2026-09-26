export const EXAM_TIME_SECONDS = 5400; // 90 minutos
export const PASS_SCORE = 700;
export const MAX_SCORE = 1000;
export const MIN_SCORE = 100;
export const MAX_HISTORY_ENTRIES = 30;

export const DOMAIN_NAMES: Record<number, string> = {
  0: 'Todos os Domínios',
  1: 'Domínio 1: Conceitos de Nuvem',
  2: 'Domínio 2: Segurança e Conformidade',
  3: 'Domínio 3: Tecnologia e Serviços',
  4: 'Domínio 4: Cobrança, Finanças e Suporte',
};

export const DOMAIN_SHORT_NAMES: Record<number, string> = {
  0: 'Todos os Domínios',
  1: 'Domínio 1: Conceitos',
  2: 'Domínio 2: Segurança',
  3: 'Domínio 3: Tecnologia',
  4: 'Domínio 4: Finanças',
};

export const QUESTION_COUNTS = [25, 45, 65] as const;
