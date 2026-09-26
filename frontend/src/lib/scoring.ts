import { MIN_SCORE, MAX_SCORE, PASS_SCORE } from '@/config/constants';

/**
 * Calcula a nota escalada AWS (100–1000).
 * Fórmula: 100 + (percentual * 900 / 100)
 */
export function calculateScaledScore(correct: number, total: number): number {
  if (total === 0) return MIN_SCORE;
  const percentage = (correct / total) * 100;
  return Math.round(MIN_SCORE + (percentage * (MAX_SCORE - MIN_SCORE)) / 100);
}

/**
 * Verifica se a nota escalada atinge o corte de aprovação (700).
 */
export function isPassing(scaledScore: number): boolean {
  return scaledScore >= PASS_SCORE;
}

/**
 * Calcula percentual de acerto.
 */
export function calculatePercentage(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}
