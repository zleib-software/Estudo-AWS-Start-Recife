'use client';

interface ModePickerProps {
  selected: 'practice' | 'exam';
  onChange: (mode: 'practice' | 'exam') => void;
}

export default function ModePicker({ selected, onChange }: ModePickerProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2 mt-6">
        3. Modo de Simulado
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label
          className={`border-2 p-4 rounded-xl flex items-start gap-3 cursor-pointer transition-all ${
            selected === 'practice'
              ? 'border-aws-navy bg-slate-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onChange('practice')}
        >
          <input
            type="radio"
            name="mode"
            value="practice"
            checked={selected === 'practice'}
            onChange={() => onChange('practice')}
            className="mt-1"
          />
          <div>
            <span className="font-bold text-aws-navy block text-sm">
              Modo Prática
            </span>
            <span className="text-xs text-gray-500">
              Sem limite de tempo. Feedback e explicação técnica imediatos após
              cada resposta. Ideal para aprender.
            </span>
          </div>
        </label>
        <label
          className={`border-2 p-4 rounded-xl flex items-start gap-3 cursor-pointer transition-all ${
            selected === 'exam'
              ? 'border-aws-navy bg-slate-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onChange('exam')}
        >
          <input
            type="radio"
            name="mode"
            value="exam"
            checked={selected === 'exam'}
            onChange={() => onChange('exam')}
            className="mt-1"
          />
          <div>
            <span className="font-bold text-aws-navy block text-sm">
              Modo Exame
            </span>
            <span className="text-xs text-gray-500">
              Cronômetro de 90 minutos. Feedback apenas no final. Ideal para
              testar seu preparo real.
            </span>
          </div>
        </label>
      </div>
    </div>
  );
}
