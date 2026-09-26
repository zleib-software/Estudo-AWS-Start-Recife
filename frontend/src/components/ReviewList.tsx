'use client';

import { useState } from 'react';
import type { Question } from '@/lib/types';
import { DOMAIN_SHORT_NAMES } from '@/config/constants';

interface ReviewListProps {
  questions: Question[];
  userAnswers: Record<number, number>;
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
      const userAnswer = userAnswers[index] ?? -1;
      const isCorrect = userAnswer === q.answer;
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
        {filteredItems.map(({ q, index, userAnswer, isCorrect, isFlagged }) => (
          <div
            key={index}
            className={`bg-white rounded-xl p-6 border-l-4 shadow-sm ${
              isCorrect ? 'border-green-500' : 'border-red-500'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold text-aws-blue uppercase tracking-wider">
                Questão {index + 1} • {DOMAIN_SHORT_NAMES[q.domainId]}
              </span>
              {isFlagged && (
                <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded uppercase">
                  Sinalizada
                </span>
              )}
            </div>

            <p className="font-medium text-gray-800 mb-4">{q.question}</p>

            <div className="space-y-2 mb-6">
              {q.options.map((opt, optIdx) => {
                const isSelected = userAnswer === optIdx;
                const isCorrectOpt = q.answer === optIdx;

                let classes = 'bg-gray-50 text-gray-600 border border-gray-100';
                let indicator = String.fromCharCode(65 + optIdx);
                let indicatorClasses = 'bg-gray-200 text-gray-500';

                if (isCorrectOpt) {
                  classes = 'bg-green-50 text-green-800 border border-green-200 font-medium ring-1 ring-green-500/20';
                  indicatorClasses = 'bg-green-500 text-white';
                  indicator = '✓';
                } else if (isSelected && !isCorrectOpt) {
                  classes = 'bg-red-50 text-red-800 border border-red-200 font-medium ring-1 ring-red-500/20';
                  indicatorClasses = 'bg-red-500 text-white';
                  indicator = '✗';
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
                    <span className="text-sm leading-relaxed">{opt}</span>
                  </div>
                );
              })}
            </div>

            <div className="bg-aws-light p-4 rounded-lg">
              <span className="block text-xs font-bold text-aws-navy uppercase mb-1">
                Explicação
              </span>
              <p className="text-sm text-gray-700">{q.explanation}</p>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
            <p className="text-gray-500">Nenhuma questão encontrada para este filtro.</p>
          </div>
        )}
      </div>
    </div>
  );
}
