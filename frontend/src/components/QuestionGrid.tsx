'use client';

import { useState } from 'react';

interface QuestionGridProps {
  isOpen: boolean;
  totalQuestions: number;
  currentIndex: number;
  userAnswers: Record<number, number>;
  flagged: Record<number, boolean>;
  onSelect: (index: number) => void;
  onClose: () => void;
}

type Filter = 'all' | 'answered' | 'pending' | 'flagged';

export default function QuestionGrid({
  isOpen,
  totalQuestions,
  currentIndex,
  userAnswers,
  flagged,
  onSelect,
  onClose,
}: QuestionGridProps) {
  const [filter, setFilter] = useState<Filter>('all');

  if (!isOpen) return null;

  const questions = Array.from({ length: totalQuestions }, (_, i) => i);

  const filteredQuestions = questions.filter((index) => {
    if (filter === 'all') return true;
    if (filter === 'answered') return userAnswers[index] !== undefined;
    if (filter === 'pending') return userAnswers[index] === undefined;
    if (filter === 'flagged') return !!flagged[index];
    return true;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-4 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h3 className="font-bold text-aws-navy">Navegação Rápida</h3>
        
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'Todas' },
            { id: 'answered', label: 'Respondidas' },
            { id: 'pending', label: 'Pendentes' },
            { id: 'flagged', label: 'Sinalizadas' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as Filter)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                filter === f.id
                  ? 'bg-aws-navy text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
        {filteredQuestions.map((index) => {
          const isCurrent = currentIndex === index;
          const isAnswered = userAnswers[index] !== undefined;
          const isFlagged = !!flagged[index];

          let btnClass = 'bg-white border-gray-200 text-gray-600 hover:border-aws-orange';
          
          if (isCurrent) {
            btnClass = 'bg-aws-navy border-aws-navy text-white';
          } else if (isAnswered) {
            btnClass = 'bg-aws-blue border-aws-blue text-white';
          }

          return (
            <button
              key={index}
              onClick={() => {
                onSelect(index);
                onClose();
              }}
              className={`relative h-10 rounded-lg border-2 font-bold text-sm flex items-center justify-center transition-colors cursor-pointer ${btnClass}`}
            >
              {index + 1}
              {isFlagged && (
                <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${isCurrent || isAnswered ? 'bg-white text-red-500' : 'bg-red-500 text-white'}`}>
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                    <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      {filteredQuestions.length === 0 && (
        <div className="text-center py-8 text-gray-500 text-sm">
          Nenhuma questão encontrada para este filtro.
        </div>
      )}
    </div>
  );
}
