'use client';

import { QUESTION_COUNTS } from '@/config/constants';

interface QuestionCountPickerProps {
  selected: number | 'all';
  onChange: (count: number | 'all') => void;
  domainSelected: number;
}

export default function QuestionCountPicker({
  selected,
  onChange,
  domainSelected,
}: QuestionCountPickerProps) {
  // Se for domínio específico, talvez não tenha muitas questões. 
  // Mas para simplificar, mostramos as mesmas opções ou "Todas".
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2 mt-6">
        2. Quantidade de Questões
      </label>
      <div className="flex flex-wrap gap-2">
        {QUESTION_COUNTS.map((count) => (
          <button
            key={count}
            onClick={() => onChange(count)}
            className={`px-6 py-2.5 rounded-full font-bold text-sm border-2 cursor-pointer transition-colors ${
              selected === count
                ? 'bg-aws-navy border-aws-navy text-white'
                : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            {count}
          </button>
        ))}
        <button
          onClick={() => onChange('all')}
          className={`px-6 py-2.5 rounded-full font-bold text-sm border-2 cursor-pointer transition-colors ${
            selected === 'all'
              ? 'bg-aws-navy border-aws-navy text-white'
              : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
          }`}
        >
          Todas
        </button>
      </div>
      {domainSelected !== 0 && selected !== 'all' && (
        <p className="text-xs text-aws-blue mt-2 font-medium">
          Nota: se o domínio tiver menos questões que o selecionado, o simulado
          usará o máximo disponível.
        </p>
      )}
    </div>
  );
}
