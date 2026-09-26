// ─── Tipos compartilhados do AWS Simulado ───

export interface Question {
  id: string;
  domainId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  source?: string;
  active?: boolean;
}

export interface Domain {
  id: number;
  name: string;
  weight: number;
  description: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: {
    message: string;
    code: string;
    details?: unknown[];
  };
}

export interface DomainStats {
  total: number;
  correct: number;
}

export interface AttemptRecord {
  id: number;
  date: string;
  scoreScaled: number;
  percentage: number;
  correct: number;
  total: number;
  mode: 'practice' | 'exam';
  domain: number;
  isPassed: boolean;
}

export interface QuizState {
  domain: number;
  count: number | 'all';
  mode: 'practice' | 'exam';
  questions: Question[];
  currentIndex: number;
  userAnswers: Record<number, number>;
  flagged: Record<number, boolean>;
  examTimeLeft: number;
  timestamp?: number;
}
