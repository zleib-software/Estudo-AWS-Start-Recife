'use client';

import { useState } from 'react';
import type { Question } from '@/lib/types';
import { DOMAIN_SHORT_NAMES } from '@/config/constants';
import ExplanationBox from './ExplanationBox';
import {
  isAnswerCorrect,
  getNormalizedExpectedAnswers,
  getNormalizedUserAnswers,
  isMultiSelectQuestion,
  getRequiredSelections,
} from '@/lib/quizUtils';

interface ReviewListProps {
  questions: Question[];
  userAnswers: Record<number, number | number[]>;
  flagged: Record<number, boolean>;
}

type Filter = 'all' | 'wrong' | 'flagged';

export default function ReviewList({
  questions,
  userAnswers,
  flagged,
}: ReviewListProps) {
  const [filter, setFilter] = useState<Filter>('wrong');

  const filteredItems = questions
    .map((q, index) => {
      const userAnswer = userAnswers[index];
      const isCorrect = isAnswerCorrect(q, userAnswer);
      const isFlagged = !!flagged[index];
      return { q, index, userAnswer, isCorrect, isFlagged };
    })
    .filter((item) => {
      if (filter === 'all') return true;
      if (filter === 'wrong') return !item.isCorrect;
      if (filter === 'flagged') return item.isFlagged;
      return true;
    });

  return (
    <div className="mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-xl font-bold text-aws-navy">Revisão de Questões</h3>
        <div className="flex gap-2">
          {[
            { id: 'all', label: 'Todas' },
            { id: 'wrong', label: 'Erradas / Não respondidas' },
            { id: 'flagged', label: 'Sinalizadas' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as Filter)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                filter === f.id
                  ? 'bg-aws-navy text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredItems.map(({ q, index, userAnswer, isCorrect, isFlagged }) => {
          const isMulti = isMultiSelectQuestion(q);
          const requiredCount = getRequiredSelections(q);
          const expectedAnswers = getNormalizedExpectedAnswers(q);
          const userSelectedAnswers = getNormalizedUserAnswers(userAnswer);

          return (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 border-l-4 shadow-sm ${
                isCorrect ? 'border-green-500' : 'border-red-500'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-aws-blue uppercase tracking-wider">
                    Questão {index + 1} • {DOMAIN_SHORT_NAMES[q.domainId]}
                  </span>
                  {isMulti && (
                    <span className="bg-blue-50 text-aws-blue text-[11px] font-semibold px-2 py-0.5 rounded border border-blue-200/50">
                      Múltipla Escolha ({requiredCount} respostas)
                    </span>
                  )}
                </div>
                {isFlagged && (
                  <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded uppercase">
                    Sinalizada
                  </span>
                )}
              </div>

              <p className="font-medium text-gray-800 mb-4">{q.question}</p>

              <div className="space-y-2 mb-6">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userSelectedAnswers.includes(optIdx);
                  const isCorrectOpt = expectedAnswers.includes(optIdx);

                  let classes = 'bg-gray-50 text-gray-600 border border-gray-100';
                  let indicator = String.fromCharCode(65 + optIdx);
                  let indicatorClasses = 'bg-gray-200 text-gray-500';

                  if (isCorrectOpt && isSelected) {
                    classes = 'bg-green-50 text-green-800 border border-green-200 font-medium ring-1 ring-green-500/20';
                    indicatorClasses = 'bg-green-500 text-white';
                    indicator = '✓';
                  } else if (!isCorrectOpt && isSelected) {
                    classes = 'bg-red-50 text-red-800 border border-red-200 font-medium ring-1 ring-red-500/20';
                    indicatorClasses = 'bg-red-500 text-white';
                    indicator = '✗';
                  } else if (isCorrectOpt && !isSelected) {
                    classes = 'bg-green-50/50 text-green-800 border border-green-200 border-dashed';
                    indicatorClasses = 'bg-green-100 text-green-700 border border-green-400 font-bold';
                  }

                  return (
                    <div
                      key={optIdx}
                      className={`flex items-start p-3 rounded-lg ${classes}`}
                    >
                      <span
                        className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full font-bold text-[10px] mr-3 mt-0.5 ${indicatorClasses}`}
                      >
                        {indicator}
                      </span>
                      <div className="flex-1 text-sm leading-relaxed">
                        <span>{opt}</span>
                        {isCorrectOpt && !isSelected && (
                          <span className="ml-2 text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full inline-block">
                            Opção correta
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-slate-50/90 p-4 rounded-xl border border-slate-200">
                <span className="block text-xs font-bold text-aws-navy uppercase tracking-wider mb-2">
                  Explicação Detalhada
                </span>
                <ExplanationBox explanation={q.explanation} />
              </div>
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
            <p className="text-gray-500">Nenhuma questão encontrada para este filtro.</p>
          </div>
        )}
      </div>
    </div>
  );
}
