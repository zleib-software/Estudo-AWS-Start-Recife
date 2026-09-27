'use client';

import type { Question } from '@/lib/types';
import ExplanationBox from './ExplanationBox';
import {
  isMultiSelectQuestion,
  getRequiredSelections,
  getNormalizedExpectedAnswers,
  getNormalizedUserAnswers,
} from '@/lib/quizUtils';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  mode: 'practice' | 'exam';
  selectedAnswer?: number | number[];
  onSelectAnswer: (index: number) => void;
  domainName: string;
}

export default function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  mode,
  selectedAnswer,
  onSelectAnswer,
  domainName,
}: QuestionCardProps) {
  const isPractice = mode === 'practice';
  const isMulti = isMultiSelectQuestion(question);
  const requiredCount = getRequiredSelections(question);

  const selectedList = getNormalizedUserAnswers(selectedAnswer);
  const expectedList = getNormalizedExpectedAnswers(question);

  // In practice mode: single select evaluates on click; multi-select evaluates once required count is picked
  const isEvaluated = isPractice && (isMulti ? selectedList.length >= requiredCount : selectedList.length > 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 animate-fadeIn border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-aws-navy">
            Questão {currentIndex + 1} de {totalQuestions}
          </h2>
          {isMulti && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-aws-blue border border-blue-200/60">
              Múltipla Escolha ({requiredCount} respostas)
            </span>
          )}
        </div>
        <span className="text-sm font-semibold text-aws-blue mt-1 md:mt-0">
          {domainName}
        </span>
      </div>

      <p className="text-gray-800 text-lg leading-relaxed mb-6">
        {question.question}
      </p>

      {isMulti && (
        <div className="mb-4 flex items-center justify-between text-xs font-medium text-gray-500 bg-gray-50/80 px-4 py-2 rounded-lg border border-gray-200/60">
          <span>
            {isEvaluated
              ? 'Avaliação concluída:'
              : `Selecione exatamente ${requiredCount} alternativas:`}
          </span>
          <span className={`font-bold ${selectedList.length === requiredCount ? 'text-green-600' : 'text-aws-blue'}`}>
            {selectedList.length} de {requiredCount} selecionadas
          </span>
        </div>
      )}

      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedList.includes(idx);
          const isCorrect = expectedList.includes(idx);

          let btnClass = 'border-gray-200 hover:border-aws-orange hover:bg-orange-50';
          let indicatorClass = isMulti ? 'rounded-lg bg-gray-100 text-gray-500' : 'rounded-full bg-gray-100 text-gray-500';

          if (isSelected) {
            btnClass = 'border-aws-orange bg-orange-50 ring-2 ring-aws-orange/20';
            indicatorClass = isMulti ? 'rounded-lg bg-aws-orange text-white' : 'rounded-full bg-aws-orange text-white';
          }

          // In practice mode, once evaluated, show results for all options
          if (isEvaluated) {
            if (isCorrect && isSelected) {
              btnClass = 'border-green-500 bg-green-50 ring-2 ring-green-500/20';
              indicatorClass = isMulti ? 'rounded-lg bg-green-500 text-white' : 'rounded-full bg-green-500 text-white';
            } else if (!isCorrect && isSelected) {
              btnClass = 'border-red-500 bg-red-50 ring-2 ring-red-500/20';
              indicatorClass = isMulti ? 'rounded-lg bg-red-500 text-white' : 'rounded-full bg-red-500 text-white';
            } else if (isCorrect && !isSelected) {
              // Option was correct but the user missed selecting it
              btnClass = 'border-green-400 bg-green-50/50 border-dashed ring-1 ring-green-400/30';
              indicatorClass = isMulti ? 'rounded-lg bg-green-100 text-green-700 border border-green-400' : 'rounded-full bg-green-100 text-green-700 border border-green-400';
            } else {
              // Unselected incorrect options fade out slightly
              btnClass = 'border-gray-100 opacity-60';
              indicatorClass = isMulti ? 'rounded-lg bg-gray-100 text-gray-400' : 'rounded-full bg-gray-100 text-gray-400';
            }
          }

          const letter = String.fromCharCode(65 + idx); // A, B, C, D...

          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                if (isEvaluated) return; // Locked once fully evaluated in practice mode
                onSelectAnswer(idx);
              }}
              disabled={isEvaluated}
              className={`w-full flex items-start text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer disabled:cursor-default ${btnClass}`}
            >
              <span
                className={`shrink-0 w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 transition-colors ${indicatorClass}`}
              >
                {isEvaluated && isCorrect && isSelected ? (
                  '✓'
                ) : isEvaluated && !isCorrect && isSelected ? (
                  '✗'
                ) : (
                  letter
                )}
              </span>
              <div className="flex-1 mt-1">
                <span
                  className={`font-medium ${
                    isEvaluated && isCorrect
                      ? 'text-green-800'
                      : isEvaluated && isSelected && !isCorrect
                      ? 'text-red-800'
                      : 'text-gray-700'
                  }`}
                >
                  {option}
                </span>
                {isEvaluated && isCorrect && !isSelected && (
                  <span className="ml-2 text-xs font-semibold text-green-600 bg-green-100/80 px-2 py-0.5 rounded-full inline-block">
                    Correta não selecionada
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {isEvaluated && (
        <div className="mt-8 p-5 md:p-6 bg-slate-50/90 rounded-2xl border border-slate-200 shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-aws-blue/10 text-aws-blue">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
            </span>
            <h4 className="font-bold text-aws-navy text-sm md:text-base">
              Explicação Detalhada
            </h4>
          </div>
          <ExplanationBox explanation={question.explanation} />
        </div>
      )}
    </div>
  );
}
