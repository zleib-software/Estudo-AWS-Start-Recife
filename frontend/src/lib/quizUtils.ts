import type { Question } from './types';

export function isMultiSelectQuestion(q?: Question): boolean {
  if (!q) return false;
  return Boolean(
    q.multiSelect ||
    Array.isArray(q.answer) ||
    (q.requiredSelections && q.requiredSelections > 1)
  );
}

export function getRequiredSelections(q?: Question): number {
  if (!q) return 1;
  if (q.requiredSelections && q.requiredSelections > 0) {
    return q.requiredSelections;
  }
  if (Array.isArray(q.answer)) {
    return q.answer.length;
  }
  return 1;
}

export function getNormalizedExpectedAnswers(q?: Question): number[] {
  if (!q) return [];
  if (Array.isArray(q.answer)) {
    return [...q.answer].sort((a, b) => a - b);
  }
  return [q.answer];
}

export function getNormalizedUserAnswers(userAnswer?: number | number[]): number[] {
  if (userAnswer === undefined) return [];
  if (Array.isArray(userAnswer)) {
    return [...userAnswer].sort((a, b) => a - b);
  }
  return [userAnswer];
}

export function isAnswerCorrect(q: Question, userAnswer?: number | number[]): boolean {
  if (userAnswer === undefined) return false;
  const expected = getNormalizedExpectedAnswers(q);
  const actual = getNormalizedUserAnswers(userAnswer);

  if (expected.length !== actual.length) return false;
  return expected.every((val, i) => val === actual[i]);
}

export function isQuestionAnswered(q: Question, userAnswer?: number | number[]): boolean {
  if (userAnswer === undefined) return false;
  if (Array.isArray(userAnswer)) {
    return userAnswer.length > 0;
  }
  return true;
}
