'use client';

import type { Question } from '@/lib/types';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  mode: 'practice' | 'exam';
  selectedAnswer?: number;
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
  const hasAnswered = selectedAnswer !== undefined;
  
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 animate-fadeIn border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-aws-navy">
          Questão {currentIndex + 1} de {totalQuestions}
        </h2>
        <span className="text-sm font-semibold text-aws-blue mt-1 md:mt-0">
          {domainName}
        </span>
      </div>

      <p className="text-gray-800 text-lg leading-relaxed mb-8">
        {question.question}
      </p>

      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrect = question.answer === idx;
          
          let btnClass = 'border-gray-200 hover:border-aws-orange hover:bg-orange-50';
          let indicatorClass = 'bg-gray-100 text-gray-500';
          
          if (isSelected) {
            btnClass = 'border-aws-orange bg-orange-50 ring-2 ring-aws-orange/20';
            indicatorClass = 'bg-aws-orange text-white';
          }

          // In practice mode, if user has answered, show correct/incorrect colors
          if (isPractice && hasAnswered) {
            if (isCorrect) {
              btnClass = 'border-green-500 bg-green-50 ring-2 ring-green-500/20';
              indicatorClass = 'bg-green-500 text-white';
            } else if (isSelected && !isCorrect) {
              btnClass = 'border-red-500 bg-red-50 ring-2 ring-red-500/20';
              indicatorClass = 'bg-red-500 text-white';
            } else {
              // Unselected incorrect options fade out slightly
              btnClass = 'border-gray-100 opacity-60';
              indicatorClass = 'bg-gray-100 text-gray-400';
            }
          }

          const letter = String.fromCharCode(65 + idx); // A, B, C, D...

          return (
            <button
              key={idx}
              onClick={() => {
                if (isPractice && hasAnswered) return; // Block changing answer in practice mode
                onSelectAnswer(idx);
              }}
              disabled={isPractice && hasAnswered}
              className={`w-full flex items-start text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer disabled:cursor-default ${btnClass}`}
            >
              <span
                className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm mr-4 transition-colors ${indicatorClass}`}
              >
                {letter}
              </span>
              <span className={`mt-1 font-medium ${isPractice && hasAnswered && isCorrect ? 'text-green-800' : isPractice && hasAnswered && isSelected && !isCorrect ? 'text-red-800' : 'text-gray-700'}`}>
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {isPractice && hasAnswered && (
        <div className="mt-8 p-5 bg-aws-light rounded-xl border border-gray-200 animate-fadeIn">
          <h4 className="font-bold text-aws-navy mb-2 flex items-center gap-2">
            <svg className="w-5 h-5 fill-aws-blue" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            Explicação
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            {question.explanation || 'Nenhuma explicação disponível para esta questão.'}
          </p>
        </div>
      )}
    </div>
  );
}
